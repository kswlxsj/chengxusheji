// 主线接线与逐句切景回归。
// 与 test-inner-world.mjs 同一约定：每句目的地描写必须已经处于对应背景，
// 推门/出发文字仍属于出发场景；进入新场景的路线必须先 changeScene 再播到达描写。
//
// 覆盖范围（5号车厢 → 4号 → 3号 → 2号 → 先头车厢）：
// - 5号右门只过门（切景 + 过门句，不触发医学检定）；剧情路线统一经 E_013_ENTRY 进4号。
// - 进4号车厢的首次发现描写每次存档只发生一次；点击乘务员后直接进行教育检定。
// - 4号→3号折返有折返描写；3号→2号不再由剧情自动进车，玩家点门（door_03_to_02 → E_023 门前认知崩塌 → E_501）才进入。
// - 里世界返程 E_524 回到真2号后接 E_025 喘息段；玩家点击场景里的 Clicker 后触发遭遇。
// - 2号车厢 Clicker 指向怪物遭遇；先头车厢控制杆指向操作面板；潜行/对抗、玻璃瓶与空易拉罐接线正确。
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import vm from "node:vm";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [events, scenes, items, attributes, skills, meta] = await Promise.all(
  ["events", "scenes", "items", "attributes", "skills", "meta"].map(async (name) => JSON.parse(await read(`data/${name}.json`)))
);
const [mainSource, diceSource, bgmSource, homeOpSource, settingsSource, cardBattleSource, crewNegotiationSource] = await Promise.all([
  read("src/main.js"),
  read("src/dice.js"),
  read("src/bgm.js"),
  read("src/home-op.js"),
  read("src/settings.js"),
  read("src/minigame-games/card-battle.js"),
  read("src/minigame-games/crew-negotiation.js")
]);
const sandbox = { window: {}, console, performance, setTimeout, clearTimeout, Math: Object.create(Math) };
vm.createContext(sandbox);
for (const name of ["namespace", "state", "scene", "events", "custom-actions"]) {
  vm.runInContext(await read(`src/${name}.js`), sandbox);
}
const Game = sandbox.window.TrainGame;

const eventById = new Map(events.map((event) => [event.id, event]));
const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
const objectOf = (sceneId, objectId) => sceneById.get(sceneId).objects.find((object) => object.id === objectId);
const actionsOf = (id) => eventById.get(id).actions || [];

function fixture({ flags = {}, inventory = [], sceneId, dice = {}, choiceLabels = [] } = {}) {
  const state = new Game.GameState({ ...meta.initialState, flags, inventory, sceneId }, attributes, skills);
  const trace = [];
  const attributeChanges = [];
  const diceCalls = [];
  const diceCallCounts = new Map();
  const ui = {
    dialog: {
      setFast() {},
      async showLine(action) {
        trace.push({ event: state.currentEventId, scene: state.sceneId, text: action.text });
      }
    },
    choice: {
      async choose(prompt, options) {
        return options.find((option) => choiceLabels.includes(option.label)) || options[0];
      }
    },
    audio: { play() { return { finished: Promise.resolve(), stop() {} }; } },
    closeDialog() {}, cancelPending() {}, setPaused() {}, toast(message) { trace.push({ error: message }); },
    showAttributeChange(payload) { attributeChanges.push(payload); }
  };
  const scene = {
    async prepare() {}, async whenReady() {}, load(id) { state.sceneId = id; }, refresh() {}, setInteractionEnabled() {}
  };
  const engine = new Game.EventEngine({ events, state, scene, ui, items,
    shouldTerminate: (s) => Boolean(s.flags.ending_reason), onTerminate() {} });
  Game.registerProjectActions(engine);
  // 检定按编号返回固定下标或依次返回数组结果，并记录调用顺序，便于断言重试规则。
  Game.Dice = {
    get: (id) => async () => {
      diceCalls.push(id);
      const count = diceCallCounts.get(id) || 0;
      diceCallCounts.set(id, count + 1);
      const configured = dice[id];
      return Array.isArray(configured)
        ? configured[Math.min(count, configured.length - 1)] ?? 0
        : configured ?? 0;
    }
  };
  // 本文件只验证接线与切景；真实小游戏画面与结算另在浏览器验收。
  Game.Minigames = { get: () => ({ title: "测试小游戏", run: async () => undefined }) };
  return { state, engine, trace, diceCalls, attributeChanges, async play(id) {
    const result = await engine.play(id);
    assert.equal(trace.some((entry) => entry.error), false, JSON.stringify(trace));
    return result;
  } };
}

const scenesOf = (game) => game.trace.map((entry) => entry.scene);

// 断言：trace 从第一次出现 sceneId 起一直留在该场景，且该场景的第一句是到达描写。
function assertArrival(game, sceneId, arrivalPattern) {
  const scenes = scenesOf(game);
  const index = scenes.indexOf(sceneId);
  assert.ok(index >= 0, `没有切到 ${sceneId}：${JSON.stringify(scenes)}`);
  assert.equal(scenes.slice(index).every((id) => id === sceneId), true, `切景后不应再回到旧场景：${JSON.stringify(scenes)}`);
  assert.match(game.trace[index].text, arrivalPattern, "到达描写必须落在新背景上");
  return index;
}

// 断言：切到 toSceneId 后不再出现 fromSceneId 的句子；返回切点下标（0 表示事件以切景开头）。
function assertCutBefore(game, fromSceneId, toSceneId) {
  const sceneSeq = scenesOf(game);
  const cut = sceneSeq.indexOf(toSceneId);
  assert.ok(cut >= 0, `没有从 ${fromSceneId} 切到 ${toSceneId}：${JSON.stringify(sceneSeq)}`);
  assert.equal(sceneSeq.slice(cut).includes(fromSceneId), false, `切景后不应再有 ${fromSceneId} 的句子：${JSON.stringify(sceneSeq)}`);
  return cut;
}

// ---------- 结构接线：点击目标与跳转目标 ----------

assert.equal(
  actionsOf("E_012_S").find((action) => action.type === "check")?.dice,
  "ev012_san_01",
  "初见被啃食的6号车厢必须使用按骰点分布损失的专用 SAN 检定"
);

const itemById = new Map(items.map((item) => [item.id, item]));
assert.equal(itemById.get("driver_cab_key").image, "assets/Image/Item/driver-cab-key.webp");
assert.equal(itemById.get("control_panel_key").image, "assets/Image/Item/control-panel-key.webp");
assert.equal(itemById.get("emergency_cutter").image, "assets/Image/Item/emergency-belt-cutter.webp");
assert.equal(itemById.get("pry_bar").image, "assets/Image/Item/pry-bar.webp");
assert.equal(itemById.get("flashlight").image, "assets/Image/Item/flashlight.webp", "手电筒应使用无版本后缀的正式贴图");
assert.equal(itemById.get("drink").image, "assets/Image/Item/drink.webp", "饮料应使用正式贴图");
assert.equal(itemById.get("drink_empty").image, "assets/Image/Item/drink_empty.webp", "空易拉罐应使用正式贴图");
assert.deepEqual(objectOf("front_carriage", "control_27").visibleWhen, { flag: "front_carriage_entry_seen", equals: true });
assert.deepEqual(objectOf("front_carriage", "control_27").hitPosition, { x: 42, y: 52, width: 27, height: 30 });
const driverDoorGate = actionsOf("E_031").find((action) => action.next === "E_031_PLAYER_KEY");
assert.deepEqual(driverDoorGate.when.any[1], { hasItem: "driver_cab_key" });

