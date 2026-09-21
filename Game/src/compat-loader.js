(function () {
  "use strict";

  var loader = document.currentScript;
  if (!loader) return;

  var isIE = Boolean(document.documentMode);
  var source = loader.getAttribute("data-src");
  var root = loader.src.replace(/src\/compat-loader\.js(?:\?.*)?$/i, "");

  if (!isIE && loader.getAttribute("data-ie-only") === "true") return;

  function writeScript(url, defer) {
    document.write(
      '<script src="' + url.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"' +
      (defer ? " defer" : "") + "><\/script>"
    );
  }

  if (isIE && !window.__TRAIN_GAME_IE_BOOTSTRAPPED__) {
    window.__TRAIN_GAME_IE_BOOTSTRAPPED__ = true;
    document.documentElement.className += " ie11";
    writeScript(root + "compat/polyfills.js", false);
    writeScript(root + "compat/asset-map.js", false);
  }

  if (isIE) {
    var styles = loader.getAttribute("data-ie-css");
    if (styles) {
      var items = styles.split("|");
      for (var index = 0; index < items.length; index += 1) {
        document.write('<link rel="stylesheet" href="' + items[index] + '">');
      }
    }
  }

  if (!source) return;
  var queryIndex = source.indexOf("?");
  var path = queryIndex === -1 ? source : source.slice(0, queryIndex);
  var query = queryIndex === -1 ? "" : source.slice(queryIndex);
  var selected = isIE ? root + "compat/" + path + query : root + source;
  writeScript(selected, loader.getAttribute("data-defer") === "true");
})();
