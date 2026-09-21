(function (Game, data) {
  "use strict";

  if (!data) return;
  document.title = data.meta.title;
  document.querySelector("#game-title").textContent = data.meta.title;
  var cover = document.querySelector("#home-cover");
  cover.src = data.meta.coverImage;
  cover.alt = "".concat(data.meta.title, "\u5C01\u9762");
  document.querySelector("#current-user").textContent = Game.Auth.currentUser() || "";
})(window.TrainGame, window.GAME_DATA);
