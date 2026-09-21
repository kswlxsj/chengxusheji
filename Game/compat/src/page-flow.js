function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// PageFlow —— 集中管理多页面游戏（home / game / ending / settings 等）之间的导航：
// 统一维护“路由名 → HTML 文件”映射、带查询参数的跳转、存档槽位校验，
// 以及通过 sessionStorage 实现的跨页临时交接（如恢复游戏快照）。
(function (Game) {
  "use strict";

  // 页面间临时交接数据（如跨页恢复游戏快照）在 sessionStorage 中使用的键名。
  var TRANSFER_KEY = "train-game-page-transfer-v1";
  var NEW_GAME_INTENT_KEY = "train-game-new-intent-v1";
  var HOME_OP_INTENT_KEY = "train-game-home-op-intent-v1";
  // 当前标签页刷新恢复使用独立检查点键，不与跨页交接混用；关闭标签页后由浏览器自动清除。
  var REFRESH_CHECKPOINT_KEY = "train-game-refresh-checkpoint-v2";
  var GAME_UI_BUILD = "checkpoint-20260917-1";

  // 路由名 → 实际 HTML 文件名的映射表，是页面跳转的唯一事实来源。
  var routes = Object.freeze({
    home: "home.html",
    // 主页（标题界面）
    game: "game.html",
    // 游戏主流程页
    endingReveal: "ending-reveal.html",
    // 结局达成过渡页
    ending: "ending.html",
    // 视频结局页
    settings: "settings.html",
    // 设置页
    about: "GroupIntro/index.html",
    // 小组介绍汇总页（接替原 about.html 占位页）
    saveManager: "save-manager.html" // 统一存档管理页（读取 / 删除 / 写入）
  });

  /**
   * 解析并校验 URL 查询参数中的存档槽位号。
   * @param {*} value - 原始参数值（通常来自 URL，如 "1"、"2"）。
   * @returns {number|null} 合法时返回 1~3 的整数槽位号；参数缺失、格式非法或越界时返回 null，
   *   调用方据此按“未绑定槽位”处理。
   */
  function parseSlot(value) {
    var slot = Number(value);
    return Number.isInteger(slot) && slot >= 1 && slot <= 3 ? slot : null;
  }

  /**
   * 根据路由名生成目标页面的完整 URL，并附加查询参数。
   * @param {string} route - routes 中定义的路由名。
   * @param {Object} [params={}] - 要写入查询字符串的参数表；值为 undefined / null 的键会被跳过。
   * @returns {string} 以当前页面为基准解析出的目标 URL。
   */
  function url(route) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var target = new URL(routes[route], window.location.href);
    for (var _i = 0, _Object$entries = Object.entries(params); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      if (value !== undefined && value !== null) target.searchParams.set(key, String(value));
    }
    if (route === "game") target.searchParams.set("uiBuild", GAME_UI_BUILD);
    return target.href;
  }

  /**
   * 跳转到指定路由，可携带查询参数。
   * @param {string} route - 目标路由名。
   * @param {Object} [params={}] - 传递给目标页面的查询参数。
   * @param {boolean} [replace=false] - 为 true 时用 location.replace 覆盖历史记录（不能后退回来）；
   *   否则用 location.assign 正常入栈。
   */
  function navigate(route) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var target = url(route, params);
    if (replace) window.location.replace(target);else window.location.assign(target);
  }

  /**
   * 在 sessionStorage 中写入一条跨页交接数据（如 resume-game 快照）。
   * @param {Object} payload - 交接数据对象，通常包含 kind 字段用于标识类型。
   */
  function setTransfer(payload) {
    sessionStorage.setItem(TRANSFER_KEY, JSON.stringify(payload));
  }

  /**
   * 读取上一条跨页交接数据；读取失败、数据格式非法或类型不符时都返回 null 而不是抛错。
   * @param {string|null} [expectedKind=null] - 期望的 kind 值；传入后若数据 kind 不匹配则视为无效。
   * @returns {Object|null} 有效交接数据；不存在或无效时返回 null。
   */
  function getTransfer() {
    var expectedKind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    try {
      var raw = sessionStorage.getItem(TRANSFER_KEY);
      if (!raw) return null;
      var payload = JSON.parse(raw);
      if (!payload || _typeof(payload) !== "object" || Array.isArray(payload)) return null;
      if (expectedKind && payload.kind !== expectedKind) return null;
      return payload;
    } catch (_error) {
      return null;
    }
  }

  /**
   * 清除跨页交接数据，避免下次导航误用过期状态。
   */
  function clearTransfer() {
    try {
      sessionStorage.removeItem(TRANSFER_KEY);
    } catch (_error) {
      // 页面导航不能因为清理过期临时状态失败而被阻断。
    }
  }
  function isPlainObject(value) {
    return Boolean(value) && _typeof(value) === "object" && !Array.isArray(value);
  }
  function setRefreshCheckpoint(slot, checkpoint) {
    if (!parseSlot(slot) || !isPlainObject(checkpoint)) return false;
    try {
      sessionStorage.setItem(REFRESH_CHECKPOINT_KEY, JSON.stringify({
        kind: "refresh-game",
        slot: slot,
        checkpoint: checkpoint
      }));
      return true;
    } catch (_error) {
      return false;
    }
  }
  function getRefreshCheckpoint(slot) {
    if (!parseSlot(slot)) return null;
    try {
      var raw = sessionStorage.getItem(REFRESH_CHECKPOINT_KEY);
      if (!raw) return null;
      var payload = JSON.parse(raw);
      if (!isPlainObject(payload) || payload.kind !== "refresh-game" || payload.slot !== slot || !isPlainObject(payload.checkpoint)) {
        clearRefreshSnapshot();
        return null;
      }
      return payload.checkpoint;
    } catch (_error) {
      clearRefreshSnapshot();
      return null;
    }
  }
  function clearRefreshSnapshot() {
    try {
      sessionStorage.removeItem(REFRESH_CHECKPOINT_KEY);
    } catch (_error) {
      // 临时恢复数据清理失败不应阻止页面导航。
    }
  }
  function isReloadNavigation() {
    var _window$performance, _window$performance$g, _window$performance2;
    var navigation = (_window$performance = window.performance) === null || _window$performance === void 0 || (_window$performance$g = _window$performance.getEntriesByType) === null || _window$performance$g === void 0 || (_window$performance$g = _window$performance$g.call(_window$performance, "navigation")) === null || _window$performance$g === void 0 ? void 0 : _window$performance$g[0];
    if (navigation) return navigation.type === "reload";
    return ((_window$performance2 = window.performance) === null || _window$performance2 === void 0 || (_window$performance2 = _window$performance2.navigation) === null || _window$performance2 === void 0 ? void 0 : _window$performance2.type) === 1;
  }
  function markNewGameIntent(slot) {
    sessionStorage.setItem(NEW_GAME_INTENT_KEY, String(slot));
  }
  function consumeNewGameIntent(slot) {
    try {
      if (sessionStorage.getItem(NEW_GAME_INTENT_KEY) !== String(slot)) return false;
      sessionStorage.removeItem(NEW_GAME_INTENT_KEY);
      return true;
    } catch (_error) {
      return false;
    }
  }
  function markHomeOpIntent(source) {
    if (source !== "login" && source !== "ending") return false;
    try {
      sessionStorage.setItem(HOME_OP_INTENT_KEY, source);
      return true;
    } catch (_error) {
      return false;
    }
  }
  function consumeHomeOpIntent() {
    try {
      var source = sessionStorage.getItem(HOME_OP_INTENT_KEY);
      sessionStorage.removeItem(HOME_OP_INTENT_KEY);
      return source === "login" || source === "ending";
    } catch (_error) {
      return false;
    }
  }

  // 对外暴露的模块接口：路由表 + 跳转 / 槽位校验 / 临时交接能力
  Game.PageFlow = {
    routes: routes,
    parseSlot: parseSlot,
    url: url,
    navigate: navigate,
    setTransfer: setTransfer,
    getTransfer: getTransfer,
    clearTransfer: clearTransfer,
    setRefreshCheckpoint: setRefreshCheckpoint,
    getRefreshCheckpoint: getRefreshCheckpoint,
    clearRefreshSnapshot: clearRefreshSnapshot,
    isReloadNavigation: isReloadNavigation,
    markNewGameIntent: markNewGameIntent,
    consumeNewGameIntent: consumeNewGameIntent,
    markHomeOpIntent: markHomeOpIntent,
    consumeHomeOpIntent: consumeHomeOpIntent
  };
})(window.TrainGame);
