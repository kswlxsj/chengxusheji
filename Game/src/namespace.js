(function () {
  "use strict";

  window.TrainGame = {
    version: "0.1.0",
    deepClone(value) {
      return JSON.parse(JSON.stringify(value));
    },
    delay(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
  };
})();
