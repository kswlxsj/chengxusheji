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
  localStorage,
  sessionStorage,
  window: { localStorage, sessionStorage }
};
vm.createContext(sandbox);

for (const file of ["src/namespace.js", "src/auth.js", "src/state.js", "src/scene.js", "src/events.js", "src/dice.js", "src/custom-actions.js"]) {
  vm.runInContext(await readFile(file, "utf8"), sandbox, { filename: file });
}

const Game = sandbox.window.TrainGame;
const Auth = Game.Auth;

assert.equal(Auth.register("ab", "123456").ok, false, "用户名过短时不应注册");
assert.equal(Auth.register("Alice", "12345").ok, false, "密码过短时不应注册");
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

const saves = new Game.SaveManager(state, "test-save");
saves.save(1);
assert.equal(saves.listSlots().length, 3);
assert.equal(saves.listSlots()[0].empty, false);
assert.equal(typeof saves.listSlots()[0].savedAt, "string");
assert.equal(saves.listSlots()[1].empty, true);
const restored = createState();
new Game.SaveManager(restored, "test-save").load(1);
assert.deepEqual(restored.snapshot(), state.snapshot());
restored.setAttribute("strength", 5);
assert.equal(restored.getSkill("strong"), true, "读取后应保留技能自动屏蔽状态");

state.setAttribute("insight", 4);
saves.save(2);
assert.equal(saves.hasSave(1), true);
assert.equal(saves.hasSave(2), true);
saves.load(1);
assert.equal(state.getAttribute("insight"), 3, "不同槽位的状态应相互隔离");
saves.delete(2);
assert.equal(saves.hasSave(2), false);
assert.throws(() => saves.hasSave(0), /1 到 3/);
assert.throws(() => saves.save(4), /1 到 3/);

const aliceSaves = new Game.SaveManager(state);
assert.equal(aliceSaves.slotKey(1), "train-game-save-user-v1:Alice:slot-1");
aliceSaves.save(1);
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
assert.throws(() => new Game.SaveManager(unallocated, "unallocated-save").save(1), /分配完成前/);

const registeredAttributes = JSON.parse(await readFile("data/attributes.json", "utf8"));
const registeredSkills = JSON.parse(await readFile("data/skills.json", "utf8"));
const registeredItems = JSON.parse(await readFile("data/items.json", "utf8"));
const registeredState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
assert.equal(registeredState.getSkill("talk"), false);
assert.equal(registeredState.getSkill("stealth"), false);
assert.equal(registeredState.getSkill("medicine"), false);
registeredState.completeAttributeAllocation({
  strength: 7,
  agility: 7,
  education: 7,
  insight: 7,
  will: 10,
  luck: 10,
  constitution: 3,
  san: 5
});
assert.equal(registeredState.getSkill("talk"), true, "教育与灵感之和达到14时应触发话术");
assert.equal(registeredState.getSkill("stealth"), true, "敏捷与力量之和达到14时应触发潜行");
assert.equal(registeredState.getSkill("medicine"), true, "教育超过5时应触发医学");

let inspectedItem = null;
const inspectEngine = new Game.EventEngine({
  events: [],
  state: registeredState,
  items: registeredItems,
  scene: {},
  ui: { inspect: { show: async (payload) => { inspectedItem = payload; } } }
});
await inspectEngine.actions.get("inspect")({ type: "inspect", item: "old_ticket" });
assert.equal(inspectedItem.title, "旧车票", "物品调查应读取注册表中的名称");
assert.equal(inspectedItem.text, "一张已经褪色的车票，背面写着无法辨认的日期。", "物品调查应读取注册表中的说明");
assert.equal(inspectedItem.image, "assets/note.svg", "物品调查应读取注册表中的图片");

// ==== 检定（dice.js 可编程检定）====
assert.equal(typeof Game.Dice.get("ev005_insight_01"), "function", "E_005 灵感检定应已注册");
assert.equal(typeof Game.Dice.get("ev006a_san_01"), "function", "E_006A SAN 检定应已注册");
assert.equal(typeof Game.Dice.get("ev006b_san_01"), "function", "E_006B SAN 检定应已注册");
assert.equal(typeof Game.Dice.get("ev030_san_01"), "function", "E_030 SAN 检定应已注册");

