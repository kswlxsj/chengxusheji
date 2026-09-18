import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const storage = new Map();
const session = new Map();
const localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key)
};
const sessionStorage = {
  getItem: (key) => session.has(key) ? session.get(key) : null,
  setItem: (key, value) => session.set(key, String(value)),
  removeItem: (key) => session.delete(key)
};
const sandbox = {
  console,
  JSON,
  Map,
  Set,
  Object,
  Array,
  Number,
  Boolean,
  String,
  Math,
  TypeError,
  RangeError,
  Error,
  performance,
  setTimeout,
  clearTimeout,
  localStorage,
  sessionStorage,
  window: { localStorage, sessionStorage, performance }
};
vm.createContext(sandbox);

for (const file of ["src/namespace.js", "src/page-flow.js", "src/auth.js", "src/player-profile.js", "src/state.js", "src/scene.js", "src/events.js", "src/minigames.js", "src/dice.js", "src/audio.js", "src/custom-actions.js", "src/ui.js"]) {
  vm.runInContext(await readFile(file, "utf8"), sandbox, { filename: file });
}

const Game = sandbox.window.TrainGame;
const Auth = Game.Auth;
const pageButtonSoundSource = await readFile("src/page-button-sound.js", "utf8");
const uiSource = await readFile("src/ui.js", "utf8");

// 同一标签页的刷新恢复检查点与跨页交接隔离，并拒绝槽位不符或损坏的数据。
{
  const refreshCheckpoint = {
    state: { sceneId: "carriage_06", flags: { carriage_06_people_reveal: false } },
    resume: { eventId: "E_TEST", actionIndex: 0 }
  };
  assert.equal(Game.PageFlow.setRefreshCheckpoint(1, refreshCheckpoint), true);
  assert.deepEqual(Game.PageFlow.getRefreshCheckpoint(1), refreshCheckpoint);
  assert.equal(Game.PageFlow.getRefreshCheckpoint(2), null, "槽位不符的临时检查点不得被读取");
  assert.equal(Game.PageFlow.getRefreshCheckpoint(1), null, "槽位不符的临时检查点应被清理");

  session.set("train-game-refresh-checkpoint-v2", "{");
  assert.equal(Game.PageFlow.getRefreshCheckpoint(1), null, "损坏的临时检查点不得阻断游戏入口");
  assert.equal(session.has("train-game-refresh-checkpoint-v2"), false, "损坏检查点应被清理");

  assert.equal(Game.PageFlow.setRefreshCheckpoint(1, refreshCheckpoint), true);
  Game.PageFlow.clearRefreshSnapshot();
  assert.equal(Game.PageFlow.getRefreshCheckpoint(1), null, "显式离开游戏时应清理临时检查点");

  sandbox.window.performance = { getEntriesByType: () => [{ type: "reload" }] };
  assert.equal(Game.PageFlow.isReloadNavigation(), true);
  sandbox.window.performance = { getEntriesByType: () => [{ type: "navigate" }] };
  assert.equal(Game.PageFlow.isReloadNavigation(), false);
  sandbox.window.performance = performance;

  assert.equal(Game.PageFlow.consumeHomeOpIntent(), false, "没有入口标记时主页不应播放 OP");
  assert.equal(Game.PageFlow.markHomeOpIntent("settings"), false, "普通功能页不得请求主页 OP");
  assert.equal(Game.PageFlow.markHomeOpIntent("login"), true);
  assert.equal(Game.PageFlow.consumeHomeOpIntent(), true, "登录入口应播放一次 OP");
  assert.equal(Game.PageFlow.consumeHomeOpIntent(), false, "OP 入口标记消费后不得在刷新时重播");
  assert.equal(Game.PageFlow.markHomeOpIntent("ending"), true);
  assert.equal(Game.PageFlow.consumeHomeOpIntent(), true, "结局入口应播放一次 OP");
}

// 属性变更提示应排队，避免同一事件里的后一项覆盖前一项。
{
  const scheduled = [];
  const originalSetTimeout = sandbox.setTimeout;
  const originalClearTimeout = sandbox.clearTimeout;
  sandbox.setTimeout = (callback) => {
    scheduled.push(callback);
    return scheduled.length;
  };
  sandbox.clearTimeout = () => {};
  const toastElement = {
    textContent: "",
    classList: { add() {}, remove() {} }
  };
  const ui = {
    toastElement,
    toastTimer: null,
    toastMode: null,
    attributeToastQueue: [],
    attributeToastCurrent: null,
    enqueueAttributeToast: Game.UIManager.prototype.enqueueAttributeToast,
    showNextAttributeToast: Game.UIManager.prototype.showNextAttributeToast
  };
  Game.UIManager.prototype.showAttributeChange.call(ui, {
    name: "灵感", requested: 1, before: 3, after: 4, min: 1, max: 10
  });
  Game.UIManager.prototype.showAttributeChange.call(ui, {
    name: "SAN", requested: 1, before: 1, after: 2, min: 0, max: null
  });
  assert.match(toastElement.textContent, /灵感 \+1/, "第一条属性提示应立即显示");
  assert.equal(ui.attributeToastQueue.length, 1, "第二条属性提示应进入队列");
  scheduled.shift()();
  assert.match(toastElement.textContent, /SAN \+1/, "第一条结束后应显示第二条属性提示");
  scheduled.shift()();
  assert.equal(ui.attributeToastQueue.length, 0, "全部属性提示显示后应清空队列");
  sandbox.setTimeout = originalSetTimeout;
  sandbox.clearTimeout = originalClearTimeout;
}

assert.equal(Auth.register("", "password").ok, false, "空用户名不应注册");
assert.equal(Auth.register("   ", "password").ok, false, "纯空格用户名不应注册");
assert.equal(Auth.register("empty-password", "").ok, false, "空密码不应注册");
assert.equal(Auth.register("a", "1").ok, true, "单字符用户名和密码应能注册");
assert.equal(Auth.login("a", "1").ok, true, "单字符用户名和密码应能登录");
Auth.logout();
assert.equal(Auth.register("username-with-more-than-20-characters", " ").ok, true, "长用户名和空格密码应能注册");
assert.equal(Auth.login("username-with-more-than-20-characters", " ").ok, true, "空格密码应按原值登录");
Auth.logout();
const aliceRegistration = Auth.register("  Alice  ", "secret1");
assert.equal(aliceRegistration.ok, true);
assert.equal(aliceRegistration.message, "");
assert.equal(aliceRegistration.username, "Alice");
assert.equal(Auth.register("Alice", "secret2").ok, false, "完全同名账号不应重复注册");
assert.equal(Auth.register("alice", "secret2").ok, true, "用户名应区分大小写");
assert.equal(Auth.login("Alice", "wrong-password").ok, false);
assert.equal(Auth.login("Alice", "secret1").ok, true);
assert.equal(Auth.currentUser(), "Alice");
Auth.logout();
assert.equal(Auth.currentUser(), null);
Auth.rememberRegistration("alice");
assert.equal(Auth.consumeRegistration(), "alice");
assert.equal(Auth.consumeRegistration(), null, "注册预填信息应只消费一次");
assert.equal(Auth.login("alice", "secret2").ok, true);
storage.delete("train-game-auth-user-v1:alice");
assert.equal(Auth.currentUser(), null, "账号不存在时应清除失效会话");
const originalSetItem = localStorage.setItem;
localStorage.setItem = () => { throw new Error("storage disabled"); };
assert.match(Auth.register("storage-test", "123456").message, /无法保存账号/);
localStorage.setItem = originalSetItem;
assert.throws(() => new Game.SaveManager({}, undefined), /必须登录/, "未登录时不应访问默认存档槽");
assert.equal(Auth.login("Alice", "secret1").ok, true);

// 玩家配置按账号隔离；音量逐字段恢复，快捷键唯一，自动存档默认开启，结局解锁幂等且只接受已登记编号。
assert.match(pageButtonSoundSource, /getAudioGain\?\.\("buttonSfx"\)/, "页面点击音效应读取独立音量设置");
assert.match(uiSource, /buttonSfxVolume/, "游戏内按钮音应读取独立音量设置");
assert.deepEqual({ ...Game.PlayerProfile.getAudioSettings() }, { pageMusic: 0.6, gameAmbience: 0.6, gameSfx: 0.6, buttonSfx: 0.6 });
assert.equal(Game.PlayerProfile.getAutoSaveEnabled(), true, "自动存档默认应开启");
assert.deepEqual({ ...Game.PlayerProfile.getShortcutSettings() }, { pause: "Escape", advance: " ", auto: "a", fast: "Control" });
assert.equal(Game.PlayerProfile.getAudioGain("pageMusic"), 1, "默认 60% 应保持游戏原始音量");
assert.equal(Game.PlayerProfile.setAudioSetting("pageMusic", 0.55), 0.55);
assert.equal(Game.PlayerProfile.getAudioGain("pageMusic"), 0.55 / 0.6);
assert.equal(Game.PlayerProfile.setAudioSetting("gameAmbience", -2), 0);
assert.equal(Game.PlayerProfile.setAudioSetting("gameSfx", 8), 1);
assert.equal(Game.PlayerProfile.setAudioSetting("buttonSfx", 0), 0);
assert.throws(() => Game.PlayerProfile.setAudioSetting("unknown", 0.5), /未知音量设置/);
for (const ending of Game.ENDING_CATALOG) assert.equal(Game.PlayerProfile.unlockEnding(ending.id), true);
assert.equal(Game.PlayerProfile.unlockEnding("true_end"), false, "重复结局不应重复写入");
assert.equal(Game.PlayerProfile.unlockEnding("unknown"), false, "未知终局不应进入收藏");
assert.deepEqual([...Game.PlayerProfile.getUnlockedEndings()], ["true_end", "fake_end", "lost", "bad_end", "san"]);
assert.equal(Game.PlayerProfile.setAutoSaveEnabled(false), false);
assert.equal(Game.PlayerProfile.getAutoSaveEnabled(), false, "关闭自动存档后应保留设置");
assert.equal(Game.PlayerProfile.setShortcutSetting("advance", "Enter"), "Enter");
assert.equal(Game.PlayerProfile.setShortcutSetting("auto", "Z"), "z", "字母快捷键应忽略大小写");
assert.throws(() => Game.PlayerProfile.setShortcutSetting("fast", "z"), /已被其他操作使用/);
assert.throws(() => Game.PlayerProfile.setShortcutSetting("unknown", "Q"), /未知快捷键操作/);
assert.throws(() => Game.PlayerProfile.setShortcutSetting("fast", "Shift"), /不能用作快捷键/);
assert.deepEqual({ ...Game.PlayerProfile.resetShortcutSettings() }, { pause: "Escape", advance: " ", auto: "a", fast: "Control" });

assert.equal(Auth.register("ProfileBob", "secret3").ok, true);
assert.equal(Auth.login("ProfileBob", "secret3").ok, true);
assert.deepEqual({ ...Game.PlayerProfile.getAudioSettings() }, { pageMusic: 0.6, gameAmbience: 0.6, gameSfx: 0.6, buttonSfx: 0.6 });
assert.equal(Game.PlayerProfile.getAutoSaveEnabled(), true, "不同账号应使用默认自动存档设置");
assert.deepEqual({ ...Game.PlayerProfile.getShortcutSettings() }, { pause: "Escape", advance: " ", auto: "a", fast: "Control" });
assert.deepEqual([...Game.PlayerProfile.getUnlockedEndings()], [], "不同账号不应共享结局收藏");
Game.PlayerProfile.setAudioSetting("pageMusic", 0.2);
assert.equal(Auth.login("Alice", "secret1").ok, true);
assert.equal(Game.PlayerProfile.getAudioSettings().pageMusic, 0.55, "切回账号后应恢复该账号音量");
assert.equal(Game.PlayerProfile.getAutoSaveEnabled(), false, "切回账号后应恢复该账号自动存档设置");
assert.deepEqual({ ...Game.PlayerProfile.getShortcutSettings() }, { pause: "Escape", advance: " ", auto: "a", fast: "Control" }, "旧账号配置应补齐默认快捷键");

