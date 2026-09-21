function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game) {
  "use strict";

  var Registry = /*#__PURE__*/function () {
    function Registry(label) {
      _classCallCheck(this, Registry);
      this.label = label;
      this.entries = new Map();
    }
    return _createClass(Registry, [{
      key: "register",
      value: function register(name, handler) {
        if (typeof handler !== "function") throw new TypeError("".concat(this.label, " \u5FC5\u987B\u6CE8\u518C\u51FD\u6570"));
        if (this.entries.has(name)) throw new Error("".concat(this.label, " \u91CD\u590D\u6CE8\u518C\uFF1A").concat(name));
        this.entries.set(name, handler);
      }
    }, {
      key: "get",
      value: function get(name) {
        var handler = this.entries.get(name);
        if (!handler) throw new Error("".concat(this.label, " \u672A\u6CE8\u518C\uFF1A").concat(name));
        return handler;
      }
    }, {
      key: "keys",
      value: function keys() {
        return _toConsumableArray(this.entries.keys());
      }
    }]);
  }();
  var EventCancelled = /*#__PURE__*/function (_Error) {
    function EventCancelled() {
      var _this;
      _classCallCheck(this, EventCancelled);
      _this = _callSuper(this, EventCancelled, ["事件已取消"]);
      _this.name = "EventCancelled";
      return _this;
    }
    _inherits(EventCancelled, _Error);
    return _createClass(EventCancelled);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  var TerminalStateReached = /*#__PURE__*/function (_Error2) {
    function TerminalStateReached() {
      var _this2;
      _classCallCheck(this, TerminalStateReached);
      _this2 = _callSuper(this, TerminalStateReached, ["游戏已进入终止状态"]);
      _this2.name = "TerminalStateReached";
      return _this2;
    }
    _inherits(TerminalStateReached, _Error2);
    return _createClass(TerminalStateReached);
  }(/*#__PURE__*/_wrapNativeSuper(Error)); // 小游戏结算动作列表的长度上限，防止模块返回无界列表拖垮事件链。
  var MINIGAME_SETTLEMENT_LIMIT = 100;
  var SCENE_RESOURCE_TIMEOUT_MS = 20000;
  var MAX_CHECK_ATTEMPTS = 2;
  var DIALOGUE_TERMINATORS = new Set(["。", "！", "？", "!", "?"]);
  var INNER_WORLD_LIVING_CONDUCTOR_EVENTS = new Set(["E_516_VOICE", "E_517_TALK", "E_518", "E_519_HASKEY"]);
  var DIALOGUE_TRAILING_MARKS = new Set(["\"", "'", "”", "’", "」", "』", "】", "）", ")", "》", "〉", "›", "»"]);

  // 一句话只占一个对话框：保留句末标点和尾随引号，空白行也作为分段边界。
  function splitDialogueText(value) {
    var text = String(value !== null && value !== void 0 ? value : "");
    var paragraphs = text.split(/\r?\n[ \t]*\r?\n/);
    var lines = [];
    var _iterator = _createForOfIteratorHelper(paragraphs),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var paragraph = _step.value;
        var normalized = paragraph.replace(/\s*\r?\n\s*/g, " ").trim();
        if (!normalized) continue;
        var start = 0;
        for (var index = 0; index < normalized.length;) {
          if (!DIALOGUE_TERMINATORS.has(normalized[index])) {
            index += 1;
            continue;
          }
          index += 1;
          while (index < normalized.length && (DIALOGUE_TERMINATORS.has(normalized[index]) || DIALOGUE_TRAILING_MARKS.has(normalized[index]))) {
            index += 1;
          }
          var _line = normalized.slice(start, index).trim();
          if (_line) lines.push(_line);
          start = index;
        }
        var line = normalized.slice(start).trim();
        if (line) lines.push(line);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return lines.length ? lines : [text];
  }
  var EventEngine = /*#__PURE__*/function () {
    function EventEngine(_ref) {
      var events = _ref.events,
        state = _ref.state,
        scene = _ref.scene,
        ui = _ref.ui,
        items = _ref.items,
        _ref$shouldTerminate = _ref.shouldTerminate,
        shouldTerminate = _ref$shouldTerminate === void 0 ? function () {
          return false;
        } : _ref$shouldTerminate,
        _ref$onTerminate = _ref.onTerminate,
        onTerminate = _ref$onTerminate === void 0 ? function () {} : _ref$onTerminate,
        _ref$onCheckCompleted = _ref.onCheckCompleted,
        onCheckCompleted = _ref$onCheckCompleted === void 0 ? /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2);
            }
          }, _callee);
        })) : _ref$onCheckCompleted;
      _classCallCheck(this, EventEngine);
      this.events = new Map(events.map(function (event) {
        return [event.id, event];
      }));
      this.items = new Map(items.map(function (item) {
        return [item.id, item];
      }));
      this.state = state;
      this.scene = scene;
      this.ui = ui;
      this.actions = new Registry("动作类型");
      this.customActions = new Registry("自定义动作");
      this.busy = false;
      this.paused = false;
      this.waitReason = null;
      this.activeRun = null;
      this.runSerial = 0;
      this.pauseWaiters = new Set();
      this.timers = new Set();
      this.pendingWaits = new Set();
      this.advanceBoundVoices = new Map();
      this.checkpoint = {
        state: state.snapshot(),
        resume: null
      };
      this.onStateChanged = function () {};
      this.onCheckpointChanged = function () {};
      this.shouldTerminate = shouldTerminate;
      this.onTerminate = onTerminate;
      this.onCheckCompleted = onCheckCompleted;
      this.registerBuiltIns();
    }
    return _createClass(EventEngine, [{
      key: "registerAction",
      value: function registerAction(type, handler) {
        this.actions.register(type, handler);
      }
    }, {
      key: "registerCustomAction",
      value: function registerCustomAction(name, handler) {
        this.customActions.register(name, handler);
      }
    }, {
      key: "checkIdentity",
      value: function checkIdentity(action) {
        if (typeof action.checkId === "string" && action.checkId) return "id:".concat(action.checkId);
        return "event:".concat(this.state.currentEventId || "global", ":").concat(action.dice);
      }
    }, {
      key: "stopAdvanceBoundVoices",
      value: function stopAdvanceBoundVoices() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var bindings = _toConsumableArray(this.advanceBoundVoices.entries()).filter(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 1),
            voice = _ref4[0];
          return !voice.stopped;
        });
        if (!force && bindings.some(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
            voice = _ref6[0],
            advances = _ref6[1];
          return advances <= 1 && voice.segmentReady === false;
        })) return false;
        var _iterator2 = _createForOfIteratorHelper(bindings),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
              voice = _step2$value[0],
              advances = _step2$value[1];
            if (advances <= 1) {
              voice.stop();
              this.advanceBoundVoices.delete(voice);
            } else {
              this.advanceBoundVoices.set(voice, advances - 1);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return true;
      }
    }, {
      key: "registerBuiltIns",
      value: function registerBuiltIns() {
        var _this3 = this;
        this.registerAction("dialogue", /*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(action) {
            var run, _iterator3, _step3, text, portrait, _t;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  run = _this3.activeRun;
                  _context2.n = 1;
                  return _this3.waitFor(_this3.scene.whenReady(), run, {
                    timeoutMs: SCENE_RESOURCE_TIMEOUT_MS,
                    label: "场景图片"
                  });
                case 1:
                  _context2.n = 2;
                  return _this3.waitWhilePaused(run);
                case 2:
                  _iterator3 = _createForOfIteratorHelper(splitDialogueText(action.text));
                  _context2.p = 3;
                  _iterator3.s();
                case 4:
                  if ((_step3 = _iterator3.n()).done) {
                    _context2.n = 8;
                    break;
                  }
                  text = _step3.value;
                  if (!action.audio) {
                    _context2.n = 6;
                    break;
                  }
                  if (_this3.ui.audio) {
                    _context2.n = 5;
                    break;
                  }
                  throw new Error("音效系统未加载：缺少 src/audio.js 或 ui.audio");
                case 5:
                  _this3.ui.audio.play(action.audio.sound, {
                    start: action.audio.start,
                    duration: action.audio.duration,
                    volume: action.audio.volume,
                    loop: action.audio.loop === true,
                    loopGapMs: action.audio.loopGapMs,
                    segmentDuration: action.audio.segmentDuration
                  });
                case 6:
                  portrait = action.portrait || (action.speaker === "？？？" && INNER_WORLD_LIVING_CONDUCTOR_EVENTS.has(_this3.state.currentEventId) && _this3.state.flags.crew_met === true && _this3.state.flags.crew_04_medical_success === true ? "assets/Image/Portrait/conductor.ie.png" : "");
                  _context2.n = 7;
                  return _this3.ui.dialog.showLine(_objectSpread(_objectSpread({}, action), {}, {
                    text: text,
                    portrait: portrait,
                    onAdvance: function onAdvance() {
                      return _this3.stopAdvanceBoundVoices();
                    }
                  }));
                case 7:
                  _context2.n = 4;
                  break;
                case 8:
                  _context2.n = 10;
                  break;
                case 9:
                  _context2.p = 9;
                  _t = _context2.v;
                  _iterator3.e(_t);
                case 10:
                  _context2.p = 10;
                  _iterator3.f();
                  return _context2.f(10);
                case 11:
                  return _context2.a(2);
              }
            }, _callee2, null, [[3, 9, 10, 11]]);
          }));
          return function (_x) {
            return _ref7.apply(this, arguments);
          };
        }());
        this.registerAction("inspect", /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(action) {
            var _this3$ui$closeDialog, _this3$ui;
            var item;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  // 调查窗口会覆盖场景，但对白窗口仍可能留在 window-layer 中；
                  // 先关闭它，避免地图/物品图层下残留上一句对白。
                  (_this3$ui$closeDialog = (_this3$ui = _this3.ui).closeDialog) === null || _this3$ui$closeDialog === void 0 || _this3$ui$closeDialog.call(_this3$ui);
                  if (action.item) {
                    _context3.n = 2;
                    break;
                  }
                  _context3.n = 1;
                  return _this3.ui.inspect.show(action);
                case 1:
                  return _context3.a(2);
                case 2:
                  item = _this3.items.get(action.item);
                  if (item) {
                    _context3.n = 3;
                    break;
                  }
                  throw new Error("\u8C03\u67E5\u7269\u54C1\u672A\u6CE8\u518C\uFF1A".concat(action.item));
                case 3:
                  _context3.n = 4;
                  return _this3.ui.itemInspect.show({
                    title: action.title || item.name,
                    text: action.text || item.description,
                    image: action.image || item.image
                  });
                case 4:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          return function (_x2) {
            return _ref8.apply(this, arguments);
          };
        }());
        this.registerAction("choice", /*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(action) {
            var options, selected;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  _this3.ui.closeDialog();
                  options = action.options.filter(function (option) {
                    return Game.evaluateCondition(option.when, _this3.state);
                  });
                  if (options.length) {
                    _context4.n = 1;
                    break;
                  }
                  throw new Error("\u9009\u9879\u52A8\u4F5C\u6CA1\u6709\u53EF\u7528\u9009\u9879\uFF1A".concat(action.id || "未命名"));
                case 1:
                  _context4.n = 2;
                  return _this3.ui.choice.choose(action.prompt, options);
                case 2:
                  selected = _context4.v;
                  return _context4.a(2, selected ? {
                    next: selected.next,
                    stop: true
                  } : null);
              }
            }, _callee4);
          }));
          return function (_x3) {
            return _ref9.apply(this, arguments);
          };
        }());
        this.registerAction("check", /*#__PURE__*/function () {
          var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(action) {
            var outcomes, hasBranch, checkKey, previous, previousAttempts, canRun, index, grade, resolver, resolved, criticalTarget;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  if (Game.Dice) {
                    _context5.n = 1;
                    break;
                  }
                  throw new Error("检定系统未加载：缺少 src/dice.js");
                case 1:
                  outcomes = Array.isArray(action.outcomes) ? action.outcomes : [];
                  hasBranch = outcomes.length > 0;
                  checkKey = _this3.checkIdentity(action);
                  if (!_this3.state.checkAttempts) _this3.state.checkAttempts = {};
                  previous = _this3.state.checkAttempts[checkKey];
                  previousAttempts = Number.isInteger(previous === null || previous === void 0 ? void 0 : previous.attempts) && previous.attempts >= 0 ? previous.attempts : 0;
                  canRun = previousAttempts < MAX_CHECK_ATTEMPTS && (previous === null || previous === void 0 ? void 0 : previous.success) !== true;
                  grade = null;
                  if (!canRun) {
                    _context5.n = 5;
                    break;
                  }
                  resolver = Game.Dice.get(action.dice);
                  _context5.n = 2;
                  return resolver(_this3.context(), outcomes);
                case 2:
                  resolved = _context5.v;
                  if (Number.isInteger(resolved)) {
                    index = resolved;
                  } else if (resolved && Number.isInteger(resolved.index)) {
                    index = resolved.index;
                    grade = resolved.grade || null;
                  } else {
                    index = resolved;
                  }
                  if (!(hasBranch && (!Number.isInteger(index) || index < 0 || index >= outcomes.length))) {
                    _context5.n = 3;
                    break;
                  }
                  throw new Error("\u68C0\u5B9A ".concat(action.dice, " \u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u7ED3\u679C\u7F16\u53F7\uFF1A").concat(index));
                case 3:
                  if (!(grade !== null && !["criticalSuccess", "criticalFailure"].includes(grade))) {
                    _context5.n = 4;
                    break;
                  }
                  throw new Error("\u68C0\u5B9A ".concat(action.dice, " \u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u7ED3\u679C\u7B49\u7EA7\uFF1A").concat(grade));
                case 4:
                  _this3.state.checkAttempts[checkKey] = {
                    dice: action.dice,
                    attempts: previousAttempts + 1,
                    outcome: hasBranch ? index : null,
                    success: hasBranch && index === 0,
                    grade: grade
                  };
                  _context5.n = 6;
                  break;
                case 5:
                  index = previous === null || previous === void 0 ? void 0 : previous.outcome;
                  grade = (previous === null || previous === void 0 ? void 0 : previous.grade) || null;
                  if (!(hasBranch && (!Number.isInteger(index) || index < 0 || index >= outcomes.length))) {
                    _context5.n = 6;
                    break;
                  }
                  throw new Error("\u68C0\u5B9A ".concat(action.dice, " \u7684\u5DF2\u5B8C\u6210\u8BB0\u5F55\u65E0\u6548"));
                case 6:
                  if (!canRun) {
                    _context5.n = 7;
                    break;
                  }
                  // 自动留痕：以 dice 编号为键写入最小记录；检定函数可先写入补充字段，此处合并保留。
                  _this3.state.checkResults[action.dice] = Object.assign({}, _this3.state.checkResults[action.dice], {
                    dice: action.dice,
                    outcome: hasBranch ? index : null,
                    grade: grade
                  });
                  _context5.n = 7;
                  return _this3.onCheckCompleted(action, hasBranch ? index : null);
                case 7:
                  if (hasBranch) {
                    _context5.n = 8;
                    break;
                  }
                  return _context5.a(2, null);
                case 8:
                  criticalTarget = grade === "criticalSuccess" ? action.criticalSuccess : grade === "criticalFailure" ? action.criticalFailure : null;
                  return _context5.a(2, {
                    next: criticalTarget || outcomes[index],
                    stop: true
                  });
              }
            }, _callee5);
          }));
          return function (_x4) {
            return _ref0.apply(this, arguments);
          };
        }());
        this.registerAction("changeScene", /*#__PURE__*/function () {
          var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(action) {
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  if (!(_this3.state.sceneId === "carriage_06" && action.scene === "carriage_05" && _this3.state.flags.ev008_scouting_done !== true)) {
                    _context6.n = 1;
                    break;
                  }
                  _this3.ui.toast("远处不断传来怪异的断裂声。贸然前进之前，你得先确认7号车厢发生了什么。");
                  return _context6.a(2, {
                    stop: true
                  });
                case 1:
                  _this3.ui.closeDialog();
                  _context6.n = 2;
                  return _this3.loadScene(action.scene);
                case 2:
                  return _context6.a(2);
              }
            }, _callee6);
          }));
          return function (_x5) {
            return _ref1.apply(this, arguments);
          };
        }());
        this.registerAction("setFlag", /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(action) {
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  _this3.state.flags[action.key] = action.value;
                case 1:
                  return _context7.a(2);
              }
            }, _callee7);
          }));
          return function (_x6) {
            return _ref10.apply(this, arguments);
          };
        }());
        this.registerAction("modifyAttribute", /*#__PURE__*/function () {
          var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(action) {
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  _this3.applyAttributeChange(action.attribute, action.amount);
                case 1:
                  return _context8.a(2);
              }
            }, _callee8);
          }));
          return function (_x7) {
            return _ref11.apply(this, arguments);
          };
        }());
        this.registerAction("setSkill", /*#__PURE__*/function () {
          var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(action) {
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  _this3.state.setSkill(action.skill, action.value);
                case 1:
                  return _context9.a(2);
              }
            }, _callee9);
          }));
          return function (_x8) {
            return _ref12.apply(this, arguments);
          };
        }());
        this.registerAction("learnSkill", /*#__PURE__*/function () {
          var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(action) {
            return _regenerator().w(function (_context0) {
              while (1) switch (_context0.n) {
                case 0:
                  _this3.state.learnSkill(action.skill);
                case 1:
                  return _context0.a(2);
              }
            }, _callee0);
          }));
          return function (_x9) {
            return _ref13.apply(this, arguments);
          };
        }());
        this.registerAction("loseSkill", /*#__PURE__*/function () {
          var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(action) {
            return _regenerator().w(function (_context1) {
              while (1) switch (_context1.n) {
                case 0:
                  _this3.state.loseSkill(action.skill);
                case 1:
                  return _context1.a(2);
              }
            }, _callee1);
          }));
          return function (_x0) {
            return _ref14.apply(this, arguments);
          };
        }());
        this.registerAction("addItem", /*#__PURE__*/function () {
          var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(action) {
            var item, alreadyOwned, _this3$ui$showAcquisi, _this3$ui2;
            return _regenerator().w(function (_context10) {
              while (1) switch (_context10.n) {
                case 0:
                  item = _this3.items.get(action.item);
                  if (item) {
                    _context10.n = 1;
                    break;
                  }
                  throw new Error("\u7269\u54C1\u4E0D\u5B58\u5728\uFF1A".concat(action.item));
                case 1:
                  alreadyOwned = _this3.state.inventory.includes(action.item);
                  _this3.state.addItem(action.item);
                  if (!alreadyOwned) {
                    (_this3$ui$showAcquisi = (_this3$ui2 = _this3.ui).showAcquisition) === null || _this3$ui$showAcquisi === void 0 || _this3$ui$showAcquisi.call(_this3$ui2, {
                      name: item.name,
                      image: item.image,
                      detail: "已加入物品栏"
                    });
                  }
                case 2:
                  return _context10.a(2);
              }
            }, _callee10);
          }));
          return function (_x1) {
            return _ref15.apply(this, arguments);
          };
        }());
        this.registerAction("removeItem", /*#__PURE__*/function () {
          var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(action) {
            return _regenerator().w(function (_context11) {
              while (1) switch (_context11.n) {
                case 0:
                  if (_this3.items.has(action.item)) {
                    _context11.n = 1;
                    break;
                  }
                  throw new Error("\u7269\u54C1\u4E0D\u5B58\u5728\uFF1A".concat(action.item));
                case 1:
                  _this3.state.removeItem(action.item);
                case 2:
                  return _context11.a(2);
              }
            }, _callee11);
          }));
          return function (_x10) {
            return _ref16.apply(this, arguments);
          };
        }());
        this.registerAction("setObjectState", /*#__PURE__*/function () {
          var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(action) {
            return _regenerator().w(function (_context12) {
              while (1) switch (_context12.n) {
                case 0:
                  _this3.state.setObjectState(action.object, action.patch);
                case 1:
                  return _context12.a(2);
              }
            }, _callee12);
          }));
          return function (_x11) {
            return _ref17.apply(this, arguments);
          };
        }());

        // 小游戏结算专用跳转动作：模块返回后把当前事件链切到指定事件。
        this.registerAction("jump", /*#__PURE__*/function () {
          var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(action) {
            return _regenerator().w(function (_context13) {
              while (1) switch (_context13.n) {
                case 0:
                  if (!(typeof action.next !== "string" || !action.next)) {
                    _context13.n = 1;
                    break;
                  }
                  throw new Error("跳转动作缺少目标事件编号");
                case 1:
                  return _context13.a(2, {
                    next: action.next,
                    stop: true
                  });
              }
            }, _callee13);
          }));
          return function (_x12) {
            return _ref18.apply(this, arguments);
          };
        }());

        // 条件成立时结束当前事件并进入指定事件；用于把物件调查完成状态接到剧情入口。
        this.registerAction("conditionalJump", /*#__PURE__*/function () {
          var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(action) {
            return _regenerator().w(function (_context14) {
              while (1) switch (_context14.n) {
                case 0:
                  if (Game.evaluateCondition(action.when, _this3.state)) {
                    _context14.n = 1;
                    break;
                  }
                  return _context14.a(2, null);
                case 1:
                  if (!(typeof action.next !== "string" || !action.next)) {
                    _context14.n = 2;
                    break;
                  }
                  throw new Error("条件跳转动作缺少目标事件编号");
                case 2:
                  return _context14.a(2, {
                    next: action.next,
                    stop: true
                  });
              }
            }, _callee14);
          }));
          return function (_x13) {
            return _ref19.apply(this, arguments);
          };
        }());

        // 音效播放：JSON 只写 data/audio.json 里的编号，路径与音量配平留在数据文件。
        // 默认“触发即走”，与对话并行；写 await: true 时等这条音效播完再继续，
        // 等待复用可取消的 waitFor：取消立即结束、元数据异常时有安全超时兜底。
        this.registerAction("sound", /*#__PURE__*/function () {
          var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(action) {
            var voice, advances;
            return _regenerator().w(function (_context15) {
              while (1) switch (_context15.p = _context15.n) {
                case 0:
                  if (_this3.ui.audio) {
                    _context15.n = 1;
                    break;
                  }
                  throw new Error("音效系统未加载：缺少 src/audio.js 或 ui.audio");
                case 1:
                  voice = _this3.ui.audio.play(action.sound, {
                    start: action.start,
                    duration: action.duration,
                    volume: action.volume,
                    loop: action.loop === true,
                    loopGapMs: action.loopGapMs,
                    segmentDuration: action.segmentDuration,
                    startWithoutMetadata: action.startWithoutMetadata === true,
                    fadeMs: action.fadeMs
                  });
                  if (action.stopOnDialogueAdvance === true) {
                    advances = Math.max(1, Number(action.stopAfterDialogueAdvances) || 1);
                    _this3.advanceBoundVoices.set(voice, advances);
                    voice.finished.then(function () {
                      return _this3.advanceBoundVoices.delete(voice);
                    });
                  }
                  if (!(action.await !== true)) {
                    _context15.n = 2;
                    break;
                  }
                  return _context15.a(2, null);
                case 2:
                  _context15.p = 2;
                  _context15.n = 3;
                  return _this3.waitFor(voice.finished, _this3.activeRun, {
                    timeoutMs: Game.AUDIO_MAX_VOICE_WAIT_MS,
                    label: "\u97F3\u6548 ".concat(action.sound)
                  });
                case 3:
                  _context15.p = 3;
                  voice.stop();
                  return _context15.f(3);
                case 4:
                  return _context15.a(2, null);
              }
            }, _callee15, null, [[2,, 3, 4]]);
          }));
          return function (_x14) {
            return _ref20.apply(this, arguments);
          };
        }());
        this.registerAction("custom", /*#__PURE__*/function () {
          var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(action) {
            var handler;
            return _regenerator().w(function (_context16) {
              while (1) switch (_context16.n) {
                case 0:
                  handler = _this3.customActions.get(action.name);
                  _context16.n = 1;
                  return handler(action.params || {}, _this3.context());
                case 1:
                  return _context16.a(2);
              }
            }, _callee16);
          }));
          return function (_x15) {
            return _ref21.apply(this, arguments);
          };
        }());

        // 小游戏动作：JSON 只写注册表索引（仿 check→dice.js 的分离架构，不做分支假设）。
        // 小游戏模块可自由选择返回或不返回一个动作列表；解释器拿到动作列表时按当前事件的
        // 语义顺序执行（含暂停/取消/终止检查，见 runAction），列表为空或未返回则无事发生。
        this.registerAction("minigame", /*#__PURE__*/function () {
          var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(action) {
            var _this3$ui$closeDialog2, _this3$ui3, _host$setQuitAllowed;
            var spec, host, stage, context, cleanups, gameContext, settlement, running, quit, _i, _cleanups, cleanup, result, _iterator4, _step4, item, _t2;
            return _regenerator().w(function (_context17) {
              while (1) switch (_context17.p = _context17.n) {
                case 0:
                  if (Game.Minigames) {
                    _context17.n = 1;
                    break;
                  }
                  throw new Error("小游戏系统未加载：缺少 src/minigames.js");
                case 1:
                  spec = Game.Minigames.get(action.game);
                  host = _this3.ui.minigame || null; // 小游戏使用独立覆盖层；清掉对白窗口，避免上一句文字穿透到卡牌等玩法界面。
                  (_this3$ui$closeDialog2 = (_this3$ui3 = _this3.ui).closeDialog) === null || _this3$ui$closeDialog2 === void 0 || _this3$ui$closeDialog2.call(_this3$ui3);
                  stage = host ? host.openAndStage(spec.title, action.game) : null;
                  if (host) (_host$setQuitAllowed = host.setQuitAllowed) === null || _host$setQuitAllowed === void 0 || _host$setQuitAllowed.call(host, spec.allowQuit !== false);
                  context = _this3.context();
                  cleanups = [];
                  gameContext = _objectSpread(_objectSpread({}, context), {}, {
                    stage: stage,
                    // 注册“退出小游戏”按钮的结算提供者；未注册时退出视为放弃、无结算。
                    onQuit: function onQuit(provider) {
                      if (host && typeof provider === "function") host.setQuitProvider(provider);
                    },
                    // 模块在此登记收尾函数（取消 rAF/移除监听/释放 GL 等），宿主关闭后统一执行一次。
                    registerCleanup: function registerCleanup(fn) {
                      if (typeof fn === "function") cleanups.push(fn);
                    }
                  });
                  settlement = null;
                  _context17.p = 2;
                  running = Promise.resolve(spec.run(gameContext));
                  if (host) {
                    _context17.n = 4;
                    break;
                  }
                  _context17.n = 3;
                  return running;
                case 3:
                  settlement = _context17.v;
                  _context17.n = 6;
                  break;
                case 4:
                  // 自然结束与“退出”按钮二者取其先；退出先行时 running 的后发拒绝被吞掉，
                  // 只记日志，不打断剧情（正常路径的失败仍会经 Promise.race 抛给事件链回滚）。
                  quit = host.quitPromise();
                  _context17.n = 5;
                  return Promise.race([running.then(function (value) {
                    return {
                      value: value
                    };
                  }), quit.then(function (value) {
                    return {
                      value: value
                    };
                  })]).then(function (winner) {
                    return winner.value;
                  });
                case 5:
                  settlement = _context17.v;
                  running.catch(function (error) {
                    return console.error("小游戏运行异常：", error);
                  });
                case 6:
                  _context17.p = 6;
                  for (_i = 0, _cleanups = cleanups; _i < _cleanups.length; _i++) {
                    cleanup = _cleanups[_i];
                    try {
                      cleanup();
                    } catch (error) {
                      console.error("小游戏收尾失败：", error);
                    }
                  }
                  if (host) host.close();
                  return _context17.f(6);
                case 7:
                  if (!(!Array.isArray(settlement) || settlement.length === 0)) {
                    _context17.n = 8;
                    break;
                  }
                  return _context17.a(2, null);
                case 8:
                  if (!(settlement.length > MINIGAME_SETTLEMENT_LIMIT)) {
                    _context17.n = 9;
                    break;
                  }
                  throw new Error("\u5C0F\u6E38\u620F ".concat(action.game, " \u8FD4\u56DE\u7684\u7ED3\u7B97\u52A8\u4F5C\u8D85\u8FC7 ").concat(MINIGAME_SETTLEMENT_LIMIT, " \u6761"));
                case 9:
                  result = null;
                  _iterator4 = _createForOfIteratorHelper(settlement);
                  _context17.p = 10;
                  _iterator4.s();
                case 11:
                  if ((_step4 = _iterator4.n()).done) {
                    _context17.n = 16;
                    break;
                  }
                  item = _step4.value;
                  if (!(!item || _typeof(item) !== "object" || typeof item.type !== "string")) {
                    _context17.n = 12;
                    break;
                  }
                  throw new Error("\u5C0F\u6E38\u620F ".concat(action.game, " \u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u7ED3\u7B97\u52A8\u4F5C"));
                case 12:
                  if (!(item.type === "minigame")) {
                    _context17.n = 13;
                    break;
                  }
                  throw new Error("小游戏结算动作里不能再嵌套小游戏");
                case 13:
                  _context17.n = 14;
                  return _this3.runAction(item);
                case 14:
                  result = _context17.v;
                  if (!(result && result.stop)) {
                    _context17.n = 15;
                    break;
                  }
                  return _context17.a(3, 16);
                case 15:
                  _context17.n = 11;
                  break;
                case 16:
                  _context17.n = 18;
                  break;
                case 17:
                  _context17.p = 17;
                  _t2 = _context17.v;
                  _iterator4.e(_t2);
                case 18:
                  _context17.p = 18;
                  _iterator4.f();
                  return _context17.f(18);
                case 19:
                  return _context17.a(2, result);
              }
            }, _callee17, null, [[10, 17, 18, 19], [2,, 6, 7]]);
          }));
          return function (_x16) {
            return _ref22.apply(this, arguments);
          };
        }());
      }
    }, {
      key: "context",
      value: function context() {
        var _this4 = this;
        var run = this.activeRun;
        return {
          state: this.state,
          scene: this.scene,
          ui: this.ui,
          engine: this,
          items: this.items,
          attributes: this.state.attributeDefinitions,
          skills: this.state.skillDefinitions,
          modifyAttribute: function modifyAttribute(attribute, amount) {
            return _this4.applyAttributeChange(attribute, amount);
          },
          wait: function wait(milliseconds) {
            return _this4.wait(milliseconds, run);
          },
          throwIfCancelled: function throwIfCancelled() {
            return _this4.assertActive(run);
          }
        };
      }
    }, {
      key: "applyAttributeChange",
      value: function applyAttributeChange(attribute, amount) {
        var _this$ui$showAttribut, _this$ui, _definition$max;
        var definition = this.state.attributeDefinitions.get(attribute);
        var before = this.state.getAttribute(attribute);
        var after = this.state.modifyAttribute(attribute, amount);
        (_this$ui$showAttribut = (_this$ui = this.ui).showAttributeChange) === null || _this$ui$showAttribut === void 0 || _this$ui$showAttribut.call(_this$ui, {
          name: (definition === null || definition === void 0 ? void 0 : definition.name) || attribute,
          requested: amount,
          before: before,
          after: after,
          min: definition === null || definition === void 0 ? void 0 : definition.min,
          max: (_definition$max = definition === null || definition === void 0 ? void 0 : definition.max) !== null && _definition$max !== void 0 ? _definition$max : null
        });
        return after;
      }

      // 执行单个动作的公共步骤：暂停等待 → 调处理器 → 校验运行仍有效 → 刷新状态 → 终止检查。
      // 事件主循环与小游戏结算动作列表共用同一语义，避免两套行为分叉。
    }, {
      key: "runAction",
      value: function () {
        var _runAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(action) {
          var run, result;
          return _regenerator().w(function (_context18) {
            while (1) switch (_context18.n) {
              case 0:
                run = this.activeRun;
                _context18.n = 1;
                return this.waitWhilePaused(run);
              case 1:
                _context18.n = 2;
                return this.actions.get(action.type)(action, this.context());
              case 2:
                result = _context18.v;
                this.assertActive(run);
                this.onStateChanged();
                if (!this.shouldTerminate(this.state)) {
                  _context18.n = 3;
                  break;
                }
                throw new TerminalStateReached();
              case 3:
                return _context18.a(2, result);
            }
          }, _callee18, this);
        }));
        function runAction(_x17) {
          return _runAction.apply(this, arguments);
        }
        return runAction;
      }()
    }, {
      key: "normalizeResume",
      value: function normalizeResume(resume) {
        if (resume === null || resume === undefined) return null;
        if (!resume || _typeof(resume) !== "object" || Array.isArray(resume) || typeof resume.eventId !== "string" || !resume.eventId || !Number.isInteger(resume.actionIndex) || resume.actionIndex < 0) {
          throw new TypeError("检查点恢复游标无效");
        }
        var event = this.events.get(resume.eventId);
        if (!event) throw new Error("\u68C0\u67E5\u70B9\u5F15\u7528\u4E86\u4E0D\u5B58\u5728\u7684\u4E8B\u4EF6\uFF1A".concat(resume.eventId));
        var actionCount = Array.isArray(event.actions) ? event.actions.length : 0;
        if (resume.actionIndex > actionCount) {
          throw new RangeError("\u68C0\u67E5\u70B9\u52A8\u4F5C\u4E0B\u6807\u8D8A\u754C\uFF1A".concat(resume.eventId, "#").concat(resume.actionIndex));
        }
        return {
          eventId: resume.eventId,
          actionIndex: resume.actionIndex
        };
      }
    }, {
      key: "notifyCheckpointChanged",
      value: function notifyCheckpointChanged() {
        try {
          this.onCheckpointChanged(this.getCheckpoint());
        } catch (error) {
          console.warn("检查点变更通知失败：", error);
        }
      }
    }, {
      key: "getCheckpoint",
      value: function getCheckpoint() {
        return Game.deepClone(this.checkpoint);
      }
    }, {
      key: "loadScene",
      value: function () {
        var _loadScene = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(sceneId) {
          var run;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.n) {
              case 0:
                run = this.activeRun;
                _context19.n = 1;
                return this.waitFor(this.scene.prepare(sceneId), run, {
                  timeoutMs: SCENE_RESOURCE_TIMEOUT_MS,
                  label: "场景资源"
                });
              case 1:
                _context19.n = 2;
                return this.waitWhilePaused(run);
              case 2:
                this.scene.load(sceneId);
                _context19.n = 3;
                return this.waitFor(this.scene.whenReady(), run, {
                  timeoutMs: SCENE_RESOURCE_TIMEOUT_MS,
                  label: "场景图片"
                });
              case 3:
                _context19.n = 4;
                return this.waitWhilePaused(run);
              case 4:
                return _context19.a(2);
            }
          }, _callee19, this);
        }));
        function loadScene(_x18) {
          return _loadScene.apply(this, arguments);
        }
        return loadScene;
      }() // 图片加载本身不能取消，但取消事件必须立即结束等待，且不提交迟到的画面。
    }, {
      key: "waitFor",
      value: function () {
        var _waitFor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(promise) {
          var _this5 = this;
          var run,
            options,
            timeoutMs,
            label,
            previousWaitReason,
            pending,
            timeoutHandle,
            cancelled,
            waits,
            result,
            _args20 = arguments;
          return _regenerator().w(function (_context20) {
            while (1) switch (_context20.p = _context20.n) {
              case 0:
                run = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : this.activeRun;
                options = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : {};
                this.assertActive(run);
                timeoutMs = Math.max(0, Number(options.timeoutMs) || 0);
                label = options.label || "资源";
                previousWaitReason = this.waitReason;
                this.waitReason = label;
                timeoutHandle = null;
                cancelled = new Promise(function (resolve, reject) {
                  pending = {
                    run: run,
                    reject: reject
                  };
                  _this5.pendingWaits.add(pending);
                });
                waits = [promise, cancelled];
                if (timeoutMs > 0) {
                  waits.push(new Promise(function (resolve, reject) {
                    timeoutHandle = setTimeout(function () {
                      return reject(new Error("".concat(label, "\u52A0\u8F7D\u8D85\u65F6")));
                    }, timeoutMs);
                  }));
                }
                _context20.p = 1;
                _context20.n = 2;
                return Promise.race(waits);
              case 2:
                result = _context20.v;
                this.assertActive(run);
                return _context20.a(2, result);
              case 3:
                _context20.p = 3;
                if (timeoutHandle !== null) clearTimeout(timeoutHandle);
                if (this.waitReason === label) this.waitReason = previousWaitReason;
                this.pendingWaits.delete(pending);
                return _context20.f(3);
              case 4:
                return _context20.a(2);
            }
          }, _callee20, this, [[1,, 3, 4]]);
        }));
        function waitFor(_x19) {
          return _waitFor.apply(this, arguments);
        }
        return waitFor;
      }()
    }, {
      key: "adoptCheckpoint",
      value: function adoptCheckpoint() {
        var resume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.checkpoint = {
          state: this.state.snapshot(),
          resume: this.normalizeResume(resume)
        };
        this.notifyCheckpointChanged();
      }
    }, {
      key: "restoreCheckpoint",
      value: function restoreCheckpoint() {
        var checkpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.checkpoint;
        if (!checkpoint || _typeof(checkpoint) !== "object" || Array.isArray(checkpoint)) {
          throw new TypeError("检查点格式无效");
        }
        var resume = this.normalizeResume(checkpoint.resume);
        this.state.restore(checkpoint.state);
        this.checkpoint = {
          state: this.state.snapshot(),
          resume: resume
        };
        if (this.state.sceneId) this.scene.load(this.state.sceneId);
        this.onStateChanged();
        this.notifyCheckpointChanged();
        return this.getCheckpoint();
      }
    }, {
      key: "setPaused",
      value: function setPaused(value) {
        if (this.paused === value) return;
        this.paused = value;
        this.ui.setPaused(value);
        var _iterator5 = _createForOfIteratorHelper(this.timers),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var timer = _step5.value;
            if (value) this.pauseTimer(timer);else this.startTimer(timer);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        if (!value) {
          var _iterator6 = _createForOfIteratorHelper(this.pauseWaiters),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var resolve = _step6.value;
              resolve();
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          this.pauseWaiters.clear();
        }
      }
    }, {
      key: "waitWhilePaused",
      value: function waitWhilePaused(run) {
        var _this6 = this;
        this.assertActive(run);
        if (!this.paused) return Promise.resolve();
        return new Promise(function (resolve) {
          return _this6.pauseWaiters.add(resolve);
        }).then(function () {
          return _this6.assertActive(run);
        });
      }
    }, {
      key: "wait",
      value: function wait(milliseconds) {
        var _this7 = this;
        var run = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.activeRun;
        this.assertActive(run);
        var duration = Math.max(0, Number(milliseconds) || 0);
        return new Promise(function (resolve, reject) {
          var timer = {
            run: run,
            remaining: duration,
            elapsed: 0,
            startedAt: 0,
            handle: null,
            resolve: resolve,
            reject: reject
          };
          _this7.timers.add(timer);
          if (!_this7.paused) _this7.startTimer(timer);
        });
      }
    }, {
      key: "startTimer",
      value: function startTimer(timer) {
        var _this8 = this;
        if (timer.handle !== null || !this.timers.has(timer)) return;
        timer.startedAt = performance.now();
        timer.handle = setTimeout(function () {
          timer.handle = null;
          _this8.timers.delete(timer);
          timer.elapsed += performance.now() - timer.startedAt;
          timer.resolve(timer.elapsed);
        }, timer.remaining);
      }
    }, {
      key: "pauseTimer",
      value: function pauseTimer(timer) {
        if (timer.handle === null) return;
        clearTimeout(timer.handle);
        timer.handle = null;
        var elapsed = performance.now() - timer.startedAt;
        timer.elapsed += elapsed;
        timer.remaining = Math.max(0, timer.remaining - elapsed);
      }
    }, {
      key: "cancelTimers",
      value: function cancelTimers(run) {
        for (var _i2 = 0, _arr = _toConsumableArray(this.timers); _i2 < _arr.length; _i2++) {
          var timer = _arr[_i2];
          if (timer.run !== run) continue;
          clearTimeout(timer.handle);
          this.timers.delete(timer);
          timer.reject(new EventCancelled());
        }
      }
    }, {
      key: "assertActive",
      value: function assertActive(run) {
        if (!run || run.cancelled || this.activeRun !== run) throw new EventCancelled();
      }
    }, {
      key: "cancelToCheckpoint",
      value: function () {
        var _cancelToCheckpoint = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
          var run, _iterator7, _step7, _pending;
          return _regenerator().w(function (_context21) {
            while (1) switch (_context21.n) {
              case 0:
                run = this.activeRun;
                if (!run) {
                  _context21.n = 1;
                  break;
                }
                run.cancelled = true;
                _iterator7 = _createForOfIteratorHelper(this.pendingWaits);
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    _pending = _step7.value;
                    if (_pending.run === run) _pending.reject(new EventCancelled());
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
                this.cancelTimers(run);
                this.setPaused(false);
                this.ui.cancelPending();
                _context21.n = 1;
                return run.finished;
              case 1:
                this.restoreCheckpoint();
              case 2:
                return _context21.a(2);
            }
          }, _callee21, this);
        }));
        function cancelToCheckpoint() {
          return _cancelToCheckpoint.apply(this, arguments);
        }
        return cancelToCheckpoint;
      }()
    }, {
      key: "resumeCheckpoint",
      value: function resumeCheckpoint() {
        var resume = this.checkpoint.resume;
        if (!resume) return Promise.resolve(false);
        return this.play(resume.eventId, resume.actionIndex);
      }
    }, {
      key: "play",
      value: function () {
        var _play = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(eventId) {
          var actionIndex,
            run,
            completed,
            terminated,
            nextId,
            nextActionIndex,
            guard,
            event,
            actions,
            index,
            action,
            result,
            _args22 = arguments,
            _t3,
            _t4;
          return _regenerator().w(function (_context22) {
            while (1) switch (_context22.p = _context22.n) {
              case 0:
                actionIndex = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : 0;
                if (!this.busy) {
                  _context22.n = 1;
                  break;
                }
                return _context22.a(2, false);
              case 1:
                run = {
                  id: ++this.runSerial,
                  cancelled: false,
                  finished: null,
                  finish: null
                };
                run.finished = new Promise(function (resolve) {
                  run.finish = resolve;
                });
                this.activeRun = run;
                this.busy = true;
                completed = false;
                terminated = false;
                _context22.p = 2;
                // 事件启动阶段也必须放在 try/finally 内：如果 HUD、音效或自动存档刷新
                // 在这里同步抛错，finally 仍要负责解除 busy 与场景交互锁，避免整页只能刷新恢复。
                // 玩家从自由探索触发事件时，此刻才知道待执行入口；先补全检查点游标，
                // 这样事件中保存或刷新能从本事件开头恢复，而不会停在无法再次触发的场景状态。
                this.adoptCheckpoint({
                  eventId: eventId,
                  actionIndex: actionIndex
                });
                this.scene.setInteractionEnabled(false);
                this.onStateChanged();
                nextId = eventId;
                nextActionIndex = actionIndex;
                guard = 0;
              case 3:
                if (!nextId) {
                  _context22.n = 12;
                  break;
                }
                _context22.n = 4;
                return this.waitWhilePaused(run);
              case 4:
                if (!(++guard > 100)) {
                  _context22.n = 5;
                  break;
                }
                throw new Error("连续事件超过 100 个，可能存在无输入死循环");
              case 5:
                event = this.events.get(nextId);
                if (event) {
                  _context22.n = 6;
                  break;
                }
                throw new Error("\u4E8B\u4EF6\u4E0D\u5B58\u5728\uFF1A".concat(nextId));
              case 6:
                actions = Array.isArray(event.actions) ? event.actions : [];
                if (!(!Number.isInteger(nextActionIndex) || nextActionIndex < 0 || nextActionIndex > actions.length)) {
                  _context22.n = 7;
                  break;
                }
                throw new RangeError("\u4E8B\u4EF6\u52A8\u4F5C\u4E0B\u6807\u8D8A\u754C\uFF1A".concat(nextId, "#").concat(nextActionIndex));
              case 7:
                this.state.currentEventId = nextId;
                // 每个事件开始时把“快进”重置为关闭，开关状态不跨事件记忆：
                // 避免上一事件遗留的快进让新事件自动连跳，玩家来不及关闭。
                this.ui.dialog.setFast(false);
                nextId = null;
                index = nextActionIndex;
              case 8:
                if (!(index < actions.length)) {
                  _context22.n = 11;
                  break;
                }
                action = actions[index]; // 选项等待本身是稳定边界：恢复时直接重新打开该选项，不重放前置动作。
                if (action.type === "choice") {
                  this.adoptCheckpoint({
                    eventId: event.id,
                    actionIndex: index
                  });
                }
                _context22.n = 9;
                return this.runAction(action);
              case 9:
                result = _context22.v;
                if (!(result && result.stop)) {
                  _context22.n = 10;
                  break;
                }
                nextId = result.next || null;
                return _context22.a(3, 11);
              case 10:
                index += 1;
                _context22.n = 8;
                break;
              case 11:
                if (!nextId && event.next) nextId = event.next;
                nextActionIndex = 0;
                // 每个完整事件结束后都形成检查点；连续事件保存下一事件的入口游标。
                this.adoptCheckpoint(nextId ? {
                  eventId: nextId,
                  actionIndex: 0
                } : null);
                _context22.n = 3;
                break;
              case 12:
                completed = true;
                return _context22.a(2, true);
              case 13:
                _context22.p = 13;
                _t3 = _context22.v;
                terminated = _t3 instanceof TerminalStateReached;
                if (!terminated) {
                  _context22.n = 18;
                  break;
                }
                _context22.p = 14;
                _context22.n = 15;
                return this.onTerminate(this.state);
              case 15:
                _context22.n = 17;
                break;
              case 16:
                _context22.p = 16;
                _t4 = _context22.v;
                console.error("终止回调失败：", _t4);
              case 17:
                _context22.n = 19;
                break;
              case 18:
                try {
                  this.restoreCheckpoint();
                } catch (restoreError) {
                  // 回滚只负责尽力恢复；即使状态刷新再次出错，也不能阻断 finally 解锁。
                  console.error("事件失败后的状态回滚失败：", restoreError);
                }
              case 19:
                if (!(_t3 instanceof EventCancelled) && !terminated) {
                  console.error(_t3);
                  try {
                    this.ui.toast("\u8FD0\u884C\u9519\u8BEF\uFF1A".concat(_t3.message));
                  } catch (toastError) {
                    console.error("事件错误提示失败：", toastError);
                  }
                }
                return _context22.a(2, false);
              case 20:
                _context22.p = 20;
                try {
                  this.stopAdvanceBoundVoices(true);
                } catch (cleanupError) {
                  console.error("事件音效清理失败：", cleanupError);
                }
                try {
                  this.ui.cancelPending();
                } catch (cleanupError) {
                  console.error("事件界面清理失败：", cleanupError);
                }
                this.activeRun = null;
                this.busy = false;
                if (!terminated) {
                  try {
                    this.scene.refresh();
                  } catch (refreshError) {
                    console.error("事件结束后的场景刷新失败：", refreshError);
                  }
                  try {
                    this.scene.setInteractionEnabled(!this.paused);
                  } catch (interactionError) {
                    console.error("事件结束后的场景交互恢复失败：", interactionError);
                  }
                  try {
                    this.onStateChanged();
                  } catch (stateError) {
                    console.error("事件结束后的状态刷新失败：", stateError);
                  }
                }
                run.finish(completed);
                return _context22.f(20);
              case 21:
                return _context22.a(2);
            }
          }, _callee22, this, [[14, 16], [2, 13, 20, 21]]);
        }));
        function play(_x20) {
          return _play.apply(this, arguments);
        }
        return play;
      }()
    }]);
  }();
  Game.Registry = Registry;
  Game.EventEngine = EventEngine;
})(window.TrainGame);
