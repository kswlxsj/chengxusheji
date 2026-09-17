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
const crewKeys = ["driver_cab_key", "control_panel_key"];

function fixture(flags = {}, inventory = [], sceneId = "carriage_03") {
  const state = new Game.GameState({
    ...meta.initialState,
    flags: { carriage_03_bag_resolved: true, ...flags },
    inventory,
    sceneId
  }, attributes, skills);
  const trace = [];
  const sounds = [];
  const ui = {
    dialog: { setFast() {}, async showLine(a) { trace.push({ event: state.currentEventId, scene: state.sceneId, text: a.text, portrait: a.portrait, inventory: [...state.inventory], blackout: state.flags.carriage_03_blackout === true }); } },
    choice: { async choose(prompt, options) { return options.find(o => ["留着", "调头"].includes(o.label)) || options[0]; } },
    audio: { play(sound) { sounds.push(sound); return { finished: Promise.resolve(), stop() {} }; } },
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
  return { state, engine, scene, ui, trace, sounds, async play(id) {
    const result = await engine.play(id);
    assert.equal(trace.some(t => t.error), false, JSON.stringify(trace));
    return result;
  } };
}

// 每句目的地描写必须已处于对应背景；推门文字仍属于出发场景。
// 门禁在到过伪4后才上锁；6号被啃食标签已提前在5号车厢的残缺揭示中置位，
// 进入里世界本身不得改写该标签。
let game = fixture();
await game.play("E_023");
assert.equal(game.state.sceneId, "carriage_inner_01", "3号车门应先播放 E_023 再进入里世界");
// 「灯灭了」在最后一句之前生效：黑场句在黑场中显示，且离开3号时清除黑场旗标。
assert.equal(
  game.trace.find(t => t.text === "灯灭了。")?.blackout,
  false,
  "「灯灭了。」这句仍在亮灯状态下显示"
);
assert.equal(
  game.trace.find(t => t.text === "黑暗中，你摸到了通往2号车厢的门。")?.blackout,
  true,
  "摸门那句应在3号车厢黑场中显示"
);
assert.equal(game.state.flags.carriage_03_blackout, false, "离开3号后应清除黑场旗标");
game.state.sceneId = "carriage_03";
game.trace.length = 0;
await game.play("E_023");
assert.equal(game.state.sceneId, "carriage_inner_01", "未到伪4时仍可再次进入里世界");
assert.equal(
  game.trace.some(t => t.text?.includes("请不要下车") || t.text?.includes("门消失了")),
  false,
  "早退回3号后也不得重播认知崩塌"
);

// 已到过伪4（inner_world_entered）后推门不再播放认知崩塌，直接走主线进2号。
const revisit = fixture({ inner_world_entered: true });
await revisit.play("E_023");
assert.equal(revisit.state.sceneId, "carriage_02", "回访推门应直接进入2号车厢");
assert.equal(
  revisit.trace.some(t => t.text?.includes("请不要下车") || t.text?.includes("门消失了")),
  false,
  "回访不得重播认知崩塌"
);

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
assert.equal(game.state.flags.carriage_06_eaten, undefined, "进入里世界不应设置6号车厢被啃食状态");
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

// 现实乘务员进入里世界时临时消失；早退与最终出口都会恢复，只有最终出口经过专用 SAN 检定。
game = fixture({ carried_crew: true });
await game.play("E_501");
assert.equal(game.state.flags.carried_crew, false);
assert.equal(game.state.flags.crew_waiting_outside_inner_world, true);
assert.equal(game.trace.some(t => t.text === "你突然发现身边的乘务员不见了。"), true);
game.trace.length = 0;
await game.play("E_502_CARRIAGE03");
assert.equal(game.state.flags.carried_crew, true);
assert.equal(game.state.flags.crew_waiting_outside_inner_world, false);
assert.equal(game.trace.some(t => t.text === "你身旁的乘务员似乎并不知道这一切。"), true);
game.trace.length = 0;
await game.play("E_501");
assert.equal(game.state.flags.carried_crew, false, "重新进入里世界时现实乘务员应再次消失");
assert.equal(game.state.flags.crew_waiting_outside_inner_world, true);

game = fixture({ crew_waiting_outside_inner_world: true }, [], "carriage_02");
await game.play("E_524_DONE");
assert.equal(game.state.flags.carried_crew, true);
assert.equal(game.state.flags.crew_waiting_outside_inner_world, false);
assert.equal(game.trace.some(t => t.text === "你身旁的乘务员似乎并不知道这一切。"), true);

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
  assert.equal(game.state.flags.carriage_06_eaten, true, "返回分支不得改写首次进入5号时置位的啃食标签");
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

// 同一段描写只播一次：空车厢入口/车厢描写、花草车厢初见/返程描写、伪4进场（花草右门 E_506／花海调头 E_513）、
// 磨损门与瓶堆首次发现各播一次；返程摸瓶属于短反馈，允许重复。
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
assert.equal(game.trace.some(t => t.text?.includes("角落里散落着几支彩色的空玻璃瓶")), false, "未拾瓶时也不重播首次瓶堆描写");
assert.equal(game.trace.some(t => t.text?.includes("先前拿走的那一支还在身上")), false, "未拾瓶时回访不得声称已经拿走瓶子");
assert.equal(game.trace.some(t => t.text?.includes("玻璃瓶仍挤在角落里。")), true, "未拾瓶时回访应保留瓶子仍在场景中的状态");
assert.equal(game.trace.some(t => t.text?.includes("你没有碰它们。")), true, "未拾瓶时回访应明确没有碰瓶子");
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

// 伪4进场描写只播一次：重复进入落到静默落点，不重播描写或死亡线惊吓。
game = fixture({ crew_met: true, crew_04_dead: true }, [], "carriage_inner_02");
await game.play("E_505");
assert.equal(game.state.flags.ev506_intro_seen, true);
assert.equal(game.trace.some(t => t.text?.includes("门上的编号写着")), true);
game.trace.length = 0;
await game.play("E_505");
assert.equal(game.state.sceneId, "carriage_fake_04", "二次进入仍落在伪4号场景");
assert.equal(game.trace.some(t => t.text?.includes("门上的编号写着")), false, "伪4进场描写只播一次");
assert.equal(game.trace.some(t => t.scare), false, "二次进入不重播「停下来」惊吓");
game = fixture({}, [], "flower_sea");
await game.play("E_513");
assert.equal(game.state.sceneId, "carriage_fake_03");
assert.equal(game.trace.some(t => t.text?.startsWith("你退出花海，沿来路折返")), true, "调头动作句仍保留");
assert.equal(game.trace.some(t => t.event === "E_FAKE03_INTRO" && t.text?.includes("头颅已然掉在地上")), true);
assert.equal(game.trace.filter(t => t.event === "E_FAKE03_INTRO").every(t => t.scene === "carriage_fake_03"), true);

// 「停下来」惊吓的触发条件是乘务员死亡线（E_507），不是「是否交互过」：
// crew_met 在通往4号车厢的必经路径上必然置位，读它会让 E_507 永远不可达。
for (const dead of [false, true]) {
  game = fixture({ crew_met: true, crew_04_dead: dead }, [], "carriage_inner_02");
  await game.play("E_505");
  assert.equal(game.trace.some(t => t.scare), dead, "只有乘务员死亡线才播「停下来」惊吓");
  assert.equal(game.trace.some(t => t.event === "E_508"), !dead, "在世线走 E_508");
  assert.equal(game.trace.filter(t => t.event === "E_506").every(t => t.scene === "carriage_fake_04"), true);
}

// 花草车厢窗外只做一次灵感检定，之后固定结果并返回短反馈。
for (const outcome of [0, 1]) {
  game = fixture({ scoutingResult: outcome }, [], "carriage_inner_02");
  await game.play("E_504");
  assert.equal(game.state.flags.ev504_scouting_done, true);
  assert.equal(game.state.flags.ev504_scouting_ok, outcome === 0);
  const checkKey = "event:E_504:ev504_insight_01";
  assert.equal(game.state.checkAttempts[checkKey].attempts, 1);
  game.trace.length = 0;
  await game.play("E_504");
  assert.equal(game.state.checkAttempts[checkKey].attempts, 1, "重复调查不得重掷侦察");
  assert.equal(game.trace.some(t => t.text === "你看向窗外。"), false);
  assert.equal(game.trace.length, 1, "重复调查只保留一条短反馈");
}

// 回程×瓶子×钥匙：含回程重新深入、拾取后停留、出口不强迫检定。
// 返程链路＝伪4号左门（花海调头后，或窗边谈话结束后）→ 花草车厢 → 空车厢 → 磨损门 → 真实2号车厢
// → E_025 喘息段；主页面在进入并照明后自动触发 Clicker（E_524 的喘息描写已并入 E_025）。
for (const bottle of [false, true]) for (const given of [true]) {
  game = fixture({ ev503_bottle_taken: bottle, ev519_key_given: given, ev519_key_ever_given: given, crew_met: true },
    [...(bottle ? ["bottle"] : []), ...(!given ? crewKeys : [])], "carriage_fake_04");
  await game.play("E_516");
  assert.equal(game.state.sceneId, "carriage_fake_04", "交出钥匙后仍停在伪4号等玩家点门");
  assert.equal(game.trace.some(t => t.text?.includes("你穿过来路的车门")), false);
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
  assert.equal(crewKeys.every((itemId) => game.state.inventory.filter((id) => id === itemId).length === 1), true);
  assert.equal(game.trace.some(t => t.text?.includes("钥匙不知何时")), given);
  assert.equal(game.trace.some(t => t.event?.startsWith("E_025")), true, "返程回到真2号后接 E_025 喘息段");
  assert.equal(game.trace.some(t => t.scene === "carriage_02" && t.text === "四周毫无光源。"), true);
  assert.equal(game.trace.some(t => t.text?.includes("你听见明显的喘息声")), false, "E_524 的喘息描写已并入 E_025");
  assert.equal(game.trace.filter(t => t.text?.includes("那不是人类的喘息")).length, 1, "喘息描写只播一次");
  assert.equal(game.trace.some(t => t.event === "E_026"), false, "纯事件夹具不应代替主页面自动触发 Clicker");
  const snapshot = game.state.snapshot(); game.state.restore(snapshot);
  assert.equal(game.state.flags.ev519_key_ever_given, given);
}

// 拒绝交钥匙：中央 CG 后进入5秒选择；测试桩立即选首项（往左），落到假2号并完成四次拍击。
const handprintActions = events
  .flatMap(event => event.actions || [])
  .filter(action => action.type === "custom" && action.name === "fakeCarriageHandprints");
assert.equal(handprintActions.length, 2);
assert.equal(handprintActions.every(action => action.params.interval === 1200), true, "血手印拍击间隔为1.2秒");
game = fixture({}, crewKeys, "carriage_fake_04");
await game.play("E_519_KEEP");
assert.equal(game.state.sceneId, "carriage_fake_02");
assert.equal(game.state.flags.ev519_escape_left, true);
assert.equal(game.state.flags.ev_fake02_handprints_done, true);
assert.equal([1, 2, 3, 4].every(index => game.state.flags[`ev_fake02_blood_${index}`] === true), true);
assert.equal(game.sounds.filter(sound => sound === "knocking_wall").length, 4, "每个血手印各响一次");
assert.equal(game.trace.some(entry => entry.text === "这就是你的选择吗，亲爱的？"), true);

// 假车厢拓扑：假2左→假1→黑场切真3；假2右→假3，假3左→假2、右→既有花海事件。
await game.play("E_FAKE02_LEFT");
assert.equal(game.state.sceneId, "carriage_fake_01");
assert.equal(game.trace.some(entry => entry.text?.includes("五脏六腑")), true);
await game.play("E_FAKE01_EXIT");
assert.equal(game.state.sceneId, "carriage_03");
assert.equal(game.state.flags.ev_fake01_crew_seen, true);
assert.equal(game.sounds.includes("tinnitus_fake01"), true);
game = fixture({ ev_fake02_handprints_done: true }, [], "carriage_fake_02");
await game.play("E_FAKE02_RIGHT");
assert.equal(game.state.sceneId, "carriage_fake_03");
assert.deepEqual(
  game.trace.filter(entry => entry.event === "E_FAKE03_INTRO").map(entry => entry.text),
  [
    "你匆忙踏进眼前这节陌生车厢。",
    "车厢的颜色发生了不可名状的变化。",
    "乘务员呢？",
    "你定睛一看，乘务员的头颅已然掉在地上，鲜血流成了湖泊。",
    "你不敢再仔细观察。"
  ]
);
assert.equal(
  game.trace.filter(entry => entry.event === "E_FAKE03_INTRO").every(entry => entry.scene === "carriage_fake_03"),
  true,
  "假3号入场对白必须在切换背景后播放"
);
await game.play("E_FAKE03_LEFT");
assert.equal(game.state.sceneId, "carriage_fake_02");
game = fixture({}, [], "carriage_fake_03");
await game.play("E_510");
assert.equal(game.trace.some(entry => entry.scene === "flower_sea"), true);

// 窗边插话三档：死亡线（E_516_DEAD）／在世线（E_516_MET）／未交互兜底（正常不可达）。
for (const [flags, expected] of [
  [{ crew_met: true, crew_04_dead: true }, "她不是已经死了吗"],
  [{ crew_met: true }, "平静得好像她本来就属于这里"],
  [{}, "一个陌生的声音"]
]) for (const scouting of [false, true]) {
  game = fixture({ ...flags, ev504_scouting_ok: scouting }, [], "carriage_fake_04");
  await game.play("E_516");
  assert.equal(game.trace.some(t => t.text?.includes(expected)), true, `窗边插话应播：${expected}`);
  assert.equal(game.trace.some(t => t.text?.startsWith("一个陌生的声音")), expected === "一个陌生的声音");
  assert.equal(Boolean(game.state.flags.ev517_flower_revealed), scouting);
  assert.equal(Boolean(game.state.flags.ev510_flower_sea), false, "窗边看花海不产生污染");
  assert.equal(game.state.sceneId, "carriage_fake_04", "窗边谈话链不自动切景，也不自动离开");
  if (scouting) {
    game.trace.length = 0; await game.play("E_505"); await game.play("E_516");
    assert.equal(game.trace.some(t => t.text === "窗外的雾气散开了。"), false);
  }
}
game = fixture({}, crewKeys, "carriage_fake_04");
game.ui.choice.choose = async () => null;
await game.play("E_519_GIVE");
assert.equal(crewKeys.some((itemId) => game.state.inventory.includes(itemId)), false);
assert.equal(game.state.flags.ev519_key_ever_given, true);
await game.play("E_519_GIVE");
assert.equal(game.trace.filter(t => t.text?.startsWith("你把钥匙递出去")).length, 1);
game.state.removeItem("missing"); assert.equal(game.state.inventory.length, 0);
await game.play("E_524"); await game.play("E_524");
assert.equal(crewKeys.every((itemId) => game.state.inventory.filter((id) => id === itemId).length === 1), true);

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
await game.engine.cancelToCheckpoint(); ready(); await running; await flush();
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
// 6号被啃食：5号残缺揭示置位的标签驱动背景变体，且优先于便签消失版。
const carriage06 = scenes.find(s => s.id === "carriage_06");
assert.match(carriage06.backgroundVariants[0].image, /carriage-06-eaten\.webp/);
assert.deepEqual(carriage06.backgroundVariants[0].visibleWhen, { flag: "carriage_06_eaten", equals: true });
assert.ok((await stat(new URL("../assets/Image/Scene/Background/carriage-06-eaten.webp", import.meta.url))).size > 0);
// 瓶子只能从里世界获取：Clicker 菜单只提供潜行/对抗，背包投瓶是带失败风险的隐藏捷径。
for (const removed of [
  "E_028", "E_028_BOTTLE_READY", "E_028_CONSTITUTION_CHECK", "E_028_CONSTITUTION_SUCCESS",
  "E_028_CONSTITUTION_FAIL", "E_028_THROW_AFTER_FAIL", "E_028_THROW_AFTER_SUCCESS", "E_028_HAS_BOTTLE"
]) {
  assert.equal(events.some(e => e.id === removed), false, `${removed} 已删除，不得残留`);
}
assert.equal(events.find(e => e.id === "E_028_THROW_FIRST").actions.some(a => a.type === "removeItem" && a.item === "bottle"), true);
assert.deepEqual(
  events.find(e => e.id === "E_028_THROW_FIRST").actions.find(a => a.type === "check")?.outcomes,
  ["E_028_THROW_SUCCESS", "E_028_THROW_FAIL"]
);
for (const eventId of ["E_026_ACTION"]) {
  const choice = events.find(e => e.id === eventId).actions.find(a => a.type === "choice");
  assert.deepEqual(choice.options.map(o => o.label), ["安静潜行", "正面对抗"], `${eventId} 只应提供两个处理选项`);
  assert.deepEqual(choice.options.map(o => o.next), ["E_027", "E_029"], `${eventId} 的两个选项应分别接潜行和对抗`);
}
for (const eventId of ["E_026", "E_026_KNOWLEDGE", "E_026_REVISIT"]) {
  assert.equal(events.find(e => e.id === eventId).actions.some(a => a.type === "choice"), false, `${eventId} 只应播放发现对白`);
}
const stealthFailure = events.find(e => e.id === "E_027_F");
assert.equal(stealthFailure.actions.some(a => a.type === "choice"), false, "潜行失败后不应再弹第二层选择");
assert.equal(stealthFailure.next, "E_029_CARD_HARD", "潜行失败应进入困难卡牌模式");
const carriage02 = scenes.find(s => s.id === "carriage_02");
assert.equal(carriage02.objects.some(o => o.id === "bottle_02"), false);
assert.equal(
  carriage02.objects.find(o => o.id === "clicker_02").clickEvent,
  "E_026_ACTION",
  "点击2号车厢的Clicker应进入通过方式选择"
);
// 3号通往2号的门先播门前认知崩塌 E_023（只在未到过伪4时播一次），再由 E_501 决定进里世界或走主线。
const carriage03 = scenes.find(s => s.id === "carriage_03");
assert.equal(
  carriage03.objects.find(o => o.id === "door_03_to_02").clickEvent,
  "E_023",
  "3号通往2号的门应先播门前认知崩塌"
);
assert.equal(events.find(e => e.id === "E_501").actions
  .some(a => a.type === "conditionalJump" && a.next === "E_DOOR_03" && a.when?.flag === "inner_world_entered"), true);
const e022Item = events.find(e => e.id === "E_022_ITEM");
assert.equal(e022Item.next, undefined, "E_022_ITEM 结束后应停在3号车厢，等待玩家点门");
assert.equal(events.find(e => e.id === "E_023_LOOP").next, "E_501", "E_023 末段应进入里世界");
// 「认知崩塌只在首次播放」使用独立进度旗标，早退回3号也不会重播。
const e023 = events.find(e => e.id === "E_023");
assert.deepEqual(
  e023.actions[1],
  {
    type: "conditionalJump",
    when: {
      any: [
        { flag: "ev023_intro_seen", equals: true },
        { flag: "inner_world_entered", equals: true }
      ]
    },
    next: "E_501"
  },
  "E_023 应使用独立旗标跳过已读认知崩塌，并兼容已进入里世界的旧存档"
);
// 3号黑场：最后一句之前置位并刷新场景，离开3号（E_501）时清除。
const loopActions = events.find(e => e.id === "E_023_LOOP").actions;
const blackoutAt = loopActions.findIndex(a => a.type === "setFlag" && a.key === "carriage_03_blackout" && a.value === true);
assert.ok(blackoutAt > 0, "E_023_LOOP 应在「灯灭了」之后置位黑场旗标");
assert.equal(loopActions[blackoutAt - 1].text, "灯灭了。");
assert.deepEqual(loopActions[blackoutAt + 1], { type: "custom", name: "refreshScene" }, "置位后必须刷新场景才能立刻变暗");
assert.equal(loopActions[blackoutAt + 2].text, "黑暗中，你摸到了通往2号车厢的门。");
assert.deepEqual(
  events.find(e => e.id === "E_501").actions[0],
  { type: "setFlag", key: "carriage_03_blackout", value: false },
  "E_501 应最先清除3号黑场旗标"
);
// A1（旧2号车厢穿越线）与 A3（光源侦查旧线）已删除，不得留下死事件或死检定。
for (const removed of [
  "E_02_DECIDE", "E_022_S", "E_022_F", "E_023_CHOICE", "E_023_CONSTITUTION_CHECK",
  "E_023_CONSTITUTION_SUCCESS", "E_023_CARD_BATTLE_EASY", "E_023_CARD_BATTLE_HARD",
  "E_023_THROW_FIRST", "E_023_THROW_AFTER_CONSTITUTION_FAIL",
  "E_023_THROW_AFTER_CONSTITUTION_FAIL_SUCCESS", "E_023_THROW_AFTER_CONSTITUTION_FAIL_FAIL",
  "E_024", "E_024_S", "E_024_S_KNOWLEDGE", "E_024_S_CONTINUE", "E_024_F"
]) {
  assert.equal(events.some(e => e.id === removed), false, `${removed} 已删除，不得残留`);
}
// 常规返程不做 SAN 检定，E_524 回到真2号后由 E_025 提供喘息段，播完停下等玩家点 Clicker。
assert.equal(events.find(e => e.id === "E_524_DONE").next, "E_025");
assert.equal(events.find(e => e.id === "E_524_CREW").next, "E_025");
assert.equal(events.some(e => e.id === "E_524_SAN_CHECK"), false);
const fake01Exit = events.find(e => e.id === "E_FAKE01_EXIT");
const screamLineIndex = fake01Exit.actions.findIndex(action => action.text === "你失去了呼喊的力气。");
assert.deepEqual(fake01Exit.actions[screamLineIndex + 1], { type: "check", dice: "ev_fake01_exit_san_01" });
assert.equal(events.find(e => e.id === "E_025").next, undefined);
assert.equal(events.find(e => e.id === "E_025_CARRIED").next, undefined);
// 里世界的乘务员分支读死亡状态：crew_met 在必经路径上恒为 true，只有 crew_04_dead 能区分剧本两条线。
const e506 = events.find(e => e.id === "E_506");
assert.equal(
  e506.actions.some((action) => action.type === "conditionalJump"
    && action.when?.flag === "crew_04_dead" && action.next === "E_507"),
  true,
  "E_506 应在乘务员死亡时走疯狂低语与「停下来」惊吓"
);
assert.equal(e506.next, "E_508", "在世线仍应落到 E_508");
const e516 = events.find(e => e.id === "E_516");
assert.equal(
  e516.actions.some((action) => action.type === "conditionalJump"
    && action.when?.flag === "crew_04_dead" && action.next === "E_516_DEAD"),
  true,
  "E_516 同样按死亡线分支"
);
assert.equal(events.find(e => e.id === "E_516_DEAD").next, "E_516_VOICE");
// 伪4进场描写只播一次：门禁在描写之前，静默落点不再接任何事件。
assert.equal(e506.actions[0].type, "conditionalJump", "E_506 应先判「伪4进场描写是否已播」");
assert.equal(e506.actions[0].when?.flag, "ev506_intro_seen");
assert.equal(e506.actions[0].next, "E_506_REVISIT");
assert.equal(events.find(e => e.id === "E_506_REVISIT").next, undefined, "静默落点不应再接事件");
const e513 = events.find(e => e.id === "E_513");
assert.equal(
  e513.actions.some((action) => action.type === "changeScene" && action.scene === "carriage_fake_03"),
  true,
  "E_513 花海调头应切到假3号"
);
assert.equal(e513.next, "E_FAKE03_INTRO");
assert.equal(events.some(e => e.id === "E_513_REVISIT"), false);
const fake01 = scenes.find(scene => scene.id === "carriage_fake_01");
assert.equal(
  fake01.backgroundVariants.some(variant => variant.image === "assets/Image/Scene/Background/carriage-fake-01-crew.webp"
    && variant.visibleWhen?.flag === "ev_fake01_crew_seen"),
  true,
  "耳鸣后应切换到带乘务员的假1号背景"
);
const e029 = events.find(e => e.id === "E_029");
assert.equal(e029.actions.some(a => a.type === "check"), false, "正面迎战不应再进行前置体质检定");
assert.equal(e029.actions.some(a => a.type === "minigame" && a.game === "card_battle"), true, "正面迎战应直接进入简单卡牌");
assert.equal(events.find(e => e.id === "E_034").actions[0].next, "E_515", "涉足花海后真结局应替换为伪结局");
assert.deepEqual(events.find(e => e.id === "E_515").actions, [
  { type: "custom", name: "endGame", params: { reason: "fake_end" } }
]);
assert.equal(events.find(e => e.id === "E_033").actions.some(a => a.game === "conductor_tug"), true);
const cardBattleSource = await read("src/minigame-games/card-battle.js");
assert.doesNotMatch(cardBattleSource, /jump", next: "E_031"/);
assert.match(cardBattleSource, /jump", next: "E_030"/);
const conductorTugSource = await read("src/minigame-games/conductor-tug.js");
assert.match(conductorTugSource, /won \? "E_034" : "E_035"/);
assert.match(conductorTugSource, /const INTRO_COUNTDOWN_SECONDS = 5/);
assert.match(conductorTugSource, /class="mg-tug-intro-rules"/);
assert.match(conductorTugSource, /phase = "countdown"/);
const minigameUiSource = await read("src/ui.js");
assert.match(minigameUiSource, /openAndStage\(title, gameId = ""\)/);
assert.match(minigameUiSource, /minigame-overlay-window/);
assert.match(await read("src/events.js"), /openAndStage\(spec\.title, action\.game\)/);
assert.match(await read("game.html"), /src\/minigame-games\/conductor-tug\.js/);
// 实际渲染后的图片也必须就绪，不能只等待预加载缓存。
game = fixture(); let decoded;
game.scene.whenReady = () => new Promise(resolve => { decoded = resolve; });
running = game.engine.play("E_502"); await flush();
assert.equal(game.trace.length, 0);
await game.engine.cancelToCheckpoint(); decoded(); await running;
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
console.log("里世界回归通过：逐句场景、随机出口、交互分支、回程接主剧本2号、道具、结局与切景取消。");
