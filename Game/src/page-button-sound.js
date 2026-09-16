(function () {
  "use strict";

  const SOURCE = "assets/Audio/SoundEffect/button04b.mp3";
  const PENDING_SOUND_KEY = "train-game-pending-page-button-sound-v1";
  let activeAudio = null;

  function playButtonSound() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }

    const audio = new Audio(SOURCE);
    audio.volume = 0.85;
    activeAudio = audio;
    const promise = audio.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {});
    }
    return audio;
  }

  function rememberSoundForNextPage() {
    try {
      window.sessionStorage.setItem(PENDING_SOUND_KEY, "1");
    } catch (_error) {
      // 存储不可用时仍播放当前页面的点击音效。
    }
  }

  function playPendingSound() {
    try {
      if (window.sessionStorage.getItem(PENDING_SOUND_KEY) !== "1") return;
      window.sessionStorage.removeItem(PENDING_SOUND_KEY);
    } catch (_error) {
      return;
    }
    window.setTimeout(playButtonSound, 0);
  }

  playPendingSound();

  document.addEventListener("click", (event) => {
    const control = event.target?.closest?.("button, a");
    if (!control || control.disabled || control.getAttribute("aria-disabled") === "true") return;

    playButtonSound();

    if (control.tagName !== "A" || !control.href || control.target === "_blank") return;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    rememberSoundForNextPage();
  }, true);
})();
