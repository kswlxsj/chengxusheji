(function (Game) {
  "use strict";

  Game.Auth.requireAuth();
  window.addEventListener("pageshow", () => Game.Auth.requireAuth());
})(window.TrainGame);
