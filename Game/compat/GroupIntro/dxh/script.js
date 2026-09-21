var _window$marked;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// 噪点色阶层级数：离散色阶，派生 thresholds
var PALETTE_LEVELS = 15;
var NOISE_CONFIG = Object.freeze({
  targetPixelSize: 6,
  minWidth: 96,
  maxWidth: 280,
  maxHeight: 220,
  // 噪点帧间隔 ms（33≈30FPS）
  frameInterval: 33,
  paletteTransitionDurationMs: 300,
  paletteTransitionEpsilon: 0.0005,
  baseFrequency: 4.1,
  secondOctaveWeight: 0.46,
  secondOctaveTemporalMultiplier: 2.65,
  speed: 0.000026,
  temporalSpeed: 0.00002,
  amplitude: 1.28,
  seed: 41,
  directionChangeMinMs: 1400,
  directionChangeMaxMs: 3200,
  directionResponseMs: 450,
  primaryPaletteVariables: ["--ink", "--wine", "--ochre", "--peach", "--ice"],
  secondaryPaletteVariables: ["--noise-secondary-deep", "--noise-secondary-slate", "--noise-secondary-periwinkle", "--noise-secondary-coral", "--noise-secondary-frost"],
  paletteLevels: PALETTE_LEVELS,
  thresholds: Array.from({
    length: PALETTE_LEVELS - 1
  }, function (_, index) {
    return (index + 1) / PALETTE_LEVELS;
  }),
  paletteTransitionStartRatio: 0.5,
  maxScrollSpeedMultiplier: 24,
  scrollVelocityForMaxSpeed: 2,
  scrollSpeedRiseMs: 90,
  scrollSpeedDecayMs: 500,
  // “滚动中”判定窗口 ms：停止则平滑回落
  scrollBoostRecentMs: 250,
  maxAnimationStepMs: 250
});

// 内容滚轮灵敏度：小=短距
var CONTENT_SCROLL_SENSITIVITY = 0.5;

// 平滑滚动时长 ms
var SMOOTH_SCROLL_DURATION_MS = 180;
function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}
function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

