// PageFlow —— 集中管理多页面游戏（index / game / ending / settings 等）之间的导航：
// 统一维护“路由名 → HTML 文件”映射、带查询参数的跳转、存档槽位校验，
// 以及通过 sessionStorage 实现的跨页临时交接（如恢复游戏快照）。
(function (Game) {
  "use strict";

  // 页面间临时交接数据（如跨页恢复游戏快照）在 sessionStorage 中使用的键名。
  const TRANSFER_KEY = "train-game-page-transfer-v1";

  // 路由名 → 实际 HTML 文件名的映射表，是页面跳转的唯一事实来源。
  const routes = Object.freeze({
    home: "index.html", // 主页（标题界面）
    game: "game.html", // 游戏主流程页
    ending: "ending.html", // 结局页
    settings: "settings.html", // 设置页
    about: "about.html", // 关于 / 信息页
    saveManager: "save-manager.html", // 存档管理页（读取 / 删除）
    saveWrite: "save-write.html" // 存档写入页（新建 / 覆盖写入）
  });

  /**
   * 解析并校验 URL 查询参数中的存档槽位号。
   * @param {*} value - 原始参数值（通常来自 URL，如 "1"、"2"）。
   * @returns {number|null} 合法时返回 1~3 的整数槽位号；参数缺失、格式非法或越界时返回 null，
   *   调用方据此按“未绑定槽位”处理。
   */
  function parseSlot(value) {
    const slot = Number(value);
    return Number.isInteger(slot) && slot >= 1 && slot <= 3 ? slot : null;
  }

  /**
   * 根据路由名生成目标页面的完整 URL，并附加查询参数。
   * @param {string} route - routes 中定义的路由名。
   * @param {Object} [params={}] - 要写入查询字符串的参数表；值为 undefined / null 的键会被跳过。
   * @returns {string} 以当前页面为基准解析出的目标 URL。
   */
  function url(route, params = {}) {
    const target = new URL(routes[route], window.location.href);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) target.searchParams.set(key, String(value));
    }
    return target.href;
  }

  /**
   * 跳转到指定路由，可携带查询参数。
   * @param {string} route - 目标路由名。
   * @param {Object} [params={}] - 传递给目标页面的查询参数。
   * @param {boolean} [replace=false] - 为 true 时用 location.replace 覆盖历史记录（不能后退回来）；
   *   否则用 location.assign 正常入栈。
   */
  function navigate(route, params = {}, replace = false) {
    const target = url(route, params);
    if (replace) window.location.replace(target);
    else window.location.assign(target);
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
  function getTransfer(expectedKind = null) {
    try {
      const raw = sessionStorage.getItem(TRANSFER_KEY);
      if (!raw) return null;
      const payload = JSON.parse(raw);
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
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

  // 对外暴露的模块接口：路由表 + 跳转 / 槽位校验 / 临时交接能力
  Game.PageFlow = { routes, parseSlot, url, navigate, setTransfer, getTransfer, clearTransfer };
})(window.TrainGame);
