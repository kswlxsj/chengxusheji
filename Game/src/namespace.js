(function () {
  "use strict";

  window.TrainGame = {
    version: "0.2.0",
    deepClone(value) {
      return JSON.parse(JSON.stringify(value));
    },
    delay(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
  };
})();
