function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game) {
  "use strict";

  var ASSETS = {
    memory: "assets/Image/Scene/Background/op-01.ie.jpg",
    trueEndVideo: "assets/video/trueend.mp4",
    crewDead: "assets/Image/Scene/Background/chengwuyuan-dead.png",
    wake: "assets/Image/Scene/Background/carriage-03.ie.jpg",
    home: "assets/Image/Scene/Background/home1.png",
    homeFlash: "assets/Image/Scene/Background/home2.png"
  };
  var TITLE = "那半梦半醒中入耳穿骨的哭泣";
  function element(tag, className) {
    var node = document.createElement(tag);
    node.className = className;
    return node;
  }
  var CryEndingSequence = /*#__PURE__*/function () {
    function CryEndingSequence() {
      var _this$stage,
        _this = this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        root = _ref.root,
        audio = _ref.audio,
        backgroundAudio = _ref.backgroundAudio;
      _classCallCheck(this, CryEndingSequence);
      this.root = root || document.querySelector("#game-shell") || document.body;
      this.audio = audio;
      this.backgroundAudio = backgroundAudio;
      this.timers = new Set();
      this.currentAdvance = null;
      this.autoTimer = null;
      this.overlay = element("section", "cry-ending is-loading");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", TITLE);
      this.stage = element("div", "cry-ending-stage");
      this.images = [element("img", "cry-ending-image is-active"), element("img", "cry-ending-image")];
      var _iterator = _createForOfIteratorHelper(this.images),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var image = _step.value;
          image.alt = "";
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.video = element("video", "cry-ending-video");
      this.video.src = ASSETS.trueEndVideo;
      this.video.preload = "auto";
      this.video.playsInline = true;
      this.video.setAttribute("aria-hidden", "true");
      (_this$stage = this.stage).append.apply(_this$stage, _toConsumableArray(this.images).concat([this.video]));
      this.white = element("div", "cry-ending-white");
      this.black = element("div", "cry-ending-black");
      this.copy = element("div", "cry-ending-copy");
      this.line = element("p", "cry-ending-line");
      this.hint = element("span", "cry-ending-hint");
      this.copy.append(this.line, this.hint);
      this.overlay.append(this.stage, this.white, this.black, this.copy);
      this.onAdvance = function (event) {
        if (!_this.currentAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        _this.advance();
      };
    }
    return _createClass(CryEndingSequence, [{
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
          var _this$backgroundAudio, _this$backgroundAudio2, _this$audio, _this$audio$play, _this$backgroundAudio3, _this$backgroundAudio4, _this$backgroundAudio5, _this$backgroundAudio6, _this$backgroundAudio7, _this$backgroundAudio8, _this$audio2, _this$audio2$play;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                this.root.append(this.overlay);
                _context.n = 1;
                return this.preload();
              case 1:
                this.overlay.classList.remove("is-loading");
                this.overlay.classList.add("is-visible");
                (_this$backgroundAudio = this.backgroundAudio) === null || _this$backgroundAudio === void 0 || (_this$backgroundAudio2 = _this$backgroundAudio.setTrack) === null || _this$backgroundAudio2 === void 0 || _this$backgroundAudio2.call(_this$backgroundAudio, "ending_he", {
                  fadeMs: 2400
                });
                (_this$audio = this.audio) === null || _this$audio === void 0 || (_this$audio$play = _this$audio.play) === null || _this$audio$play === void 0 || _this$audio$play.call(_this$audio, "metro_speed_up", {
                  volume: 0.95
                });
                this.overlay.classList.add("is-accelerating");
                this.white.classList.add("is-visible");
                _context.n = 2;
                return this.show("你毅然决然向上拉了拉杆。", 2200);
              case 2:
                this.overlay.classList.remove("is-accelerating");
                _context.n = 3;
                return this.show("你听到了列车加速的声音，震动着五脏六腑。", 2700);
              case 3:
                _context.n = 4;
                return this.show("陡然增加的加速度让你喘不过气，意识恍惚之际，脑海中突然闪过一些模糊的片段。", 3300);
              case 4:
                _context.n = 5;
                return this.setImage(0, true);
              case 5:
                this.overlay.classList.add("is-memory-blurred");
                this.white.classList.remove("is-visible");
                _context.n = 6;
                return this.delay(1400);
              case 6:
                _context.n = 7;
                return this.show("眼前像蒙了一层雾，你努力想要看清。", 2500);
              case 7:
                this.overlay.classList.remove("is-memory-blurred");
                this.overlay.classList.add("is-memory-clear");
                _context.n = 8;
                return this.show("——哦。原来是在回家的时候在列车上抱怨的你自己。", 2900);
              case 8:
                this.overlay.classList.remove("is-memory-clear");
                this.overlay.classList.add("is-memory-blurred");
                _context.n = 9;
                return this.show("想到自己未经大脑许的那个愿望，虽然现在还是喘不过气，但是你莫名其妙笑了出来。", 3300);
              case 9:
                _context.n = 10;
                return this.show("一边笑一边咳嗽。", 1900);
              case 10:
                _context.n = 11;
                return this.show("明明是自己寻求的改变，到最后还是选择回到原来的生活。", 2900);
              case 11:
                this.overlay.classList.remove("is-memory-blurred", "is-memory-clear");
                _context.n = 12;
                return this.playVideo();
              case 12:
                _context.n = 13;
                return this.show("留下会不会更好，说不定这样反而能活下来。", 2800);
              case 13:
                _context.n = 14;
                return this.show("算了，没有下次了。", 1900);
              case 14:
                _context.n = 15;
                return this.show("所有的神，鬼，恶心的东西，或者美好的幻象，", 2600);
              case 15:
                _context.n = 16;
                return this.show("都去他的吧。", 1900);
              case 16:
                _context.n = 17;
                return this.show("不去试一下，怎么知道。", 2400);
              case 17:
                _context.n = 18;
                return this.fadeVideoOut();
              case 18:
                _context.n = 19;
                return this.setImage(1, true);
              case 19:
                _context.n = 20;
                return this.show("弥留之际，不知为何，你的眼前闪过乘务员痛苦扭曲的样子。", 2900);
              case 20:
                this.black.classList.add("is-visible");
                _context.n = 21;
                return this.delay(1000);
              case 21:
                this.video.pause();
                _context.n = 22;
                return this.setImage(0, true, ASSETS.wake);
              case 22:
                (_this$backgroundAudio3 = this.backgroundAudio) === null || _this$backgroundAudio3 === void 0 || (_this$backgroundAudio4 = _this$backgroundAudio3.setTrack) === null || _this$backgroundAudio4 === void 0 || _this$backgroundAudio4.call(_this$backgroundAudio3, "ending_he2", {
                  fadeMs: 2800
                });
                this.black.classList.remove("is-visible");
                _context.n = 23;
                return this.show("你猛地惊醒。这是哪？", 2300);
              case 23:
                _context.n = 24;
                return this.show("无人回应你，列车空空荡荡。", 2200);
              case 24:
                _context.n = 25;
                return this.show("你来不及多想，连滚带爬出了车厢。", 2400);
              case 25:
                _context.n = 26;
                return this.setImage(1, false, ASSETS.home);
              case 26:
                _context.n = 27;
                return this.show("新鲜空气涌入肺中的感觉前所未有的好。你心有余悸，不敢多停留，冲回家中。", 3600);
              case 27:
                _context.n = 28;
                return this.show("你活下来了。", 1800);
              case 28:
                _context.n = 29;
                return this.show("你几乎要喜极而泣，发誓要好好生活。", 2600);
              case 29:
                (_this$backgroundAudio5 = this.backgroundAudio) === null || _this$backgroundAudio5 === void 0 || (_this$backgroundAudio5 = _this$backgroundAudio5.current) === null || _this$backgroundAudio5 === void 0 || (_this$backgroundAudio6 = _this$backgroundAudio5.setPlaybackRate) === null || _this$backgroundAudio6 === void 0 || _this$backgroundAudio6.call(_this$backgroundAudio5, 0.58);
                this.overlay.classList.add("is-home-flash");
                _context.n = 30;
                return this.setImage(0, true, ASSETS.homeFlash);
              case 30:
                _context.n = 31;
                return this.delay(420);
              case 31:
                _context.n = 32;
                return this.setImage(1, true, ASSETS.home);
              case 32:
                this.overlay.classList.remove("is-home-flash");
                (_this$backgroundAudio7 = this.backgroundAudio) === null || _this$backgroundAudio7 === void 0 || (_this$backgroundAudio7 = _this$backgroundAudio7.current) === null || _this$backgroundAudio7 === void 0 || (_this$backgroundAudio8 = _this$backgroundAudio7.setPlaybackRate) === null || _this$backgroundAudio8 === void 0 || _this$backgroundAudio8.call(_this$backgroundAudio7, 1);
                _context.n = 33;
                return this.show("刚刚那是什么？", 1500);
              case 33:
                _context.n = 34;
                return this.show("你不愿多想，也不敢多想。", 2100);
              case 34:
                _context.n = 35;
                return this.show("都过去了，都过去了。", 1900);
              case 35:
                _context.n = 36;
                return this.show("你安慰着自己。", 1800);
              case 36:
                _context.n = 37;
                return this.setImage(0, true, ASSETS.homeFlash);
              case 37:
                (_this$audio2 = this.audio) === null || _this$audio2 === void 0 || (_this$audio2$play = _this$audio2.play) === null || _this$audio2$play === void 0 || _this$audio2$play.call(_this$audio2, "cry_of_despair_girls", {
                  volume: 1
                });
                _context.n = 38;
                return this.show("除了耳边依然回荡着的，乘务员撕心裂肺的哭喊。", 4200);
              case 38:
                this.black.classList.add("is-visible");
                _context.n = 39;
                return this.delay(1200);
              case 39:
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
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return Promise.all([ASSETS.memory, ASSETS.crewDead, ASSETS.wake, ASSETS.home, ASSETS.homeFlash].map(function (src) {
                  return new Promise(function (resolve) {
                    var image = new Image();
                    image.onload = resolve;
                    image.onerror = resolve;
                    image.src = src;
                  });
                }));
              case 1:
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
      key: "setImage",
      value: function () {
        var _setImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(index) {
          var immediate,
            source,
            active,
            nextIndex,
            next,
            _args3 = arguments;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                immediate = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                source = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
                active = this.images.findIndex(function (image) {
                  return image.classList.contains("is-active");
                });
                nextIndex = index !== null && index !== void 0 ? index : active === 0 ? 1 : 0;
                next = this.images[nextIndex];
                next.src = source || (nextIndex === 0 ? ASSETS.memory : ASSETS.crewDead);
                next.classList.add("is-active");
                if (!immediate) {
                  _context3.n = 1;
                  break;
                }
                this.images[1 - nextIndex].classList.remove("is-active");
                _context3.n = 3;
                break;
              case 1:
                _context3.n = 2;
                return this.delay(700);
              case 2:
                this.images[1 - nextIndex].classList.remove("is-active");
              case 3:
                return _context3.a(2);
            }
          }, _callee3, this);
        }));
        function setImage(_x) {
          return _setImage.apply(this, arguments);
        }
        return setImage;
      }()
    }, {
      key: "playVideo",
      value: function () {
        var _playVideo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var _t, _t2;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                this.video.currentTime = 0;
                this.video.volume = 0.85;
                _context4.p = 1;
                _context4.n = 2;
                return this.video.play();
              case 2:
                _context4.n = 7;
                break;
              case 3:
                _context4.p = 3;
                _t = _context4.v;
                this.video.muted = true;
                _context4.p = 4;
                _context4.n = 5;
                return this.video.play();
              case 5:
                _context4.n = 7;
                break;
              case 6:
                _context4.p = 6;
                _t2 = _context4.v;
              case 7:
                this.video.classList.add("is-visible");
                _context4.n = 8;
                return this.delay(900);
              case 8:
                return _context4.a(2);
            }
          }, _callee4, this, [[4, 6], [1, 3]]);
        }));
        function playVideo() {
          return _playVideo.apply(this, arguments);
        }
        return playVideo;
      }()
    }, {
      key: "fadeVideoOut",
      value: function () {
        var _fadeVideoOut = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                this.video.classList.remove("is-visible");
                _context5.n = 1;
                return this.delay(900);
              case 1:
                this.video.pause();
              case 2:
                return _context5.a(2);
            }
          }, _callee5, this);
        }));
        function fadeVideoOut() {
          return _fadeVideoOut.apply(this, arguments);
        }
        return fadeVideoOut;
      }()
    }, {
      key: "show",
      value: function show(text, duration) {
        var _this3 = this;
        var stageClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        this.line.textContent = text;
        this.copy.classList.add("is-visible");
        this.hint.textContent = "点击继续";
        if (stageClass) this.overlay.classList.add(stageClass);
        return this.waitAdvance(duration).then(function () {
          _this3.copy.classList.remove("is-visible");
          if (stageClass) _this3.overlay.classList.remove(stageClass);
          return _this3.delay(130);
        });
      }
    }, {
      key: "waitAdvance",
      value: function waitAdvance(duration) {
        var _this4 = this;
        return new Promise(function (resolve) {
          _this4.currentAdvance = resolve;
          _this4.overlay.addEventListener("click", _this4.onAdvance);
          document.addEventListener("keydown", _this4.onAdvance);
          _this4.autoTimer = setTimeout(function () {
            return _this4.advance();
          }, duration);
        });
      }
    }, {
      key: "advance",
      value: function advance() {
        if (!this.currentAdvance) return;
        clearTimeout(this.autoTimer);
        this.autoTimer = null;
        this.overlay.removeEventListener("click", this.onAdvance);
        document.removeEventListener("keydown", this.onAdvance);
        var resolve = this.currentAdvance;
        this.currentAdvance = null;
        resolve();
      }
    }, {
      key: "delay",
      value: function delay(ms) {
        var _this5 = this;
        return new Promise(function (resolve) {
          var timer = setTimeout(function () {
            _this5.timers.delete(timer);
            resolve();
          }, ms);
          _this5.timers.add(timer);
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this$backgroundAudio9, _this$backgroundAudio0;
        this.advance();
        var _iterator2 = _createForOfIteratorHelper(this.timers),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var timer = _step2.value;
            clearTimeout(timer);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.timers.clear();
        this.video.pause();
        (_this$backgroundAudio9 = this.backgroundAudio) === null || _this$backgroundAudio9 === void 0 || (_this$backgroundAudio0 = _this$backgroundAudio9.stopAll) === null || _this$backgroundAudio0 === void 0 || _this$backgroundAudio0.call(_this$backgroundAudio9, {
          duration: 1400
        });
        this.overlay.remove();
        this.running = null;
      }
    }]);
  }();
  Game.CryEndingSequence = CryEndingSequence;
  Game.playCryEndingSequence = function (options) {
    return new CryEndingSequence(options).play();
  };
})(window.TrainGame);
