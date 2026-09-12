import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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

function fixture(flags = {}, inventory = [], sceneId = "carriage_03") {
  const state = new Game.GameState({ ...meta.initialState, flags, inventory, sceneId }, attributes, skills);
  const trace = [];
  const ui = {
    dialog: { setFast() {}, async showLine(a) { trace.push({ event: state.currentEventId, scene: state.sceneId, text: a.text, inventory: [...state.inventory] }); } },
    choice: { async choose(prompt, options) { return options.find(o => ["留着", "原路返回", "调头"].includes(o.label)) || options[0]; } },
    closeDialog() {}, cancelPending() {}, setPaused() {}, toast(message) { trace.push({ error: message }); }
  };
  const scene = {
    async prepare() {}, async whenReady() {}, load(id) { state.sceneId = id; }, refresh() {}, setInteractionEnabled() {}
  };
  const engine = new Game.EventEngine({ events, state, scene, ui, items,
    shouldTerminate: s => Boolean(s.flags.ending_reason), onTerminate() {} });
  Game.registerProjectActions(engine);
  // 本文件测试剧情接线；真实覆盖层、5秒计时与暂停另在浏览器验收。
  engine.customActions.entries.set("innerWhisperScare", async () => { trace.push({ scare: true }); });
  Game.Dice = { get: () => async () => flags.scoutingResult || 0 };
  return { state, engine, scene, ui, trace, async play(id) {
    const result = await engine.play(id);
    assert.equal(trace.some(t => t.error), false, JSON.stringify(trace));
    return result;
  } };
}

// 每句目的地描写必须已处于对应背景；推门文字仍属于出发场景。
// 门禁与啃食标签分两拍：踏入空车厢当场带上啃食标签（此时门禁未上锁，回3号后还能再进）；
// 到过伪4才算正式进过里世界，此后推门直接走主线 E_DOOR_03。
let game = fixture();
await game.play("E_501");
assert.equal(game.trace[0].scene, "carriage_03");
assert.equal(game.trace[1].scene, "carriage_inner_01");
assert.equal(game.state.flags.carriage_06_eaten, true);
assert.ok(!game.state.flags.inner_world_entered);
await game.play("E_501");
assert.equal(game.state.sceneId, "carriage_inner_01", "未到伪4时门禁不应上锁");
await game.play("E_505");
assert.equal(game.state.sceneId, "carriage_fake_04");
assert.equal(game.state.flags.inner_world_entered, true);
game.trace.length = 0;
await game.play("E_501");
assert.equal(game.state.sceneId, "carriage_02", "正式进过里世界后推门直接走主线");
assert.equal(game.trace.some(t => t.scene === "carriage_inner_01"), false);

for (const [roll, destination] of [[0.05, "carriage_06"], [0.4, "carriage_inner_02"], [0.9, "carriage_03"]]) {
  game = fixture({ carriage_06_eaten: true }, [], "carriage_inner_01");
  sandbox.Math.random = () => roll;
  await game.play("E_502_RETURN");
  assert.equal(game.state.sceneId, destination);
  assert.equal(game.state.flags.carriage_06_eaten, true, "啃食标签只由入口置位，与返回分支无关");
  assert.ok(!game.state.flags.inner_world_entered, "未到伪4时返回仍可再进里世界");
  assert.equal(game.trace.some(t => t.event === "E_002"), false);
}
for (const [roll, destination] of [[0.1, "carriage_inner_01"], [0.8, "carriage_fake_04"]]) {
  game = fixture({}, [], "carriage_inner_02"); sandbox.Math.random = () => roll;
  await game.play("E_503_BACK"); assert.equal(game.state.sceneId, destination);
}

for (const met of [false, true]) {
  game = fixture({ crew_met: met }, [], "carriage_inner_02");
  await game.play("E_505");
  assert.equal(game.trace.some(t => t.scare), !met);
  assert.equal(game.trace.filter(t => t.event === "E_506").every(t => t.scene === "carriage_fake_04"), true);
}

// 回程×瓶子×钥匙：含回程重新深入、拾取后停留、出口不强迫检定。
for (const fromSea of [false, true]) for (const bottle of [false, true]) for (const given of [false, true]) {
  game = fixture({ ev503_bottle_taken: bottle, ev519_key_given: given, ev519_key_ever_given: given, crew_met: true },
    [...(bottle ? ["bottle"] : []), ...(!given ? ["crew_keys"] : [])], fromSea ? "flower_sea" : "carriage_fake_04");
  await game.play(fromSea ? "E_513" : "E_521");
  if (fromSea) {
    assert.equal(game.state.sceneId, "carriage_fake_04");
    assert.equal(game.trace.find(t => t.text?.includes("编号写着")).scene, "carriage_fake_04");
    await game.play("E_509_BACK");
  }
  assert.equal(game.state.sceneId, "carriage_inner_02");
  assert.equal(game.state.inventory.includes("bottle"), bottle);
  assert.equal(game.trace.some(t => t.text?.includes("瓶身冰凉")), bottle);
  await game.play("E_505"); await game.play("E_509_BACK");
  assert.equal(game.state.sceneId, "carriage_inner_02");
  assert.equal(game.state.flags.ev_inner_backtrack, true);
  if (!bottle) {
    game.trace.length = 0; await game.play("E_503_PICK");
    assert.equal(game.state.inventory.includes("bottle"), true);
    assert.equal(game.trace.some(t => t.event === "E_503"), false);
  }
  await game.play("E_503_BACK");
  assert.equal(game.state.sceneId, "carriage_02");
  assert.equal(game.state.flags.ev_inner_backtrack, false);
  assert.equal(game.state.inventory.filter(i => i === "crew_keys").length, 1);
  assert.equal(game.trace.some(t => t.text?.includes("钥匙不知何时")), given);
  assert.equal(game.trace.some(t => t.event?.startsWith("E_025")), false);
  const snapshot = game.state.snapshot(); game.state.restore(snapshot);
  assert.equal(game.state.flags.ev519_key_ever_given, given);
}