const aliceProfileKey = "train-game-profile-user-v1:Alice";
storage.set(aliceProfileKey, JSON.stringify({ audio: { pageMusic: "bad", gameAmbience: 0.4 }, unlockedEndings: ["lost", "bad-id", "lost"] }));
assert.deepEqual({ ...Game.PlayerProfile.getAudioSettings() }, { pageMusic: 0.6, gameAmbience: 0.4, gameSfx: 0.6, buttonSfx: 0.6 });
assert.equal(Game.PlayerProfile.getAutoSaveEnabled(), true, "缺失自动存档设置应回退为开启");
assert.deepEqual({ ...Game.PlayerProfile.getShortcutSettings() }, { pause: "Escape", advance: " ", auto: "a", fast: "Control" }, "缺失快捷键设置应回退为默认值");
assert.deepEqual([...Game.PlayerProfile.getUnlockedEndings()], ["lost"], "损坏字段应独立回退并清理无效或重复结局");
storage.set(aliceProfileKey, JSON.stringify({ autoSaveEnabled: "false" }));
assert.equal(Game.PlayerProfile.getAutoSaveEnabled(), true, "非法自动存档设置应回退为开启");
storage.set(aliceProfileKey, "not-json");
assert.deepEqual({ ...Game.PlayerProfile.getAudioSettings() }, { pageMusic: 0.6, gameAmbience: 0.6, gameSfx: 0.6, buttonSfx: 0.6 });
storage.set(aliceProfileKey, JSON.stringify({ version: 1, audio: { pageMusic: 1, gameAmbience: 0.5, gameSfx: 0 } }));
assert.deepEqual(
  { ...Game.PlayerProfile.getAudioSettings() },
  { pageMusic: 0.6, gameAmbience: 0.3, gameSfx: 0, buttonSfx: 0.6 },
  "旧版直接倍率应迁移为以 60% 为原始音量的新滑杆位置"
);
storage.delete(aliceProfileKey);

const initialState = {
  sceneId: "test_scene",
  currentEventId: null,
  flags: {},
  inventory: [],
  objectStates: {},
  checkResults: {}
};
const attributeData = {
  totalPoints: 2,
  attributes: [
    { id: "strength", name: "力量", initial: 2, min: 0, max: 5 },
    { id: "insight", name: "灵感", initial: 1, min: 0, max: 5 }
  ]
};
const skills = [
  { id: "strong", name: "强壮", initial: false, autoTrigger: { attribute: "strength", operator: "gte", value: 4 } },
  { id: "combined", name: "综合能力", initial: false, autoTrigger: { sum: ["strength", "insight"], operator: "gte", value: 5 } },
  {
    id: "perceptive",
    name: "感知敏锐",
    initial: false,
    autoTrigger: {
      any: [
        { attribute: "strength", operator: "gt", value: 4 },
        { all: [
          { attribute: "insight", operator: "gte", value: 3 },
          { not: { attribute: "strength", operator: "eq", value: 0 } }
        ] }
      ]
    }
  },
  { id: "manual", name: "手动技能", initial: false }
];

function createState() {
  return new Game.GameState(initialState, attributeData, skills);
}

function checkpointOf(targetState, resume = null) {
  return { state: targetState.snapshot(), resume };
}

const state = createState();
assert.deepEqual(state.attributes, { strength: 2, insight: 1 });
assert.equal(state.getSkill("strong"), false);
assert.equal(state.getSkill("combined"), false);
assert.throws(() => state.completeAttributeAllocation({ strength: 3, insight: 1 }), /用完全部属性点/);
assert.throws(() => state.completeAttributeAllocation({ strength: 5, insight: 1 }), /用完全部属性点/);
assert.throws(() => state.completeAttributeAllocation({ strength: 2, insight: 3, extra: 1 }), /不兼容/);

state.completeAttributeAllocation({ strength: 4, insight: 1 });
assert.equal(state.attributeAllocationComplete, true);
assert.equal(state.getSkill("strong"), true);
assert.equal(state.getSkill("combined"), true);
assert.equal(state.getSkill("perceptive"), false);
assert.throws(() => state.completeAttributeAllocation({ strength: 4, insight: 1 }), /已经完成/);

state.setSkill("strong", false);
state.modifyAttribute("insight", 1);
assert.equal(state.getSkill("strong"), false, "无关属性变化不应重算技能");
state.modifyAttribute("strength", -1);
assert.equal(state.getSkill("strong"), false);
state.setSkill("strong", true);
state.modifyAttribute("strength", 1);
assert.equal(state.getSkill("strong"), true);

state.loseSkill("strong");
state.modifyAttribute("strength", -3);
state.modifyAttribute("strength", 5);
assert.equal(state.getAttribute("strength"), 5, "属性修改应钳制到上限");
assert.equal(state.getSkill("strong"), false, "强制失去后自动条件应永久屏蔽");
state.learnSkill("strong");
state.setAttribute("strength", 0);
assert.equal(state.getSkill("strong"), true, "强制习得后自动条件应保持屏蔽");
assert.throws(() => state.setAttribute("strength", 1.5), /整数/);
assert.throws(() => state.setSkill("missing", true), /未注册/);

state.setAttribute("insight", 3);
assert.equal(Game.evaluateCondition({ attribute: "insight", operator: "gte", value: 3 }, state), true);
assert.equal(Game.evaluateCondition({ attribute: "insight", operator: "lte", value: 3 }, state), true);
assert.equal(Game.evaluateCondition({ attribute: "insight", operator: "ne", value: 2 }, state), true);
assert.equal(Game.evaluateCondition({ skill: "strong", equals: true }, state), true);
assert.equal(Game.evaluateCondition({ all: [
  { attribute: "insight", operator: "lt", value: 4 },
  { not: { skill: "manual", equals: true } }
] }, state), true);

// 无光车厢判定：2号车厢首次照明前全黑；3号车厢认知崩塌「灯灭了」后全黑，离开时清除。
assert.equal(Game.isSceneUnlit("carriage_02", {}), true, "2号车厢未照明时应为无光");
assert.equal(Game.isSceneUnlit("carriage_02", { light_used: true }), false, "2号车厢照明后应退出全黑状态");
assert.equal(Game.isSceneDirectionallyLit("carriage_02", { light_used: true }), true, "2号车厢照明后应使用定向光束");
assert.equal(Game.isSceneDirectionallyLit("carriage_02", {}), false, "2号车厢照明前不应使用定向光束");
assert.equal(Game.isSceneDirectionallyLit("carriage_03", { light_used: true }), false, "定向光束只作用于2号车厢");
assert.equal(Game.isSceneUnlit("carriage_03", {}), false, "3号车厢平时应为亮灯");
assert.equal(Game.isSceneUnlit("carriage_03", { carriage_03_blackout: true }), true, "3号车厢灯灭后应为无光");
assert.equal(Game.isSceneUnlit("carriage_04", { carriage_03_blackout: true }), false, "黑场只作用于3号车厢");

// fullCanvas 物件的透明包围盒不得吞掉下层矩形热点；实际不透明像素仍应优先。
const sceneRoot = {
  addEventListener() {},
  getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 100 }; },
  querySelectorAll() { return []; }
};
const sceneManager = new Game.SceneManager(sceneRoot, [], {});
const canvasButton = { disabled: false };
const rectButton = { disabled: false };
const alphaMask = new Uint8Array(Math.ceil(100 * 100 / 8));
const canvasEntry = {
  object: { id: "foreground", zIndex: 12, clickEvent: "E_FOREGROUND" },
  button: canvasButton,
  meta: { width: 100, height: 100, bbox: { x0: 0, y0: 0, x1: 99, y1: 99 }, mask: alphaMask }
};
sceneManager.canvasObjects = [canvasEntry];
sceneManager.rectObjects = [{
  object: {
    id: "ambient_window",
    zIndex: 10,
    clickEvent: "E_AMBIENT",
    position: { x: 10, y: 10, width: 80, height: 80 }
  },
  button: rectButton
}];
const clickedSceneEvents = [];
sceneManager.onObjectClick = (eventId) => clickedSceneEvents.push(eventId);
const interceptedClick = {
  target: { closest: (selector) => selector === ".scene-object-hit" ? canvasButton : null },
  detail: 1,
  clientX: 50,
  clientY: 50
};
sceneManager.handleCanvasClick(interceptedClick);
assert.deepEqual(clickedSceneEvents, ["E_AMBIENT"], "透明前景像素应继续命中下层门窗热点");
const pixelIndex = 50 * 100 + 50;
alphaMask[pixelIndex >> 3] |= 1 << (pixelIndex & 7);
sceneManager.handleCanvasClick(interceptedClick);
assert.deepEqual(clickedSceneEvents, ["E_AMBIENT", "E_FOREGROUND"], "不透明前景像素仍应优先触发原物件");

const saves = new Game.SaveManager(state, "test-save");
saves.save(1, checkpointOf(state, { eventId: "E_START", actionIndex: 0 }));
assert.equal(JSON.parse(storage.get("test-save-1")).saveVersion, 5, "新存档应使用 v5 检查点信封");
assert.equal(saves.listSlots().length, 3);
assert.equal(saves.listSlots()[0].empty, false);
assert.equal(typeof saves.listSlots()[0].savedAt, "string");
assert.equal(saves.listSlots()[1].empty, true);
const restored = createState();
const restoredCheckpoint = new Game.SaveManager(restored, "test-save").load(1);
restored.restore(restoredCheckpoint.state);
assert.deepEqual(restored.snapshot(), state.snapshot());
assert.deepEqual(restoredCheckpoint.resume, { eventId: "E_START", actionIndex: 0 });
restored.setAttribute("strength", 5);
assert.equal(restored.getSkill("strong"), true, "读取后应保留技能自动屏蔽状态");

state.setAttribute("insight", 4);
saves.save(2, checkpointOf(state));
assert.equal(saves.hasSave(1), true);
assert.equal(saves.hasSave(2), true);
state.restore(saves.load(1).state);
assert.equal(state.getAttribute("insight"), 3, "不同槽位的状态应相互隔离");
saves.delete(2);
assert.equal(saves.hasSave(2), false);
assert.throws(() => saves.hasSave(0), /1 到 3/);
assert.throws(() => saves.save(4, checkpointOf(state)), /1 到 3/);
assert.throws(
  () => saves.save(3, checkpointOf(state, { eventId: "E_BAD", actionIndex: -1 })),
  /恢复游标无效/,
  "负数动作游标不得写入存档"
);

storage.set("v4-save-1", JSON.stringify({ saveVersion: 4, savedAt: "2026-09-17T00:00:00.000Z", state: state.snapshot() }));
const migratedV4 = new Game.SaveManager(createState(), "v4-save").load(1);
assert.deepEqual(migratedV4.state, state.snapshot(), "v4 裸状态存档应兼容读取");
assert.equal(migratedV4.resume, null, "v4 存档没有可靠续跑位置，应迁移为空游标");

const aliceSaves = new Game.SaveManager(state);
assert.equal(aliceSaves.slotKey(1), "train-game-save-user-v1:Alice:slot-1");
aliceSaves.save(1, checkpointOf(state));
Auth.logout();
assert.equal(Auth.register("Bob", "secret3").ok, true);
assert.equal(Auth.login("Bob", "secret3").ok, true);
const bobSaves = new Game.SaveManager(createState());
assert.equal(bobSaves.slotKey(1), "train-game-save-user-v1:Bob:slot-1");
assert.equal(bobSaves.listSlots()[0].empty, true, "不同账号不应共享同一存档槽");
Auth.logout();
assert.equal(Auth.login("Alice", "secret1").ok, true);
assert.equal(new Game.SaveManager(createState()).listSlots()[0].empty, false, "原账号应能继续读取自己的存档");

storage.set("legacy-save-1", JSON.stringify(state.snapshot()));
assert.throws(() => new Game.SaveManager(createState(), "legacy-save").load(1), /版本不兼容/);
storage.set("train-game-save-v1", JSON.stringify({ saveVersion: 3, state: state.snapshot() }));
storage.set("train-game-save-slot-1", JSON.stringify({ saveVersion: 3, state: state.snapshot() }));
Auth.logout();
assert.equal(Auth.register("LegacyCheck", "secret4").ok, true);
assert.equal(Auth.login("LegacyCheck", "secret4").ok, true);
assert.equal(new Game.SaveManager(createState()).listSlots().every((slot) => slot.empty), true, "旧共享存档与旧单槽存档都不应自动迁移");

const unallocated = createState();
assert.throws(() => new Game.SaveManager(unallocated, "unallocated-save").save(1, checkpointOf(unallocated)), /分配完成前/);

