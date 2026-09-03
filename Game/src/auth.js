// Auth —— 为纯前端课程演示提供本地账号注册、键值对登录和标签页会话管理。
(function (Game) {
  "use strict";

  const ACCOUNT_KEY_PREFIX = "train-game-auth-user-v1:";
  const SESSION_KEY = "train-game-auth-session-v1";
  const PREFILL_KEY = "train-game-auth-prefill-v1";

  function result(ok, message = "", username = null) {
    return { ok, message, username };
  }

  function normalizeUsername(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function accountKey(username) {
    return `${ACCOUNT_KEY_PREFIX}${encodeURIComponent(username)}`;
  }

  function validateUsername(username) {
    if (username.length < 3 || username.length > 20) return "用户名须为 3–20 个字符";
    return "";
  }

  function validatePassword(password) {
    if (typeof password !== "string" || password.length < 6) return "密码至少需要 6 个字符";
    return "";
  }

  function register(rawUsername, password) {
    const username = normalizeUsername(rawUsername);
    const usernameError = validateUsername(username);
    if (usernameError) return result(false, usernameError);
    const passwordError = validatePassword(password);
    if (passwordError) return result(false, passwordError);

    try {
      const key = accountKey(username);
      if (window.localStorage.getItem(key) !== null) return result(false, "该用户名已被注册");
      window.localStorage.setItem(key, password);
      return result(true, "", username);
    } catch (_error) {
      return result(false, "浏览器无法保存账号，请检查站点存储权限");
    }
  }

  function login(rawUsername, password) {
    const username = normalizeUsername(rawUsername);
    if (!username || typeof password !== "string") return result(false, "请输入用户名和密码");

    try {
      const storedPassword = window.localStorage.getItem(accountKey(username));
      if (storedPassword === null || storedPassword !== password) return result(false, "用户名或密码错误");
      window.sessionStorage.setItem(SESSION_KEY, username);
      return result(true, "", username);
    } catch (_error) {
      return result(false, "浏览器无法建立登录会话，请检查站点存储权限");
    }
  }

  function currentUser() {
    try {
      const username = window.sessionStorage.getItem(SESSION_KEY);
      if (!username) return null;
      if (window.localStorage.getItem(accountKey(username)) !== null) return username;
      window.sessionStorage.removeItem(SESSION_KEY);
      return null;
    } catch (_error) {
      return null;
    }
  }

  function logout() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.sessionStorage.removeItem(PREFILL_KEY);
    } catch (_error) {
      // 即使存储清理失败，也继续跳回公共登录页。
    }
  }

  function rememberRegistration(username) {
    try {
      window.sessionStorage.setItem(PREFILL_KEY, username);
    } catch (_error) {
      // 预填只是增强功能，不应影响已完成的注册。
    }
  }

  function consumeRegistration() {
    try {
      const username = window.sessionStorage.getItem(PREFILL_KEY);
      window.sessionStorage.removeItem(PREFILL_KEY);
      return username;
    } catch (_error) {
      return null;
    }
  }

  function navigate(path) {
    window.location.replace(new URL(path, window.location.href));
  }

  function requireAuth() {
    const username = currentUser();
    if (!username) navigate("index.html");
    return username;
  }

  function redirectAuthenticated() {
    if (!currentUser()) return false;
    navigate("home.html");
    return true;
  }

  Game.Auth = {
    register,
    login,
    currentUser,
    logout,
    rememberRegistration,
    consumeRegistration,
    requireAuth,
    redirectAuthenticated
  };
})(window.TrainGame);
