function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
    state1: "assets/Image/Scene/Background/end-3-state1.ie.jpg",
    state2: "assets/Image/Scene/Background/end-3-state2.ie.jpg",
    state3: "assets/Image/Scene/Background/end-3-state3.ie.jpg"
  };
  var IMAGE_LOAD_TIMEOUT_MS = 12000;
  var ENDING_TITLE = ((_Game$ENDING_CATALOG$ = Game.ENDING_CATALOG.find(function (ending) {
    return ending.id === "lost";
  })) === null || _Game$ENDING_CATALOG$ === void 0 ? void 0 : _Game$ENDING_CATALOG$.title) || "失落";
  var LOST_TEXT = "你第一次见到如此令人安心的场景，天堂应该是这样的，神圣的，慈悲的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福，辛福，幸幅，幸富，幸服，幸褔，倖福，莘福，悻福，幸辐，幸蝠，幸偪，幸畐，幸冨，幸複，辛畐，辛辐，辛富，辛服，辛褔，莘辐，莘畐，悻畐，倖畐，幸福，幸𤔜，幸𥛽，幸𥚃，幸𥘿，幸𥙆，幸𥙷，幸𥛉，辛𤔜，辛𥛽，莘𤔜，悻𥛽，倖𥛽，幸畐，辛偪，莘偪，悻偪，倖偪，幸逼，辛逼，莘逼，悻逼，倖逼，幸副，辛副，莘副，悻副，倖副，幸蝠，辛蝠，莘蝠，悻蝠，倖蝠，幸辐，辛辐，莘辐，悻辐，倖辐，幸富，辛富，莘富，悻富，倖富，幸服，辛服，莘服，悻服，倖服，幸幅，辛幅，莘幅，悻幅，倖幅，幸褔，辛褔，莘褔，悻褔，倖褔，幸福，辛福，幸畐，莘畐，悻畐，倖畐，幸福，辛福，莘福，倖福";
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
        return finish(new Error("\u5931\u843D\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A".concat(image.src)));
      };
      var timeout = setTimeout(function () {
        return finish(new Error("\u5931\u843D\u7ED3\u5C40\u56FE\u7247\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(image.src)));
      }, IMAGE_LOAD_TIMEOUT_MS);
      image.addEventListener("load", handleLoad, {
        once: true
      });
      image.addEventListener("error", handleError, {
        once: true
      });
    });
  }
  var LostEndingSequence = /*#__PURE__*/function () {
    function LostEndingSequence() {
      var _this$cinema;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, LostEndingSequence);
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.backgroundAudio = options.backgroundAudio || null;
      this.assets = _objectSpread(_objectSpread({}, DEFAULT_ASSETS), options.assets || {});
      this.timers = new Set();
      this.running = null;
      this.overlay = createElement("section", "lost-ending-sequence");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
      this.cinema = createElement("div", "lost-ending-cinema");
      this.backgrounds = [createElement("img", "lost-ending-background is-active"), createElement("img", "lost-ending-background"), createElement("img", "lost-ending-background")];
      this.backgrounds.forEach(function (image) {
        image.alt = "";
      });
      (_this$cinema = this.cinema).append.apply(_this$cinema, _toConsumableArray(this.backgrounds));
      this.text = createElement("p", "lost-ending-text");
      this.wordWall = createElement("div", "lost-ending-word-wall");
      this.populateWordWall();
      this.blackout = createElement("div", "lost-ending-blackout");
      this.overlay.append(this.cinema, this.text, this.wordWall, this.blackout);
    }
    return _createClass(LostEndingSequence, [{
      key: "play",
      value: function play() {
        var _this = this;
        if (this.running) return this.running;
        this.running = this.run().finally(function () {
          return _this.close();
        });
        return this.running;
      }
    }, {
      key: "run",
      value: function () {
        var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _this$backgroundAudio, _this$backgroundAudio2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                this.root.append(this.overlay);
                this.overlay.classList.add("is-visible", "is-loading");
                _context.n = 1;
                return this.preload();
              case 1:
                this.overlay.classList.remove("is-loading");
                (_this$backgroundAudio = this.backgroundAudio) === null || _this$backgroundAudio === void 0 || (_this$backgroundAudio2 = _this$backgroundAudio.setTrack) === null || _this$backgroundAudio2 === void 0 || _this$backgroundAudio2.call(_this$backgroundAudio, "ending_lost", {
                  fadeMs: 7200
                });
                _context.n = 2;
                return this.showState(0, "你第一次见到如此令人安心的场景，天堂应该是这样的，神圣的，慈悲的。", 5200);
              case 2:
                this.overlay.classList.add("is-holy");
                _context.n = 3;
                return this.showState(1, "幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的。", 5800, true);
              case 3:
                this.overlay.classList.add("is-fracturing");
                _context.n = 4;
                return this.showState(2, "", 7600, true);
              case 4:
                _context.n = 5;
                return this.delay(900);
              case 5:
                this.blackout.classList.add("is-visible");
                _context.n = 6;
                return this.delay(1800);
              case 6:
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
          var _this2 = this;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return Promise.all(this.backgrounds.map(function (image, index) {
                  image.src = _this2.assets["state".concat(index + 1)];
                  return waitForImage(image);
                }));
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
      key: "populateWordWall",
      value: function populateWordWall() {
        var _this$wordWall;
        var variants = LOST_TEXT.slice(LOST_TEXT.indexOf("幸福的")).split("，").filter(Boolean);
        var words = Array.from({
          length: 3
        }, function () {
          return variants;
        }).flat();
        (_this$wordWall = this.wordWall).replaceChildren.apply(_this$wordWall, _toConsumableArray(words.map(function (word, index) {
          var span = createElement("span", "lost-ending-word", word);
          span.style.setProperty("--lost-word-delay", "".concat(index % 17 * -95, "ms"));
          if (document.documentMode) span.style.animationDelay = "".concat(index % 17 * -95, "ms");
          return span;
        })));
      }
    }, {
      key: "showState",
      value: function () {
        var _showState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(index, text, duration) {
          var showWall,
            _args3 = arguments;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                showWall = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : false;
                this.backgrounds.forEach(function (image, imageIndex) {
                  return image.classList.toggle("is-active", imageIndex === index);
                });
                this.text.classList.remove("is-visible");
                this.wordWall.classList.toggle("is-visible", showWall);
                _context3.n = 1;
                return this.delay(420);
              case 1:
                this.text.textContent = text;
                this.text.classList.toggle("is-visible", Boolean(text));
                _context3.n = 2;
                return this.delay(duration);
              case 2:
                return _context3.a(2);
            }
          }, _callee3, this);
        }));
        function showState(_x, _x2, _x3) {
          return _showState.apply(this, arguments);
        }
        return showState;
      }()
    }, {
      key: "delay",
      value: function delay(milliseconds) {
        var _this3 = this;
        return new Promise(function (resolve) {
          var timer = {
            handle: setTimeout(resolve, milliseconds)
          };
          _this3.timers.add(timer);
          setTimeout(function () {
            return _this3.timers.delete(timer);
          }, milliseconds);
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this$backgroundAudio3, _this$backgroundAudio4;
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
        (_this$backgroundAudio3 = this.backgroundAudio) === null || _this$backgroundAudio3 === void 0 || (_this$backgroundAudio4 = _this$backgroundAudio3.stopAll) === null || _this$backgroundAudio4 === void 0 || _this$backgroundAudio4.call(_this$backgroundAudio3, {
          duration: 4600
        });
        this.overlay.remove();
        this.running = null;
      }
    }]);
  }();
  Game.LostEndingSequence = LostEndingSequence;
  Game.playLostEndingSequence = function (options) {
    return new LostEndingSequence(options).play();
  };
})(window.TrainGame);