const registeredAttributes = JSON.parse(await readFile("data/attributes.json", "utf8"));
const registeredSkills = JSON.parse(await readFile("data/skills.json", "utf8"));
const registeredItems = JSON.parse(await readFile("data/items.json", "utf8"));
const registeredScenes = JSON.parse(await readFile("data/scenes.json", "utf8"));
const registeredEvents = JSON.parse(await readFile("data/events.json", "utf8"));
const registeredEventsById = new Map(registeredEvents.map((event) => [event.id, event]));
const itemInspectEvents = new Map(registeredItems.map((item) => [item.id, registeredEventsById.get(item.inspectEvent)]));
for (const itemId of [
  "note_06_item",
  "bottle",
  "newspaper",
  "driver_cab_key",
  "control_panel_key",
  "emergency_cutter",
  "pry_bar"
]) {
  assert.equal(
    itemInspectEvents.get(itemId)?.actions?.[0]?.item,
    itemId,
    `物品 ${itemId} 的调查事件应通过物品 ID 进入全屏展示`
  );
}
for (const itemId of ["phone", "flashlight"]) {
  const action = itemInspectEvents.get(itemId)?.actions?.[0];
  assert.equal(action?.name, "useLight", `照明物品 ${itemId} 应保留优先使用分支`);
  assert.equal(action?.params?.item, itemId, `照明物品 ${itemId} 应把自身 ID 传给统一动作`);
}
const carriage05 = registeredScenes.find((scene) => scene.id === "carriage_05");
assert.equal(
  carriage05.objects.find((object) => object.id === "door_05_to_04").clickEvent,
  "E_GO_05_04",
  "5号车厢通往4号车厢的门应先执行普通过门事件"
);
assert.deepEqual(
  registeredEventsById.get("E_GO_05_04").next,
  "E_013_ENTRY",
  "玩家点门进入4号车厢后应承接首次入场描写"
);
for (const eventId of ["E_011_S", "E_012_AFTER"]) {
  assert.equal(
    registeredEventsById.get(eventId).next,
    undefined,
    `${eventId} 结束后应停在5号车厢等待玩家点门`
  );
}
assert.equal(
  registeredEventsById.get("E_022_ITEM").actions.some((action) =>
    action.item === "flashlight" || action.when?.hasItem === "flashlight"
  ),
  false,
  "3号车厢黑包收尾不得检查或发放手电筒"
);
const registeredState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
assert.equal(registeredState.getSkill("throwing"), false);
registeredState.completeAttributeAllocation({
  constitution: 10,
  education: 8,
  insight: 8,
  san: 6
});
assert.equal(registeredAttributes.totalPoints, 22);
assert.equal(registeredAttributes.attributes.find((entry) => entry.id === "san").max, null);
const balancedAllocationState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
balancedAllocationState.completeAttributeAllocation({ constitution: 8, education: 8, insight: 8, san: 8 });
const extremeAllocationState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
extremeAllocationState.completeAttributeAllocation({ constitution: 10, education: 10, insight: 10, san: 2 });
extremeAllocationState.setAttribute("san", 50);
assert.equal(extremeAllocationState.getAttribute("san"), 50, "SAN 运行时不应设置上限");
extremeAllocationState.setAttribute("constitution", 0);
assert.equal(extremeAllocationState.getAttribute("constitution"), 1, "普通属性运行时下限应为1");

const attributeCueCalls = [];
const attributeCueState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
attributeCueState.completeAttributeAllocation({ constitution: 10, education: 8, insight: 8, san: 6 });
const attributeCueEngine = new Game.EventEngine({
  events: [], state: attributeCueState, items: [], scene: {},
  ui: { ...createEngineUi(), showAttributeChange: (payload) => attributeCueCalls.push(payload) }
});
await attributeCueEngine.actions.get("modifyAttribute")({ type: "modifyAttribute", attribute: "constitution", amount: -1 });
await attributeCueEngine.actions.get("modifyAttribute")({ type: "modifyAttribute", attribute: "education", amount: 99 });
assert.deepEqual(
  attributeCueCalls.map(({ requested, before, after }) => ({ requested, before, after })),
  [{ requested: -1, before: 10, after: 9 }, { requested: 99, before: 8, after: 10 }],
  "属性动作提示必须使用边界钳制后的实际数值"
);

storage.set("old-v3-save-1", JSON.stringify({ saveVersion: 3, state: registeredState.snapshot() }));
assert.throws(() => new Game.SaveManager(new Game.GameState(initialState, registeredAttributes, registeredSkills), "old-v3-save").load(1), /版本不兼容/);

const legacyKeysSnapshot = registeredState.snapshot();
legacyKeysSnapshot.inventory = ["crew_keys"];
const migratedKeysState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
migratedKeysState.restore(legacyKeysSnapshot);
assert.deepEqual(
  migratedKeysState.inventory,
  ["driver_cab_key", "control_panel_key"],
  "旧存档中的组合钥匙应拆分为驾驶室钥匙和操作面板钥匙"
);

let inspectedItem = null;
let inspectedScene = null;
const inspectEngine = new Game.EventEngine({
  events: [],
  state: registeredState,
  items: registeredItems,
  scene: {},
  ui: {
    inspect: { show: async (payload) => { inspectedScene = payload; } },
    itemInspect: { show: async (payload) => { inspectedItem = payload; } }
  }
});
await inspectEngine.actions.get("inspect")({ type: "inspect", item: "phone" });
assert.equal(inspectedItem.title, "手机", "物品调查应读取注册表中的名称");
assert.equal(inspectedItem.text, "一部手机。", "物品调查应读取注册表中的说明");
assert.equal(inspectedItem.image, "assets/Image/Item/phone.webp", "物品调查应读取注册表中的图片");
await inspectEngine.actions.get("inspect")({
  type: "inspect",
  item: "phone",
  title: "手机特写",
  text: "覆盖说明",
  image: "assets/Image/Item/flashlight.webp"
});
assert.equal(inspectedItem.title, "手机特写", "物品调查应允许事件覆盖名称");
assert.equal(inspectedItem.text, "覆盖说明", "物品调查应允许事件覆盖说明");
assert.equal(inspectedItem.image, "assets/Image/Item/flashlight.webp", "物品调查应允许事件覆盖图片");
await inspectEngine.actions.get("inspect")({ type: "inspect", title: "场景线索", text: "仍使用普通窗口。" });
assert.equal(inspectedScene.title, "场景线索", "不带物品 ID 的场景调查应继续使用普通调查窗口");

// ==== 检定（dice.js 可编程检定）====
assert.equal(typeof Game.Dice.get("ev005_insight_01"), "function", "E_005 灵感检定应已注册");
assert.equal(typeof Game.Dice.get("ev006a_san_01"), "function", "E_006A SAN 检定应已注册");
assert.equal(typeof Game.Dice.get("ev006b_san_01"), "function", "E_006B SAN 检定应已注册");
assert.equal(typeof Game.Dice.get("ev008_insight_01"), "function", "E_008 洞察检定应已注册");
assert.equal(typeof Game.Dice.get("ev013_education_01"), "function", "点击乘务员后的教育检定应已注册");
assert.equal(typeof Game.Dice.get("ev021_education_insight_01"), "function", "话术剧情的教育+灵感检定应已注册");
for (const diceId of [
  "ev027_constitution_01", "ev027_constitution_02", "ev027_constitution_03",
  "ev027_san_01", "ev027_san_02", "ev027_san_03", "ev028_throw_01"
]) {
  assert.equal(typeof Game.Dice.get(diceId), "function", `${diceId} 应已注册`);
}

function createEngineUi() {
  return {
    dialog: { showLine: async () => {}, setFast: () => {} },
    inspect: { show: async () => {} },
    itemInspect: { show: async () => {} },
    choice: { choose: async () => ({ value: true }) },
    closeDialog: () => {},
    cancelPending: () => {},
    setPaused: () => {},
    toast: () => {}
  };
}

// 6号车厢乘客消失后的刷新恢复只采用完整事件链的稳定快照。
{
  const disappearance = registeredEventsById.get("E_009").actions
    .find((action) => action.type === "setFlag" && action.key === "carriage_06_people_reveal");
  assert.deepEqual(disappearance, {
    type: "setFlag",
    key: "carriage_06_people_reveal",
    value: false
  });

  const refreshState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
  refreshState.completeAttributeAllocation({ constitution: 8, education: 8, insight: 8, san: 8 });
  refreshState.sceneId = "carriage_06";
  refreshState.flags.carriage_06_people_reveal = true;
  let finishDialogue;
  let dialogueStarted;
  const dialogueStartedPromise = new Promise((resolve) => { dialogueStarted = resolve; });
  const refreshEngine = new Game.EventEngine({
    events: [{
      id: "E_TEST_CARRIAGE_06_DISAPPEAR",
      actions: [
        disappearance,
        { type: "dialogue", text: "等待玩家推进。" }
      ]
    }],
    state: refreshState,
    items: [],
    scene: createEngineScene(),
    ui: {
      ...createEngineUi(),
      dialog: {
        setFast: () => {},
        showLine: async () => {
          dialogueStarted();
          await new Promise((resolve) => { finishDialogue = resolve; });
        }
      }
    }
  });

  const playing = refreshEngine.play("E_TEST_CARRIAGE_06_DISAPPEAR");
  await dialogueStartedPromise;
  assert.equal(refreshState.flags.carriage_06_people_reveal, false, "事件内状态会立即更新画面");
  assert.equal(
    refreshEngine.getCheckpoint().state.flags.carriage_06_people_reveal,
    true,
    "未完成对白时刷新只能恢复事件前的稳定状态"
  );
  assert.deepEqual(
    refreshEngine.getCheckpoint().resume,
    { eventId: "E_TEST_CARRIAGE_06_DISAPPEAR", actionIndex: 0 },
    "自由探索触发的事件应在执行前把入口写入检查点"
  );

  finishDialogue();
  await playing;
  const stableCheckpoint = refreshEngine.getCheckpoint();
  assert.equal(stableCheckpoint.state.flags.carriage_06_people_reveal, false);
  Game.PageFlow.setRefreshCheckpoint(1, stableCheckpoint);
  const refreshedState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
  refreshedState.restore(Game.PageFlow.getRefreshCheckpoint(1).state);
  assert.equal(refreshedState.flags.carriage_06_people_reveal, false, "刷新后应继续显示无乘客背景");
  Game.PageFlow.clearRefreshSnapshot();
}

// 手机与手电筒仅在 2 号车厢尚未照明时优先进入使用选择；其他状态统一展示物品。
const lightState = createState();
const lightItemPayloads = [];
const lightDialogue = [];
let lightChoice = { value: false };
const lightUi = {
  ...createEngineUi(),
  itemInspect: { show: async (payload) => { lightItemPayloads.push(payload); } },
  choice: { choose: async () => lightChoice },
  dialog: {
    showLine: async (payload) => { lightDialogue.push(payload); },
    setFast: () => {}
  }
};
const lightEngine = new Game.EventEngine({
  events: [{
    id: "E_TEST_USE_LIGHT",
    actions: [{ type: "custom", name: "useLight", params: { item: "phone" } }]
  }],
  state: lightState,
  items: registeredItems,
  scene: createEngineScene(),
  ui: lightUi
});
Game.registerProjectActions(lightEngine);

await lightEngine.play("E_TEST_USE_LIGHT");
assert.equal(lightItemPayloads.at(-1).title, "手机", "非 2 号车厢点击照明物品应进入全屏物品调查");

lightState.sceneId = "carriage_02";
lightChoice = { value: false };
const inspectCountBeforeDecline = lightItemPayloads.length;
await lightEngine.play("E_TEST_USE_LIGHT");
assert.equal(lightItemPayloads.length, inspectCountBeforeDecline, "可照明时暂不使用不应继续打开调查页");
assert.equal(lightState.flags.light_used, undefined, "暂不使用不应改变照明状态");

lightChoice = { value: true };
await lightEngine.play("E_TEST_USE_LIGHT");
assert.equal(lightState.flags.light_used, true, "使用手机应记录车厢已照明");
assert.equal(lightState.flags.light_type, "phone", "使用手机应记录照明物品");
assert.match(lightDialogue.at(-1).text, /照亮2号车厢/, "使用成功应通过普通剧情文本反馈");

const inspectCountBeforeLit = lightItemPayloads.length;
await lightEngine.play("E_TEST_USE_LIGHT");
assert.equal(lightItemPayloads.length, inspectCountBeforeLit + 1, "已经照明后再次点击应进入全屏物品调查");
assert.match(lightItemPayloads.at(-1).text, /仍然照得清/, "已经照明后的调查应保留状态说明");

function createEngineScene() {
  return {
    prepare: async () => {},
    whenReady: async () => {},
    load: () => {},
    refresh: () => {},
    setInteractionEnabled: () => {}
  };
}

// 连续事件在每个事件结束后提交检查点；后续事件未完成时应回到其入口。
{
  const checkpointState = createState();
  checkpointState.completeAttributeAllocation({ strength: 4, insight: 1 });
  let releaseDialogue;
  let dialogueStarted;
  const dialogueStartedPromise = new Promise((resolve) => { dialogueStarted = resolve; });
  const engine = new Game.EventEngine({
    events: [
      { id: "E_CP_A", actions: [{ type: "setFlag", key: "event_a_done", value: true }], next: "E_CP_B" },
      { id: "E_CP_B", actions: [{ type: "dialogue", text: "等待取消。" }] }
    ],
    state: checkpointState,
    items: [],
    scene: createEngineScene(),
    ui: {
      ...createEngineUi(),
      dialog: {
        setFast: () => {},
        showLine: async () => {
          dialogueStarted();
          await new Promise((resolve) => { releaseDialogue = resolve; });
        }
      },
      cancelPending: () => releaseDialogue?.()
    }
  });
  engine.adoptCheckpoint({ eventId: "E_CP_A", actionIndex: 0 });
  const playing = engine.resumeCheckpoint();
  await dialogueStartedPromise;
  assert.deepEqual(engine.getCheckpoint().resume, { eventId: "E_CP_B", actionIndex: 0 });
  assert.equal(engine.getCheckpoint().state.flags.event_a_done, true);
  await engine.cancelToCheckpoint();
  assert.equal(await playing, false);
  assert.equal(checkpointState.flags.event_a_done, true, "取消后应保留已完成事件的状态");
}

