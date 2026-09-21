function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game) {
  "use strict";

  var PROFILE_VERSION = 5;
  var STORAGE_KEY_PREFIX = "train-game-profile-user-v1:";
  var AUDIO_REFERENCE_LEVEL = 0.6;
  var AUDIO_KEYS = Object.freeze(["pageMusic", "gameAmbience", "gameSfx", "buttonSfx"]);
  var AUDIO_KEY_SET = new Set(AUDIO_KEYS);
  var SHORTCUT_KEYS = Object.freeze(["pause", "advance", "auto", "fast"]);
  var SHORTCUT_KEY_SET = new Set(SHORTCUT_KEYS);
  var DEFAULT_SHORTCUTS = Object.freeze({
    pause: "Escape",
    advance: " ",
    auto: "a",
    fast: "Control"
  });
  var UNSUPPORTED_SHORTCUT_KEYS = new Set(["", "Unidentified", "Dead", "Process", "Alt", "Shift", "Meta"]);
  var ENDING_CATALOG = Object.freeze([Object.freeze({
    id: "true_end",
    title: "不要温和地走进那个良夜",
    description: "加速的列车驶入光明，迎接属于你的新的开始。",
    image: "assets/Image/Scene/Background/true-end-platform.ie.jpg"
  }), Object.freeze({
    id: "cry_end",
    title: "那半梦半醒中入耳穿骨的哭泣",
    description: "你醒了过来，活着回到家中；那场列车上的哭喊却仍在耳边回荡。",
    image: "assets/Image/Scene/Background/chengwuyuan-dead.png"
  }), Object.freeze({
    id: "fake_end",
    title: "你所说的曙光究竟是什么意思",
    description: "目睹那些东西之后，回归现实生活……大概吧。",
    image: "assets/Image/Scene/Background/move.ie.jpg"
  }), Object.freeze({
    id: "lost",
    title: "于他者所思的自我与自我所想的他者之间",
    description: "层层嵌套，自我指涉，盘曲虬结，错综复杂。",
    image: "assets/Image/Scene/Background/flower-sea.ie.jpg"
  }), Object.freeze({
    id: "bad_end",
    title: "恐怖",
    description: "列车陷入黑暗，意识与身体一同消失。",
    image: "assets/Image/Scene/Background/carriage-03.ie.jpg"
  }), Object.freeze({
    id: "san",
    title: "患者",
    description: "SAN 已降至 0。",
    image: "assets/Image/Scene/Background/san-zero-hospital.ie.jpg"
  })]);
  var ENDING_IDS = new Set(ENDING_CATALOG.map(function (ending) {
    return ending.id;
  }));
  function defaultProfile() {
    return {
      version: PROFILE_VERSION,
      audio: {
        pageMusic: AUDIO_REFERENCE_LEVEL,
        gameAmbience: AUDIO_REFERENCE_LEVEL,
        gameSfx: AUDIO_REFERENCE_LEVEL,
        buttonSfx: AUDIO_REFERENCE_LEVEL
      },
      autoSaveEnabled: true,
      shortcuts: _objectSpread({}, DEFAULT_SHORTCUTS),
      unlockedEndings: []
    };
  }
  function clampVolume(value) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AUDIO_REFERENCE_LEVEL;
    var number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(1, Math.max(0, number));
  }
  function normalizeShortcutKey(value) {
    if (typeof value !== "string") return null;
    var key = value === " " ? value : value.trim();
    if (UNSUPPORTED_SHORTCUT_KEYS.has(key)) return null;
    return key.length === 1 ? key.toLowerCase() : key;
  }
  function normalizeShortcuts(value) {
    if (!value || _typeof(value) !== "object" || Array.isArray(value)) return _objectSpread({}, DEFAULT_SHORTCUTS);
    var shortcuts = {};
    var assigned = new Set();
    var _iterator = _createForOfIteratorHelper(SHORTCUT_KEYS),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var action = _step.value;
        var key = normalizeShortcutKey(value[action]);
        if (!key || assigned.has(key)) return _objectSpread({}, DEFAULT_SHORTCUTS);
        shortcuts[action] = key;
        assigned.add(key);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return shortcuts;
  }
  function normalizeProfile(value) {
    var profile = defaultProfile();
    if (!value || _typeof(value) !== "object" || Array.isArray(value)) return profile;
    var audio = value.audio;
    if (audio && _typeof(audio) === "object" && !Array.isArray(audio)) {
      // v1 直接把保存值当作实际倍率；换算成新滑杆位置后保持听感不变。
      var legacyScale = value.version === 1 ? AUDIO_REFERENCE_LEVEL : 1;
      var _iterator2 = _createForOfIteratorHelper(AUDIO_KEYS),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var key = _step2.value;
          var number = Number(audio[key]);
          profile.audio[key] = Number.isFinite(number) ? clampVolume(number * legacyScale) : AUDIO_REFERENCE_LEVEL;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    if (Array.isArray(value.unlockedEndings)) {
      profile.unlockedEndings = _toConsumableArray(new Set(value.unlockedEndings.filter(function (id) {
        return ENDING_IDS.has(id);
      })));
    }
    if (typeof value.autoSaveEnabled === "boolean") profile.autoSaveEnabled = value.autoSaveEnabled;
    profile.shortcuts = normalizeShortcuts(value.shortcuts);
    return profile;
  }
  function currentStorageKey() {
    var _Game$Auth, _Game$Auth$currentUse;
    var username = (_Game$Auth = Game.Auth) === null || _Game$Auth === void 0 || (_Game$Auth$currentUse = _Game$Auth.currentUser) === null || _Game$Auth$currentUse === void 0 ? void 0 : _Game$Auth$currentUse.call(_Game$Auth);
    if (!username) throw new Error("必须登录后才能访问玩家配置");
    return "".concat(STORAGE_KEY_PREFIX).concat(encodeURIComponent(username));
  }
  function readProfile() {
    try {
      var raw = localStorage.getItem(currentStorageKey());
      return raw === null ? defaultProfile() : normalizeProfile(JSON.parse(raw));
    } catch (_error) {
      return defaultProfile();
    }
  }
  function writeProfile(profile) {
    try {
      localStorage.setItem(currentStorageKey(), JSON.stringify(normalizeProfile(profile)));
      return true;
    } catch (_error) {
      return false;
    }
  }
  function getAudioSettings() {
    return _objectSpread({}, readProfile().audio);
  }
  function setAudioSetting(key, value) {
    if (!AUDIO_KEY_SET.has(key)) throw new RangeError("\u672A\u77E5\u97F3\u91CF\u8BBE\u7F6E\uFF1A".concat(key || "空"));
    var profile = readProfile();
    profile.audio[key] = clampVolume(value);
    writeProfile(profile);
    return profile.audio[key];
  }
  function toAudioGain(value) {
    return clampVolume(value) / AUDIO_REFERENCE_LEVEL;
  }
  function getAudioGain(key) {
    if (!AUDIO_KEY_SET.has(key)) throw new RangeError("\u672A\u77E5\u97F3\u91CF\u8BBE\u7F6E\uFF1A".concat(key || "空"));
    return toAudioGain(readProfile().audio[key]);
  }
  function getAutoSaveEnabled() {
    return readProfile().autoSaveEnabled;
  }
  function setAutoSaveEnabled(value) {
    var profile = readProfile();
    profile.autoSaveEnabled = Boolean(value);
    writeProfile(profile);
    return profile.autoSaveEnabled;
  }
  function getShortcutSettings() {
    return _objectSpread({}, readProfile().shortcuts);
  }
  function setShortcutSetting(action, value) {
    if (!SHORTCUT_KEY_SET.has(action)) throw new RangeError("\u672A\u77E5\u5FEB\u6377\u952E\u64CD\u4F5C\uFF1A".concat(action || "空"));
    var key = normalizeShortcutKey(value);
    if (!key) throw new RangeError("该按键不能用作快捷键");
    var profile = readProfile();
    var duplicateAction = SHORTCUT_KEYS.find(function (candidate) {
      return candidate !== action && profile.shortcuts[candidate] === key;
    });
    if (duplicateAction) throw new RangeError("该按键已被其他操作使用");
    profile.shortcuts[action] = key;
    writeProfile(profile);
    return profile.shortcuts[action];
  }
  function resetShortcutSettings() {
    var profile = readProfile();
    profile.shortcuts = _objectSpread({}, DEFAULT_SHORTCUTS);
    writeProfile(profile);
    return _objectSpread({}, profile.shortcuts);
  }
  function getUnlockedEndings() {
    return _toConsumableArray(readProfile().unlockedEndings);
  }
  function unlockEnding(id) {
    if (!ENDING_IDS.has(id)) return false;
    var profile = readProfile();
    if (profile.unlockedEndings.includes(id)) return false;
    profile.unlockedEndings.push(id);
    return writeProfile(profile);
  }
  Game.ENDING_CATALOG = ENDING_CATALOG;
  Game.AUDIO_REFERENCE_LEVEL = AUDIO_REFERENCE_LEVEL;
  Game.PlayerProfile = Object.freeze({
    getAudioSettings: getAudioSettings,
    setAudioSetting: setAudioSetting,
    getAudioGain: getAudioGain,
    toAudioGain: toAudioGain,
    getAutoSaveEnabled: getAutoSaveEnabled,
    setAutoSaveEnabled: setAutoSaveEnabled,
    getShortcutSettings: getShortcutSettings,
    setShortcutSetting: setShortcutSetting,
    resetShortcutSettings: resetShortcutSettings,
    getUnlockedEndings: getUnlockedEndings,
    unlockEnding: unlockEnding
  });
})(window.TrainGame);
