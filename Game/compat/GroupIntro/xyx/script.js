function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  "use strict";

  var root = document.documentElement;
  var cloudLayer = document.querySelector(".clouds");
  function buildPixelCloudSVG() {
    var key = function key(x, y) {
      return "".concat(x, ",").concat(y);
    };
    var cells = new Set();
    var blobs = [[16, 8, 7], [6, 9, 6], [26, 9, 6], [10, 5, 5], [21, 5, 4]];
    blobs.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
        centerX = _ref2[0],
        centerY = _ref2[1],
        radius = _ref2[2];
      for (var y = centerY - radius; y <= centerY + radius; y += 1) {
        for (var x = centerX - radius; x <= centerX + radius; x += 1) {
          var dx = x - centerX;
          var dy = y - centerY;
          if (dx * dx + dy * dy <= radius * radius) cells.add(key(x, y));
        }
      }
    });
    var columns = new Map();
    cells.forEach(function (entry) {
      var _entry$split$map = entry.split(",").map(Number),
        _entry$split$map2 = _slicedToArray(_entry$split$map, 2),
        x = _entry$split$map2[0],
        y = _entry$split$map2[1];
      if (!columns.has(x)) columns.set(x, []);
      columns.get(x).push(y);
    });
    var flat = new Set();
    columns.forEach(function (values, x) {
      var minimum = Math.min.apply(Math, _toConsumableArray(values));
      var maximum = Math.max.apply(Math, _toConsumableArray(values));
      for (var y = minimum; y <= maximum; y += 1) flat.add(key(x, y));
    });
    var rows = new Map();
    flat.forEach(function (entry) {
      var _entry$split$map3 = entry.split(",").map(Number),
        _entry$split$map4 = _slicedToArray(_entry$split$map3, 2),
        x = _entry$split$map4[0],
        y = _entry$split$map4[1];
      if (!rows.has(y)) rows.set(y, []);
      rows.get(y).push(x);
    });
    var rectangles = "";
    rows.forEach(function (values, y) {
      values.sort(function (left, right) {
        return left - right;
      });
      var start = values[0];
      var previous = values[0];
      for (var index = 1; index <= values.length; index += 1) {
        var x = values[index];
        if (index === values.length || x !== previous + 1) {
          rectangles += "<rect class=\"pcell\" x=\"".concat(start, "\" y=\"").concat(y, "\" width=\"").concat(previous - start + 1, "\" height=\"1\"/>");
          start = x;
        }
        previous = x;
      }
    });
    return "<svg class=\"pixel-cloud\" viewBox=\"-2 -2 36 20\" xmlns=\"http://www.w3.org/2000/svg\">".concat(rectangles, "</svg>");
  }
  for (var index = 0; index < 7; index += 1) {
    var cloud = document.createElement("span");
    var duration = 38 + Math.random() * 30;
    cloud.className = "cloud";
    cloud.style.setProperty("--dur", "".concat(duration, "s"));
    cloud.style.setProperty("--delay", "".concat(-Math.random() * duration, "s"));
    cloud.style.animationDuration = "".concat(duration, "s");
    cloud.style.animationDelay = "".concat(-Math.random() * duration, "s");
    cloud.style.top = "".concat(3 + Math.random() * 46, "%");
    var shape = document.createElement("span");
    shape.className = "shape";
    shape.style.transform = "scale(".concat(0.9 + Math.random() * 1.1, ")");
    shape.innerHTML = buildPixelCloudSVG();
    cloud.appendChild(shape);
    cloudLayer.appendChild(cloud);
  }
  var rainCanvas = document.getElementById("rainCanvas");
  var rainContext = rainCanvas.getContext("2d");
  var rainDrops = [];
  var rainFrame = null;
  function resizeRain() {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
  }
  function startRain() {
    resizeRain();
    rainDrops.length = 0;
    var count = Math.min(240, Math.round(window.innerWidth / 6));
    for (var _index = 0; _index < count; _index += 1) {
      rainDrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * -rainCanvas.height,
        len: 12 + Math.random() * 12,
        speed: 9 + Math.random() * 8
      });
    }
    cancelAnimationFrame(rainFrame);
    function frame() {
      rainContext.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      rainContext.strokeStyle = "rgba(205, 228, 255, .5)";
      rainContext.lineWidth = 1.3;
      rainContext.beginPath();
      var _iterator = _createForOfIteratorHelper(rainDrops),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var drop = _step.value;
          drop.y += drop.speed;
          drop.x -= drop.speed * 0.35;
          if (drop.y > rainCanvas.height + 20) {
            drop.y = -20;
            drop.x = Math.random() * rainCanvas.width;
          }
          if (drop.x < -20) drop.x = rainCanvas.width + 20;
          rainContext.moveTo(drop.x, drop.y);
          rainContext.lineTo(drop.x + 2, drop.y - drop.len);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      rainContext.stroke();
      rainFrame = requestAnimationFrame(frame);
    }
    frame();
  }
  function stopRain() {
    cancelAnimationFrame(rainFrame);
    rainContext.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  }
  var weatherButtons = document.querySelectorAll(".weather-switch button");
  function setWeather(rain) {
    root.classList.toggle("rain", rain);
    root.classList.toggle("dark", rain);
    weatherButtons.forEach(function (button) {
      button.classList.toggle("active", button.dataset.weather === "rain" === rain);
    });
    if (rain) startRain();else stopRain();
    try {
      localStorage.setItem("weather", rain ? "rain" : "clear");
    } catch (_error) {/* 无痕模式允许失败 */}
  }
  weatherButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      return setWeather(button.dataset.weather === "rain");
    });
  });
  try {
    var mode = localStorage.getItem("weather");
    var queryWeather = new URLSearchParams(location.search).get("weather");
    if (queryWeather === "rain" || queryWeather === "clear") mode = queryWeather;
    setWeather(mode === "rain");
  } catch (_error) {
    setWeather(false);
  }
  window.addEventListener("resize", function () {
    if (root.classList.contains("rain")) startRain();
  });
  var avatarImage = document.getElementById("avatarImg");
  avatarImage.addEventListener("load", function () {
    return avatarImage.classList.add("ready");
  });
  if (avatarImage.complete && avatarImage.naturalWidth > 0) avatarImage.classList.add("ready");
  var avatarBox = document.getElementById("avatarBox");
  avatarBox.addEventListener("click", function () {
    avatarBox.classList.remove("pop");
    void avatarBox.offsetWidth;
    avatarBox.classList.add("pop");
  });
  avatarBox.addEventListener("animationend", function () {
    return avatarBox.classList.remove("pop");
  });
  var roles = ["计算机科学与技术 · 25级", "喜欢 阴天 / 雨天 / 晴天 ", "Nice to meet you !"];
  var roleElement = document.getElementById("role");
  var roleIndex = 0;
  var characterIndex = 0;
  var deleting = false;
  function tick() {
    var current = roles[roleIndex];
    roleElement.textContent = current.slice(0, characterIndex);
    if (!deleting) {
      characterIndex += 1;
      if (characterIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
      setTimeout(tick, 120);
    } else {
      characterIndex -= 1;
      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(tick, 50);
    }
  }
  tick();
  var sections = document.querySelectorAll("section[id]");
  var navigationLinks = document.querySelectorAll(".nav-links a");
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#".concat(entry.target.id));
      });
    });
  }, {
    rootMargin: "-40% 0px -55% 0px"
  });
  sections.forEach(function (section) {
    return sectionObserver.observe(section);
  });
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12
  });
  document.querySelectorAll(".reveal").forEach(function (element) {
    return revealObserver.observe(element);
  });
  var toTop = document.getElementById("toTop");
  window.addEventListener("scroll", function () {
    return toTop.classList.toggle("show", window.pageYOffset > 420);
  });
  toTop.addEventListener("click", function () {
    if (document.documentMode) window.scrollTo(0, 0);else window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
