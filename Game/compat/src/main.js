function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }
  var flow = Game.PageFlow;
  var params = new URLSearchParams(window.location.search);
  var mode = params.get("mode");
  var requestedSlot = flow.parseSlot(params.get("slot"));
  var state = new Game.GameState(data.meta.initialState, data.attributes, data.skills);
  var ui = new Game.UIManager(document.querySelector("#window-layer"), data.audio);
  var sceneRoot = document.querySelector("#scene-layer");
  var scene = new Game.SceneManager(sceneRoot, data.scenes, state);
  var saves = new Game.SaveManager(state);
  var ending = false;
  var engine = new Game.EventEngine({
    events: data.events,
    state: state,
    scene: scene,
    ui: ui,
    items: data.items,
    shouldTerminate: function shouldTerminate(currentState) {
      return Boolean(currentState.flags.ending_reason) || currentState.getAttribute("san") <= 0;
    },
    onTerminate: function () {
      var _onTerminate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _Game$PlayerProfile, _Game$PlayerProfile$u, _ui$audio, _ui$audio$stopAll, _ui$backgroundAudio, _ui$backgroundAudio$s, _ui$cancelPending, _document$querySelect;
        var reason, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!ending) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              ending = true;
              flow.clearTransfer();
              flow.clearRefreshSnapshot();
              reason = state.flags.ending_reason || "san";
              (_Game$PlayerProfile = Game.PlayerProfile) === null || _Game$PlayerProfile === void 0 || (_Game$PlayerProfile$u = _Game$PlayerProfile.unlockEnding) === null || _Game$PlayerProfile$u === void 0 || _Game$PlayerProfile$u.call(_Game$PlayerProfile, reason);
              // 预加载结局素材期间也不能继续播放旧场景音频。
              (_ui$audio = ui.audio) === null || _ui$audio === void 0 || (_ui$audio$stopAll = _ui$audio.stopAll) === null || _ui$audio$stopAll === void 0 || _ui$audio$stopAll.call(_ui$audio, {
                immediate: true
              });
              (_ui$backgroundAudio = ui.backgroundAudio) === null || _ui$backgroundAudio === void 0 || (_ui$backgroundAudio$s = _ui$backgroundAudio.stopAll) === null || _ui$backgroundAudio$s === void 0 || _ui$backgroundAudio$s.call(_ui$backgroundAudio, {
                immediate: true
              });
              // 终止是在最后一句对白执行时抛出的；先清理常规游戏 UI，
              // 再播放结局专属 OP，最后统一落到结局达成页。
              (_ui$cancelPending = ui.cancelPending) === null || _ui$cancelPending === void 0 || _ui$cancelPending.call(ui);
              if (hud) hud.hidden = true;
              if (inventoryBar) inventoryBar.hidden = true;
              (_document$querySelect = document.querySelector("#toast")) === null || _document$querySelect === void 0 || _document$querySelect.setAttribute("hidden", "");
              _context.p = 2;
              if (!(reason === "true_end" && typeof Game.playEndingASequence === "function")) {
                _context.n = 4;
                break;
              }
              _context.n = 3;
              return Game.playEndingASequence({
                root: gameShell,
                audio: ui.audio,
                backgroundAudio: ui.backgroundAudio,
                preserveBackgroundAudio: true
              });
            case 3:
              if (!(typeof Game.playThanksEndingSequence === "function")) {
                _context.n = 4;
                break;
              }
              _context.n = 4;
              return Game.playThanksEndingSequence({
                root: gameShell
              });
            case 4:
              if (!(reason === "cry_end" && typeof Game.playCryEndingSequence === "function")) {
                _context.n = 5;
                break;
              }
              _context.n = 5;
              return Game.playCryEndingSequence({
                root: gameShell,
                audio: ui.audio,
                backgroundAudio: ui.backgroundAudio
              });
            case 5:
              if (!(reason === "fake_end" && typeof Game.playFakeEndingSequence === "function")) {
                _context.n = 6;
                break;
              }
              _context.n = 6;
              return Game.playFakeEndingSequence({
                root: gameShell,
                audio: ui.audio,
                backgroundAudio: ui.backgroundAudio
              });
            case 6:
              if (!(reason === "bad_end" && typeof Game.playParkingEndingSequence === "function")) {
                _context.n = 7;
                break;
              }
              _context.n = 7;
              return Game.playParkingEndingSequence({
                root: gameShell,
                audio: ui.audio,
                backgroundAudio: ui.backgroundAudio
              });
            case 7:
              if (!(reason === "san" && typeof Game.playSanZeroSequence === "function")) {
                _context.n = 8;
                break;
              }
              _context.n = 8;
              return Game.playSanZeroSequence({
                root: gameShell,
                audio: ui.audio,
                backgroundAudio: ui.backgroundAudio
              });
            case 8:
              if (!(reason === "lost" && typeof Game.playLostEndingSequence === "function")) {
                _context.n = 9;
                break;
              }
              _context.n = 9;
              return Game.playLostEndingSequence({
                root: gameShell,
                backgroundAudio: ui.backgroundAudio
              });
            case 9:
              _context.n = 11;
              break;
            case 10:
              _context.p = 10;
              _t = _context.v;
              console.error("\u7ED3\u5C40\u6F14\u51FA\u5931\u8D25\uFF08".concat(reason, "\uFF09\uFF1A"), _t);
            case 11:
              _context.p = 11;
              navigateToEnding(reason);
              return _context.f(11);
            case 12:
              return _context.a(2);
          }
        }, _callee, null, [[2, 10, 11, 12]]);
      }));
      function onTerminate() {
        return _onTerminate.apply(this, arguments);
      }
      return onTerminate;
    }()
  });
  var gameShell = document.querySelector("#game-shell");
  var hud = document.querySelector("#hud");
  var inventoryBar = document.querySelector("#inventory-bar");
  var inventorySlots = document.querySelector("#inventory-slots");
  var pauseButton = document.querySelector("#pause-button");
  var itemDefinitions = new Map(data.items.map(function (item) {
    return [item.id, item];
  }));
  var sceneDefinitions = new Map(data.scenes.map(function (definition) {
    return [definition.id, definition];
  }));
  var minimumInventorySlots = 10;
  var startupLocked = true;
  var paused = false;
  var pauseTask = null;
  var activeSlot = requestedSlot;
  var autosavedCarriagesFlag = "autosaved_carriages";
  var autosavedCarriageIds = new Set();
  var INNER_WORLD_SCENES = new Set(["carriage_inner_01", "carriage_inner_02", "carriage_fake_04", "carriage_fake_01", "carriage_fake_02", "carriage_fake_03", "flower_sea", "flower_sea_inside"]);
  var INNER_WORLD_FLOWER_SEA_SCENES = new Set(["flower_sea", "flower_sea_inside"]);
  // 里世界静音区：只保留车门开/关、场景演出音与检定演出音。
  // 检定音（编号见 ui.js 的 DICE_SOUNDS）是玩家主动发起检定的即时反馈，不属于里世界的环境音，
  // 若一并静音，玩家在里世界做检定时会完全没有声音反馈，因此始终放行。
  var INNER_WORLD_ALLOWED_SOUNDS = ["door_open", "door_locked", "ghost_calling", "knocking_wall", "tinnitus_fake01", "dice_rolling", "dice_success", "dice_fail"];
  function navigateToEnding(reason) {
    try {
      flow.navigate("endingReveal", {
        reason: reason
      }, true);
    } catch (error) {
      console.error("结局页面跳转失败：", error);
      window.location.replace(flow.url("endingReveal", {
        reason: reason
      }));
    }
  }
  Game.registerProjectActions(engine);
  scene.onObjectClick = function (eventId) {
    return engine.play(eventId);
  };
  function visibleClickerInCarriage02() {
    var _sceneDefinitions$get;
    if (state.sceneId !== "carriage_02") return null;
    var clicker = (_sceneDefinitions$get = sceneDefinitions.get("carriage_02")) === null || _sceneDefinitions$get === void 0 || (_sceneDefinitions$get = _sceneDefinitions$get.objects) === null || _sceneDefinitions$get === void 0 ? void 0 : _sceneDefinitions$get.find(function (object) {
      return object.id === "clicker_02";
    });
    return clicker && !clicker.invisible && Game.evaluateCondition(clicker.visibleWhen, state) ? clicker : null;
  }
  function getClickerItemEvent(item) {
    if (!visibleClickerInCarriage02()) return null;
    if ((item === null || item === void 0 ? void 0 : item.id) === "bottle") return "E_028_THROW_FIRST";
    if ((item === null || item === void 0 ? void 0 : item.id) === "drink_empty") return "E_028_THROW_CAN_FIRST";
    if ((item === null || item === void 0 ? void 0 : item.id) === "drink") return "E_ITEM_DRINK_CLICKER_INSPECT";
    return null;
  }
  function getUnlitCarriage02ItemEvent(item) {
    if (state.sceneId !== "carriage_02" || state.flags.light_used === true) return null;
    return (item === null || item === void 0 ? void 0 : item.id) === "drink" ? "E_ITEM_DRINK_DARK_INSPECT" : null;
  }
  function maybeTriggerClickerReveal() {
    if (startupLocked || paused || engine.busy || state.sceneId !== "carriage_02" || state.flags.light_used !== true || state.flags.clicker_cleared === true || state.flags.clicker_first_encounter_seen === true || !visibleClickerInCarriage02()) return;
    void engine.play("E_026");
  }
  function inspectInventoryItem(item) {
    if (!item || startupLocked || paused || engine.busy) return;
    var eventId = getUnlitCarriage02ItemEvent(item) || getClickerItemEvent(item) || item.inspectEvent;
    void engine.play(eventId);
  }
  function updateInventoryBar() {
    var slotCount = Math.max(minimumInventorySlots, state.inventory.length);
    inventorySlots.replaceChildren();
    var _loop = function _loop() {
      var itemId = state.inventory[index];
      var item = itemId ? itemDefinitions.get(itemId) : null;
      var slot = document.createElement("button");
      slot.type = "button";
      slot.className = "inventory-slot".concat(item ? " occupied" : " empty");
      slot.disabled = !item || startupLocked || paused || engine.busy;
      slot.title = item ? "".concat(item.name, "\uFF08\u70B9\u51FB\u4F7F\u7528/\u8C03\u67E5\uFF09") : "\u7A7A\u7269\u54C1\u683C ".concat(index + 1);
      slot.setAttribute("aria-label", slot.title);
      var shortcut = document.createElement("span");
      shortcut.className = "inventory-shortcut";
      shortcut.textContent = index < 9 ? String(index + 1) : "";
      slot.append(shortcut);
      if (item) {
        var image = document.createElement("img");
        image.src = item.image;
        image.alt = "";
        var name = document.createElement("span");
        name.className = "inventory-item-name";
        name.textContent = item.name;
        slot.append(image, name);
        slot.addEventListener("click", function () {
          return inspectInventoryItem(item);
        });
      }
      inventorySlots.append(slot);
    };
    for (var index = 0; index < slotCount; index += 1) {
      _loop();
    }
  }
  function syncAudioForScene() {
    var _ui$audio2, _ui$audio2$setMuted, _ui$backgroundAudio2, _ui$backgroundAudio2$;
    var innerWorld = INNER_WORLD_SCENES.has(state.sceneId);
    var sceneAudioEnabled = !paused && !startupLocked;
    (_ui$audio2 = ui.audio) === null || _ui$audio2 === void 0 || (_ui$audio2$setMuted = _ui$audio2.setMuted) === null || _ui$audio2$setMuted === void 0 || _ui$audio2$setMuted.call(_ui$audio2, innerWorld, INNER_WORLD_ALLOWED_SOUNDS);
    var definition = sceneDefinitions.get(state.sceneId);
    var variant = ((definition === null || definition === void 0 ? void 0 : definition.backgroundSoundVariants) || []).find(function (entry) {
      return Game.evaluateCondition(entry.visibleWhen, state);
    });
    var innerWorldLaughing = state.flags.ev519_laugh_started === true && innerWorld && !INNER_WORLD_FLOWER_SEA_SCENES.has(state.sceneId);
    var track = sceneAudioEnabled ? innerWorldLaughing ? {
      sound: "woman_laughing"
    } : variant || (definition === null || definition === void 0 ? void 0 : definition.backgroundSound) || null : null;
    (_ui$backgroundAudio2 = ui.backgroundAudio) === null || _ui$backgroundAudio2 === void 0 || (_ui$backgroundAudio2$ = _ui$backgroundAudio2.setTrack) === null || _ui$backgroundAudio2$ === void 0 || _ui$backgroundAudio2$.call(_ui$backgroundAudio2, (track === null || track === void 0 ? void 0 : track.sound) || null, {
      loopGapMs: track === null || track === void 0 ? void 0 : track.loopGapMs
    });
  }
  function updateHud() {
    syncAudioForScene();
    document.querySelector("#attributes").textContent = Object.entries(state.attributes).map(function (_ref) {
      var _state$attributeDefin;
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return "".concat(((_state$attributeDefin = state.attributeDefinitions.get(key)) === null || _state$attributeDefin === void 0 ? void 0 : _state$attributeDefin.name) || key, " ").concat(value);
    }).join(" · ");
    document.querySelector("#save-slot").textContent = activeSlot ? "\u69FD\u4F4D ".concat(activeSlot) : "未绑定槽位";
    hud.hidden = startupLocked;
    inventoryBar.hidden = startupLocked;
    // 小游戏期间屏蔽系统暂停：暂停按钮与 Esc 均由玩法窗口接管（见 pauseGame / keydown）。
    pauseButton.disabled = startupLocked || ui.minigame.isOpen();
    updateInventoryBar();
    maybeTriggerCarriage06Guide();
    autoSaveOnNewCarriage();
    maybeTriggerClickerReveal();
    rememberRefreshCheckpoint();
  }

  // 刷新恢复跟随事件引擎的稳定检查点；即使正在等待 choice，也不会记录半截动作状态。
  function rememberRefreshCheckpoint() {
    var checkpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : engine.getCheckpoint();
    if (startupLocked || !activeSlot) return;
    flow.setRefreshCheckpoint(activeSlot, checkpoint);
  }
  function syncAutosavedCarriages() {
    var savedIds = Array.isArray(state.flags[autosavedCarriagesFlag]) ? state.flags[autosavedCarriagesFlag].filter(function (sceneId) {
      return typeof sceneId === "string";
    }) : [];
    autosavedCarriageIds = new Set(savedIds);
    if (data.meta.initialScene) autosavedCarriageIds.add(data.meta.initialScene);
    if (state.sceneId) autosavedCarriageIds.add(state.sceneId);
    state.flags[autosavedCarriagesFlag] = _toConsumableArray(autosavedCarriageIds);
  }
  function autoSaveOnNewCarriage() {
    if (startupLocked || paused || engine.busy || !activeSlot || !state.sceneId) return;
    if (!Game.PlayerProfile.getAutoSaveEnabled()) return;
    if (autosavedCarriageIds.has(state.sceneId)) return;
    var checkpoint = engine.getCheckpoint();
    if (!checkpoint.state.sceneId || checkpoint.state.sceneId !== state.sceneId) return;
    var nextAutosavedIds = [].concat(_toConsumableArray(autosavedCarriageIds), [checkpoint.state.sceneId]);
    checkpoint.state.flags = _objectSpread(_objectSpread({}, checkpoint.state.flags), {}, _defineProperty({}, autosavedCarriagesFlag, nextAutosavedIds));
    try {
      saves.save(activeSlot, checkpoint);
      autosavedCarriageIds = new Set(nextAutosavedIds);
      state.flags[autosavedCarriagesFlag] = nextAutosavedIds;
      engine.adoptCheckpoint(checkpoint.resume);
      ui.toast("已自动保存当前车厢进度");
    } catch (error) {
      console.error("切换车厢时自动保存失败：", error);
      ui.toast("\u81EA\u52A8\u4FDD\u5B58\u5931\u8D25\uFF1A".concat(errorMessage(error)));
    }
  }
  function hasInvestigatedAllCarriage06Items() {
    return state.flags.note_back_seen === true && state.flags.map_seen === true;
  }
  function maybeTriggerCarriage06Guide() {
    if (startupLocked || paused || engine.busy || state.sceneId !== "carriage_06" || !hasInvestigatedAllCarriage06Items() || state.flags.carriage_06_guide_seen === true) return;
    void engine.play("E_005_GUIDE");
  }
  engine.onStateChanged = updateHud;
  engine.onCheckpointChanged = rememberRefreshCheckpoint;
  function errorMessage(error) {
    return error instanceof Error ? error.message : "未知错误";
  }
  function restoreSave(slot) {
    var previousState = state.snapshot();
    var previousCheckpoint = engine.getCheckpoint();
    try {
      var checkpoint = saves.load(slot);
      if (!checkpoint) {
        ui.toast("\u69FD\u4F4D ".concat(slot, " \u8FD8\u6CA1\u6709\u5B58\u6863"));
        return false;
      }
      engine.restoreCheckpoint(checkpoint);
      if (!state.sceneId || !scene.hasScene(state.sceneId)) {
        throw new Error("\u5B58\u6863\u5F15\u7528\u4E86\u4E0D\u5B58\u5728\u7684\u573A\u666F\uFF1A".concat(state.sceneId || "空"));
      }
      syncAutosavedCarriages();
      scene.load(state.sceneId);
      engine.adoptCheckpoint(checkpoint.resume);
      updateHud();
      ui.toast("\u5DF2\u8BFB\u53D6\u69FD\u4F4D ".concat(slot));
      return true;
    } catch (error) {
      try {
        engine.restoreCheckpoint(previousCheckpoint);
      } catch (_restoreError) {
        state.restore(previousState);
      }
      scene.load(state.sceneId || data.meta.initialScene);
      updateHud();
      console.error("读取存档失败：", error);
      ui.toast("\u8BFB\u53D6\u5931\u8D25\uFF1A".concat(errorMessage(error)));
      return false;
    }
  }
  function restoreRefreshCheckpoint(slot) {
    var checkpoint = flow.getRefreshCheckpoint(slot);
    if (!checkpoint) return false;
    var previousState = state.snapshot();
    var previousCheckpoint = engine.getCheckpoint();
    try {
      engine.restoreCheckpoint(checkpoint);
      if (!state.sceneId || !scene.hasScene(state.sceneId)) {
        throw new Error("\u4E34\u65F6\u72B6\u6001\u5F15\u7528\u4E86\u4E0D\u5B58\u5728\u7684\u573A\u666F\uFF1A".concat(state.sceneId || "空"));
      }
      syncAutosavedCarriages();
      scene.load(state.sceneId);
      engine.adoptCheckpoint(checkpoint.resume);
      return true;
    } catch (error) {
      try {
        engine.restoreCheckpoint(previousCheckpoint);
      } catch (_restoreError) {
        state.restore(previousState);
      }
      flow.clearRefreshSnapshot();
      console.warn("刷新恢复临时状态失败：", error);
      return false;
    }
  }
  function resumeGame() {
    if (!paused) return;
    paused = false;
    gameShell.classList.remove("paused");
    ui.closePauseMenus();
    engine.setPaused(false);
    scene.setInteractionEnabled(!engine.busy);
    updateHud();
  }
  function confirmReturnToMenu() {
    return _confirmReturnToMenu.apply(this, arguments);
  }
  function _confirmReturnToMenu() {
    _confirmReturnToMenu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            return _context2.a(2, ui.confirmMenu.choose({
              title: "未保存的进度将丢失，确定返回主界面吗？",
              backdropClass: "menu-backdrop confirm-backdrop",
              options: [{
                label: "取消",
                value: false
              }, {
                label: "确定返回",
                value: true
              }]
            }));
        }
      }, _callee2);
    }));
    return _confirmReturnToMenu.apply(this, arguments);
  }
  function returnToMainMenu() {
    return _returnToMainMenu.apply(this, arguments);
  }
  function _returnToMainMenu() {
    _returnToMainMenu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            startupLocked = true;
            updateHud();
            _context3.n = 1;
            return engine.cancelToCheckpoint();
          case 1:
            paused = false;
            gameShell.classList.remove("paused");
            engine.setPaused(false);
            ui.closePauseMenus();
            scene.setInteractionEnabled(false);
            updateHud();
            flow.clearTransfer();
            flow.clearRefreshSnapshot();
            flow.navigate("home", {}, true);
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return _returnToMainMenu.apply(this, arguments);
  }
  function openSaveManager() {
    return _openSaveManager.apply(this, arguments);
  }
  function _openSaveManager() {
    _openSaveManager = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _t2;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return engine.cancelToCheckpoint();
          case 1:
            ui.closePauseMenus();
            flow.clearRefreshSnapshot();
            flow.setTransfer({
              kind: "save-manager-game",
              checkpoint: engine.getCheckpoint(),
              slot: activeSlot
            });
            flow.navigate("saveManager", {
              intent: "game"
            });
            return _context4.a(2, true);
          case 2:
            _context4.p = 2;
            _t2 = _context4.v;
            console.error("准备打开存档管理失败：", _t2);
            ui.toast("\u65E0\u6CD5\u6253\u5F00\u5B58\u6863\u7BA1\u7406\uFF1A".concat(errorMessage(_t2)));
            return _context4.a(2, false);
        }
      }, _callee4, null, [[0, 2]]);
    }));
    return _openSaveManager.apply(this, arguments);
  }
  function runPauseMenu() {
    return _runPauseMenu.apply(this, arguments);
  }
  function _runPauseMenu() {
    _runPauseMenu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var action, confirmed, _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (!(paused && !startupLocked)) {
              _context5.n = 17;
              break;
            }
            _context5.n = 1;
            return ui.pauseMenu.choose({
              title: "游戏已暂停",
              options: [{
                label: "继续游戏",
                value: "resume"
              }, {
                label: "存档管理",
                value: "save-manager",
                description: "存档、读取或删除存档"
              }, {
                label: "返回主界面",
                value: "return"
              }, {
                label: "保存并返回主界面",
                value: "save-return",
                description: "保存最近的稳定检查点后返回"
              }]
            });
          case 1:
            action = _context5.v;
            if (!(!paused || startupLocked)) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2);
          case 2:
            if (!(action === "resume" || action === null)) {
              _context5.n = 3;
              break;
            }
            resumeGame();
            return _context5.a(2);
          case 3:
            if (!(action === "save-manager")) {
              _context5.n = 6;
              break;
            }
            _context5.n = 4;
            return openSaveManager();
          case 4:
            if (!_context5.v) {
              _context5.n = 5;
              break;
            }
            return _context5.a(2);
          case 5:
            return _context5.a(3, 0);
          case 6:
            if (!(action === "return")) {
              _context5.n = 11;
              break;
            }
            _context5.n = 7;
            return confirmReturnToMenu();
          case 7:
            confirmed = _context5.v;
            if (!(!paused || startupLocked)) {
              _context5.n = 8;
              break;
            }
            return _context5.a(2);
          case 8:
            if (confirmed) {
              _context5.n = 9;
              break;
            }
            return _context5.a(3, 0);
          case 9:
            _context5.n = 10;
            return returnToMainMenu();
          case 10:
            return _context5.a(2);
          case 11:
            if (!(action === "save-return")) {
              _context5.n = 16;
              break;
            }
            _context5.p = 12;
            _context5.n = 13;
            return engine.cancelToCheckpoint();
          case 13:
            saves.save(activeSlot, engine.getCheckpoint());
            _context5.n = 14;
            return returnToMainMenu();
          case 14:
            return _context5.a(2);
          case 15:
            _context5.p = 15;
            _t3 = _context5.v;
            console.error("保存并返回失败：", _t3);
            ui.toast("\u4FDD\u5B58\u5931\u8D25\uFF1A".concat(errorMessage(_t3)));
          case 16:
            _context5.n = 0;
            break;
          case 17:
            return _context5.a(2);
        }
      }, _callee5, null, [[12, 15]]);
    }));
    return _runPauseMenu.apply(this, arguments);
  }
  function pauseGame() {
    if (startupLocked || paused || ending || ui.minigame.isOpen()) return;
    paused = true;
    gameShell.classList.add("paused");
    engine.setPaused(true);
    scene.setInteractionEnabled(false);
    updateHud();
    pauseTask = runPauseMenu().catch(function (error) {
      console.error("暂停菜单运行失败，已自动恢复游戏：", error);
      resumeGame();
    }).finally(function () {
      pauseTask = null;
    });
  }
  function showStartupError(_x) {
    return _showStartupError.apply(this, arguments);
  }
  function _showStartupError() {
    _showStartupError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(message) {
      var destination,
        _args6 = arguments;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            destination = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : "saveManager";
            console.error(message);
            _context6.n = 1;
            return ui.confirmMenu.choose({
              title: message,
              backdropClass: "menu-backdrop confirm-backdrop",
              options: [{
                label: destination === "home" ? "返回主页" : "返回存档管理",
                value: true
              }]
            });
          case 1:
            flow.navigate(destination, {}, true);
          case 2:
            return _context6.a(2);
        }
      }, _callee6);
    }));
    return _showStartupError.apply(this, arguments);
  }
  function saveInitialCheckpoint(_x2) {
    return _saveInitialCheckpoint.apply(this, arguments);
  }
  function _saveInitialCheckpoint() {
    _saveInitialCheckpoint = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(slot) {
      var retry, _t4;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            if (!true) {
              _context7.n = 5;
              break;
            }
            _context7.p = 1;
            saves.save(slot, engine.getCheckpoint());
            return _context7.a(2, true);
          case 2:
            _context7.p = 2;
            _t4 = _context7.v;
            console.error("建立初始存档失败：", _t4);
            _context7.n = 3;
            return ui.confirmMenu.choose({
              title: "\u5EFA\u7ACB\u521D\u59CB\u5B58\u6863\u5931\u8D25\uFF1A".concat(errorMessage(_t4)),
              backdropClass: "menu-backdrop confirm-backdrop",
              options: [{
                label: "返回主页",
                value: false
              }, {
                label: "重试",
                value: true
              }]
            });
          case 3:
            retry = _context7.v;
            if (retry) {
              _context7.n = 4;
              break;
            }
            return _context7.a(2, false);
          case 4:
            _context7.n = 0;
            break;
          case 5:
            return _context7.a(2);
        }
      }, _callee7, null, [[1, 2]]);
    }));
    return _saveInitialCheckpoint.apply(this, arguments);
  }
  function activateGame() {
    startupLocked = false;
    paused = false;
    scene.setInteractionEnabled(true);
    updateHud();
  }
  function startNewGame(_x3) {
    return _startNewGame.apply(this, arguments);
  }
  function _startNewGame() {
    _startNewGame = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(slot) {
      var allocation;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            flow.clearRefreshSnapshot();
            state.reset();
            scene.load(data.meta.initialScene);
            syncAutosavedCarriages();
            _context8.n = 1;
            return ui.attributeAllocation.choose(_toConsumableArray(state.attributeDefinitions.values()), state.totalAttributePoints);
          case 1:
            allocation = _context8.v;
            if (allocation) {
              _context8.n = 2;
              break;
            }
            flow.navigate("home", {}, true);
            return _context8.a(2);
          case 2:
            state.completeAttributeAllocation(allocation);
            engine.adoptCheckpoint({
              eventId: data.meta.startEvent,
              actionIndex: 0
            });
            _context8.n = 3;
            return saveInitialCheckpoint(slot);
          case 3:
            if (_context8.v) {
              _context8.n = 4;
              break;
            }
            flow.navigate("home", {}, true);
            return _context8.a(2);
          case 4:
            activateGame();
            void engine.resumeCheckpoint();
          case 5:
            return _context8.a(2);
        }
      }, _callee8);
    }));
    return _startNewGame.apply(this, arguments);
  }
  function restoreTransfer(slot) {
    var transfer = flow.getTransfer("resume-game");
    if (!transfer || transfer.slot !== slot || !transfer.checkpoint) {
      throw new Error("恢复游戏所需的临时状态不存在或已经失效");
    }
    engine.restoreCheckpoint(transfer.checkpoint);
    syncAutosavedCarriages();
    flow.clearTransfer();
    if (!state.sceneId || !scene.hasScene(state.sceneId)) {
      throw new Error("\u4E34\u65F6\u72B6\u6001\u5F15\u7528\u4E86\u4E0D\u5B58\u5728\u7684\u573A\u666F\uFF1A".concat(state.sceneId || "空"));
    }
    scene.load(state.sceneId);
    engine.adoptCheckpoint(transfer.checkpoint.resume);
  }
  function initialize() {
    return _initialize.apply(this, arguments);
  }
  function _initialize() {
    _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var newGameRequested, _t5;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            if (!(!requestedSlot || !["new", "load", "resume"].includes(mode))) {
              _context9.n = 2;
              break;
            }
            _context9.n = 1;
            return showStartupError("游戏入口参数无效，请从主页重新进入。", "home");
          case 1:
            return _context9.a(2);
          case 2:
            _context9.p = 2;
            newGameRequested = mode === "new" && flow.consumeNewGameIntent(requestedSlot);
            if (!newGameRequested) {
              _context9.n = 4;
              break;
            }
            _context9.n = 3;
            return startNewGame(requestedSlot);
          case 3:
            return _context9.a(2);
          case 4:
            if (!(flow.isReloadNavigation() && restoreRefreshCheckpoint(requestedSlot))) {
              _context9.n = 6;
              break;
            }
            if (!(state.getAttribute("san") <= 0)) {
              _context9.n = 5;
              break;
            }
            flow.clearRefreshSnapshot();
            flow.navigate("endingReveal", {
              reason: "san"
            }, true);
            return _context9.a(2);
          case 5:
            activateGame();
            void engine.resumeCheckpoint();
            return _context9.a(2);
          case 6:
            if (!(mode === "new")) {
              _context9.n = 9;
              break;
            }
            if (!restoreSave(requestedSlot)) {
              _context9.n = 7;
              break;
            }
            activateGame();
            void engine.resumeCheckpoint();
            _context9.n = 8;
            break;
          case 7:
            _context9.n = 8;
            return startNewGame(requestedSlot);
          case 8:
            return _context9.a(2);
          case 9:
            if (!(mode === "load")) {
              _context9.n = 11;
              break;
            }
            if (restoreSave(requestedSlot)) {
              _context9.n = 10;
              break;
            }
            throw new Error("\u69FD\u4F4D ".concat(requestedSlot, " \u6682\u65E0\u5B58\u6863"));
          case 10:
            _context9.n = 12;
            break;
          case 11:
            restoreTransfer(requestedSlot);
          case 12:
            if (!(state.getAttribute("san") <= 0)) {
              _context9.n = 13;
              break;
            }
            flow.navigate("endingReveal", {
              reason: "san"
            }, true);
            return _context9.a(2);
          case 13:
            activateGame();
            void engine.resumeCheckpoint();
            _context9.n = 15;
            break;
          case 14:
            _context9.p = 14;
            _t5 = _context9.v;
            flow.clearTransfer();
            _context9.n = 15;
            return showStartupError("\u65E0\u6CD5\u8FDB\u5165\u6E38\u620F\uFF1A".concat(errorMessage(_t5)));
          case 15:
            return _context9.a(2);
        }
      }, _callee9, null, [[2, 14]]);
    }));
    return _initialize.apply(this, arguments);
  }
  pauseButton.addEventListener("click", pauseGame);
  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented || event.repeat || startupLocked || ui.minigame.isOpen()) return;
    var shortcuts = Game.PlayerProfile.getShortcutSettings();
    var key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === shortcuts.pause) {
      event.preventDefault();
      if (paused) resumeGame();else pauseGame();
      return;
    }
    // 对话相关快捷键只在等待推进时响应，避免干扰选项、检定和物品调查等窗口。
    if (paused || !ui.dialog.isAwaitingAdvance()) return;
    if (key === shortcuts.advance) {
      event.preventDefault();
      ui.dialog.handleAdvance();
      return;
    }
    if (key === shortcuts.auto) {
      event.preventDefault();
      ui.dialog.setAuto(!ui.dialog.auto);
      return;
    }
    if (key === shortcuts.fast) {
      event.preventDefault();
      ui.dialog.setFast(!ui.dialog.fast);
    }
  });
  sceneRoot.addEventListener("click", function () {
    if (engine.busy) {
      // 场景空白点击只推进已完整显示的对白；流式输出期间不得补全文字。
      if (!paused && ui.dialog.isAwaitingAdvance() && !ui.dialog.player.running) {
        ui.dialog.handleAdvance();
      }
    }
  });
  window.addEventListener("pagehide", function () {
    var _ui$audio3, _ui$audio3$stopAll, _ui$backgroundAudio3, _ui$backgroundAudio3$;
    (_ui$audio3 = ui.audio) === null || _ui$audio3 === void 0 || (_ui$audio3$stopAll = _ui$audio3.stopAll) === null || _ui$audio3$stopAll === void 0 || _ui$audio3$stopAll.call(_ui$audio3, {
      immediate: true
    });
    (_ui$backgroundAudio3 = ui.backgroundAudio) === null || _ui$backgroundAudio3 === void 0 || (_ui$backgroundAudio3$ = _ui$backgroundAudio3.stopAll) === null || _ui$backgroundAudio3$ === void 0 || _ui$backgroundAudio3$.call(_ui$backgroundAudio3, {
      immediate: true
    });
  });
  scene.load(data.meta.initialScene);
  scene.setInteractionEnabled(false);
  updateHud();
  void initialize();

  // 便于组员在浏览器控制台调试，不作为剧情 JSON 的公共接口。
  window.game = {
    state: state,
    ui: ui,
    scene: scene,
    engine: engine,
    saves: saves,
    pauseGame: pauseGame,
    resumeGame: resumeGame
  };
})(window.TrainGame, window.GAME_DATA);
