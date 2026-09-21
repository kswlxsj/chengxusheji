(function () {
  "use strict";

  var reason = new URLSearchParams(window.location.search).get("reason") || "san";
  var ending = TrainGame.ENDING_CATALOG.find(function (entry) {
    return entry.id === reason;
  }) || TrainGame.ENDING_CATALOG.find(function (entry) {
    return entry.id === "san";
  });
  var reveal = document.querySelector(".ending-reveal");
  document.querySelector("#ending-title").textContent = ending.title;
  document.querySelector("#ending-description").textContent = ending.description;
  var image = typeof TrainGameCompatAssetUrl === "function" ? TrainGameCompatAssetUrl(ending.image) : ending.image;
  reveal.style.setProperty("--ending-background-image", "url(\"".concat(new URL(image, window.location.href).href, "\")"));
  if (document.documentMode) {
    reveal.querySelector(".ending-reveal-backdrop").style.backgroundImage = "url(\"".concat(new URL(image, window.location.href).href, "\")");
  }
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      return reveal.classList.add("is-visible");
    });
  });
  window.setTimeout(function () {
    reveal.classList.add("is-leaving");
    window.setTimeout(function () {
      return TrainGame.PageFlow.navigate("ending", {
        reason: reason
      }, true);
    }, 600);
  }, 3400);
})();
