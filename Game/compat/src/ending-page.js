(function (_document$querySelect) {
  "use strict";

  var video = document.querySelector("#ending-video");
  var stage = document.querySelector("#ending-video-stage");
  var syncVideoStage = function syncVideoStage() {
    if (!(video !== null && video !== void 0 && video.videoWidth) || !(video !== null && video !== void 0 && video.videoHeight)) return;
    stage.style.setProperty("--ending-video-ratio", video.videoWidth / video.videoHeight);
  };
  video === null || video === void 0 || video.addEventListener("loadedmetadata", syncVideoStage, {
    once: true
  });
  syncVideoStage();
  video === null || video === void 0 || video.play().catch(function () {});
  (_document$querySelect = document.querySelector("#ending-home")) === null || _document$querySelect === void 0 || _document$querySelect.addEventListener("click", function (event) {
    event.preventDefault();
    TrainGame.PageFlow.markHomeOpIntent("ending");
    TrainGame.PageFlow.navigate("home", {}, true);
  });
})();
