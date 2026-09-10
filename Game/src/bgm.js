(function () {
  "use strict";

  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : new URL("src/bgm.js", window.location.href).href;
  const SOURCE = new URL("../assets/audio/bgm.mp3", scriptUrl).href;
  const STORAGE_KEY = "train-game-bgm-state-v1";
  const VOLUME = 0.55;
  const SAVE_INTERVAL = 1000;

  if (window.__TRAIN_GAME_BGM__) {
    window.__TRAIN_GAME_BGM__.resume();
    return;
  }

  let audio = null;
  let restored = false;
  let unlockArmed = false;
  let lastPersistedAt = 0;

  function readState() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const state = JSON.parse(raw);
      if (!state || state.source !== SOURCE || !Number.isFinite(state.currentTime)) return null;
      return state;
    } catch (_error) {
      return null;
    }
  }

  function persist(force = false) {
    if (!audio || !Number.isFinite(audio.currentTime)) return;
    const now = Date.now();
    if (!force && now - lastPersistedAt < SAVE_INTERVAL) return;
    lastPersistedAt = now;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        source: SOURCE,
        currentTime: audio.currentTime,
        updatedAt: now
      }));
    } catch (_error) {
      // 存储不可用时仍继续播放，只是无法跨页保留进度。
    }
  }

  function restoreTime() {
    if (restored || !audio) return;
    restored = true;
    const state = readState();
    if (!state) return;
    const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : null;
    const currentTime = duration ? state.currentTime % duration : state.currentTime;
    try {
      audio.currentTime = Math.max(0, currentTime);
    } catch (_error) {
      // 元数据尚未就绪时忽略；后续 loadedmetadata 会再尝试。
      restored = false;
    }
  }

  function play() {
    if (!audio) return Promise.resolve();
    restoreTime();
    const promise = audio.play();
    if (!promise || typeof promise.catch !== "function") return Promise.resolve();
    return promise.catch(() => {
      armUnlock();
    });
  }

  function armUnlock() {
    if (unlockArmed) return;
    unlockArmed = true;
    const unlock = () => {
      const promise = play();
      promise.then(removeUnlock);
    };
    const removeUnlock = () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      unlockArmed = false;
    };
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
  }

  function initialize() {
    if (audio) return;
    audio = document.createElement("audio");
    audio.src = SOURCE;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = VOLUME;
    audio.hidden = true;
    audio.setAttribute("aria-hidden", "true");
    audio.addEventListener("loadedmetadata", restoreTime, { once: true });
    audio.addEventListener("timeupdate", () => persist());

    document.body.append(audio);
    play();

    window.addEventListener("pagehide", () => persist(true));
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") persist(true);
      else play();
    });
  }

  window.__TRAIN_GAME_BGM__ = {
    resume: play,
    save: () => persist(true),
    getAudio: () => audio
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
