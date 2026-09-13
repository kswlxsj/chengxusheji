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
    choice: { async choose(prompt, options) { return options.find(o => ["留着", "调头"].includes(o.label)) || options[0]; } },
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
await game.play("E_023");
assert.equal(game.state.sceneId, "carriage_inner_01", "3号车门应先播放 E_023 再进入里世界");

game = fixture();
await game.play("E_501");
const innerSceneIndex = game.trace.findIndex((entry) => entry.scene === "carriage_inner_01");
assert.ok(innerSceneIndex > 0, "进入里世界后应播放目的地描写");
assert.equal(
  game.trace.slice(0, innerSceneIndex).every((entry) => entry.scene === "carriage_03"),
  true,
  "推门文字应仍属于出发场景"
);
assert.equal(
  game.trace.slice(innerSceneIndex).every((entry) => entry.scene === "carriage_inner_01"),
  true,
  "里世界描写开始后应已处于目的地场景"
);
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

// 空车厢左门：首次点击做一次 10%/60%/30% 静默判定，此后重复调查一律被锁上并留在空车厢；
// 到过伪4（inner_world_entered）后该门解锁，改为磨损门描写 → 真实2号车厢。
for (const [roll, destination] of [[0.05, "carriage_06"], [0.4, "carriage_inner_01"], [0.9, "carriage_03"]]) {
  game = fixture({ carriage_06_eaten: true }, [], "carriage_inner_01");
  let calls = 0;
  sandbox.Math.random = () => { calls += 1; return roll; };
  await game.play("E_502_RETURN");
  assert.equal(game.state.sceneId, destination);
  assert.equal(calls, 1, "首次调查只掷一次随机");
  assert.equal(game.state.flags.ev502_return_rolled, true);
  assert.equal(game.trace.some(t => t.text === "门被关死，打不开。"), roll === 0.4);
  assert.equal(game.state.flags.carriage_06_eaten, true, "啃食标签只由入口置位，与返回分支无关");
  assert.ok(!game.state.flags.inner_world_entered, "未到伪4时返回仍可再进里世界");
  assert.equal(game.trace.some(t => t.event === "E_002"), false);
}
game = fixture({ ev502_return_rolled: true }, [], "carriage_inner_01");
let repeatCalls = 0;
sandbox.Math.random = () => { repeatCalls += 1; return 0.05; };
await game.play("E_502_RETURN");
assert.equal(repeatCalls, 0, "判定用掉后重复调查不再掷随机");
assert.equal(game.state.sceneId, "carriage_inner_01", "被锁上时留在空车厢");
assert.equal(game.trace.filter(t => t.text === "门被关死，打不开。").length, 1);
game = fixture({ inner_world_entered: true }, [], "carriage_inner_01");
await game.play("E_502_RETURN");
assert.equal(game.state.sceneId, "carriage_02", "到过伪4后左门解锁为返程出口");
assert.equal(game.trace.some(t => t.text?.includes("高度磨损的车门")), true);
assert.equal(game.state.flags.ev523_seen, true);
// 花草车厢左门不设防：无论正程/回程都直接回空车厢，不再有 50/50 静默随机。
for (const roll of [0.1, 0.8]) {
  game = fixture({}, [], "carriage_inner_02"); sandbox.Math.random = () => roll;
  await game.play("E_503_BACK");
  assert.equal(game.state.sceneId, "carriage_inner_01");
}

