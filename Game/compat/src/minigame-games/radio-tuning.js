function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (Game) {
  "use strict";

  // E-0008 收音机调频小游戏：控制指针追踪不断移动的绿色频段，并持续稳定 3 秒。
  // 顶层只注册编号；DOM、键盘监听、动画帧都延迟到 run()，保证编译器可在无 DOM 环境加载。
  var RESULT_FLAG = "ev0008_radio_tuned";
  var RANGE_SPAN = 64.8;
  var RANGE_ARC_START = -135;
  var RANGE_ARC_END = 135;
  var RANGE_TRAVEL_MIN = RANGE_ARC_START + RANGE_SPAN / 2;
  var RANGE_TRAVEL_MAX = RANGE_ARC_END - RANGE_SPAN / 2;
  var HOLD_DURATION = 3000;
  var RANGE_SPEED_SCALE = 1.08;
  var POINTER_STEP = 5 * 2.16;
  var FM_FREQUENCY_MIN_MHZ = 87.5;
  var FM_FREQUENCY_MAX_MHZ = 108.0;
  var STYLE_TEXT = "\n    .radio-tuning { box-sizing: border-box; width: 100%; height: 100%; min-height: 0; overflow: auto; padding: clamp(14px, 3vw, 28px); color: #f2e9dc; background: radial-gradient(circle at 20% 8%, rgba(213, 159, 101, .16), transparent 30%), repeating-linear-gradient(10deg, rgba(255, 225, 180, .035) 0 2px, transparent 2px 25px), linear-gradient(135deg, #17100f, #40271d 50%, #100c0c); font-family: \"Ark Pixel 12px\", \"Microsoft YaHei\", \"Noto Sans SC\", sans-serif; }\n    .radio-tuning * { box-sizing: border-box; }\n    .radio-tuning button { font: inherit; }\n    .rt-shell { width: min(860px, 100%); min-height: 100%; margin: auto; padding: clamp(18px, 4vw, 42px); border: 1px solid rgba(255, 226, 184, .18); border-radius: 4px; background: repeating-linear-gradient(0deg, rgba(255, 225, 180, .03) 0 1px, transparent 1px 17px), linear-gradient(145deg, rgba(124, 80, 50, .97), rgba(54, 33, 26, .98) 55%, rgba(27, 19, 19, .99)); box-shadow: 0 24px 72px rgba(0, 0, 0, .58), inset 0 0 90px rgba(0, 0, 0, .34); }\n    .rt-kicker { margin: 0 0 7px; color: #e2ad70; font-size: 12px; letter-spacing: .17em; text-transform: uppercase; }\n    .rt-title { margin: 0; color: #f2e9dc; font-size: clamp(27px, 5vw, 46px); letter-spacing: .08em; }\n    .rt-subtitle { margin: 10px 0 0; color: #b8aa9b; line-height: 1.7; }\n    .rt-radio { margin: 28px auto 0; padding: clamp(18px, 4vw, 34px); border: 2px solid #66564d; border-radius: 16px 16px 8px 8px; background: linear-gradient(115deg, rgba(255, 255, 255, .035), transparent 35%), linear-gradient(160deg, #352a27, #171212 72%); box-shadow: inset 0 0 40px rgba(0, 0, 0, .38); }\n    .rt-radio-top { display: grid; grid-template-columns: 1fr minmax(210px, 330px) 1fr; gap: 18px; align-items: center; }\n    .rt-speaker { height: 74px; border-radius: 10px; opacity: .7; background: radial-gradient(circle, #9d8f87 0 2px, transparent 3px) 0 0 / 14px 14px, linear-gradient(135deg, #5f514a, #261e1c); }\n    .rt-screen { min-height: 74px; display: grid; place-items: center; padding: 10px; border: 9px solid #191312; border-radius: 8px; color: #9fc786; background: #172119; box-shadow: inset 0 0 18px rgba(159, 199, 134, .16), 0 2px 0 #7b675a; text-align: center; }\n    .rt-screen-label { display: block; color: #73916b; font-size: 11px; letter-spacing: .12em; }\n    .rt-screen-value { display: block; margin-top: 3px; font-size: clamp(15px, 2vw, 21px); }\n    .rt-tracker { display: grid; grid-template-columns: minmax(240px, 1fr) minmax(190px, .7fr); gap: clamp(20px, 5vw, 48px); align-items: center; margin-top: 30px; }\n    .rt-dial { --needle-angle: 0deg; --range-start: 0deg; --range-span: 64.8deg; position: relative; width: min(330px, 68vw); aspect-ratio: 1; margin: auto; border: 12px solid #2c2523; border-radius: 50%; cursor: default; background: repeating-conic-gradient(from -1deg, rgba(226, 173, 112, .24) 0deg 1deg, transparent 1deg 10deg), radial-gradient(circle, #342a27 0 52%, #201817 53% 70%, #4b3932 71% 76%, #1a1312 77%); box-shadow: 0 10px 30px rgba(0, 0, 0, .5), inset 0 0 0 3px rgba(226, 173, 112, .22); }\n    .rt-dial::before { content: \"\"; position: absolute; inset: 12%; border-radius: 50%; background: conic-gradient(from var(--range-start), transparent 0deg, transparent 5deg, rgba(159, 199, 134, .2) 5deg, #9fc786 5deg calc(5deg + var(--range-span)), transparent calc(5deg + var(--range-span)) 360deg); filter: drop-shadow(0 0 8px rgba(159, 199, 134, .7)); transition: filter .15s ease; }\n    .rt-dial.in-range::before { filter: drop-shadow(0 0 14px rgba(159, 199, 134, .95)); }\n    .rt-needle { position: absolute; left: 50%; bottom: 50%; width: 5px; height: 39%; border-radius: 6px; background: #efb45f; box-shadow: 0 0 8px rgba(239, 180, 95, .75); transform: translateX(-50%) rotate(var(--needle-angle)); transform-origin: 50% 100%; }\n    .rt-hub { position: absolute; inset: 43%; display: grid; place-items: center; border: 3px solid #a4876c; border-radius: 50%; color: #f2e9dc; background: #2c2523; font-size: 11px; }\n    .rt-panel { min-width: 0; padding: 18px; border: 1px solid rgba(255, 226, 184, .17); background: rgba(20, 14, 13, .62); }\n    .rt-frequency { margin: 0 0 20px; color: #efb45f; font-size: clamp(27px, 5vw, 44px); letter-spacing: .12em; text-align: center; }\n    .rt-hold-label { display: flex; justify-content: space-between; gap: 8px; color: #d5c6ae; font-size: 12px; }\n    .rt-hold-track { height: 12px; margin-top: 8px; overflow: hidden; border: 1px solid #66564d; background: #120d0a; }\n    .rt-hold-fill { width: 0; height: 100%; background: linear-gradient(90deg, #9fc786, #55d0d4); transition: width .08s linear; }\n    .rt-instruction { margin: 22px 0 0; color: #b8aa9b; font-size: 13px; line-height: 1.7; text-align: center; }\n    .rt-instruction kbd { display: inline-block; min-width: 24px; margin: 0 2px; padding: 2px 6px; border: 1px solid #806a59; border-radius: 3px; color: #f2e9dc; background: #2c2523; }\n    .rt-status { min-height: 42px; margin: 18px 0 0; color: #b8aa9b; font-size: 13px; line-height: 1.55; text-align: center; }\n    .rt-status.stable { color: #9fc786; }\n    .rt-result { margin: 28px auto 0; padding: 30px 24px; border: 1px solid rgba(159, 199, 134, .55); color: #f2e9dc; background: rgba(18, 31, 22, .8); text-align: center; }\n    .rt-result h2 { margin: 0; color: #9fc786; font-size: clamp(24px, 4vw, 37px); }\n    .rt-result p { margin: 12px 0 0; color: #b8aa9b; line-height: 1.7; }\n    @media (max-width: 650px) { .rt-radio-top { grid-template-columns: 1fr; } .rt-speaker { display: none; } .rt-tracker { grid-template-columns: 1fr; } .rt-dial { width: min(280px, 78vw); } }\n    .radio-tuning .rt-radio { position: relative; width: min(100%, 980px); aspect-ratio: 2368 / 1760; min-height: 0; margin: 28px auto 0; padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; }\n    .radio-tuning .rt-shell { position: relative; }\n    .radio-tuning .rt-radio-art { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: contain; pointer-events: none; image-rendering: auto; }\n    .radio-tuning .rt-radio-top { position: absolute; inset: 0; z-index: 2; display: block; }\n    .radio-tuning .rt-speaker { display: none; }\n    .radio-tuning .rt-screen { position: absolute; top: 25%; right: 9%; width: 39%; height: 15%; min-height: 0; padding: 0; border: 0; background: transparent; box-shadow: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; line-height: 1; font-family: inherit; }\n    .radio-tuning .rt-tracker { position: absolute; inset: 0; z-index: 3; display: block; margin: 0; pointer-events: none; }\n    .radio-tuning .rt-dial { --pivot-x: 49.27%; --pivot-y: 57.05%; position: absolute; top: 29.5%; left: 8%; width: 40%; aspect-ratio: 1032 / 944; margin: 0; padding: 0; border: 0; outline: 0; background: transparent; box-shadow: none; pointer-events: auto; appearance: none; }\n    .radio-tuning .rt-dial:focus, .radio-tuning .rt-dial:focus-visible { outline: 0; }\n    .radio-tuning .rt-dial-art { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; object-fit: contain; pointer-events: none; image-rendering: auto; }\n    .radio-tuning .rt-dial::before { inset: auto; top: var(--pivot-y); left: var(--pivot-x); width: 84%; height: 84%; z-index: 2; transform: translate(-50%, -50%); }\n    .radio-tuning .rt-needle { top: var(--pivot-y); left: var(--pivot-x); bottom: auto; z-index: 3; height: 35%; margin-left: -2.5px; background: #ef4b43; box-shadow: 0 0 8px rgba(239, 75, 67, .72); transform-origin: 50% 0; transform: rotate(calc(180deg + var(--needle-angle))); }\n    .radio-tuning .rt-hub { display: none; }\n    .radio-tuning .rt-dashboard-hold { position: absolute; top: 70%; left: 10%; z-index: 5; width: 34%; padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; font-family: inherit; pointer-events: none; }\n    .radio-tuning .rt-dashboard-hold .rt-hold-label { justify-content: center; gap: 16px; font-size: 11px; line-height: 1.2; white-space: nowrap; }\n    .radio-tuning .rt-dashboard-hold .rt-hold-track { width: 48%; height: 10px; margin: 5px auto 0; }\n    .radio-tuning .rt-panel { position: absolute; top: 42%; right: 10%; width: 37%; min-width: 0; padding: 0; border: 0; background: transparent; }\n    .radio-tuning .rt-frequency { margin-bottom: 10px; font-size: clamp(22px, 4vw, 36px); }\n    .radio-tuning .rt-instruction { margin-top: 12px; font-size: 11px; line-height: 1.45; }\n    .radio-tuning .rt-status { min-height: 0; margin-top: 8px; font-size: 11px; line-height: 1.35; }\n    .radio-tuning .rt-result { position: absolute; inset: 31% 14% auto; z-index: 6; margin: 0; padding: 20px 18px; }\n    @media (max-width: 650px) { .radio-tuning .rt-radio { width: 100%; } .radio-tuning .rt-screen { top: 23%; right: 8%; width: 40%; height: 15%; } .radio-tuning .rt-dial { top: 31%; left: 6%; width: 42%; } .radio-tuning .rt-dashboard-hold { top: 72%; left: 8%; width: 36%; } .radio-tuning .rt-panel { top: 41%; right: 8%; width: 40%; } .radio-tuning .rt-instruction { font-size: 10px; } }\n\n    /* \u54CD\u5E94\u5F0F\u4FEE\u6B63\uFF1A\u6574\u673A\u540C\u65F6\u53D7\u5C4F\u5E55\u5BBD\u5EA6\u4E0E\u53EF\u7528\u9AD8\u5EA6\u9650\u5236\uFF0C\u907F\u514D\u6A2A\u5C4F\u5C0F\u9AD8\u5EA6\u8BBE\u5907\u88AB\u821E\u53F0\u88C1\u6389\u3002 */\n    .radio-tuning {\n      display: grid;\n      place-items: center;\n      overflow: hidden;\n      padding: clamp(8px, 2vw, 20px);\n    }\n    .radio-tuning .rt-shell {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      gap: clamp(4px, 1vh, 10px);\n      width: min(860px, 100%);\n      height: 100%;\n      min-height: 0;\n      overflow: hidden;\n      padding: clamp(8px, 2.5vw, 24px);\n    }\n    .radio-tuning .rt-title { font-size: clamp(22px, 4.2vw, 46px); }\n    .radio-tuning .rt-subtitle { margin: 4px 0 0; line-height: 1.35; }\n    .radio-tuning .rt-radio {\n      flex: 0 0 auto;\n      width: min(100%, calc((100vh - 190px) * 1.3454545));\n      max-height: calc(100vh - 190px);\n      margin-top: clamp(8px, 1.5vh, 18px);\n    }\n    @supports (height: 100dvh) {\n      .radio-tuning .rt-radio {\n        width: min(100%, calc((100dvh - 190px) * 1.3454545));\n        max-height: calc(100dvh - 190px);\n      }\n    }\n    @media (max-width: 650px), (max-height: 560px) {\n      .radio-tuning { padding: 6px; }\n      .radio-tuning .rt-shell { padding: 6px; gap: 3px; }\n      .radio-tuning .rt-kicker { margin-bottom: 2px; font-size: 9px; }\n      .radio-tuning .rt-title { font-size: clamp(19px, 7vw, 30px); }\n      .radio-tuning .rt-subtitle { max-width: 62ch; font-size: 11px; line-height: 1.25; }\n      .radio-tuning .rt-radio {\n        width: min(100%, calc((100vh - 160px) * 1.3454545));\n        max-height: calc(100vh - 160px);\n        margin-top: 6px;\n      }\n    }\n    @supports (height: 100dvh) {\n      @media (max-width: 650px), (max-height: 560px) {\n        .radio-tuning .rt-radio {\n          width: min(100%, calc((100dvh - 160px) * 1.3454545));\n          max-height: calc(100dvh - 160px);\n        }\n      }\n    }\n    @supports (width: 1cqw) {\n      .radio-tuning { container-type: size; }\n      .radio-tuning .rt-kicker { font-size: clamp(9px, 1cqw, 12px); }\n      .radio-tuning .rt-title { font-size: clamp(15px, 4cqw, 46px); }\n      .radio-tuning .rt-subtitle { font-size: clamp(8px, 1.35cqw, 16px); }\n      .radio-tuning .rt-radio {\n        width: min(100%, calc((100cqh - 170px) * 1.3454545));\n        max-height: calc(100cqh - 170px);\n      }\n    }\n    @container (max-height: 320px) {\n      .radio-tuning .rt-shell { padding: 3px; gap: 2px; }\n      .radio-tuning .rt-kicker,\n      .radio-tuning .rt-subtitle { display: none; }\n      .radio-tuning .rt-title { font-size: clamp(14px, 5cqw, 24px); }\n      .radio-tuning .rt-radio {\n        width: min(100%, calc((100cqh - 24px) * 1.3454545));\n        max-height: calc(100cqh - 24px);\n        margin-top: 2px;\n      }\n    }\n  ";
  var TEMPLATE = "\n    <section class=\"rt-shell\" aria-live=\"polite\">\n      <p class=\"rt-kicker\">E-0008 \xB7 Signal Tracking</p>\n      <h1 class=\"rt-title\">\u52A8\u6001\u8303\u56F4\u8C03\u9891</h1>\n      <p class=\"rt-subtitle\">\u7EFF\u8272\u9891\u6BB5\u4F1A\u4E0D\u65AD\u79FB\u52A8\u3002\u63A7\u5236\u6307\u9488\u8DDF\u968F\u5B83\uFF0C\u5E76\u8FDE\u7EED\u7A33\u5B9A 3 \u79D2\uFF0C\u5C1D\u8BD5\u89E3\u7801\u8FD9\u53F0\u6536\u97F3\u673A\u91CC\u7684\u5E7F\u64AD\u3002</p>\n      <section class=\"rt-radio\" aria-label=\"\u52A8\u6001\u8303\u56F4\u6536\u97F3\u673A\">\n        <img class=\"rt-radio-art\" data-radio-art alt=\"\" draggable=\"false\">\n        <div class=\"rt-radio-top\">\n          <div class=\"rt-speaker\" aria-hidden=\"true\"></div>\n            <div class=\"rt-screen\"><strong class=\"rt-screen-value\" data-screen>\u672A\u6355\u83B7</strong></div>\n        </div>\n        <div class=\"rt-tracker\">\n          <button class=\"rt-dial\" type=\"button\" data-dial aria-label=\"\u8C03\u9891\u5706\u76D8\uFF0C\u4F7F\u7528\u65B9\u5411\u952E\u6216 A\u3001D \u952E\u63A7\u5236\">\n            <img class=\"rt-dial-art\" data-dial-art alt=\"\" draggable=\"false\">\n            <span class=\"rt-needle\" aria-hidden=\"true\"></span><span class=\"rt-hub\" aria-hidden=\"true\">\u6307\u9488</span>\n          </button>\n          <div class=\"rt-dashboard-hold\" aria-label=\"\u6301\u7EED\u65F6\u95F4\">\n            <div class=\"rt-hold-label\"><span>\u6301\u7EED\u65F6\u95F4</span><span data-hold-time>0.0 / 3.0 \u79D2</span></div>\n            <div class=\"rt-hold-track\"><div class=\"rt-hold-fill\" data-hold-fill></div></div>\n          </div>\n          <div class=\"rt-panel\">\n            <p class=\"rt-frequency\" data-frequency>87.5 MHz</p>\n            <p class=\"rt-instruction\">\u4F7F\u7528\u952E\u76D8\u8C03\u8282\u9891\u7387<br><kbd>\u2190</kbd><kbd>\u2192</kbd> \u6216 <kbd>A</kbd><kbd>D</kbd></p>\n            <p class=\"rt-status\" data-status>\u8BA9\u6307\u9488\u8FDB\u5165\u7EFF\u8272\u9891\u6BB5\u3002</p>\n          </div>\n        </div>\n      </section>\n      <section class=\"rt-result\" data-result hidden>\n        <h2>\u4FE1\u53F7\u6355\u83B7\u6210\u529F</h2><p>\u6307\u9488\u7A33\u5B9A\u8FBE\u6210\uFF0C\u6B63\u5728\u8BFB\u53D6\u5E7F\u64AD\u2026\u2026</p>\n      </section>\n    </section>\n  ";
  function normalize(angle) {
    return (angle + 360) % 360;
  }
  function angleDistance(left, right) {
    var difference = Math.abs(left - right);
    return Math.min(difference, 360 - difference);
  }
  function run(context) {
    if (!context.stage) return Promise.resolve(null);
    var root = document.createElement("div");
    root.className = "radio-tuning";
    root.innerHTML = "<style>".concat(STYLE_TEXT, "</style>").concat(TEMPLATE);
    var assetPath = function assetPath(relativePath, filename) {
      return Game.assetUrl(context.assetBase ? "".concat(context.assetBase, "/").concat(relativePath) : "assets/ui/radio-tuning/".concat(filename));
    };
    root.querySelector("[data-radio-art]").src = assetPath("ui/radio-tuning/radio-base.webp", "radio-base.webp");
    root.querySelector("[data-dial-art]").src = assetPath("ui/radio-tuning/dashboard.webp", "dashboard.webp");
    context.stage.append(root);
    var dial = root.querySelector("[data-dial]");
    if (document.documentMode) {
      dial.style.width = "330px";
      dial.style.height = "330px";
      root.querySelector(".rt-radio-top").style.display = "flex";
    }
    var screen = root.querySelector("[data-screen]");
    var frequencyReadout = root.querySelector("[data-frequency]");
    var holdTime = root.querySelector("[data-hold-time]");
    var holdFill = root.querySelector("[data-hold-fill]");
    var status = root.querySelector("[data-status]");
    var result = root.querySelector("[data-result]");
    var pointerAngle = 0;
    var pointerDisplayAngle = 0;
    var rangeCenter = 0;
    var rangeSpeed = 0;
    var nextDirectionChange = 0;
    var heldFor = 0;
    var lastFrame = 0;
    var animationFrame = 0;
    var resolved = false;
    var resolveFinish;
    var finished = new Promise(function (resolve) {
      resolveFinish = resolve;
    });
    function isPointerInside() {
      return angleDistance(pointerAngle, rangeCenter) <= RANGE_SPAN / 2;
    }
    function formatFrequency(angle) {
      var ratio = normalize(angle) / 360;
      var frequency = FM_FREQUENCY_MIN_MHZ + ratio * (FM_FREQUENCY_MAX_MHZ - FM_FREQUENCY_MIN_MHZ);
      return "".concat(frequency.toFixed(1), " MHz");
    }
    function render(inside) {
      var rangeStart = normalize(rangeCenter - RANGE_SPAN / 2);
      dial.style.setProperty("--needle-angle", "".concat(pointerDisplayAngle, "deg"));
      dial.style.setProperty("--range-start", "".concat(rangeStart, "deg"));
      dial.style.setProperty("--range-span", "".concat(RANGE_SPAN, "deg"));
      if (document.documentMode) {
        var needle = dial.querySelector(".rt-needle");
        if (needle) needle.style.transform = "rotate(".concat(180 + pointerDisplayAngle, "deg)");
      }
      dial.classList.toggle("in-range", inside);
      frequencyReadout.textContent = formatFrequency(pointerAngle);
      var progress = Math.min(1, heldFor / HOLD_DURATION);
      holdFill.style.width = "".concat(progress * 100, "%");
      holdTime.textContent = "".concat((heldFor / 1000).toFixed(1), " / 3.0 \u79D2");
      screen.textContent = inside ? "\u9501\u5B9A ".concat((progress * 100).toFixed(0), "%") : "未捕获";
      status.classList.toggle("stable", inside);
      status.textContent = inside ? "信号稳定，继续跟随绿色频段。" : "让指针进入绿色频段；离开范围会重新计时。";
    }
    function randomizeRangeMotion(now) {
      var direction = Math.random() > .5 ? 1 : -1;
      rangeSpeed = direction * (44 + Math.random() * 32) * RANGE_SPEED_SCALE;
      nextDirectionChange = now + 450 + Math.random() * 850;
    }
    function finish() {
      return _finish.apply(this, arguments);
    }
    function _finish() {
      _finish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!resolved) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              resolved = true;
              cancelAnimationFrame(animationFrame);
              holdFill.style.width = "100%";
              holdTime.textContent = "3.0 / 3.0 秒";
              screen.textContent = "SIGNAL LOCKED";
              status.classList.add("stable");
              status.textContent = "稳定时间达成，正在解码广播……";
              result.hidden = false;
              _context.n = 2;
              return context.wait(720);
            case 2:
              resolveFinish([{
                type: "setFlag",
                key: RESULT_FLAG,
                value: true
              }, {
                type: "setFlag",
                key: "radio_07_done",
                value: true
              }]);
            case 3:
              return _context.a(2);
          }
        }, _callee);
      }));
      return _finish.apply(this, arguments);
    }
    function tick(now) {
      if (resolved) return;
      // 先排下一帧：即使某次渲染意外抛错，循环也不会静默死在当前回调里。
      animationFrame = requestAnimationFrame(tick);
      var elapsed = Math.min(80, now - lastFrame);
      lastFrame = now;
      if (now >= nextDirectionChange) randomizeRangeMotion(now);
      rangeCenter += rangeSpeed * elapsed / 1000;
      if (rangeCenter <= RANGE_TRAVEL_MIN) {
        rangeCenter = RANGE_TRAVEL_MIN;
        rangeSpeed = Math.abs(rangeSpeed);
      } else if (rangeCenter >= RANGE_TRAVEL_MAX) {
        rangeCenter = RANGE_TRAVEL_MAX;
        rangeSpeed = -Math.abs(rangeSpeed);
      }
      var inside = isPointerInside();
      heldFor = inside ? heldFor + elapsed : 0;
      render(inside);
      if (heldFor >= HOLD_DURATION) void finish();
    }
    function rotate(direction) {
      if (resolved) return;
      pointerAngle = normalize(pointerAngle + direction * POINTER_STEP);
      pointerDisplayAngle += direction * POINTER_STEP;
      render(isPointerInside());
    }
    function onKeydown(event) {
      var key = event.key.toLowerCase();
      if (!["arrowleft", "arrowright", "a", "d"].includes(key)) return;
      event.preventDefault();
      rotate(key === "arrowright" || key === "d" ? 1 : -1);
    }
    function onDialClick() {
      dial.focus();
    }
    context.onQuit(function () {
      if (resolved) return null;
      resolved = true;
      cancelAnimationFrame(animationFrame);
      return [{
        type: "setFlag",
        key: RESULT_FLAG,
        value: false
      }, {
        type: "setFlag",
        key: "radio_07_done",
        value: false
      }];
    });
    context.registerCleanup(function () {
      cancelAnimationFrame(animationFrame);
      root.removeEventListener("keydown", onKeydown);
      dial.removeEventListener("click", onDialClick);
      root.remove();
    });
    root.addEventListener("keydown", onKeydown);
    dial.addEventListener("click", onDialClick);
    pointerAngle = 0;
    rangeCenter = 82 + Math.random() * 80;
    randomizeRangeMotion(performance.now());
    lastFrame = performance.now();
    render(false);
    dial.focus();
    animationFrame = requestAnimationFrame(tick);
    return finished;
  }
  Game.Minigames.register("radio_tuning", {
    title: "收音机调频",
    run: run
  });
})(window.TrainGame);
