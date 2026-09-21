(function () {
  "use strict";

  const reason = new URLSearchParams(window.location.search).get("reason") || "san";
  const ending = TrainGame.ENDING_CATALOG.find((entry) => entry.id === reason)
    || TrainGame.ENDING_CATALOG.find((entry) => entry.id === "san");
  const reveal = document.querySelector(".ending-reveal");
  document.querySelector("#ending-title").textContent = ending.title;
  document.querySelector("#ending-description").textContent = ending.description;
  const image = typeof TrainGameCompatAssetUrl === "function"
    ? TrainGameCompatAssetUrl(ending.image)
    : ending.image;
  reveal.style.setProperty(
    "--ending-background-image",
    `url("${new URL(image, window.location.href).href}")`
  );
  if (document.documentMode) {
    reveal.querySelector(".ending-reveal-backdrop").style.backgroundImage =
      `url("${new URL(image, window.location.href).href}")`;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => reveal.classList.add("is-visible"));
  });
  window.setTimeout(() => {
    reveal.classList.add("is-leaving");
    window.setTimeout(() => TrainGame.PageFlow.navigate("ending", { reason }, true), 600);
  }, 3400);
})();