assert.equal(objectOf("carriage_04", "door_04_to_05").clickEvent, "E_GO_04_05", "4号左门应保持原有通往5号事件");
assert.equal(objectOf("carriage_04", "door_04_to_03").clickEvent, "E_DOOR_04", "4号右门应保持原有通往3号事件");
const carriage04CenterDoor = objectOf("carriage_04", "door_04_center");
assert.equal(carriage04CenterDoor.clickEvent, "E_004_CENTER_DOOR", "4号中央车门应只触发普通门对话");
assert.equal(carriage04CenterDoor.noHighlight, true, "4号中央车门只能点击，不应出现悬停高亮");
assert.equal(carriage04CenterDoor.zIndex, 11, "4号中央车门应位于乘务员图层下方");
assert.equal(carriage04CenterDoor.visibleWhen, undefined, "4号中央车门不应改变任何剧情显示条件");
assert.deepEqual(carriage04CenterDoor.position, { x: 43, y: 28, width: 14, height: 48 }, "4号中央车门热点应收窄到双开门内部");
for (const id of ["window_04_left", "window_04_right"]) {
  const windowObject = objectOf("carriage_04", id);
  assert.equal(windowObject.clickEvent, "E_004_WINDOW", `${id} 应只触发窗户普通对话`);
  assert.equal(windowObject.invisible, true, `${id} 不应叠加新的窗户贴图`);
  assert.equal(windowObject.zIndex, 10, `${id} 应位于乘务员和既有物件下方`);
  assert.equal(windowObject.visibleWhen, undefined, `${id} 不应改变任何剧情显示条件`);
}
assert.deepEqual(objectOf("carriage_04", "window_04_left").position, { x: 19, y: 33, width: 18, height: 15 }, "4号左窗热点应收在玻璃内部");
assert.deepEqual(objectOf("carriage_04", "window_04_right").position, { x: 61, y: 33, width: 18, height: 15 }, "4号右窗热点应收在玻璃内部");
assert.equal(objectOf("carriage_05", "door_05_to_04").clickEvent, "E_GO_05_04", "5号右门应为普通过门事件");
const carriage05CenterDoor = objectOf("carriage_05", "door_05_center");
assert.equal(carriage05CenterDoor.clickEvent, "E_005_CENTER_DOOR", "5号中央车门应只触发普通门对话");
assert.equal(carriage05CenterDoor.noHighlight, true, "5号中央车门只能点击，不应出现悬停高亮");
assert.equal(carriage05CenterDoor.zIndex, 11, "5号中央车门不得抬高层级遮挡既有物件");
assert.equal(carriage05CenterDoor.visibleWhen, undefined, "5号中央车门在7号流程结束后仍应可调查");
assert.deepEqual(carriage05CenterDoor.position, { x: 43, y: 28, width: 14, height: 48 }, "5号中央车门热点应收窄到双开门内部");
for (const id of ["window_05_left", "window_05_right"]) {
  const windowObject = objectOf("carriage_05", id);
  assert.equal(windowObject.clickEvent, "E_005_WINDOW", `${id} 应触发窗户普通对话`);
  assert.equal(windowObject.invisible, true, `${id} 不应叠加新的窗户贴图`);
  assert.equal(windowObject.zIndex, 10, `${id} 不得抬高层级遮挡既有物件`);
  assert.equal(windowObject.visibleWhen, undefined, `${id} 在7号流程结束后仍应可调查`);
}
assert.deepEqual(objectOf("carriage_05", "window_05_left").position, { x: 19, y: 33, width: 18, height: 15 }, "5号左窗热点应收在玻璃内部，不得延伸到窗框或座椅");
assert.deepEqual(objectOf("carriage_05", "window_05_right").position, { x: 61, y: 33, width: 18, height: 15 }, "5号右窗热点应收在玻璃内部，不得延伸到窗框或座椅");
assert.equal(objectOf("carriage_05", "clutter_05_a").clickEvent, "E_05_JUNK_A");
assert.equal(objectOf("carriage_05", "clutter_05_b").clickEvent, "E_05_JUNK_B");
const carriage05LeftJunk = objectOf("carriage_05", "clutter_05_c");
assert.equal(carriage05LeftJunk.image, "assets/Image/Scene/StillLife/trash-05-b.webp", "5号左侧杂物应对应左边的白色袋堆");
assert.equal(carriage05LeftJunk.clickEvent, "E_05_JUNK_LEFT", "5号左侧杂物应使用独立随机对白");
assert.deepEqual(carriage05LeftJunk.hitPosition, { x: 32, y: 65, width: 6, height: 7 }, "5号左侧杂物热点应只覆盖袋子主体");
const carriage05RightJunk = objectOf("carriage_05", "clutter_05_d");
assert.equal(carriage05RightJunk.image, "assets/Image/Scene/StillLife/trash-05-a.webp", "5号右侧杂物应对应右边的白色袋堆");
assert.equal(carriage05RightJunk.clickEvent, "E_05_JUNK_RIGHT", "5号右侧杂物应提供饮料获取事件");
assert.deepEqual(carriage05RightJunk.hitPosition, { x: 62, y: 65, width: 6, height: 7 }, "5号右侧杂物热点应只覆盖袋子主体");
const carriage06CenterDoor = objectOf("carriage_06", "door_06_center");
assert.equal(carriage06CenterDoor.clickEvent, "E_006_CENTER_DOOR", "6号中央车门应只触发普通门对话");
assert.equal(carriage06CenterDoor.noHighlight, true, "6号中央车门只能点击，不应出现悬停高亮");
assert.deepEqual(carriage06CenterDoor.position, { x: 43, y: 28, width: 14, height: 48 }, "6号中央车门热点应收窄到双开门内部");
assert.deepEqual(carriage06CenterDoor.visibleWhen, {
  all: [
    { not: { flag: "carriage_06_entry_route_a", equals: true } },
    { not: { flag: "carriage_06_entry_route_b", equals: true } },
    { not: { flag: "carriage_07_entry_seen", equals: true } }
  ]
}, "6号中央车门应只在尚未触发进入7号流程时显示");
for (const id of ["window_06_left", "window_06_right"]) {
  const windowObject = objectOf("carriage_06", id);
  assert.equal(windowObject.clickEvent, "E_006_WINDOW", `${id} 应触发窗户普通对话`);
  assert.equal(windowObject.invisible, true, `${id} 不应叠加新的窗户贴图`);
  assert.deepEqual(windowObject.visibleWhen, carriage06CenterDoor.visibleWhen, `${id} 应与中央车门共用进入7号前的显示条件`);
}
assert.deepEqual(objectOf("carriage_06", "window_06_left").position, { x: 19, y: 33, width: 18, height: 15 }, "6号左窗热点应收在玻璃内部，不得延伸到窗框或座椅");
assert.deepEqual(objectOf("carriage_06", "window_06_right").position, { x: 61, y: 33, width: 18, height: 15 }, "6号右窗热点应收在玻璃内部，不得延伸到窗框或座椅");
for (const [eventId, expectedTexts] of [
  ["E_004_WINDOW", [
    "车站昏暗的灯光与漆黑的隧道在窗外交替掠过。",
    "你望向窗外，只看见站台灯光和黑色隧道不断交替。",
    "玻璃上映出你的影子，影子背后是飞速掠过的隧道墙壁。"
  ]],
  ["E_004_CENTER_DOOR", [
    "你试着拉动车门，但它纹丝不动，似乎已经锈蚀锁死了。",
    "车门紧闭着，不管你怎么用力它都没有反应。",
    "你抓住门缝试着将它拉开，但车门没有丝毫松动。"
  ]],
  ["E_005_WINDOW", [
    "车站昏暗的灯光与漆黑的隧道在窗外交替掠过。",
    "你望向窗外，只看见站台灯光和黑色隧道不断交替。",
    "玻璃上映出你的影子，影子背后是飞速掠过的隧道墙壁。"
  ]],
  ["E_005_CENTER_DOOR", [
    "你试着拉动车门，但它纹丝不动，似乎已经锈蚀锁死了。",
    "车门紧闭着，不管你怎么用力它都没有反应。",
    "你抓住门缝试着将它拉开，但车门没有丝毫松动。"
  ]],
  ["E_05_JUNK_LEFT", [
    "你蹲下翻了翻这堆袋子，里面只有废纸和空包装。",
    "塑料袋被碰得窸窣作响，却没有露出任何有用的东西。",
    "你把最上面的袋子挪开，下面只有落满灰尘的地板。"
  ]],
  ["E_05_JUNK_RIGHT_REPEAT", [
    "你拨开右侧堆叠的袋子，只找到几个压扁的空盒。",
    "袋子里装着揉皱的包装纸，没有任何可用的东西。",
    "你试着提起其中一袋，里面的东西轻轻晃动，没有特别之处。"
  ]],
  ["E_006_WINDOW", [
    "车站昏暗的灯光与漆黑的隧道在窗外交替掠过。",
    "你望向窗外，只看见站台灯光和黑色隧道不断交替。",
    "玻璃上映出你的影子，影子背后是飞速掠过的隧道墙壁。"
  ]],
  ["E_006_CENTER_DOOR", [
    "你试着拉动车门，但它纹丝不动，似乎已经锈蚀锁死了。",
    "车门紧闭着，不管你怎么用力它都没有反应。",
    "你抓住门缝试着将它拉开，但车门没有丝毫松动。"
  ]]
]) {
  const action = actionsOf(eventId)[0];
  assert.equal(action.type, "custom", `${eventId} 应使用普通随机对白动作`);
  assert.equal(action.name, "randomDialogue", `${eventId} 应使用随机对白动作`);
  assert.deepEqual(action.params.texts, expectedTexts, `${eventId} 应使用指定的随机句子`);
}
for (const [eventId, expectedTexts] of [
  ["E_004_WINDOW", actionsOf("E_004_WINDOW")[0].params.texts],
  ["E_004_CENTER_DOOR", actionsOf("E_004_CENTER_DOOR")[0].params.texts],
  ["E_005_WINDOW", actionsOf("E_005_WINDOW")[0].params.texts],
  ["E_005_CENTER_DOOR", actionsOf("E_005_CENTER_DOOR")[0].params.texts],
  ["E_05_JUNK_LEFT", actionsOf("E_05_JUNK_LEFT")[0].params.texts],
  ["E_05_JUNK_RIGHT_REPEAT", actionsOf("E_05_JUNK_RIGHT_REPEAT")[0].params.texts],
  ["E_006_WINDOW", actionsOf("E_006_WINDOW")[0].params.texts],
  ["E_006_CENTER_DOOR", actionsOf("E_006_CENTER_DOOR")[0].params.texts]
]) {
  const game = fixture({ sceneId: "carriage_06" });
  await game.play(eventId);
  assert.equal(expectedTexts.includes(game.trace[0].text), true, `${eventId} 应实际显示句子库中的一条文案`);
}
assert.equal(objectOf("carriage_02", "clicker_02").clickEvent, "E_026_ACTION", "点击 Clicker 后应进入通过方式选择");
assert.match(mainSource, /getClickerItemEvent/, "背包应有 Clicker 场景下的投掷物与饮料使用分支");
assert.match(mainSource, /E_028_THROW_FIRST/, "玻璃瓶在 Clicker 场景下应直通投掷事件");
assert.match(mainSource, /E_028_THROW_CAN_FIRST/, "空易拉罐在 Clicker 场景下应直通投掷事件");
assert.match(mainSource, /E_ITEM_DRINK_CLICKER_INSPECT/, "Clicker 面前使用饮料应进入专属确认流程");
assert.doesNotMatch(mainSource, /点击投掷并直接通过/, "物品栏不得明示隐藏的投瓶捷径");
assert.match(crewNegotiationSource, /return 15 \* correctCount;/, "交涉小游戏每个正确回应应提供15%加成");
assert.match(mainSource, /maybeTriggerClickerReveal/, "进入2号并照明后应自动播放 Clicker 发现对白");
assert.equal(objectOf("front_carriage", "control_27").clickEvent, "E_032", "控制把手应打开操作面板");
assert.equal(objectOf("carriage_03", "door_03_to_02").clickEvent, "E_023", "3号通往2号的门应先播门前认知崩塌");
assert.equal(objectOf("carriage_04", "crew_04").clickEvent, "E_013", "乘务员热点应进入教育检定");
assert.match(diceSource, /registerDice\("ev013_education_01", attrCheck\("education", 17\)\)/, "乘务员前两次救治应使用阈值 17");
assert.match(diceSource, /registerDice\("ev020_education_01", attrCheck\("education", 16\)\)/, "乘务员第三次救治应使用阈值 16");
const carriage03 = sceneById.get("carriage_03");
assert.equal(carriage03.background, "assets/Image/Scene/Background/carriage-03-full.webp");
assert.deepEqual(carriage03.backgroundVariants, [
  {
    image: "assets/Image/Scene/Background/carriage-03.webp",
    visibleWhen: { flag: "carriage_03_bag_resolved", equals: true }
  },
  {
    image: "assets/Image/Scene/Background/carriage-03-onlybag.webp",
    visibleWhen: { flag: "carriage_03_bag_exposed", equals: true }
  },
  {
    image: "assets/Image/Scene/Background/carriage-03-halffull.webp",
    visibleWhen: { flag: "carriage_03_bag_interacted", equals: true }
  }
], "3号背景应按清空、黑包露出、半清理的优先级覆盖满载底图");
const blackBag03 = objectOf("carriage_03", "black_bag_03");
assert.equal(blackBag03.image, "assets/Image/Scene/StillLife/black-bag-03.webp");
assert.deepEqual(blackBag03.hitPosition, { x: 63, y: 50.8, width: 7.7, height: 10.3 });
assert.deepEqual(blackBag03.visibleWhen, {
  not: { flag: "carriage_03_bag_exposed", equals: true }
}, "没工具时点击背包不得将其隐藏");
assert.equal(
  objectOf("carriage_03", "forward_note_03").image,
  "assets/Image/Scene/StillLife/carriage-05-03-forward-note.webp"
);
assert.equal(
  objectOf("carriage_05", "tool_clutter_05").image,
  "assets/Image/Scene/StillLife/carriage-05-03-clutter.webp",
  "5号倒下的背包不得继续复用3号黑包"
);
assert.equal(objectOf("carriage_07", "corpse_07").image, "assets/Image/Scene/StillLife/corpse-07.webp");
assert.equal(objectOf("carriage_07", "radio_07").image, "assets/Image/Scene/StillLife/radio-07.webp");

