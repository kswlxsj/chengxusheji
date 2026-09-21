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
    devoured: "assets/Video/swallowed.mp4",
    carriage03: "assets/Image/Scene/Background/carriage-03.ie.jpg"
  };
  var IMAGE_LOAD_TIMEOUT_MS = 12000;
  var ENDING_TITLE = ((_Game$ENDING_CATALOG$ = Game.ENDING_CATALOG.find(function (ending) {
    return ending.id === "bad_end";
  })) === null || _Game$ENDING_CATALOG$ === void 0 ? void 0 : _Game$ENDING_CATALOG$.title) || "停车结局";
  var VIDEO_LOAD_TIMEOUT_MS = 30000;
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
        return finish(new Error("\u505C\u8F66\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A".concat(image.src)));
      };
      var timeout = setTimeout(function () {
        return finish(new Error("\u505C\u8F66\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(image.src)));
      }, IMAGE_LOAD_TIMEOUT_MS);
      image.addEventListener("load", handleLoad, {
        once: true
      });
      image.addEventListener("error", handleError, {
        once: true
      });
    });
  }
  function waitForVideo(video) {
    if (video.readyState >= 2) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var settled = false;
      var finish = function finish(error) {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        video.removeEventListener("loadeddata", handleLoaded);
        video.removeEventListener("error", handleError);
        if (error) reject(error);else resolve();
      };
      var handleLoaded = function handleLoaded() {
        return finish();
      };
      var handleError = function handleError() {
        return finish(new Error("\u505C\u8F66\u7ED3\u5C40\u89C6\u9891\u52A0\u8F7D\u5931\u8D25\uFF1A".concat(video.src)));
      };
      var timeout = setTimeout(function () {
        return finish(new Error("\u505C\u8F66\u7ED3\u5C40\u89C6\u9891\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(video.src)));
      }, VIDEO_LOAD_TIMEOUT_MS);
      video.addEventListener("loadeddata", handleLoaded, {
        once: true
      });
      video.addEventListener("error", handleError, {
        once: true
      });
    });
  }
  var ParkingEndingSequence = /*#__PURE__*/function () {
    function ParkingEndingSequence() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, ParkingEndingSequence);
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.audio = options.audio || null;
      this.backgroundAudio = options.backgroundAudio || null;
      this.assets = _objectSpread(_objectSpread({}, DEFAULT_ASSETS), options.assets || {});
      this.timers = new Set();
      this.resolveAdvance = null;
      this.autoAdvanceTimer = null;
      this.eatingVoice = null;
      this.running = null;
      this.overlay = createElement("section", "parking-ending-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
      this.cinema = createElement("div", "parking-ending-cinema");
      this.backgroundPrimary = createElement("img", "parking-ending-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "parking-ending-background");
      this.backgroundSecondary.alt = "";
      this.devouredVideo = createElement("video", "parking-ending-video");
      this.devouredVideo.src = this.assets.devoured;
      this.devouredVideo.muted = true;
      this.devouredVideo.playsInline = true;
      this.devouredVideo.preload = "auto";
      this.devouredVideo.setAttribute("aria-hidden", "true");
      this.speed = createElement("div", "parking-ending-speed");
      this.blood = createElement("div", "parking-ending-blood");
      this.vignette = createElement("div", "parking-ending-vignette");
      this.memory = createElement("div", "parking-ending-memory");
      this.memoryLabel = createElement("p", "parking-ending-memory-label", "你想起一路上那些字：");
      this.memoryWord = createElement("p", "parking-ending-memory-word", "MOVE FORWARD");
      this.memory.append(this.memoryLabel, this.memoryWord);
      this.caption = createElement("div", "parking-ending-caption");
      this.captionLine = createElement("p", "parking-ending-caption-line");
      this.caption.append(this.captionLine);
      this.desperation = createElement("div", "parking-ending-desperation");
      this.desperation.setAttribute("aria-live", "polite");
      this.desperationLine = createElement("p", "parking-ending-desperation-line");
      this.desperationWall = createElement("div", "parking-ending-desperation-wall");
      this.desperationWall.setAttribute("aria-hidden", "true");
      for (var index = 0; index < 48; index += 1) {
        this.desperationWall.append(createElement("span", "", "我不想死"));
      }
      this.desperation.append(this.desperationWall, this.desperationLine);
      this.dialogue = createElement("div", "parking-ending-dialogue");
      this.line = createElement("p", "parking-ending-line");
      this.hint = createElement("span", "parking-ending-hint", "点击继续");
      this.dialogue.append(this.line, this.hint);
      this.blackout = createElement("div", "parking-ending-blackout");
      this.cinema.append(this.backgroundPrimary, this.backgroundSecondary, this.devouredVideo, this.speed, this.blood, this.vignette, this.memory, this.caption, this.desperation);
      this.overlay.append(this.cinema, this.dialogue, this.blackout);
      this.handleAdvance = function (event) {
        if (!_this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        if (event.type === "click") event.preventDefault();
        if (event.type === "keydown") event.preventDefault();
        _this.advance();
      };
    }
    return _createClass(ParkingEndingSequence, [{
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
          var _speedVoice$stop, _this$eatingVoice, _this$eatingVoice$sto, _this$backgroundAudio, _this$backgroundAudio2, _this$eatingVoice2, _this$eatingVoice2$se;
          var speedVoice, eatingRamp, revealPromise, videoStarted, remaining;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                this.root.append(this.overlay);
                this.overlay.classList.add("is-visible", "is-loading");
                _context.n = 1;
                return this.preload();
              case 1:
                this.overlay.classList.remove("is-loading");
                this.stopBackgroundAudio();
                _context.n = 2;
                return this.setBackground("frontCarriage", true);
              case 2:
                speedVoice = this.playSound("metro_speed_down", {
                  volume: 0.95
                });
                _context.n = 3;
                return this.showLine({
                  text: "拉杆减速，列车停下的瞬间，四周陷入漆黑。",
                  auto: 2800,
                  stageClass: "is-braking"
                });
              case 3:
                _context.n = 4;
                return this.fadeToBlack(2200);
              case 4:
                speedVoice === null || speedVoice === void 0 || (_speedVoice$stop = speedVoice.stop) === null || _speedVoice$stop === void 0 || _speedVoice$stop.call(speedVoice);
                this.overlay.classList.add("is-black");
                _context.n = 5;
                return this.delay(620);
              case 5:
                this.eatingVoice = this.playSound("eating_crisps", {
                  loop: true,
                  volume: 0.12
                });
                eatingRamp = this.rampVolume(this.eatingVoice, 0.12, 0.88, 3000);
                _context.n = 6;
                return this.showLine({
                  text: "嘎吱嘎吱的咀嚼声接近。",
                  auto: 2800
                });
              case 6:
                _context.n = 7;
                return eatingRamp;
              case 7:
                (_this$eatingVoice = this.eatingVoice) === null || _this$eatingVoice === void 0 || (_this$eatingVoice$sto = _this$eatingVoice.stop) === null || _this$eatingVoice$sto === void 0 || _this$eatingVoice$sto.call(_this$eatingVoice, {
                  immediate: true
                });
                this.eatingVoice = null;
                // badend 音乐从血水出现这一刻开始，用较长淡入避免突然切入。
                (_this$backgroundAudio = this.backgroundAudio) === null || _this$backgroundAudio === void 0 || (_this$backgroundAudio2 = _this$backgroundAudio.setTrack) === null || _this$backgroundAudio2 === void 0 || _this$backgroundAudio2.call(_this$backgroundAudio, "ending_bad", {
                  fadeMs: 4200
                });
                this.overlay.classList.add("is-blood");
                _context.n = 8;
                return this.showLine({
                  text: "脚下流过粘稠血水与残骸。",
                  auto: 3200
                });
              case 8:
                _context.n = 9;
                return this.showLine({
                  text: "你想起一路上那些字：",
                  auto: 1800
                });
              case 9:
                _context.n = 10;
                return this.showMemory(2600);
              case 10:
                this.overlay.classList.remove("is-blood");
                this.overlay.classList.add("is-devoured");
                revealPromise = this.revealFromBlack(1800);
                _context.n = 11;
                return this.playDevouredVideo();
              case 11:
                videoStarted = _context.v;
                _context.n = 12;
                return revealPromise;
              case 12:
                _context.n = 13;
                return this.showDesperation("我不想死。", 1500, "is-whisper");
              case 13:
                _context.n = 14;
                return this.showDesperation("我不想死，我不想死", 1800, "is-panic");
              case 14:
                _context.n = 15;
                return this.showDesperationWall(2600);
              case 15:
                _context.n = 16;
                return this.showDesperation("失去意识之前，你用尽最后的力气发出一条消息", 2500, "is-narration");
              case 16:
                _context.n = 17;
                return this.showDesperation("不要停下", 2000, "is-message");
              case 17:
                _context.n = 18;
                return this.showDesperation("你感受到自己渐渐与它们融为一体。", 3600, "is-narration");
              case 18:
                _context.n = 19;
                return this.showDesperation("主将重现…主将重现…", 4600, "is-message");
              case 19:
                if (!(videoStarted && Number.isFinite(this.devouredVideo.duration))) {
                  _context.n = 20;
                  break;
                }
                remaining = Math.max(0, this.devouredVideo.duration - this.devouredVideo.currentTime);
                _context.n = 20;
                return this.delay(remaining * 1000);
              case 20:
                this.overlay.classList.add("is-swallowing");
                _context.n = 21;
                return this.showCaption("意识与身体一同消失……", 2600);
              case 21:
                _context.n = 22;
                return this.fadeToBlack(2300);
              case 22:
                this.overlay.classList.remove("is-blood", "is-devoured", "is-swallowing");
                _context.n = 23;
                return this.delay(700);
              case 23:
                _context.n = 24;
                return this.setBackground("carriage03", true);
              case 24:
                this.overlay.classList.add("is-awakening");
                (_this$eatingVoice2 = this.eatingVoice) === null || _this$eatingVoice2 === void 0 || (_this$eatingVoice2$se = _this$eatingVoice2.setVolume) === null || _this$eatingVoice2$se === void 0 || _this$eatingVoice2$se.call(_this$eatingVoice2, 0.28);
                _context.n = 25;
                return this.revealFromBlack(1800);
              case 25:
                _context.n = 26;
                return this.showLine({
                  text: "在座位上醒来，分不清梦境与现实。",
                  auto: 3200
                });
              case 26:
                _context.n = 27;
                return this.showLine({
                  text: "啃食声挥之不去，从此恐惧度日。",
                  auto: 3400
                });
              case 27:
                _context.n = 28;
                return this.fadeToBlack(900);
              case 28:
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
                imageSources = [this.assets.frontCarriage, this.assets.carriage03];
                _context2.n = 1;
                return Promise.all(imageSources.map(function (source) {
                  var image = new Image();
                  image.src = source;
                  return waitForImage(image);
                }));
              case 1:
                _context2.n = 2;
                return waitForVideo(this.devouredVideo);
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
                throw new Error("\u505C\u8F66\u7ED3\u5C40\u7F3A\u5C11\u80CC\u666F\uFF1A".concat(name));
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
                return this.delay(680);
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
      key: "showLine",
      value: function () {
        var _showLine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref) {
          var _ref$text, text, _ref$auto, auto, _ref$stageClass, stageClass;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _ref$text = _ref.text, text = _ref$text === void 0 ? "" : _ref$text, _ref$auto = _ref.auto, auto = _ref$auto === void 0 ? 0 : _ref$auto, _ref$stageClass = _ref.stageClass, stageClass = _ref$stageClass === void 0 ? "" : _ref$stageClass;
                if (stageClass) this.overlay.classList.add(stageClass);
                this.line.textContent = text;
                this.hint.hidden = auto > 0 || !text;
                this.dialogue.classList.toggle("is-visible", text !== "");
                if (!(auto > 0)) {
                  _context4.n = 2;
                  break;
                }
                _context4.n = 1;
                return this.waitForAdvance(auto);
              case 1:
                _context4.n = 3;
                break;
              case 2:
                if (!text) {
                  _context4.n = 3;
                  break;
                }
                _context4.n = 3;
                return this.waitForAdvance(0);
              case 3:
                this.dialogue.classList.remove("is-visible");
                if (stageClass) this.overlay.classList.remove(stageClass);
                _context4.n = 4;
                return this.delay(180);
              case 4:
                return _context4.a(2);
            }
          }, _callee4, this);
        }));
        function showLine(_x2) {
          return _showLine.apply(this, arguments);
        }
        return showLine;
      }()
    }, {
      key: "showMemory",
      value: function () {
        var _showMemory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(duration) {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                this.dialogue.classList.remove("is-visible");
                this.overlay.classList.add("is-memory");
                _context5.n = 1;
                return this.waitForAdvance(duration);
              case 1:
                this.overlay.classList.remove("is-memory");
                _context5.n = 2;
                return this.delay(420);
              case 2:
                return _context5.a(2);
            }
          }, _callee5, this);
        }));
        function showMemory(_x3) {
          return _showMemory.apply(this, arguments);
        }
        return showMemory;
      }()
    }, {
      key: "showCaption",
      value: function () {
        var _showCaption = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(text, duration) {
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                this.captionLine.textContent = text;
                this.caption.classList.add("is-visible");
                _context6.n = 1;
                return this.waitForAdvance(duration);
              case 1:
                this.caption.classList.remove("is-visible");
                _context6.n = 2;
                return this.delay(420);
              case 2:
                return _context6.a(2);
            }
          }, _callee6, this);
        }));
        function showCaption(_x4, _x5) {
          return _showCaption.apply(this, arguments);
        }
        return showCaption;
      }()
    }, {
      key: "showDesperation",
      value: function () {
        var _showDesperation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(text, duration, mode) {
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                this.desperationLine.textContent = text;
                this.desperation.className = "parking-ending-desperation is-visible ".concat(mode);
                _context7.n = 1;
                return this.waitForAdvance(duration);
              case 1:
                this.desperation.className = "parking-ending-desperation";
                _context7.n = 2;
                return this.delay(180);
              case 2:
                return _context7.a(2);
            }
          }, _callee7, this);
        }));
        function showDesperation(_x6, _x7, _x8) {
          return _showDesperation.apply(this, arguments);
        }
        return showDesperation;
      }()
    }, {
      key: "showDesperationWall",
      value: function () {
        var _showDesperationWall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(duration) {
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                this.desperationLine.textContent = "我不想死";
                this.desperation.className = "parking-ending-desperation is-visible is-wall";
                _context8.n = 1;
                return this.waitForAdvance(duration);
              case 1:
                this.desperation.className = "parking-ending-desperation";
                _context8.n = 2;
                return this.delay(180);
              case 2:
                return _context8.a(2);
            }
          }, _callee8, this);
        }));
        function showDesperationWall(_x9) {
          return _showDesperationWall.apply(this, arguments);
        }
        return showDesperationWall;
      }()
    }, {
      key: "playDevouredVideo",
      value: function () {
        var _playDevouredVideo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var _t;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.p = _context9.n) {
              case 0:
                _context9.p = 0;
                this.devouredVideo.currentTime = 0;
                _context9.n = 1;
                return this.devouredVideo.play();
              case 1:
                return _context9.a(2, true);
              case 2:
                _context9.p = 2;
                _t = _context9.v;
                console.warn("停车结局吞噬视频未能自动播放：", _t);
                return _context9.a(2, false);
            }
          }, _callee9, this, [[0, 2]]);
        }));
        function playDevouredVideo() {
          return _playDevouredVideo.apply(this, arguments);
        }
        return playDevouredVideo;
      }()
    }, {
      key: "waitForAdvance",
      value: function waitForAdvance() {
        var _this3 = this;
        var autoMilliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return new Promise(function (resolve) {
          _this3.resolveAdvance = resolve;
          _this3.overlay.addEventListener("click", _this3.handleAdvance);
          document.addEventListener("keydown", _this3.handleAdvance);
          if (autoMilliseconds > 0) {
            _this3.autoAdvanceTimer = setTimeout(function () {
              return _this3.advance();
            }, autoMilliseconds);
          }
        });
      }
    }, {
      key: "advance",
      value: function advance() {
        if (!this.resolveAdvance) return;
        var resolve = this.resolveAdvance;
        this.resolveAdvance = null;
        if (this.autoAdvanceTimer !== null) {
          clearTimeout(this.autoAdvanceTimer);
          this.autoAdvanceTimer = null;
        }
        this.overlay.removeEventListener("click", this.handleAdvance);
        document.removeEventListener("keydown", this.handleAdvance);
        resolve();
      }
    }, {
      key: "fadeToBlack",
      value: function () {
        var _fadeToBlack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(duration) {
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                this.blackout.style.transitionDuration = "".concat(duration, "ms");
                this.blackout.classList.add("is-visible");
                _context0.n = 1;
                return this.delay(duration);
              case 1:
                return _context0.a(2);
            }
          }, _callee0, this);
        }));
        function fadeToBlack(_x0) {
          return _fadeToBlack.apply(this, arguments);
        }
        return fadeToBlack;
      }()
    }, {
      key: "revealFromBlack",
      value: function () {
        var _revealFromBlack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(duration) {
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                this.blackout.style.transitionDuration = "".concat(duration, "ms");
                this.blackout.classList.remove("is-visible");
                _context1.n = 1;
                return this.delay(duration);
              case 1:
                return _context1.a(2);
            }
          }, _callee1, this);
        }));
        function revealFromBlack(_x1) {
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
      key: "rampVolume",
      value: function () {
        var _rampVolume = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(voice, from, to, duration) {
          var steps, step;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                if (!(!voice || typeof voice.setVolume !== "function")) {
                  _context10.n = 2;
                  break;
                }
                _context10.n = 1;
                return this.delay(duration);
              case 1:
                return _context10.a(2);
              case 2:
                steps = Math.max(1, Math.ceil(duration / 80));
                voice.setVolume(from);
                step = 1;
              case 3:
                if (!(step <= steps)) {
                  _context10.n = 7;
                  break;
                }
                _context10.n = 4;
                return this.delay(duration / steps);
              case 4:
                if (!voice.stopped) {
                  _context10.n = 5;
                  break;
                }
                return _context10.a(2);
              case 5:
                voice.setVolume(from + (to - from) * (step / steps));
              case 6:
                step += 1;
                _context10.n = 3;
                break;
              case 7:
                return _context10.a(2);
            }
          }, _callee10, this);
        }));
        function rampVolume(_x10, _x11, _x12, _x13) {
          return _rampVolume.apply(this, arguments);
        }
        return rampVolume;
      }()
    }, {
      key: "stopBackgroundAudio",
      value: function stopBackgroundAudio() {
        var _this$audio, _this$audio$stopAll, _this$backgroundAudio3, _this$backgroundAudio4;
        (_this$audio = this.audio) === null || _this$audio === void 0 || (_this$audio$stopAll = _this$audio.stopAll) === null || _this$audio$stopAll === void 0 || _this$audio$stopAll.call(_this$audio);
        (_this$backgroundAudio3 = this.backgroundAudio) === null || _this$backgroundAudio3 === void 0 || (_this$backgroundAudio4 = _this$backgroundAudio3.stopAll) === null || _this$backgroundAudio4 === void 0 || _this$backgroundAudio4.call(_this$backgroundAudio3);
      }
    }, {
      key: "delay",
      value: function delay(milliseconds) {
        var _this4 = this;
        return new Promise(function (resolve) {
          var timer = {
            handle: null,
            resolve: resolve
          };
          timer.handle = setTimeout(function () {
            _this4.timers.delete(timer);
            resolve();
          }, milliseconds);
          _this4.timers.add(timer);
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this$eatingVoice3, _this$eatingVoice3$st, _this$backgroundAudio5, _this$backgroundAudio6, _this$audio2, _this$audio2$stopAll;
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
        this.resolveAdvance = null;
        (_this$eatingVoice3 = this.eatingVoice) === null || _this$eatingVoice3 === void 0 || (_this$eatingVoice3$st = _this$eatingVoice3.stop) === null || _this$eatingVoice3$st === void 0 || _this$eatingVoice3$st.call(_this$eatingVoice3);
        this.eatingVoice = null;
        (_this$backgroundAudio5 = this.backgroundAudio) === null || _this$backgroundAudio5 === void 0 || (_this$backgroundAudio6 = _this$backgroundAudio5.stopAll) === null || _this$backgroundAudio6 === void 0 || _this$backgroundAudio6.call(_this$backgroundAudio5, {
          duration: 1600
        });
        this.devouredVideo.pause();
        (_this$audio2 = this.audio) === null || _this$audio2 === void 0 || (_this$audio2$stopAll = _this$audio2.stopAll) === null || _this$audio2$stopAll === void 0 || _this$audio2$stopAll.call(_this$audio2);
        var overlay = this.overlay;
        setTimeout(function () {
          return overlay.remove();
        }, 0);
        this.running = null;
      }
    }]);
  }();
  Game.ParkingEndingSequence = ParkingEndingSequence;
  Game.playParkingEndingSequence = function (options) {
    return new ParkingEndingSequence(options).play();
  };
})(window.TrainGame);
