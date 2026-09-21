function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
(function (Game, _Game$ENDING_CATALOG$) {
  "use strict";

  var DEFAULT_ASSETS = {
    frontCarriage: "assets/Image/Scene/Background/front-carriage.ie.jpg",
    carriage06: "assets/Image/Scene/Background/carriage-06.ie.jpg",
    platform: "assets/Image/Scene/Background/sunny-platform.ie.jpg",
    moveBlur: "assets/Image/Scene/Background/move-blur.ie.jpg",
    move: "assets/Image/Scene/Background/move.ie.jpg",
    pcHappy: "assets/Image/Portrait/player-happy.ie.png",
    pcScared: "assets/Image/Portrait/player-scared.ie.png"
  };
  var IMAGE_LOAD_TIMEOUT_MS = 12000;
  var ENDING_TITLE = ((_Game$ENDING_CATALOG$ = Game.ENDING_CATALOG.find(function (ending) {
    return ending.id === "fake_end";
  })) === null || _Game$ENDING_CATALOG$ === void 0 ? void 0 : _Game$ENDING_CATALOG$.title) || "伪结局";
  var FAKE_ENDING_MUSIC = "ending_he2";
  var FAKE_ENDING_MUSIC_FADE_IN_MS = 4200;
  var MOVE_MUSIC_PLAYBACK_RATE = 0.68;
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
        return finish(new Error("\u4F2A\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A".concat(image.src)));
      };
      var timeout = setTimeout(function () {
        return finish(new Error("\u4F2A\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(image.src)));
      }, IMAGE_LOAD_TIMEOUT_MS);
      image.addEventListener("load", handleLoad, {
        once: true
      });
      image.addEventListener("error", handleError, {
        once: true
      });
    });
  }
  var FakeEndingSequence = /*#__PURE__*/function (_Game$EndingASequence) {
    function FakeEndingSequence() {
      var _this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, FakeEndingSequence);
      _this = _callSuper(this, FakeEndingSequence, [_objectSpread(_objectSpread({}, options), {}, {
        assets: _objectSpread(_objectSpread({}, DEFAULT_ASSETS), options.assets || {})
      })]);
      _this.overlay.setAttribute("aria-label", ENDING_TITLE);
      return _this;
    }
    _inherits(FakeEndingSequence, _Game$EndingASequence);
    return _createClass(FakeEndingSequence, [{
      key: "run",
      value: function () {
        var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _this$audio, _this$audio$stopAll, _this$audio2, _this$audio2$stopAll, _this$audio3, _this$audio3$stopAll, _this$backgroundAudio, _this$backgroundAudio2;
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
                this.playEndingMusic(FAKE_ENDING_MUSIC, FAKE_ENDING_MUSIC_FADE_IN_MS);
                _context.n = 2;
                return this.setBackground("frontCarriage", true);
              case 2:
                this.speedVoice = this.playSound("metro_speed_up", {
                  volume: 0.92
                });
                _context.n = 3;
                return this.showLine({
                  text: "电车加速到极致，视野被刺眼白光覆盖。",
                  auto: 3200,
                  stageClass: "is-accelerating"
                });
              case 3:
                _context.n = 4;
                return this.fadeToWhite(1900);
              case 4:
                (_this$audio = this.audio) === null || _this$audio === void 0 || (_this$audio$stopAll = _this$audio.stopAll) === null || _this$audio$stopAll === void 0 || _this$audio$stopAll.call(_this$audio);
                _context.n = 5;
                return this.setBackground("carriage06", true);
              case 5:
                this.playSound("metro_arriving", {
                  volume: 0.9
                });
                _context.n = 6;
                return this.revealFromWhite(620);
              case 6:
                _context.n = 7;
                return this.showLine({
                  text: "你睁开眼，发现自己仍坐在6号车厢。"
                });
              case 7:
                _context.n = 8;
                return this.showLine({
                  text: "广播声响起——"
                });
              case 8:
                _context.n = 9;
                return this.showLine({
                  text: "终点站已到。"
                });
              case 9:
                _context.n = 10;
                return this.setBackground("platform");
              case 10:
                _context.n = 11;
                return this.showLine({
                  text: "车厢里的人们陆续醒来，揉着眼睛下车。"
                });
              case 11:
                _context.n = 12;
                return this.showLine({
                  text: "你翻看背包：便签、报纸、手机、手电筒——全都不在了。"
                });
              case 12:
                _context.n = 13;
                return this.showLine({
                  text: "那是一场共同的噩梦。恐怖的记忆慢慢淡忘。"
                });
              case 13:
                (_this$audio2 = this.audio) === null || _this$audio2 === void 0 || (_this$audio2$stopAll = _this$audio2.stopAll) === null || _this$audio2$stopAll === void 0 || _this$audio2$stopAll.call(_this$audio2);
                this.playSound("airport_gate1", {
                  volume: 0.88
                });
                _context.n = 14;
                return this.showLine({
                  text: "你跟在人群后面走出站台。"
                });
              case 14:
                _context.n = 15;
                return this.showLine({
                  text: "身后，末班电车的车门缓缓关闭。"
                });
              case 15:
                _context.n = 16;
                return this.showLine({
                  text: "阳光正好，刚刚的一切都好像一场梦，人群叽叽喳喳，一切生机盎然。"
                });
              case 16:
                _context.n = 17;
                return this.showLine({
                  text: "这是……活下来了吗？"
                });
              case 17:
                _context.n = 18;
                return this.showLine({
                  text: "“太好了！”",
                  portrait: "pcHappy"
                });
              case 18:
                _context.n = 19;
                return this.setBackground("moveBlur");
              case 19:
                _context.n = 20;
                return this.showLine({
                  text: "“欸，那是什么？”"
                });
              case 20:
                // 只切掉站台环境音，伪结局 BGM 要持续到 MOVE FORWARD，并在画面出现时变调。
                (_this$audio3 = this.audio) === null || _this$audio3 === void 0 || (_this$audio3$stopAll = _this$audio3.stopAll) === null || _this$audio3$stopAll === void 0 || _this$audio3$stopAll.call(_this$audio3);
                this.overlay.classList.add("is-silent-cut");
                _context.n = 21;
                return this.delay(100);
              case 21:
                this.overlay.classList.remove("is-silent-cut");
                _context.n = 22;
                return this.showLine({
                  text: "“！”",
                  portrait: "pcScared"
                });
              case 22:
                _context.n = 23;
                return this.setBackground("move", true);
              case 23:
                (_this$backgroundAudio = this.backgroundAudio) === null || _this$backgroundAudio === void 0 || (_this$backgroundAudio2 = _this$backgroundAudio.setPlaybackRate) === null || _this$backgroundAudio2 === void 0 || _this$backgroundAudio2.call(_this$backgroundAudio, MOVE_MUSIC_PLAYBACK_RATE);
                _context.n = 24;
                return this.showLine({
                  text: "",
                  hold: 2400,
                  stageClass: "is-final"
                });
              case 24:
                _context.n = 25;
                return this.fadeToBlack(900);
              case 25:
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
                return Promise.all(Object.values(DEFAULT_ASSETS).map(function (source) {
                  var image = new Image();
                  image.src = source;
                  return waitForImage(image);
                }));
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        function preload() {
          return _preload.apply(this, arguments);
        }
        return preload;
      }()
    }]);
  }(Game.EndingASequence);
  Game.FakeEndingSequence = FakeEndingSequence;
  Game.playFakeEndingSequence = function (options) {
    return new FakeEndingSequence(options).play();
  };
})(window.TrainGame);