for (const asset of [
  "carriage-03-full.webp",
  "carriage-03-halffull.webp",
  "carriage-03-onlybag.webp",
  "carriage-03.webp"
]) {
  assert.ok((await stat(new URL(`../assets/Image/Scene/Background/${asset}`, import.meta.url))).size > 0);
}
for (const asset of [
  "black-bag-03.webp",
  "carriage-05-03-clutter.webp",
  "carriage-05-03-forward-note.webp",
  "corpse-07.webp",
  "radio-07.webp"
]) {
  assert.ok((await stat(new URL(`../assets/Image/Scene/StillLife/${asset}`, import.meta.url))).size > 0);
}

const refreshScene = { type: "custom", name: "refreshScene" };
function assertFlagImmediatelyRefreshes(eventId, key, value = true) {
  const actions = actionsOf(eventId);
  const index = actions.findIndex((action) => (
    action.type === "setFlag" && action.key === key && action.value === value
  ));
  assert.ok(index >= 0, `${eventId} 缺少 ${key}=${value} 旗标`);
  assert.deepEqual(actions[index + 1], refreshScene, `${eventId} 的 ${key} 变更后应立即刷新场景`);
}
assertFlagImmediatelyRefreshes("E_017", "carriage_03_bag_interacted");
assertFlagImmediatelyRefreshes("E_018_TOOLS_READY", "carriage_03_bag_exposed");
assertFlagImmediatelyRefreshes("E_021", "carriage_03_bag_exposed");
assertFlagImmediatelyRefreshes("E_021_CARRIED", "carriage_03_bag_exposed");
assertFlagImmediatelyRefreshes("E_022_CARRIED", "carriage_03_forward_note_visible");
assertFlagImmediatelyRefreshes("E_022_CARRIED", "carriage_03_forward_note_visible", false);
assertFlagImmediatelyRefreshes("E_022_ALONE", "carriage_03_forward_note_visible");
assertFlagImmediatelyRefreshes("E_022_ALONE", "carriage_03_forward_note_visible", false);
assertFlagImmediatelyRefreshes("E_022_ITEM", "carriage_03_bag_resolved");
const seatedCrewLeft = objectOf("carriage_04", "crew_04_seated_left");
const seatedCrewRight = objectOf("carriage_04", "crew_04_seated_right");
assert.equal(seatedCrewLeft.image, "assets/Image/Scene/StillLife/carriage-04-conductor-seated.webp");
assert.equal(seatedCrewRight.image, seatedCrewLeft.image, "左右座位应复用同一张坐姿乘务员图层");
assert.equal(seatedCrewLeft.clickEvent, "E_013", "左侧坐姿应承接原乘务员热点");
assert.equal(seatedCrewRight.clickEvent, "E_013", "右侧坐姿应承接原乘务员热点");
assert.deepEqual(seatedCrewLeft.visibleWhen, {
  all: [
    { flag: "crew_04_left_seated", equals: true },
    { not: { flag: "carriage_03_bag_interacted", equals: true } },
    { not: { flag: "carried_crew", equals: true } }
  ]
});
assert.deepEqual(seatedCrewRight.visibleWhen, {
  all: [
    { flag: "crew_04_left_seated", equals: true },
    { flag: "carriage_03_bag_interacted", equals: true },
    { not: { flag: "carried_crew", equals: true } }
  ]
});
assert.equal(
  sceneById.get("carriage_04").backgroundVariants.some((variant) => (
    variant.image === "assets/Image/Scene/StillLife/carriage-04-conductor-carried-away.webp"
      && variant.visibleWhen?.flag === "crew_04_left_seated"
  )),
  true,
  "留下已救醒乘务员时应先移除背景里躺卧的人物"
);

const carriage05Items = actionsOf("E_05_TOOLS_SUCCESS")
  .filter((action) => action.type === "addItem")
  .map((action) => action.item);