// choice 等待前提交动作游标；恢复后直接重开选项，不重放前置动作。
{
  const events = [
    {
      id: "E_CP_CHOICE",
      actions: [
        { type: "custom", name: "incrementCheckpointCounter" },
        { type: "choice", prompt: "请选择", options: [{ label: "继续", next: "E_CP_AFTER" }] }
      ]
    },
    { id: "E_CP_AFTER", actions: [{ type: "setFlag", key: "choice_done", value: true }] }
  ];
  const firstState = createState();
  firstState.completeAttributeAllocation({ strength: 4, insight: 1 });
  let closeChoice;
  let choiceShown;
  const choiceShownPromise = new Promise((resolve) => { choiceShown = resolve; });
  const firstEngine = new Game.EventEngine({
    events,
    state: firstState,
    items: [],
    scene: createEngineScene(),
    ui: {
      ...createEngineUi(),
      choice: {
        choose: async () => {
          choiceShown();
          return new Promise((resolve) => { closeChoice = resolve; });
        }
      },
      cancelPending: () => closeChoice?.(null)
    }
  });
  firstEngine.registerCustomAction("incrementCheckpointCounter", async (_params, context) => {
    context.state.flags.checkpoint_counter = (context.state.flags.checkpoint_counter || 0) + 1;
  });
  firstEngine.adoptCheckpoint({ eventId: "E_CP_CHOICE", actionIndex: 0 });
  const firstRun = firstEngine.resumeCheckpoint();
  await choiceShownPromise;
  const choiceCheckpoint = firstEngine.getCheckpoint();
  assert.deepEqual(choiceCheckpoint.resume, { eventId: "E_CP_CHOICE", actionIndex: 1 });
  assert.equal(choiceCheckpoint.state.flags.checkpoint_counter, 1);
  await firstEngine.cancelToCheckpoint();
  await firstRun;

  const resumedState = createState();
  const resumedEngine = new Game.EventEngine({
    events,
    state: resumedState,
    items: [],
    scene: createEngineScene(),
    ui: {
      ...createEngineUi(),
      choice: { choose: async (_prompt, options) => options[0] }
    }
  });
  resumedEngine.registerCustomAction("incrementCheckpointCounter", async (_params, context) => {
    context.state.flags.checkpoint_counter = (context.state.flags.checkpoint_counter || 0) + 1;
  });
  resumedEngine.restoreCheckpoint(choiceCheckpoint);
  assert.equal(await resumedEngine.resumeCheckpoint(), true);
  assert.equal(resumedState.flags.checkpoint_counter, 1, "恢复 choice 时不得重放前置动作");
  assert.equal(resumedState.flags.choice_done, true);
  assert.equal(resumedEngine.getCheckpoint().resume, null);
  assert.throws(
    () => resumedEngine.restoreCheckpoint({ state: choiceCheckpoint.state, resume: { eventId: "E_CP_CHOICE", actionIndex: 99 } }),
    /动作下标越界/
  );
}

// 对话动作按句拆分：同一段文本必须逐句等待玩家推进，不能挤进一个对话框。
const dialogueCalls = [];
const dialogueEngine = new Game.EventEngine({
  events: [{
    id: "E_DIALOGUE_SPLIT",
    actions: [{
      type: "dialogue",
      speaker: "测试说话人",
      portrait: "assets/Image/Portrait/player.webp",
      speed: 12,
      text: "第一句。她说：“第二句？”真的吗？！\n\n第三段没有句号"
    }]
  }],
  state: createState(),
  items: [],
  scene: createEngineScene(),
  ui: {
    ...createEngineUi(),
    dialog: {
      showLine: async (action) => { dialogueCalls.push(action); },
      setFast: () => {}
    }
  }
});
await dialogueEngine.play("E_DIALOGUE_SPLIT");
assert.deepEqual(
  dialogueCalls.map((action) => action.text),
  ["第一句。", "她说：“第二句？”", "真的吗？！", "第三段没有句号"],
  "对话动作应按句末标点和空行拆成多个对话框"
);
assert.equal(dialogueCalls.every((action) => action.speaker === "测试说话人"), true);
assert.equal(dialogueCalls.every((action) => action.portrait === "assets/Image/Portrait/player.webp"), true);
assert.equal(dialogueCalls.every((action) => action.speed === 12), true);

const originalRandom = sandbox.Math.random;

function createRegisteredStateWith(values = {}) {
  const state = new Game.GameState(initialState, registeredAttributes, registeredSkills);
  state.completeAttributeAllocation({
    constitution: 10,
    education: 8,
    insight: 8,
    san: 6,
    ...values
  });
  return state;
}

// 医学剧情直接使用教育属性检定，不再依赖技能状态或弹出确认。
const firstAidLowState = createRegisteredStateWith({
  education: 5,
  insight: 9,
  san: 8
});
const firstAidHighInsightState = createRegisteredStateWith({
  education: 6,
  insight: 8,
  san: 8
});
const firstAidContext = (state) => ({
  state,
  attributes: state.attributeDefinitions,
  skills: state.skillDefinitions,
  ui: createEngineUi()
});
sandbox.Math.random = () => 0;
assert.equal(
  (await Game.Dice.get("ev013_education_01")(firstAidContext(firstAidLowState), [])).index,
  1,
  "教育 5、骰点 1 时教育检定应失败"
);
sandbox.Math.random = () => 0.999999;
assert.equal(
  (await Game.Dice.get("ev013_education_01")(firstAidContext(firstAidHighInsightState), [])).index,
  0,
  "教育 6、骰点 6 时教育检定应成功"
);
sandbox.Math.random = originalRandom;

// 正式结局动作应在后续动作执行前触发终止，并保留结局原因。
const endingState = createState();
endingState.completeAttributeAllocation({ strength: 4, insight: 1 });
let endingCalls = 0;
const endingEngine = new Game.EventEngine({
  events: [{
    id: "E_FAKE_END",
    actions: [
      { type: "custom", name: "endGame", params: { reason: "fake_end" } },
      { type: "setFlag", key: "continued", value: true }
    ]
  }],
  state: endingState,
  items: [],
  scene: createEngineScene(),
  ui: createEngineUi(),
  shouldTerminate: (currentState) => Boolean(currentState.flags.ending_reason)
    || currentState.getAttribute("strength") <= 0,
  onTerminate: () => { endingCalls += 1; }
});
Game.registerProjectActions(endingEngine);
await endingEngine.play("E_FAKE_END");
assert.equal(endingState.flags.ending_reason, "fake_end");
assert.equal(endingState.flags.continued, undefined, "结局后的动作不应继续执行");
assert.equal(endingCalls, 1);

// E-502「试图回头」的静默加权随机分岔：按权重选一条出口并写布尔旗标（10%/60%/30%）。
const branchState = createState();
branchState.completeAttributeAllocation({ strength: 4, insight: 1 });
const branchEngine = new Game.EventEngine({
  events: [],
  state: branchState,
  items: [],
  scene: {},
  ui: createEngineUi()
});
Game.registerProjectActions(branchEngine);
const branchAction = {
  type: "custom",
  name: "weightedBranch",
  params: {
    outcomes: [
      { weight: 10, flag: "ev502_return_eaten" },
      { weight: 60, flag: "ev502_return_locked" },
      { weight: 30, flag: "ev502_return_carriage03" }
    ]
  }
};
const branchFlags = () => [
  branchState.flags.ev502_return_eaten,
  branchState.flags.ev502_return_locked,
  branchState.flags.ev502_return_carriage03
];
try {
  sandbox.Math.random = () => 0;
  await branchEngine.actions.get("custom")(branchAction);
  assert.deepEqual(branchFlags(), [true, false, false], "掷点落在区间起点时应选 10% 那条");

  sandbox.Math.random = () => 0.5;
  await branchEngine.actions.get("custom")(branchAction);
  assert.deepEqual(branchFlags(), [false, true, false], "掷点 50 应落在 60% 区间");

  sandbox.Math.random = () => 0.999;
  await branchEngine.actions.get("custom")(branchAction);
  assert.deepEqual(branchFlags(), [false, false, true], "掷点接近上限时应选最后一条");
} finally {
  sandbox.Math.random = originalRandom;
}

// 权重表非法的分岔参数应在运行时报错，而不是静默选一条。
await assert.rejects(
  () => branchEngine.actions.get("custom")({ type: "custom", name: "weightedBranch", params: { outcomes: [] } }),
  /缺少 outcomes/,
  "空 outcomes 应报错"
);
await assert.rejects(
  () => branchEngine.actions.get("custom")({
    type: "custom",
    name: "weightedBranch",
    params: { outcomes: [{ weight: 0, flag: "ev502_return_locked" }] }
  }),
  /权重无效/,
  "非正权重应报错"
);

// 确定性掷骰：骰点恒为 6（成功线）或恒为 1（失败线），验证真实检定条目。
const realUi = createEngineUi();
const realUiInspects = [];
realUi.inspect.show = async (payload) => { realUiInspects.push(payload); };
const realToasts = [];
realUi.toast = (message) => { realToasts.push(message); };
const realDiceEngine = new Game.EventEngine({
  events: [],
  state: registeredState,
  items: [],
  scene: {},
  ui: realUi
});
try {
  // ev005 灵感检定：双6大成功、双1大失败，并回落到普通 outcomes。
  registeredState.currentEventId = "E_REAL_DICE_SUCCESS";
  sandbox.Math.random = () => 0.999;
  let branch = await realDiceEngine.actions.get("check")({
    type: "check", dice: "ev005_insight_01", outcomes: ["EV_SUCCESS", "EV_FAIL"]
  });
  assert.equal(branch.next, "EV_SUCCESS", "灵感双6应大成功并回落成功分支");
  assert.equal(registeredState.checkResults.ev005_insight_01.outcome, 0);
  assert.equal(registeredState.checkResults.ev005_insight_01.grade, "criticalSuccess");
  assert.equal(realUiInspects[realUiInspects.length - 1].title, "检定大成功", "应展示大成功结果窗口");

  registeredState.currentEventId = "E_REAL_DICE_FAIL";
  sandbox.Math.random = () => 0;
  branch = await realDiceEngine.actions.get("check")({
    type: "check", dice: "ev005_insight_01", outcomes: ["EV_SUCCESS", "EV_FAIL"]
  });
  assert.equal(branch.next, "EV_FAIL", "灵感双1应大失败并回落失败分支");
  assert.equal(registeredState.checkResults.ev005_insight_01.outcome, 1);
  assert.equal(registeredState.checkResults.ev005_insight_01.grade, "criticalFailure");

  registeredState.currentEventId = "E_REAL_DICE_CRITICAL_BRANCH";
  branch = await realDiceEngine.actions.get("check")({
    type: "check",
    dice: "ev005_insight_01",
    outcomes: ["EV_SUCCESS", "EV_FAIL"],
    criticalFailure: "EV_CRITICAL_FAIL"
  });
  assert.equal(branch.next, "EV_CRITICAL_FAIL", "配置后大失败应进入独立分支");
} finally {
  sandbox.Math.random = originalRandom;
}

// 有骰子动画宿主时，检定必须把骰点、成败和说明交给动画窗口。
const animationCalls = [];
const animationEngine = new Game.EventEngine({
  events: [],
  state: registeredState,
  items: [],
  scene: {},
  ui: {
    ...createEngineUi(),
    dice: { roll: async (payload) => { animationCalls.push(payload); } }
  }
});
try {
  sandbox.Math.random = () => 0;
  await animationEngine.actions.get("check")({
    type: "check", dice: "ev005_insight_01", outcomes: ["EV_SUCCESS", "EV_FAIL"]
  });
  assert.equal(animationCalls.length, 1, "检定应调用骰子动画窗口");
  assert.equal(Array.from(animationCalls[0].values).join(","), "1,1", "骰子动画应收到两颗实际骰点");
  assert.equal(animationCalls[0].success, false, "骰子动画应收到检定结果");
  assert.equal(animationCalls[0].grade, "criticalFailure", "骰子动画应收到大失败等级");
  assert.equal(animationCalls[0].text.includes("掷出 1"), true, "骰子动画应收到检定说明");
} finally {
  sandbox.Math.random = originalRandom;
}

