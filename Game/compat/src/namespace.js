(function () {
  "use strict";

  window.TrainGame = {
    version: "0.5.0",
    deepClone: function deepClone(value) {
      return JSON.parse(JSON.stringify(value));
    },
    delay: function delay(milliseconds) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, milliseconds);
      });
    },
    assetUrl: function assetUrl(path) {
      return typeof window.TrainGameCompatAssetUrl === "function" ? window.TrainGameCompatAssetUrl(path) : path;
    }
  };
})();
