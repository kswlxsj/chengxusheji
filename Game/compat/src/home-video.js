(function () {
  "use strict";

  var video = document.getElementById("start-video");
  if (!video) return;
  function tryPlay() {
    video.muted = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }
  }
  function reveal() {
    document.body.classList.add("codex-start-video-ready");
    tryPlay();
  }
  if (video.readyState >= 2) reveal();else {
    video.addEventListener("canplay", reveal, {
      once: true
    });
    video.addEventListener("loadeddata", reveal, {
      once: true
    });
  }
  video.addEventListener("ended", function () {
    video.currentTime = 0;
    tryPlay();
  });
  document.addEventListener("pointerdown", reveal, {
    once: true
  });
  document.addEventListener("keydown", reveal, {
    once: true
  });
})();