// SAN 检定只做判定与损失，成败剧情由事件 outcomes 路由。
const sanState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
sanState.completeAttributeAllocation({
  constitution: 10,
  education: 9,
  insight: 10,
  san: 3
});
const sanDialogue = [];
const sanAttributeChanges = [];
const sanDiceEngine = new Game.EventEngine({
  events: [],
  state: sanState,
  items: [],
  scene: {},
  ui: {
    ...createEngineUi(),
    showAttributeChange: (payload) => { sanAttributeChanges.push(payload); },
    dialog: { showLine: async (payload) => { sanDialogue.push(payload); }, setFast: () => {} }
  }
});
try {
  // ev006a：SAN 0/1，固定骰点 1 失败扣 1，与当前 SAN 无关。
  sandbox.Math.random = () => 0;
  const sanResult = await sanDiceEngine.actions.get("check")({
    type: "check", dice: "ev006a_san_01", outcomes: ["SAN_SUCCESS", "SAN_FAIL"]
  });
  assert.equal(sanResult.next, "SAN_FAIL", "SAN 失败应返回失败事件");
  assert.equal(sanResult.stop, true);
  assert.equal(sanState.getAttribute("san"), 2, "SAN 0/1 失败应扣 1");
  assert.equal(sanState.checkResults.ev006a_san_01.outcome, 1);

  // ev006b：SAN 1/1d4，固定骰点 6 成功扣 1。
  sanState.setAttribute("san", 3);
  sandbox.Math.random = () => 0.999;
  const sanSuccess = await sanDiceEngine.actions.get("check")({
    type: "check", dice: "ev006b_san_01", outcomes: ["SAN_SUCCESS", "SAN_FAIL"]
  });
  assert.equal(sanSuccess.next, "SAN_SUCCESS", "SAN 成功应返回成功事件");
  assert.equal(sanSuccess.stop, true);
  assert.equal(sanState.getAttribute("san"), 2, "SAN 1/1d4 成功应扣 1");
  assert.deepEqual(
    (({ name, requested, before, after }) => ({ name, requested, before, after }))(sanAttributeChanges.at(-1)),
    { name: "SAN", requested: -1, before: 3, after: 2 },
    "忍住呕吐的成功分支只能提示 SAN 损失"
  );

  // ev006b：失败掷 1d4（骰点 1，损失 1），只走统一属性变化提示。
  const failedSanState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
  failedSanState.completeAttributeAllocation({ constitution: 10, education: 9, insight: 10, san: 3 });
  const failedSanAttributeChanges = [];
  const failedSanEngine = new Game.EventEngine({
    events: [], state: failedSanState, items: [], scene: {},
    ui: { ...createEngineUi(), showAttributeChange: (payload) => { failedSanAttributeChanges.push(payload); } }
  });
  sandbox.Math.random = () => 0;
  const sanFailure = await failedSanEngine.actions.get("check")({
    type: "check", dice: "ev006b_san_01", outcomes: ["SAN_SUCCESS", "SAN_FAIL"]
  });
  assert.equal(sanFailure.next, "SAN_FAIL");
  assert.equal(sanFailure.stop, true);
  assert.equal(failedSanState.getAttribute("san"), 2, "SAN 1/1d4 失败应按 1d4 扣损");
  assert.equal(failedSanAttributeChanges.length, 1, "骰子损失应只触发一次统一属性提示");
  assert.deepEqual(
    (({ name, requested, before, after }) => ({ name, requested, before, after }))(failedSanAttributeChanges[0]),
    { name: "SAN", requested: -1, before: 3, after: 2 },
    "统一属性提示应包含实际 SAN 损失和变化前后值"
  );
  assert.equal(sanDialogue.length, 0, "骰子层不得直接播放剧情对白");
} finally {
  sandbox.Math.random = originalRandom;
}

// SAN 归零后，引擎应在 check 动作结束时终止，不得继续播放 outcomes 对应剧情。
const zeroSanState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
zeroSanState.completeAttributeAllocation({ constitution: 10, education: 9, insight: 10, san: 3 });
zeroSanState.setAttribute("san", 1);
const zeroSanDialogue = [];
let zeroSanTerminated = false;
const zeroSanEngine = new Game.EventEngine({
  events: [
    { id: "TEST_SAN_ZERO", actions: [{ type: "check", dice: "ev006a_san_01", outcomes: ["TEST_SAN_ZERO_S", "TEST_SAN_ZERO_F"] }] },
    { id: "TEST_SAN_ZERO_S", actions: [{ type: "dialogue", text: "不应播放成功剧情。" }] },
    { id: "TEST_SAN_ZERO_F", actions: [{ type: "dialogue", text: "不应播放失败剧情。" }] }
  ],
  state: zeroSanState,
  items: [],
  scene: { load() {}, refresh() {}, setInteractionEnabled() {} },
  ui: {
    ...createEngineUi(),
    dialog: { showLine: async (payload) => { zeroSanDialogue.push(payload.text); }, setFast: () => {} }
  },
  shouldTerminate: (state) => state.getAttribute("san") <= 0,
  onTerminate: async () => { zeroSanTerminated = true; }
});
try {
  sandbox.Math.random = () => 0;
  await zeroSanEngine.play("TEST_SAN_ZERO");
  assert.equal(zeroSanState.getAttribute("san"), 0);
  assert.equal(zeroSanTerminated, true);
  assert.deepEqual(zeroSanDialogue, []);
} finally {
  sandbox.Math.random = originalRandom;
}

// 调整后的关键阈值：常规 8 点配值下，综合检定需掷 4，潜行需掷 3。
const balanceState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
balanceState.completeAttributeAllocation({ constitution: 8, education: 8, insight: 8, san: 8 });
const balanceEngine = new Game.EventEngine({
  events: [], state: balanceState, items: [], scene: {}, ui: createEngineUi()
});
try {
  sandbox.Math.random = () => 0.34; // d6 = 3；8 + 8 + 3 = 19。
  assert.equal((await balanceEngine.actions.get("check")({
    type: "check", dice: "ev021_education_insight_01", outcomes: ["PASS", "FAIL"]
  })).next, "FAIL");
  sandbox.Math.random = () => 0.5; // d6 = 4；8 + 8 + 4 = 20。
  assert.equal((await balanceEngine.actions.get("check")({
    type: "check", dice: "ev021_education_insight_01", outcomes: ["PASS", "FAIL"]
  })).next, "PASS");

  sandbox.Math.random = () => 0.17; // d6 = 2；8 + 2 = 10。
  assert.equal((await balanceEngine.actions.get("check")({
    type: "check", dice: "ev027_constitution_01", outcomes: ["PASS", "FAIL"]
  })).next, "FAIL");
  sandbox.Math.random = () => 0.34; // d6 = 3；8 + 3 = 11。
  assert.equal((await balanceEngine.actions.get("check")({
    type: "check", dice: "ev027_constitution_01", outcomes: ["PASS", "FAIL"]
  })).next, "PASS");

  // 穷举2d6：3~10点属性均可成功、均可失败，且每一点都有独立成功率。
  const expectedSuccesses = new Map([[3, 3], [4, 6], [5, 10], [6, 15], [7, 21], [8, 26], [9, 30], [10, 33]]);
  for (let attribute = 3; attribute <= 10; attribute += 1) {
    balanceState.setAttribute("insight", attribute);
    let successes = 0;
    let criticalSuccesses = 0;
    let criticalFailures = 0;
    for (let first = 1; first <= 6; first += 1) {
      for (let second = 1; second <= 6; second += 1) {
        const rolls = [first, second];
        let rollIndex = 0;
        sandbox.Math.random = () => (rolls[rollIndex++] - 0.5) / 6;
        const result = await Game.Dice.get("ev005_insight_01")(balanceEngine.context(), []);
        const index = Number.isInteger(result) ? result : result.index;
        if (index === 0) successes += 1;
        if (result?.grade === "criticalSuccess") criticalSuccesses += 1;
        if (result?.grade === "criticalFailure") criticalFailures += 1;
      }
    }
    assert.equal(successes, expectedSuccesses.get(attribute), `属性${attribute}的2d6成功组合数错误`);
    assert.equal(criticalSuccesses, 1, "每档属性都应只有一个双6大成功组合");
    assert.equal(criticalFailures, 1, "每档属性都应只有一个双1大失败组合");
  }

  // 两种剧情专用SAN损失都严格复用同一颗六面骰的点数。
  for (const [diceId, expectedLosses] of [
    ["ev012_san_01", [3, 2, 1, 0, 0, 0]],
    ["ev_fake01_exit_san_01", [2, 1, 1, 1, 0, 0]]
  ]) {
    for (let face = 1; face <= 6; face += 1) {
      balanceState.setAttribute("san", 20);
      sandbox.Math.random = () => (face - 0.5) / 6;
      await Game.Dice.get(diceId)(balanceEngine.context(), []);
      assert.equal(20 - balanceState.getAttribute("san"), expectedLosses[face - 1], `${diceId} 的骰点${face}损失错误`);
    }
  }

  // Clicker 初见为 1~2 扣2、3~4 扣1、5~6 不扣。
  for (const [face, expectedLoss] of [[1, 2], [3, 1], [5, 0]]) {
    balanceState.setAttribute("san", 8);
    sandbox.Math.random = () => (face - 0.5) / 6;
    await Game.Dice.get("ev026_san_01")(balanceEngine.context(), []);
    assert.equal(8 - balanceState.getAttribute("san"), expectedLoss, `ev026_san_01 的骰点${face}损失错误`);
  }

  // Clicker 潜行每轮 SAN 检定均为 1~3 扣2、4~5 扣1、6 不扣。
  for (const diceId of ["ev027_san_01", "ev027_san_02", "ev027_san_03"]) {
    for (const [face, expectedLoss] of [[1, 2], [4, 1], [6, 0]]) {
      balanceState.setAttribute("san", 8);
      sandbox.Math.random = () => (face - 0.5) / 6;
      await Game.Dice.get(diceId)(balanceEngine.context(), []);
      assert.equal(8 - balanceState.getAttribute("san"), expectedLoss, `${diceId} 的骰点${face}损失错误`);
    }
  }

  // 投瓶使用体质与封顶 SAN 的平均值；8/8 时 1+2 失败、2+2 成功，即失败率 3/36≈8.3%。
  async function bottleResult(constitution, san, rolls) {
    balanceState.setAttribute("constitution", constitution);
    balanceState.setAttribute("san", san);
    let rollIndex = 0;
    sandbox.Math.random = () => (rolls[rollIndex++] - 0.5) / 6;
    const result = await Game.Dice.get("ev028_throw_01")(balanceEngine.context(), []);
    return Number.isInteger(result) ? result : result.index;
  }
  assert.equal(await bottleResult(8, 8, [1, 2]), 1, "8/8 投瓶掷出3应失败");
  assert.equal(await bottleResult(8, 8, [2, 2]), 0, "8/8 投瓶掷出4应成功");
  assert.equal(await bottleResult(10, 20, [1, 1]), 1, "双1必须大失败");
  assert.equal(await bottleResult(1, 1, [6, 6]), 0, "双6必须大成功");
  assert.equal(await bottleResult(1, 20, [3, 3]), 1, "投瓶计算中的 SAN 贡献必须封顶为10");

  for (const [bonus, rate] of [[0, 40], [15, 55], [30, 70], [45, 85]]) {
    balanceState.flags.ev014_negotiation_bonus = bonus;
    sandbox.Math.random = () => (rate - 1) / 100;
    assert.equal(await Game.Dice.get("ev014_negotiation_final_01")(balanceEngine.context()), 0, `${rate}% 边界应成功`);
    sandbox.Math.random = () => rate / 100;
    assert.equal(await Game.Dice.get("ev014_negotiation_final_01")(balanceEngine.context()), 1, `${rate + 1}% 应失败`);
  }
  assert.throws(() => Game.Dice.get("ev026_extra_san_01"), /未注册/);
  assert.throws(() => Game.Dice.get("ev029_constitution_01"), /未注册/);
  assert.throws(() => Game.Dice.get("ev028_constitution_01"), /未注册/);
  assert.throws(() => Game.Dice.get("ev028_luck_01"), /未注册/);
} finally {
  sandbox.Math.random = originalRandom;
}

// 引擎语义：越界回滚、无分支副作用、记录合并、普通动作。
const actionState = createState();
actionState.completeAttributeAllocation({ strength: 4, insight: 1 });
const actionEngine = new Game.EventEngine({
  events: [],
  state: actionState,
  items: [],
  scene: {},
  ui: createEngineUi()
});

Game.Dice.register("test_dice_out_of_range", async () => 7);
await assert.rejects(
  () => actionEngine.actions.get("check")({ type: "check", dice: "test_dice_out_of_range", outcomes: ["EV_ONLY"] }),
  /无效的结果编号/,
  "检定返回越界下标应报错"
);

