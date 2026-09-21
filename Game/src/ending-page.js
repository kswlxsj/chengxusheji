(function () {
  "use strict";

  const video = document.querySelector("#ending-video");
  const stage = document.querySelector("#ending-video-stage");
  const syncVideoStage = () => {
    if (!video?.videoWidth || !video?.videoHeight) return;
    stage.style.setProperty("--ending-video-ratio", video.videoWidth / video.videoHeight);
  };
  video?.addEventListener("loadedmetadata", syncVideoStage, { once: true });
  syncVideoStage();
  video?.play().catch(() => {});
  document.querySelector("#ending-home")?.addEventListener("click", (event) => {
    event.preventDefault();
    TrainGame.PageFlow.markHomeOpIntent("ending");
    TrainGame.PageFlow.navigate("home", {}, true);
  });
})();