// 同一段描写只播一次：空车厢入口/车厢描写、花草车厢初见/返程描写、磨损门描写各播一次；
// 瓶子相关的两段（瓶堆提示、摸瓶描写）按约定不去重。
game = fixture({}, [], "carriage_03");
await game.play("E_501");
assert.equal(game.state.flags.ev502_intro_seen, true);
game.trace.length = 0;
await game.play("E_501");
assert.equal(game.state.sceneId, "carriage_inner_01");
assert.equal(game.trace.some(t => t.text?.includes("这里就是")), false, "二次进入不再重播入口描写");
assert.equal(game.trace.some(t => t.text?.includes("你从未见过的车厢")), false);
assert.equal(game.trace.some(t => t.text?.includes("不知名的空车厢")), false, "空车厢描写只播一次");
game = fixture({}, [], "carriage_inner_01");
await game.play("E_503");
assert.equal(game.state.flags.ev503_intro_seen, true);
assert.equal(game.trace.some(t => t.text?.includes("同样是一节空车厢")), true);
assert.equal(game.trace.some(t => t.text?.includes("角落里散落着几支彩色的空玻璃瓶")), true);
game.trace.length = 0;
await game.play("E_503_BACK");
assert.equal(game.state.sceneId, "carriage_inner_01");
await game.play("E_503");
assert.equal(game.state.sceneId, "carriage_inner_02");
assert.equal(game.trace.some(t => t.text?.includes("同样是一节空车厢")), false, "初见描写只播一次");
assert.equal(game.trace.some(t => t.text?.includes("角落里散落着几支彩色的空玻璃瓶")), true, "未拾瓶时瓶堆提示不去重");
game = fixture({ ev503_bottle_taken: true }, ["bottle"], "carriage_fake_04");
await game.play("E_522");
assert.equal(game.state.flags.ev522_intro_seen, true);
assert.equal(game.trace.some(t => t.text?.includes("你认得这里")), true);
game.trace.length = 0;
await game.play("E_505"); await game.play("E_522");
assert.equal(game.trace.some(t => t.text?.includes("你认得这里")), false, "返程描写只播一次");
assert.equal(game.trace.some(t => t.text?.includes("瓶身冰凉")), true, "持瓶时摸瓶描写不去重");
game = fixture({ inner_world_entered: true, ev523_seen: true }, [], "carriage_inner_01");
await game.play("E_502_RETURN");
assert.equal(game.state.sceneId, "carriage_02", "已看过磨损门仍从该门离开里世界");
assert.equal(game.trace.some(t => t.text?.includes("高度磨损的车门")), false, "磨损门描写只播一次");

for (const met of [false, true]) {
  game = fixture({ crew_met: met }, [], "carriage_inner_02");
  await game.play("E_505");
  assert.equal(game.trace.some(t => t.scare), !met);
  assert.equal(game.trace.filter(t => t.event === "E_506").every(t => t.scene === "carriage_fake_04"), true);
}