Game.Dice.register("test_dice_side_effect", async (context) => {
  context.state.modifyAttribute("strength", -1);
  return 0;
});
const sideResult = await actionEngine.actions.get("check")({ type: "check", dice: "test_dice_side_effect" });
assert.equal(sideResult, null, "无 outcomes 的检定应返回 null");
assert.equal(actionState.getAttribute("strength"), 3, "骰子函数内可修改状态");
assert.equal(actionState.checkResults.test_dice_side_effect.outcome, null, "副作用检定应记录 outcome=null");

Game.Dice.register("test_dice_custom_record", async (context) => {
  context.state.checkResults.test_dice_custom_record = { success: true };
  return 0;
});
const recordResult = await actionEngine.actions.get("check")({ type: "check", dice: "test_dice_custom_record", outcomes: ["EV_A"] });
assert.equal(recordResult.next, "EV_A", "应按返回下标跳转结果事件");
assert.equal(actionState.checkResults.test_dice_custom_record.success, true, "骰子函数补充字段应保留");
assert.equal(actionState.checkResults.test_dice_custom_record.outcome, 0, "引擎最小记录应写入 outcome");

// 所有检定统一最多掷两次：第一次成功后锁定，第一次失败后才允许第二掷。
let cappedDiceCalls = 0;
const cappedDiceResults = [1, 0, 1];
Game.Dice.register("test_dice_capped_attempts", async () => {
  cappedDiceCalls += 1;
  return cappedDiceResults.shift();
});
const cappedState = createState();
cappedState.completeAttributeAllocation({ strength: 4, insight: 1 });
cappedState.currentEventId = "E_CAPPED_CHECK";
const cappedEngine = new Game.EventEngine({
  events: [],
  state: cappedState,
  items: [],
  scene: {},
  ui: createEngineUi()
});
const cappedAction = {
  type: "check",
  dice: "test_dice_capped_attempts",
  outcomes: ["EV_SUCCESS", "EV_FAIL"]
};
let cappedResult = await cappedEngine.actions.get("check")(cappedAction);
assert.equal(cappedResult.next, "EV_FAIL", "第一次失败应进入失败分支");
assert.equal(cappedState.checkAttempts["event:E_CAPPED_CHECK:test_dice_capped_attempts"].attempts, 1);
cappedResult = await cappedEngine.actions.get("check")(cappedAction);
assert.equal(cappedResult.next, "EV_SUCCESS", "第一次失败后允许第二次检定");
assert.equal(cappedDiceCalls, 2);
cappedResult = await cappedEngine.actions.get("check")(cappedAction);
assert.equal(cappedResult.next, "EV_SUCCESS", "第二次成功后应复用结果");
assert.equal(cappedDiceCalls, 2, "第一次成功后不得进行第二次，第二次后也不得再掷");

// 同一 dice 编号在不同事件中仍是不同检定，不会互相锁定。
let separateEventCalls = 0;
Game.Dice.register("test_dice_separate_events", async () => {
  separateEventCalls += 1;
  return 0;
});
const separateEventState = createState();
separateEventState.completeAttributeAllocation({ strength: 4, insight: 1 });
const separateEventEngine = new Game.EventEngine({
  events: [],
  state: separateEventState,
  items: [],
  scene: {},
  ui: createEngineUi()
});
separateEventState.currentEventId = "E_FIRST_CHECK";
await separateEventEngine.actions.get("check")({
  type: "check",
  dice: "test_dice_separate_events",
  outcomes: ["EV_SUCCESS"]
});
separateEventState.currentEventId = "E_SECOND_CHECK";
await separateEventEngine.actions.get("check")({
  type: "check",
  dice: "test_dice_separate_events",
  outcomes: ["EV_SUCCESS"]
});
assert.equal(separateEventCalls, 2, "不同事件的同名 dice 应分别计算尝试次数");

// 跨事件属于同一个逻辑检定时，可通过 checkId 共享次数与已完成结果。
let sharedCheckCalls = 0;
const sharedCheckResults = [1, 0];
Game.Dice.register("test_dice_shared_check", async () => {
  sharedCheckCalls += 1;
  return sharedCheckResults.shift();
});
const sharedCheckState = createState();
sharedCheckState.completeAttributeAllocation({ strength: 4, insight: 1 });
const sharedCheckEngine = new Game.EventEngine({
  events: [],
  state: sharedCheckState,
  items: [],
  scene: {},
  ui: createEngineUi()
});
sharedCheckState.currentEventId = "E_SHARED_CHECK_FIRST";
let sharedResult = await sharedCheckEngine.actions.get("check")({
  type: "check",
  checkId: "shared_check",
  dice: "test_dice_shared_check",
  outcomes: ["EV_SUCCESS", "EV_FAIL"]
});
assert.equal(sharedResult.next, "EV_FAIL");
sharedCheckState.currentEventId = "E_SHARED_CHECK_SECOND";
sharedResult = await sharedCheckEngine.actions.get("check")({
  type: "check",
  checkId: "shared_check",
  dice: "test_dice_shared_check",
  outcomes: ["EV_SUCCESS", "EV_FAIL"]
});
assert.equal(sharedResult.next, "EV_SUCCESS");
sharedCheckState.currentEventId = "E_SHARED_CHECK_THIRD";
sharedResult = await sharedCheckEngine.actions.get("check")({
  type: "check",
  checkId: "shared_check",
  dice: "test_dice_shared_check",
  outcomes: ["EV_SUCCESS", "EV_FAIL"]
});
assert.equal(sharedResult.next, "EV_SUCCESS", "共享检定成功后应复用第二次结果");
assert.equal(sharedCheckCalls, 2, "共享检定跨事件也不得超过两次");

await actionEngine.actions.get("modifyAttribute")({ type: "modifyAttribute", attribute: "strength", amount: -1 });
assert.equal(actionState.getAttribute("strength"), 2);
await actionEngine.actions.get("setSkill")({ type: "setSkill", skill: "manual", value: true });
assert.equal(actionState.getSkill("manual"), true);
await actionEngine.actions.get("loseSkill")({ type: "loseSkill", skill: "strong" });
await actionEngine.actions.get("learnSkill")({ type: "learnSkill", skill: "strong" });
assert.equal(actionState.getSkill("strong"), true);
assert.equal(actionState.skillOverrides.strong, true);

const terminalState = createState();
terminalState.completeAttributeAllocation({ strength: 4, insight: 1 });
let terminalCalls = 0;
const terminalEngine = new Game.EventEngine({
  events: [{
    id: "E_TERMINAL",
    actions: [
      { type: "modifyAttribute", attribute: "strength", amount: -4 },
      { type: "setFlag", key: "continued", value: true }
    ]
  }],
  state: terminalState,
  items: [],
  scene: createEngineScene(),
  ui: createEngineUi(),
  shouldTerminate: (currentState) => currentState.getAttribute("strength") === 0,
  onTerminate: () => { terminalCalls += 1; }
});
await terminalEngine.play("E_TERMINAL");
assert.equal(terminalState.getAttribute("strength"), 0, "终止状态不应回滚");
assert.equal(terminalState.flags.continued, undefined, "终止后的动作不应继续执行");
assert.equal(terminalCalls, 1, "终止回调应只执行一次");

// 异步终止演出必须先完成，play() 才能结束；避免结局图层比演出提前出现。
const delayedTerminalState = createState();
delayedTerminalState.completeAttributeAllocation({ strength: 4, insight: 1 });
let releaseTermination;
let terminationStarted = false;
let terminationFinished = false;
let delayedPlayFinished = false;
const delayedTerminalEngine = new Game.EventEngine({
  events: [{
    id: "E_DELAYED_TERMINAL",
    actions: [{ type: "modifyAttribute", attribute: "strength", amount: -4 }]
  }],
  state: delayedTerminalState,
  items: [],
  scene: createEngineScene(),
  ui: createEngineUi(),
  shouldTerminate: (currentState) => currentState.getAttribute("strength") === 0,
  onTerminate: async () => {
    terminationStarted = true;
    await new Promise((resolve) => { releaseTermination = resolve; });
    terminationFinished = true;
  }
});
const delayedPlay = delayedTerminalEngine.play("E_DELAYED_TERMINAL").then((value) => {
  delayedPlayFinished = true;
  return value;
});
for (let index = 0; index < 20 && !terminationStarted; index += 1) {
  await Promise.resolve();
}
assert.equal(terminationStarted, true, "终止回调应开始执行");
assert.equal(delayedPlayFinished, false, "play() 应等待异步终止演出完成");
releaseTermination();
assert.equal(await delayedPlay, false, "延迟终止完成后 play() 应正常收尾");
assert.equal(terminationFinished, true, "异步终止演出应完整执行");

// 检定函数内把属性扣到 0 同样触发终止，事件链不再继续。
const diceTerminalState = createState();
diceTerminalState.completeAttributeAllocation({ strength: 4, insight: 1 });
let diceTerminalCalls = 0;
Game.Dice.register("test_dice_terminal", async (context) => {
  context.state.modifyAttribute("strength", -4);
  return 0;
});
const diceTerminalEngine = new Game.EventEngine({
  events: [{
    id: "E_DICE_TERMINAL",
    actions: [
      { type: "check", dice: "test_dice_terminal" },
      { type: "setFlag", key: "continued", value: true }
    ]
  }],
  state: diceTerminalState,
  items: [],
  scene: createEngineScene(),
  ui: createEngineUi(),
  shouldTerminate: (currentState) => currentState.getAttribute("strength") === 0,
  onTerminate: () => { diceTerminalCalls += 1; }
});
await diceTerminalEngine.play("E_DICE_TERMINAL");
assert.equal(diceTerminalState.getAttribute("strength"), 0);
assert.equal(diceTerminalState.flags.continued, undefined, "骰子检定触发终止后不应继续执行");
assert.equal(diceTerminalCalls, 1);

// ==== 小游戏（minigame 动作：注册表索引、结算动作列表、宿主竞态、回滚）====

function registerStubMinigame(id, run) {
  Game.Minigames.register(id, { title: `测试小游戏 ${id}`, run });
}

function createMgEngine(events, options = {}) {
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const engine = new Game.EventEngine({
    events,
    state,
    items: [],
    scene: createEngineScene(),
    ui: createEngineUi(),
    ...options
  });
  return { state, engine };
}

// 1) 结算动作列表由解释器顺序执行，之后当前事件继续、事件链结束才落稳定快照。
registerStubMinigame("mg_test_settle", async () => [
  { type: "setFlag", key: "mg_settled", value: true },
  { type: "modifyAttribute", attribute: "strength", amount: 1 }
]);

// 1b) 小游戏可以通过结算专用 jump 动作把事件链切到成功分支。
registerStubMinigame("mg_test_jump", async () => [
  { type: "jump", next: "E_MG_JUMP_SUCCESS" }
]);
{
  const { state, engine } = createMgEngine([
    {
      id: "E_MG_JUMP",
      actions: [{ type: "minigame", game: "mg_test_jump" }],
      next: "E_MG_JUMP_FAILURE"
    },
    {
      id: "E_MG_JUMP_SUCCESS",
      actions: [{ type: "setFlag", key: "jump_success", value: true }]
    },
    {
      id: "E_MG_JUMP_FAILURE",
      actions: [{ type: "setFlag", key: "jump_failure", value: true }]
    }
  ]);
  assert.equal(await engine.play("E_MG_JUMP"), true, "小游戏 jump 结算应正常结束事件");
  assert.equal(state.flags.jump_success, true, "小游戏 jump 结算应进入成功分支");
  assert.equal(state.flags.jump_failure, undefined, "小游戏 jump 结算不应执行默认失败分支");
}
{
  const { state, engine } = createMgEngine([{
    id: "E_MG_SETTLE",
    actions: [
      { type: "minigame", game: "mg_test_settle" },
      { type: "setFlag", key: "after_minigame", value: true }
    ]
  }]);
  assert.equal(await engine.play("E_MG_SETTLE"), true, "结算正常的小游戏事件应成功结束");
  assert.equal(state.flags.mg_settled, true, "小游戏返回的结算动作列表应被顺序执行");
  assert.equal(state.getAttribute("strength"), 5, "结算中的属性修改应生效");
  assert.equal(state.flags.after_minigame, true, "小游戏动作之后的动作应继续执行");
  assert.equal(engine.getCheckpoint().state.flags.mg_settled, true, "事件链结束后结算应进入稳定检查点");
}

// 2) 小游戏未返回结算（undefined/null/空数组）时不改动状态、事件照常继续。
registerStubMinigame("mg_test_no_settlement", async () => undefined);
{
  const { state, engine } = createMgEngine([{
    id: "E_MG_NONE",
    actions: [
      { type: "minigame", game: "mg_test_no_settlement" },
      { type: "setFlag", key: "tail_flag", value: true }
    ]
  }]);
  assert.equal(await engine.play("E_MG_NONE"), true);
  assert.equal(state.flags.tail_flag, true, "无结算时事件应继续执行后续动作");
  assert.equal(state.flags.mg_settled, undefined, "无结算不应写入任何状态");
}

