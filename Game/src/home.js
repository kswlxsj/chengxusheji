(function (Game, data) {
  "use strict";

  if (!data) return;
  document.title = data.meta.title;
  document.querySelector("#game-title").textContent = data.meta.title;
  const cover = document.querySelector("#home-cover");
  cover.src = data.meta.coverImage;
  cover.alt = `${data.meta.title}封面`;
  document.querySelector("#current-user").textContent = Game.Auth.currentUser() || "";
  document.querySelector("#logout-button").addEventListener("click", () => {
    Game.Auth.logout();
    window.location.replace(new URL("index.html", window.location.href));
  });
})(window.TrainGame, window.GAME_DATA);
