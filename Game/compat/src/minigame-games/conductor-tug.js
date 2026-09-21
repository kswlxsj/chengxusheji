function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game) {
  "use strict";

  // E-033 抢摇杆小游戏：竖直抓握条负责操作，仪表盘负责显示控制权倾向。
  // 顶层只注册，DOM 与动画全部延迟到 run()，这样编译器可以在 node:vm 中安全收集编号。
  var CONFIG = {
    zoneHeight: 0.20,
    keyGivenZoneHeight: 0.15,
    targetIntensity: 1.80,
    playerGain: 10,
    conductorGain: 24,
    lift: 2.95,
    gravity: 2.15,
    damping: 0.83,
    timeLimit: 20
  };
  var INTRO_COUNTDOWN_SECONDS = 5;
  var PLAYER_KEYS = new Set(["Space", "ArrowUp", "KeyW"]);
  var clamp = function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  };
  function run(context) {
    var _context$state;
    // 无 DOM 的编译/自动化环境直接跳过画面；事件引擎会继续原来的把手事件。
    if (!context.stage) return Promise.resolve(null);
    var stage = context.stage;
    var config = _objectSpread(_objectSpread({}, CONFIG), context.config || {});
    if (((_context$state = context.state) === null || _context$state === void 0 ? void 0 : _context$state.flags.ev519_key_ever_given) === true) {
      config.zoneHeight = config.keyGivenZoneHeight;
    }
    // 独立预览仍可指定源资产目录；正式游戏只依赖 Game/assets。
    var assetPath = function assetPath(relativePath) {
      return Game.assetUrl(context.assetBase ? "".concat(context.assetBase, "/").concat(relativePath) : "assets/".concat(relativePath));
    };
    var root = document.createElement("section");
    root.className = "mg-tug";
    root.setAttribute("aria-label", "控制杆争夺小游戏");
    root.tabIndex = 0;
    root.innerHTML = "\n      <header class=\"mg-tug-header\">\n        <div>\n          <p class=\"mg-tug-eyebrow\">FINAL CONFRONTATION \xB7 CAB CONTROL</p>\n          <h1>\u63A7\u5236\u6746\u4E89\u593A</h1>\n          <p class=\"mg-tug-subtitle\">\u628A\u7EA2\u8272\u63A7\u5236\u6746\u538B\u8FDB\u7EFF\u8272\u6293\u63E1\u533A\uFF0C\u4EEA\u8868\u76D8\u4F1A\u663E\u793A\u63A7\u5236\u6743\u6B63\u5728\u504F\u5411\u8C01\u3002</p>\n        </div>\n        <p class=\"mg-tug-time\" id=\"mgTugTime\">\u5269\u4F59 ".concat(config.timeLimit.toFixed(1), " \u79D2</p>\n      </header>\n\n      <div class=\"mg-tug-board\">\n        <div class=\"mg-tug-fighter mg-tug-player\">\n          <div class=\"mg-tug-avatar-frame\">\n            <img class=\"mg-tug-avatar-art\" src=\"").concat(assetPath("Image/Portrait/player.webp"), "\" alt=\"\" draggable=\"false\">\n          </div>\n          <h2>\u4F60</h2>\n          <p>\u6211\u65B9<br>\u628A\u7EFF\u8272\u533A\u63A8\u5411\u63A7\u5236\u6746</p>\n        </div>\n\n        <div class=\"mg-tug-center\">\n          <div class=\"mg-tug-track-wrap\">\n            <div class=\"mg-tug-track\" id=\"mgTugTrack\" aria-label=\"\u5782\u76F4\u6293\u63E1\u533A\">\n              <img class=\"mg-tug-track-art\" src=\"").concat(assetPath("Image/Ui/ConductorTug/track.webp"), "\" alt=\"\" draggable=\"false\">\n              <div class=\"mg-tug-track-line\"></div>\n              <div class=\"mg-tug-target\" id=\"mgTugTarget\" aria-label=\"\u7EA2\u8272\u63A7\u5236\u6746\">\n                <img class=\"mg-tug-target-art\" src=\"").concat(assetPath("Image/Ui/ConductorTug/target.webp"), "\" alt=\"\u63A7\u5236\u6746\" draggable=\"false\">\n              </div>\n              <div class=\"mg-tug-zone\" id=\"mgTugZone\" aria-label=\"\u7EFF\u8272\u6293\u63E1\u533A\"></div>\n            </div>\n            <div class=\"mg-tug-caption\">\n              <strong id=\"mgTugInsideText\">\u5BFB\u627E\u6293\u63E1\u65F6\u673A</strong>\n              <span id=\"mgTugMeterText\">\u76EE\u6807\u5728\u7EFF\u8272\u533A\u5185\u65F6\uFF0C\u6211\u65B9\u503E\u5411\u4E0A\u5347</span>\n            </div>\n          </div>\n\n          <div class=\"mg-tug-gauge-wrap\">\n            <div class=\"mg-tug-gauge-labels\" aria-hidden=\"true\"><span>\u6211\u65B9</span><span>\u5217\u8F66\u5458</span></div>\n            <div class=\"mg-tug-gauge\" id=\"mgTugGauge\" role=\"img\" aria-label=\"\u63A7\u5236\u6743\u503E\u5411\u4EEA\u8868\u76D8\">\n              <img class=\"mg-tug-dashboard-art\" src=\"").concat(assetPath("Image/Scene/Background/ConductorTug/dashboard.webp"), "\" alt=\"\u4EEA\u8868\u76D8\" draggable=\"false\">\n              <span class=\"mg-tug-pointer\" id=\"mgTugPointer\" aria-hidden=\"true\">\n                <img class=\"mg-tug-pointer-art\" src=\"").concat(assetPath("Image/Scene/Background/ConductorTug/pointer.webp"), "\" alt=\"\" draggable=\"false\">\n              </span>\n            </div>\n            <strong class=\"mg-tug-tilt-text\" id=\"mgTugTiltText\">\u503E\u5411\u5C45\u4E2D</strong>\n          </div>\n        </div>\n\n        <div class=\"mg-tug-fighter mg-tug-conductor\">\n          <div class=\"mg-tug-avatar-frame\">\n            <img class=\"mg-tug-avatar-art\" src=\"").concat(assetPath("Image/Portrait/conductor.webp"), "\" alt=\"\" draggable=\"false\">\n          </div>\n          <h2>\u5217\u8F66\u5458</h2>\n          <p>\u5BF9\u65B9<br>\u522B\u8BA9\u4ED6\u593A\u8D70\u63A7\u5236\u6746</p>\n        </div>\n      </div>\n\n      <p class=\"mg-tug-status\" id=\"mgTugStatus\"><strong>\u62C9\u626F\uFF1A</strong>\u628A\u7EFF\u8272\u533A\u57DF\u79FB\u5230\u7EA2\u8272\u63A7\u5236\u6746\u4E0A\u3002</p>\n      <p class=\"mg-tug-control\">\u5012\u8BA1\u65F6\u7ED3\u675F\u540E\uFF0C\u6309\u4F4F\u7A7A\u683C / W / \u2191 \u6216\u9F20\u6807\u5DE6\u952E\uFF1A\u7EFF\u8272\u533A\u57DF\u4E0A\u79FB\u3000\xB7\u3000\u677E\u5F00\uFF1A\u7EFF\u8272\u533A\u57DF\u4E0B\u843D</p>\n\n      <div class=\"mg-tug-intro\" id=\"mgTugIntro\" role=\"status\" aria-live=\"polite\">\n        <div class=\"mg-tug-intro-card\">\n          <p class=\"mg-tug-intro-kicker\">\u64CD\u4F5C\u89C4\u5219</p>\n          <h2>\u5148\u770B\u89C4\u5219</h2>\n          <p class=\"mg-tug-intro-rules\">\u6309\u4F4F\u7A7A\u683C / W / \u2191 \u6216\u9F20\u6807\u5DE6\u952E\uFF0C\u628A\u7EFF\u8272\u6293\u63E1\u533A\u538B\u5230\u7EA2\u8272\u63A7\u5236\u6746\u4E0A\u3002\u4EEA\u8868\u76D8\u663E\u793A\u63A7\u5236\u6743\u503E\u5411\uFF1B\u5B8C\u5168\u504F\u5411\u4E00\u8FB9\uFF0C\u8BE5\u65B9\u83B7\u80DC\u3002</p>\n          <div class=\"mg-tug-countdown\" id=\"mgTugCountdown\">5</div>\n          <p class=\"mg-tug-intro-hint\" id=\"mgTugIntroHint\">\u5012\u8BA1\u65F6\u540E\u5F00\u59CB</p>\n        </div>\n      </div>\n    ");
    stage.replaceChildren(root);
    root.focus({
      preventScroll: true
    });
    var target = root.querySelector("#mgTugTarget");
    var zone = root.querySelector("#mgTugZone");
    var track = root.querySelector("#mgTugTrack");
    var gauge = root.querySelector("#mgTugGauge");
    var pointer = root.querySelector("#mgTugPointer");
    var timeText = root.querySelector("#mgTugTime");
    var status = root.querySelector("#mgTugStatus");
    var insideText = root.querySelector("#mgTugInsideText");
    var meterText = root.querySelector("#mgTugMeterText");
    var tiltText = root.querySelector("#mgTugTiltText");
    var intro = root.querySelector("#mgTugIntro");
    var countdownText = root.querySelector("#mgTugCountdown");
    var introHint = root.querySelector("#mgTugIntroHint");
    var resolveSettlement = null;
    var frameHandle = 0;
    var finishHandle = 0;
    var introTimer = 0;
    var lastFrame = 0;
    var elapsed = 0;
    var progress = 50;
    var playerY = 0.59;
    var playerVelocity = 0;
    var targetY = 0.38;
    var targetVelocity = 0.07;
    var finished = false;
    var phase = "countdown";
    var pointerDown = false;
    var pressedKeys = new Set();
    var finishedPromise = new Promise(function (resolve) {
      resolveSettlement = resolve;
    });
    var isHolding = function isHolding() {
      return pointerDown || pressedKeys.size > 0;
    };
    var render = function render() {
      var targetCenter = targetY + 0.055;
      var inside = targetCenter >= playerY && targetCenter <= playerY + config.zoneHeight;
      var tilt = clamp((50 - progress) / 50, -1, 1);
      // 左侧为我方、右侧为列车员；指针轴心固定在圆心，扫过仪表盘上方的优弧。
      // pointer.png 的左下端是轴心，旋转角度经过 180°→410°，两端正好落到左右刻度终点。
      var rotation = 295 + tilt * 115;
      zone.style.top = "".concat(playerY * 100, "%");
      zone.style.height = "".concat(config.zoneHeight * 100, "%");
      target.style.top = "".concat(targetY * 100, "%");
      zone.classList.toggle("is-inside", inside);
      pointer.style.setProperty("--mg-tug-pointer-rotation", "".concat(rotation.toFixed(2), "deg"));
      if (document.documentMode) pointer.style.transform = "rotate(".concat(rotation.toFixed(2), "deg)");
      tiltText.textContent = progress > 55 ? "倾向我方" : progress < 45 ? "倾向列车员" : "倾向居中";
      tiltText.classList.toggle("is-player", progress > 55);
      tiltText.classList.toggle("is-conductor", progress < 45);
      gauge.classList.toggle("is-player", progress >= 100);
      gauge.classList.toggle("is-conductor", progress <= 0);
      insideText.textContent = inside ? "抓住了！" : "脱离抓握区";
      insideText.classList.toggle("is-inside", inside);
      meterText.textContent = inside ? "我方控制权正在上升" : "列车员正在把控制杆拽走";
      return inside;
    };
    var finish = function finish(won) {
      if (finished) return;
      finished = true;
      phase = "finished";
      progress = won ? 100 : 0;
      cancelAnimationFrame(frameHandle);
      window.clearInterval(introTimer);
      render();
      root.classList.add(won ? "is-win" : "is-loss");
      status.innerHTML = won ? "<strong>抢到控制杆了。</strong>你猛地压下操作杆。" : "<strong>控制杆脱手。</strong>正在返回剧情。";
      insideText.textContent = won ? "控制杆已锁定" : "控制杆脱手";
      tiltText.textContent = won ? "完全倾向我方" : "完全倾向列车员";
      meterText.textContent = won ? "正在切换列车控制模式" : "列车员重新抓住了操作杆";
      finishHandle = window.setTimeout(function () {
        return resolveSettlement([{
          type: "setFlag",
          key: "conductor_tug_won",
          value: won
        }, {
          type: "jump",
          next: won ? "E_034" : "E_035"
        }]);
      }, 650);
    };
    var _frame = function frame(timestamp) {
      if (finished || phase !== "active") return;
      // 先排下一帧，避免一次异常让整个小游戏停在最后一帧。
      frameHandle = requestAnimationFrame(_frame);
      var delta = Math.min(0.035, Math.max(0.001, (timestamp - lastFrame) / 1000));
      lastFrame = timestamp;
      elapsed += delta;
      playerVelocity += (isHolding() ? -config.lift : config.gravity) * delta;
      playerVelocity *= Math.pow(config.damping, delta * 60);
      playerY = clamp(playerY + playerVelocity * delta, 0, 1 - config.zoneHeight);
      if (playerY === 0 || playerY === 1 - config.zoneHeight) playerVelocity *= -0.28;
      var wave = Math.sin(elapsed * 2.15) * 0.92 + Math.sin(elapsed * 4.8 + 1.3) * 0.42;
      targetVelocity += wave * config.targetIntensity * 1.45 * delta;
      targetVelocity *= Math.pow(0.82, delta * 60);
      targetY += targetVelocity * delta;
      if (targetY < 0) {
        targetY = 0;
        targetVelocity = Math.abs(targetVelocity) * 0.72;
      }
      if (targetY > 0.90) {
        targetY = 0.90;
        targetVelocity = -Math.abs(targetVelocity) * 0.72;
      }
      var inside = render();
      progress = clamp(progress + (inside ? config.playerGain : -config.conductorGain) * delta, 0, 100);
      var remaining = Math.max(0, config.timeLimit - elapsed);
      timeText.textContent = "\u5269\u4F59 ".concat(remaining.toFixed(1), " \u79D2");
      status.innerHTML = inside ? "<strong>抓稳：</strong>继续保持，控制权正在上升。" : "<strong>拉扯：</strong>把绿色区域移到红色控制杆上。";
      if (progress >= 100) {
        progress = 100;
        render();
        finish(true);
        return;
      }
      if (progress <= 0 || elapsed >= config.timeLimit) {
        progress = Math.max(0, progress);
        render();
        finish(false);
        return;
      }
    };
    var onKeyDown = function onKeyDown(event) {
      if (!PLAYER_KEYS.has(event.code)) return;
      if (phase !== "active") return;
      event.preventDefault();
      pressedKeys.add(event.code);
    };
    var onKeyUp = function onKeyUp(event) {
      if (!PLAYER_KEYS.has(event.code)) return;
      event.preventDefault();
      pressedKeys.delete(event.code);
    };
    var onPointerDown = function onPointerDown(event) {
      var _track$setPointerCapt;
      if (phase !== "active") return;
      pointerDown = true;
      (_track$setPointerCapt = track.setPointerCapture) === null || _track$setPointerCapt === void 0 || _track$setPointerCapt.call(track, event.pointerId);
    };
    var onPointerUp = function onPointerUp() {
      pointerDown = false;
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    context.onQuit(function () {
      return null;
    });
    context.registerCleanup(function () {
      cancelAnimationFrame(frameHandle);
      window.clearInterval(introTimer);
      window.clearTimeout(finishHandle);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      pressedKeys.clear();
      pointerDown = false;
    });
    render();
    var introRemaining = INTRO_COUNTDOWN_SECONDS;
    introTimer = window.setInterval(function () {
      introRemaining -= 1;
      if (introRemaining > 0) {
        countdownText.textContent = String(introRemaining);
        return;
      }
      window.clearInterval(introTimer);
      countdownText.textContent = "开始！";
      countdownText.classList.add("is-start");
      introHint.textContent = "现在开始";
      phase = "active";
      root.classList.add("is-live");
      intro.classList.add("is-hidden");
      lastFrame = performance.now();
      frameHandle = requestAnimationFrame(_frame);
    }, 1000);
    return finishedPromise;
  }
  Game.Minigames.register("conductor_tug", {
    title: "控制杆争夺",
    run: run
  });
})(window.TrainGame);
