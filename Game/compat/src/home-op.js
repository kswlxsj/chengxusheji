(function (_window$TrainGame$Pla, _window$TrainGame, _window$TrainGame$get, _window$TrainGame2, _window$TrainGame2$co, _window$__TRAIN_GAME_, _window$__TRAIN_GAME_2) {
  "use strict";

  var OP_AUDIO_SOURCE = "assets/Audio/Bgm/op-v2.mp3";
  var FRAME_SOURCES = ["assets/Image/Scene/Background/op-01.ie.jpg", "assets/Image/Scene/Background/op-02.ie.jpg", "assets/Image/Scene/Background/op-03.ie.jpg", "assets/Image/Scene/Background/op-04.ie.jpg", "assets/Image/Scene/Background/op-05.ie.jpg"];

  // 每一帧对应的底部文字（按 FRAME_SOURCES 下标）
  var FRAME_CAPTIONS = ["我已经受够了", "每天都是老样子：挤电车，上班，干活，被领导使唤，下班，再挤电车回家。", "明天也是、后天也是、大后天也是，每一天都如此反复。早上起床、去公司、回家、睡觉、起床、再去公司，生活还有期待的意义吗？", "枯燥，无聊，一成不变", "如果有什么，能改变现在的我就好了"];

  // 播放顺序：5 4 2 1 3
  // 对应 FRAME_SOURCES 下标：op-5=4, op-4=3, op-2=1, op-1=0, op-3=2
  var PLAY_ORDER = [4, 3, 1, 0, 2];

  // 每一张图打完字后停留的时间（按播放顺序）
  var AUTO_DELAYS = [1500, 4000, 4000, 1500, 2500];
  var TYPE_SPEED_MS = 180; // 每个字的间隔，越大越慢
  var BLACK_FADE_IN_MS = 1000; // 图片渐变为全黑
  var BLACK_HOLD_MS = 900; // 全黑停留时间
  var BLACK_FADE_OUT_MS = 2000; // 全黑渐隐并露出封面
  var AUDIO_FADE_OUT_MS = 3000; // OP 音乐淡出时长
  var AUDIO_SILENCE_MS = 250; // 两段音乐之间的纯静音间隔
  var AUDIO_FADE_IN_MS = 2000; // BGM 淡入时长
  var pageMusicVolume = Math.min(1, (_window$TrainGame$Pla = (_window$TrainGame = window.TrainGame) === null || _window$TrainGame === void 0 || (_window$TrainGame = _window$TrainGame.PlayerProfile) === null || _window$TrainGame === void 0 || (_window$TrainGame$get = _window$TrainGame.getAudioGain) === null || _window$TrainGame$get === void 0 ? void 0 : _window$TrainGame$get.call(_window$TrainGame, "pageMusic")) !== null && _window$TrainGame$Pla !== void 0 ? _window$TrainGame$Pla : 1);
  var overlay = document.querySelector("#home-op");
  if (!overlay) return;
  if (!((_window$TrainGame2 = window.TrainGame) !== null && _window$TrainGame2 !== void 0 && (_window$TrainGame2 = _window$TrainGame2.PageFlow) !== null && _window$TrainGame2 !== void 0 && (_window$TrainGame2$co = _window$TrainGame2.consumeHomeOpIntent) !== null && _window$TrainGame2$co !== void 0 && _window$TrainGame2$co.call(_window$TrainGame2))) {
    overlay.hidden = true;
    return;
  }
  overlay.hidden = false;
  window.__TRAIN_GAME_OP_ACTIVE__ = true;
  document.body.classList.add("home-op-active");
  var page = document.querySelector(".site-shell");
  var frames = Array.from(overlay.querySelectorAll(".home-op-frame"));
  var captionEl = document.querySelector("#home-op-caption");
  var skipButton = document.querySelector("#home-op-skip");
  var opAudio = new Audio(OP_AUDIO_SOURCE);
  opAudio.preload = "auto";
  opAudio.volume = pageMusicVolume;
  var activeFrameIndex = 0; // 当前播放到 PLAY_ORDER 的第几个
  var availableFrames = []; // 已成功加载的图片（按 FRAME_SOURCES 下标对应）
  var finished = false;
  var _opAudioUnlock = null;
  var audioFadeFrame = null;
  var audioGapTimer = null;
  var captionTimer = null;
  var autoTimer = null;
  var currentBgmAudio = (_window$__TRAIN_GAME_ = window.__TRAIN_GAME_BGM__) === null || _window$__TRAIN_GAME_ === void 0 || (_window$__TRAIN_GAME_2 = _window$__TRAIN_GAME_.getAudio) === null || _window$__TRAIN_GAME_2 === void 0 ? void 0 : _window$__TRAIN_GAME_2.call(_window$__TRAIN_GAME_);
  if (currentBgmAudio) currentBgmAudio.pause();
  page.inert = true;
  page.setAttribute("aria-hidden", "true");

  /* ==================== OP 音乐控制 ==================== */

  function armOpAudioUnlock() {
    if (finished || _opAudioUnlock) return;
    _opAudioUnlock = function opAudioUnlock() {
      document.removeEventListener("pointerdown", _opAudioUnlock, true);
      document.removeEventListener("keydown", _opAudioUnlock, true);
      _opAudioUnlock = null;
      playOpAudio();
    };
    document.addEventListener("pointerdown", _opAudioUnlock, true);
    document.addEventListener("keydown", _opAudioUnlock, true);
  }
  function playOpAudio() {
    var playPromise = opAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(armOpAudioUnlock);
    }
  }
  function clearOpAudioUnlock() {
    if (_opAudioUnlock) {
      document.removeEventListener("pointerdown", _opAudioUnlock, true);
      document.removeEventListener("keydown", _opAudioUnlock, true);
      _opAudioUnlock = null;
    }
  }
  function stopOpAudio() {
    clearOpAudioUnlock();
    opAudio.pause();
    try {
      opAudio.currentTime = 0;
    } catch (_error) {
      // 当前浏览器若尚未取得元数据，仍以暂停为准。
    }
    opAudio.volume = pageMusicVolume;
  }
  function animateVolume(duration, updateVolume, onComplete) {
    if (audioFadeFrame !== null) window.cancelAnimationFrame(audioFadeFrame);
    var startedAt = performance.now();
    function step(now) {
      var progress = Math.min((now - startedAt) / duration, 1);
      var eased = progress * progress * (3 - 2 * progress);
      updateVolume(eased);
      if (progress < 1) {
        audioFadeFrame = window.requestAnimationFrame(step);
        return;
      }
      audioFadeFrame = null;
      if (typeof onComplete === "function") onComplete();
    }
    audioFadeFrame = window.requestAnimationFrame(step);
  }
  function beginAudioTransition() {
    var _bgm$getAudio, _bgm$getVolume, _bgm$getVolume2;
    clearOpAudioUnlock();
    var bgm = window.__TRAIN_GAME_BGM__;
    var bgmAudio = bgm === null || bgm === void 0 || (_bgm$getAudio = bgm.getAudio) === null || _bgm$getAudio === void 0 ? void 0 : _bgm$getAudio.call(bgm);
    var bgmTargetVolume = (_bgm$getVolume = bgm === null || bgm === void 0 || (_bgm$getVolume2 = bgm.getVolume) === null || _bgm$getVolume2 === void 0 ? void 0 : _bgm$getVolume2.call(bgm)) !== null && _bgm$getVolume !== void 0 ? _bgm$getVolume : 0.55;
    var opStartVolume = opAudio.volume;
    if (bgmAudio) {
      bgmAudio.pause();
      bgmAudio.volume = 0;
    }

    // 第一段：OP 音乐渐弱到静音。
    animateVolume(AUDIO_FADE_OUT_MS, function (eased) {
      opAudio.volume = Math.max(0, opStartVolume * (1 - eased));
    }, function () {
      // 第二段：保持真正的无声间隔，不提前启动 BGM。
      stopOpAudio();
      audioGapTimer = window.setTimeout(function () {
        audioGapTimer = null;
        window.__TRAIN_GAME_OP_ACTIVE__ = false;
        if (bgm && typeof bgm.restart === "function") {
          bgm.restart(AUDIO_FADE_IN_MS);
          return;
        }
        if (!bgmAudio) {
          if (bgm && typeof bgm.resume === "function") bgm.resume();
          return;
        }
        bgmAudio.volume = 0;
        if (bgm && typeof bgm.resume === "function") bgm.resume();

        // 第三段：BGM 从静音渐强到原音量。
        animateVolume(AUDIO_FADE_IN_MS, function (fadeInProgress) {
          bgmAudio.volume = bgmTargetVolume * fadeInProgress;
        }, function () {
          bgmAudio.volume = bgmTargetVolume;
        });
      }, AUDIO_SILENCE_MS);
    });
  }

  /* ==================== 图片预加载 ==================== */

  function loadFrame(source) {
    return new Promise(function (resolve) {
      var image = new Image();
      image.onload = function () {
        return resolve(source);
      };
      image.onerror = function () {
        return resolve(null);
      };
      image.src = source;
    });
  }

  /* ==================== 打字机文字 ==================== */

  function updateCaption(index) {
    if (!captionEl) return;
    var text = FRAME_CAPTIONS[index] || "";
    if (captionTimer) {
      clearInterval(captionTimer);
      captionTimer = null;
    }
    captionEl.textContent = "";
    var i = 0;
    captionTimer = setInterval(function () {
      captionEl.textContent += text[i];
      i++;
      if (i >= text.length) {
        var _AUTO_DELAYS$activeFr;
        clearInterval(captionTimer);
        captionTimer = null;

        // 文字打完后，按当前播放顺序取停留时间
        var delay = (_AUTO_DELAYS$activeFr = AUTO_DELAYS[activeFrameIndex]) !== null && _AUTO_DELAYS$activeFr !== void 0 ? _AUTO_DELAYS$activeFr : 1500;
        if (autoTimer) clearTimeout(autoTimer);
        autoTimer = setTimeout(function () {
          goNext();
        }, delay);
      }
    }, TYPE_SPEED_MS);
  }

  /* ==================== 显示某一帧 ==================== */

  function showFrame(orderIndex) {
    if (finished) return;
    var sourceIndex = PLAY_ORDER[orderIndex];
    var nextFrame = frames[orderIndex % frames.length];
    var currentFrame = frames[(orderIndex - 1 + frames.length) % frames.length];
    nextFrame.src = availableFrames[sourceIndex];
    nextFrame.classList.add("is-active");
    if (currentFrame && currentFrame !== nextFrame) {
      currentFrame.classList.remove("is-active");
    }
    updateCaption(orderIndex); // 文字按播放顺序走
  }

  /* ==================== 下一张 ==================== */

  function goNext() {
    if (finished) return;
    var nextIndex = activeFrameIndex + 1;
    if (nextIndex >= PLAY_ORDER.length) {
      finish();
      return;
    }
    activeFrameIndex = nextIndex;
    showFrame(activeFrameIndex);
  }

  /* ==================== 结束 ==================== */

  function finish() {
    if (finished) return;
    finished = true;
    beginAudioTransition();
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
    if (captionTimer) {
      clearInterval(captionTimer);
      captionTimer = null;
    }
    overlay.classList.add("is-blackening");
    overlay.setAttribute("aria-hidden", "true");
    window.setTimeout(function () {
      overlay.classList.add("is-revealing");
      window.setTimeout(function () {
        overlay.hidden = true;
        document.body.classList.remove("home-op-active");
        page.inert = false;
        page.removeAttribute("aria-hidden");
      }, BLACK_FADE_OUT_MS);
    }, BLACK_FADE_IN_MS + BLACK_HOLD_MS);
  }

  /* ==================== 启动 ==================== */

  function start(loadedFrames) {
    if (finished) return;
    availableFrames = loadedFrames;
    if (!availableFrames.length) {
      finish();
      return;
    }
    playOpAudio();
    showFrame(0);
  }

  /* ==================== 事件绑定 ==================== */

  if (skipButton) skipButton.addEventListener("click", finish);
  document.addEventListener("keydown", function (event) {
    if (!event.repeat) finish();
  });

  /* ==================== 预加载并开始 ==================== */

  Promise.all(FRAME_SOURCES.map(loadFrame)).then(function (loadedFrames) {
    start(loadedFrames.filter(Boolean));
  });
})();
