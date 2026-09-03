(function (Game) {
  "use strict";

  const TRANSFER_KEY = "train-game-page-transfer-v1";
  const routes = Object.freeze({
    home: "index.html",
    game: "game.html",
    ending: "ending.html",
    settings: "settings.html",
    about: "about.html",
    saveManager: "save-manager.html",
    saveWrite: "save-write.html"
  });

  function parseSlot(value) {
    const slot = Number(value);
    return Number.isInteger(slot) && slot >= 1 && slot <= 3 ? slot : null;
  }

  function url(route, params = {}) {
    const target = new URL(routes[route], window.location.href);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) target.searchParams.set(key, String(value));
    }
    return target.href;
  }

  function navigate(route, params = {}, replace = false) {
    const target = url(route, params);
    if (replace) window.location.replace(target);
    else window.location.assign(target);
  }

  function setTransfer(payload) {
    sessionStorage.setItem(TRANSFER_KEY, JSON.stringify(payload));
  }

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

  function clearTransfer() {
    try {
      sessionStorage.removeItem(TRANSFER_KEY);
    } catch (_error) {
      // 页面导航不能因为清理过期临时状态失败而被阻断。
    }
  }

  Game.PageFlow = { routes, parseSlot, url, navigate, setTransfer, getTransfer, clearTransfer };
})(window.TrainGame);
