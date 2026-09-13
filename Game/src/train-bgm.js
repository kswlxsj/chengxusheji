(function (Game) {
  "use strict";

  const SOURCE_ID = "train_ambient";
  const DEFAULT_VOLUME = 0.45;
  const entry = (window.GAME_DATA?.audio || []).find((item) => item.id === SOURCE_ID);
  if (!entry) return;

  let audio = null;
  let unlockArmed = false;
  let enabled = true;

  function armUnlock() {
    if (unlockArmed) return;
    unlockArmed = true;
    const unlock = () => {
      const promise = play();
      if (promise?.finally) promise.finally(removeUnlock);
      else removeUnlock();
    };
    const removeUnlock = () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      unlockArmed = false;
    };
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
  }

  function play() {
    if (!audio || !enabled || document.visibilityState === "hidden") return Promise.resolve();
    const promise = audio.play();
    if (promise && typeof promise.catch === "function") {
      return promise.catch(armUnlock);
    }
    return Promise.resolve();
  }

  function pause() {
    if (audio) audio.pause();
  }

  function setEnabled(value) {
    enabled = value === true;
    if (enabled) return play();
    pause();
    return Promise.resolve();
  }

  function initialize() {
    if (audio) return;
    audio = document.createElement("audio");
    audio.src = entry.file;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = entry.volume ?? DEFAULT_VOLUME;
    audio.hidden = true;
    audio.setAttribute("aria-hidden", "true");
    document.body.append(audio);
    if (enabled) play();

    window.addEventListener("pagehide", pause);
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") pause();
      else play();
    });
  }

  window.__TRAIN_GAME_TRAIN_AUDIO__ = {
    play,
    pause,
    setEnabled,
    getAudio: () => audio
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})(window.TrainGame);
