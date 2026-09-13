// 主线接线与逐句切景回归。
// 与 test-inner-world.mjs 同一约定：每句目的地描写必须已经处于对应背景，
// 推门/出发文字仍属于出发场景；进入新场景的路线必须先 changeScene 再播到达描写。
//
// 覆盖范围（5号车厢 → 4号 → 3号 → 2号 → 先头车厢）：
// - 5号右门只过门（切景 + 过门句，不触发医学检定）；剧情路线统一经 E_013_ENTRY 进4号。
// - 进4号车厢的医学检定每次存档只发生一次；失败结果写入 crew_04_medical_failed。
// - 4号→3号折返有折返描写；3号→2号在“踏进2号车厢”之前切到 carriage_02。
// - 2号车厢 Clicker 指向怪物遭遇；先头车厢控制杆指向操作面板；潜行通过也置 carriage_02_passed。
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [events, scenes, items, attributes, skills, meta] = await Promise.all(
  ["events", "scenes", "items", "attributes", "skills", "meta"].map(async (name) => JSON.parse(await read(`data/${name}.json`)))
);
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
  const diceCalls = [];
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
    closeDialog() {}, cancelPending() {}, setPaused() {}, toast(message) { trace.push({ error: message }); }
  };
  const scene = {
    async prepare() {}, async whenReady() {}, load(id) { state.sceneId = id; }, refresh() {}, setInteractionEnabled() {}
  };
  const engine = new Game.EventEngine({ events, state, scene, ui, items,
    shouldTerminate: (s) => Boolean(s.flags.ending_reason), onTerminate() {} });
  Game.registerProjectActions(engine);
  // 检定按编号返回固定下标，并记录调用顺序，便于断言“检定只发生一次”。
  Game.Dice = { get: (id) => async () => { diceCalls.push(id); return dice[id] ?? 0; } };
  // 本文件只验证接线与切景；真实小游戏画面与结算另在浏览器验收。
  Game.Minigames = { get: () => ({ title: "测试小游戏", run: async () => undefined }) };
  return { state, engine, trace, diceCalls, async play(id) {
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

assert.equal(objectOf("carriage_05", "door_05_to_04").clickEvent, "E_GO_05_04", "5号右门应为普通过门事件");
assert.equal(objectOf("carriage_02", "clicker_02").clickEvent, "E_026", "Clicker 应进入2号车厢怪物遭遇");
assert.equal(objectOf("front_carriage", "control_27").clickEvent, "E_032", "控制把手应打开操作面板");
assert.equal(objectOf("carriage_03", "door_03_to_02").clickEvent, "E_501", "3号通往2号的门仍归里世界入口");

// 剧情路线的 next 统一指向 E_013_ENTRY，不能直接落进只有检定动作的 E_013。
for (const id of ["E_010_F", "E_010_JOIN", "E_011_S", "E_011_F", "E_012_AFTER"]) {
  assert.equal(eventById.get(id).next, "E_013_ENTRY", `${id} 必须经 E_013_ENTRY 进入4号车厢`);
}
const entryActions = actionsOf("E_013_ENTRY");
assert.deepEqual(entryActions[0], { type: "changeScene", scene: "carriage_04" });
assert.equal(entryActions.filter((action) => action.type === "dialogue").length, 1);
assert.equal(eventById.get("E_013_ENTRY").next, "E_013");
// 到达描写不能留在出发场景。
assert.equal(actionsOf("E_012_AFTER").some((action) => action.type === "dialogue" && action.text.includes("4号车厢")), false);

// 进车厢检定一次性；失败/成功的副作用必须写进状态。
const entryCheck = actionsOf("E_013");
assert.equal(entryCheck[0].type, "conditionalJump");
assert.deepEqual(entryCheck[0].when, { flag: "crew_04_entry_medical_done", equals: true });
assert.equal(entryCheck[0].next, "E_013_REVISIT");
assert.deepEqual(actionsOf("E_013_REVISIT"), [], "重复到达应是静默落点");
assert.equal(actionsOf("E_013").some((action) => action.type === "setFlag" && action.key === "crew_04_entry_medical_done"), true);
assert.equal(actionsOf("E_013_F").some((action) => action.type === "setFlag" && action.key === "crew_04_medical_failed" && action.value === true), true);
assert.equal(actionsOf("E_013_S").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted" && action.value === true), true);

// 4号→3号折返有折返描写。
const door04 = actionsOf("E_DOOR_04");
assert.deepEqual(door04[0], { type: "changeScene", scene: "carriage_03" });
assert.equal(door04[door04.length - 1].type, "dialogue");
assert.match(door04[door04.length - 1].text, /返回3号车厢/);

// 3号→2号：两条光源检定分支都要先切景。
assert.deepEqual(actionsOf("E_024_S_CONTINUE")[0], { type: "changeScene", scene: "carriage_02" });
const failBranch = actionsOf("E_024_F");
assert.deepEqual(failBranch[failBranch.length - 1], { type: "changeScene", scene: "carriage_02" });

// 潜行通过也算通过，前门不再永远被堵；前门通向先头车厢到达事件。
assert.equal(actionsOf("E_027_S").some((action) => action.type === "setFlag" && action.key === "carriage_02_passed" && action.value === true), true);
const frontDoorOption = actionsOf("E_GO_02_FRONT_DOOR")[0].options.find((option) => option.label === "推开安全门");
assert.equal(frontDoorOption.next, "E_031");
assert.deepEqual(frontDoorOption.when, { flag: "carriage_02_passed", equals: true });

// ---------- 逐句场景轨迹 ----------

// 5号右门：只切景、只说一句过门话，绝不触发医学检定。
let game = fixture({ sceneId: "carriage_05", dice: { skill_medicine: 0 } });
await game.play("E_GO_05_04");
assert.deepEqual(scenesOf(game), ["carriage_04"]);
assert.match(game.trace[0].text, /来到4号车厢/);
assert.deepEqual(game.diceCalls, [], "普通过门不得触发检定");
assert.equal(game.state.flags.crew_met, true);

// 剧情路线（侦查失败/读报后向前跑）进4号：先切景再播到达描写，检定恰好一次。
game = fixture({ sceneId: "carriage_05", dice: { skill_medicine: 1 } });
await game.play("E_010_F");
assert.equal(game.state.sceneId, "carriage_04");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);
assert.deepEqual(game.diceCalls, ["skill_medicine"]);
assert.equal(game.state.flags.crew_04_medical_failed, true, "进车厢检定失败要写入状态");
game.trace.length = 0;
await game.play("E_013_ENTRY");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);
assert.deepEqual(game.diceCalls, ["skill_medicine"], "重复进4号不得重播检定");

// 其余剧情路线同样落到 carriage_04。
game = fixture({ sceneId: "carriage_05", dice: { skill_medicine: 1 } });
await game.play("E_012_AFTER");
assert.equal(game.state.sceneId, "carriage_04");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);
assert.equal(game.state.flags.crew_met, true);