// 3) 引用未注册的小游戏编号：动作报错。
{
  const { engine } = createMgEngine([{ id: "E_MG_MISSING", actions: [] }]);
  await assert.rejects(
    () => engine.actions.get("minigame")({ type: "minigame", game: "mg_not_registered" }),
    /未注册/,
    "未注册的小游戏编号应报错"
  );
}

// 4) 结算列表含未知动作类型：整条事件回滚到稳定点。
registerStubMinigame("mg_test_bad_settlement", async () => [
  { type: "setFlag", key: "partial_flag", value: true },
  { type: "notARealAction" }
]);
{
  const { state, engine } = createMgEngine([{
    id: "E_MG_BAD",
    actions: [{ type: "minigame", game: "mg_test_bad_settlement" }]
  }]);
  assert.equal(await engine.play("E_MG_BAD"), false, "结算出错的事件应回滚并返回 false");
  assert.equal(state.flags.partial_flag, undefined, "结算列表前段写入的状态应随回滚撤销");
}

// 5) 结算动作列表超限：报错回滚。
registerStubMinigame("mg_test_oversize", async () =>
  Array.from({ length: 101 }, () => ({ type: "setFlag", key: "overflow", value: true }))
);
{
  const { state, engine } = createMgEngine([{
    id: "E_MG_OVER",
    actions: [{ type: "minigame", game: "mg_test_oversize" }]
  }]);
  assert.equal(await engine.play("E_MG_OVER"), false, "超长结算列表应回滚");
  assert.equal(state.flags.overflow, undefined);
}

// 6) 结算列表不允许嵌套小游戏（宿主窗口为单实例，禁止覆盖）。
registerStubMinigame("mg_test_nested", async () => [
  { type: "minigame", game: "mg_test_settle" }
]);
{
  const { state, engine } = createMgEngine([{
    id: "E_MG_NESTED",
    actions: [{ type: "minigame", game: "mg_test_nested" }]
  }]);
  assert.equal(await engine.play("E_MG_NESTED"), false, "结算里嵌套小游戏应报错回滚");
}

// 7) 宿主竞态：模块不返回（玩家点“退出小游戏”）时由宿主退出结算接管，事件继续。
registerStubMinigame("mg_test_quit", async (context) => {
  context.onQuit(() => [{ type: "setFlag", key: "quit_settled", value: true }]);
  return new Promise(() => {}); // 挂起：模拟模块自身不结束，只等退出按钮
});
{
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const fakeHost = {
    opened: false,
    quitProvider: null,
    openAndStage() { this.opened = true; return null; },
    setQuitProvider(provider) { this.quitProvider = provider; },
    quitPromise() {
      if (!this.resolveQuit) {
        this.quit = new Promise((resolve) => { this.resolveQuit = resolve; });
      }
      return this.quit;
    },
    close() { this.opened = false; }
  };
  const quitEngine = new Game.EventEngine({
    events: [{
      id: "E_MG_QUIT",
      actions: [
        { type: "minigame", game: "mg_test_quit" },
        { type: "setFlag", key: "after_quit", value: true }
      ]
    }],
    state,
    items: [],
    scene: createEngineScene(),
    ui: { ...createEngineUi(), minigame: fakeHost }
  });
  const timer = setTimeout(() => {
    // 模拟玩家点击“退出小游戏”：宿主用模块注册的退出结算解析竞态。
    fakeHost.resolveQuit(fakeHost.quitProvider ? fakeHost.quitProvider() : undefined);
  }, 0);
  try {
    assert.equal(await quitEngine.play("E_MG_QUIT"), true, "退出小游戏应正常结束事件");
    assert.equal(fakeHost.opened, false, "事件结束后宿主窗口应已关闭");
    assert.equal(state.flags.quit_settled, true, "退出结算动作列表应被解释器执行");
    assert.equal(state.flags.after_quit, true, "退出小游戏后事件应继续执行后续动作");
  } finally {
    clearTimeout(timer);
  }
}

// ==== 音效（sound 动作：不阻塞 / await 阻塞 / 暂停停止 / 取消中止 / 未注册）====

const SOUND_TEST_REGISTRY = [
  { id: "sfx_test_short", name: "测试短音效", file: "assets/audio/sfx-test.mp3", volume: 0.5 },
  { id: "sfx_test_positional", name: "测试定位音效", file: "assets/audio/sfx-test-2.mp3" }
];

// Audio 元素桩：readyState 为 1 时“元数据已就绪”，play() 立即开始；
// 也可用 prepare() 模拟需要异步加载元数据的元素（先 play() 后 loadedmetadata）。
class StubAudioElement {
  constructor({ readyState = 1, duration = 0.35, failPlayback = false, resetPositionOnRateChange = false } = {}) {
    this.tagName = "AUDIO";
    this.readyState = readyState;
    this.duration = readyState >= 1 ? duration : NaN;
    this.plannedDuration = duration;
    this.currentTime = 0;
    this.resetPositionOnRateChange = resetPositionOnRateChange;
    this._playbackRate = 1;
    this.volume = 1;
    this.src = "";
    this.hidden = false;
    this.isConnected = false;
    this.paused = true;
    this.plays = 0;
    this.pauses = 0;
    this.removes = 0;
    this.failPlayback = failPlayback;
    this.attributes = {};
    this.playCalls = [];
    this.listeners = new Map();
  }

  setAttribute(name, value) { this.attributes[name] = value; }

  get playbackRate() { return this._playbackRate; }

  set playbackRate(value) {
    this._playbackRate = value;
    if (this.resetPositionOnRateChange && this.currentTime > 0) this.currentTime = 0;
  }

  addEventListener(name, handler, options = {}) {
    if (!this.listeners.has(name)) this.listeners.set(name, []);
    this.listeners.get(name).push({ handler, once: Boolean(options.once) });
  }

  removeEventListener(name, handler) {
    if (!handler) {
      this.listeners.delete(name);
      return;
    }
    const remaining = (this.listeners.get(name) || []).filter((entry) => entry.handler !== handler);
    if (remaining.length) this.listeners.set(name, remaining);
    else this.listeners.delete(name);
  }

  emit(name) {
    for (const entry of [...(this.listeners.get(name) || [])]) {
      if (entry.once) this.removeEventListener(name, entry.handler);
      entry.handler();
    }
  }

  // 模拟元数据加载完成（需要 readyState 从 0 走起的元素）。
  prepare() {
    this.readyState = 1;
    this.duration = this.plannedDuration;
    this.emit("loadedmetadata");
  }

  play() {
    this.plays += 1;
    this.playCalls.push({ currentTime: this.currentTime, volume: this.volume, duration: this.duration });
    this.paused = false;
    if (this.failPlayback) return Promise.reject(new Error("NotAllowedError: 自动播放被拒绝"));
    return Promise.resolve();
  }

  pause() { this.pauses += 1; this.paused = true; }

  remove() { this.removes += 1; this.isConnected = false; }
}

// 每个编号一条 Audio 桩，便于断言各自收到的播放参数与停止情况。
function createAudioStub(registry = SOUND_TEST_REGISTRY, elementOptions = {}, managerOptions = { fadeMs: 20 }) {
  const elements = new Map();
  const elementHistory = new Map();
  const root = {
    children: [],
    append(element) {
      element.isConnected = true;
      element.owner = root;
      root.children.push(element);
    }
  };
  const audio = new Game.AudioManager(root, registry, managerOptions);
  audio.testElements = elements;
  audio.testElementHistory = elementHistory;
  audio.createElement = (entry) => {
    const element = new StubAudioElement(elementOptions);
    element.registryFile = entry.file;
    elements.set(entry.id, element);
    const history = elementHistory.get(entry.id) || [];
    history.push(element);
    elementHistory.set(entry.id, history);
    return element;
  };
  return audio;
}

function createBackgroundAudioStub(registry = SOUND_TEST_REGISTRY, elementOptions = {}) {
  const elements = [];
  const root = {
    children: [],
    append(element) {
      element.isConnected = true;
      element.owner = root;
      root.children.push(element);
    }
  };
  const audio = new Game.BackgroundAudioManager(root, registry, { fadeMs: 20 });
  audio.testElements = elements;
  audio.createElement = (entry) => {
    const element = new StubAudioElement(elementOptions);
    element.registryId = entry.id;
    elements.push(element);
    return element;
  };
  return audio;
}

async function settleMicrotasks(count = 8) {
  for (let index = 0; index < count; index += 1) await Promise.resolve();
}

// 1) 未注册编号：管理器抛错，事件链回滚，后续动作不执行。
{
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const engine = new Game.EventEngine({
    events: [{
      id: "E_SFX_BAD",
      actions: [
        { type: "sound", sound: "sfx_not_registered" },
        { type: "setFlag", key: "after_bad_sound", value: true }
      ]
    }],
    state,
    items: [],
    scene: createEngineScene(),
    ui: { ...createEngineUi(), audio: createAudioStub() }
  });
  assert.equal(await engine.play("E_SFX_BAD"), false, "引用未注册音效应报错回滚");
  assert.equal(state.flags.after_bad_sound, undefined, "报错后不应继续执行后续动作");
}

// 2) ui.audio 缺失：明确报错，不静默跳过。
{
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const engine = new Game.EventEngine({
    events: [{ id: "E_SFX_NO_MANAGER", actions: [{ type: "sound", sound: "sfx_test_short" }] }],
    state,
    items: [],
    scene: createEngineScene(),
    ui: createEngineUi()
  });
  assert.equal(await engine.play("E_SFX_NO_MANAGER"), false, "缺少音效系统应报错回滚");
}

// 3) 默认不阻塞：音效与对话并行，播放通过参数原样传递，且不等播放结束。
{
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const audio = createAudioStub();
  const engine = new Game.EventEngine({
    events: [{
      id: "E_SFX_ASYNC",
      actions: [
        { type: "sound", sound: "sfx_test_positional", start: 500, duration: 1200, volume: 0.4 },
        { type: "setFlag", key: "after_async_sound", value: true }
      ]
    }],
    state,
    items: [],
    scene: createEngineScene(),
    ui: { ...createEngineUi(), audio }
  });
  assert.equal(await engine.play("E_SFX_ASYNC"), true, "不阻塞音效应正常结束事件");
  assert.equal(state.flags.after_async_sound, true, "音效不应挡住后续动作");
  const element = audio.testElements.get("sfx_test_positional");
  assert.equal(element.plays, 1, "音效应被播放一次");
  assert.equal(element.owner, audio.root, "音源应挂到宿主上");
  assert.equal(element.src, "assets/audio/sfx-test-2.mp3", "应加载注册表里的文件");
  assert.equal(element.currentTime, 500 / 1000, "start 参数应从指定位置开始");
  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(element.volume, 0.4, "动作级 volume 应作为注册表音量（默认 1）的倍率");
  const positionedVoice = audio.voices.get("sfx_test_positional");
  positionedVoice.setVolume(0.15);
  assert.equal(element.volume, 0.15, "演出应能在播放中调整相对音量");
  assert.equal(audio.voices.has("sfx_test_positional"), true, "不阻塞音效应继续播放，等待结束/截断");
  element.emit("ended");
  assert.equal(audio.voices.size, 0, "音效结束或截断后应从活动表移除");
  assert.equal(element.pauses, 1, "结束后应停掉音源");
}

// 3b) 用户总音量与资源默认音量、动作倍率独立相乘，演出动态调音不会绕过总音量。
{
  const audio = createAudioStub(SOUND_TEST_REGISTRY, {}, { fadeMs: 0, masterVolume: 0.25 });
  const voice = audio.play("sfx_test_short", { volume: 0.4 });
  assert.equal(voice.targetVolume, 0.5 * 0.4 * 0.25);
  voice.setVolume(0.8);
  assert.equal(voice.targetVolume, 0.5 * 0.8 * 0.25);
  audio.setMasterVolume(0.5);
  assert.equal(voice.targetVolume, 0.5 * 0.8 * 0.5);
  assert.equal(voice.element.volume, voice.targetVolume);
  voice.stop({ immediate: true });

  const boosted = createAudioStub(SOUND_TEST_REGISTRY, {}, { fadeMs: 0, masterVolume: 1 / 0.6 });
  const boostedVoice = boosted.play("sfx_test_positional");
  assert.equal(boostedVoice.targetVolume, 1, "高于 60% 时可放大，但最终音量不得超过浏览器上限");
  boostedVoice.stop({ immediate: true });
}