function createEngineUi() {
  return {
    dialog: { showLine: async () => {}, setFast: () => {} },
    inspect: { show: async () => {} },
    choice: { choose: async () => ({ value: true }) },
    closeDialog: () => {},
    cancelPending: () => {},
    setPaused: () => {},
    toast: () => {}
  };
}

function createEngineScene() {
  return {
    load: () => {},
    refresh: () => {},
    setInteractionEnabled: () => {}
  };
}

const originalRandom = sandbox.Math.random;

function createRegisteredStateWith(values = {}) {
  const state = new Game.GameState(initialState, registeredAttributes, registeredSkills);
  state.completeAttributeAllocation({
    strength: 7,
    agility: 7,
    education: 7,
    insight: 7,
    will: 10,
    luck: 10,
    constitution: 3,
    san: 5,
    ...values
  });
  return state;
}

// 当前项目约定：教育 > 5 解锁医学，并同步视为已掌握急救。
const firstAidLowState = createRegisteredStateWith({
  strength: 7,
  agility: 7,
  education: 5,
  insight: 9,
  will: 10,
  luck: 10,
  constitution: 3,
  san: 5
});
const firstAidHighInsightState = createRegisteredStateWith({
  strength: 7,
  agility: 7,
  education: 6,
  insight: 8,
  will: 10,
  luck: 10,
  constitution: 3,
  san: 5
});
const firstAidContext = (state) => ({
  state,
  attributes: state.attributeDefinitions,
  skills: state.skillDefinitions,
  ui: createEngineUi()
});
assert.equal(
  await Game.Dice.get("skill_first_aid")(firstAidContext(firstAidLowState), []),
  1,
  "教育 5 不应解锁医学或急救"
);
assert.equal(
  await Game.Dice.get("skill_first_aid")(firstAidContext(firstAidHighInsightState), []),
  0,
  "教育 6 应解锁医学并同步视为掌握急救"
);
const declinedFirstAidUi = {
  ...createEngineUi(),
  choice: { choose: async () => ({ value: false }) }
};
assert.equal(
  await Game.Dice.get("skill_first_aid")({ ...firstAidContext(firstAidHighInsightState), ui: declinedFirstAidUi }, []),
  1,
  "使用技能前询问时，放弃使用应视为检定失败"
);

// E-009 失败路线必须根据 E-008 侦察结果分流，不能无条件进入 E-011。
const routeState = createRegisteredStateWith();
routeState.flags.ev008_scouting_ok = false;
assert.equal(await Game.Dice.get("ev010_join_route_01")(firstAidContext(routeState), ["E_011", "E_012"]), 1);
routeState.flags.ev008_scouting_ok = true;
assert.equal(await Game.Dice.get("ev010_join_route_01")(firstAidContext(routeState), ["E_011", "E_012"]), 0);