assert.deepEqual(carriage05Items, ["flashlight"], "5号车厢背包只应发放手电筒");
assert.equal(
  actionsOf("E_018_PHONE").some((action) => action.type === "addItem" && action.item === "phone"),
  true,
  "手机应仍由3号车厢的手机热点发放"
);
assert.equal(
  actionsOf("E_GO_06_05").some((action) => (
    action.type === "setFlag" && action.key === "carriage_06_eaten" && action.value === true
  )),
  true,
  "首次进入5号车厢时应立即把6号车厢切为被啃食背景"
);
assert.deepEqual(
  sceneById.get("carriage_06").objects.find((object) => object.id === "door_06_to_07").visibleWhen,
  { not: { flag: "carriage_06_eaten", equals: true } },
  "6号车厢被啃食后不得再显示或点击通往7号车厢的门"
);
assert.equal(actionsOf("E_012")[0].text, "你听到背后传来一阵声响，来自6号车厢的方向。");
assert.equal(actionsOf("E_012").some((action) => action.type === "check"), false, "隔门时不应检定或看见6号车厢");
const eatenRevealActions = actionsOf("E_012_S");
assert.equal(
  eatenRevealActions.some((action) => action.type === "dialogue" && action.text === "你的眼前，6号车厢只剩不到半截。"),
  true,
  "6号车厢残缺描写应保留到玩家真正进入6号之后"
);
assert.equal(
  actionsOf("E_GO_05_06").some((action) => action.type === "conditionalJump" && action.next === "E_012_S"),
  true,
  "从5号进入6号时应承接被啃食场景揭示"
);
assert.deepEqual(actionsOf("E_011").slice(0, 2), [
  { type: "custom", name: "newspaperBlackout" },
  { type: "sound", sound: "switch1", startWithoutMetadata: true, fadeMs: 0 }
], "读报熄灯后必须通过标准音效动作播放开关声");
assert.equal(
  actionsOf("E_011_S").some((action) => action.name === "restoreNewspaperLighting" && action.params?.halfDark === true),
  true,
  "无手电筒读报完成后也必须置入5号半暗状态"
);
assert.equal(
  actionsOf("E_011_FLASHLIGHT_LIGHTS_ON").some((action) => action.name === "restoreNewspaperLighting" && action.params?.halfDark === true),
  true,
  "手电筒读报完成后必须置入5号半暗状态"
);
assert.equal(
  actionsOf("E_501").some((action) => action.type === "setFlag" && action.key === "carriage_06_eaten"),
  false,
  "进入里世界不应再次设置6号车厢被啃食状态"
);

// 6号失败分支按当前剧情直接进入7号；成功分支仍由玩家选择是否前进。
assert.equal(eventById.get("E_005_F").next, "E_005_DEPARTURE_B", "6号失败分支应直接进入7号流程");
assert.equal(actionsOf("E_005_F").some((action) => action.type === "choice"), false, "6号失败分支不应再弹出选择");
assert.equal(actionsOf("E_005")[1].next, "E_005_LOCKED", "6号调查未完成时应锁住7号门");
assert.deepEqual(actionsOf("E_005_STAY").slice(0, 2), [
  {
    type: "conditionalJump",
    when: { flag: "ev005_stay_rewarded", equals: true },
    next: "E_005_STAY_REVISIT"
  },
  { type: "setFlag", key: "ev005_stay_rewarded", value: true }
], "6号留守奖励应先检查并记录一次性完成状态");
assert.deepEqual(actionsOf("E_005_STAY_REVISIT"), [], "6号留守重访应静默结束");
assert.deepEqual(
  actionsOf("E_GO_06_05")[0],
  {
    type: "conditionalJump",
    when: { not: { flag: "ev008_scouting_done", equals: true } },
    next: "E_GO_06_05_LOCKED"
  },
  "6号调查未完成时应锁住5号门"
);
assert.equal(actionsOf("E_GO_05_04")[0].next, "E_GO_05_04_LOCKED", "未取得报纸时应锁住4号门");
assert.equal(actionsOf("E_DOOR_04")[0].next, "E_DOOR_04_LOCKED", "未处理乘务员时应锁住3号门");
assert.equal(actionsOf("E_023")[0].next, "E_023_LOCKED", "黑包流程未完成时应锁住3号到2号的门");

assert.deepEqual(actionsOf("E_006A").find((action) => action.dice === "ev006a_san_01").outcomes, ["E_006A_SAN_S", "E_006A_SAN_F"]);
assert.deepEqual(actionsOf("E_006B").find((action) => action.dice === "ev006b_san_01").outcomes, ["E_006B_SAN_S", "E_006B_SAN_F"]);
assert.equal(actionsOf("E_006B_SAN_S").some((action) => action.type === "modifyAttribute"), false, "忍住呕吐不应修改体质");
assert.deepEqual(
  actionsOf("E_006B_SAN_F").filter((action) => action.type === "modifyAttribute"),
  [{ type: "modifyAttribute", attribute: "constitution", amount: -1 }],
  "实际呕吐才应扣除 1 点体质"
);
assert.deepEqual(actionsOf("E_008").find((action) => action.dice === "ev008_insight_01").outcomes, ["E_008_S", "E_008_F"]);
assert.deepEqual(
  actionsOf("E_026").filter((action) => action.type === "check"),
  [{ type: "check", dice: "ev026_san_01" }],
  "Clicker 初见应进行一次 SAN 检定"
);
assert.equal(actionsOf("E_026_BOTTLE_HINT")[0].text, "你摸了摸口袋里的瓶子。");
for (const removed of [
  "E_026_SAN_S", "E_026_SAN_F", "E_026_AFTER_SAN", "E_029_CARD_EASY",
  "E_028", "E_028_BOTTLE_READY", "E_028_CONSTITUTION_CHECK", "E_028_CONSTITUTION_SUCCESS",
  "E_028_CONSTITUTION_FAIL", "E_028_THROW_AFTER_FAIL", "E_028_THROW_AFTER_SUCCESS",
  "E_05_SEARCH_NEWS", "E_020_DEAD_NEWSPAPER", "E_REFUSAL_RIGHT"
]) {
  assert.equal(eventById.has(removed), false, `${removed} 已删除，不得残留`);
}

for (const id of ["E_008_S", "E_009", "E_011_S", "E_012_AFTER", "E_016_LEAVE", "E_016_CARRY_SUCCESS", "E_016_CARRY_FAIL", "E_018_FINAL", "E_019_CARRIED", "E_019_ALONE", "E_020_CARRIED", "E_020_LEFT_AWAKE", "E_020_SECOND_MEDICAL_S", "E_020_DEAD_TOOLS", "E_027_S", "E_028_THROW_FIRST"]) {
  assert.equal(eventById.get(id).next, undefined, `${id} 结束时不得自动串到下一节车厢`);
  assert.equal(actionsOf(id).some((action) => action.type === "changeScene"), false, `${id} 不得替玩家切景`);
}
// 没工具时调查背包只给提示，不置“已调查”旗标，返回4号死亡线仍可拿工具后回来。
let bugRegressionGame = fixture({
  sceneId: "carriage_03",
  flags: { carriage_03_entry_narrative_v2_done: true }
});
await bugRegressionGame.play("E_017");
assert.equal(bugRegressionGame.state.flags.carriage_03_bag_interacted, true);
assert.equal(bugRegressionGame.state.flags.carriage_03_phone_available, true);
assert.equal(bugRegressionGame.trace.some((entry) => entry.text?.includes("需要能割断带子、撬开箱体的工具")), true);

