(function () {
  "use strict";

  const OP_AUDIO_SOURCE = "assets/audio/op.mp3";
  const FRAME_SOURCES = [
    "assets/op/op-1.png",
    "assets/op/op-2.png",
    "assets/op/op-3.png",
    "assets/op/op-4.png",
    "assets/op/op-5.png"
  ];

  // 每一帧对应的底部文字（按 FRAME_SOURCES 下标）
  const FRAME_CAPTIONS = [
    "我已经受够了",
    "每天都是老样子：挤电车，上班，干活，被领导使唤，下班，再挤电车回家。",
    "明天也是、后天也是、大后天也是，每一天都如此反复。早上起床、去公司、回家、睡觉、起床、再去公司，生活还有期待的意义吗？",
    "枯燥，无聊，一成不变",
    "如果有什么，能改变现在的我就好了"
  ];

  // 播放顺序：5 4 2 1 3
  // 对应 FRAME_SOURCES 下标：op-5=4, op-4=3, op-2=1, op-1=0, op-3=2
  const PLAY_ORDER = [4, 3, 1, 0, 2];

  // 每一张图打完字后停留的时间（按播放顺序）
  const AUTO_DELAYS = [1500, 4000, 4000, 1500, 2500];

  const TYPE_SPEED_MS = 180;          // 每个字的间隔，越大越慢
  const BLACK_FADE_IN_MS = 1000;      // 图片渐变为全黑
  const BLACK_HOLD_MS = 900;          // 全黑停留时间
  const BLACK_FADE_OUT_MS = 2000;     // 全黑渐隐并露出封面
  const AUDIO_FADE_OUT_MS = 3000;     // OP 音乐淡出时长
  const AUDIO_SILENCE_MS = 600;       // 两段音乐之间的纯静音间隔
  const AUDIO_FADE_IN_MS = 3000;      // BGM 淡入时长

  const overlay = document.querySelector("#home-op");
  if (!overlay) return;

  window.__TRAIN_GAME_OP_ACTIVE__ = true;
  document.body.classList.add("home-op-active");

  const page = document.querySelector(".site-shell");
  const frames = Array.from(overlay.querySelectorAll(".home-op-frame"));
  const captionEl = document.querySelector("#home-op-caption");
  const skipButton = document.querySelector("#home-op-skip");
  const opAudio = new Audio(OP_AUDIO_SOURCE);
  opAudio.preload = "auto";

  let activeFrameIndex = 0;   // 当前播放到 PLAY_ORDER 的第几个
  let availableFrames = [];   // 已成功加载的图片（按 FRAME_SOURCES 下标对应）
  let finished = false;
  let opAudioUnlock = null;
  let audioFadeFrame = null;
  let audioGapTimer = null;

  let captionTimer = null;
  let autoTimer = null;

  const currentBgmAudio = window.__TRAIN_GAME_BGM__?.getAudio?.();
  if (currentBgmAudio) currentBgmAudio.pause();

  page.inert = true;
  page.setAttribute("aria-hidden", "true");

  /* ==================== OP 音乐控制 ==================== */

  function armOpAudioUnlock() {
    if (finished || opAudioUnlock) return;
    opAudioUnlock = () => {
      document.removeEventListener("pointerdown", opAudioUnlock, true);
      document.removeEventListener("keydown", opAudioUnlock, true);
      opAudioUnlock = null;
      playOpAudio();
    };
    document.addEventListener("pointerdown", opAudioUnlock, true);
    document.addEventListener("keydown", opAudioUnlock, true);
  }

  function playOpAudio() {
    const playPromise = opAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(armOpAudioUnlock);
    }
  }

  function clearOpAudioUnlock() {
    if (opAudioUnlock) {
      document.removeEventListener("pointerdown", opAudioUnlock, true);
      document.removeEventListener("keydown", opAudioUnlock, true);
      opAudioUnlock = null;
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
    opAudio.volume = 1;
  }

  function animateVolume(duration, updateVolume, onComplete) {
    if (audioFadeFrame !== null) window.cancelAnimationFrame(audioFadeFrame);
    const startedAt = performance.now();

    function step(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress * progress * (3 - 2 * progress);
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
    clearOpAudioUnlock();
    const bgm = window.__TRAIN_GAME_BGM__;
    const bgmAudio = bgm?.getAudio?.();
    const bgmTargetVolume = bgm?.getVolume?.() ?? 0.55;
    const opStartVolume = opAudio.volume;

    if (bgmAudio) {
      bgmAudio.pause();
      bgmAudio.volume = 0;
    }

    // 第一段：OP 音乐渐弱到静音。
    animateVolume(
      AUDIO_FADE_OUT_MS,
      (eased) => {
        opAudio.volume = Math.max(0, opStartVolume * (1 - eased));
      },
      () => {
        // 第二段：保持真正的无声间隔，不提前启动 BGM。
        stopOpAudio();
        audioGapTimer = window.setTimeout(() => {
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
          animateVolume(AUDIO_FADE_IN_MS, (fadeInProgress) => {
            bgmAudio.volume = bgmTargetVolume * fadeInProgress;
          }, () => {
            bgmAudio.volume = bgmTargetVolume;
          });
        }, AUDIO_SILENCE_MS);
      }
    );
  }

  /* ==================== 图片预加载 ==================== */

  function loadFrame(source) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(source);
      image.onerror = () => resolve(null);
      image.src = source;
    });
  }

  /* ==================== 打字机文字 ==================== */

  function updateCaption(index) {
    if (!captionEl) return;

    const text = FRAME_CAPTIONS[index] || "";

    if (captionTimer) {
      clearInterval(captionTimer);
      captionTimer = null;
    }

    captionEl.textContent = "";

    let i = 0;
    captionTimer = setInterval(() => {
      captionEl.textContent += text[i];
      i++;

      if (i >= text.length) {
        clearInterval(captionTimer);
        captionTimer = null;

        // 文字打完后，按当前播放顺序取停留时间
        const delay = AUTO_DELAYS[activeFrameIndex] ?? 1500;
        if (autoTimer) clearTimeout(autoTimer);
        autoTimer = setTimeout(() => {
          goNext();
        }, delay);
      }
    }, TYPE_SPEED_MS);
  }

  /* ==================== 显示某一帧 ==================== */

  function showFrame(orderIndex) {
    if (finished) return;

    const sourceIndex = PLAY_ORDER[orderIndex];
    const nextFrame = frames[orderIndex % frames.length];
    const currentFrame = frames[(orderIndex - 1 + frames.length) % frames.length];

    nextFrame.src = availableFrames[sourceIndex];
    nextFrame.classList.add("is-active");
    if (currentFrame && currentFrame !== nextFrame) {
      currentFrame.classList.remove("is-active");
    }

    updateCaption(orderIndex);   // 文字按播放顺序走
  }

  /* ==================== 下一张 ==================== */

  function goNext() {
    if (finished) return;

    const nextIndex = activeFrameIndex + 1;
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

    window.setTimeout(() => {
      overlay.classList.add("is-revealing");

      window.setTimeout(() => {
        overlay.hidden = true;
        document.body.classList.remove("home-op-active");
        page.inert = false;
        page.removeAttribute("aria-hidden");
        const firstAction = document.querySelector(".home-action");
        if (firstAction instanceof HTMLElement) firstAction.focus();
      }, BLACK_FADE_OUT_MS);
    }, BLACK_FADE_IN_MS + BLACK_HOLD_MS);
  }

  /* ==================== 启动 ==================== */

  function start(loadedFrames) {
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !event.repeat) finish();
  });

  /* ==================== 预加载并开始 ==================== */

  Promise.all(FRAME_SOURCES.map(loadFrame)).then((loadedFrames) => {
    start(loadedFrames.filter(Boolean));
  });
})();
