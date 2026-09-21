function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function (Game) {
  "use strict";

  // 战斗轮卡牌小游戏：四张牌中可出一张或同时出两张。
  // 顶层只注册编号；DOM、事件监听和计时器全部延迟到 run()，以便编译器在 node:vm 中收集注册表。
  var MAX_PLAYER_HP = 10;
  var MAX_ENEMY_HP = 10;
  var MAX_ENERGY = 3;
  var ULTIMATE_COOLDOWN = 4;
  var DEFENSE_BLOCK = 2;
  var COUNTER_CHANCE = 0.25;
  var COUNTER_DAMAGE = 1;
  var ENEMY_PLAY_DISPLAY_MS = 1500;
  var cardNames = {
    attack: "攻击",
    heal: "回血",
    defend: "防御",
    ultimate: "必杀"
  };
  var cardDetails = {
    attack: "单出造成 2 点伤害",
    heal: "单出恢复 3；受到攻击时回血不生效并直接失去 3 点生命，破阵爆发改为失去 4 点；组合技中的回血只会被取消，不额外扣血",
    defend: "单出抵挡 2 点，25% 概率反弹 1 点",
    ultimate: "单出消耗 1 体力，造成 3 点伤害，冷却 4 回合"
  };
  var enemyActions = [{
    id: "attack",
    label: "攻击",
    cards: ["attack"],
    detail: "造成 2 点伤害 · 免费",
    cost: 0,
    damage: 2
  }, {
    id: "heal",
    label: "回血",
    cards: ["heal"],
    detail: "恢复 3 · 受到攻击时回血不生效并失去 3 点生命，破阵爆发改为失去 4 点 · 免费",
    cost: 0,
    recovery: 3
  }, {
    id: "defend",
    label: "防御",
    cards: ["defend"],
    detail: "抵挡 2＋25% 概率反弹 1 · 免费",
    cost: 0,
    shield: DEFENSE_BLOCK,
    counter: COUNTER_DAMAGE
  }, {
    id: "ultimate",
    label: "必杀",
    cards: ["ultimate"],
    detail: "造成 3 点伤害 · 消耗 1 体力",
    cost: 1,
    damage: 3,
    ultimate: true
  }, {
    id: "attack+heal",
    label: "攻击＋回血",
    cards: ["attack", "heal"],
    detail: "吸血斩：2 伤害＋恢复 1",
    cost: 1,
    damage: 2,
    recovery: 1,
    combo: true
  }, {
    id: "attack+defend",
    label: "攻击＋防御",
    cards: ["attack", "defend"],
    detail: "盾击：2 伤害＋2 护盾＋25% 概率反弹 1",
    cost: 1,
    damage: 2,
    shield: DEFENSE_BLOCK,
    counter: COUNTER_DAMAGE,
    combo: true
  }, {
    id: "defend+ultimate",
    label: "防御＋必杀",
    cards: ["defend", "ultimate"],
    detail: "盾击：3 伤害＋2 护盾＋25% 概率反弹 1 · 消耗 2 体力并触发必杀冷却",
    cost: 2,
    damage: 3,
    shield: DEFENSE_BLOCK,
    counter: COUNTER_DAMAGE,
    combo: true
  }, {
    id: "attack+ultimate",
    label: "攻击＋必杀",
    cards: ["attack", "ultimate"],
    detail: "破阵爆发：4 伤害 · 消耗 2 体力并触发必杀冷却",
    cost: 2,
    damage: 4,
    combo: true
  }, {
    id: "defend+heal",
    label: "防御＋回血",
    cards: ["defend", "heal"],
    detail: "稳住阵脚：恢复 2＋2 护盾＋25% 概率反弹 1",
    cost: 1,
    recovery: 2,
    shield: DEFENSE_BLOCK,
    counter: COUNTER_DAMAGE,
    combo: true
  }, {
    id: "heal+ultimate",
    label: "回血＋必杀",
    cards: ["heal", "ultimate"],
    detail: "吸血斩：3 伤害＋恢复 1 · 触发必杀冷却",
    cost: 1,
    damage: 3,
    recovery: 1,
    combo: true
  }];
  var styleText = "\n    .card-battle { position: relative; box-sizing: border-box; width: 100%; height: 100%; min-height: 0; padding: clamp(10px, 1.3vw, 16px); display: flex; flex-direction: column; gap: 6px; overflow: auto; color: #f6ead5; background-color: #17100d; background-image: linear-gradient(rgba(8, 7, 8, .56), rgba(8, 7, 8, .68)), url(\"assets/Image/Scene/Background/card-battle.ie.jpg\"); background-position: center; background-repeat: no-repeat; background-size: cover; font-family: \"Ark Pixel 12px\", \"Microsoft YaHei\", sans-serif; font-synthesis: none; }\n    .card-battle.is-responsive { padding: 10px; }\n    .card-battle::-webkit-scrollbar { width: 0; height: 0; }\n    .card-battle * { box-sizing: border-box; }\n    .card-battle button { font: inherit; }\n    .cb-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0; color: #efb45f; letter-spacing: .08em; }\n    .cb-topbar strong { font-size: clamp(17px, 2.1vw, 25px); }\n    .cb-round { color: #bba98f; font-size: 14px; }\n    .cb-rules { margin: 0; border: 1px solid rgba(239, 180, 95, .35); background: rgba(53, 37, 26, .58); }\n    .cb-rules summary { padding: 6px 10px; color: #efb45f; cursor: pointer; }\n    .cb-rule-body { padding: 0 12px 10px; color: #d5c6ae; font-size: 13px; line-height: 1.55; }\n    .cb-rule-body p { margin: 6px 0; }\n    .cb-arena { display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; gap: 10px; flex: 1 1 198px; min-height: 198px; padding: 12px; }\n    .cb-fighter { min-width: 0; min-height: 0; display: flex; flex-direction: column; padding: 10px; border: 1px solid rgba(239, 180, 95, .2); background: rgba(15, 11, 9, .48); }\n    .cb-fighter-name { display: flex; flex-direction: column; gap: 1px; margin-bottom: 4px; }\n    .cb-fighter-name small { color: #9d8e78; font-size: 11px; }\n    .cb-fighter-name strong { color: #f6ead5; font-size: 16px; }\n    .cb-hp-line { display: grid; gap: 3px; color: #efb45f; font-size: 12px; }\n    .cb-hp-track { position: relative; height: 16px; padding: 0; border: 0; overflow: visible; background: url(\"assets/Image/Ui/CardBattle/hp-bar.ie.png\") center / 100% 100% no-repeat; }\n    .cb-hp-fill { position: absolute; left: 13px; top: 5px; display: block; height: 6px; background: linear-gradient(90deg, #b6372c, #efb45f); transition: width .2s ease; }\n    .cb-resource { display: flex; align-items: center; gap: 6px; margin-top: 4px; color: #9d8e78; font-size: 11px; }\n    .cb-orbs { display: flex; gap: 3px; min-height: 17px; color: rgba(85, 208, 212, .22); font-size: 16px; }\n    .cb-orbs .full { color: #55d0d4; text-shadow: 0 0 8px rgba(85, 208, 212, .7); }\n    .cb-orbs .infinite-energy { color: #efb45f; text-shadow: 0 0 8px rgba(239, 180, 95, .75); font-weight: 700; }\n    .cb-face { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; color: #a7a4a1; line-height: 1; text-align: center; }\n    .cb-enemy-face img { width: 100%; height: 100%; max-width: 52px; max-height: 52px; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(0, 0, 0, .65)); }\n    .cb-player-face { font-size: 26px; }\n    .cb-vs { color: #efb45f; font-size: 22px; letter-spacing: .12em; }\n    .cb-intent { width: 100%; flex: 0 0 auto; margin-top: auto; padding: 5px 8px; border: 1px solid rgba(85, 208, 212, .5); color: #bceff0; background: rgba(22, 63, 66, .42); cursor: pointer; font-size: 10px; }\n    .cb-intent:disabled { cursor: not-allowed; opacity: .65; }\n    .cb-last-play { display: block; margin-top: 8px; padding: 7px 8px; border: 1px solid rgba(239, 180, 95, .3); background: rgba(53, 37, 26, .52); }\n    .cb-last-play[hidden] { display: none; }\n    .cb-last-play strong, .cb-last-play span { display: block; }\n    .cb-last-kicker { color: #9d8e78; font-size: 10px; }\n    .cb-last-detail { margin-top: 2px; color: #bba98f; }\n    .cb-readout { display: flex; align-items: flex-start; gap: 12px; min-height: 40px; margin: 0; padding: 7px 10px; border: 1px solid rgba(239, 180, 95, .28); background: rgba(53, 37, 26, .45); }\n    .cb-energy-label { display: block; margin-bottom: 2px; color: #9d8e78; font-size: 11px; }\n    .cb-log { margin: 0; color: #f6ead5; font-size: 13px; line-height: 1.45; }\n    .cb-hand { padding: 10px; border: 1px solid rgba(239, 180, 95, .28); background: rgba(36, 22, 16, .68); }\n    .cb-hand-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; color: #efb45f; }\n    .cb-selected { display: block; margin-top: 3px; color: #bba98f; font-size: 12px; }\n    .cb-play, .cb-restart { padding: 8px 12px; border: 1px solid rgba(239, 180, 95, .65); color: #17100a; background: #efb45f; cursor: pointer; }\n    .cb-play:disabled { cursor: not-allowed; opacity: .4; }\n    .cb-cards { display: grid; grid-template-columns: repeat(4, 82px); justify-content: center; gap: 10px; }\n    .cb-card { position: relative; width: 82px; aspect-ratio: 3 / 4; min-height: 0; padding: 0; overflow: hidden; border: 0; color: #f6ead5; background-color: transparent; background-image: var(--card-art), url(\"assets/Image/Ui/CardBattle/card-base.ie.png\"); background-position: center; background-repeat: no-repeat; background-size: contain; cursor: pointer; text-align: left; transition: transform 120ms ease, filter 120ms ease, opacity 120ms ease; }\n    .cb-card[data-card=\"attack\"] { --card-art: url(\"assets/Image/Ui/CardBattle/attack.ie.png\"); }\n    .cb-card[data-card=\"heal\"] { --card-art: url(\"assets/Image/Ui/CardBattle/heal.png\"); }\n    .cb-card[data-card=\"defend\"] { --card-art: url(\"assets/Image/Ui/CardBattle/defend.png\"); }\n    .cb-card[data-card=\"ultimate\"] { --card-art: url(\"assets/Image/Ui/CardBattle/ultimate.png\"); }\n    .cb-card:hover:not(:disabled), .cb-card.selected { filter: brightness(1.14); transform: translateY(-3px); }\n    .cb-card.selected { outline: 3px solid rgba(239, 180, 95, .8); outline-offset: 2px; }\n    .cb-card:disabled { cursor: not-allowed; opacity: .4; }\n    .cb-card.locked::after { content: \"\"; position: absolute; inset: 0; z-index: 1; background: url(\"assets/Image/Ui/CardBattle/card-base.ie.png\") center / contain no-repeat; opacity: .94; }\n    .cb-card .key { position: absolute; z-index: 2; top: 6px; right: 7px; display: grid; place-items: center; width: 18px; height: 18px; color: #17100a; background: rgba(239, 180, 95, .94); font-size: 10px; font-weight: 700; }\n    .cb-card .symbol { display: none; }\n    .cb-card .name { position: absolute; z-index: 2; right: 5px; bottom: 6px; left: 5px; color: #fff7e8; font-size: 11px; font-weight: 700; text-align: center; text-shadow: 0 1px 3px #000, 0 0 3px #000; }\n    .cb-card .detail { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n    .cb-status { margin-top: 8px; color: #bba98f; font-size: 11px; }\n    @media (max-width: 680px) {\n      .cb-arena { grid-template-columns: 1fr; gap: 7px; min-height: 0; }\n      .cb-vs { text-align: center; }\n      .cb-face { display: none; }\n      .cb-cards { grid-template-columns: repeat(2, 82px); }\n      .cb-card { width: 82px; }\n    }\n  ";
  var template = "\n    <header class=\"cb-topbar\"><strong>\u6218\u6597\u8F6E \xB7 \u5361\u724C\u5BF9\u51B3</strong><span class=\"cb-round\" data-round>\u56DE\u5408 1</span></header>\n    <details class=\"cb-rules\">\n      <summary>\u89C4\u5219\u8BF4\u660E</summary>\n      <div class=\"cb-rule-body\">\n        <p><strong>\u76EE\u6807\uFF1A</strong>\u4F60\u7684\u751F\u547D\u503C\u4E3A 10\uFF0C\u654C\u4EBA\u751F\u547D\u503C\u4E3A 10\uFF0C\u628A\u654C\u4EBA\u51FB\u5012\u5373\u53EF\u83B7\u80DC\uFF1B\u540C\u4E00\u6B21\u7ED3\u7B97\u4E2D\u53CC\u65B9\u90FD\u5012\u4E0B\u65F6\uFF0C\u7B97\u4F60\u8D62\u3002</p>\n        <p><strong>\u51FA\u724C\uFF1A</strong>\u5355\u51FA\u653B\u51FB\u3001\u56DE\u8840\u6216\u9632\u5FA1\u514D\u8D39\uFF0C\u5355\u51FA\u5FC5\u6740\u6D88\u8017 1 \u70B9\u4F53\u529B\uFF1B\u901A\u5E38\u53CC\u724C\u6D88\u8017 1 \u70B9\u4F53\u529B\uFF0C\u201C\u653B\u51FB\uFF0B\u5FC5\u6740\u201D\u548C\u201C\u9632\u5FA1\uFF0B\u5FC5\u6740\u201D\u6D88\u8017 2 \u70B9\u3002\u53CC\u65B9\u6BCF 2 \u56DE\u5408\u6062\u590D 1 \u70B9\u4F53\u529B\u3002</p>\n        <p><strong>\u514B\u5236\uFF1A</strong>\u5355\u72EC\u56DE\u8840\u9047\u5230\u4EFB\u4F55\u653B\u51FB\u65F6\uFF0C\u56DE\u8840\u4E0D\u751F\u6548\u5E76\u76F4\u63A5\u5931\u53BB 3 \u70B9\u751F\u547D\uFF1B4 \u70B9\u7834\u9635\u7206\u53D1\u6539\u4E3A\u5931\u53BB 4 \u70B9\u3002\u7EC4\u5408\u6280\u4E2D\u7684\u56DE\u8840\u88AB\u653B\u51FB\u65F6\u53EA\u53D6\u6D88\u56DE\u8840\uFF0C\u4E0D\u989D\u5916\u6263\u8840\uFF0C\u53E6\u4E00\u5F20\u724C\u548C\u5BF9\u65B9\u653B\u51FB\u7167\u5E38\u7ED3\u7B97\u3002\u9632\u5FA1\u5BF9\u6240\u6709\u653B\u51FB\u4F24\u5BB3\u751F\u6548\uFF0C\u62B5\u6321 2 \u70B9\uFF0C\u5E76\u6709 25% \u6982\u7387\u53CD\u5F39 1 \u70B9\u3002</p>\n        <p><strong>\u7EC4\u5408\uFF1A</strong>\u5FC5\u6740\u4F1A\u5F3A\u5316\u7EC4\u5408\u6280\uFF1A\u201C\u56DE\u8840\uFF0B\u5FC5\u6740\u201D\u9020\u6210 3 \u70B9\u4F24\u5BB3\u5E76\u56DE\u590D 1 \u70B9\uFF0C\u201C\u9632\u5FA1\uFF0B\u5FC5\u6740\u201D\u9020\u6210 3 \u70B9\u4F24\u5BB3\u5E76\u83B7\u5F97\u9632\u5FA1\uFF0C\u201C\u653B\u51FB\uFF0B\u5FC5\u6740\u201D\u9020\u6210 4 \u70B9\u4F24\u5BB3\uFF1B\u6240\u6709\u542B\u5FC5\u6740\u7684\u7EC4\u5408\u6280\u90FD\u4F1A\u89E6\u53D1 4 \u56DE\u5408\u5FC5\u6740\u51B7\u5374\u3002</p>\n        <p><strong>\u6FD2\u6B7B\uFF1A</strong><span data-infinite-rule></span></p>\n      </div>\n    </details>\n    <section class=\"cb-arena\" aria-label=\"\u6218\u6597\u533A\u57DF\">\n      <section class=\"cb-fighter\" aria-label=\"\u654C\u4EBA\">\n        <div class=\"cb-fighter-name\"><small>\u654C\u4EBA</small><strong>\u65E0\u773C\u8005</strong></div>\n        <div class=\"cb-hp-line\"><span data-enemy-hp>10 / 10</span><div class=\"cb-hp-track\"><span class=\"cb-hp-fill\" data-enemy-fill></span></div></div>\n        <div class=\"cb-resource\"><span>\u4F53\u529B</span><span class=\"cb-orbs\" data-enemy-orbs aria-label=\"\u654C\u4EBA\u4F53\u529B 0 / 3\"></span></div>\n        <div class=\"cb-face cb-enemy-face\" aria-hidden=\"true\"><img src=\"assets/Image/Portrait/monster-pixel.ie.png\" alt=\"\"></div>\n        <button class=\"cb-intent\" type=\"button\" data-intent aria-expanded=\"false\">? \u70B9\u51FB\u67E5\u770B\u4E24\u5F20\u5019\u9009\u724C</button>\n        <div class=\"cb-last-play\" data-last-play hidden><span class=\"cb-last-kicker\">\u4E0A\u56DE\u5408\u51FA\u724C</span><strong data-last-name></strong><span class=\"cb-last-detail\" data-last-detail></span></div>\n      </section>\n      <div class=\"cb-vs\" aria-hidden=\"true\">VS</div>\n      <section class=\"cb-fighter\" aria-label=\"\u73A9\u5BB6\">\n        <div class=\"cb-fighter-name\"><small>\u8C03\u67E5\u5458</small><strong>\u4F60</strong></div>\n        <div class=\"cb-hp-line\"><span data-player-hp>10 / 10</span><div class=\"cb-hp-track\"><span class=\"cb-hp-fill\" data-player-fill></span></div></div>\n        <div class=\"cb-resource\"><span>\u4F53\u529B</span><span class=\"cb-orbs\" data-player-orbs aria-label=\"\u4F53\u529B 0 / 3\"></span></div>\n        <div class=\"cb-face cb-player-face\" aria-hidden=\"true\">\u265F</div>\n        <div class=\"cb-status\" data-shield hidden></div>\n      </section>\n    </section>\n    <section class=\"cb-readout\" aria-label=\"\u6218\u6597\u4FE1\u606F\">\n      <div><span class=\"cb-energy-label\">\u4F60\u7684\u4F53\u529B</span><span class=\"cb-orbs\" data-readout-orbs aria-hidden=\"true\"></span></div>\n      <p class=\"cb-log\" data-log role=\"status\" aria-live=\"polite\">\u53CC\u65B9\u6BCF 2 \u56DE\u5408\u6062\u590D 1 \u70B9\u4F53\u529B\u3002</p>\n    </section>\n    <section class=\"cb-hand\" aria-label=\"\u56DB\u5F20\u5361\u724C\">\n      <div class=\"cb-hand-heading\"><div><strong>\u9009\u62E9 1 \u6216 2 \u5F20\u724C</strong><span class=\"cb-selected\" data-selected>\u5DF2\u9009 0 / 2</span></div><button class=\"cb-play\" type=\"button\" data-play disabled>\u51FA\u724C</button></div>\n      <div class=\"cb-cards\">\n        <button class=\"cb-card\" type=\"button\" data-card=\"attack\" aria-pressed=\"false\"><span class=\"key\">1</span><span class=\"symbol\">\u65A9</span><span class=\"name\">\u653B\u51FB</span><span class=\"detail\">\u5355\u51FA\u9020\u6210 2 \u70B9\u4F24\u5BB3</span></button>\n        <button class=\"cb-card\" type=\"button\" data-card=\"heal\" aria-pressed=\"false\"><span class=\"key\">2</span><span class=\"symbol\">\u6108</span><span class=\"name\">\u56DE\u8840</span><span class=\"detail\">\u5355\u51FA\u6062\u590D 3\uFF08\u53D7\u653B\u51FB\uFF1A\u5931\u53BB 3 \u70B9\uFF1B\u7834\u9635\u7206\u53D1\u5931\u53BB 4 \u70B9\uFF1B\u7EC4\u5408\u56DE\u8840\u53EA\u53D6\u6D88\u6062\u590D\uFF09</span></button>\n        <button class=\"cb-card\" type=\"button\" data-card=\"defend\" aria-pressed=\"false\"><span class=\"key\">3</span><span class=\"symbol\">\u9632</span><span class=\"name\">\u9632\u5FA1</span><span class=\"detail\">\u5355\u51FA\u62B5\u6321 2 \u70B9\uFF0C25% \u6982\u7387\u53CD\u5F39 1 \u70B9</span></button>\n        <button class=\"cb-card\" type=\"button\" data-card=\"ultimate\" aria-pressed=\"false\"><span class=\"key\">4</span><span class=\"symbol\">\u5FC5</span><span class=\"name\">\u5FC5\u6740</span><span class=\"detail\">\u5355\u51FA\u6D88\u8017 1 \u4F53\u529B\uFF0C\u9020\u6210 3 \u70B9\u4F24\u5BB3\uFF0C\u51B7\u5374 4 \u56DE\u5408</span></button>\n      </div>\n    </section>\n  ";
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
  function getPlayerActionCost(cards) {
    if (cards.length === 1) return cards[0] === "ultimate" ? 1 : 0;
    if (cards.length !== 2) return 0;
    var key = _toConsumableArray(cards).sort().join("+");
    return key === "attack+ultimate" || key === "defend+ultimate" ? 2 : 1;
  }
  function hasInfiniteEnemyEnergy(enemyHp, threshold) {
    return enemyHp <= threshold;
  }
  function pickEnemyCandidates(energy, ultimateCooldown, enemyHp, threshold) {
    var infiniteEnergy = hasInfiniteEnemyEnergy(enemyHp, threshold);
    var available = enemyActions.filter(function (action) {
      return (infiniteEnergy || action.cost <= energy) && (!action.cards.includes("ultimate") || ultimateCooldown === 0) && (enemyHp < MAX_ENEMY_HP || !action.recovery);
    });
    return _toConsumableArray(available).sort(function () {
      return Math.random() - 0.5;
    }).slice(0, 2);
  }
  function scoreEnemyAction(action, context) {
    // 候选牌仍然随机，但敌人会根据玩家已经选定的牌做更可靠的战术判断。
    var score = Math.random() * 0.35;
    var selected = context.selected || [];
    var playerThreatens = isAttackAction(selected);
    var playerHeals = selected.includes("heal");
    var playerUsesCombo = selected.length === 2;
    var has = function has(cardId) {
      return action.cards.includes(cardId);
    };
    var attacks = isAttackAction(action.cards);
    if (action.combo) score += 5;
    if (attacks) {
      score += 3;
      score += playerHeals ? 8 : 0;
      score += context.playerHp <= 3 ? 8 : context.playerHp <= 5 ? 4 : 0;
    }
    if (action.id === "attack+ultimate") score += 7;
    if (action.ultimate && !action.combo) score += 6;
    if (has("heal")) {
      score += context.enemyHp >= MAX_ENEMY_HP ? -30 : context.enemyHp >= 8 ? -10 : context.enemyHp <= 3 ? 6 : context.enemyHp <= 5 ? 3 : -2;
      score += playerThreatens ? -10 : 0;
    }
    if (has("defend")) {
      score += playerThreatens ? 16 : 0;
      score += playerThreatens && playerUsesCombo ? 3 : 0;
      score += context.enemyHp <= 4 ? 4 : 0;
    }
    return score;
  }
  function chooseEnemyAction(candidates, context) {
    var ranked = _toConsumableArray(candidates).sort(function (left, right) {
      return scoreEnemyAction(right, context) - scoreEnemyAction(left, context);
    });
    return ranked.length < 2 || Math.random() < 0.85 ? ranked[0] : ranked[1];
  }
  function isAttackAction(cards) {
    return cards.some(function (cardId) {
      return cardId === "attack" || cardId === "ultimate";
    });
  }
  function recoveryBacklash(cards) {
    if (!isAttackAction(cards)) return 0;
    return cards.includes("attack") && cards.includes("ultimate") ? 4 : 3;
  }
  function recoveryCounterName(cards) {
    if (cards.includes("attack") && cards.includes("ultimate")) return "破阵爆发";
    return cards.includes("ultimate") ? "必杀" : "攻击";
  }
  function run(context) {
    var enemyInfiniteEnergyHp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    if (!context.stage) return Promise.resolve(null);
    var stage = context.stage;
    var style = document.createElement("style");
    style.textContent = styleText;
    var root = document.createElement("section");
    root.className = "card-battle";
    root.innerHTML = template;
    root.querySelector(".cb-rules").open = false;
    root.querySelector("[data-infinite-rule]").textContent = "\u654C\u4EBA\u751F\u547D\u503C\u964D\u5230 ".concat(enemyInfiniteEnergyHp, " \u6216\u66F4\u4F4E\u540E\u4F53\u529B\u53D8\u4E3A\u65E0\u9650\uFF0C\u53EF\u8FDE\u7EED\u4F7F\u7528\u7EC4\u5408\u6280\uFF1B\u5355\u51FA\u5FC5\u6740\u4ECD\u53D7 4 \u56DE\u5408\u51B7\u5374\u3002");
    stage.append(style, root);
    root.classList.toggle("is-responsive", stage.clientWidth <= 700);
    var elements = {
      round: root.querySelector("[data-round]"),
      enemyHp: root.querySelector("[data-enemy-hp]"),
      enemyFill: root.querySelector("[data-enemy-fill]"),
      enemyOrbs: root.querySelector("[data-enemy-orbs]"),
      intent: root.querySelector("[data-intent]"),
      lastPlay: root.querySelector("[data-last-play]"),
      lastName: root.querySelector("[data-last-name]"),
      lastDetail: root.querySelector("[data-last-detail]"),
      playerHp: root.querySelector("[data-player-hp]"),
      playerFill: root.querySelector("[data-player-fill]"),
      playerOrbs: root.querySelector("[data-player-orbs]"),
      readoutOrbs: root.querySelector("[data-readout-orbs]"),
      shield: root.querySelector("[data-shield]"),
      log: root.querySelector("[data-log]"),
      selected: root.querySelector("[data-selected]"),
      play: root.querySelector("[data-play]"),
      cards: _toConsumableArray(root.querySelectorAll("[data-card]"))
    };
    var state = {
      playerHp: MAX_PLAYER_HP,
      enemyHp: MAX_ENEMY_HP,
      energy: 0,
      enemyEnergy: 0,
      shield: 0,
      counter: 0,
      enemyShield: 0,
      enemyCounter: 0,
      round: 1,
      ultimateCooldown: 0,
      enemyUltimateCooldown: 0,
      selected: [],
      enemyCandidates: pickEnemyCandidates(0, 0, MAX_ENEMY_HP, enemyInfiniteEnergyHp),
      enemyAction: null,
      enemyPlayed: null,
      lastPlayed: null,
      intentRevealed: false,
      busy: false,
      ended: false
    };
    var resolveSettlement;
    var transitionTimer = null;
    var resultTimer = null;
    var cleaned = false;
    var finished = new Promise(function (resolve) {
      resolveSettlement = resolve;
    });
    function say(messages) {
      elements.log.textContent = messages.join(" · ");
    }
    function schedule(callback, delay) {
      return window.setTimeout(callback, delay);
    }
    function renderOrbs(target, value, label) {
      var infinite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      target.replaceChildren();
      target.setAttribute("aria-label", infinite ? label : "".concat(label, " ").concat(value, " / ").concat(MAX_ENERGY));
      if (infinite) {
        var mark = document.createElement("span");
        mark.className = "infinite-energy";
        mark.textContent = "∞";
        mark.setAttribute("aria-hidden", "true");
        target.append(mark);
        return;
      }
      for (var index = 0; index < MAX_ENERGY; index += 1) {
        var orb = document.createElement("span");
        orb.className = index < value ? "full" : "";
        orb.textContent = "✦";
        orb.setAttribute("aria-hidden", "true");
        target.append(orb);
      }
    }
    function render() {
      elements.round.textContent = "\u56DE\u5408 ".concat(state.round);
      elements.enemyHp.textContent = "".concat(state.enemyHp, " / ").concat(MAX_ENEMY_HP);
      elements.enemyFill.style.width = "calc((100% - 26px) * ".concat(state.enemyHp / MAX_ENEMY_HP, ")");
      var enemyInfinite = hasInfiniteEnemyEnergy(state.enemyHp, enemyInfiniteEnergyHp);
      renderOrbs(elements.enemyOrbs, state.enemyEnergy, enemyInfinite ? "敌人体力无限" : "敌人体力", enemyInfinite);
      renderOrbs(elements.playerOrbs, state.energy, "体力");
      renderOrbs(elements.readoutOrbs, state.energy, "体力");
      elements.playerHp.textContent = "".concat(state.playerHp, " / ").concat(MAX_PLAYER_HP);
      elements.playerFill.style.width = "calc((100% - 26px) * ".concat(state.playerHp / MAX_PLAYER_HP, ")");
      elements.shield.hidden = state.shield <= 0;
      elements.shield.textContent = "\u62A4\u76FE ".concat(state.shield).concat(state.counter > 0 ? " · 25% 反击 1" : "");
      if (state.enemyPlayed) {
        elements.intent.textContent = "\u2713 \u5DF2\u51FA\u724C\uFF1A".concat(state.enemyPlayed.label);
      } else if (state.intentRevealed) {
        elements.intent.textContent = "! \u53EF\u80FD\uFF1A".concat(state.enemyCandidates.map(function (action) {
          return action.label;
        }).join(" / "));
      } else {
        elements.intent.textContent = "? 点击查看两张候选牌";
      }
      elements.intent.disabled = state.busy || state.ended || Boolean(state.enemyPlayed);
      elements.intent.setAttribute("aria-expanded", String(state.intentRevealed));
      elements.lastPlay.hidden = !state.lastPlayed;
      if (state.lastPlayed) {
        elements.lastName.textContent = state.lastPlayed.label;
        elements.lastDetail.textContent = state.lastPlayed.detail;
      }
      var selectedNames = state.selected.map(function (id) {
        return cardNames[id];
      }).join("＋");
      elements.selected.textContent = selectedNames ? "\u5DF2\u9009 ".concat(state.selected.length, " / 2\uFF1A").concat(selectedNames) : "已选 0 / 2";
      var actionCost = getPlayerActionCost(state.selected);
      elements.play.disabled = state.busy || state.ended || state.selected.length === 0 || state.energy < actionCost;
      elements.play.textContent = state.selected.length === 2 ? "\u540C\u65F6\u51FA\u724C\uFF08-".concat(actionCost, " \u4F53\u529B\uFF09") : actionCost > 0 ? "\u51FA\u4E00\u5F20\uFF08-".concat(actionCost, " \u4F53\u529B\uFF09") : "出一张（免费）";
      elements.cards.forEach(function (button) {
        var cardId = button.dataset.card;
        var locked = cardId === "ultimate" && state.ultimateCooldown > 0 && state.selected.length === 0;
        var selected = state.selected.includes(cardId);
        button.disabled = state.busy || state.ended || locked;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
        button.title = locked ? "\u5FC5\u6740\u51B7\u5374\u4E2D\uFF0C\u8FD8\u5269 ".concat(state.ultimateCooldown, " \u56DE\u5408\uFF1B\u51B7\u5374\u7ED3\u675F\u540E\u624D\u53EF\u9009\u62E9") : "".concat(cardNames[cardId], "\uFF1A").concat(cardDetails[cardId]);
      });
    }
    function damageEnemy(amount, messages) {
      var combo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var damage = amount;
      if (state.enemyShield > 0) {
        var blocked = Math.min(state.enemyShield, damage);
        state.enemyShield -= blocked;
        damage -= blocked;
        messages.push("\u654C\u4EBA\u7684\u9632\u5FA1\u6321\u4F4F\u4E86 ".concat(blocked, " \u70B9\u4F24\u5BB3"));
      }
      if (amount > 0 && state.enemyCounter > 0) {
        if (Math.random() < COUNTER_CHANCE) {
          state.playerHp = clamp(state.playerHp - state.enemyCounter, 0, MAX_PLAYER_HP);
          messages.push("\u654C\u4EBA\u7684\u9632\u5FA1\u53CD\u5F39\u4E86 ".concat(state.enemyCounter, " \u70B9\u4F24\u5BB3"));
        } else {
          messages.push("敌人的防御反击未触发");
        }
        state.enemyCounter = 0;
      }
      var wasAboveThreshold = state.enemyHp > enemyInfiniteEnergyHp;
      state.enemyHp = clamp(state.enemyHp - damage, 0, MAX_ENEMY_HP);
      if (damage > 0) messages.push("\u4F60\u9020\u6210\u4E86 ".concat(damage, " \u70B9\u4F24\u5BB3"));
      if (wasAboveThreshold && state.enemyHp <= enemyInfiniteEnergyHp && state.enemyHp > 0) {
        messages.push("敌人濒死，体力变为无限");
      }
    }
    function damagePlayer(amount, messages) {
      var combo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var blocked = Math.min(state.shield, amount);
      var actual = amount - blocked;
      if (blocked > 0) messages.push("\u62A4\u76FE\u62B5\u6321\u4E86 ".concat(blocked, " \u70B9\u4F24\u5BB3"));
      if (actual > 0) {
        state.playerHp = clamp(state.playerHp - actual, 0, MAX_PLAYER_HP);
        messages.push("\u4F60\u53D7\u5230 ".concat(actual, " \u70B9\u4F24\u5BB3"));
      } else messages.push("你没有受到伤害");
    }
    function healPlayer(amount, messages) {
      var penalty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var counterName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "斩击";
      if (penalty > 0) {
        state.playerHp = clamp(state.playerHp - penalty, 0, MAX_PLAYER_HP);
        messages.push("\u4F60\u7684\u56DE\u8840\u88AB".concat(counterName, "\u6253\u65AD\uFF0C\u4E0D\u751F\u6548\u5E76\u5931\u53BB ").concat(penalty, " \u70B9\u751F\u547D"));
        return;
      }
      var before = state.playerHp;
      state.playerHp = clamp(state.playerHp + amount, 0, MAX_PLAYER_HP);
      var recovered = state.playerHp - before;
      if (recovered > 0) messages.push("\u4F60\u6062\u590D\u4E86 ".concat(recovered, " \u70B9\u751F\u547D"));else messages.push("生命值已经满了");
    }
    function healEnemy(amount, messages) {
      var before = state.enemyHp;
      state.enemyHp = clamp(state.enemyHp + amount, 0, MAX_ENEMY_HP);
      var recovered = state.enemyHp - before;
      if (recovered > 0) messages.push("\u654C\u4EBA\u6062\u590D\u4E86 ".concat(recovered, " \u70B9\u751F\u547D"));else messages.push("敌人的生命值已满");
    }
    function damageEnemyForAttack(amount, messages) {
      var combo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // 攻击回血目标时，3/4 点反制伤害替代原本的攻击伤害，避免重复扣血。
      if (state.enemyAction.recovery && !state.enemyAction.combo && isAttackAction(state.selected)) {
        return damageEnemy(recoveryBacklash(state.selected), messages, true);
      }
      return damageEnemy(amount, messages, combo);
    }
    function healPlayerForCombo(amount, messages) {
      if (isAttackAction(state.enemyAction.cards)) {
        messages.push("组合技中的回血被攻击打断，不生效且不额外扣血");
        return;
      }
      healPlayer(amount, messages);
    }
    function resolveSingle(cardId, messages) {
      if (cardId === "attack") return damageEnemyForAttack(2, messages);
      if (cardId === "heal") {
        var penalty = recoveryBacklash(state.enemyAction.cards);
        return healPlayer(3, messages, penalty, recoveryCounterName(state.enemyAction.cards));
      }
      if (cardId === "defend") {
        state.shield = DEFENSE_BLOCK;
        state.counter = COUNTER_DAMAGE;
        messages.push("你获得了 2 点护盾，受到攻击时有 25% 概率反弹 1 点");
        return;
      }
      damageEnemyForAttack(3, messages);
      state.ultimateCooldown = ULTIMATE_COOLDOWN;
      messages.push("必杀进入 4 回合冷却");
    }
    function resolveCombo(cardIds, messages) {
      var key = _toConsumableArray(cardIds).sort().join("+");
      if (key === "attack+heal" || key === "heal+ultimate") {
        messages.push("组合技：吸血斩");
        damageEnemyForAttack(key === "heal+ultimate" ? 3 : 2, messages, true);
        healPlayerForCombo(1, messages);
      } else if (key === "attack+defend" || key === "defend+ultimate") {
        messages.push("组合技：盾击");
        damageEnemyForAttack(key === "defend+ultimate" ? 3 : 2, messages, true);
        state.shield = DEFENSE_BLOCK;
        state.counter = COUNTER_DAMAGE;
        messages.push("你获得了 2 点护盾，受到攻击时有 25% 概率反弹 1 点");
      } else if (key === "attack+ultimate") {
        messages.push("组合技：破阵爆发");
        damageEnemyForAttack(4, messages, true);
      } else if (key === "defend+heal") {
        messages.push("组合技：稳住阵脚");
        healPlayerForCombo(2, messages);
        state.shield = DEFENSE_BLOCK;
        state.counter = COUNTER_DAMAGE;
        messages.push("你获得了 2 点护盾，受到攻击时有 25% 概率反弹 1 点");
      }
      if (cardIds.includes("ultimate")) {
        state.ultimateCooldown = ULTIMATE_COOLDOWN;
        messages.push("必杀进入 4 回合冷却");
      }
    }
    function clearTemporaryDefense() {
      state.shield = 0;
      state.enemyShield = 0;
      state.enemyCounter = 0;
      state.counter = 0;
    }
    function commitEnemyAction() {
      state.enemyAction = chooseEnemyAction(state.enemyCandidates, state);
      state.enemyShield = state.enemyAction.shield || 0;
      state.enemyCounter = state.enemyAction.counter || 0;
    }
    function resolveEnemyAction(messages) {
      var action = state.enemyAction;
      if (!hasInfiniteEnemyEnergy(state.enemyHp, enemyInfiniteEnergyHp)) state.enemyEnergy = clamp(state.enemyEnergy - action.cost, 0, MAX_ENERGY);
      state.enemyPlayed = action;
      state.lastPlayed = action;
      messages.push("\u654C\u4EBA\u51FA\u724C\uFF1A".concat(action.label, "\uFF08").concat(action.detail, "\uFF09"));
      if (action.cards.includes("ultimate")) {
        state.enemyUltimateCooldown = ULTIMATE_COOLDOWN;
        messages.push("敌人的必杀进入 4 回合冷却");
      }
      if (state.counter > 0 && action.damage) {
        if (Math.random() < COUNTER_CHANCE) {
          state.enemyHp = clamp(state.enemyHp - state.counter, 0, MAX_ENEMY_HP);
          messages.push("\u53CD\u51FB\u9020\u6210 ".concat(state.counter, " \u70B9\u4F24\u5BB3"));
        } else {
          messages.push("防御反击未触发");
        }
      }
      if (state.enemyHp <= 0) return;
      if (action.damage) {
        var playerRecoveryCountered = state.selected.length === 1 && state.selected[0] === "heal" && isAttackAction(action.cards);
        if (!playerRecoveryCountered) damagePlayer(action.damage, messages, action.combo);
      }
      if (action.recovery) {
        var enemyRecoveryCountered = isAttackAction(state.selected);
        if (enemyRecoveryCountered) {
          messages.push("敌人的回血不生效（攻击伤害已直接结算）");
        } else {
          healEnemy(action.recovery, messages);
        }
      }
      clearTemporaryDefense();
    }
    function endBattle(won, messages) {
      if (state.ended) return;
      state.ended = true;
      state.busy = true;
      messages.push(won ? "战斗胜利" : "你被击倒了");
      say(messages);
      render();
      var settlement = won ? [{
        type: "setFlag",
        key: "card_battle_won",
        value: true
      }, {
        type: "setFlag",
        key: "carriage_02_passed",
        value: true
      }, {
        type: "setFlag",
        key: "clicker_cleared",
        value: true
      }, {
        type: "dialogue",
        text: "你在战斗轮中击倒了无眼者，抵达通往先头车厢的安全门前。"
      }] : [{
        type: "setFlag",
        key: "card_battle_won",
        value: false
      }, {
        type: "dialogue",
        text: "无眼者抓住了你的破绽，战斗轮失败。"
      }, {
        type: "jump",
        next: "E_030"
      }];
      resultTimer = schedule(function () {
        resolveSettlement(settlement);
      }, 420);
    }
    function finishTurn(messages) {
      if (state.enemyHp <= 0) return endBattle(true, messages);
      resolveEnemyAction(messages);
      if (state.enemyHp <= 0) return endBattle(true, messages);
      if (state.playerHp <= 0) return endBattle(false, messages);
      say(messages);
      render();
      transitionTimer = schedule(function () {
        state.round += 1;
        state.ultimateCooldown = Math.max(0, state.ultimateCooldown - 1);
        state.enemyUltimateCooldown = Math.max(0, state.enemyUltimateCooldown - 1);
        if (state.round % 2 === 1) {
          state.energy = clamp(state.energy + 1, 0, MAX_ENERGY);
          state.enemyEnergy = clamp(state.enemyEnergy + 1, 0, MAX_ENERGY);
        }
        state.enemyCandidates = pickEnemyCandidates(state.enemyEnergy, state.enemyUltimateCooldown, state.enemyHp, enemyInfiniteEnergyHp);
        state.enemyAction = null;
        state.enemyPlayed = null;
        state.intentRevealed = false;
        state.selected = [];
        state.busy = false;
        say([state.round % 2 === 1 ? "双方恢复 1 点体力。" : "本回合不恢复体力。"]);
        render();
      }, ENEMY_PLAY_DISPLAY_MS);
    }
    function selectCard(cardId) {
      if (state.busy || state.ended || cardId === "ultimate" && state.ultimateCooldown > 0) return;
      var index = state.selected.indexOf(cardId);
      if (index >= 0) state.selected.splice(index, 1);else if (state.selected.length < 2) state.selected.push(cardId);
      render();
    }
    function revealIntent() {
      if (state.busy || state.ended || state.enemyPlayed) return;
      state.intentRevealed = !state.intentRevealed;
      render();
    }
    function playSelected() {
      if (state.busy || state.ended || state.selected.length === 0) return;
      var actionCost = getPlayerActionCost(state.selected);
      if (state.energy < actionCost) {
        say(["\u8FD9\u6B21\u51FA\u724C\u9700\u8981 ".concat(actionCost, " \u70B9\u4F53\u529B\uFF0C\u8BF7\u7B49\u4F53\u529B\u6062\u590D\u3002")]);
        return;
      }
      state.busy = true;
      var selected = _toConsumableArray(state.selected);
      var messages = [selected.length === 2 ? "\u4F60\u540C\u65F6\u4F7F\u7528\u4E86".concat(selected.map(function (id) {
        return cardNames[id];
      }).join("＋")) : "\u4F60\u4F7F\u7528\u4E86".concat(cardNames[selected[0]])];
      commitEnemyAction();
      state.energy -= actionCost;
      if (selected.length === 2) resolveCombo(selected, messages);else resolveSingle(selected[0], messages);
      render();
      transitionTimer = schedule(function () {
        return finishTurn(messages);
      }, 180);
    }
    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      if (transitionTimer !== null) window.clearTimeout(transitionTimer);
      if (resultTimer !== null) window.clearTimeout(resultTimer);
      elements.cards.forEach(function (button) {
        return button.removeEventListener("click", onCardClick);
      });
      elements.intent.removeEventListener("click", revealIntent);
      elements.play.removeEventListener("click", playSelected);
      root.remove();
      style.remove();
    }
    function onCardClick(event) {
      selectCard(event.currentTarget.dataset.card);
    }
    elements.cards.forEach(function (button) {
      return button.addEventListener("click", onCardClick);
    });
    elements.intent.addEventListener("click", revealIntent);
    elements.play.addEventListener("click", playSelected);
    context.onQuit(function () {
      return null;
    });
    context.registerCleanup(cleanup);
    say(["双方每 2 回合恢复 1 点体力。"]);
    render();
    return finished;
  }
  function createRun(enemyInfiniteEnergyHp) {
    return function (context) {
      return run(context, enemyInfiniteEnergyHp);
    };
  }
  Game.Minigames.register("card_battle", {
    title: "战斗轮 · 卡牌对决（简单模式）",
    allowQuit: false,
    run: createRun(3)
  });
  Game.Minigames.register("card_battle_hard", {
    title: "战斗轮 · 卡牌对决（困难模式）",
    allowQuit: false,
    run: createRun(5)
  });
})(window.TrainGame);
