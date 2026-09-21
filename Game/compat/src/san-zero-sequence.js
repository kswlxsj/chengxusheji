function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game, _Game$ENDING_CATALOG$) {
  "use strict";

  var DEFAULT_ASSETS = {
    broadcast: "assets/Image/Scene/Background/san-zero-broadcast.ie.jpg",
    hospital: "assets/Image/Scene/Background/san-zero-hospital.ie.jpg",
    closeup: "assets/Image/Scene/Background/san-zero-closeup.ie.jpg",
    closeupSmile: "assets/Image/Scene/Background/san-zero-closeup-smile.ie.jpg",
    doctor: "assets/Image/Portrait/doctor.ie.png",
    pcScared: "assets/Image/Portrait/player-scared.ie.png",
    pcCrazy: "assets/Image/Portrait/player-crazy.ie.png"
  };
  var SCREAM_TEXT = "我不想死我不想死我不想死我不想死我不想死我不想死我不想死我不想死我不想死我不想死" + "我不想死我不想死我不想死我不想死我不想死我不想死——";
  var IMAGE_LOAD_TIMEOUT_MS = 12000;
  var ENDING_TITLE = ((_Game$ENDING_CATALOG$ = Game.ENDING_CATALOG.find(function (ending) {
    return ending.id === "san";
  })) === null || _Game$ENDING_CATALOG$ === void 0 ? void 0 : _Game$ENDING_CATALOG$.title) || "SAN 归零演出";
  function createElement(tagName, className) {
    var textContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }
  function waitForImage(image) {
    if (image.complete) return Promise.resolve();
    return new Promise(function (resolve) {
      var settled = false;
      var _finish = function finish() {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        image.removeEventListener("load", _finish);
        image.removeEventListener("error", _finish);
        resolve();
      };
      var timeout = setTimeout(_finish, IMAGE_LOAD_TIMEOUT_MS);
      image.addEventListener("load", _finish, {
        once: true
      });
      image.addEventListener("error", _finish, {
        once: true
      });
    });
  }
  var SanZeroSequence = /*#__PURE__*/function () {
    function SanZeroSequence() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, SanZeroSequence);
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.assets = _objectSpread(_objectSpread({}, DEFAULT_ASSETS), options.assets || {});
      this.backgroundAudio = options.backgroundAudio || null;
      this.timers = new Set();
      this.snowFrame = null;
      this.resolveAdvance = null;
      this.running = null;
      this.overlay = createElement("section", "san-zero-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
      this.cinema = createElement("div", "san-zero-cinema");
      this.backgroundPrimary = createElement("img", "san-zero-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "san-zero-background");
      this.backgroundSecondary.alt = "";
      this.vignette = createElement("div", "san-zero-vignette");
      this.portrait = createElement("img", "san-zero-portrait");
      this.portrait.alt = "";
      this.portrait.hidden = true;
      this.snow = createElement("canvas", "san-zero-snow");
      this.snow.width = 192;
      this.snow.height = 108;
      this.snow.hidden = true;
      this.cinema.append(this.backgroundPrimary, this.backgroundSecondary, this.vignette, this.portrait, this.snow);
      this.dialogue = createElement("div", "san-zero-dialogue");
      this.speaker = createElement("div", "san-zero-speaker");
      this.line = createElement("p", "san-zero-line");
      this.hint = createElement("span", "san-zero-hint", "点击继续");
      this.dialogue.append(this.speaker, this.line, this.hint);
      this.scream = createElement("div", "san-zero-scream");
      this.overlay.append(this.cinema, this.dialogue, this.scream);
      this.handleAdvance = function (event) {
        if (!_this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        if (event.type === "click") event.preventDefault();
        if (event.type === "keydown") event.preventDefault();
        var resolve = _this.resolveAdvance;
        _this.resolveAdvance = null;
        resolve();
      };
      this.handleResize = function () {
        return _this.alignPortraitToDialogue();
      };
      window.addEventListener("resize", this.handleResize);
    }
    return _createClass(SanZeroSequence, [{
      key: "play",
      value: function play() {
        var _this2 = this;
        if (this.running) return this.running;
        this.running = this.run().finally(function () {
          return _this2.close();
        });
        return this.running;
      }
    }, {
      key: "run",
      value: function () {
        var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var beats, _i, _beats, beat;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                this.root.append(this.overlay);
                this.speaker.hidden = true;
                this.line.textContent = "正在载入……";
                this.dialogue.classList.add("is-visible");
                this.overlay.classList.add("is-visible", "is-loading");
                _context.n = 1;
                return this.preload();
              case 1:
                this.overlay.classList.remove("is-loading");
                this.playEndingMusic("ending_san0", 4200);
                this.dialogue.classList.remove("is-visible");
                this.setBackground("broadcast", true);
                _context.n = 2;
                return this.delay(500);
              case 2:
                beats = [{
                  speaker: "新闻播报",
                  text: "今日，我市突发恶性事件。一伙极端分子在列车车厢内持刀行凶，血案骤起，同车乘客在极度惊恐中大面积精神崩溃。",
                  background: "broadcast"
                }, {
                  speaker: "新闻播报",
                  text: "以下是本台记者带来的现场采访。",
                  background: "broadcast"
                }, {
                  speaker: "记者",
                  text: "医生，请问目前这些患者的状态如何？预计多久能够恢复？",
                  background: "hospital"
                }, {
                  speaker: "医生",
                  text: "患者们受到的刺激过于强烈，目前精神仍处于极不稳定的状态。有人时而癫狂嘶喊，有人整日喃喃自语。我们正在全力救治，但恢复时间……目前还无法给出准确判断。",
                  background: "hospital",
                  portrait: "doctor",
                  portraitType: "doctor"
                }, {
                  text: "PC蜷缩在角落，浑身剧烈颤抖，瞳孔涣散。他死死盯着镜头后方某个不存在的方向，像在看着什么逼近的东西。",
                  background: "closeup"
                }, {
                  text: "别过来！别过来……啊！",
                  background: "closeup",
                  portrait: "pcScared",
                  portraitType: "pc"
                }, {
                  text: "他突然抱住自己的头，指甲嵌进头皮，声音陡然拔高，变成一连串失控的嘶喊——",
                  background: "closeup",
                  portrait: "pcScared",
                  portraitType: "pc"
                }];
                _i = 0, _beats = beats;
              case 3:
                if (!(_i < _beats.length)) {
                  _context.n = 5;
                  break;
                }
                beat = _beats[_i];
                _context.n = 4;
                return this.showLine(beat);
              case 4:
                _i++;
                _context.n = 3;
                break;
              case 5:
                _context.n = 6;
                return this.showScream();
              case 6:
                _context.n = 7;
                return this.showLine({
                  text: "放过我吧！谁来救救我！",
                  background: "closeup",
                  portrait: "pcScared",
                  portraitType: "pc"
                });
              case 7:
                _context.n = 8;
                return this.showLine({
                  text: "他忽然停止了一切动作，缓缓抬起头，目光精准地穿过镜头——像终于找到了什么。",
                  background: "closeup"
                });
              case 8:
                this.stopEndingMusic(1600);
                _context.n = 9;
                return this.showLine({
                  text: "嘴角一点点咧开，露出一个过于正常的笑容。",
                  background: "closeupSmile"
                });
              case 9:
                _context.n = 10;
                return this.showLine({
                  text: "……找到了。",
                  background: "closeupSmile",
                  portrait: "pcCrazy",
                  portraitType: "pc"
                });
              case 10:
                _context.n = 11;
                return this.showFreezeAndSnow();
              case 11:
                return _context.a(2);
            }
          }, _callee, this);
        }));
        function run() {
          return _run.apply(this, arguments);
        }
        return run;
      }()
    }, {
      key: "preload",
      value: function () {
        var _preload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var images;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                images = Object.values(this.assets).map(function (source) {
                  var image = new Image();
                  image.src = source;
                  return waitForImage(image);
                });
                _context2.n = 1;
                return Promise.all(images);
              case 1:
                return _context2.a(2);
            }
          }, _callee2, this);
        }));
        function preload() {
          return _preload.apply(this, arguments);
        }
        return preload;
      }()
    }, {
      key: "setBackground",
      value: function () {
        var _setBackground = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(name) {
          var immediate,
            source,
            current,
            next,
            _args3 = arguments;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                immediate = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                source = this.assets[name];
                if (source) {
                  _context3.n = 1;
                  break;
                }
                throw new Error("SAN \u5F52\u96F6\u6F14\u51FA\u7F3A\u5C11\u80CC\u666F\uFF1A".concat(name));
              case 1:
                current = this.backgroundPrimary.classList.contains("is-active") ? this.backgroundPrimary : this.backgroundSecondary;
                next = current === this.backgroundPrimary ? this.backgroundSecondary : this.backgroundPrimary;
                if (!(next.src !== new URL(source, document.baseURI).href)) {
                  _context3.n = 2;
                  break;
                }
                next.src = source;
                _context3.n = 2;
                return waitForImage(next);
              case 2:
                next.classList.add("is-active");
                if (!immediate) {
                  _context3.n = 3;
                  break;
                }
                current.classList.remove("is-active");
                return _context3.a(2);
              case 3:
                _context3.n = 4;
                return this.delay(120);
              case 4:
                current.classList.remove("is-active");
                _context3.n = 5;
                return this.delay(620);
              case 5:
                return _context3.a(2);
            }
          }, _callee3, this);
        }));
        function setBackground(_x) {
          return _setBackground.apply(this, arguments);
        }
        return setBackground;
      }()
    }, {
      key: "setPortrait",
      value: function () {
        var _setPortrait = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(name, type) {
          var wasVisible, source;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (name) {
                  _context4.n = 3;
                  break;
                }
                wasVisible = !this.portrait.hidden;
                this.portrait.classList.remove("is-visible");
                if (wasVisible) {
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2);
              case 1:
                _context4.n = 2;
                return this.delay(220);
              case 2:
                this.portrait.hidden = true;
                return _context4.a(2);
              case 3:
                source = this.assets[name];
                if (source) {
                  _context4.n = 4;
                  break;
                }
                throw new Error("SAN \u5F52\u96F6\u6F14\u51FA\u7F3A\u5C11\u7ACB\u7ED8\uFF1A".concat(name));
              case 4:
                this.portrait.classList.remove("is-visible");
                this.portrait.hidden = false;
                this.portrait.classList.toggle("is-doctor", type === "doctor");
                this.portrait.classList.toggle("is-pc", type === "pc");
                if (!(this.portrait.src !== new URL(source, document.baseURI).href)) {
                  _context4.n = 5;
                  break;
                }
                this.portrait.src = source;
                _context4.n = 5;
                return waitForImage(this.portrait);
              case 5:
                this.portrait.classList.add("is-visible");
              case 6:
                return _context4.a(2);
            }
          }, _callee4, this);
        }));
        function setPortrait(_x2, _x3) {
          return _setPortrait.apply(this, arguments);
        }
        return setPortrait;
      }()
    }, {
      key: "showLine",
      value: function () {
        var _showLine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref) {
          var _this3 = this;
          var _ref$speaker, speaker, _ref$text, text, background, _ref$portrait, portrait, _ref$portraitType, portraitType;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _ref$speaker = _ref.speaker, speaker = _ref$speaker === void 0 ? "" : _ref$speaker, _ref$text = _ref.text, text = _ref$text === void 0 ? "" : _ref$text, background = _ref.background, _ref$portrait = _ref.portrait, portrait = _ref$portrait === void 0 ? null : _ref$portrait, _ref$portraitType = _ref.portraitType, portraitType = _ref$portraitType === void 0 ? "" : _ref$portraitType;
                if (!background) {
                  _context5.n = 1;
                  break;
                }
                _context5.n = 1;
                return this.setBackground(background);
              case 1:
                _context5.n = 2;
                return this.setPortrait(portrait, portraitType);
              case 2:
                this.speaker.textContent = speaker;
                this.speaker.hidden = !speaker;
                this.line.textContent = text;
                this.dialogue.classList.add("is-visible");
                this.alignPortraitToDialogue();
                requestAnimationFrame(function () {
                  return _this3.alignPortraitToDialogue();
                });
                this.overlay.classList.add("is-waiting");
                this.overlay.addEventListener("click", this.handleAdvance);
                document.addEventListener("keydown", this.handleAdvance);
                _context5.n = 3;
                return new Promise(function (resolve) {
                  _this3.resolveAdvance = resolve;
                });
              case 3:
                this.overlay.removeEventListener("click", this.handleAdvance);
                document.removeEventListener("keydown", this.handleAdvance);
                this.overlay.classList.remove("is-waiting");
                this.dialogue.classList.remove("is-visible");
                _context5.n = 4;
                return this.setPortrait(null);
              case 4:
                return _context5.a(2);
            }
          }, _callee5, this);
        }));
        function showLine(_x4) {
          return _showLine.apply(this, arguments);
        }
        return showLine;
      }()
    }, {
      key: "showScream",
      value: function () {
        var _showScream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                this.dialogue.classList.remove("is-visible");
                _context6.n = 1;
                return this.setPortrait(null);
              case 1:
                this.scream.textContent = SCREAM_TEXT;
                this.overlay.classList.add("is-screaming");
                this.scream.classList.add("is-visible");
                _context6.n = 2;
                return this.delay(3000);
              case 2:
                this.scream.classList.remove("is-visible");
                this.overlay.classList.remove("is-screaming");
                _context6.n = 3;
                return this.delay(320);
              case 3:
                return _context6.a(2);
            }
          }, _callee6, this);
        }));
        function showScream() {
          return _showScream.apply(this, arguments);
        }
        return showScream;
      }()
    }, {
      key: "showFreezeAndSnow",
      value: function () {
        var _showFreezeAndSnow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var _this4 = this;
          var context, pixels, _renderNoise;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return this.setPortrait(null);
              case 1:
                this.overlay.classList.add("is-frozen");
                _context7.n = 2;
                return this.delay(700);
              case 2:
                this.dialogue.classList.remove("is-visible");
                this.snow.hidden = false;
                context = this.snow.getContext("2d", {
                  alpha: false
                });
                pixels = context.createImageData(this.snow.width, this.snow.height);
                _renderNoise = function renderNoise() {
                  for (var index = 0; index < pixels.data.length; index += 4) {
                    var value = Math.random() > 0.48 ? 215 + Math.floor(Math.random() * 41) : Math.floor(Math.random() * 91);
                    pixels.data[index] = value;
                    pixels.data[index + 1] = value;
                    pixels.data[index + 2] = value;
                    pixels.data[index + 3] = 255;
                  }
                  context.putImageData(pixels, 0, 0);
                  _this4.snowFrame = requestAnimationFrame(_renderNoise);
                };
                _renderNoise();
                _context7.n = 3;
                return this.delay(720);
              case 3:
                cancelAnimationFrame(this.snowFrame);
                this.snowFrame = null;
                this.overlay.classList.add("is-flashing");
                _context7.n = 4;
                return this.delay(90);
              case 4:
                this.overlay.classList.remove("is-flashing");
                _context7.n = 5;
                return this.delay(180);
              case 5:
                return _context7.a(2);
            }
          }, _callee7, this);
        }));
        function showFreezeAndSnow() {
          return _showFreezeAndSnow.apply(this, arguments);
        }
        return showFreezeAndSnow;
      }()
    }, {
      key: "playEndingMusic",
      value: function playEndingMusic(sound) {
        var _this$backgroundAudio, _this$backgroundAudio2;
        var fadeMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
        (_this$backgroundAudio = this.backgroundAudio) === null || _this$backgroundAudio === void 0 || (_this$backgroundAudio2 = _this$backgroundAudio.setTrack) === null || _this$backgroundAudio2 === void 0 || _this$backgroundAudio2.call(_this$backgroundAudio, sound, {
          fadeMs: fadeMs
        });
      }
    }, {
      key: "stopEndingMusic",
      value: function stopEndingMusic() {
        var _this$backgroundAudio3, _this$backgroundAudio4;
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        (_this$backgroundAudio3 = this.backgroundAudio) === null || _this$backgroundAudio3 === void 0 || (_this$backgroundAudio4 = _this$backgroundAudio3.stopAll) === null || _this$backgroundAudio4 === void 0 || _this$backgroundAudio4.call(_this$backgroundAudio3, {
          duration: duration
        });
      }
    }, {
      key: "delay",
      value: function delay(milliseconds) {
        var _this5 = this;
        return new Promise(function (resolve) {
          var timer = {
            handle: null,
            resolve: resolve
          };
          timer.handle = setTimeout(function () {
            _this5.timers.delete(timer);
            resolve();
          }, milliseconds);
          _this5.timers.add(timer);
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _iterator = _createForOfIteratorHelper(this.timers),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var timer = _step.value;
            clearTimeout(timer.handle);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.timers.clear();
        if (this.snowFrame !== null) cancelAnimationFrame(this.snowFrame);
        this.snowFrame = null;
        this.stopEndingMusic(900);
        this.overlay.removeEventListener("click", this.handleAdvance);
        document.removeEventListener("keydown", this.handleAdvance);
        window.removeEventListener("resize", this.handleResize);
        this.resolveAdvance = null;
        this.overlay.remove();
        this.running = null;
      }
    }, {
      key: "alignPortraitToDialogue",
      value: function alignPortraitToDialogue() {
        if (this.portrait.hidden || !this.dialogue.classList.contains("is-visible")) return;
        var stageRect = this.root.getBoundingClientRect();
        var dialogueRect = this.dialogue.getBoundingClientRect();
        var bottom = Math.max(0, stageRect.bottom - dialogueRect.top);
        this.portrait.style.bottom = "".concat(bottom, "px");
      }
    }]);
  }();
  Game.SanZeroSequence = SanZeroSequence;
  Game.playSanZeroSequence = function (options) {
    return new SanZeroSequence(options).play();
  };
})(window.TrainGame);