for (const met of [false, true]) for (const scouting of [false, true]) {
  game = fixture({ crew_met: met, ev504_scouting_ok: scouting }, [], "carriage_fake_04");
  await game.play("E_516");
  assert.equal(game.trace.some(t => t.text?.startsWith("是她的声音")), met);
  assert.equal(game.trace.some(t => t.text?.startsWith("一个陌生的声音")), !met);
  assert.equal(Boolean(game.state.flags.ev517_flower_revealed), scouting);
  assert.equal(Boolean(game.state.flags.ev510_flower_sea), false, "窗边看花海不产生污染");
  assert.equal(game.state.flags.ev_inner_backtrack, true);
  if (scouting) {
    game.trace.length = 0; await game.play("E_505"); await game.play("E_516");
    assert.equal(game.trace.some(t => t.text === "窗外的雾气散开了。"), false);
  }
}
game = fixture({}, ["crew_keys"], "carriage_fake_04");
game.ui.choice.choose = async () => null;
await game.play("E_519_GIVE");
assert.equal(game.state.inventory.includes("crew_keys"), false);
assert.equal(game.state.flags.ev519_key_ever_given, true);
await game.play("E_519_GIVE");
assert.equal(game.trace.filter(t => t.text?.startsWith("你把钥匙递出去")).length, 1);
game.state.removeItem("missing"); assert.equal(game.state.inventory.length, 0);
await game.play("E_524"); await game.play("E_524");
assert.equal(game.state.inventory.filter(i => i === "crew_keys").length, 1);

for (const [id, flags, reason] of [["E_511", {}, "lost"], ["E_029", {ev510_flower_sea:true}, "trauma"], ["E_029", {}, "true_end"]]) {
  game = fixture(flags); await game.play(id); assert.equal(game.state.flags.ending_reason, reason);
}

// 资源慢加载、暂停、取消和失败：就绪前不提交目的地或播放其文字。
const flush = () => new Promise(resolve => setImmediate(resolve));
game = fixture(); let ready; game.scene.prepare = () => new Promise(resolve => { ready = resolve; });
let running = game.engine.play("E_501"); await flush();
assert.equal(game.state.sceneId, "carriage_03");
game.engine.setPaused(true); ready(); await flush();
assert.equal(game.state.sceneId, "carriage_03");
game.engine.setPaused(false); await running;
assert.equal(game.state.sceneId, "carriage_inner_01");
game = fixture(); game.scene.prepare = () => new Promise(resolve => { ready = resolve; });
running = game.engine.play("E_501"); await flush();
await game.engine.cancelToStable(); ready(); await running; await flush();
assert.equal(game.state.sceneId, "carriage_03");
assert.equal(game.trace.some(t => t.scene === "carriage_inner_01"), false);
game = fixture(); game.scene.prepare = async () => { throw new Error("测试图片加载失败"); };
await game.engine.play("E_501");
assert.equal(game.state.sceneId, "carriage_03");
assert.match(game.trace.find(t => t.error).error, /测试图片加载失败/);

for (const event of events.filter(e => /^E_5/.test(e.id))) for (const action of event.actions) {
  assert.doesNotMatch(action.text || "", /（(?:音效|场景|演出|若|结局|获得)|【状态|具体数值|4。4。3。4。/);
}
const fake = scenes.find(s => s.id === "carriage_fake_04");
assert.match(fake.background, /fog/);
assert.equal(fake.backgroundVariants[0].visibleWhen.flag, "ev517_flower_revealed");
// 6号被啃食：入口置位的标签驱动背景变体，且优先于便签消失版。
const carriage06 = scenes.find(s => s.id === "carriage_06");
assert.match(carriage06.backgroundVariants[0].image, /carriage-06-eaten\.png/);
assert.deepEqual(carriage06.backgroundVariants[0].visibleWhen, { flag: "carriage_06_eaten", equals: true });
assert.ok((await stat(new URL("../assets/carriage-06-eaten.png", import.meta.url))).size > 0);
assert.equal(events.find(e => e.id === "E_028").actions.some(a => a.game === "conductor_tug"), true);
assert.match(await read("game.html"), /src\/minigame-games\/conductor-tug\.js/);
// 实际渲染后的图片也必须就绪，不能只等待预加载缓存。
game = fixture(); let decoded;
game.scene.whenReady = () => new Promise(resolve => { decoded = resolve; });
running = game.engine.play("E_502"); await flush();
assert.equal(game.trace.length, 0);
await game.engine.cancelToStable(); decoded(); await running;
assert.equal(game.trace.length, 0);
game = fixture();
game.engine.events.set("TEST_WAIT", {id:"TEST_WAIT",actions:[{type:"custom",name:"testWait"}]});
let activeElapsed;
game.engine.registerCustomAction("testWait", async (params, context) => { activeElapsed = await context.wait(60); });
running = game.engine.play("TEST_WAIT"); await flush();
game.engine.setPaused(true);
await new Promise(resolve => setTimeout(resolve, 80));
assert.equal(activeElapsed, undefined);
game.engine.setPaused(false); await running;
assert.ok(activeElapsed >= 55 && activeElapsed < 130, "有效计时不应累计暂停时间");
console.log("里世界回归通过：逐句场景、随机出口、交互分支、回程、道具、结局与切景取消。");