bugRegressionGame = fixture({
  sceneId: "carriage_04",
  flags: { crew_04_dead: true, carriage_03_bag_interacted: true }
});
await bugRegressionGame.play("E_020");
assert.equal(bugRegressionGame.state.flags.tools_ready, true, "乘务员死亡后仍应能从员工柜取出工具");
assert.equal(bugRegressionGame.state.inventory.includes("emergency_cutter"), true);
assert.equal(bugRegressionGame.state.inventory.includes("pry_bar"), true);
assert.doesNotMatch(cardBattleSource, /next:\s*["']E_031["']/, "卡牌胜利不得自动进入先头车厢");
assert.doesNotMatch(mainSource, /maybeTriggerE009|flags\.ev008_scouting_done/, "7号返回6号不得再由主流程自动触发空车厢演出");

// 首次长演出各有独立守卫，重访只落到短反馈事件。
for (const [id, revisit] of [
  ["E_005", "E_005_REVISIT"],
  ["E_007", "E_007_REVISIT"],
  ["E_008", "E_008_REVISIT"],
  ["E_009", "E_009_REVISIT"],
  ["E_010", "E_010_REVISIT"],
  ["E_026", "E_026_REVISIT"],
  ["E_031", "E_031_REVISIT"]
]) {
  assert.equal(actionsOf(id).some((action) => action.type === "conditionalJump" && action.next === revisit), true, `${id} 应有重访去重守卫`);
}

// 读报与黑暗演出结束后留在5号；只有玩家点门才切到4号并承接首次发现描写。
for (const id of ["E_011_S", "E_012_AFTER"]) {
  assert.equal(eventById.get(id).next, undefined, `${id} 必须停在5号车厢`);
}
assert.equal(eventById.get("E_GO_05_04").next, "E_013_ENTRY");
const entryActions = actionsOf("E_013_ENTRY");
assert.equal(entryActions[0].type, "conditionalJump");
assert.equal(entryActions.filter((action) => action.type === "dialogue").length, 1);
assert.equal(eventById.get("E_013_ENTRY").next, undefined);
assert.deepEqual(entryActions[0].when, { flag: "crew_04_entry_seen", equals: true });
assert.equal(entryActions[0].next, "E_013_REVISIT");
assert.equal(entryActions.some((action) => action.type === "setFlag" && action.key === "crew_04_entry_seen"), true);
assert.equal(entryActions.some((action) => action.type === "check"), false, "到达演出不得自动触发医学检定");
// 到达描写不能留在出发场景。
assert.equal(actionsOf("E_012_AFTER").some((action) => action.type === "dialogue" && action.text.includes("4号车厢")), false);

// 点击乘务员直接进行教育检定；失败后允许再试一次，成功或第二次失败后结束。
assert.equal(actionsOf("E_013_REVISIT").some((action) => action.type === "dialogue"), true, "重复到达应提供简短状态反馈");
const firstAidActions = actionsOf("E_013");
assert.equal(firstAidActions[0].type, "conditionalJump", "已完成医学处理后再次点击应直接离开");
assert.deepEqual(firstAidActions[0].when, { flag: "crew_04_interacted", equals: true });
assert.equal(firstAidActions[0].next, "E_013_CANCEL");
assert.equal(eventById.get("E_013").next, "E_013_USE");
assert.deepEqual(actionsOf("E_013_CANCEL"), [], "已完成处理后应直接留在4号车厢");
const firstAidUseActions = actionsOf("E_013_USE");
assert.deepEqual(firstAidUseActions[0], {
  type: "conditionalJump",
  when: { flag: "crew_04_medical_attempted", equals: true },
  next: "E_013_USE_SECOND"
});
assert.equal(firstAidUseActions.some((action) => action.type === "setFlag" && action.key === "crew_04_medical_attempted"), true);
const firstAidCheck = firstAidUseActions.find((action) => action.type === "check");
const secondFirstAidCheck = actionsOf("E_013_USE_SECOND").find((action) => action.type === "check");
assert.deepEqual(firstAidCheck.outcomes, ["E_013_S", "E_013_F_RETRY"]);
assert.deepEqual(secondFirstAidCheck.outcomes, ["E_013_S", "E_013_F"]);
assert.equal(firstAidCheck.checkId, "crew_04_medical");
assert.equal(secondFirstAidCheck.checkId, firstAidCheck.checkId, "两次医学检定必须共享同一个检定身份");
assert.equal(actionsOf("E_013_F_RETRY").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted"), false);
assert.equal(actionsOf("E_013_F").some((action) => action.type === "setFlag" && action.key === "crew_04_medical_failed" && action.value === true), true);
assert.equal(actionsOf("E_013_S").some((action) => action.type === "setFlag" && action.key === "crew_04_medical_success" && action.value === true), true);
assert.equal(actionsOf("E_013_S").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted" && action.value === true), true);
assert.equal(actionsOf("E_013_F").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted" && action.value === true), true);
for (const id of ["E_013_S", "E_020_SECOND_MEDICAL_S"]) {
  assert.equal(actionsOf(id).some((action) => action.type === "modifyAttribute" && action.attribute === "san" && action.amount === 2), true, `${id} 救活乘务员后应奖励 2 点 SAN`);
}
assert.equal(actionsOf("E_018_ALONE_REACTION").some((action) => action.text?.includes("乘务员") || action.text?.includes("反复念叨")), false, "未获乘务员口述时，短信后的反应不得凭空得知停车线索");
assert.equal(actionsOf("E_018_FINAL").some((action) => action.text?.includes("4号车厢")), false, "未获乘务员口述时，不得提前得知员工柜工具位置");
assert.equal(actionsOf("E_021_ALONE_S").some((action) => action.text?.includes("乘务员留下的信息")), false, "独自打开黑包时不得引用未获得的乘务员情报");
assert.equal(actionsOf("E_020").find((action) => action.when?.flag === "crew_04_dead")?.next, "E_020_DEAD_TOOLS", "已死亡的旧状态检查员工柜时应进入补发工具分支");
for (const item of ["emergency_cutter", "pry_bar"]) {
  assert.equal(actionsOf("E_020_DEAD_TOOLS").some((action) => action.type === "addItem" && action.item === item), true, `死亡线应取得 ${item}`);
}
assert.equal(actionsOf("E_020_DEAD_TOOLS").some((action) => action.type === "setFlag" && action.key === "tools_ready" && action.value === true), true, "死亡线应解锁工具进度");
assert.equal(actionsOf("E_016_LEAVE").some((action) => action.type === "setFlag" && action.key === "crew_04_left_seated" && action.value === true), true);
assert.equal(actionsOf("E_016_CARRY_FAIL").some((action) => action.type === "setFlag" && action.key === "crew_04_left_seated"), false, "尝试背起但失败不应混入明确选择留下的坐姿分支");

// 4号→3号折返有折返描写。
const door04 = actionsOf("E_DOOR_04");
assert.equal(door04[0].next, "E_DOOR_04_LOCKED");
assert.deepEqual(door04[1], { type: "sound", sound: "door_open" });
assert.deepEqual(door04[2], { type: "changeScene", scene: "carriage_03" });
assert.match(door04.find((action) => action.type === "dialogue").text, /返回3号车厢/);

// 3号→2号不再由剧情自动进车：E_022_ITEM 完成黑包流程即停，E_023 末段直接接里世界入口；
// 进车只能由玩家点 door_03_to_02（E_023 门前认知崩塌 → E_501）。E_024 光源侦查旧线已删除（见 docs/main-route-wiring.md）。
assert.equal(eventById.get("E_022_ITEM").next, undefined);
assert.equal(eventById.get("E_023_LOOP").next, "E_501");

for (const [id, sceneId] of [["E_505", "carriage_fake_04"], ["E_510", "flower_sea"], ["E_513", "carriage_fake_03"]]) {
  const actions = actionsOf(id);
  assert.equal(
    actions.some((action) => action.type === "changeScene" && action.scene === sceneId),
    true,
    `${id} 应切入 ${sceneId}`
  );
  assert.equal(
    actions.some((action) => action.type === "sound" && action.sound === "fake"),
    false,
    `${id} 不应再从剧情动作重启场景音乐`
  );
}

const bottleSongLine = actionsOf("E_503_PICK")
  .find((action) => action.type === "dialogue" && action.text.includes("像是歌声"));
assert.deepEqual(bottleSongLine.audio, { sound: "ghost_calling" });
for (const sceneId of ["carriage_fake_04", "flower_sea", "flower_sea_inside"]) {
  assert.equal(sceneById.get(sceneId).backgroundSound.sound, "fake", `${sceneId} 应绑定同一背景音`);
}
for (const sceneId of ["carriage_06", "carriage_05", "carriage_04", "carriage_03", "front_carriage"]) {
  assert.equal(sceneById.get(sceneId).backgroundSound.sound, "train_ambient", `${sceneId} 应绑定列车背景音`);
}
assert.deepEqual(sceneById.get("carriage_06").backgroundSound, { sound: "train_ambient" });
assert.equal(sceneById.get("carriage_06").backgroundSoundVariants[0].sound, "eating_crisps");
assert.deepEqual(sceneById.get("carriage_07").backgroundSound, { sound: "eating_crisps", loopGapMs: 1600 });
assert.deepEqual(sceneById.get("carriage_02").backgroundSound, { sound: "devil_scared" });
assert.deepEqual(sceneById.get("carriage_fake_01").backgroundSound, { sound: "maze" });
for (const sceneId of ["carriage_inner_01", "carriage_inner_02", "carriage_fake_02", "carriage_fake_03"]) {
  assert.equal(sceneById.get(sceneId).backgroundSound, undefined, `${sceneId} 应保持无背景音`);
}
assert.match(mainSource, /backgroundSoundVariants[\s\S]*backgroundAudio\?\.setTrack/);
assert.match(bgmSource, /pageFile === "ending\.html"[\s\S]*assets\/Audio\/Bgm\/op-v2\.mp3/);
assert.match(bgmSource, /home\.html", "settings\.html", "ending\.html/);
const pageFlowSource = await read("src/page-flow.js");
const loginSource = await read("src/login.js");
const endingPageSource = await read("ending.html");
const endingRevealSource = await read("ending-reveal.html");
assert.match(loginSource, /markHomeOpIntent\("login"\)/, "登录成功进入主页前应请求 OP");
assert.match(endingPageSource, /markHomeOpIntent\("ending"\)/, "视频结局页返回主页前应请求 OP");
assert.match(endingPageSource, /ending-video-stage[\s\S]*ending-video-ratio/, "视频结局页的热区应与视频舞台共用比例");
assert.match(endingPageSource, /videoWidth[\s\S]*videoHeight[\s\S]*loadedmetadata/, "视频结局页应读取素材原始比例");
assert.doesNotMatch(endingPageSource, /ending-title|ending-description/, "视频结局页不应重复渲染结局文案");
assert.match(endingRevealSource, /ending-reveal[\s\S]*ending-reveal-unlocked/, "过渡页应提供统一的达成展示");
assert.match(endingRevealSource, /--ending-background-image[\s\S]*navigate\("ending"/, "过渡页应展示结局背景后进入视频结局页");
assert.match(endingRevealSource, /600[\s\S]*3400/, "过渡页应按既定时长自动淡出");
assert.doesNotMatch(mainSource, /codex-ending-overlay/, "游戏页不应保留视频透明热区");
assert.match(mainSource, /reason === "true_end"[\s\S]*reason === "fake_end"[\s\S]*reason === "bad_end"[\s\S]*reason === "san"[\s\S]*reason === "lost"[\s\S]*navigateToEnding\(reason\)/, "所有结局 OP 后都应进入过渡页");
assert.match(mainSource, /navigate\("endingReveal"/, "游戏终局应跳转结局达成过渡页");
assert.match(pageFlowSource, /endingReveal: "ending-reveal\.html"[\s\S]*ending: "ending\.html"/, "路由应区分过渡页与视频结局页");
assert.match(homeOpSource, /consumeHomeOpIntent/, "主页 OP 应消费一次性入口标记");
assert.match(pageFlowSource, /source !== "login" && source !== "ending"/, "OP 标记只允许登录与结局来源");
assert.match(bgmSource, /BASE_VOLUME \* userGain/);
assert.match(homeOpSource, /AUDIO_SILENCE_MS = 250/);
assert.match(homeOpSource, /AUDIO_FADE_IN_MS = 2000/);
assert.match(homeOpSource, /PlayerProfile\?\.getAudioGain/);
assert.match(mainSource, /unlockEnding\?\.\(reason\)[\s\S]*reason === "lost"/, "所有终局都应在跳页或播放过场前解锁");
assert.match(settingsSource, /if \(unlocked\)[\s\S]*createElement\("img"\)[\s\S]*else/, "锁定卡片不得创建真实图片元素");

// 里世界常规返程：E_524 回到真2号后直接接 E_025 喘息段，播完停下（不自动进 Clicker 遭遇）。
assert.equal(eventById.get("E_524_DONE").next, "E_025");
assert.equal(eventById.get("E_524_CREW").next, "E_025");
assert.equal(eventById.has("E_524_SAN_CHECK"), false);
const fake01ExitActions = eventById.get("E_FAKE01_EXIT").actions;
const fake01ScreamLine = fake01ExitActions.findIndex(action => action.text === "你失去了呼喊的力气。");
assert.deepEqual(fake01ExitActions[fake01ScreamLine + 1], { type: "check", dice: "ev_fake01_exit_san_01" });
assert.equal(eventById.get("E_025").next, undefined);
assert.equal(eventById.get("E_025_CARRIED").next, undefined);

// 收音机成功音与头车结局入口。结局 A 的完整演出由 main.js 在终止路径播放，
// E_034 只负责写入 true_end，避免旧版简化对白与正式过场重复。
assert.deepEqual(actionsOf("E_0008_S")[0], { type: "sound", sound: "loud_noise" });
assert.deepEqual(actionsOf("E_034")[0], {
  type: "conditionalJump",
  when: { flag: "ev510_flower_sea", equals: true },
  next: "E_515"
});
assert.deepEqual(actionsOf("E_034")[1], { type: "custom", name: "endGame", params: { reason: "true_end" } });
assert.deepEqual(actionsOf("E_515"), [
  { type: "custom", name: "endGame", params: { reason: "fake_end" } }
]);
assert.match(mainSource, /reason === "fake_end"[\s\S]*playFakeEndingSequence/);
assert.deepEqual(actionsOf("E_030"), [
  { type: "custom", name: "endGame", params: { reason: "bad_end" } }
]);
assert.deepEqual(actionsOf("E_035"), [
  { type: "custom", name: "endGame", params: { reason: "bad_end" } }
]);
assert.deepEqual(actionsOf("E_003")[0], { type: "sound", sound: "tearing" });
assert.equal(
  actionsOf("E_005_GUIDE").some((action) => action.type === "sound" && action.sound === "opening_cracker_bag"),
  true
);
assert.equal(actionsOf("E_028_THROW_SUCCESS").some((action) => action.type === "sound" && action.sound === "breaking_glass"), true);
assert.equal(actionsOf("E_028_THROW_FAIL").some((action) => action.type === "sound" && action.sound === "breaking_glass"), true);
for (const [id, holder] of [
  ["E_021_CARRIED_S", "player"],
  ["E_021_CARRIED_F", "crew"],
  ["E_021_ALONE_S", "player"],
  ["E_031_NO_KEY_S", "player"],
  ["E_524_KEY", "player"]
]) {
  assert.equal(
    actionsOf(id).some((action) => action.type === "custom" && action.name === "keyHopeSanReward" && action.params?.holder === holder),
    true,
    `${id} 找到钥匙后应按${holder === "crew" ? "乘务员" : "玩家"}持有者结算希望奖励`
  );
}
for (const id of [
  "E_018_SEARCH_PHONE",
  "E_021_CARRIED",
  "E_021_ALONE",
  "E_022_ALONE",
  "E_05_SEARCH_TOOLS"
]) {
  assert.equal(
    actionsOf(id).some((action) => action.type === "sound" && action.sound === "finding_in_papers"),
    true,
    `${id} 翻找时应播放搜索音`
  );
}

// 安静通过也算通过，前门不再永远被堵；前门通向先头车厢到达事件。
assert.equal(actionsOf("E_027_S").some((action) => action.type === "setFlag" && action.key === "carriage_02_passed" && action.value === true), true);
const frontDoorOption = actionsOf("E_GO_02_FRONT_DOOR")[0].options.find((option) => option.label === "推开安全门");
assert.equal(frontDoorOption.next, "E_031");
assert.deepEqual(frontDoorOption.when, { flag: "carriage_02_passed", equals: true });

// ---------- 逐句场景轨迹 ----------

const allCarriage05Inspected = {
  carriage_05_inspected_clutter_a: true,
  carriage_05_inspected_clutter_b: true,
  carriage_05_inspected_tools: true,
  carriage_05_inspected_newspaper: true,
  carriage_05_inspected_clutter_c: true,
  carriage_05_inspected_clutter_d: true
};
const drinkPickupGame = fixture({
  sceneId: "carriage_05",
  flags: { carriage_05_inspected_clutter_d: true }
});
await drinkPickupGame.play("E_05_JUNK_RIGHT");
assert.equal(drinkPickupGame.state.inventory.includes("drink"), true, "旧存档再次调查右侧塑料袋时应获得饮料");
assert.equal(drinkPickupGame.state.flags.carriage_05_drink_collected, true);
const drinkUseGame = fixture({ sceneId: "carriage_05", inventory: ["drink"] });
await drinkUseGame.play("E_ITEM_DRINK_USE");
assert.equal(drinkUseGame.state.inventory.includes("drink_empty"), true, "饮用后应留下空易拉罐");
assert.equal(drinkUseGame.state.inventory.includes("drink"), false, "饮用后不应保留饮料");
assert.equal(drinkUseGame.state.getAttribute("san"), 3, "饮用后应回复 SAN +2");
assert.equal(actionsOf("E_ITEM_DRINK_CLICKER_USE").at(-1).amount, 2, "Clicker 面前饮用同样应回复 SAN +2");
assert.equal(eventById.get("E_ITEM_DRINK_CLICKER_USE").next, "E_029_CARD_HARD", "Clicker 面前饮用后应直接进入困难战斗");
assert.equal(actionsOf("E_028_THROW_CAN_FIRST").find((action) => action.type === "check")?.dice, "ev028_throw_01", "空易拉罐应复用玻璃瓶投掷检定");
assert.equal(actionsOf("E_028_THROW_CAN_SUCCESS").some((action) => action.type === "sound" && action.sound === "breaking_glass"), true, "空易拉罐投掷应暂时复用玻璃瓶音效");
let rewardGame = fixture({ sceneId: "carriage_05", flags: allCarriage05Inspected });
await rewardGame.play("E_05_CHECK_ALL");
assert.equal(rewardGame.state.flags.carriage_05_all_inspected_rewarded, true);
assert.equal(rewardGame.state.getAttribute("insight"), 4, "六个物件齐全后应奖励灵感+1");
assert.equal(rewardGame.state.getAttribute("san"), 2, "六个物件齐全后应奖励 SAN+1");
assert.deepEqual(
  rewardGame.attributeChanges.map(({ name, requested, before, after }) => ({ name, requested, before, after })),
  [
    { name: "灵感", requested: 1, before: 3, after: 4 },
    { name: "SAN", requested: 1, before: 1, after: 2 }
  ],
  "整理成线索的两项属性奖励应按灵感、SAN 的顺序触发提示"
);
await rewardGame.play("E_05_CHECK_ALL");
assert.equal(rewardGame.state.getAttribute("insight"), 4, "完整调查奖励只能获得一次");
assert.equal(rewardGame.state.getAttribute("san"), 2, "完整调查奖励只能获得一次 SAN+1");
rewardGame = fixture({
  sceneId: "carriage_05",
  flags: { ...allCarriage05Inspected, carriage_05_inspected_clutter_d: false }
});
await rewardGame.play("E_05_CHECK_ALL");
assert.equal(rewardGame.state.flags.carriage_05_all_inspected_rewarded, undefined, "六个物件缺一不得奖励");

// 5号右门：只切景、只说一句过门话，绝不触发医学检定。
let game = fixture({ sceneId: "carriage_05", inventory: ["newspaper"] });
await game.play("E_GO_05_04");
assert.equal(scenesOf(game).every((sceneId) => sceneId === "carriage_04"), true);
assert.match(game.trace[0].text, /来到4号车厢/);
assert.match(game.trace[1].text, /一名重伤昏迷的乘务员/);
assert.deepEqual(game.diceCalls, [], "普通过门不得触发检定");
assert.equal(game.state.flags.crew_met, true);

// 黑暗演出只催促玩家离开，不再自动切景。
game = fixture({ sceneId: "carriage_05" });
await game.play("E_012_AFTER");
assert.equal(game.state.sceneId, "carriage_05");
assert.equal(game.trace.some((entry) => entry.scene === "carriage_04"), false);
assert.deepEqual(game.diceCalls, []);
game = fixture({ sceneId: "carriage_04" });
await game.play("E_013_ENTRY");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);
game.trace.length = 0;
await game.play("E_013_ENTRY");
assert.equal(game.trace.some((entry) => entry.text?.includes("一名重伤昏迷")), false, "重复到达不得重播首次发现描写");
assert.equal(game.trace.some((entry) => entry.text?.includes("还没有处理她的伤口")), true, "未交互时重复到达不得误报已处理伤口");
assert.notEqual(game.state.flags.crew_04_interacted, true, "重复进入车厢不得把乘务员标记为已交互");
assert.deepEqual(game.diceCalls, []);

// 6号车厢的冷静段落只结算一次；旧存档没有旗标时仍能正常获得首次奖励。
game = fixture({ sceneId: "carriage_06" });
await game.play("E_005_STAY");
assert.equal(game.state.flags.ev005_stay_rewarded, true, "首次留在6号车厢应记录已获得冷静奖励");
assert.equal(game.attributeChanges.filter(({ name, requested }) => name === "SAN" && requested === 1).length, 1, "首次留守应只奖励 1 点 SAN");
game.trace.length = 0;
await game.play("E_005_STAY");
assert.equal(game.attributeChanges.filter(({ name, requested }) => name === "SAN" && requested === 1).length, 1, "再次留守不得重复奖励 SAN");
assert.deepEqual(game.trace, [], "再次留在6号车厢不得重播冷静段落");

// 点击乘务员：直接教育检定；失败后允许再试一次，成功或第二次失败后结束。
game = fixture({ sceneId: "carriage_04", dice: { ev013_education_01: [1, 0] } });
await game.play("E_013");
assert.deepEqual(game.diceCalls, ["ev013_education_01"]);
assert.equal(game.state.flags.crew_04_medical_attempted, true);
assert.equal(game.state.flags.crew_04_interacted, undefined, "第一次医学检定失败后应保留乘务员热点");
assert.equal(game.state.flags.crew_04_medical_failed, true, "第一次医学检定失败要写入临时状态");
await game.play("E_013");
assert.equal(
  game.diceCalls.filter((id) => id === "ev013_education_01").length,
  2,
  "第一次失败后应允许第二次医学检定"
);
assert.equal(game.state.flags.crew_04_interacted, true, "第二次医学检定成功后应结束调查");
assert.equal(game.state.flags.crew_04_medical_success, true);
assert.equal(game.state.flags.crew_04_medical_failed, false);

game = fixture({ sceneId: "carriage_04", dice: { ev013_education_01: 0 } });
await game.play("E_013");
assert.equal(game.diceCalls.filter((id) => id === "ev013_education_01").length, 1);
await game.play("E_013");
assert.equal(
  game.diceCalls.filter((id) => id === "ev013_education_01").length,
  1,
  "第一次成功后不允许再次检定"
);
assert.equal(game.state.flags.crew_04_interacted, true);

game = fixture({ sceneId: "carriage_04", dice: { ev013_education_01: [1, 1] } });
await game.play("E_013");
await game.play("E_013");
assert.deepEqual(game.diceCalls, ["ev013_education_01", "ev013_education_01"]);
assert.equal(game.state.flags.crew_04_interacted, true, "第二次医学检定失败后应结束调查");
assert.equal(game.state.flags.crew_04_medical_failed, true);

// 两次初步救治失败后，主角只会看到黑包和手机短信，不会把未听到的口述情报当作已知。
await game.play("E_DOOR_04");
await game.play("E_017");
await game.play("E_018_PHONE");
assert.equal(game.trace.some((entry) => entry.text?.includes("黑包，3号前门")), false, "失败路线不得凭空知道黑包位置");
assert.equal(game.trace.some((entry) => entry.text?.includes("反复念叨的那句“停车”")), false, "失败路线不得凭空知道停车线索");
assert.equal(game.trace.some((entry) => entry.text?.includes("工具，似乎在4号车厢")), false, "失败路线不得提前知道工具位置");

// 第三次救治失败后仍可取工具、返回3号清开行李并继续黑包流程。
game = fixture({
  sceneId: "carriage_04",
  flags: { crew_04_interacted: true, crew_04_medical_failed: true, carriage_03_first_entry_seen: true, carriage_03_bag_interacted: true },
  dice: { ev020_education_01: 1 }
});
await game.play("E_020");
assert.equal(game.state.flags.crew_04_dead, true, "第三次救治失败后乘务员应死亡");
assert.equal(game.state.flags.tools_ready, true, "乘务员死亡不得阻断工具进度");
assert.equal(game.state.inventory.includes("emergency_cutter"), true);
assert.equal(game.state.inventory.includes("pry_bar"), true);
await game.play("E_DOOR_04");
assert.equal(game.state.flags.carriage_03_bag_exposed, true, "带工具返回3号后应能清开黑包");
assert.equal(game.state.inventory.includes("driver_cab_key"), true, "死亡线仍应能从黑包取得驾驶室钥匙");
assert.equal(game.state.inventory.includes("control_panel_key"), true, "死亡线仍应能从黑包取得操作面板钥匙");

// 兼容旧存档：已死亡但尚未领取工具时，再查员工柜必须补发工具。
game = fixture({
  sceneId: "carriage_04",
  flags: { crew_04_dead: true, crew_04_interacted: true, carriage_03_bag_interacted: true }
});
await game.play("E_020");
assert.equal(game.state.flags.tools_ready, true, "死亡旧档应通过员工柜恢复工具进度");
assert.equal(game.state.inventory.includes("emergency_cutter"), true);
assert.equal(game.state.inventory.includes("pry_bar"), true);

// 读报路线同样停在 carriage_05。
game = fixture({ sceneId: "carriage_05" });
await game.play("E_012_AFTER");
assert.equal(game.state.sceneId, "carriage_05");

game = fixture({ sceneId: "carriage_05" });
await game.play("E_011_S");
assert.equal(game.state.sceneId, "carriage_05");
assert.equal(game.state.flags.carriage_05_half_dark, true, "读报后5号车厢应保持左半侧压暗");

// 4号→3号折返：切景后播折返描写；“还没做3号入场叙述”时仍由 E_018 接走。
game = fixture({ sceneId: "carriage_04", flags: { crew_04_interacted: true, carriage_03_first_entry_seen: true, carriage_03_bag_interacted: true } });
await game.play("E_DOOR_04");
assert.deepEqual(scenesOf(game), ["carriage_03"]);
assert.match(game.trace[game.trace.length - 1].text, /返回3号车厢/);

game = fixture({ sceneId: "carriage_04", flags: { crew_04_interacted: true } });
await game.play("E_DOOR_04");
assert.equal(game.state.sceneId, "carriage_03");
assert.match(game.trace[0].text, /返回3号车厢/);
assert.equal(game.trace.some((entry) => /大量行李/.test(entry.text)), true, "首次进入3号仍应接入场介绍");

// 里世界返程：先切到真2号再播到达描写，接着走 E_025 喘息段后停下（进车与点门接线见上方结构断言）。
game = fixture({ sceneId: "carriage_inner_01" });
await game.play("E_524");
const cut = assertCutBefore(game, "carriage_inner_01", "carriage_02");
assert.equal(game.trace[cut].text, "这一次，门后是真正的2号车厢。");
assert.match(game.trace[cut - 1].text, /推开门——$/, "推门句仍属于里世界一侧");
assert.match(game.trace[game.trace.length - 1].text, /那不是人类的喘息/);
assert.equal(game.state.sceneId, "carriage_02");
assert.equal(game.trace.some((entry) => entry.scene === "carriage_02" && entry.text === "四周毫无光源。"), true);
assert.equal(game.trace.some((entry) => entry.event === "E_026"), false, "进入2号后应等待玩家点击 Clicker");

// 找到钥匙时，低 SAN 额外获得一点恢复；文案随钥匙保管者变化。
game = fixture();
game.state.setAttribute("san", 3);
game.engine.events.set("TEST_KEY_HOPE_LOW", { id: "TEST_KEY_HOPE_LOW", actions: [{ type: "custom", name: "keyHopeSanReward", params: { holder: "player" } }] });
await game.play("TEST_KEY_HOPE_LOW");
assert.equal(game.state.getAttribute("san"), 6);
assert.equal(game.trace.some((entry) => entry.text === "看着你手中的钥匙，你觉得又有了活下去的希望。"), true);
game = fixture();
game.state.setAttribute("san", 4);
game.engine.events.set("TEST_KEY_HOPE_NORMAL", { id: "TEST_KEY_HOPE_NORMAL", actions: [{ type: "custom", name: "keyHopeSanReward", params: { holder: "crew" } }] });
await game.play("TEST_KEY_HOPE_NORMAL");
assert.equal(game.state.getAttribute("san"), 6);
assert.equal(game.trace.some((entry) => entry.text === "看着乘务员手中的钥匙，你觉得又有了活下去的希望。"), true);

// 初见进行一次 SAN 检定；持瓶时追加模糊提示，Clicker 本体仍只提供潜行/正面对抗。
game = fixture({ sceneId: "carriage_02", flags: { light_used: true }, dice: { ev026_san_01: 0 } });
await game.play("E_026");
assert.equal(scenesOf(game)[0], "carriage_02");
assert.match(game.trace[0].text, /怪物/);
assert.deepEqual(game.diceCalls, ["ev026_san_01"], "Clicker 初见应掷一次 SAN");
assert.equal(game.trace.some((entry) => entry.text === "你摸了摸口袋里的瓶子。"), false);
assert.equal(game.trace.some((entry) => entry.text.includes("回到3号车厢")), false, "Clicker 不得触发3号车厢内容");
assert.equal(game.trace.some((entry) => entry.text.includes("你取出工具")), false);
assert.equal(game.trace.some((entry) => entry.event === "E_026_ACTION"), false, "发现对白结束前不应弹通过方式");
game = fixture({ sceneId: "carriage_02", flags: { light_used: true }, inventory: ["bottle"], dice: { ev026_san_01: 0 } });
await game.play("E_026");
assert.equal(game.trace.some((entry) => entry.text === "你摸了摸口袋里的瓶子。"), true, "持瓶初见应给出模糊提示");

game = fixture({
  sceneId: "carriage_02",
  flags: { clicker_first_encounter_seen: true },
  choiceLabels: ["安静潜行"],
  dice: {
    ev027_constitution_01: 0,
    ev027_san_01: 0,
    ev027_constitution_02: 0,
    ev027_san_02: 1,
    ev027_constitution_03: 0,
    ev027_san_03: 0
  }
});
await game.play("E_026_ACTION");
assert.equal(game.state.flags.carriage_02_passed, true, "安静通过后要置通过状态");
assert.equal(game.state.sceneId, "carriage_02", "安静通过成功后应停在安全门前");
assert.equal(game.trace.some((entry) => entry.scene === "front_carriage"), false);
assert.deepEqual(game.diceCalls, [
  "ev027_constitution_01", "ev027_san_01",
  "ev027_constitution_02", "ev027_san_02",
  "ev027_constitution_03", "ev027_san_03"
], "潜行必须依次执行三轮体质与 SAN 检定");

// 任一潜行阶段失败都进入困难卡牌；正面对抗不掷体质，直接进入简单卡牌。
for (const failedDice of ["ev027_constitution_01", "ev027_constitution_02", "ev027_constitution_03"]) {
  game = fixture({
    sceneId: "carriage_02",
    flags: { clicker_first_encounter_seen: true },
    choiceLabels: ["安静潜行"],
    dice: { [failedDice]: 1 }
  });
  await game.play("E_026_ACTION");
  assert.equal(game.state.flags.card_battle_won, false, `${failedDice} 失败前应重置战斗结果`);
  assert.equal(game.trace.some((entry) => entry.text?.includes("困难模式")), true, `${failedDice} 失败应进入困难模式`);
}
game = fixture({ sceneId: "carriage_02", flags: { clicker_first_encounter_seen: true }, choiceLabels: ["正面对抗"] });
await game.play("E_026_ACTION");
assert.equal(game.diceCalls.length, 0, "正面对抗不得再进行前置体质检定");
assert.equal(actionsOf("E_029").some((action) => action.type === "minigame" && action.game === "card_battle"), true);

// 物品栏投瓶：成功直接通行，失手消耗瓶子并进入困难卡牌。
game = fixture({ sceneId: "carriage_02", inventory: ["bottle"], dice: { ev028_throw_01: 0 } });
await game.play("E_028_THROW_FIRST");
assert.equal(game.state.inventory.length, 0);
assert.equal(game.state.flags.carriage_02_passed, true);
assert.equal(game.state.flags.clicker_cleared, true);
game = fixture({ sceneId: "carriage_02", inventory: ["bottle"], dice: { ev028_throw_01: 1 } });
await game.play("E_028_THROW_FIRST");
assert.equal(game.state.inventory.length, 0);
assert.equal(game.state.flags.carriage_02_passed, undefined);
assert.equal(game.trace.some((entry) => entry.text?.includes("困难模式")), true);
game = fixture({
  sceneId: "carriage_02",
  flags: { carriage_02_passed: true },
  inventory: ["driver_cab_key", "control_panel_key"]
});
await game.play("E_GO_02_FRONT_DOOR");
assert.equal(game.state.sceneId, "front_carriage", "玩家点安全门后才进入先头车厢");

// 首次打开驾驶室只播放操作台说明；结局操作必须由玩家另行点击控制把手。
game = fixture({
  sceneId: "carriage_02",
  flags: { carriage_02_passed: true },
  inventory: ["driver_cab_key", "control_panel_key"],
  choiceLabels: ["右杆上推——加速，继续前进"]
});
await game.play("E_GO_02_FRONT_DOOR");
assert.deepEqual([...new Set(scenesOf(game))], ["front_carriage"]);
assert.equal(game.trace.some((entry) => /操作面板/.test(entry.text)), true, "首次进入驾驶室应播放操作台说明");
assert.equal(game.state.flags.ending_reason, undefined, "进入驾驶室后不应自动弹出把手操作选择");

// 点击把手才进入操作选择；单人加速直达真结局，且不触发2号车厢检定。
await game.play("E_032");
assert.equal(game.diceCalls.includes("ev027_constitution_01"), false, "控制把手不得触发体质检定");
assert.equal(game.state.flags.ending_reason, "true_end");

// 乘务员持钥匙时自动操作把手：限时抢夺才进入拉杆争夺，超时或放手则停车。
assert.equal(eventById.get("E_031_CREW_KEY").next, "E_032_CREW_AUTO");
const crewAutoChoice = actionsOf("E_032_CREW_AUTO").find((action) => action.name === "timedStoryChoice");
assert.deepEqual(crewAutoChoice.params, {
  prompt: "乘务员正要把右杆向下拉——",
  duration: 5000,
  flag: "ev032_take_lever",
  defaultValue: false,
  options: [
    { label: "抢过把手，向上推——加速", value: true },
    { label: "让乘务员来操作", value: false }
  ]
});
assert.equal(actionsOf("E_032_CREW_AUTO").find((action) => action.type === "conditionalJump").next, "E_033");
assert.equal(eventById.get("E_032_CREW_AUTO").next, "E_035");
assert.equal(actionsOf("E_033").some((action) => action.type === "minigame" && action.game === "conductor_tug"), true);
game = fixture({
  sceneId: "front_carriage",
  flags: { carried_crew: true, keys_crew: true },
  choiceLabels: ["让乘务员来操作"]
});
await game.play("E_031_CREW_KEY");
assert.equal(game.state.flags.ending_reason, "bad_end", "让乘务员操作应进入停车坏结局");
game = fixture({
  sceneId: "front_carriage",
  flags: { carried_crew: true, keys_crew: true },
  choiceLabels: ["抢过把手，向上推——加速"]
});
await game.play("E_031_CREW_KEY");
assert.equal(game.trace.some((entry) => entry.text?.includes("猛地抢过右杆")), true, "抢夺把手应进入控制杆争夺前的剧情");

console.log("主线接线回归通过：4号车厢首次发现与医学询问、折返描写、3号→2号点门驱动、Clicker 与控制杆接线。");
