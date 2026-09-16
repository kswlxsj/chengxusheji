import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const idPattern = /^[A-Za-z][A-Za-z0-9_-]*$/;
const comparisonOperators = new Set(["eq", "ne", "lt", "lte", "gt", "gte"]);

async function readJson(relativePath) {
  return JSON.parse(await readFile(resolve(projectRoot, relativePath), "utf8"));
}

// 在 node:vm 沙箱中加载浏览器脚本，读取 dice.js 注册的检定编号清单
//（src/events.js 导出 Game.Registry，src/dice.js 在 Registry 上注册所有检定）。
async function loadDiceIds() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of ["src/namespace.js", "src/events.js", "src/dice.js"]) {
    vm.runInContext(await readFile(resolve(projectRoot, file), "utf8"), sandbox, { filename: file });
  }
  const TrainGame = sandbox.window.TrainGame;
  if (!TrainGame?.Dice) throw new Error("无法读取 src/dice.js 的检定编号清单：Game.Dice 未注册");
  return new Set(TrainGame.Dice.keys());
}

// 在 node:vm 沙箱中加载小游戏注册表与全部小游戏模块，读取注册编号清单
//（src/minigames.js 导出 Game.Minigames，src/minigame-games/*.js 顶层注册模块；
//  模块文件必须顶层只注册、运行期再触碰 DOM，才能被此处安全加载）。
async function loadMinigameIds() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of ["src/namespace.js", "src/minigames.js"]) {
    vm.runInContext(await readFile(resolve(projectRoot, file), "utf8"), sandbox, { filename: file });
  }
  const gamesDir = resolve(projectRoot, "src/minigame-games");
  const gameFiles = (await readdir(gamesDir)).filter((name) => name.endsWith(".js")).sort();
  for (const name of gameFiles) {
    vm.runInContext(await readFile(resolve(gamesDir, name), "utf8"), sandbox, { filename: `src/minigame-games/${name}` });
  }
  const TrainGame = sandbox.window.TrainGame;
  if (!TrainGame?.Minigames) throw new Error("无法读取 src/minigames.js 的小游戏编号清单：Game.Minigames 未注册");
  return new Set(TrainGame.Minigames.list());
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertPlainObject(value, message) {
  assert(value && typeof value === "object" && !Array.isArray(value), message);
}

function assertId(value, message) {
  assert(typeof value === "string" && idPattern.test(value), message);
}

function assertOnlyKeys(value, allowedKeys, label) {
  const unknown = Object.keys(value).filter((key) => !allowedKeys.includes(key));
  assert(!unknown.length, `${label}包含未知字段：${unknown.join("、")}`);
}

function assertUnique(records, label) {
  assert(Array.isArray(records), `${label}注册表必须是数组`);
  const ids = new Set();
  for (const record of records) {
    assertPlainObject(record, `${label}存在无效条目`);
    assertId(record.id, `${label}存在无效 id`);
    assert(!ids.has(record.id), `${label} id 重复：${record.id}`);
    ids.add(record.id);
  }
  return ids;
}

// 音效注册表是唯一带素材存在性校验的数据：路径写错在编译期就该失败，
// 而不是等到剧情跑到那一声时才在浏览器里静默没声音。
async function assertAudioFilesExist(audio) {
  for (const entry of audio) {
    let fileStatus = null;
    try {
      fileStatus = await stat(resolve(projectRoot, entry.file));
    } catch (_error) {
      fileStatus = null;
    }
    assert(
      fileStatus && fileStatus.isFile() && fileStatus.size > 0,
      `音效 ${entry.id} 引用的音频文件不存在或是空文件：${entry.file}`
    );
  }
}

async function assertAssetFileExists(relativePath, label) {
  let fileStatus = null;
  try {
    fileStatus = await stat(resolve(projectRoot, relativePath));
  } catch (_error) {
    fileStatus = null;
  }
  assert(
    fileStatus && fileStatus.isFile() && fileStatus.size > 0,
    `${label}引用的素材不存在或是空文件：${relativePath}`
  );
}