game = fixture({ sceneId: "carriage_05", dice: { skill_medicine: 1 } });
await game.play("E_011_S");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);

// 4号→3号折返：切景后播折返描写；“还没做3号入场叙述”时仍由 E_018 接走。
game = fixture({ sceneId: "carriage_04", flags: { carriage_03_bag_interacted: true } });
await game.play("E_DOOR_04");
assert.deepEqual(scenesOf(game), ["carriage_03"]);
assert.match(game.trace[game.trace.length - 1].text, /返回3号车厢/);

game = fixture({ sceneId: "carriage_04" });
await game.play("E_DOOR_04");
assert.equal(game.state.sceneId, "carriage_03");
assert.match(game.trace[0].text, /大量行李/);

// 3号→2号：切到 carriage_02 之后才播“踏进2号车厢”，此后不再回到3号。
game = fixture({ sceneId: "carriage_03", dice: { skill_medicine: 1 } });
await game.play("E_024_S_CONTINUE");
let cut = assertCutBefore(game, "carriage_03", "carriage_02");
assert.equal(cut, 0, "该事件应以切景开头");
assert.equal(game.trace[cut].text, "你屏住呼吸，压低身形，踏进2号车厢。");
assert.equal(game.state.flags.carriage_02_passed, true, "潜行通过也要置通过状态");
const sceneSeq = scenesOf(game);
const firstFront = sceneSeq.indexOf("front_carriage");
assert.ok(firstFront > cut, "潜行通过后应到达先头车厢");
assert.equal(sceneSeq.slice(cut, firstFront).every((id) => id === "carriage_02"), true, "2号车厢段的每句都应在 carriage_02");

// 光源检定失败分支：先播出发场景的判断，再切到2号车厢。
game = fixture({ sceneId: "carriage_03" });
await game.play("E_024_F");
cut = assertCutBefore(game, "carriage_03", "carriage_02");
assert.equal(cut, 1, "失败分支应先播“什么都看不清”，再切景");
assert.equal(game.trace[cut].text, "四周毫无光源。");

// 2号车厢点 Clicker：直接进入怪物遭遇，不再出现3号车厢的取工具文案。
game = fixture({ sceneId: "carriage_02", choiceLabels: ["屏住呼吸，尝试潜行通过"] });
await game.play("E_026");
assert.equal(scenesOf(game)[0], "carriage_02");
assert.match(game.trace[0].text, /那个怪物/);
assert.equal(game.trace.some((entry) => entry.text.includes("回到3号车厢")), false, "Clicker 不得触发3号车厢内容");
assert.equal(game.trace.some((entry) => entry.text.includes("你取出工具")), false);

// 先头车厢点控制把手：打开操作面板，不再触发2号车厢的潜行检定。
game = fixture({ sceneId: "front_carriage", inventory: ["crew_keys"], choiceLabels: ["右杆下拉——加速，继续前进"] });
await game.play("E_032");
assert.deepEqual([...new Set(scenesOf(game))], ["front_carriage"]);
assert.match(game.trace[0].text, /操作面板/);
assert.equal(game.diceCalls.includes("ev027_stealth_luck_01"), false, "控制把手不得触发潜行检定");
assert.equal(game.state.flags.ending_reason, "true_end");

console.log("主线接线回归通过：4号车厢入口与一次性检定、折返描写、3号→2号切景、Clicker 与控制杆接线。");
