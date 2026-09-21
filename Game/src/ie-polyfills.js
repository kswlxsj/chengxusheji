(function () {
  "use strict";

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      return window.setTimeout(function () { callback(Date.now()); }, 16);
    };
    window.cancelAnimationFrame = window.clearTimeout;
  }

  if (window.Element && !Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
      var node = this;
      while (node && node.nodeType === 1) {
        if (node.matches(selector)) return node;
        node = node.parentElement;
      }
      return null;
    };
  }
  if (window.Element && !Element.prototype.remove) {
    Element.prototype.remove = function () {
      if (this.parentNode) this.parentNode.removeChild(this);
    };
  }

  function appendNodes() {
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < arguments.length; index += 1) {
      var item = arguments[index];
      fragment.appendChild(item instanceof Node ? item : document.createTextNode(String(item)));
    }
    this.appendChild(fragment);
  }
  if (window.Element && !Element.prototype.append) Element.prototype.append = appendNodes;
  if (window.Document && !Document.prototype.append) Document.prototype.append = appendNodes;
  if (window.DocumentFragment && !DocumentFragment.prototype.append) DocumentFragment.prototype.append = appendNodes;
  if (window.Element && !Element.prototype.replaceChildren) {
    Element.prototype.replaceChildren = function () {
      while (this.firstChild) this.removeChild(this.firstChild);
      appendNodes.apply(this, arguments);
    };
  }
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if (window.Node && !("isConnected" in Node.prototype)) {
    Object.defineProperty(Node.prototype, "isConnected", {
      configurable: true,
      get: function () { return document.documentElement.contains(this); }
    });
  }

  if (window.DOMTokenList) {
    var nativeAddToken = DOMTokenList.prototype.add;
    var nativeRemoveToken = DOMTokenList.prototype.remove;
    var nativeToggleToken = DOMTokenList.prototype.toggle;
    DOMTokenList.prototype.add = function () {
      for (var index = 0; index < arguments.length; index += 1) nativeAddToken.call(this, arguments[index]);
    };
    DOMTokenList.prototype.remove = function () {
      for (var index = 0; index < arguments.length; index += 1) nativeRemoveToken.call(this, arguments[index]);
    };
    DOMTokenList.prototype.toggle = function (token, force) {
      if (arguments.length < 2) return nativeToggleToken.call(this, token);
      if (force) {
        this.add(token);
        return true;
      }
      this.remove(token);
      return false;
    };
  }

  if (window.EventTarget && EventTarget.prototype.addEventListener) {
    var nativeAddEventListener = EventTarget.prototype.addEventListener;
    var nativeRemoveEventListener = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (!options || typeof options !== "object") {
        nativeAddEventListener.call(this, type, listener, options);
        return;
      }
      var target = this;
      var capture = Boolean(options.capture);
      var actual = listener;
      if (options.once) {
        actual = function (event) {
          nativeRemoveEventListener.call(target, type, actual, capture);
          return listener.call(target, event);
        };
      }
      if (!this.__trainGameListenerMap) this.__trainGameListenerMap = [];
      this.__trainGameListenerMap.push({ type: type, listener: listener, actual: actual, capture: capture });
      nativeAddEventListener.call(this, type, actual, capture);
    };
    EventTarget.prototype.removeEventListener = function (type, listener, options) {
      var capture = typeof options === "object" ? Boolean(options.capture) : Boolean(options);
      var entries = this.__trainGameListenerMap || [];
      for (var index = entries.length - 1; index >= 0; index -= 1) {
        var entry = entries[index];
        if (entry.type === type && entry.listener === listener && entry.capture === capture) {
          nativeRemoveEventListener.call(this, type, entry.actual, capture);
          entries.splice(index, 1);
          return;
        }
      }
      nativeRemoveEventListener.call(this, type, listener, capture);
    };
  }

  if (window.HTMLImageElement && !HTMLImageElement.prototype.decode) {
    HTMLImageElement.prototype.decode = function () {
      var image = this;
      return new Promise(function (resolve, reject) {
        if (image.complete) {
          if (image.naturalWidth > 0) resolve();
          else reject(new Error("图片解码失败"));
          return;
        }
        function cleanup() {
          image.removeEventListener("load", loaded);
          image.removeEventListener("error", failed);
        }
        function loaded() { cleanup(); resolve(); }
        function failed() { cleanup(); reject(new Error("图片解码失败")); }
        image.addEventListener("load", loaded);
        image.addEventListener("error", failed);
      });
    };
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = function (callback) {
      this.callback = callback;
      this.items = [];
    };
    window.IntersectionObserver.prototype.observe = function (element) {
      this.items.push(element);
      this.callback([{ target: element, isIntersecting: true, intersectionRatio: 1 }], this);
    };
    window.IntersectionObserver.prototype.unobserve = function (element) {
      var index = this.items.indexOf(element);
      if (index !== -1) this.items.splice(index, 1);
    };
    window.IntersectionObserver.prototype.disconnect = function () { this.items = []; };
  }

  function mapAssetUrl(value) {
    if (!value || !window.TRAIN_GAME_IE_ASSET_MAP) return value;
    var absolute = document.createElement("a");
    absolute.href = value;
    var root = window.TRAIN_GAME_ROOT_URL || "";
    var relative = absolute.href.indexOf(root) === 0
      ? decodeURIComponent(absolute.href.slice(root.length)).replace(/\\/g, "/")
      : "";
    var mapped = window.TRAIN_GAME_IE_ASSET_MAP[relative];
    return mapped ? root + mapped : value;
  }

  window.TrainGameCompatAssetUrl = mapAssetUrl;
  function replaceStaticImages() {
    var images = document.getElementsByTagName("img");
    for (var index = 0; index < images.length; index += 1) {
      var mapped = mapAssetUrl(images[index].src);
      if (mapped !== images[index].src) images[index].src = mapped;
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", replaceStaticImages);
  else replaceStaticImages();
})();
