import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const idPattern = /^[A-Za-z][A-Za-z0-9_-]*$/;
const comparisonOperators = new Set(["eq", "ne", "lt", "lte", "gt", "gte"]);

async function readJson(relativePath) {
  return JSON.parse(await readFile(resolve(projectRoot, relativePath), "utf8"));
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

function validateAttributeCondition(condition, attributeIds, label) {
  assertPlainObject(condition, `${label}必须是条件对象`);
  const branches = ["all", "any", "not", "attribute"].filter((key) => key in condition);
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

function validate(meta, scenes, events, items, attributeData, skills) {
  assert(meta.formatVersion === 2, "当前编译器只支持 formatVersion=2");
  assert(typeof meta.title === "string" && meta.title, "游戏标题不能为空");
  assert(typeof meta.coverImage === "string" && meta.coverImage, "游戏封面路径不能为空");
  const sceneIds = assertUnique(scenes, "场景");
  const eventIds = assertUnique(events, "事件");
  const itemIds = assertUnique(items, "物品");
  assertPlainObject(attributeData, "属性注册表格式无效");
  assertOnlyKeys(attributeData, ["totalPoints", "attributes"], "属性注册表");
  assert(Number.isInteger(attributeData.totalPoints) && attributeData.totalPoints >= 0, "属性总点数必须是非负整数");
  const attributeIds = assertUnique(attributeData.attributes, "属性");
  assert(attributeData.attributes.length > 0, "属性注册表不能为空");
  const skillIds = assertUnique(skills, "技能");
  assert(sceneIds.has(meta.initialScene), `初始场景不存在：${meta.initialScene}`);
  assert(eventIds.has(meta.startEvent), `起始事件不存在：${meta.startEvent}`);

  let allocationCapacity = 0;
  for (const attribute of attributeData.attributes) {
    assertOnlyKeys(attribute, ["id", "name", "description", "initial", "min", "max"], `属性 ${attribute.id}`);
    assert(typeof attribute.name === "string" && attribute.name, `属性名称不能为空：${attribute.id}`);
    assert(attribute.description == null || typeof attribute.description === "string", `属性 ${attribute.id} 的 description 必须是字符串`);
    assert([attribute.initial, attribute.min, attribute.max].every(Number.isInteger), `属性 ${attribute.id} 的 initial/min/max 必须是整数`);
    assert(attribute.min <= attribute.initial && attribute.initial <= attribute.max, `属性 ${attribute.id} 必须满足 min <= initial <= max`);
    allocationCapacity += attribute.max - attribute.initial;
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
    for (const object of scene.objects || []) {
      assertId(object.id, `场景 ${scene.id} 存在无效物件 id`);
      assert(!objectIds.has(object.id), `物件 id 重复：${object.id}`);
      objectIds.add(object.id);
      assert(object.clickEvent && eventIds.has(object.clickEvent), `物件 ${object.id} 引用了不存在的事件`);
      assert(object.position && ["x", "y", "width", "height"].every((key) => Number.isFinite(object.position[key])), `物件 ${object.id} 的 position 无效`);
    }
  }

  const references = { attributeIds, skillIds, itemIds, objectIds };
  for (const scene of scenes) {
    for (const object of scene.objects || []) validateCondition(object.visibleWhen, references, `物件 ${object.id}.visibleWhen`);
  }

  const actionTypes = new Set([
    "dialogue", "inspect", "choice", "check", "changeScene", "setFlag",
    "modifyAttribute", "setSkill", "learnSkill", "loseSkill", "addItem",
    "setObjectState", "custom"
  ]);
  for (const event of events) {
    assert(Array.isArray(event.actions), `事件缺少 actions：${event.id}`);
    if (event.next) assert(eventIds.has(event.next), `事件 ${event.id} 的 next 不存在`);
    for (const action of event.actions) {
      assert(actionTypes.has(action.type), `事件 ${event.id} 使用未知动作：${action.type}`);
      if (action.type === "changeScene") assert(sceneIds.has(action.scene), `事件 ${event.id} 引用了不存在的场景`);
      if (action.type === "addItem") assert(itemIds.has(action.item), `事件 ${event.id} 引用了不存在的物品`);
      if (action.type === "modifyAttribute") {
        assert(attributeIds.has(action.attribute), `事件 ${event.id} 引用了未注册属性：${action.attribute}`);
        assert(Number.isInteger(action.amount), `事件 ${event.id} 的属性修改量必须是整数`);
      }
      if (["setSkill", "learnSkill", "loseSkill"].includes(action.type)) {
        assert(skillIds.has(action.skill), `事件 ${event.id} 引用了未注册技能：${action.skill}`);
        if (action.type === "setSkill") assert(typeof action.value === "boolean", `事件 ${event.id} 的技能值必须是布尔值`);
      }
      if (action.type === "check") {
        assert(action.checkId, `事件 ${event.id} 的检定缺少 checkId`);
        assert(attributeIds.has(action.attribute), `事件 ${event.id} 的检定引用了未注册属性：${action.attribute}`);
        assert(action.modifier == null || Number.isInteger(action.modifier), `事件 ${event.id} 的检定修正必须是整数`);
        assert(eventIds.has(action.success) && eventIds.has(action.fail), `事件 ${event.id} 的检定分支不存在`);
      }
      if (action.type === "choice") {
        assert(Array.isArray(action.options) && action.options.length, `事件 ${event.id} 的选择为空`);
        for (const option of action.options) {
          assert(eventIds.has(option.next), `事件 ${event.id} 的选项分支不存在：${option.next}`);
          validateCondition(option.when, references, `事件 ${event.id} 的选项条件`);
        }
      }
      if (action.type === "custom") assert(typeof action.name === "string" && action.name, `事件 ${event.id} 的自定义动作缺少 name`);
    }
  }
}

const [meta, scenes, events, items, attributes, skills] = await Promise.all([
  readJson("data/meta.json"),
  readJson("data/scenes.json"),
  readJson("data/events.json"),
  readJson("data/items.json"),
  readJson("data/attributes.json"),
  readJson("data/skills.json")
]);

validate(meta, scenes, events, items, attributes, skills);
const bundle = JSON.stringify({ meta, scenes, events, items, attributes, skills }, null, 2)
  .replaceAll("\u2028", "\\u2028")
  .replaceAll("\u2029", "\\u2029");
await writeFile(resolve(projectRoot, "data/compiled-game-data.js"), `window.GAME_DATA = ${bundle};\n`, "utf8");
console.log(`编译完成：${scenes.length} 个场景，${events.length} 个事件，${items.length} 个物品，${attributes.attributes.length} 个属性，${skills.length} 个技能。`);
