function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }
  var flow = Game.PageFlow;
  var intent = new URLSearchParams(window.location.search).get("intent");
  var mode = intent === "new" ? "new" : intent === "game" ? "game" : "home";
  var transfer = mode === "game" ? flow.getTransfer("save-manager-game") : null;
  var state = new Game.GameState(data.meta.initialState, data.attributes, data.skills);
  var saves = new Game.SaveManager(state);
  var list = document.querySelector("#save-slots");
  var title = document.querySelector("#save-title");
  var introduction = document.querySelector("#save-introduction");
  var error = document.querySelector("#page-error");
  var footerAction = document.querySelector("#save-footer-action");
  var sceneNames = new Map(data.scenes.map(function (scene) {
    return [scene.id, scene.name];
  }));
  function formatTime(value) {
    if (!value) return "保存时间未知";
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? "保存时间未知" : date.toLocaleString("zh-CN");
  }
  function sceneNameOf(info) {
    return sceneNames.get(info.sceneId) || info.sceneId || "未知场景";
  }
  function describe(info) {
    var _info$san;
    if (info.empty) return "暂无存档";
    if (!info.compatible) return "\u65E0\u6CD5\u8BFB\u53D6\uFF1A".concat(info.error);
    return "".concat(sceneNameOf(info), " \xB7 SAN ").concat((_info$san = info.san) !== null && _info$san !== void 0 ? _info$san : "未知", " \xB7 ").concat(formatTime(info.savedAt));
  }
  function resumeGame() {
    flow.setTransfer({
      kind: "resume-game",
      checkpoint: transfer.checkpoint,
      slot: transfer.slot
    });
    flow.navigate("game", {
      mode: "resume",
      slot: transfer.slot
    }, true);
  }
  function loadSlot(slot) {
    flow.clearTransfer();
    flow.clearRefreshSnapshot();
    flow.navigate("game", {
      mode: "load",
      slot: slot
    });
  }
  function removeSlot(_x) {
    return _removeSlot.apply(this, arguments);
  }
  function _removeSlot() {
    _removeSlot = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(info) {
      var confirmed;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return Game.ConfirmDialog.ask({
              title: "\u786E\u5B9A\u5220\u9664\u69FD\u4F4D ".concat(info.slot, " \u7684\u5B58\u6863\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002"),
              confirmLabel: "确定删除"
            });
          case 1:
            confirmed = _context.v;
            if (confirmed) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            saves.delete(info.slot);
            render();
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _removeSlot.apply(this, arguments);
  }
  function chooseNewSlot(_x2) {
    return _chooseNewSlot.apply(this, arguments);
  }
  function _chooseNewSlot() {
    _chooseNewSlot = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(slot) {
      var confirmed;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!saves.hasSave(slot)) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return Game.ConfirmDialog.ask({
              title: "\u69FD\u4F4D ".concat(slot, " \u5DF2\u6709\u5B58\u6863\u3002\u5C5E\u6027\u5206\u914D\u786E\u8BA4\u540E\u5C06\u8986\u76D6\u5B83\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F"),
              confirmLabel: "继续覆盖"
            });
          case 1:
            confirmed = _context2.v;
            if (confirmed) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            flow.clearTransfer();
            flow.clearRefreshSnapshot();
            flow.markNewGameIntent(slot);
            flow.navigate("game", {
              mode: "new",
              slot: slot
            });
          case 3:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return _chooseNewSlot.apply(this, arguments);
  }
  function saveSlot(_x3) {
    return _saveSlot.apply(this, arguments);
  }
  function _saveSlot() {
    _saveSlot = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(info) {
      var confirmed;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(info.slot !== transfer.slot && saves.hasSave(info.slot))) {
              _context3.n = 2;
              break;
            }
            _context3.n = 1;
            return Game.ConfirmDialog.ask({
              title: "\u786E\u5B9A\u8986\u76D6\u69FD\u4F4D ".concat(info.slot, " \u7684\u5B58\u6863\u5417\uFF1F"),
              confirmLabel: "确定覆盖"
            });
          case 1:
            confirmed = _context3.v;
            if (confirmed) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            try {
              saves.save(info.slot, transfer.checkpoint);
              error.textContent = "\u5DF2\u4FDD\u5B58\u5230\u69FD\u4F4D ".concat(info.slot, "\u3002");
              render();
            } catch (saveError) {
              console.error("写入存档失败：", saveError);
              error.textContent = "\u5199\u5165\u5931\u8D25\uFF1A".concat(saveError instanceof Error ? saveError.message : "未知错误");
            }
          case 3:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return _saveSlot.apply(this, arguments);
  }
  function addButton(actions, label, handler) {
    var disabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener("click", handler);
    actions.append(button);
  }
  function createCard(info) {
    var card = document.createElement("article");
    card.className = "save-slot-card";
    var text = document.createElement("div");
    text.className = "save-slot-info";
    var heading = document.createElement("h2");
    heading.textContent = "\u69FD\u4F4D ".concat(info.slot).concat(mode === "game" && transfer.slot === info.slot ? "（当前）" : "");
    var detail = document.createElement("p");
    detail.textContent = describe(info);
    text.append(heading, detail);
    card.append(text, Game.SaveSlotArt.createPreview(info, sceneNameOf(info)));
    return card;
  }
  function renderNewGameSlot(info) {
    var card = createCard(info);
    card.classList.add("selectable-slot");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.addEventListener("click", function () {
      void chooseNewSlot(info.slot);
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        void chooseNewSlot(info.slot);
      }
    });
    list.append(card);
  }
  function renderManagedSlot(info) {
    var card = createCard(info);
    var actions = document.createElement("div");
    actions.className = "slot-actions";
    if (mode === "game") addButton(actions, "存档", function () {
      void saveSlot(info);
    });
    addButton(actions, "读取", function () {
      return loadSlot(info.slot);
    }, info.empty || !info.compatible);
    addButton(actions, "删除", function () {
      void removeSlot(info);
    }, info.empty);
    card.append(actions);
    list.append(card);
  }
  function render() {
    list.replaceChildren();
    if (mode === "game" && (!(transfer !== null && transfer !== void 0 && transfer.checkpoint) || !flow.parseSlot(transfer.slot))) {
      title.textContent = "存档管理";
      introduction.textContent = "本次游戏的存档请求已失效。";
      error.textContent = "无法恢复原游戏，请返回主页重新进入。";
      footerAction.textContent = "返回主页";
      return;
    }
    if (mode === "new") {
      title.textContent = "为新游戏选择槽位";
      introduction.textContent = "属性分配确认后才会覆盖所选槽位。";
      footerAction.textContent = "取消";
    } else if (mode === "game") {
      title.textContent = "存档管理";
      introduction.textContent = "可保存最近的稳定检查点、读取其他存档或删除存档。";
      footerAction.textContent = "返回游戏";
    } else {
      title.textContent = "存档管理";
      introduction.textContent = "选择已有存档继续游戏，或删除不再需要的存档。";
      footerAction.textContent = "返回主页";
    }
    var _iterator = _createForOfIteratorHelper(saves.listSlots()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var info = _step.value;
        if (mode === "new") renderNewGameSlot(info);else renderManagedSlot(info);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  footerAction.addEventListener("click", function () {
    if (mode === "game" && transfer !== null && transfer !== void 0 && transfer.checkpoint && flow.parseSlot(transfer.slot)) {
      resumeGame();
      return;
    }
    flow.clearTransfer();
    flow.navigate("home", {}, true);
  });
  render();
})(window.TrainGame, window.GAME_DATA);
