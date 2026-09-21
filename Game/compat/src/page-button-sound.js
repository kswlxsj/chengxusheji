(function () {
  "use strict";

  var SOURCE = "assets/Audio/SoundEffect/button04b.mp3";
  var PENDING_SOUND_KEY = "train-game-pending-page-button-sound-v1";
  var BASE_VOLUME = 0.85;
  var activeAudio = null;
  function getButtonVolume() {
    var _window$TrainGame$Pla, _window$TrainGame, _window$TrainGame$get;
    var gain = (_window$TrainGame$Pla = (_window$TrainGame = window.TrainGame) === null || _window$TrainGame === void 0 || (_window$TrainGame = _window$TrainGame.PlayerProfile) === null || _window$TrainGame === void 0 || (_window$TrainGame$get = _window$TrainGame.getAudioGain) === null || _window$TrainGame$get === void 0 ? void 0 : _window$TrainGame$get.call(_window$TrainGame, "buttonSfx")) !== null && _window$TrainGame$Pla !== void 0 ? _window$TrainGame$Pla : 1;
    return Math.min(1, Math.max(0, BASE_VOLUME * gain));
  }
  function playButtonSound() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
    var audio = new Audio(SOURCE);
    audio.volume = getButtonVolume();
    activeAudio = audio;
    var promise = audio.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(function () {});
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
  document.addEventListener("click", function (event) {
    var _event$target, _event$target$closest;
    var control = (_event$target = event.target) === null || _event$target === void 0 || (_event$target$closest = _event$target.closest) === null || _event$target$closest === void 0 ? void 0 : _event$target$closest.call(_event$target, "button, a");
    if (!control || control.disabled || control.getAttribute("aria-disabled") === "true") return;
    playButtonSound();
    if (control.tagName !== "A" || !control.href || control.target === "_blank") return;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    rememberSoundForNextPage();
  }, true);
})();
