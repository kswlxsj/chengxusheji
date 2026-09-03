(function (data) {
  "use strict";

  if (!data) return;
  document.title = data.meta.title;
  document.querySelector("#game-title").textContent = data.meta.title;
  const cover = document.querySelector("#home-cover");
  cover.src = data.meta.coverImage;
  cover.alt = `${data.meta.title}封面`;
})(window.GAME_DATA);
