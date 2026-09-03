import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const storage = new Map();
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
  localStorage: {
    getItem: (key) => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key)
  },
  window: {}
};
vm.createContext(sandbox);

for (const file of ["src/namespace.js", "src/state.js", "src/scene.js", "src/events.js", "src/custom-actions.js"]) {
  vm.runInContext(await readFile(file, "utf8"), sandbox, { filename: file });
}

const Game = sandbox.window.TrainGame;
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

storage.set("legacy-save-1", JSON.stringify(state.snapshot()));
assert.throws(() => new Game.SaveManager(createState(), "legacy-save").load(1), /版本不兼容/);
storage.set("train-game-save-v1", JSON.stringify({ saveVersion: 2, state: state.snapshot() }));
assert.equal(new Game.SaveManager(createState()).listSlots().every((slot) => slot.empty), true, "旧单槽存档不应自动迁移");

const unallocated = createState();
assert.throws(() => new Game.SaveManager(unallocated, "unallocated-save").save(1), /分配完成前/);

const registeredAttributes = JSON.parse(await readFile("data/attributes.json", "utf8"));
const registeredSkills = JSON.parse(await readFile("data/skills.json", "utf8"));
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
assert.equal(registeredState.getSkill("medicine"), true, "教育达到7时应触发医学");

const halfLuckEngine = new Game.EventEngine({
  events: [],
  state: registeredState,
  items: [],
  scene: {},
  ui: { inspect: { show: async () => {} } }
});
await halfLuckEngine.actions.get("check")({
  type: "check",
  checkId: "carriage02_stealth_half_luck_001",
  label: "潜行：1d6＋幸运的一半",
  attribute: "luck",
  modifier: 0,
  success: "TEST_SUCCESS",
  fail: "TEST_FAIL"
});
assert.equal(registeredState.checkResults.carriage02_stealth_half_luck_001.rawBase, 10);
assert.equal(registeredState.checkResults.carriage02_stealth_half_luck_001.base, 5, "幸运应先除以2并向下取整");
assert.equal(registeredState.checkResults.carriage02_stealth_half_luck_001.threshold, 7, "潜行幸运检定阈值应为7");

const actionState = createState();
actionState.completeAttributeAllocation({ strength: 4, insight: 1 });
const actionEngine = new Game.EventEngine({
  events: [],
  state: actionState,
  items: [],
  scene: {},
  ui: {}
});
Game.registerProjectActions(actionEngine);
const rollClickerCount = actionEngine.customActions.get("rollClickerCount");
await rollClickerCount({ checkId: "test_clicker_count_001" }, { state: actionState });
const firstClickerCount = actionState.flags.clickerCount;
assert(Number.isInteger(firstClickerCount) && firstClickerCount >= 1 && firstClickerCount <= 3);
assert.equal(actionState.checkResults.test_clicker_count_001.roll, firstClickerCount);
await rollClickerCount({ checkId: "test_clicker_count_002" }, { state: actionState });
assert.equal(actionState.flags.clickerCount, firstClickerCount, "Clicker数量生成后不应重复暗骰");
assert.equal(actionState.checkResults.test_clicker_count_002, undefined, "重复调用不应写入新的检定结果");
await actionEngine.actions.get("modifyAttribute")({ type: "modifyAttribute", attribute: "strength", amount: -1 });
assert.equal(actionState.getAttribute("strength"), 3);
await actionEngine.actions.get("setSkill")({ type: "setSkill", skill: "manual", value: true });
assert.equal(actionState.getSkill("manual"), true);
await actionEngine.actions.get("loseSkill")({ type: "loseSkill", skill: "strong" });
await actionEngine.actions.get("learnSkill")({ type: "learnSkill", skill: "strong" });
assert.equal(actionState.getSkill("strong"), true);
assert.equal(actionState.skillOverrides.strong, true);

function createEngineUi() {
  return {
    dialog: { showLine: async () => {} },
    inspect: { show: async () => {} },
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

const diceTerminalState = createState();
diceTerminalState.completeAttributeAllocation({ strength: 4, insight: 1 });
let diceTerminalCalls = 0;
const diceTerminalEngine = new Game.EventEngine({
  events: [{
    id: "E_DICE_TERMINAL",
    actions: [
      { type: "custom", name: "modifyAttributeByDice", params: { attribute: "strength", direction: "loss", count: 0, sides: 1, bonus: 4 } },
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
Game.registerProjectActions(diceTerminalEngine);
await diceTerminalEngine.play("E_DICE_TERMINAL");
assert.equal(diceTerminalState.getAttribute("strength"), 0);
assert.equal(diceTerminalState.flags.continued, undefined, "骰子动作触发终止后不应继续执行");
assert.equal(diceTerminalCalls, 1);

console.log("运行时测试通过：属性分配、技能触发、条件读取、三槽存档与终止状态。");
