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
    setItem: (key, value) => storage.set(key, String(value))
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
saves.save();
const restored = createState();
new Game.SaveManager(restored, "test-save").load();
assert.deepEqual(restored.snapshot(), state.snapshot());
restored.setAttribute("strength", 5);
assert.equal(restored.getSkill("strong"), true, "读取后应保留技能自动屏蔽状态");

storage.set("legacy-save", JSON.stringify(state.snapshot()));
assert.throws(() => new Game.SaveManager(createState(), "legacy-save").load(), /版本不兼容/);

const unallocated = createState();
assert.throws(() => new Game.SaveManager(unallocated, "unallocated-save").save(), /分配完成前/);

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

console.log("运行时测试通过：属性分配、技能触发、条件读取与存档兼容性。");
