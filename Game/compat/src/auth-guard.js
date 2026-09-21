(function (Game) {
  "use strict";

  Game.Auth.requireAuth();
  window.addEventListener("pageshow", function () {
    return Game.Auth.requireAuth();
  });
})(window.TrainGame);
