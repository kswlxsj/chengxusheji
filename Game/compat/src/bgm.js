(function (_window$TrainGame$Pla, _window$TrainGame, _window$TrainGame$get) {
  "use strict";

  var scriptUrl = document.currentScript && document.currentScript.src ? document.currentScript.src : new URL("src/bgm.js", window.location.href).href;
  var pageFile = new URL(window.location.href).pathname.split("/").pop() || "index.html";
  var sourceFile = pageFile === "ending.html" ? "../assets/Audio/Bgm/op-v2.mp3" : "../assets/Audio/Bgm/bgm-v2.mp3";
  var SOURCE = new URL(sourceFile, scriptUrl).href;
  var STORAGE_KEY = "train-game-bgm-state-v1";
  var OP_ACTIVE_FLAG = "__TRAIN_GAME_OP_ACTIVE__";
  var BASE_VOLUME = 0.55;
  var SAVE_INTERVAL = 1000;
  var FADE_MS = 800; // 淡入淡出时长
  var BGM_PAGE_FILES = new Set(["home.html", "settings.html", "ending.html"]);
  var userGain = (_window$TrainGame$Pla = (_window$TrainGame = window.TrainGame) === null || _window$TrainGame === void 0 || (_window$TrainGame = _window$TrainGame.PlayerProfile) === null || _window$TrainGame === void 0 || (_window$TrainGame$get = _window$TrainGame.getAudioGain) === null || _window$TrainGame$get === void 0 ? void 0 : _window$TrainGame$get.call(_window$TrainGame, "pageMusic")) !== null && _window$TrainGame$Pla !== void 0 ? _window$TrainGame$Pla : 1;
  function clamp(value) {
    return Math.min(1, Math.max(0, Number(value) || 0));
  }
  function targetVolume() {
    return clamp(BASE_VOLUME * userGain);
  }

  // 标题页与设置页播放主页 BGM，结束页播放 OP；游戏页和其余辅助页面不播放这套音乐。
  if (!BGM_PAGE_FILES.has(pageFile)) {
    window.__TRAIN_GAME_BGM__ = {
      resume: function resume() {
        return Promise.resolve();
      },
      restart: function restart() {
        return Promise.resolve();
      },
      pause: function pause() {},
      save: function save() {},
      getAudio: function getAudio() {
        return null;
      },
      getVolume: targetVolume,
      setVolume: function setVolume() {}
    };
    return;
  }
  if (window.__TRAIN_GAME_BGM__) {
    window.__TRAIN_GAME_BGM__.resume();
    return;
  }
  var audio = null;
  var restored = false;
  var unlockArmed = false;
  var lastPersistedAt = 0;
  var fadeTimer = null;
  function readState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var state = JSON.parse(raw);
      if (!state || state.source !== SOURCE || !Number.isFinite(state.currentTime)) return null;
      return state;
    } catch (_error) {
      return null;
    }
  }
  function persist() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!audio || !Number.isFinite(audio.currentTime)) return;
    var now = Date.now();
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
    var state = readState();
    if (!state) return;
    var duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : null;
    var currentTime = duration ? state.currentTime % duration : state.currentTime;
    try {
      audio.currentTime = Math.max(0, currentTime);
    } catch (_error) {
      restored = false;
    }
  }

  /* ---------- 淡入 / 淡出 ---------- */
  function fadeTo(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FADE_MS;
    if (!audio) return;
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
    var start = audio.volume;
    var startTime = performance.now();
    fadeTimer = setInterval(function () {
      var t = Math.min(1, (performance.now() - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t >= 1) {
        clearInterval(fadeTimer);
        fadeTimer = null;
        if (target === 0) {
          audio.pause();
        }
      }
    }, 30);
  }
  function playWithFade(fadeDuration) {
    if (!audio || window[OP_ACTIVE_FLAG] === true) return Promise.resolve();
    restoreTime();
    audio.volume = 0;
    var promise = audio.play();
    if (!promise || typeof promise.catch !== "function") {
      fadeTo(targetVolume(), fadeDuration);
      return Promise.resolve();
    }
    return promise.then(function () {
      return fadeTo(targetVolume(), fadeDuration);
    }).catch(function () {
      armUnlock();
    });
  }
  function play() {
    return playWithFade(FADE_MS);
  }
  function restart() {
    var fadeDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FADE_MS;
    restored = true;
    var duration = Number.isFinite(fadeDuration) && fadeDuration >= 0 ? fadeDuration : FADE_MS;
    if (audio) {
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch (_error) {
        // 元数据未就绪时仍保留“不复用旧进度”的标记。
      }
    }
    return playWithFade(duration);
  }
  function pauseSmooth() {
    if (!audio) return;
    fadeTo(0);
  }
  function setVolume(value) {
    var _window$TrainGame$Pla2, _window$TrainGame2, _window$TrainGame2$to;
    userGain = (_window$TrainGame$Pla2 = (_window$TrainGame2 = window.TrainGame) === null || _window$TrainGame2 === void 0 || (_window$TrainGame2 = _window$TrainGame2.PlayerProfile) === null || _window$TrainGame2 === void 0 || (_window$TrainGame2$to = _window$TrainGame2.toAudioGain) === null || _window$TrainGame2$to === void 0 ? void 0 : _window$TrainGame2$to.call(_window$TrainGame2, value)) !== null && _window$TrainGame$Pla2 !== void 0 ? _window$TrainGame$Pla2 : clamp(value);
    if (!audio) return targetVolume();
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
    audio.volume = targetVolume();
    if (userGain > 0 && audio.paused && window[OP_ACTIVE_FLAG] !== true) play();
    return targetVolume();
  }
  function armUnlock() {
    if (unlockArmed) return;
    unlockArmed = true;
    var unlock = function unlock() {
      var promise = play();
      promise.then(removeUnlock);
    };
    var removeUnlock = function removeUnlock() {
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
    audio.volume = 0;
    audio.hidden = true;
    audio.setAttribute("aria-hidden", "true");
    audio.addEventListener("loadedmetadata", restoreTime, {
      once: true
    });
    audio.addEventListener("timeupdate", function () {
      return persist();
    });
    document.body.append(audio);
    play();
    window.addEventListener("pagehide", function () {
      if (audio) audio.pause();
      persist(true);
    });
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") persist(true);else play();
    });
  }
  window.__TRAIN_GAME_BGM__ = {
    resume: play,
    restart: restart,
    pause: pauseSmooth,
    save: function save() {
      return persist(true);
    },
    getAudio: function getAudio() {
      return audio;
    },
    getVolume: targetVolume,
    setVolume: setVolume
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