function validateAttributeCondition(condition, attributeIds, label) {
  assertPlainObject(condition, `${label}必须是条件对象`);
  const branches = ["all", "any", "not", "attribute", "sum"].filter((key) => key in condition);
  assert(branches.length === 1, `${label}必须且只能包含一种条件`);
  const branch = branches[0];
  if (branch === "all" || branch === "any") {
    assertOnlyKeys(condition, [branch], label);
    assert(Array.isArray(condition[branch]) && condition[branch].length, `${label}.${branch} 不能为空`);
    for (const part of condition[branch]) validateAttributeCondition(part, attributeIds, `${label}.${branch}`);
    return;
  }
  if (branch === "not") {
    assertOnlyKeys(condition, ["not"], label);
    validateAttributeCondition(condition.not, attributeIds, `${label}.not`);
    return;
  }
  if (branch === "sum") {
    assertOnlyKeys(condition, ["sum", "operator", "value"], label);
    assert(Array.isArray(condition.sum) && condition.sum.length >= 2, `${label}.sum 至少需要两个属性`);
    assert(new Set(condition.sum).size === condition.sum.length, `${label}.sum 不能重复引用同一属性`);
    for (const attributeId of condition.sum) {
      assert(attributeIds.has(attributeId), `${label}.sum 引用了未注册属性：${attributeId}`);
    }
    assert(comparisonOperators.has(condition.operator), `${label}使用了无效比较符：${condition.operator}`);
    assert(Number.isInteger(condition.value), `${label}的比较值必须是整数`);
    return;
  }
  assertOnlyKeys(condition, ["attribute", "operator", "value"], label);
  assert(attributeIds.has(condition.attribute), `${label}引用了未注册属性：${condition.attribute}`);
  assert(comparisonOperators.has(condition.operator), `${label}使用了无效比较符：${condition.operator}`);
  assert(Number.isInteger(condition.value), `${label}的比较值必须是整数`);
}

function validateCondition(condition, references, label) {
  if (condition == null) return;
  assertPlainObject(condition, `${label}必须是条件对象`);
  const branches = ["all", "any", "not", "flag", "hasItem", "objectState", "attribute", "skill"]
    .filter((key) => key in condition);
  assert(branches.length === 1, `${label}必须且只能包含一种条件`);
  const branch = branches[0];
  if (branch === "all" || branch === "any") {
    assertOnlyKeys(condition, [branch], label);
    assert(Array.isArray(condition[branch]) && condition[branch].length, `${label}.${branch} 不能为空`);
    for (const part of condition[branch]) validateCondition(part, references, `${label}.${branch}`);
    return;
  }
  if (branch === "not") {
    assertOnlyKeys(condition, ["not"], label);
    validateCondition(condition.not, references, `${label}.not`);
    return;
  }
  if (branch === "attribute") {
    validateAttributeCondition(condition, references.attributeIds, label);
    return;
  }
  if (branch === "skill") {
    assertOnlyKeys(condition, ["skill", "equals"], label);
    assert(references.skillIds.has(condition.skill), `${label}引用了未注册技能：${condition.skill}`);
    assert(typeof condition.equals === "boolean", `${label}的技能 equals 必须是布尔值`);
    return;
  }
  if (branch === "flag") {
    assertOnlyKeys(condition, ["flag", "equals"], label);
    assertId(condition.flag, `${label}的 flag 无效`);
    assert(typeof condition.equals === "boolean", `${label}的旗标 equals 必须是布尔值`);
    return;
  }
  if (branch === "hasItem") {
    assertOnlyKeys(condition, ["hasItem"], label);
    assert(references.itemIds.has(condition.hasItem), `${label}引用了未注册物品：${condition.hasItem}`);
    return;
  }
  assertOnlyKeys(condition, ["objectState"], label);
  assertPlainObject(condition.objectState, `${label}.objectState 无效`);
  assertOnlyKeys(condition.objectState, ["objectId", "property", "equals"], `${label}.objectState`);
  assert(references.objectIds.has(condition.objectState.objectId), `${label}引用了不存在的物件：${condition.objectState.objectId}`);
  assertId(condition.objectState.property, `${label}的物件状态属性无效`);
  assert("equals" in condition.objectState, `${label}的物件状态缺少 equals`);
}