// 正式结局动作应在后续动作执行前触发终止，并保留结局原因。
const endingState = createState();
endingState.completeAttributeAllocation({ strength: 4, insight: 1 });
let endingCalls = 0;
const endingEngine = new Game.EventEngine({
  events: [{
    id: "E_TRUE_END",
    actions: [
      { type: "custom", name: "endGame", params: { reason: "true_end" } },
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
await endingEngine.play("E_TRUE_END");
assert.equal(endingState.flags.ending_reason, "true_end");
assert.equal(endingState.flags.continued, undefined, "结局后的动作不应继续执行");
assert.equal(endingCalls, 1);

// E-030 的 SAN 1d4/1d10 应真实掷骰，并标记为 Bad End；即使 SAN 归零也不能改跳 SAN 结局。
const badEndingState = createRegisteredStateWith({ san: 5 });
const badEndingUi = createEngineUi();
const badEndingEngine = new Game.EventEngine({
  events: [],
  state: badEndingState,
  items: [],
  scene: {},
  ui: badEndingUi
});
try {
  sandbox.Math.random = () => 0;
  await badEndingEngine.actions.get("check")({ type: "check", dice: "ev030_san_01" });
  assert.equal(badEndingState.flags.ending_reason, "bad_end");
  assert.equal(badEndingState.getAttribute("san"), 4, "E-030 失败应按 1d10 扣损，骰点为 1 时扣 1");
} finally {
  sandbox.Math.random = originalRandom;
}

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
  // ev005 灵感检定：属性 7，骰点 6 成功、骰点 1 失败，走 outcomes 分支。
  sandbox.Math.random = () => 0.999;
  let branch = await realDiceEngine.actions.get("check")({
    type: "check", dice: "ev005_insight_01", outcomes: ["EV_SUCCESS", "EV_FAIL"]
  });
  assert.equal(branch.next, "EV_SUCCESS", "灵感骰点 6 应成功");
  assert.equal(registeredState.checkResults.ev005_insight_01.outcome, 0);
  assert.equal(realUiInspects[realUiInspects.length - 1].title, "检定成功", "应展示检定结果窗口");

  sandbox.Math.random = () => 0;
  branch = await realDiceEngine.actions.get("check")({
    type: "check", dice: "ev005_insight_01", outcomes: ["EV_SUCCESS", "EV_FAIL"]
  });
  assert.equal(branch.next, "EV_FAIL", "灵感骰点 1 应失败");
  assert.equal(registeredState.checkResults.ev005_insight_01.outcome, 1);
} finally {
  sandbox.Math.random = originalRandom;
}

// SAN 检定损失（真实属性表，SAN 初始分配 5）。
const sanState = new Game.GameState(initialState, registeredAttributes, registeredSkills);
sanState.completeAttributeAllocation({
  strength: 7,
  agility: 7,
  education: 7,
  insight: 7,
  will: 10,
  luck: 10,
  constitution: 3,
  san: 5
});
const sanDiceEngine = new Game.EventEngine({
  events: [],
  state: sanState,
  items: [],
  scene: {},
  ui: createEngineUi()
});
try {
  // ev006a：SAN 0/1，失败扣 1（骰点 1 + SAN 5 = 6 < 11）。
  sandbox.Math.random = () => 0;
  const sanResult = await sanDiceEngine.actions.get("check")({ type: "check", dice: "ev006a_san_01" });
  assert.equal(sanResult, null, "无 outcomes 的检定不应跳转");
  assert.equal(sanState.getAttribute("san"), 4, "SAN 0/1 失败应扣 1");
  assert.equal(sanState.checkResults.ev006a_san_01.outcome, null, "无分支检定记录 outcome=null");

  // ev006b：SAN 1/1d4，成功扣 1（SAN 恢复 5 后骰点 6 + 5 = 11 达标）。
  sanState.setAttribute("san", 5);
  sandbox.Math.random = () => 0.999;
  await sanDiceEngine.actions.get("check")({ type: "check", dice: "ev006b_san_01" });
  assert.equal(sanState.getAttribute("san"), 4, "SAN 1/1d4 成功应扣 1");

  // ev006b：失败掷 1d4（骰点 1，损失 1）并弹掷骰提示。
  const toastsBefore = realToasts.length;
  const sanToasts = [];
  const toastSink = (message) => { sanToasts.push(message); };
  sanDiceEngine.ui = { ...createEngineUi(), toast: toastSink };
  sandbox.Math.random = () => 0;
  await sanDiceEngine.actions.get("check")({ type: "check", dice: "ev006b_san_01" });
  assert.equal(sanState.getAttribute("san"), 3, "SAN 1/1d4 失败应按 1d4 扣损");
  assert.equal(sanToasts.length, 1, "骰子损失应弹掷骰提示");
  assert.equal(sanToasts[0].includes("1d4"), true, "提示应包含骰子表达式");
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

console.log("运行时测试通过：本地认证、属性分配、技能触发、条件读取、三槽存档与终止状态。");