// 4) await: true：事件等音效结束（或截断时长）才继续，并在结束时停掉本条音效。
{
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const audio = createAudioStub();
  const engine = new Game.EventEngine({
    events: [{
      id: "E_SFX_AWAIT",
      actions: [
        { type: "sound", sound: "sfx_test_short", await: true, duration: 40 },
        { type: "setFlag", key: "after_await_sound", value: true }
      ]
    }],
    state,
    items: [],
    scene: createEngineScene(),
    ui: { ...createEngineUi(), audio }
  });
  let finished = false;
  const playback = engine.play("E_SFX_AWAIT").then((value) => { finished = true; return value; });
  await settleMicrotasks();
  assert.equal(finished, false, "await: true 应等待音效播完");
  assert.equal(state.flags.after_await_sound, undefined, "等待期间后续动作不应执行");
  assert.equal(await playback, true, "截断时长走完后事件应正常结束");
  assert.equal(state.flags.after_await_sound, true, "等待结束后应继续执行后续动作");
  const element = audio.testElements.get("sfx_test_short");
  assert.equal(element.plays, 1);
  assert.equal(element.pauses, 1, "阻塞音效结束后应停止本条音效");
  assert.equal(element.volume, 0, "duration 应在配置时长内完成淡出");
}

// 5) 取消：事件运行中取消会中止阻塞中的音效等待，并掐断正在播放的音效。
{
  const state = createState();
  state.completeAttributeAllocation({ strength: 4, insight: 1 });
  const audio = createAudioStub();
  const engine = new Game.EventEngine({
    events: [{
      id: "E_SFX_CANCEL",
      actions: [
        { type: "sound", sound: "sfx_test_short", await: true },
        { type: "setFlag", key: "after_cancelled_sound", value: true }
      ]
    }],
    state,
    items: [],
    scene: createEngineScene(),
    ui: {
      ...createEngineUi(),
      audio,
      cancelPending: () => audio.stopAll()
    }
  });
  const playback = engine.play("E_SFX_CANCEL");
  await settleMicrotasks();
  assert.equal(audio.voices.size, 1, "取消前音效应在播放中");
  await engine.cancelToCheckpoint();
  assert.equal(await playback, false, "取消后事件应回滚结束");
  assert.equal(audio.voices.size, 0, "取消应掐断正在播放的音效");
  assert.equal(state.flags.after_cancelled_sound, undefined, "取消后不应继续执行后续动作");
}

// 6) 暂停：setPaused(true) 停掉全部音效，恢复后不补播。
{
  const audio = createAudioStub();
  const engine = new Game.EventEngine({
    events: [{ id: "E_SFX_PAUSE", actions: [{ type: "sound", sound: "sfx_test_short" }] }],
    state: createState(),
    items: [],
    scene: createEngineScene(),
    ui: { ...createEngineUi(), audio, setPaused: (value) => { if (value) audio.stopAll(); } }
  });
  engine.ui.audio.play("sfx_test_short");
  assert.equal(audio.voices.size, 1);
  engine.setPaused(true);
  assert.equal(audio.voices.size, 0, "暂停应停掉全部音效");
  engine.setPaused(false);
  assert.equal(audio.voices.size, 0, "恢复后不应补播已停止的音效");
}

// 7) 并发上限：超出上限时停掉最早开始的一条，最老的音源不会无限叠播。
{
  const registry = Array.from({ length: Game.AUDIO_MAX_VOICES + 2 }, (_value, index) => ({
    id: `sfx_overflow_${index}`,
    name: `溢出音效 ${index}`,
    file: `assets/audio/sfx-overflow-${index}.mp3`
  }));
  const audio = createAudioStub(registry);
  for (const entry of registry) audio.play(entry.id);
  assert.equal(audio.voices.size, Game.AUDIO_MAX_VOICES, "活动音源不应超过并发上限");
  assert.equal(audio.testElements.get("sfx_overflow_0").pauses, 1, "超出上限时应停掉最早开始的一条");
  assert.equal(audio.testElements.get(registry[registry.length - 1].id).pauses, 0, "最新的音效应保持播放");
}

// 8) 无 DOM 环境：所有播放静默降级，不抛错、不挂住事件。
{
  const audio = new Game.AudioManager(null, SOUND_TEST_REGISTRY);
  const voice = audio.play("sfx_test_short", { duration: 5000 });
  assert.equal(audio.createElement({ file: "x" }), null, "无 DOM 时不应创建音源");
  await voice.finished;
  voice.stop();
}

// 9) 异步加载元数据（真实浏览器路径）：时长依赖 loadedmetadata，播完由 ended 结束。
{
  const audio = createAudioStub(SOUND_TEST_REGISTRY, { readyState: 0, duration: 0.3 });
  const voice = audio.play("sfx_test_positional");
  const element = audio.testElements.get("sfx_test_positional");
  assert.equal(element.plays, 0, "元数据未就绪时不应调用 play()");
  assert.equal(voice.duration, null, "元数据未就绪时有效时长未知");
  element.prepare();
  assert.equal(element.plays, 1, "元数据就绪后应开始播放");
  assert.equal(voice.started, true, "播放已开始");
  assert.equal(voice.duration, 0.3, "有效时长应取自音频自身时长");
  assert.equal(element.playCalls[0].volume, 0, "所有游戏内音源都应从静音开始淡入");
  element.emit("ended");
  await voice.finished;
  assert.equal(audio.voices.size, 0, "ended 后应结束并退出活动表");
  assert.equal(element.pauses, 1, "结束后应暂停音源");
  assert.equal(element.removes, 0, "移除音源应延迟到归还时机，不在结束瞬间立即移除");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(element.removes, 1, "归还时机到达后应移除音源");
}

// 10) 短促音效：立即请求播放且不淡入，避免声音结束前仍接近静音。
{
  const audio = createAudioStub(SOUND_TEST_REGISTRY, { readyState: 0 });
  audio.play("sfx_test_short", { startWithoutMetadata: true, fadeMs: 0 });
  const element = audio.testElements.get("sfx_test_short");
  assert.equal(element.plays, 1, "短促音效应能跳过元数据等待并立即播放");
  assert.ok(element.volume > 0, "fadeMs=0 的短促音效不应从静音缓慢淡入");
  audio.stopAll({ immediate: true });
}

// 11) 元数据就绪前暂停：不得在停止后补播。
{
  const audio = createAudioStub(SOUND_TEST_REGISTRY, { readyState: 0 });
  audio.play("sfx_test_short", { duration: 100 });
  const element = audio.testElements.get("sfx_test_short");
  audio.stopAll();
  assert.equal(audio.voices.size, 0, "stopAll 应清空活动音源");
  element.prepare();
  assert.equal(element.plays, 0, "已被停止的音效不应在元数据到达后补播");
}

// 12) 自动播放被拒绝：跳过该音效并立刻结算，不让 await 白等一整段时长。
{
  const audio = createAudioStub(SOUND_TEST_REGISTRY, { failPlayback: true });
  const voice = audio.play("sfx_test_short", { duration: 5000 });
  let settled = false;
  const playback = voice.finished.then(() => { settled = true; });
  await settleMicrotasks(12);
  assert.equal(settled, true, "play() 被拒绝时音效应立即结算，而不是等满 5 秒");
  assert.equal(voice.failed, true, "play() 被拒绝时应标记失败");
  assert.equal(audio.voices.size, 0, "被拒绝的音效应退出活动表");
  await playback;
}

// 13) 静音门禁：里世界只允许白名单音效，其余请求静默且停止中的声音立即截断。
{
  const audio = createAudioStub();
  audio.play("sfx_test_short");
  assert.equal(audio.voices.has("sfx_test_short"), true);
  audio.setMuted(true, ["sfx_test_positional"]);
  assert.equal(audio.voices.has("sfx_test_short"), false, "进入静音区应停止非白名单音效");

  const blocked = audio.play("sfx_test_short");
  await blocked.finished;
  assert.equal(audio.testElements.get("sfx_test_short").plays, 1, "静音时不应重新播放非白名单音效");

  audio.play("sfx_test_positional");
  assert.equal(audio.testElements.get("sfx_test_positional").plays, 1, "白名单音效应正常播放");

  audio.setMuted(false);
  audio.play("sfx_test_short");
  assert.equal(audio.testElements.get("sfx_test_short").plays, 1, "离开静音区后音效应恢复");
}

// 13) 循环音：loop 音源不按时长自动结算，只由 stop() 或场景切换停止。
{
  const audio = createAudioStub();
  const voice = audio.play("sfx_test_short", { loop: true });
  const element = audio.testElements.get("sfx_test_short");
  assert.equal(element.loop, true, "loop 应写入 Audio 元素");
  assert.equal(voice.duration, null, "未知时长的循环音不设结束时长");
  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(audio.voices.has("sfx_test_short"), true, "循环音应持续播放");
  voice.stop();
  assert.equal(voice.stopping, true, "显式停止应异步淡出");
  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(audio.voices.has("sfx_test_short"), false);
}

// 14) 带间隔的循环音：一轮结束后先静音等待，再复位并重新播放。
{
  const audio = createAudioStub();
  const voice = audio.play("sfx_test_short", { loop: true, loopGapMs: 10 });
  const element = audio.testElements.get("sfx_test_short");
  assert.equal(element.loop, false, "带间隔的循环应关闭浏览器无缝 loop");
  element.emit("ended");
  assert.equal(element.plays, 1, "间隔期间不应立即重播");
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(element.plays, 1);
  await new Promise((resolve) => setTimeout(resolve, 12));
  assert.equal(element.plays, 2, "间隔结束后应重新播放");
  assert.equal(audio.voices.has("sfx_test_short"), true);
  voice.stop();
  await voice.finished;
}

// 15) 同编号事件音效重播：旧实例淡出，新实例独立从头淡入。
{
  const audio = createAudioStub();
  const first = audio.play("sfx_test_short");
  await new Promise((resolve) => setTimeout(resolve, 25));
  const second = audio.play("sfx_test_short");
  assert.notEqual(second, first, "事件音效重播应创建新实例");
  assert.equal(first.stopping, true, "旧实例应在后台淡出");
  assert.equal(audio.testElementHistory.get("sfx_test_short").length, 2, "同编号淡出与淡入可短暂并存");
  assert.equal(second.element.volume, 0, "新实例应从静音淡入");
  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(first.stopped, true);
  assert.equal(second.element.volume, 0.5);
  second.stop({ immediate: true });
}

// 16) 背景音：同轨保持/恢复，换轨时旧音淡出与新音淡入并行。
{
  const audio = createBackgroundAudioStub();
  const first = audio.setTrack("sfx_test_short");
  await new Promise((resolve) => setTimeout(resolve, 25));
  first.element.currentTime = 12;
  assert.equal(audio.setTrack("sfx_test_short"), first, "相邻场景绑定同轨时不得重建音源");
  assert.equal(first.element.currentTime, 12, "同轨切景应保留播放位置");

  audio.setTrack(null);
  assert.equal(first.stopping, true);
  assert.equal(audio.setTrack("sfx_test_short"), first, "淡出期间恢复同轨应复用原实例");
  assert.equal(first.stopping, false, "恢复同轨应打断淡出");
  assert.equal(first.element.currentTime, 12);

  const second = audio.setTrack("sfx_test_positional");
  assert.equal(first.stopping, true, "换轨时旧背景音应淡出");
  assert.equal(second.element.volume, 0, "换轨时新背景音应同时从静音淡入");
  assert.equal(audio.current, second);
  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(first.stopped, true);
  assert.equal(second.element.volume, 1);
  audio.stopAll({ immediate: true });
}

// 17) 背景音保留带间隔循环参数。
{
  const audio = createBackgroundAudioStub();
  const voice = audio.setTrack("sfx_test_short", { loopGapMs: 10 });
  const element = voice.element;
  assert.equal(element.loop, false);
  element.emit("ended");
  await new Promise((resolve) => setTimeout(resolve, 12));
  assert.equal(element.plays, 2, "背景音每轮结束后应按场景配置间隔重播");
  audio.stopAll({ immediate: true });
}

// 18) 变调必须复用当前背景音并保留播放位置，即使浏览器赋值速率时意外归零。
{
  const audio = createBackgroundAudioStub(SOUND_TEST_REGISTRY, { resetPositionOnRateChange: true });
  const voice = audio.setTrack("sfx_test_short");
  const element = voice.element;
  element.currentTime = 12;
  audio.setPlaybackRate(0.68);
  assert.equal(audio.current, voice, "背景音变调不得重建音源");
  assert.equal(element.plays, 1, "背景音变调不得重新播放");
  assert.equal(element.currentTime, 12, "背景音变调后应保留当前播放位置");
  assert.equal(element.playbackRate, 0.68, "背景音应应用指定播放速度");
  audio.stopAll({ immediate: true });
}

console.log("运行时测试通过：本地认证、属性分配、技能触发、条件读取、三槽存档、终止状态、小游戏结算与音效播放。");