async function validate(meta, scenes, events, items, attributeData, skills, audio, diceIds, minigameIds) {
  assert(meta.formatVersion === 4, "当前编译器只支持 formatVersion=4");
  assert(typeof meta.title === "string" && meta.title, "游戏标题不能为空");
  assert(typeof meta.coverImage === "string" && meta.coverImage, "游戏封面路径不能为空");
  const sceneIds = assertUnique(scenes, "场景");
  const eventIds = assertUnique(events, "事件");
  const itemIds = assertUnique(items, "物品");
  const soundIds = assertUnique(audio, "音效");
  for (const entry of audio) {
    assertOnlyKeys(entry, ["id", "name", "file", "volume", "description"], `音效 ${entry.id}`);
    assert(typeof entry.name === "string" && entry.name, `音效名称不能为空：${entry.id}`);
    assert(typeof entry.file === "string" && entry.file, `音效 ${entry.id} 的 file 不能为空`);
    if (entry.volume != null) {
      assert(typeof entry.volume === "number" && entry.volume >= 0 && entry.volume <= 1,
        `音效 ${entry.id} 的 volume 必须是 0~1 的数字`);
    }
    assert(entry.description == null || typeof entry.description === "string", `音效 ${entry.id} 的 description 必须是字符串`);
  }
  assertPlainObject(attributeData, "属性注册表格式无效");
  assertOnlyKeys(attributeData, ["totalPoints", "attributes"], "属性注册表");
  assert(Number.isInteger(attributeData.totalPoints) && attributeData.totalPoints >= 0, "属性总点数必须是非负整数");
  const attributeIds = assertUnique(attributeData.attributes, "属性");
  assert(attributeData.attributes.length > 0, "属性注册表不能为空");
  const skillIds = assertUnique(skills, "技能");
  assert(sceneIds.has(meta.initialScene), `初始场景不存在：${meta.initialScene}`);
  assert(eventIds.has(meta.startEvent), `起始事件不存在：${meta.startEvent}`);

  for (const item of items) {
    assertOnlyKeys(item, ["id", "name", "image", "description", "inspectEvent"], `物品 ${item.id}`);
    assert(typeof item.name === "string" && item.name, `物品名称不能为空：${item.id}`);
    assert(typeof item.image === "string" && item.image, `物品图片不能为空：${item.id}`);
    assert(typeof item.description === "string", `物品 ${item.id} 的 description 必须是字符串`);
    assertId(item.inspectEvent, `物品 ${item.id} 的 inspectEvent 无效`);
    assert(eventIds.has(item.inspectEvent), `物品 ${item.id} 引用了不存在的调查事件：${item.inspectEvent}`);
  }

  let allocationCapacity = 0;
  for (const attribute of attributeData.attributes) {
    assertOnlyKeys(attribute, ["id", "name", "description", "initial", "min", "max"], `属性 ${attribute.id}`);
    assert(typeof attribute.name === "string" && attribute.name, `属性名称不能为空：${attribute.id}`);
    assert(attribute.description == null || typeof attribute.description === "string", `属性 ${attribute.id} 的 description 必须是字符串`);
    assert(Number.isInteger(attribute.initial) && Number.isInteger(attribute.min), `属性 ${attribute.id} 的 initial/min 必须是整数`);
    assert(attribute.max === null || Number.isInteger(attribute.max), `属性 ${attribute.id} 的 max 必须是整数或 null`);
    assert(attribute.min <= attribute.initial, `属性 ${attribute.id} 必须满足 min <= initial`);
    assert(attribute.max === null || attribute.initial <= attribute.max, `属性 ${attribute.id} 的 initial 不能大于 max`);
    allocationCapacity += attribute.max === null
      ? attributeData.totalPoints
      : attribute.max - attribute.initial;
  }
  assert(allocationCapacity >= attributeData.totalPoints, "所有属性的可分配容量小于 totalPoints");

  for (const skill of skills) {
    assertOnlyKeys(skill, ["id", "name", "description", "initial", "autoTrigger"], `技能 ${skill.id}`);
    assert(typeof skill.name === "string" && skill.name, `技能名称不能为空：${skill.id}`);
    assert(skill.description == null || typeof skill.description === "string", `技能 ${skill.id} 的 description 必须是字符串`);
    assert(typeof skill.initial === "boolean", `技能 ${skill.id} 的 initial 必须是布尔值`);
    if (skill.autoTrigger) validateAttributeCondition(skill.autoTrigger, attributeIds, `技能 ${skill.id}.autoTrigger`);
  }

  const objectIds = new Set();
  for (const scene of scenes) {
    assert(typeof scene.background === "string", `场景缺少背景：${scene.id}`);
    if (scene.backgroundSound != null) {
      assertPlainObject(scene.backgroundSound, `场景 ${scene.id} 的 backgroundSound 无效`);
      assertOnlyKeys(scene.backgroundSound, ["sound", "loopGapMs"], `场景 ${scene.id}.backgroundSound`);
      assert(soundIds.has(scene.backgroundSound.sound),
        `场景 ${scene.id} 的背景音引用了未注册的编号：${scene.backgroundSound.sound || "空"}`);
      if (scene.backgroundSound.loopGapMs != null) {
        assert(typeof scene.backgroundSound.loopGapMs === "number" && scene.backgroundSound.loopGapMs >= 0,
          `场景 ${scene.id} 的背景音 loopGapMs 必须是非负数字`);
      }
    }
    if (scene.backgroundSoundVariants != null) {
      assert(Array.isArray(scene.backgroundSoundVariants), `场景 ${scene.id} 的背景音变体必须是数组`);
      for (const variant of scene.backgroundSoundVariants) {
        assertPlainObject(variant, `场景 ${scene.id} 存在无效背景音变体`);
        assertOnlyKeys(variant, ["sound", "loopGapMs", "visibleWhen"], `场景 ${scene.id} 的背景音变体`);
        assert(soundIds.has(variant.sound),
          `场景 ${scene.id} 的背景音变体引用了未注册的编号：${variant.sound || "空"}`);
        assert("visibleWhen" in variant, `场景 ${scene.id} 的背景音变体缺少 visibleWhen`);
        if (variant.loopGapMs != null) {
          assert(typeof variant.loopGapMs === "number" && variant.loopGapMs >= 0,
            `场景 ${scene.id} 的背景音变体 loopGapMs 必须是非负数字`);
        }
      }
    }
    if (scene.backgroundVariants != null) {
      assert(Array.isArray(scene.backgroundVariants), `场景 ${scene.id} 的背景变体必须是数组`);
      for (const variant of scene.backgroundVariants) {
        assertPlainObject(variant, `场景 ${scene.id} 存在无效背景变体`);
        assertOnlyKeys(variant, ["image", "visibleWhen"], `场景 ${scene.id} 的背景变体`);
        assert(typeof variant.image === "string" && variant.image,
          `场景 ${scene.id} 的背景变体缺少 image`);
      }
    }
    for (const object of scene.objects || []) {
      assertId(object.id, `场景 ${scene.id} 存在无效物件 id`);
      assert(!objectIds.has(object.id), `物件 id 重复：${object.id}`);
      objectIds.add(object.id);
      assert(object.clickEvent && eventIds.has(object.clickEvent), `物件 ${object.id} 引用了不存在的事件`);
      assert(object.position && ["x", "y", "width", "height"].every((key) => Number.isFinite(object.position[key])), `物件 ${object.id} 的 position 无效`);
      if (object.noHighlight != null) {
        assert(typeof object.noHighlight === "boolean", `物件 ${object.id} 的 noHighlight 必须是布尔值`);
      }
      if (object.showImage != null) {
        assert(typeof object.showImage === "boolean", `物件 ${object.id} 的 showImage 必须是布尔值`);
      }
      if (object.glow != null) {
        assert(typeof object.glow === "boolean", `物件 ${object.id} 的 glow 必须是布尔值`);
      }
      if (object.invisible != null) {
        assert(typeof object.invisible === "boolean", `物件 ${object.id} 的 invisible 必须是布尔值`);
      }
      if (object.fullCanvas) {
        assert(typeof object.fullCanvas === "boolean", `物件 ${object.id} 的 fullCanvas 必须是布尔值`);
        const { x, y, width, height } = object.position || {};
        assert(x === 0 && y === 0 && width === 100 && height === 100,
          `整幅画布贴图物件 ${object.id} 的 position 必须固定为 {x:0,y:0,width:100,height:100}`);
      }
    }
  }

  const references = { attributeIds, skillIds, itemIds, objectIds };
  for (const scene of scenes) {
    for (const variant of scene.backgroundSoundVariants || []) {
      validateCondition(variant.visibleWhen, references, `场景 ${scene.id} 的背景音变体条件`);
    }
    for (const variant of scene.backgroundVariants || []) {
      validateCondition(variant.visibleWhen, references, `场景 ${scene.id} 的背景变体条件`);
    }
    for (const object of scene.objects || []) validateCondition(object.visibleWhen, references, `物件 ${object.id}.visibleWhen`);
  }

  const actionTypes = new Set([
    "dialogue", "inspect", "choice", "check", "changeScene", "setFlag",
    "modifyAttribute", "setSkill", "learnSkill", "loseSkill", "addItem", "removeItem",
    "setObjectState", "custom", "minigame", "conditionalJump", "sound"
  ]);
  for (const event of events) {
    assert(Array.isArray(event.actions), `事件缺少 actions：${event.id}`);
    if (event.next) assert(eventIds.has(event.next), `事件 ${event.id} 的 next 不存在`);
    for (const action of event.actions) {
      assert(actionTypes.has(action.type), `事件 ${event.id} 使用未知动作：${action.type}`);
      if (action.type === "dialogue" && action.portrait) {
        await assertAssetFileExists(action.portrait, `事件 ${event.id} 的对白立绘`);
      }
      if (action.type === "changeScene") assert(sceneIds.has(action.scene), `事件 ${event.id} 引用了不存在的场景`);
      if (["addItem", "removeItem"].includes(action.type)) assert(itemIds.has(action.item), `事件 ${event.id} 引用了不存在的物品`);
      if (action.type === "conditionalJump") {
        assert(eventIds.has(action.next), `事件 ${event.id} 的条件跳转目标不存在：${action.next}`);
        validateCondition(action.when, references, `事件 ${event.id} 的条件跳转条件`);
      }
      if (action.type === "inspect") {
        if (action.item) {
          assert(itemIds.has(action.item), `事件 ${event.id} 的调查动作引用了不存在的物品：${action.item}`);
        } else {
          assert(typeof action.title === "string" && action.title, `事件 ${event.id} 的调查动作缺少 title`);
          assert(typeof action.text === "string", `事件 ${event.id} 的调查动作缺少 text`);
        }
      }
      if (action.type === "modifyAttribute") {
        assert(attributeIds.has(action.attribute), `事件 ${event.id} 引用了未注册属性：${action.attribute}`);
        assert(Number.isInteger(action.amount), `事件 ${event.id} 的属性修改量必须是整数`);
      }
      if (["setSkill", "learnSkill", "loseSkill"].includes(action.type)) {
        assert(skillIds.has(action.skill), `事件 ${event.id} 引用了未注册技能：${action.skill}`);
        if (action.type === "setSkill") assert(typeof action.value === "boolean", `事件 ${event.id} 的技能值必须是布尔值`);
      }
      if (action.type === "check") {
        assert(typeof action.dice === "string" && diceIds.has(action.dice), `事件 ${event.id} 的检定引用了未注册的 dice 编号：${action.dice}`);
        if (action.outcomes != null) {
          assert(Array.isArray(action.outcomes), `事件 ${event.id} 的检定 outcomes 必须是数组`);
          for (const outcome of action.outcomes) {
            assert(eventIds.has(outcome), `事件 ${event.id} 的检定结果分支不存在：${outcome}`);
          }
        }
        for (const key of ["criticalSuccess", "criticalFailure"]) {
          if (action[key] != null) {
            assert(eventIds.has(action[key]), `事件 ${event.id} 的检定极端结果分支不存在：${action[key]}`);
          }
        }
      }
      if (action.type === "choice") {
        assert(Array.isArray(action.options) && action.options.length, `事件 ${event.id} 的选择为空`);
        for (const option of action.options) {
          assert(eventIds.has(option.next), `事件 ${event.id} 的选项分支不存在：${option.next}`);
          validateCondition(option.when, references, `事件 ${event.id} 的选项条件`);
        }
      }
      if (action.type === "custom") {
        assert(typeof action.name === "string" && action.name, `事件 ${event.id} 的自定义动作缺少 name`);
      }
      if (action.type === "sound") {
        assert(typeof action.sound === "string" && soundIds.has(action.sound),
          `事件 ${event.id} 的音效动作引用了未注册的编号：${action.sound || "空"}`);
        if (action.await != null) {
          assert(typeof action.await === "boolean", `事件 ${event.id} 的音效 await 必须是布尔值`);
        }
        if (action.start != null) {
          assert(typeof action.start === "number" && action.start >= 0,
            `事件 ${event.id} 的音效 start 必须是非负数字`);
        }
        if (action.duration != null) {
          assert(typeof action.duration === "number" && action.duration > 0,
            `事件 ${event.id} 的音效 duration 必须是正数`);
        }
        if (action.volume != null) {
          assert(typeof action.volume === "number" && action.volume >= 0 && action.volume <= 1,
            `事件 ${event.id} 的音效 volume 必须是 0~1 的数字`);
        }
        if (action.startWithoutMetadata != null) {
          assert(typeof action.startWithoutMetadata === "boolean",
            `事件 ${event.id} 的音效 startWithoutMetadata 必须是布尔值`);
        }
        if (action.fadeMs != null) {
          assert(typeof action.fadeMs === "number" && action.fadeMs >= 0,
            `事件 ${event.id} 的音效 fadeMs 必须是非负数字`);
        }
      }
      if (action.type === "minigame") {
        assert(typeof action.game === "string" && minigameIds.has(action.game),
          `事件 ${event.id} 的小游戏动作引用了未注册的编号：${action.game || "空"}`);
      }
    }
  }
}

const [meta, scenes, events, items, attributes, skills, audio] = await Promise.all([
  readJson("data/meta.json"),
  readJson("data/scenes.json"),
  readJson("data/events.json"),
  readJson("data/items.json"),
  readJson("data/attributes.json"),
  readJson("data/skills.json"),
  readJson("data/audio.json")
]);

const diceIds = await loadDiceIds();
const minigameIds = await loadMinigameIds();
await validate(meta, scenes, events, items, attributes, skills, audio, diceIds, minigameIds);
await assertAudioFilesExist(audio);
const bundle = JSON.stringify({ meta, scenes, events, items, attributes, skills, audio }, null, 2)
  .replaceAll("\u2028", "\\u2028")
  .replaceAll("\u2029", "\\u2029");
await writeFile(resolve(projectRoot, "data/compiled-game-data.js"), `window.GAME_DATA = ${bundle};\n`, "utf8");
console.log(`编译完成：${scenes.length} 个场景，${events.length} 个事件，${items.length} 个物品，${attributes.attributes.length} 个属性，${skills.length} 个技能，${minigameIds.size} 个小游戏，${audio.length} 个音效。`);
