// 主线接线与逐句切景回归。
// 与 test-inner-world.mjs 同一约定：每句目的地描写必须已经处于对应背景，
// 推门/出发文字仍属于出发场景；进入新场景的路线必须先 changeScene 再播到达描写。
//
// 覆盖范围（5号车厢 → 4号 → 3号 → 2号 → 先头车厢）：
// - 5号右门只过门（切景 + 过门句，不触发医学检定）；剧情路线统一经 E_013_ENTRY 进4号。
// - 进4号车厢的首次发现描写每次存档只发生一次；点击乘务员后先询问是否使用急救。
// - 4号→3号折返有折返描写；3号→2号不再由剧情自动进车，玩家点门（door_03_to_02 → E_501）才进入。
// - 里世界返程 E_524 回到真2号后接 E_025 喘息段，播完停下，不自动进入 Clicker 遭遇。
// - 2号车厢 Clicker 指向怪物遭遇；先头车厢控制杆指向操作面板；潜行通过也置 carriage_02_passed。
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [events, scenes, items, attributes, skills, meta] = await Promise.all(
  ["events", "scenes", "items", "attributes", "skills", "meta"].map(async (name) => JSON.parse(await read(`data/${name}.json`)))
);
const [mainSource, bgmSource, homeOpSource] = await Promise.all([
  read("src/main.js"),
  read("src/bgm.js"),
  read("src/home-op.js")
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
    closeDialog() {}, cancelPending() {}, setPaused() {}, toast(message) { trace.push({ error: message }); }
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
assert.equal(objectOf("carriage_04", "crew_04").clickEvent, "E_013", "乘务员热点应先进入急救询问");

// 剧情路线的 next 统一指向 E_013_ENTRY，首次到达只播发现描写，不自动检定。
for (const id of ["E_010_F", "E_010_JOIN", "E_011_S", "E_011_F", "E_012_AFTER"]) {
  assert.equal(eventById.get(id).next, "E_013_ENTRY", `${id} 必须经 E_013_ENTRY 进入4号车厢`);
}
const entryActions = actionsOf("E_013_ENTRY");
assert.deepEqual(entryActions[0], { type: "changeScene", scene: "carriage_04" });
assert.equal(entryActions.filter((action) => action.type === "dialogue").length, 1);
assert.equal(eventById.get("E_013_ENTRY").next, undefined);
assert.deepEqual(entryActions[1].when.any, [
  { flag: "crew_04_entry_seen", equals: true },
  { flag: "crew_04_entry_medical_done", equals: true }
]);
assert.equal(entryActions[1].next, "E_013_REVISIT");
assert.equal(entryActions.some((action) => action.type === "setFlag" && action.key === "crew_04_entry_seen"), true);
assert.equal(entryActions.some((action) => action.type === "check"), false, "到达演出不得自动触发急救");
// 到达描写不能留在出发场景。
assert.equal(actionsOf("E_012_AFTER").some((action) => action.type === "dialogue" && action.text.includes("4号车厢")), false);

// 点击乘务员先询问是否使用急救；暂不使用不消耗热点，使用后最多检定两次。
assert.deepEqual(actionsOf("E_013_REVISIT"), [], "重复到达应是静默落点");
const firstAidActions = actionsOf("E_013");
assert.equal(firstAidActions[0].type, "conditionalJump", "已完成急救后再次点击应直接离开");
assert.deepEqual(firstAidActions[0].when, { flag: "crew_04_interacted", equals: true });
assert.equal(firstAidActions[0].next, "E_013_CANCEL");
const firstAidPrompt = firstAidActions[1];
assert.equal(firstAidPrompt.type, "choice");
assert.equal(firstAidPrompt.prompt, "是否使用急救？");
assert.deepEqual(firstAidPrompt.options.map((option) => option.label), ["使用急救", "暂不使用"]);
assert.equal(firstAidPrompt.options[0].next, "E_013_USE");
assert.equal(firstAidPrompt.options[1].next, "E_013_CANCEL");
assert.deepEqual(actionsOf("E_013_CANCEL"), [], "暂不使用应直接留在4号车厢");
const firstAidUseActions = actionsOf("E_013_USE");
assert.deepEqual(firstAidUseActions[0], {
  type: "conditionalJump",
  when: { flag: "crew_04_medical_attempted", equals: true },
  next: "E_013_USE_SECOND"
});
assert.equal(firstAidUseActions.some((action) => action.type === "setFlag" && action.key === "crew_04_medical_attempted"), true);
const firstAidCheck = firstAidUseActions.find((action) => action.type === "check");
const secondFirstAidCheck = actionsOf("E_013_USE_SECOND")[0];
assert.deepEqual(firstAidCheck.outcomes, ["E_013_S", "E_013_F_RETRY"]);
assert.deepEqual(secondFirstAidCheck.outcomes, ["E_013_S", "E_013_F"]);
assert.equal(firstAidCheck.checkId, "crew_04_medical");
assert.equal(secondFirstAidCheck.checkId, firstAidCheck.checkId, "两次急救必须共享同一个检定身份");
assert.equal(actionsOf("E_013_F_RETRY").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted"), false);
assert.equal(actionsOf("E_013_F").some((action) => action.type === "setFlag" && action.key === "crew_04_medical_failed" && action.value === true), true);
assert.equal(actionsOf("E_013_S").some((action) => action.type === "setFlag" && action.key === "crew_04_medical_success" && action.value === true), true);
assert.equal(actionsOf("E_013_S").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted" && action.value === true), true);
assert.equal(actionsOf("E_013_F").some((action) => action.type === "setFlag" && action.key === "crew_04_interacted" && action.value === true), true);

// 4号→3号折返有折返描写。
const door04 = actionsOf("E_DOOR_04");
assert.deepEqual(door04[0], { type: "sound", sound: "door_open" });
assert.deepEqual(door04[1], { type: "changeScene", scene: "carriage_03" });
assert.equal(door04[door04.length - 1].type, "dialogue");
assert.match(door04[door04.length - 1].text, /返回3号车厢/);

// 3号→2号不再由剧情自动进车：E_022_ITEM 拿完手电即停，E_023 末段直接接里世界入口；
// 进车只能由玩家点 door_03_to_02（E_501）。E_024 光源侦查已不在主线上（见 docs/main-route-wiring.md）。
assert.equal(eventById.get("E_022_ITEM").next, undefined);
assert.equal(eventById.get("E_023_LOOP").next, "E_501");

for (const [id, sceneId] of [["E_505", "carriage_fake_04"], ["E_510", "flower_sea"], ["E_513", "carriage_fake_04"]]) {
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
assert.match(mainSource, /id: "fake",[\s\S]*sceneId === "carriage_fake_04"[\s\S]*sceneId === "flower_sea"[\s\S]*playInInnerWorld: true/);
assert.match(bgmSource, /pageFile === "ending\.html"[\s\S]*assets\/audio\/op\.mp3/);
assert.match(homeOpSource, /AUDIO_SILENCE_MS = 250/);
assert.match(homeOpSource, /AUDIO_FADE_IN_MS = 2000/);

// 里世界返程：E_524 回到真2号后接 E_025 喘息段，播完停下（不自动进 Clicker 遭遇）。
assert.equal(eventById.get("E_524_DONE").next, "E_025");
assert.equal(eventById.get("E_524_CREW").next, "E_025");
assert.equal(eventById.get("E_025").next, undefined);
assert.equal(eventById.get("E_025_CARRIED").next, undefined);

// 收音机成功音与头车结局入口。结局 A 的完整演出由 main.js 在终止路径播放，
// E_034 只负责写入 true_end，避免旧版简化对白与正式过场重复。
assert.deepEqual(actionsOf("E_0008_S")[0], { type: "sound", sound: "loud_noise" });
assert.deepEqual(actionsOf("E_034"), [
  { type: "custom", name: "endGame", params: { reason: "true_end" } }
]);
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
assert.deepEqual(actionsOf("E_028_THROW_FIRST")[0], { type: "sound", sound: "breaking_glass" });
assert.deepEqual(actionsOf("E_028_THROW_AFTER_SUCCESS")[0], { type: "sound", sound: "breaking_glass" });
for (const id of [
  "E_010_F",
  "E_018_SEARCH_PHONE",
  "E_021_CARRIED",
  "E_021_ALONE",
  "E_022_ALONE",
  "E_022_ITEM",
  "E_05_SEARCH_TOOLS"
]) {
  assert.equal(
    actionsOf(id).some((action) => action.type === "sound" && action.sound === "finding_in_papers"),
    true,
    `${id} 翻找时应播放搜索音`
  );
}

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

// 剧情路线（侦查失败/读报后向前跑）进4号：先切景再播一次发现描写，不自动检定。
game = fixture({ sceneId: "carriage_05" });
await game.play("E_010_F");
assert.equal(game.state.sceneId, "carriage_04");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);
assert.deepEqual(game.diceCalls, [], "进入4号车厢不得自动触发急救");
assert.equal(game.state.flags.crew_04_entry_seen, true);
game.trace.length = 0;
await game.play("E_013_ENTRY");
assert.deepEqual(game.trace, [], "重复到达4号车厢不得重播首次发现描写");
assert.deepEqual(game.diceCalls, []);

// 点击乘务员：选择不使用急救时保留热点；失败后允许再试一次，成功或第二次失败后结束。
game = fixture({ sceneId: "carriage_04", choiceLabels: ["暂不使用"] });
await game.play("E_013");
assert.deepEqual(game.diceCalls, [], "暂不使用急救不得执行检定");
assert.equal(game.state.flags.crew_04_interacted, undefined, "暂不使用不应消耗乘务员调查");

game = fixture({ sceneId: "carriage_04", dice: { skill_medicine_confirmed: [1, 0] } });
await game.play("E_013");
assert.deepEqual(game.diceCalls, ["skill_medicine_confirmed"]);
assert.equal(game.state.flags.crew_04_medical_attempted, true);
assert.equal(game.state.flags.crew_04_interacted, undefined, "第一次急救失败后应保留乘务员热点");
assert.equal(game.state.flags.crew_04_medical_failed, true, "第一次急救失败要写入临时状态");
await game.play("E_013");
assert.equal(
  game.diceCalls.filter((id) => id === "skill_medicine_confirmed").length,
  2,
  "第一次失败后应允许第二次急救检定"
);
assert.equal(game.state.flags.crew_04_interacted, true, "第二次急救成功后应结束调查");
assert.equal(game.state.flags.crew_04_medical_success, true);
assert.equal(game.state.flags.crew_04_medical_failed, false);

game = fixture({ sceneId: "carriage_04", dice: { skill_medicine_confirmed: 0 } });
await game.play("E_013");
assert.equal(game.diceCalls.filter((id) => id === "skill_medicine_confirmed").length, 1);
await game.play("E_013");
assert.equal(
  game.diceCalls.filter((id) => id === "skill_medicine_confirmed").length,
  1,
  "第一次成功后不允许再次检定"
);
assert.equal(game.state.flags.crew_04_interacted, true);

game = fixture({ sceneId: "carriage_04", dice: { skill_medicine_confirmed: [1, 1] } });
await game.play("E_013");
await game.play("E_013");
assert.deepEqual(game.diceCalls, ["skill_medicine_confirmed", "skill_medicine_confirmed"]);
assert.equal(game.state.flags.crew_04_interacted, true, "第二次急救失败后应结束调查");
assert.equal(game.state.flags.crew_04_medical_failed, true);

// 其余剧情路线同样落到 carriage_04。
game = fixture({ sceneId: "carriage_05" });
await game.play("E_012_AFTER");
assert.equal(game.state.sceneId, "carriage_04");
assertArrival(game, "carriage_04", /一名重伤昏迷的乘务员倒在地上/);
assert.equal(game.state.flags.crew_met, true);

game = fixture({ sceneId: "carriage_05" });
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

// 里世界返程：先切到真2号再播到达描写，接着走 E_025 喘息段后停下（进车与点门接线见上方结构断言）。
game = fixture({ sceneId: "carriage_inner_01" });
await game.play("E_524");
const cut = assertCutBefore(game, "carriage_inner_01", "carriage_02");
assert.equal(game.trace[cut].text, "这一次，门后是真正的2号车厢。");
assert.equal(game.trace[cut - 1].text, "你推开门——", "推门句仍属于里世界一侧");
assert.match(game.trace[game.trace.length - 1].text, /那不是人类的喘息/);
assert.equal(game.state.sceneId, "carriage_02");
assert.equal(game.trace.some((entry) => entry.scene === "carriage_02" && entry.text === "四周毫无光源。"), true);
assert.equal(game.trace.some((entry) => entry.event === "E_026"), false, "返程不得自动进入 Clicker 遭遇");

// 2号车厢点 Clicker：直接进入怪物遭遇，不再出现3号车厢的取工具文案。
game = fixture({ sceneId: "carriage_02", choiceLabels: ["屏住呼吸，尝试潜行通过"] });
await game.play("E_026");
assert.equal(scenesOf(game)[0], "carriage_02");
assert.match(game.trace[0].text, /那个怪物/);
assert.equal(game.trace.some((entry) => entry.text.includes("回到3号车厢")), false, "Clicker 不得触发3号车厢内容");
assert.equal(game.trace.some((entry) => entry.text.includes("你取出工具")), false);
assert.equal(game.state.flags.carriage_02_passed, true, "潜行通过后要置通过状态");
assert.equal(game.trace.some((entry) => entry.scene === "front_carriage"), true, "潜行成功应到达先头车厢");

// 先头车厢点控制把手：打开操作面板，不再触发2号车厢的潜行检定。
game = fixture({ sceneId: "front_carriage", inventory: ["crew_keys"], choiceLabels: ["右杆下拉——加速，继续前进"] });
await game.play("E_032");
assert.deepEqual([...new Set(scenesOf(game))], ["front_carriage"]);
assert.match(game.trace[0].text, /操作面板/);
assert.equal(game.diceCalls.includes("ev027_stealth_luck_01"), false, "控制把手不得触发潜行检定");
assert.equal(game.state.flags.ending_reason, "true_end");

console.log("主线接线回归通过：4号车厢首次发现与急救询问、折返描写、3号→2号点门驱动、Clicker 与控制杆接线。");
