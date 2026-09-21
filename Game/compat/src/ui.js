function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
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

  var BUTTON_SOUND = "button_select";
  var BUTTON_SOUND_EXCLUDED_AREAS = [".home-op", ".ending-a-sequence", ".parking-ending-sequence", ".san-zero-sequence"].join(", ");
  var GameWindow = /*#__PURE__*/function () {
    function GameWindow(root) {
      var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      _classCallCheck(this, GameWindow);
      this.root = root;
      this.element = document.createElement("section");
      this.element.className = "game-window ".concat(className).trim();
    }
    return _createClass(GameWindow, [{
      key: "open",
      value: function open() {
        if (!this.element.isConnected) this.root.append(this.element);
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        this.element.remove();
      }
    }, {
      key: "setContent",
      value: function setContent(content) {
        this.element.replaceChildren();
        if (typeof content === "string") this.element.textContent = content;else if (content) this.element.append(content);
        return this;
      }
    }, {
      key: "addChild",
      value: function addChild(child) {
        this.element.append(child.element || child);
        return this;
      }
    }]);
  }();
  var TextPlayer = /*#__PURE__*/function () {
    function TextPlayer(element) {
      var _this = this;
      _classCallCheck(this, TextPlayer);
      this.element = element;
      this.timer = null;
      this.running = false;
      this.paused = false;
      this.index = 0;
      this.text = "";
      this.speed = 28;
      this.lastProgressAt = 0;
      this.resolve = null;
      this.characterElements = null;
      this.tick = function () {
        var _this$characterElemen;
        if (_this.paused || !_this.running) return;
        var character = (_this$characterElemen = _this.characterElements) === null || _this$characterElemen === void 0 ? void 0 : _this$characterElemen[_this.index];
        if (character) character.classList.add("is-visible");
        _this.index += 1;
        _this.lastProgressAt = performance.now();
        if (!_this.characterElements) {
          _this.element.textContent = _this.text.slice(0, _this.index);
        }
        if (_this.index >= _this.text.length) {
          _this.complete();
          return;
        }
        _this.timer = setTimeout(_this.tick, _this.speed);
      };
    }
    return _createClass(TextPlayer, [{
      key: "renderText",
      value: function renderText() {
        if (typeof document === "undefined" || typeof this.element.replaceChildren !== "function") {
          this.characterElements = null;
          this.element.textContent = "";
          return;
        }
        var fragment = document.createDocumentFragment();
        var characters = [];
        var _iterator = _createForOfIteratorHelper(this.text),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var character = _step.value;
            var span = document.createElement("span");
            span.className = "dialog-character";
            span.textContent = character;
            fragment.append(span);
            characters.push(span);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.characterElements = characters;
        this.element.replaceChildren(fragment);
      }
    }, {
      key: "play",
      value: function play(text) {
        var _this2 = this;
        var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 28;
        this.cancel();
        this.text = String(text);
        this.speed = speed;
        this.index = 0;
        this.lastProgressAt = performance.now();
        this.renderText();
        this.running = true;
        return new Promise(function (resolve) {
          _this2.resolve = resolve;
          if (_this2.text.length === 0) _this2.complete();else if (!_this2.paused) _this2.timer = setTimeout(_this2.tick, _this2.speed);
        });
      }
    }, {
      key: "finish",
      value: function finish() {
        if (!this.running) return;
        if (this.characterElements) {
          var _iterator2 = _createForOfIteratorHelper(this.characterElements),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var character = _step2.value;
              character.classList.add("is-visible");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          this.element.textContent = this.text;
        }
        this.index = this.text.length;
        this.complete();
      }
    }, {
      key: "setPaused",
      value: function setPaused(value) {
        if (this.paused === value) return;
        this.paused = value;
        clearTimeout(this.timer);
        this.timer = null;
        if (!value && this.running) {
          this.lastProgressAt = performance.now();
          this.timer = setTimeout(this.tick, this.speed);
        }
      }
    }, {
      key: "ensureRunning",
      value: function ensureRunning() {
        if (!this.running || this.paused || this.index >= this.text.length) return;
        var stalledFor = performance.now() - this.lastProgressAt;
        var staleAfter = Math.max(1000, this.speed * 4);
        if (this.timer === null || stalledFor >= staleAfter) {
          clearTimeout(this.timer);
          this.timer = setTimeout(this.tick, this.speed);
          this.lastProgressAt = performance.now();
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        clearTimeout(this.timer);
        this.timer = null;
        this.running = false;
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve();
      }
    }, {
      key: "cancel",
      value: function cancel() {
        clearTimeout(this.timer);
        this.timer = null;
        this.running = false;
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve();
      }
    }]);
  }();
  var AUTO_ADVANCE_DELAY_MS = 1200;
  var FAST_ADVANCE_DELAY_MS = 90;
  var DEFAULT_DIALOGUE_PORTRAITS = Object.freeze({
    "乘务员": "assets/Image/Portrait/conductor-crying.ie.png",
    "列车员": "assets/Image/Portrait/conductor.ie.png",
    "医生": "assets/Image/Portrait/doctor.ie.png",
    "你": "assets/Image/Portrait/player.ie.png",
    "？？？": "assets/Image/Portrait/conductor-crazy.ie.png"
  });
  var DialogWindow = /*#__PURE__*/function (_GameWindow) {
    function DialogWindow(root) {
      var _this3;
      _classCallCheck(this, DialogWindow);
      _this3 = _callSuper(this, DialogWindow, [root, "dialog-window"]);
      _this3.auto = false;
      _this3.fast = false;
      _this3.paused = false;
      _this3.advance = null;
      _this3.advanceHook = null;
      _this3.autoTimer = null;
      _this3.lineToken = 0;
      _this3.speaker = document.createElement("div");
      _this3.speaker.className = "dialog-speaker";
      _this3.portrait = document.createElement("img");
      _this3.portrait.className = "dialog-portrait";
      _this3.portrait.alt = "";
      _this3.portrait.hidden = true;
      _this3.text = document.createElement("p");
      _this3.text.className = "dialog-text";
      _this3.hint = document.createElement("span");
      _this3.hint.className = "dialog-hint";
      _this3.hint.textContent = "点击继续";
      _this3.player = new TextPlayer(_this3.text);
      var controls = document.createElement("div");
      controls.className = "window-controls";
      _this3.autoButton = _this3.makeToggle("自动", function () {
        return _this3.setAuto(!_this3.auto);
      });
      _this3.fastButton = _this3.makeToggle("快进", function () {
        return _this3.setFast(!_this3.fast);
      });
      var skipButton = document.createElement("button");
      skipButton.type = "button";
      skipButton.textContent = "跳过本句";
      skipButton.addEventListener("click", function (event) {
        event.stopPropagation();
        _this3.handleAdvance();
      });
      controls.append(_this3.autoButton, _this3.fastButton, skipButton);
      _this3.element.append(_this3.portrait, _this3.speaker, _this3.text, controls, _this3.hint);
      _this3.element.addEventListener("click", function () {
        return _this3.handleAdvance();
      });
      // 对白等待期间，点击 HUD、残留遮罩或游戏舞台也应推进；
      // 控件区仍由各自按钮处理，避免自动、快进和跳过被重复触发。
      document.addEventListener("click", function (event) {
        if (!_this3.isAwaitingAdvance() || _this3.paused) return;
        var target = event.target;
        if (target instanceof Element && target.closest(".dialog-window")) return;
        // 场景/HUD 空白点击只负责推进已完整显示的句子；
        // 流式输出期间仍须保留逐字效果，不能被框外点击补全。
        if (_this3.player.running) return;
        _this3.handleAdvance();
      }, true);
      setInterval(function () {
        return _this3.ensureActive();
      }, 500);
      return _this3;
    }
    _inherits(DialogWindow, _GameWindow);
    return _createClass(DialogWindow, [{
      key: "makeToggle",
      value: function makeToggle(label, callback) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", function (event) {
          event.stopPropagation();
          callback();
        });
        return button;
      }
    }, {
      key: "setAuto",
      value: function setAuto(value) {
        this.auto = value;
        this.autoButton.setAttribute("aria-pressed", String(value));
        if (value && !this.player.running && this.advance) this.scheduleAdvance();
        if (!value) this.clearAutoTimer();
      }
    }, {
      key: "setFast",
      value: function setFast(value) {
        this.fast = value;
        this.fastButton.setAttribute("aria-pressed", String(value));
        if (value) {
          if (this.player.running) this.player.finish();
          if (this.advance) this.scheduleAdvance();
          return;
        }
        // 关闭快进：取消快进排程的自动连跳，避免已排程的连跳“收不住”；
        // 若“自动”仍开启，则改按自动节奏重新排程。
        if (this.advance && this.auto) this.scheduleAdvance();else this.clearAutoTimer();
      }
    }, {
      key: "setPaused",
      value: function setPaused(value) {
        this.paused = value;
        this.player.setPaused(value);
        if (value) this.clearAutoTimer();else if (this.advance && (this.auto || this.fast)) this.scheduleAdvance();
      }
    }, {
      key: "isAwaitingAdvance",
      value: function isAwaitingAdvance() {
        return this.element.isConnected && (this.player.running || Boolean(this.advance));
      }
    }, {
      key: "ensureActive",
      value: function ensureActive() {
        if (!this.element.isConnected) return;
        if (this.paused) {
          var pauseInterface = document.querySelector(".pause-menu-window, .menu-backdrop, .san-zero-sequence");
          if (pauseInterface) return;
          this.paused = false;
          this.player.setPaused(false);
        }
        this.player.ensureRunning();
        if (this.advance && (this.auto || this.fast) && this.autoTimer === null) {
          this.scheduleAdvance();
        }
      }
    }, {
      key: "handleAdvance",
      value: function handleAdvance() {
        if (this.paused) return;
        if (this.player.running) {
          this.player.finish();
          return;
        }
        this.resolveLine();
      }
    }, {
      key: "clearAutoTimer",
      value: function clearAutoTimer() {
        clearTimeout(this.autoTimer);
        this.autoTimer = null;
      }
    }, {
      key: "scheduleAdvance",
      value: function scheduleAdvance() {
        var _this4 = this;
        if (this.paused) return;
        this.clearAutoTimer();
        var activeAdvance = this.advance;
        this.autoTimer = setTimeout(function () {
          if (_this4.advance === activeAdvance && !_this4.player.running) _this4.resolveLine();
        }, this.fast ? FAST_ADVANCE_DELAY_MS : AUTO_ADVANCE_DELAY_MS);
      }
    }, {
      key: "resolveLine",
      value: function resolveLine() {
        this.clearAutoTimer();
        if (!this.advance) return;
        var advanceHook = this.advanceHook;
        if (advanceHook && advanceHook() === false) return;
        var resolve = this.advance;
        this.advance = null;
        this.advanceHook = null;
        resolve();
      }
    }, {
      key: "setPortrait",
      value: function setPortrait(source) {
        var speaker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var resolvedSource = source || DEFAULT_DIALOGUE_PORTRAITS[speaker] || "";
        this.element.classList.toggle("has-portrait", Boolean(resolvedSource));
        var isPlayerPortrait = ["你", "PC", "玩家"].includes(speaker.trim()) || /\/portrait\/player(?:-[^/]+)?\.(?:png|webp)(?:[?#]|$)/i.test(resolvedSource);
        this.portrait.classList.toggle("is-player", isPlayerPortrait);
        if (!resolvedSource) {
          this.portrait.hidden = true;
          this.portrait.removeAttribute("src");
          this.portrait.alt = "";
          return;
        }
        this.portrait.src = resolvedSource;
        this.portrait.alt = speaker ? "".concat(speaker, "\u7ACB\u7ED8") : "角色立绘";
        this.portrait.hidden = false;
      }
    }, {
      key: "showLine",
      value: function () {
        var _showLine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
          var _this5 = this;
          var _ref$speaker, speaker, _ref$text, text, _ref$speed, speed, _ref$portrait, portrait, _ref$onAdvance, onAdvance, token;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _ref$speaker = _ref.speaker, speaker = _ref$speaker === void 0 ? "" : _ref$speaker, _ref$text = _ref.text, text = _ref$text === void 0 ? "" : _ref$text, _ref$speed = _ref.speed, speed = _ref$speed === void 0 ? 28 : _ref$speed, _ref$portrait = _ref.portrait, portrait = _ref$portrait === void 0 ? "" : _ref$portrait, _ref$onAdvance = _ref.onAdvance, onAdvance = _ref$onAdvance === void 0 ? null : _ref$onAdvance;
                token = ++this.lineToken;
                this.open();
                this.speaker.textContent = speaker;
                this.setPortrait(portrait, speaker);
                this.advanceHook = typeof onAdvance === "function" ? onAdvance : null;
                _context.n = 1;
                return this.player.play(text, this.fast ? 1 : speed);
              case 1:
                if (!(token !== this.lineToken)) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2);
              case 2:
                return _context.a(2, new Promise(function (resolve) {
                  _this5.advance = resolve;
                  if (_this5.auto || _this5.fast) _this5.scheduleAdvance();
                }));
            }
          }, _callee, this);
        }));
        function showLine(_x) {
          return _showLine.apply(this, arguments);
        }
        return showLine;
      }()
    }, {
      key: "close",
      value: function close() {
        this.lineToken += 1;
        this.player.cancel();
        this.resolveLine();
        this.advanceHook = null;
        this.setPortrait("", "");
        _superPropGet(DialogWindow, "close", this, 3)([]);
      }
    }]);
  }(GameWindow);
  var AttributeAllocationWindow = /*#__PURE__*/function (_GameWindow2) {
    function AttributeAllocationWindow(root) {
      var _this6;
      _classCallCheck(this, AttributeAllocationWindow);
      _this6 = _callSuper(this, AttributeAllocationWindow, [root, "attribute-allocation-window"]);
      _this6.backdrop = null;
      _this6.resolve = null;
      return _this6;
    }
    _inherits(AttributeAllocationWindow, _GameWindow2);
    return _createClass(AttributeAllocationWindow, [{
      key: "choose",
      value: function choose(definitions, totalPoints) {
        var _this7 = this;
        this.close(null);
        var values = Object.fromEntries(definitions.map(function (definition) {
          return [definition.id, definition.initial];
        }));
        var initialTotal = definitions.reduce(function (sum, definition) {
          return sum + definition.initial;
        }, 0);
        var targetTotal = initialTotal + totalPoints;
        var remaining = totalPoints;
        // 每次给当前最低的一项加点，使不同初始下限也能得到真正均衡的默认分配。
        var _loop = function _loop() {
          var available = definitions.filter(function (definition) {
            return definition.max === null || values[definition.id] < definition.max;
          });
          if (!available.length) throw new Error("属性上限不足以分配全部初始属性点");
          var lowest = Math.min.apply(Math, _toConsumableArray(available.map(function (definition) {
            return values[definition.id];
          })));
          var definition = available.find(function (entry) {
            return values[entry.id] === lowest;
          });
          values[definition.id] += 1;
          remaining -= 1;
        };
        while (remaining > 0) {
          _loop();
        }
        var backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop attribute-allocation-backdrop";
        var heading = document.createElement("h1");
        heading.textContent = "分配属性点";
        var introduction = document.createElement("p");
        introduction.className = "allocation-introduction";
        introduction.textContent = "\u56DB\u9879\u6700\u7EC8\u603B\u503C\u56FA\u5B9A\u4E3A ".concat(targetTotal, "\uFF0C\u5DF2\u81EA\u52A8\u5747\u8861\u5206\u914D\uFF1B\u666E\u901A\u5C5E\u6027\u6700\u9AD8\u4E3A 10\uFF0CSAN \u4E0D\u8BBE\u4E0A\u9650\u3002");
        var summary = document.createElement("div");
        summary.className = "allocation-summary";
        var remainingText = document.createElement("p");
        remainingText.className = "allocation-remaining";
        var totalText = document.createElement("p");
        totalText.className = "allocation-total";
        var progress = document.createElement("progress");
        progress.className = "allocation-progress";
        progress.max = totalPoints;
        summary.append(remainingText, totalText, progress);
        var list = document.createElement("div");
        list.className = "attribute-allocation-list";
        var actions = document.createElement("div");
        actions.className = "allocation-actions";
        var backButton = document.createElement("button");
        backButton.type = "button";
        backButton.textContent = "返回主界面";
        var resetButton = document.createElement("button");
        resetButton.type = "button";
        resetButton.textContent = "重置点数";
        var confirmButton = document.createElement("button");
        confirmButton.type = "button";
        confirmButton.textContent = "确认分配";
        actions.append(backButton, resetButton, confirmButton);
        this.element.replaceChildren(heading, introduction, summary, list, actions);
        backdrop.append(this.element);
        this.root.append(backdrop);
        this.backdrop = backdrop;
        var rows = new Map();
        var refresh = function refresh() {
          var spent = totalPoints - remaining;
          remainingText.textContent = "\u5269\u4F59\u70B9\u6570\uFF1A".concat(remaining);
          totalText.textContent = "\u5DF2\u5206\u914D\uFF1A".concat(spent, "/").concat(totalPoints, "\u3000\u5F53\u524D\u603B\u503C\uFF1A").concat(initialTotal + spent, "/").concat(targetTotal);
          progress.value = spent;
          confirmButton.disabled = remaining !== 0;
          resetButton.disabled = spent === 0;
          var _iterator3 = _createForOfIteratorHelper(definitions),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var definition = _step3.value;
              var row = rows.get(definition.id);
              row.value.textContent = String(values[definition.id]);
              row.minus.disabled = values[definition.id] <= definition.initial;
              row.plus.disabled = remaining <= 0 || definition.max !== null && values[definition.id] >= definition.max;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        };
        var _iterator4 = _createForOfIteratorHelper(definitions),
          _step4;
        try {
          var _loop2 = function _loop2() {
            var definition = _step4.value;
            var row = document.createElement("section");
            row.className = "attribute-allocation-row";
            var details = document.createElement("div");
            var name = document.createElement("h2");
            name.textContent = definition.name;
            var description = document.createElement("p");
            description.textContent = definition.description || definition.id;
            var limits = document.createElement("small");
            limits.className = "attribute-allocation-limits";
            limits.textContent = "\u521B\u5EFA\u4E0B\u9650 ".concat(definition.initial, " \xB7 \u521B\u5EFA\u4E0A\u9650 ").concat(definition.max === null ? "无上限" : definition.max);
            details.append(name, description, limits);
            var controls = document.createElement("div");
            controls.className = "attribute-stepper";
            var minus = document.createElement("button");
            minus.type = "button";
            var minusImage = document.createElement("img");
            minusImage.src = "assets/Image/Ui/attribute-minus.ie.png";
            minusImage.alt = "";
            minusImage.setAttribute("aria-hidden", "true");
            minus.append(minusImage);
            minus.setAttribute("aria-label", "\u964D\u4F4E".concat(definition.name));
            var value = document.createElement("output");
            value.setAttribute("aria-label", "".concat(definition.name, "\u5F53\u524D\u503C"));
            var plus = document.createElement("button");
            plus.type = "button";
            var plusImage = document.createElement("img");
            plusImage.src = "assets/Image/Ui/attribute-plus.ie.png";
            plusImage.alt = "";
            plusImage.setAttribute("aria-hidden", "true");
            plus.append(plusImage);
            plus.setAttribute("aria-label", "\u63D0\u9AD8".concat(definition.name));
            minus.addEventListener("click", function () {
              if (values[definition.id] <= definition.initial) return;
              values[definition.id] -= 1;
              remaining += 1;
              refresh();
            });
            plus.addEventListener("click", function () {
              if (remaining <= 0 || definition.max !== null && values[definition.id] >= definition.max) return;
              values[definition.id] += 1;
              remaining -= 1;
              refresh();
            });
            controls.append(minus, value, plus);
            row.append(details, controls);
            list.append(row);
            rows.set(definition.id, {
              minus: minus,
              value: value,
              plus: plus
            });
          };
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        resetButton.addEventListener("click", function () {
          var _iterator5 = _createForOfIteratorHelper(definitions),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var definition = _step5.value;
              values[definition.id] = definition.initial;
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          remaining = totalPoints;
          refresh();
        });
        refresh();
        return new Promise(function (resolve) {
          var _list$querySelector;
          _this7.resolve = resolve;
          backButton.addEventListener("click", function () {
            return _this7.close(null);
          }, {
            once: true
          });
          confirmButton.addEventListener("click", function () {
            if (remaining === 0) _this7.close(Game.deepClone(values));
          }, {
            once: true
          });
          (_list$querySelector = list.querySelector("button:not(:disabled)")) === null || _list$querySelector === void 0 || _list$querySelector.focus();
        });
      }
    }, {
      key: "close",
      value: function close() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve(value);
      }
    }]);
  }(GameWindow);
  var ChoiceWindow = /*#__PURE__*/function (_GameWindow3) {
    function ChoiceWindow(root) {
      var _this8;
      _classCallCheck(this, ChoiceWindow);
      _this8 = _callSuper(this, ChoiceWindow, [root, "choice-window"]);
      _this8.backdrop = null;
      _this8.resolve = null;
      return _this8;
    }
    _inherits(ChoiceWindow, _GameWindow3);
    return _createClass(ChoiceWindow, [{
      key: "choose",
      value: function choose(prompt, options) {
        var _this9 = this;
        this.close(null);
        var backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop choice-backdrop";
        var title = document.createElement("h2");
        title.textContent = prompt || "请选择";
        var list = document.createElement("div");
        list.className = "choice-list";
        this.element.replaceChildren(title, list);
        backdrop.append(this.element);
        this.root.append(backdrop);
        this.backdrop = backdrop;
        return new Promise(function (resolve) {
          _this9.resolve = resolve;
          var _iterator6 = _createForOfIteratorHelper(options),
            _step6;
          try {
            var _loop3 = function _loop3() {
              var option = _step6.value;
              var button = document.createElement("button");
              button.type = "button";
              button.textContent = option.label;
              button.addEventListener("click", function () {
                return _this9.close(option);
              });
              list.append(button);
            };
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              _loop3();
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        });
      }
    }, {
      key: "close",
      value: function close() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve(value);
      }
    }]);
  }(GameWindow);
  var InspectWindow = /*#__PURE__*/function (_GameWindow4) {
    function InspectWindow(root) {
      var _this0;
      _classCallCheck(this, InspectWindow);
      _this0 = _callSuper(this, InspectWindow, [root, "inspect-window"]);
      _this0.backdrop = null;
      _this0.resolve = null;
      return _this0;
    }
    _inherits(InspectWindow, _GameWindow4);
    return _createClass(InspectWindow, [{
      key: "show",
      value: function show(_ref2) {
        var _this1 = this;
        var _ref2$title = _ref2.title,
          title = _ref2$title === void 0 ? "调查" : _ref2$title,
          _ref2$text = _ref2.text,
          text = _ref2$text === void 0 ? "" : _ref2$text,
          _ref2$image = _ref2.image,
          image = _ref2$image === void 0 ? null : _ref2$image,
          _ref2$large = _ref2.large,
          large = _ref2$large === void 0 ? false : _ref2$large;
        this.close();
        this.element.classList.toggle("inspect-large", large === true);
        var backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop";
        var heading = document.createElement("h2");
        heading.textContent = title;
        var content = document.createElement("div");
        content.className = "inspect-content";
        if (image) {
          var media = document.createElement("div");
          media.className = "inspect-media";
          var img = document.createElement("img");
          img.src = image;
          img.alt = title;
          media.append(img);
          content.append(media);
        }
        var paragraph = document.createElement("p");
        paragraph.className = "inspect-text";
        paragraph.textContent = text;
        content.append(paragraph);
        var close = document.createElement("button");
        close.type = "button";
        close.className = "inspect-close";
        close.textContent = "关闭";
        this.element.replaceChildren(heading, content, close);
        backdrop.append(this.element);
        this.root.append(backdrop);
        this.backdrop = backdrop;
        return new Promise(function (resolve) {
          _this1.resolve = resolve;
          close.addEventListener("click", function () {
            return _this1.close();
          });
        });
      }
    }, {
      key: "close",
      value: function close() {
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve();
      }
    }]);
  }(GameWindow);
  var ItemInspectWindow = /*#__PURE__*/function () {
    function ItemInspectWindow(root) {
      var _this10 = this;
      _classCallCheck(this, ItemInspectWindow);
      this.root = root;
      this.backdrop = null;
      this.resolve = null;
      this.previousFocus = null;
      this.handleKeydown = function (event) {
        if (event.repeat || event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        _this10.close();
      };
    }
    return _createClass(ItemInspectWindow, [{
      key: "show",
      value: function show(_ref3) {
        var _this11 = this;
        var _ref3$title = _ref3.title,
          title = _ref3$title === void 0 ? "物品" : _ref3$title,
          _ref3$text = _ref3.text,
          text = _ref3$text === void 0 ? "" : _ref3$text,
          _ref3$image = _ref3.image,
          image = _ref3$image === void 0 ? null : _ref3$image;
        this.close();
        this.previousFocus = document.activeElement;
        var backdrop = document.createElement("div");
        backdrop.className = "item-inspect-backdrop";
        backdrop.setAttribute("role", "dialog");
        backdrop.setAttribute("aria-modal", "true");
        backdrop.setAttribute("aria-label", "\u8C03\u67E5\u7269\u54C1\uFF1A".concat(title));
        var stage = document.createElement("div");
        stage.className = "item-inspect-stage";
        var itemImage = null;
        if (image) {
          var img = document.createElement("img");
          img.className = "item-inspect-image";
          img.src = image;
          img.alt = title;
          itemImage = img;
          stage.append(img);
        }
        var content = document.createElement("div");
        content.className = "item-inspect-content";
        var heading = document.createElement("h2");
        heading.className = "item-inspect-title";
        heading.textContent = title;
        var description = document.createElement("p");
        description.className = "item-inspect-text";
        description.textContent = text;
        var close = document.createElement("button");
        close.type = "button";
        close.className = "item-inspect-close";
        close.textContent = "点击空白处或按 Enter / Space 关闭";
        content.append(heading, description, close);
        stage.append(content);
        backdrop.append(stage);
        this.root.append(backdrop);
        this.backdrop = backdrop;
        return new Promise(function (resolve) {
          _this11.resolve = resolve;
          backdrop.addEventListener("click", function (event) {
            var clickedEmptyLayer = event.target === backdrop || event.target === stage;
            var clickedTransparentImage = event.target === itemImage && _this11.isTransparentImagePoint(itemImage, event);
            if (clickedEmptyLayer || clickedTransparentImage) _this11.close();
          });
          close.addEventListener("click", function () {
            return _this11.close();
          });
          document.addEventListener("keydown", _this11.handleKeydown, true);
          close.focus();
        });
      }
    }, {
      key: "isTransparentImagePoint",
      value: function isTransparentImagePoint(image, event) {
        if (event.detail === 0 || !image.complete || image.naturalWidth <= 0 || image.naturalHeight <= 0) {
          return false;
        }
        var rect = image.getBoundingClientRect();
        var scale = Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
        if (!Number.isFinite(scale) || scale <= 0) return false;
        var renderedWidth = image.naturalWidth * scale;
        var renderedHeight = image.naturalHeight * scale;
        var renderedLeft = rect.left + (rect.width - renderedWidth) / 2;
        var renderedTop = rect.top + (rect.height - renderedHeight) / 2;
        var sourceX = Math.floor((event.clientX - renderedLeft) / scale);
        var sourceY = Math.floor((event.clientY - renderedTop) / scale);
        if (sourceX < 0 || sourceY < 0 || sourceX >= image.naturalWidth || sourceY >= image.naturalHeight) {
          return true;
        }
        try {
          var canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          var context = canvas.getContext("2d", {
            willReadFrequently: true
          });
          context.drawImage(image, sourceX, sourceY, 1, 1, 0, 0, 1, 1);
          return context.getImageData(0, 0, 1, 1).data[3] <= 8;
        } catch (_error) {
          return false;
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        document.removeEventListener("keydown", this.handleKeydown, true);
        var resolve = this.resolve;
        this.resolve = null;
        var previousFocus = this.previousFocus;
        this.previousFocus = null;
        if (previousFocus && previousFocus.isConnected) previousFocus.focus();
        if (resolve) resolve();
      }
    }]);
  }(); // 检定抖动动画节奏：只影响 roll() 里的抖动阶段（第一段等待）；
  // 算式与成败的停留时长不受倍速影响。实际时长 = 基准时长 / 倍速，
  // CSS 的抖动关键帧周期按同一倍速缩放（见 styles/main.css 的 --check-animation-scale）。
  var CHECK_ROLL_BASE_MS = 1100;
  var CHECK_ANIMATION_SPEED = 2;
  var DICE_SOUNDS = {
    rolling: "dice_rolling",
    success: "dice_success",
    fail: "dice_fail"
  };
  var DiceRollWindow = /*#__PURE__*/function () {
    function DiceRollWindow(root) {
      var audio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _classCallCheck(this, DiceRollWindow);
      this.root = root;
      this.audio = audio;
      this.backdrop = null;
      this.diceBoxes = [];
      this.images = [];
      this.status = null;
      this.result = null;
      this.phase = "idle";
      this.keyHandler = null;
      this.pointerHandler = null;
      this.interruptWaitResolve = null;
      this.pendingWaitResolvers = new Set();
    }
    return _createClass(DiceRollWindow, [{
      key: "roll",
      value: function () {
        var _roll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref4) {
          var _this12 = this,
            _this$audio;
          var _ref4$value, value, _ref4$values, values, _ref4$success, success, _ref4$grade, grade, _ref4$text, text, _ref4$outcomeText, outcomeText, _ref4$wait, wait, backdrop, content, diceRow, rollValues, diceBoxes, images, index, diceBox, image, status, result, rollingVoice, _this$audio2, animationState;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _ref4$value = _ref4.value, value = _ref4$value === void 0 ? null : _ref4$value, _ref4$values = _ref4.values, values = _ref4$values === void 0 ? null : _ref4$values, _ref4$success = _ref4.success, success = _ref4$success === void 0 ? true : _ref4$success, _ref4$grade = _ref4.grade, grade = _ref4$grade === void 0 ? null : _ref4$grade, _ref4$text = _ref4.text, text = _ref4$text === void 0 ? "" : _ref4$text, _ref4$outcomeText = _ref4.outcomeText, outcomeText = _ref4$outcomeText === void 0 ? "" : _ref4$outcomeText, _ref4$wait = _ref4.wait, wait = _ref4$wait === void 0 ? Game.delay : _ref4$wait;
                this.close();
                backdrop = document.createElement("div");
                backdrop.className = "check-roll-modal";
                // 倍速交给 CSS，避免等待时长与关键帧周期各写一个数字而失步。
                backdrop.style.setProperty("--check-animation-scale", String(1 / CHECK_ANIMATION_SPEED));
                content = document.createElement("div");
                content.className = "check-roll-content";
                diceRow = document.createElement("div");
                diceRow.className = "dice-row";
                rollValues = Array.isArray(values) && values.length ? values : [value];
                diceBoxes = [];
                images = [];
                for (index = 0; index < rollValues.length; index += 1) {
                  diceBox = document.createElement("div");
                  diceBox.className = "dice-box dice-rolling";
                  if (document.documentMode) diceBox.style.animationDuration = "".concat(0.42 / CHECK_ANIMATION_SPEED, "s");
                  image = document.createElement("img");
                  image.src = "assets/Image/Ui/dice-00.ie.png";
                  image.alt = "\u9AB0\u5B50 ".concat(index + 1);
                  diceBox.append(image);
                  diceRow.append(diceBox);
                  diceBoxes.push(diceBox);
                  images.push(image);
                }
                status = document.createElement("p");
                status.className = "check-roll-status";
                status.textContent = "检定中……";
                result = document.createElement("p");
                result.className = "check-result-panel";
                result.setAttribute("aria-live", "polite");
                content.append(diceRow, status, result);
                backdrop.append(content);
                this.root.append(backdrop);
                this.backdrop = backdrop;
                this.diceBoxes = diceBoxes;
                this.images = images;
                this.status = status;
                this.result = result;
                this.phase = "rolling";
                this.keyHandler = function (event) {
                  if (_this12.backdrop !== backdrop) return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (_this12.phase === "rolling") {
                    var _this12$interruptWait;
                    // 第一次按键只打断抖动，确保玩家能看清最终骰面。
                    (_this12$interruptWait = _this12.interruptWaitResolve) === null || _this12$interruptWait === void 0 || _this12$interruptWait.call(_this12, "interrupted");
                  } else if (_this12.phase === "formula") {
                    var _this12$interruptWait2;
                    // 算式阶段单独处理：按键/点击跳到成功或失败结果。
                    (_this12$interruptWait2 = _this12.interruptWaitResolve) === null || _this12$interruptWait2 === void 0 || _this12$interruptWait2.call(_this12, "interrupted");
                  } else {
                    // 成功/失败阶段不再自动关闭，按键/点击才关闭窗口。
                    _this12.close();
                  }
                };
                document.addEventListener("keydown", this.keyHandler, true);
                this.pointerHandler = function (event) {
                  var _this12$keyHandler;
                  return (_this12$keyHandler = _this12.keyHandler) === null || _this12$keyHandler === void 0 ? void 0 : _this12$keyHandler.call(_this12, event);
                };
                document.addEventListener("pointerdown", this.pointerHandler, true);
                rollingVoice = (_this$audio = this.audio) === null || _this$audio === void 0 ? void 0 : _this$audio.play(DICE_SOUNDS.rolling);
                _context2.p = 1;
                _context2.n = 2;
                return this.waitFor(CHECK_ROLL_BASE_MS / CHECK_ANIMATION_SPEED, wait, true);
              case 2:
                animationState = _context2.v;
                if (!(animationState === "closed")) {
                  _context2.n = 3;
                  break;
                }
                return _context2.a(2);
              case 3:
                if (!(this.backdrop !== backdrop)) {
                  _context2.n = 4;
                  break;
                }
                return _context2.a(2);
              case 4:
                rollingVoice === null || rollingVoice === void 0 || rollingVoice.stop();
                rollValues.forEach(function (rollValue, index) {
                  var face = Number.isInteger(rollValue) && rollValue >= 1 && rollValue <= 6 ? "assets/Image/Ui/dice-0".concat(rollValue, ".webp") : "assets/Image/Ui/dice-00.ie.png";
                  _this12.images[index].src = Game.assetUrl(face);
                  _this12.diceBoxes[index].classList.remove("dice-rolling");
                  _this12.diceBoxes[index].classList.add("dice-result-static");
                });
                this.status.hidden = true;
                this.result.textContent = text;
                this.result.classList.add(success ? "success" : "fail", grade || "normal", "is-visible");
                this.phase = "formula";
                // 算式阶段不自动切换到成功/失败，必须再次按键或点击确认。
                _context2.n = 5;
                return this.waitFor(Infinity, wait, true);
              case 5:
                if (!(this.backdrop !== backdrop)) {
                  _context2.n = 6;
                  break;
                }
                return _context2.a(2);
              case 6:
                this.result.classList.remove("is-visible");
                _context2.n = 7;
                return this.waitFor(220, wait);
              case 7:
                if (!(this.backdrop !== backdrop)) {
                  _context2.n = 8;
                  break;
                }
                return _context2.a(2);
              case 8:
                this.result.textContent = outcomeText || (success ? "检定成功" : "检定失败");
                this.result.classList.add("is-visible");
                this.phase = "outcome";
                (_this$audio2 = this.audio) === null || _this$audio2 === void 0 || _this$audio2.play(success ? DICE_SOUNDS.success : DICE_SOUNDS.fail);
                // 结果持续展示，直到玩家按任意键关闭。
                _context2.n = 9;
                return this.waitFor(Infinity, wait);
              case 9:
                _context2.p = 9;
                rollingVoice === null || rollingVoice === void 0 || rollingVoice.stop();
                if (this.backdrop === backdrop) this.close();
                return _context2.f(9);
              case 10:
                return _context2.a(2);
            }
          }, _callee2, this, [[1,, 9, 10]]);
        }));
        function roll(_x2) {
          return _roll.apply(this, arguments);
        }
        return roll;
      }()
    }, {
      key: "waitFor",
      value: function waitFor(duration, wait) {
        var _this13 = this;
        var interruptible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return new Promise(function (resolve) {
          var settled = false;
          var _finish = function finish(state) {
            if (settled) return;
            settled = true;
            _this13.pendingWaitResolvers.delete(_finish);
            if (interruptible && _this13.interruptWaitResolve === _finish) {
              _this13.interruptWaitResolve = null;
            }
            resolve(state);
          };
          _this13.pendingWaitResolvers.add(_finish);
          if (interruptible) _this13.interruptWaitResolve = _finish;
          if (duration !== Infinity) {
            wait(duration).then(function () {
              return _finish("elapsed");
            }, function () {
              return _finish("elapsed");
            });
          }
        });
      }
    }, {
      key: "close",
      value: function close() {
        for (var _i = 0, _Array$from = Array.from(this.pendingWaitResolvers); _i < _Array$from.length; _i++) {
          var resolve = _Array$from[_i];
          resolve("closed");
        }
        this.pendingWaitResolvers.clear();
        this.interruptWaitResolve = null;
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        this.diceBoxes = [];
        this.images = [];
        this.status = null;
        this.result = null;
        this.phase = "idle";
        if (this.keyHandler) document.removeEventListener("keydown", this.keyHandler, true);
        if (this.pointerHandler) document.removeEventListener("pointerdown", this.pointerHandler, true);
        this.keyHandler = null;
        this.pointerHandler = null;
      }
    }]);
  }();
  var MenuWindow = /*#__PURE__*/function (_GameWindow5) {
    function MenuWindow(root, className) {
      var _this14;
      _classCallCheck(this, MenuWindow);
      _this14 = _callSuper(this, MenuWindow, [root, className]);
      _this14.backdrop = null;
      _this14.resolve = null;
      _this14.previousFocus = null;
      return _this14;
    }
    _inherits(MenuWindow, _GameWindow5);
    return _createClass(MenuWindow, [{
      key: "choose",
      value: function choose(_ref5) {
        var _this15 = this;
        var title = _ref5.title,
          _ref5$coverImage = _ref5.coverImage,
          coverImage = _ref5$coverImage === void 0 ? null : _ref5$coverImage,
          options = _ref5.options,
          _ref5$backdropClass = _ref5.backdropClass,
          backdropClass = _ref5$backdropClass === void 0 ? "menu-backdrop" : _ref5$backdropClass;
        this.close(null);
        this.previousFocus = document.activeElement;
        var backdrop = document.createElement("div");
        backdrop.className = backdropClass;
        var content = document.createElement("div");
        content.className = "menu-content";
        if (coverImage) {
          var image = document.createElement("img");
          image.className = "menu-cover";
          image.src = coverImage;
          image.alt = "";
          backdrop.append(image);
        }
        var heading = document.createElement("h1");
        heading.textContent = title;
        var list = document.createElement("div");
        list.className = "menu-actions";
        content.append(heading, list);
        this.element.replaceChildren(content);
        backdrop.append(this.element);
        this.root.append(backdrop);
        this.backdrop = backdrop;
        return new Promise(function (resolve) {
          var _firstEnabledButton;
          _this15.resolve = resolve;
          var firstEnabledButton = null;
          var _iterator7 = _createForOfIteratorHelper(options),
            _step7;
          try {
            var _loop4 = function _loop4() {
              var option = _step7.value;
              var button = document.createElement("button");
              button.type = "button";
              button.textContent = option.label;
              button.disabled = Boolean(option.disabled);
              if (!button.disabled && !firstEnabledButton) firstEnabledButton = button;
              if (option.description) button.title = option.description;
              button.addEventListener("click", function () {
                return _this15.close(option.value);
              });
              list.append(button);
            };
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              _loop4();
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
          (_firstEnabledButton = firstEnabledButton) === null || _firstEnabledButton === void 0 || _firstEnabledButton.focus();
        });
      }
    }, {
      key: "close",
      value: function close() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve(value);
        if (this.previousFocus instanceof HTMLElement && this.previousFocus.isConnected) {
          this.previousFocus.focus();
        }
        this.previousFocus = null;
      }
    }]);
  }(GameWindow); // 小游戏宿主窗口：通用模态外壳（深色变暗遮罩 + 居中近满屏内容区 + 标题栏“退出小游戏”）。
  // 只提供外壳与生命周期，具体玩法由小游戏模块在 stage 里自绘；
  // 引擎通过 openAndStage/quitPromise/close 与宿主协作；小游戏可按规格禁用退出。
  var MinigameWindow = /*#__PURE__*/function (_GameWindow6) {
    function MinigameWindow(root) {
      var _this16;
      _classCallCheck(this, MinigameWindow);
      _this16 = _callSuper(this, MinigameWindow, [root, "minigame-window"]);
      _this16.backdrop = null;
      _this16.running = false;
      _this16.quitProvider = null;
      _this16.pendingQuit = null;
      _this16.stage = null;
      _this16.allowQuit = true;
      return _this16;
    }
    _inherits(MinigameWindow, _GameWindow6);
    return _createClass(MinigameWindow, [{
      key: "isOpen",
      value: function isOpen() {
        return this.running;
      }

      // 打开宿主并返回玩法内容区；模块把自绘 UI 挂进 stage。标题来自注册表 spec.title。
    }, {
      key: "openAndStage",
      value: function openAndStage(title) {
        var _this17 = this;
        var gameId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        this.close();
        var backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop minigame-backdrop";
        var useOverlayStyle = ["conductor_tug", "radio_tuning"].includes(gameId);
        backdrop.classList.toggle("minigame-overlay-backdrop", useOverlayStyle);
        this.element.classList.toggle("minigame-overlay-window", useOverlayStyle);
        var titlebar = document.createElement("header");
        titlebar.className = "minigame-titlebar";
        var heading = document.createElement("h2");
        heading.className = "minigame-title";
        heading.textContent = title || "小游戏";
        var exit = document.createElement("button");
        exit.type = "button";
        exit.className = "minigame-exit";
        exit.textContent = "退出小游戏";
        exit.setAttribute("aria-label", "退出小游戏并返回剧情");
        exit.addEventListener("click", function () {
          return _this17.requestQuit();
        });
        titlebar.append(heading, exit);
        this.stage = document.createElement("div");
        this.stage.className = "minigame-stage";
        this.element.replaceChildren(titlebar, this.stage);
        backdrop.append(this.element);
        this.root.append(backdrop);
        this.backdrop = backdrop;
        this.running = true;
        return this.stage;
      }
    }, {
      key: "setQuitAllowed",
      value: function setQuitAllowed(allowQuit) {
        var _this$element$querySe;
        this.allowQuit = allowQuit !== false;
        if (!this.allowQuit) (_this$element$querySe = this.element.querySelector(".minigame-exit")) === null || _this$element$querySe === void 0 || _this$element$querySe.remove();
      }

      // 模块经 context.onQuit 注册退出结算提供者：返回值（可为 Promise）作为退出时的结算。
    }, {
      key: "setQuitProvider",
      value: function setQuitProvider(provider) {
        this.quitProvider = provider;
      }

      // 引擎等待“玩家点退出”的 Promise；未点退出前保持挂起，close 时兜底解析为 undefined。
    }, {
      key: "quitPromise",
      value: function quitPromise() {
        if (!this.pendingQuit) {
          var pending = {};
          pending.promise = new Promise(function (resolve) {
            pending.resolve = resolve;
          });
          this.pendingQuit = pending;
        }
        return this.pendingQuit.promise;
      }
    }, {
      key: "requestQuit",
      value: function () {
        var _requestQuit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var settlement, _t, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                if (!(!this.running || !this.allowQuit)) {
                  _context3.n = 1;
                  break;
                }
                return _context3.a(2);
              case 1:
                _context3.p = 1;
                if (!this.quitProvider) {
                  _context3.n = 3;
                  break;
                }
                _context3.n = 2;
                return this.quitProvider();
              case 2:
                _t = _context3.v;
                _context3.n = 4;
                break;
              case 3:
                _t = undefined;
              case 4:
                settlement = _t;
                _context3.n = 6;
                break;
              case 5:
                _context3.p = 5;
                _t2 = _context3.v;
                console.error("小游戏退出结算失败：", _t2);
              case 6:
                this.resolveQuit(settlement);
                this.close();
              case 7:
                return _context3.a(2);
            }
          }, _callee3, this, [[1, 5]]);
        }));
        function requestQuit() {
          return _requestQuit.apply(this, arguments);
        }
        return requestQuit;
      }()
    }, {
      key: "resolveQuit",
      value: function resolveQuit(settlement) {
        if (this.pendingQuit && this.pendingQuit.resolve) {
          var resolve = this.pendingQuit.resolve;
          this.pendingQuit.resolve = null;
          resolve(settlement);
        }
      }
    }, {
      key: "close",
      value: function close() {
        // 无论自然结束、点退出还是取消，都要解除等待中的引擎竞态。
        this.resolveQuit(undefined);
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        this.running = false;
        this.quitProvider = null;
        this.pendingQuit = null;
        this.stage = null;
        this.allowQuit = true;
        _superPropGet(MinigameWindow, "close", this, 3)([]);
      }
    }]);
  }(GameWindow);
  var UIManager = /*#__PURE__*/function () {
    function UIManager(root) {
      var _Game$PlayerProfile,
        _Game$PlayerProfile$g,
        _Game$PlayerProfile$t,
        _Game$PlayerProfile2,
        _Game$PlayerProfile2$,
        _Game$PlayerProfile$t2,
        _Game$PlayerProfile3,
        _Game$PlayerProfile3$,
        _Game$PlayerProfile$t3,
        _Game$PlayerProfile4,
        _Game$PlayerProfile4$,
        _this18 = this;
      var audio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      _classCallCheck(this, UIManager);
      var audioSettings = ((_Game$PlayerProfile = Game.PlayerProfile) === null || _Game$PlayerProfile === void 0 || (_Game$PlayerProfile$g = _Game$PlayerProfile.getAudioSettings) === null || _Game$PlayerProfile$g === void 0 ? void 0 : _Game$PlayerProfile$g.call(_Game$PlayerProfile)) || {};
      var gameSfxVolume = (_Game$PlayerProfile$t = (_Game$PlayerProfile2 = Game.PlayerProfile) === null || _Game$PlayerProfile2 === void 0 || (_Game$PlayerProfile2$ = _Game$PlayerProfile2.toAudioGain) === null || _Game$PlayerProfile2$ === void 0 ? void 0 : _Game$PlayerProfile2$.call(_Game$PlayerProfile2, audioSettings.gameSfx)) !== null && _Game$PlayerProfile$t !== void 0 ? _Game$PlayerProfile$t : 1;
      var buttonSfxVolume = (_Game$PlayerProfile$t2 = (_Game$PlayerProfile3 = Game.PlayerProfile) === null || _Game$PlayerProfile3 === void 0 || (_Game$PlayerProfile3$ = _Game$PlayerProfile3.toAudioGain) === null || _Game$PlayerProfile3$ === void 0 ? void 0 : _Game$PlayerProfile3$.call(_Game$PlayerProfile3, audioSettings.buttonSfx)) !== null && _Game$PlayerProfile$t2 !== void 0 ? _Game$PlayerProfile$t2 : 1;
      var gameAmbienceVolume = (_Game$PlayerProfile$t3 = (_Game$PlayerProfile4 = Game.PlayerProfile) === null || _Game$PlayerProfile4 === void 0 || (_Game$PlayerProfile4$ = _Game$PlayerProfile4.toAudioGain) === null || _Game$PlayerProfile4$ === void 0 ? void 0 : _Game$PlayerProfile4$.call(_Game$PlayerProfile4, audioSettings.gameAmbience)) !== null && _Game$PlayerProfile$t3 !== void 0 ? _Game$PlayerProfile$t3 : 1;
      this.root = root;
      this.dialog = new DialogWindow(root);
      this.attributeAllocation = new AttributeAllocationWindow(root);
      this.choice = new ChoiceWindow(root);
      this.inspect = new InspectWindow(root);
      this.itemInspect = new ItemInspectWindow(root);
      this.audio = Game.AudioManager ? new Game.AudioManager(document.body, audio, {
        masterVolume: gameSfxVolume
      }) : null;
      this.buttonAudio = Game.AudioManager ? new Game.AudioManager(document.body, audio, {
        fadeMs: 0,
        masterVolume: buttonSfxVolume
      }) : null;
      this.backgroundAudio = Game.BackgroundAudioManager ? new Game.BackgroundAudioManager(document.body, audio, {
        masterVolume: gameAmbienceVolume
      }) : null;
      this.dice = new DiceRollWindow(root, this.audio);
      this.mainMenu = new MenuWindow(root, "main-menu-window");
      this.pauseMenu = new MenuWindow(root, "pause-menu-window");
      this.confirmMenu = new MenuWindow(root, "confirm-menu-window");
      this.minigame = new MinigameWindow(root);
      // sound 动作与检定演出共用 ui.audio；暂停/取消统一在这里掐断。
      this.toastElement = document.querySelector("#toast");
      this.toastTimer = null;
      this.toastMode = null;
      this.attributeToastQueue = [];
      this.attributeToastCurrent = null;
      this.cueLayer = document.querySelector("#acquisition-layer");
      this.cueSerial = 0;
      if (this.audio) {
        this.audio.onAutoplayBlocked = function (message) {
          return _this18.toast(message);
        };
      }
      if (this.buttonAudio) {
        this.buttonAudio.onAutoplayBlocked = function (message) {
          return _this18.toast(message);
        };
        document.addEventListener("click", function (event) {
          var _event$target, _event$target$closest;
          var button = (_event$target = event.target) === null || _event$target === void 0 || (_event$target$closest = _event$target.closest) === null || _event$target$closest === void 0 ? void 0 : _event$target$closest.call(_event$target, "button");
          if (!button || button.closest(BUTTON_SOUND_EXCLUDED_AREAS)) return;
          _this18.buttonAudio.play(BUTTON_SOUND, {
            startWithoutMetadata: true
          });
        }, true);
      }
      if (this.backgroundAudio) {
        this.backgroundAudio.onAutoplayBlocked = function (message) {
          return _this18.toast(message);
        };
      }
    }
    return _createClass(UIManager, [{
      key: "closeDialog",
      value: function closeDialog() {
        this.dialog.close();
      }
    }, {
      key: "setPaused",
      value: function setPaused(value) {
        this.dialog.setPaused(value);
        // 暂停立即冻结逻辑，声音在后台异步淡出；事件音恢复后不补播，背景音由场景同步恢复。
        if (value && this.audio) this.audio.stopAll();
        if (value && this.backgroundAudio) this.backgroundAudio.stopAll();
      }
    }, {
      key: "cancelPending",
      value: function cancelPending() {
        this.dialog.close();
        this.choice.close(null);
        this.inspect.close();
        this.itemInspect.close();
        this.dice.close();
        this.minigame.close();
        // 事件收尾只清理事件音效；场景背景音拥有独立生命周期，不受 cancelPending 影响。
        if (this.audio) this.audio.stopAll();
      }
    }, {
      key: "closePauseMenus",
      value: function closePauseMenus() {
        this.pauseMenu.close("resume");
        this.confirmMenu.close(false);
      }
    }, {
      key: "showAcquisition",
      value: function showAcquisition() {
        var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$name = _ref6.name,
          name = _ref6$name === void 0 ? "未命名物品" : _ref6$name,
          _ref6$image = _ref6.image,
          image = _ref6$image === void 0 ? null : _ref6$image,
          _ref6$detail = _ref6.detail,
          detail = _ref6$detail === void 0 ? "已加入物品栏" : _ref6$detail;
        this.showCue({
          title: "获得物品",
          label: name,
          image: image,
          detail: detail
        });
      }
    }, {
      key: "showAttributeChange",
      value: function showAttributeChange(_ref7) {
        var name = _ref7.name,
          requested = _ref7.requested,
          before = _ref7.before,
          after = _ref7.after,
          min = _ref7.min,
          max = _ref7.max;
        var delta = after - before;
        var message = "".concat(delta > 0 ? "属性提升" : "属性下降", "\uFF1A").concat(name, " ").concat(delta > 0 ? "+" : "").concat(delta, "\uFF08").concat(before, " \u2192 ").concat(after, "\uFF09");
        if (delta === 0) {
          var reason = requested > 0 && max !== null && before >= max ? "\u5DF2\u8FBE\u4E0A\u9650 ".concat(max) : "\u5DF2\u8FBE\u4E0B\u9650 ".concat(min);
          message = "\u5C5E\u6027\u672A\u53D8\u5316\uFF1A".concat(name, "\uFF08").concat(reason, "\uFF09");
        }
        this.enqueueAttributeToast(message);
      }
    }, {
      key: "enqueueAttributeToast",
      value: function enqueueAttributeToast(message) {
        this.attributeToastQueue.push(message);
        if (this.toastMode === null) this.showNextAttributeToast();
      }
    }, {
      key: "showNextAttributeToast",
      value: function showNextAttributeToast() {
        var _this19 = this;
        if (this.toastMode !== null) return;
        var message = this.attributeToastQueue.shift();
        if (!message) return;
        this.attributeToastCurrent = message;
        this.toastMode = "attribute";
        this.toastElement.textContent = message;
        this.toastElement.classList.add("visible");
        this.toastTimer = setTimeout(function () {
          _this19.toastTimer = null;
          _this19.toastMode = null;
          _this19.attributeToastCurrent = null;
          _this19.toastElement.classList.remove("visible");
          _this19.showNextAttributeToast();
        }, 1800);
      }
    }, {
      key: "showCue",
      value: function showCue() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref8$title = _ref8.title,
          title = _ref8$title === void 0 ? "获得物品" : _ref8$title,
          _ref8$label = _ref8.label,
          label = _ref8$label === void 0 ? "" : _ref8$label,
          _ref8$image = _ref8.image,
          image = _ref8$image === void 0 ? null : _ref8$image,
          _ref8$detail = _ref8.detail,
          detail = _ref8$detail === void 0 ? "" : _ref8$detail;
        if (!this.cueLayer) return;
        var card = document.createElement("div");
        card.className = "acquisition-card";
        card.dataset.cueId = String(++this.cueSerial);
        var icon = document.createElement("div");
        icon.className = "acquisition-card-icon";
        if (image) {
          var img = document.createElement("img");
          img.src = image;
          img.alt = "";
          icon.append(img);
        } else {
          icon.textContent = "ITEM";
        }
        var content = document.createElement("div");
        content.className = "acquisition-card-content";
        var heading = document.createElement("strong");
        heading.textContent = title;
        var main = document.createElement("span");
        main.textContent = label;
        content.append(heading, main);
        if (detail) {
          var note = document.createElement("small");
          note.textContent = detail;
          content.append(note);
        }
        card.append(icon, content);
        this.cueLayer.append(card);
        requestAnimationFrame(function () {
          return card.classList.add("is-visible");
        });
        setTimeout(function () {
          card.classList.add("is-leaving");
          setTimeout(function () {
            return card.remove();
          }, 260);
        }, 2200);
      }
    }, {
      key: "toast",
      value: function toast(message) {
        var _this20 = this;
        clearTimeout(this.toastTimer);
        if (this.toastMode === "attribute" && this.attributeToastCurrent) {
          this.attributeToastQueue.unshift(this.attributeToastCurrent);
        }
        this.attributeToastCurrent = null;
        this.toastMode = "standard";
        this.toastElement.textContent = message;
        this.toastElement.classList.add("visible");
        this.toastTimer = setTimeout(function () {
          _this20.toastTimer = null;
          _this20.toastMode = null;
          _this20.toastElement.classList.remove("visible");
          _this20.showNextAttributeToast();
        }, 1800);
      }
    }]);
  }();
  Game.GameWindow = GameWindow;
  Game.TextPlayer = TextPlayer;
  Game.MinigameWindow = MinigameWindow;
  Game.UIManager = UIManager;
})(window.TrainGame);