// 回程×瓶子×钥匙：含回程重新深入、拾取后停留、出口不强迫检定。
// 返程链路＝伪4号左门（花海调头后，或窗边谈话结束后）→ 花草车厢 → 空车厢 → 磨损门 → 真实2号车厢。
for (const fromSea of [false, true]) for (const bottle of [false, true]) for (const given of [false, true]) {
  game = fixture({ ev503_bottle_taken: bottle, ev519_key_given: given, ev519_key_ever_given: given, crew_met: true },
    [...(bottle ? ["bottle"] : []), ...(!given ? ["crew_keys"] : [])], fromSea ? "flower_sea" : "carriage_fake_04");
  await game.play(fromSea ? "E_513" : "E_516");
  if (fromSea) {
    assert.equal(game.state.sceneId, "carriage_fake_04");
    assert.equal(game.trace.find(t => t.text?.includes("编号写着")).scene, "carriage_fake_04");
  } else {
    assert.equal(game.state.sceneId, "carriage_fake_04", "窗边谈话后不再弹选择框，仍停在伪4号等玩家点门");
    assert.equal(game.trace.some(t => t.text?.includes("你穿过来路的车门")), false);
  }
  await game.play("E_522");
  assert.equal(game.state.sceneId, "carriage_inner_02");
  assert.equal(game.state.inventory.includes("bottle"), bottle);
  assert.equal(game.trace.some(t => t.text?.includes("瓶身冰凉")), bottle);
  await game.play("E_505"); await game.play("E_522");
  assert.equal(game.state.sceneId, "carriage_inner_02");
  if (!bottle) {
    game.trace.length = 0; await game.play("E_503_PICK");
    assert.equal(game.state.inventory.includes("bottle"), true);
    assert.equal(game.trace.some(t => t.event === "E_503"), false);
  }
  await game.play("E_503_BACK");
  assert.equal(game.state.sceneId, "carriage_inner_01", "花草左门先回空车厢");
  await game.play("E_502_RETURN");
  assert.equal(game.state.sceneId, "carriage_02", "空车厢左门经磨损门进真实2号");
  assert.equal(game.trace.some(t => t.text?.includes("高度磨损的车门")), true);
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
  assert.equal(game.state.sceneId, "carriage_fake_04", "窗边谈话链不自动切景，也不自动离开");
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

for (const [id, flags, reason] of [["E_511", {}, "lost"]]) {
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
// 回程旗标与两个只做单跳/随机的派生路由事件已删除，里世界事件不得再引用。
const innerEvents = events.filter(e => /^E_5/.test(e.id));
assert.equal(innerEvents.some(e => JSON.stringify(e).includes("ev_inner_backtrack")), false);
assert.equal(innerEvents.some(e => e.id === "E_509_BACK" || e.id === "E_503_RETURN_FORWARD"), false);
assert.equal(events.some(e => e.actions.some(a => a.next === "E_509_BACK" || a.next === "E_503_RETURN_FORWARD")), false);
const fake = scenes.find(s => s.id === "carriage_fake_04");
assert.match(fake.background, /fog/);
assert.equal(fake.backgroundVariants[0].visibleWhen.flag, "ev517_flower_revealed");
// 6号被啃食：入口置位的标签驱动背景变体，且优先于便签消失版。
const carriage06 = scenes.find(s => s.id === "carriage_06");
assert.match(carriage06.backgroundVariants[0].image, /carriage-06-eaten\.png/);
assert.deepEqual(carriage06.backgroundVariants[0].visibleWhen, { flag: "carriage_06_eaten", equals: true });
assert.ok((await stat(new URL("../assets/carriage-06-eaten.png", import.meta.url))).size > 0);
const e028 = events.find(e => e.id === "E_028");
assert.deepEqual(
  e028.actions[0],
  {
    type: "conditionalJump",
    when: { hasItem: "bottle" },
    next: "E_028_HAS_BOTTLE"
  },
  "已有瓶子时应直接进入通过方式选择"
);
assert.equal(e028.actions.some(a => a.type === "addItem" && a.item === "bottle"), true);
assert.equal(e028.actions.some(a => a.type === "learnSkill" && a.skill === "throwing"), true);
assert.equal(e028.actions.some(a => a.type === "minigame"), false, "E-028 只负责瓶子与投掷，不得进入小游戏");
assert.equal(events.find(e => e.id === "E_028_THROW_FIRST").actions.some(a => a.type === "removeItem" && a.item === "bottle"), true);
game = fixture({}, [], "carriage_02");
game.ui.choice.choose = async () => null;
await game.play("E_028");
assert.equal(game.state.inventory.includes("bottle"), true, "E-028 应在进入选择前自动捡起瓶子");
assert.equal(game.state.getSkill("throwing"), true, "E-028 拾瓶后应解锁投掷");
assert.equal(game.trace.some(t => t.text?.includes("脚边摸到一个空瓶子")), true);

game = fixture({}, ["bottle"], "carriage_02");
game.ui.choice.choose = async () => null;
await game.play("E_028");
assert.equal(game.state.inventory.filter(item => item === "bottle").length, 1, "已有瓶子时不应重复入包");
assert.equal(game.state.getSkill("throwing"), true, "已有瓶子时仍应解锁投掷");
assert.equal(game.trace.some(t => t.text?.includes("脚边摸到一个空瓶子")), false);
const carriage02 = scenes.find(s => s.id === "carriage_02");
assert.equal(carriage02.objects.some(o => o.id === "bottle_02"), false);
assert.equal(
  carriage02.objects.find(o => o.id === "clicker_02").clickEvent,
  "E_026",
  "点击2号车厢的Clicker应进入怪物遭遇"
);
// 3号通往2号的门重新接入里世界入口：未到过伪4时进门走里世界，到过之后由 E_501 的守卫落到主线。
const carriage03 = scenes.find(s => s.id === "carriage_03");
assert.equal(carriage03.objects.find(o => o.id === "door_03_to_02").clickEvent, "E_501");
assert.equal(events.find(e => e.id === "E_501").actions
  .some(a => a.type === "conditionalJump" && a.next === "E_DOOR_03" && a.when?.flag === "inner_world_entered"), true);
const e022Item = events.find(e => e.id === "E_022_ITEM");
assert.equal(e022Item.next, undefined, "E_022_ITEM 结束后应停在3号车厢，等待玩家点门");
assert.equal(events.find(e => e.id === "E_023_LOOP").next, "E_501", "E_023 末段应进入里世界");
const e029 = events.find(e => e.id === "E_029");
assert.equal(e029.actions.some(a => a.next === "E_515" || a.when?.flag === "ev510_flower_sea"), false);
assert.equal(e029.actions.some(a => a.type === "check" && a.dice === "ev029_agility_01"), true);
assert.equal(events.find(e => e.id === "E_033").actions.some(a => a.game === "conductor_tug"), true);
const cardBattleSource = await read("src/minigame-games/card-battle.js");
assert.match(cardBattleSource, /won \? \[[\s\S]*?jump", next: "E_031"[\s\S]*?jump", next: "E_030"/);
const conductorTugSource = await read("src/minigame-games/conductor-tug.js");
assert.match(conductorTugSource, /won \? "E_034" : "E_035"/);
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
