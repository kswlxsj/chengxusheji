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
    frontCarriage: "assets/Image/Scene/Background/front-carriage.ie.jpg",
    memory: "assets/Image/Scene/Background/op-01.ie.jpg",
    trueEndVideo: "assets/video/trueend.mp4",
    terminalPlatform: "assets/Image/Scene/Background/true-end-platform.ie.jpg",
    welcome: "assets/Image/Scene/Background/welcome.ie.jpg",
    conductorSmile: "assets/Image/Portrait/conductor.ie.png",
    pcHappy: "assets/Image/Portrait/player-happy.ie.png"
  };
  var IMAGE_LOAD_TIMEOUT_MS = 12000;
  var ENDING_TITLE = ((_Game$ENDING_CATALOG$ = Game.ENDING_CATALOG.find(function (ending) {
    return ending.id === "true_end";
  })) === null || _Game$ENDING_CATALOG$ === void 0 ? void 0 : _Game$ENDING_CATALOG$.title) || "真结局";
  function createElement(tagName, className) {
    var textContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }
  function waitForImage(image) {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var settled = false;
      var finish = function finish(error) {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        image.removeEventListener("load", handleLoad);
        image.removeEventListener("error", handleError);
        if (error) reject(error);else resolve();
      };
      var handleLoad = function handleLoad() {
        return finish();
      };
      var handleError = function handleError() {
        return finish(new Error("\u771F\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A".concat(image.src)));
      };
      var timeout = setTimeout(function () {
        return finish(new Error("\u771F\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(image.src)));
      }, IMAGE_LOAD_TIMEOUT_MS);
      image.addEventListener("load", handleLoad, {
        once: true
      });
      image.addEventListener("error", handleError, {
        once: true
      });
    });
  }
  var EndingASequence = /*#__PURE__*/function () {
    function EndingASequence() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, EndingASequence);
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.audio = options.audio || null;
      this.backgroundAudio = options.backgroundAudio || null;
      this.preserveBackgroundAudio = options.preserveBackgroundAudio === true;
      this.assets = _objectSpread(_objectSpread({}, DEFAULT_ASSETS), options.assets || {});
      this.timers = new Set();
      this.resolveAdvance = null;
      this.autoAdvanceTimer = null;
      this.running = null;
      this.speedVoice = null;
      this.overlay = createElement("section", "ending-a-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
      this.cinema = createElement("div", "ending-a-cinema");
      this.backgroundPrimary = createElement("img", "ending-a-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "ending-a-background");
      this.backgroundSecondary.alt = "";
      this.video = createElement("video", "ending-a-video");
      this.video.src = this.assets.trueEndVideo;
      this.video.playsInline = true;
      this.video.preload = "auto";
      this.video.setAttribute("aria-hidden", "true");
      this.portrait = createElement("img", "ending-a-portrait");
      this.portrait.alt = "";
      this.portrait.hidden = true;
      this.cinema.append(this.backgroundPrimary, this.backgroundSecondary, this.video, this.portrait);
      this.dialogue = createElement("div", "ending-a-dialogue");
      this.speaker = createElement("p", "ending-a-speaker");
      this.speaker.hidden = true;
      this.line = createElement("p", "ending-a-line");
      this.hint = createElement("span", "ending-a-hint", "点击继续");
      this.dialogue.append(this.speaker, this.line, this.hint);
      this.white = createElement("div", "ending-a-white");
      this.blackout = createElement("div", "ending-a-blackout");
      this.overlay.append(this.cinema, this.white, this.blackout, this.dialogue);
      this.handleAdvance = function (event) {
        if (!_this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        _this.advance();
      };
      this.handleResize = function () {
        return _this.alignPortraitToDialogue();
      };
      window.addEventListener("resize", this.handleResize);
    }
    return _createClass(EndingASequence, [{
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
          var _this3 = this,
            _this$speedVoice,
            _this$speedVoice$stop;
          var clearMemory;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                this.root.append(this.overlay);
                this.overlay.classList.add("is-visible", "is-loading");
                _context.n = 1;
                return this.preload();
              case 1:
                this.overlay.classList.remove("is-loading");
                this.stopAudio();
                this.playEndingMusic("ending_he", 4200);
                _context.n = 2;
                return this.setBackground("frontCarriage", true);
              case 2:
                this.speedVoice = this.playSound("metro_speed_up", {
                  volume: 0.95
                });
                _context.n = 3;
                return this.showLine({
                  text: "你不顾乘务员反对，向上拉了拉杆。",
                  auto: 2400,
                  stageClass: "is-accelerating"
                });
              case 3:
                _context.n = 4;
                return this.fadeToWhite(2100);
              case 4:
                _context.n = 5;
                return this.showLine({
                  text: "你听到了列车加速的声音，震动着五脏六腑。",
                  auto: 3000
                });
              case 5:
                _context.n = 6;
                return this.showLine({
                  text: "陡然增加的加速度让你喘不过气，意识恍惚之际，脑海中突然闪过一些模糊的片段。",
                  auto: 4300
                });
              case 6:
                _context.n = 7;
                return this.setBackground("memory", true);
              case 7:
                this.overlay.classList.add("is-memory-blurred");
                _context.n = 8;
                return this.revealFromWhite(1700);
              case 8:
                clearMemory = this.delay(120).then(function () {
                  _this3.overlay.classList.remove("is-memory-blurred");
                  _this3.overlay.classList.add("is-memory-clear");
                });
                _context.n = 9;
                return this.showLine({
                  text: "眼前像蒙了一层雾，你努力想要看清。",
                  auto: 3600
                });
              case 9:
                _context.n = 10;
                return clearMemory;
              case 10:
                _context.n = 11;
                return this.showLine({
                  text: "——哦。原来是在回家的时候，在列车上抱怨的你自己。",
                  auto: 3800
                });
              case 11:
                this.overlay.classList.remove("is-memory-clear");
                this.overlay.classList.add("is-memory-blurred");
                _context.n = 12;
                return this.showLine({
                  text: "想到自己未经大脑许下的那个愿望，虽然现在还是喘不过气，但是你莫名其妙笑了出来。",
                  auto: 4400
                });
              case 12:
                _context.n = 13;
                return this.showLine({
                  text: "一边笑，一边咳嗽。",
                  auto: 2300
                });
              case 13:
                _context.n = 14;
                return this.showLine({
                  text: "明明是自己寻求的改变，到最后还是选择回到原来的生活。",
                  auto: 3900
                });
              case 14:
                (_this$speedVoice = this.speedVoice) === null || _this$speedVoice === void 0 || (_this$speedVoice$stop = _this$speedVoice.stop) === null || _this$speedVoice$stop === void 0 || _this$speedVoice$stop.call(_this$speedVoice);
                this.speedVoice = null;
                this.overlay.classList.remove("is-memory-blurred", "is-memory-clear");
                _context.n = 15;
                return this.playTrueEndVideo();
              case 15:
                _context.n = 16;
                return this.showLine({
                  text: "留下会不会更好，说不定这样反而能活下来。",
                  auto: 3300
                });
              case 16:
                _context.n = 17;
                return this.showLine({
                  text: "算了，没有下次了。",
                  auto: 2400
                });
              case 17:
                _context.n = 18;
                return this.showLine({
                  text: "所有的神，鬼，恶心的东西，或者美好的幻象，",
                  auto: 3600
                });
              case 18:
                _context.n = 19;
                return this.showLine({
                  text: "都去他的吧。",
                  auto: 2300
                });
              case 19:
                _context.n = 20;
                return this.showLine({
                  text: "不去试一下，怎么知道。",
                  auto: 3200
                });
              case 20:
                _context.n = 21;
                return this.fadeToBlack(1500);
              case 21:
                this.video.pause();
                this.video.classList.remove("is-visible");
                _context.n = 22;
                return this.setBackground("terminalPlatform", true);
              case 22:
                this.stopEndingMusic(1600);
                this.playEndingMusic("ending_he2", 4200);
                _context.n = 23;
                return this.revealFromBlack(1300);
              case 23:
                _context.n = 24;
                return this.showLine({
                  text: "你猛地惊醒。这是哪？",
                  auto: 2800
                });
              case 24:
                _context.n = 25;
                return this.showLine({
                  speaker: "列车员",
                  text: "您好，我们已经到终点站了，您好像睡着了。坐过站的话，可以坐另外一班回去。",
                  portrait: "conductorSmile"
                });
              case 25:
                _context.n = 26;
                return this.showLine({
                  text: "啊？哦，不用了，我从这里下就好。",
                  portrait: "pcHappy"
                });
              case 26:
                _context.n = 27;
                return this.showLine({
                  text: "你踉踉跄跄地走出了车厢，留下乘务员在背后担忧地望着你。",
                  auto: 3900
                });
              case 27:
                _context.n = 28;
                return this.showLine({
                  text: "新鲜空气涌入肺中的感觉前所未有的好。",
                  auto: 3300
                });
              case 28:
                _context.n = 29;
                return this.setBackground("welcome");
              case 29:
                _context.n = 30;
                return this.showLine({
                  text: "你活下来了。",
                  auto: 2200
                });
              case 30:
                _context.n = 31;
                return this.showLine({
                  text: "生活或许依旧没有什么改变，一样的无聊，重复，",
                  auto: 3600
                });
              case 31:
                _context.n = 32;
                return this.showLine({
                  text: "但你不讨厌。",
                  auto: 2200
                });
              case 32:
                _context.n = 33;
                return this.showLine({
                  text: "也许有什么东西悄悄地发生了变化，",
                  auto: 3200
                });
              case 33:
                _context.n = 34;
                return this.showLine({
                  text: "不管怎样，明天是崭新的一天。",
                  auto: 3800,
                  stageClass: "is-final"
                });
              case 34:
                _context.n = 35;
                return this.fadeToBlack(1100);
              case 35:
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
          var imageSources;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                imageSources = [this.assets.frontCarriage, this.assets.memory, this.assets.terminalPlatform, this.assets.welcome, this.assets.conductorSmile, this.assets.pcHappy];
                _context2.n = 1;
                return Promise.all(imageSources.map(function (source) {
                  var image = new Image();
                  image.src = source;
                  return waitForImage(image);
                }));
              case 1:
                // 视频会在前面的对白播放期间继续预载；不要让 35 MB 视频阻塞结局开场。
                this.video.load();
              case 2:
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
                throw new Error("\u771F\u7ED3\u5C40\u7F3A\u5C11\u80CC\u666F\uFF1A".concat(name));
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
                return this.delay(760);
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
        var _setPortrait = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(name) {
          var immediate,
            source,
            _args4 = arguments;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                immediate = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;
                if (name) {
                  _context4.n = 3;
                  break;
                }
                if (!this.portrait.hidden) {
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2);
              case 1:
                this.portrait.classList.remove("is-visible", "is-conductor", "is-pc");
                if (immediate) {
                  _context4.n = 2;
                  break;
                }
                _context4.n = 2;
                return this.delay(240);
              case 2:
                this.portrait.hidden = true;
                return _context4.a(2);
              case 3:
                source = this.assets[name];
                if (source) {
                  _context4.n = 4;
                  break;
                }
                throw new Error("\u771F\u7ED3\u5C40\u7F3A\u5C11\u7ACB\u7ED8\uFF1A".concat(name));
              case 4:
                this.portrait.classList.remove("is-visible", "is-conductor", "is-pc");
                this.portrait.hidden = false;
                this.portrait.classList.add(name === "conductorSmile" ? "is-conductor" : "is-pc");
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
        function setPortrait(_x2) {
          return _setPortrait.apply(this, arguments);
        }
        return setPortrait;
      }()
    }, {
      key: "showLine",
      value: function () {
        var _showLine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref) {
          var _this4 = this;
          var _ref$text, text, _ref$speaker, speaker, _ref$portrait, portrait, _ref$auto, auto, _ref$hold, hold, _ref$stageClass, stageClass;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _ref$text = _ref.text, text = _ref$text === void 0 ? "" : _ref$text, _ref$speaker = _ref.speaker, speaker = _ref$speaker === void 0 ? "" : _ref$speaker, _ref$portrait = _ref.portrait, portrait = _ref$portrait === void 0 ? null : _ref$portrait, _ref$auto = _ref.auto, auto = _ref$auto === void 0 ? 0 : _ref$auto, _ref$hold = _ref.hold, hold = _ref$hold === void 0 ? 0 : _ref$hold, _ref$stageClass = _ref.stageClass, stageClass = _ref$stageClass === void 0 ? "" : _ref$stageClass;
                _context5.n = 1;
                return this.setPortrait(portrait);
              case 1:
                if (stageClass) this.overlay.classList.add(stageClass);
                this.speaker.textContent = speaker;
                this.speaker.hidden = !speaker;
                this.line.textContent = text;
                this.hint.hidden = auto > 0 || !text;
                this.dialogue.classList.toggle("is-visible", text !== "");
                this.alignPortraitToDialogue();
                requestAnimationFrame(function () {
                  return _this4.alignPortraitToDialogue();
                });
                if (!(auto > 0)) {
                  _context5.n = 3;
                  break;
                }
                _context5.n = 2;
                return this.waitForAdvance(auto);
              case 2:
                _context5.n = 6;
                break;
              case 3:
                if (!text) {
                  _context5.n = 5;
                  break;
                }
                _context5.n = 4;
                return this.waitForAdvance(0);
              case 4:
                _context5.n = 6;
                break;
              case 5:
                if (!(hold > 0)) {
                  _context5.n = 6;
                  break;
                }
                _context5.n = 6;
                return this.delay(hold);
              case 6:
                this.dialogue.classList.remove("is-visible");
                if (stageClass) this.overlay.classList.remove(stageClass);
                _context5.n = 7;
                return this.delay(180);
              case 7:
                _context5.n = 8;
                return this.setPortrait(null);
              case 8:
                return _context5.a(2);
            }
          }, _callee5, this);
        }));
        function showLine(_x3) {
          return _showLine.apply(this, arguments);
        }
        return showLine;
      }()
    }, {
      key: "playTrueEndVideo",
      value: function () {
        var _playTrueEndVideo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var _t, _t2;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                this.video.currentTime = 0;
                this.video.volume = 0.9;
                _context6.p = 1;
                _context6.n = 2;
                return this.video.play();
              case 2:
                _context6.n = 7;
                break;
              case 3:
                _context6.p = 3;
                _t = _context6.v;
                this.video.muted = true;
                _context6.p = 4;
                _context6.n = 5;
                return this.video.play();
              case 5:
                _context6.n = 7;
                break;
              case 6:
                _context6.p = 6;
                _t2 = _context6.v;
                console.warn("真结局视频未能自动播放：", _t2 || _t);
              case 7:
                this.video.classList.add("is-visible");
                _context6.n = 8;
                return this.delay(1600);
              case 8:
                return _context6.a(2);
            }
          }, _callee6, this, [[4, 6], [1, 3]]);
        }));
        function playTrueEndVideo() {
          return _playTrueEndVideo.apply(this, arguments);
        }
        return playTrueEndVideo;
      }()
    }, {
      key: "waitForAdvance",
      value: function waitForAdvance() {
        var _this5 = this;
        var autoMilliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return new Promise(function (resolve) {
          _this5.resolveAdvance = resolve;
          _this5.overlay.addEventListener("click", _this5.handleAdvance);
          document.addEventListener("keydown", _this5.handleAdvance);
          if (autoMilliseconds > 0) _this5.autoAdvanceTimer = setTimeout(function () {
            return _this5.advance();
          }, autoMilliseconds);
        });
      }
    }, {
      key: "advance",
      value: function advance() {
        if (!this.resolveAdvance) return;
        var resolve = this.resolveAdvance;
        this.resolveAdvance = null;
        if (this.autoAdvanceTimer !== null) clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
        this.overlay.removeEventListener("click", this.handleAdvance);
        document.removeEventListener("keydown", this.handleAdvance);
        resolve();
      }
    }, {
      key: "fadeToWhite",
      value: function () {
        var _fadeToWhite = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(duration) {
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                this.white.style.transitionDuration = "".concat(duration, "ms");
                this.white.classList.add("is-visible");
                _context7.n = 1;
                return this.delay(duration);
              case 1:
                return _context7.a(2);
            }
          }, _callee7, this);
        }));
        function fadeToWhite(_x4) {
          return _fadeToWhite.apply(this, arguments);
        }
        return fadeToWhite;
      }()
    }, {
      key: "revealFromWhite",
      value: function () {
        var _revealFromWhite = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(duration) {
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                this.white.style.transitionDuration = "".concat(duration, "ms");
                this.white.classList.remove("is-visible");
                _context8.n = 1;
                return this.delay(duration);
              case 1:
                return _context8.a(2);
            }
          }, _callee8, this);
        }));
        function revealFromWhite(_x5) {
          return _revealFromWhite.apply(this, arguments);
        }
        return revealFromWhite;
      }()
    }, {
      key: "fadeToBlack",
      value: function () {
        var _fadeToBlack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(duration) {
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                this.blackout.style.transitionDuration = "".concat(duration, "ms");
                this.blackout.classList.add("is-visible");
                _context9.n = 1;
                return this.delay(duration);
              case 1:
                return _context9.a(2);
            }
          }, _callee9, this);
        }));
        function fadeToBlack(_x6) {
          return _fadeToBlack.apply(this, arguments);
        }
        return fadeToBlack;
      }()
    }, {
      key: "revealFromBlack",
      value: function () {
        var _revealFromBlack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(duration) {
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                this.blackout.style.transitionDuration = "".concat(duration, "ms");
                this.blackout.classList.remove("is-visible");
                _context0.n = 1;
                return this.delay(duration);
              case 1:
                return _context0.a(2);
            }
          }, _callee0, this);
        }));
        function revealFromBlack(_x7) {
          return _revealFromBlack.apply(this, arguments);
        }
        return revealFromBlack;
      }()
    }, {
      key: "playSound",
      value: function playSound(sound) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!this.audio || typeof this.audio.play !== "function") return null;
        return this.audio.play(sound, options);
      }
    }, {
      key: "stopAudio",
      value: function stopAudio() {
        var _this$audio, _this$audio$stopAll, _this$backgroundAudio, _this$backgroundAudio2;
        (_this$audio = this.audio) === null || _this$audio === void 0 || (_this$audio$stopAll = _this$audio.stopAll) === null || _this$audio$stopAll === void 0 || _this$audio$stopAll.call(_this$audio);
        (_this$backgroundAudio = this.backgroundAudio) === null || _this$backgroundAudio === void 0 || (_this$backgroundAudio2 = _this$backgroundAudio.stopAll) === null || _this$backgroundAudio2 === void 0 || _this$backgroundAudio2.call(_this$backgroundAudio);
      }
    }, {
      key: "playEndingMusic",
      value: function playEndingMusic(sound) {
        var _this$backgroundAudio3, _this$backgroundAudio4;
        var fadeMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
        (_this$backgroundAudio3 = this.backgroundAudio) === null || _this$backgroundAudio3 === void 0 || (_this$backgroundAudio4 = _this$backgroundAudio3.setTrack) === null || _this$backgroundAudio4 === void 0 || _this$backgroundAudio4.call(_this$backgroundAudio3, sound, {
          fadeMs: fadeMs
        });
      }
    }, {
      key: "stopEndingMusic",
      value: function stopEndingMusic() {
        var _this$backgroundAudio5, _this$backgroundAudio6;
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        (_this$backgroundAudio5 = this.backgroundAudio) === null || _this$backgroundAudio5 === void 0 || (_this$backgroundAudio6 = _this$backgroundAudio5.stopAll) === null || _this$backgroundAudio6 === void 0 || _this$backgroundAudio6.call(_this$backgroundAudio5, {
          duration: duration
        });
      }
    }, {
      key: "delay",
      value: function delay(milliseconds) {
        var _this6 = this;
        return new Promise(function (resolve) {
          var timer = {
            handle: null,
            resolve: resolve
          };
          timer.handle = setTimeout(function () {
            _this6.timers.delete(timer);
            resolve();
          }, milliseconds);
          _this6.timers.add(timer);
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this$speedVoice2, _this$speedVoice2$sto;
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
        if (this.autoAdvanceTimer !== null) clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
        this.overlay.removeEventListener("click", this.handleAdvance);
        document.removeEventListener("keydown", this.handleAdvance);
        window.removeEventListener("resize", this.handleResize);
        this.resolveAdvance = null;
        (_this$speedVoice2 = this.speedVoice) === null || _this$speedVoice2 === void 0 || (_this$speedVoice2$sto = _this$speedVoice2.stop) === null || _this$speedVoice2$sto === void 0 || _this$speedVoice2$sto.call(_this$speedVoice2);
        this.speedVoice = null;
        this.video.pause();
        if (this.preserveBackgroundAudio) {
          var _this$audio2, _this$audio2$stopAll;
          (_this$audio2 = this.audio) === null || _this$audio2 === void 0 || (_this$audio2$stopAll = _this$audio2.stopAll) === null || _this$audio2$stopAll === void 0 || _this$audio2$stopAll.call(_this$audio2);
        } else {
          this.stopEndingMusic(1400);
          this.stopAudio();
        }
        this.overlay.remove();
        this.running = null;
      }
    }, {
      key: "alignPortraitToDialogue",
      value: function alignPortraitToDialogue() {
        if (this.portrait.hidden || !this.dialogue.classList.contains("is-visible")) return;
        var stageRect = this.root.getBoundingClientRect();
        var dialogueRect = this.dialogue.getBoundingClientRect();
        this.portrait.style.bottom = "".concat(Math.max(0, stageRect.bottom - dialogueRect.top), "px");
      }
    }]);
  }();
  Game.EndingASequence = EndingASequence;
  Game.playEndingASequence = function (options) {
    return new EndingASequence(options).play();
  };
})(window.TrainGame);