// 平滑滚轮滚动：累积目标位 + rAF 缓动，防 scrollTop 跳变
// trapAlways=true（弹窗）恒吞滚轮防透传；false（简介）仅溢出时接管
function createSmoothWheelScroller(element, trapAlways) {
  var target = element.scrollTop;
  var rafId = null;
  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  function step(start, startTime) {
    var progress = Math.min((performance.now() - startTime) / SMOOTH_SCROLL_DURATION_MS, 1);
    element.scrollTop = start + (target - start) * easeOutCubic(progress);
    if (progress < 1) {
      rafId = requestAnimationFrame(function () {
        return step(start, startTime);
      });
    } else {
      element.scrollTop = target;
      rafId = null;
    }
  }
  function handleWheel(event) {
    if (event.deltaY === 0 && event.deltaX === 0) return;
    var canScroll = element.scrollHeight > element.clientHeight;
    if (!trapAlways && !canScroll) return;
    var lineHeight = Number.parseFloat(window.getComputedStyle(element).lineHeight) || 16;
    var scrollAmount = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * lineHeight : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? event.deltaY * element.clientHeight : event.deltaY;
    var maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
    var start = element.scrollTop;
    if (rafId === null) target = start;
    target = clamp(target + scrollAmount * CONTENT_SCROLL_SENSITIVITY, 0, maxScroll);

    // reduced-motion：直接跳位，免动画
    if (reduceMotionQuery.matches) {
      stop();
      element.scrollTop = target;
      event.preventDefault();
      return;
    }
    var startTime = performance.now();
    stop();
    rafId = requestAnimationFrame(function () {
      return step(start, startTime);
    });
    event.preventDefault();
  }
  function reset() {
    stop();
    target = element.scrollTop;
  }
  return {
    handleWheel: handleWheel,
    reset: reset
  };
}
function hexToRgb(hex) {
  return [Number.parseInt(hex.slice(1, 3), 16), Number.parseInt(hex.slice(3, 5), 16), Number.parseInt(hex.slice(5, 7), 16)];
}
function readCssPalette(variableNames) {
  var rootStyles = window.getComputedStyle(document.documentElement);
  return variableNames.map(function (variableName) {
    var value = rootStyles.getPropertyValue(variableName).trim();
    if (!/^#[\da-f]{6}$/i.test(value)) {
      throw new Error("CSS color variable ".concat(variableName, " must use the #rrggbb format."));
    }
    return hexToRgb(value);
  });
}
function createDiscretePalette(stopColors, levels) {
  return Array.from({
    length: levels
  }, function (_, index) {
    var position = index / (levels - 1) * (stopColors.length - 1);
    var startIndex = Math.min(Math.floor(position), stopColors.length - 2);
    var amount = position - startIndex;
    return stopColors[startIndex].map(function (channel, channelIndex) {
      return Math.round(channel + (stopColors[startIndex + 1][channelIndex] - channel) * amount);
    });
  });
}
function mixPalettes(primaryPalette, secondaryPalette, amount) {
  return primaryPalette.map(function (primaryColor, colorIndex) {
    return primaryColor.map(function (channel, channelIndex) {
      return Math.round(channel + (secondaryPalette[colorIndex][channelIndex] - channel) * amount);
    });
  });
}
function hash2D(x, y, seed) {
  var value = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  value = Math.imul(value ^ value >>> 13, 1274126177);
  return ((value ^ value >>> 16) >>> 0) / 4294967295;
}
function smoothStep(value) {
  return value * value * (3 - 2 * value);
}
function lerp(start, end, amount) {
  return start + (end - start) * amount;
}
function hash3D(x, y, z, seed) {
  var value = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 362437) + Math.imul(seed, 1442695041);
  value = Math.imul(value ^ value >>> 13, 1274126177);
  return ((value ^ value >>> 16) >>> 0) / 4294967295;
}
function valueNoise3D(x, y, z, seed) {
  var x0 = Math.floor(x);
  var y0 = Math.floor(y);
  var z0 = Math.floor(z);
  var tx = smoothStep(x - x0);
  var ty = smoothStep(y - y0);
  var tz = smoothStep(z - z0);
  var frontTop = lerp(hash3D(x0, y0, z0, seed), hash3D(x0 + 1, y0, z0, seed), tx);
  var frontBottom = lerp(hash3D(x0, y0 + 1, z0, seed), hash3D(x0 + 1, y0 + 1, z0, seed), tx);
  var backTop = lerp(hash3D(x0, y0, z0 + 1, seed), hash3D(x0 + 1, y0, z0 + 1, seed), tx);
  var backBottom = lerp(hash3D(x0, y0 + 1, z0 + 1, seed), hash3D(x0 + 1, y0 + 1, z0 + 1, seed), tx);
  return lerp(lerp(frontTop, frontBottom, ty), lerp(backTop, backBottom, ty), tz);
}
function createNoiseBackground(canvas) {
  var context = canvas.getContext("2d", {
    alpha: false
  });
  if (!context) return;
  var primaryPalette;
  var secondaryPalette;
  try {
    primaryPalette = createDiscretePalette(readCssPalette(NOISE_CONFIG.primaryPaletteVariables), NOISE_CONFIG.paletteLevels);
    secondaryPalette = createDiscretePalette(readCssPalette(NOISE_CONFIG.secondaryPaletteVariables), NOISE_CONFIG.paletteLevels);
  } catch (error) {
    console.warn("Noise background disabled because its CSS palette is invalid.", error);
    return;
  }
  var palettePage = document.querySelector("[data-palette-page]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var imageData;
  var noiseLevels;
  var animationFrame = null;
  var lastNoiseFrameTime = -Infinity;
  var lastAnimationTime = null;
  var lastScrollTime = performance.now();
  var lastScrollY = window.scrollY;
  var scrollBoost = 0;
  var scrollBoostTarget = 0;
  var paletteMixCurrent = 0;
  var paletteMixTarget = 0;
  var paletteMixStart = 0;
  var paletteTransitionStartTime = null;
  var flowX = 0;
  var flowY = 0;
  var directionX = 1;
  var directionY = -0.58;
  var targetDirectionX = directionX;
  var targetDirectionY = directionY;
  var nextDirectionChangeTime = null;
  var directionSequence = 0;
  var temporalPhase = 0;
  var resizeTimer;
  function resizeBuffer() {
    var width = clamp(Math.ceil(window.innerWidth / NOISE_CONFIG.targetPixelSize), NOISE_CONFIG.minWidth, NOISE_CONFIG.maxWidth);
    var height = Math.min(Math.ceil(width * window.innerHeight / window.innerWidth), NOISE_CONFIG.maxHeight);
    if (canvas.width === width && canvas.height === height && imageData) return;
    canvas.width = width;
    canvas.height = height;
    imageData = context.createImageData(width, height);
    noiseLevels = new Uint8Array(width * height);
  }
  function paletteIndex(value) {
    for (var index = 0; index < NOISE_CONFIG.thresholds.length; index += 1) {
      if (value < NOISE_CONFIG.thresholds[index]) return index;
    }
    return primaryPalette.length - 1;
  }
  function paletteMixAmount() {
    if (!palettePage) return 0;
    var transitionDistance = window.innerHeight * NOISE_CONFIG.paletteTransitionStartRatio;
    if (transitionDistance <= 0) return 1;
    return clamp((transitionDistance - palettePage.getBoundingClientRect().top) / transitionDistance, 0, 1);
  }
  function setPaletteTarget(timestamp) {
    var nextTarget = paletteMixAmount();
    if (Math.abs(nextTarget - paletteMixCurrent) <= NOISE_CONFIG.paletteTransitionEpsilon) {
      paletteMixCurrent = nextTarget;
      paletteMixTarget = nextTarget;
      paletteTransitionStartTime = null;
      return;
    }
    paletteMixStart = paletteMixCurrent;
    paletteMixTarget = nextTarget;
    paletteTransitionStartTime = timestamp;
  }
  function updatePaletteMix(timestamp) {
    if (paletteTransitionStartTime === null) return false;
    var progress = clamp((timestamp - paletteTransitionStartTime) / NOISE_CONFIG.paletteTransitionDurationMs, 0, 1);
    var easedProgress = 1 - Math.pow(1 - progress, 3);
    paletteMixCurrent = lerp(paletteMixStart, paletteMixTarget, easedProgress);
    if (progress >= 1) {
      paletteMixCurrent = paletteMixTarget;
      paletteTransitionStartTime = null;
    }
    return true;
  }
  function directionRandom(sequence, salt) {
    return hash2D(sequence, salt, NOISE_CONFIG.seed + 101);
  }
  function scheduleNextDirection(timestamp) {
    directionSequence += 1;
    var angle = directionRandom(directionSequence, 17) * Math.PI * 2;
    var interval = lerp(NOISE_CONFIG.directionChangeMinMs, NOISE_CONFIG.directionChangeMaxMs, directionRandom(directionSequence, 31));
    targetDirectionX = Math.cos(angle);
    targetDirectionY = Math.sin(angle);
    nextDirectionChangeTime = timestamp + interval;
  }
  function advanceNoise(timestamp, elapsed) {
    if (nextDirectionChangeTime === null || timestamp >= nextDirectionChangeTime) {
      scheduleNextDirection(timestamp);
    }
    var directionAmount = elapsed > 0 ? 1 - Math.exp(-elapsed / NOISE_CONFIG.directionResponseMs) : 0;
    directionX = lerp(directionX, targetDirectionX, directionAmount);
    directionY = lerp(directionY, targetDirectionY, directionAmount);
    var directionLength = Math.hypot(directionX, directionY);
    if (directionLength > 0.001) {
      directionX /= directionLength;
      directionY /= directionLength;
    }
    var temporalSpeedMultiplier = 1 + scrollBoost;
    var flowDistance = elapsed * NOISE_CONFIG.speed;
    flowX += directionX * flowDistance;
    flowY += directionY * flowDistance;
    temporalPhase += elapsed * NOISE_CONFIG.temporalSpeed * temporalSpeedMultiplier;
  }
  function updateNoiseField() {
    resizeBuffer();
    var width = canvas.width;
    var height = canvas.height;
    var octaveWeight = NOISE_CONFIG.secondOctaveWeight;
    var levelOffset = 0;
    for (var y = 0; y < height; y += 1) {
      var normalizedY = y / height * NOISE_CONFIG.baseFrequency + flowY;
      for (var x = 0; x < width; x += 1) {
        var normalizedX = x / width * NOISE_CONFIG.baseFrequency + flowX;
        var base = valueNoise3D(normalizedX, normalizedY, temporalPhase, NOISE_CONFIG.seed);
        var detail = valueNoise3D(normalizedX * 2.03 - flowX * 0.32, normalizedY * 2.03 + flowY * 0.21, temporalPhase * NOISE_CONFIG.secondOctaveTemporalMultiplier, NOISE_CONFIG.seed + 17);
        var combined = (base + detail * octaveWeight) / (1 + octaveWeight);
        var amplified = clamp((combined - 0.5) * NOISE_CONFIG.amplitude + 0.5, 0, 1);
        noiseLevels[levelOffset] = paletteIndex(amplified);
        levelOffset += 1;
      }
    }
  }
  function renderColors() {
    var pixels = imageData.data;
    var palette = mixPalettes(primaryPalette, secondaryPalette, paletteMixCurrent);
    for (var index = 0; index < noiseLevels.length; index += 1) {
      var color = palette[noiseLevels[index]];
      var pixelOffset = index * 4;
      pixels[pixelOffset] = color[0];
      pixels[pixelOffset + 1] = color[1];
      pixels[pixelOffset + 2] = color[2];
      pixels[pixelOffset + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }
  function animate(timestamp) {
    var elapsed = lastAnimationTime === null ? 0 : Math.min(timestamp - lastAnimationTime, NOISE_CONFIG.maxAnimationStepMs);
    var isReceivingScroll = timestamp - lastScrollTime <= NOISE_CONFIG.scrollBoostRecentMs;
    var desiredBoost = isReceivingScroll ? scrollBoostTarget : 0;
    var responseTime = desiredBoost > scrollBoost ? NOISE_CONFIG.scrollSpeedRiseMs : NOISE_CONFIG.scrollSpeedDecayMs;
    var smoothingAmount = elapsed > 0 ? 1 - Math.exp(-elapsed / responseTime) : 0;
    scrollBoost += (desiredBoost - scrollBoost) * smoothingAmount;
    advanceNoise(timestamp, elapsed);
    var paletteChanged = updatePaletteMix(timestamp);
    lastAnimationTime = timestamp;
    var shouldUpdateNoise = timestamp - lastNoiseFrameTime >= NOISE_CONFIG.frameInterval;
    if (shouldUpdateNoise) {
      updateNoiseField();
      lastNoiseFrameTime = timestamp;
    }
    if (shouldUpdateNoise || paletteChanged) {
      renderColors();
    }
    animationFrame = window.requestAnimationFrame(animate);
  }
  function stop() {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    lastAnimationTime = null;
    nextDirectionChangeTime = null;
  }
  function start() {
    stop();
    resizeBuffer();
    paletteMixCurrent = paletteMixAmount();
    paletteMixTarget = paletteMixCurrent;
    paletteTransitionStartTime = null;
    updateNoiseField();
    renderColors();
    if (!reducedMotion.matches && !document.hidden) {
      lastNoiseFrameTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    }
  }
  function handleResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      imageData = undefined;
      resizeBuffer();
      if (reducedMotion.matches) {
        paletteMixCurrent = paletteMixAmount();
        paletteMixTarget = paletteMixCurrent;
        paletteTransitionStartTime = null;
      } else {
        setPaletteTarget(performance.now());
      }
      updateNoiseField();
      renderColors();
      lastNoiseFrameTime = performance.now();
    }, 160);
  }
  function handleScroll() {
    var now = performance.now();
    var currentScrollY = window.scrollY;
    var elapsed = Math.max(now - lastScrollTime, 1);
    var velocity = Math.abs(currentScrollY - lastScrollY) / elapsed;

    // 全页滚动按速度连续加速（不限过渡区）；停滚回落由 animate 判 isReceivingScroll
    scrollBoostTarget = clamp(velocity / NOISE_CONFIG.scrollVelocityForMaxSpeed, 0, 1) * (NOISE_CONFIG.maxScrollSpeedMultiplier - 1);
    lastScrollTime = now;
    lastScrollY = currentScrollY;
    setPaletteTarget(now);
    if (reducedMotion.matches) {
      paletteMixCurrent = paletteMixTarget;
      paletteTransitionStartTime = null;
      renderColors();
    }
  }
  window.addEventListener("resize", handleResize, {
    passive: true
  });
  window.addEventListener("scroll", handleScroll, {
    passive: true
  });
  document.addEventListener("visibilitychange", start);
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", start);
  } else {
    reducedMotion.addListener(start);
  }
  start();
}
var noiseCanvas = document.querySelector("[data-noise-canvas]");
if (noiseCanvas) createNoiseBackground(noiseCanvas);
var emailButton = document.querySelector("[data-copy-email]");
var copyStatus = document.querySelector("#copy-status");
var statusTimer;
function copyEmail() {
  return _copyEmail.apply(this, arguments);
}
function _copyEmail() {
  _copyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var email, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!(!emailButton || !copyStatus)) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          email = emailButton.dataset.copyEmail;
          _context.p = 2;
          _context.n = 3;
          return navigator.clipboard.writeText(email);
        case 3:
          copyStatus.textContent = "邮箱已复制到剪贴板。";
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          copyStatus.textContent = "\u8BF7\u624B\u52A8\u590D\u5236\uFF1A".concat(email);
        case 5:
          window.clearTimeout(statusTimer);
          statusTimer = window.setTimeout(function () {
            copyStatus.textContent = "";
          }, 2400);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4]]);
  }));
  return _copyEmail.apply(this, arguments);
}
emailButton === null || emailButton === void 0 || emailButton.addEventListener("click", copyEmail);
var yearElement = document.querySelector("[data-current-year]");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
var markdownParser = typeof ((_window$marked = window.marked) === null || _window$marked === void 0 ? void 0 : _window$marked.Marked) === "function" ? new window.marked.Marked({
  breaks: false,
  gfm: false
}) : null;
function createMarkdownFragment(markdown) {
  if (!markdownParser) throw new Error("Markdown parser is unavailable.");
  var rendered = markdownParser.parse(markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""));
  var template = document.createElement("template");
  template.innerHTML = rendered;
  return template.content;
}
function readEmbeddedMarkdown(source) {
  var _iterator = _createForOfIteratorHelper(document.querySelectorAll("template[data-embedded-markdown]")),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var template = _step.value;
      if (template.dataset.embeddedMarkdown === source) {
        return template.content.textContent;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  throw new Error("Embedded Markdown source not found: ".concat(source));
}
function renderMarkdown(container, source) {
  var fragment = createMarkdownFragment(readEmbeddedMarkdown(source));
  if (container.classList.contains("about__body")) {
    var columns = document.createElement("div");
    columns.className = "about__columns";
    columns.append(fragment);
    container.replaceChildren(columns);
  } else {
    container.replaceChildren(fragment);
  }
}
var aboutMarkdown = document.querySelector(".about__body[data-markdown-source]");
if (aboutMarkdown) {
  renderMarkdown(aboutMarkdown, aboutMarkdown.dataset.markdownSource);
  var aboutPanel = aboutMarkdown.closest(".about");
  var aboutScroller = createSmoothWheelScroller(aboutMarkdown, false);
  aboutPanel === null || aboutPanel === void 0 || aboutPanel.addEventListener("wheel", aboutScroller.handleWheel);
}
var directionDialog = document.querySelector("[data-direction-dialog]");
var dialogHeading = directionDialog === null || directionDialog === void 0 ? void 0 : directionDialog.querySelector("[data-dialog-heading]");
var dialogContent = directionDialog === null || directionDialog === void 0 ? void 0 : directionDialog.querySelector("[data-dialog-content]");
var dialogClose = directionDialog === null || directionDialog === void 0 ? void 0 : directionDialog.querySelector("[data-dialog-close]");
var dialogScroller = directionDialog && dialogContent ? createSmoothWheelScroller(dialogContent, true) : null;
var dialogTrigger = null;
function openDirectionDialog(trigger) {
  if (!directionDialog || !dialogHeading || !dialogContent || !dialogClose) return;
  var source = trigger.dataset.markdownSource;
  var title = trigger.dataset.dialogTitle;
  if (!source || !title) return;
  dialogTrigger = trigger;
  dialogHeading.textContent = title;
  if (!directionDialog.open) directionDialog.showModal();
  dialogClose.focus();
  renderMarkdown(dialogContent, source);
  dialogScroller === null || dialogScroller === void 0 || dialogScroller.reset();
}
var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll(".work-card__trigger[data-markdown-source]")),
  _step2;
try {
  var _loop = function _loop() {
    var trigger = _step2.value;
    trigger.addEventListener("click", function () {
      return openDirectionDialog(trigger);
    });
  };
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}
dialogClose === null || dialogClose === void 0 || dialogClose.addEventListener("click", function () {
  return directionDialog.close();
});
directionDialog === null || directionDialog === void 0 || directionDialog.addEventListener("click", function (event) {
  if (event.target === directionDialog) directionDialog.close();
});
directionDialog === null || directionDialog === void 0 || directionDialog.addEventListener("close", function () {
  var _dialogTrigger;
  (_dialogTrigger = dialogTrigger) === null || _dialogTrigger === void 0 || _dialogTrigger.focus();
  dialogTrigger = null;
});

// passive false，保证 preventDefault 生效
if (directionDialog && dialogScroller) {
  directionDialog.addEventListener("wheel", dialogScroller.handleWheel, {
    passive: false
  });
}

// 弹窗开启：捕获期拦滚轮，防透传背景滚动（内容滚动仍归平滑器）
document.addEventListener("wheel", function (event) {
  if (!(directionDialog !== null && directionDialog !== void 0 && directionDialog.open)) return;
  event.preventDefault();
}, {
  capture: true,
  passive: false
});

// 焦点陷阱：弹窗打开时拉回逃逸焦点
document.addEventListener("focusin", function (event) {
  if (!(directionDialog !== null && directionDialog !== void 0 && directionDialog.open)) return;
  if (directionDialog.contains(event.target)) return;
  dialogClose === null || dialogClose === void 0 || dialogClose.focus();
});
