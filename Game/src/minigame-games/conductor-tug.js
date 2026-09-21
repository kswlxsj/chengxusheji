(function (Game) {
  "use strict";

  // E-033 抢摇杆小游戏：竖直抓握条负责操作，仪表盘负责显示控制权倾向。
  // 顶层只注册，DOM 与动画全部延迟到 run()，这样编译器可以在 node:vm 中安全收集编号。
  const CONFIG = {
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
  const INTRO_COUNTDOWN_SECONDS = 5;
  const PLAYER_KEYS = new Set(["Space", "ArrowUp", "KeyW"]);

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  function run(context) {
    // 无 DOM 的编译/自动化环境直接跳过画面；事件引擎会继续原来的把手事件。
    if (!context.stage) return Promise.resolve(null);

    const stage = context.stage;
    const config = { ...CONFIG, ...(context.config || {}) };
    if (context.state?.flags.ev519_key_ever_given === true) {
      config.zoneHeight = config.keyGivenZoneHeight;
    }
    // 独立预览仍可指定源资产目录；正式游戏只依赖 Game/assets。
    const assetPath = (relativePath) => Game.assetUrl(context.assetBase
      ? `${context.assetBase}/${relativePath}` : `assets/${relativePath}`);
    const root = document.createElement("section");
    root.className = "mg-tug";
    root.setAttribute("aria-label", "控制杆争夺小游戏");
    root.tabIndex = 0;
    root.innerHTML = `
      <header class="mg-tug-header">
        <div>
          <p class="mg-tug-eyebrow">FINAL CONFRONTATION · CAB CONTROL</p>
          <h1>控制杆争夺</h1>
          <p class="mg-tug-subtitle">把红色控制杆压进绿色抓握区，仪表盘会显示控制权正在偏向谁。</p>
        </div>
        <p class="mg-tug-time" id="mgTugTime">剩余 ${config.timeLimit.toFixed(1)} 秒</p>
      </header>

      <div class="mg-tug-board">
        <div class="mg-tug-fighter mg-tug-player">
          <div class="mg-tug-avatar-frame">
            <img class="mg-tug-avatar-art" src="${assetPath("Image/Portrait/player.webp")}" alt="" draggable="false">
          </div>
          <h2>你</h2>
          <p>我方<br>把绿色区推向控制杆</p>
        </div>

        <div class="mg-tug-center">
          <div class="mg-tug-track-wrap">
            <div class="mg-tug-track" id="mgTugTrack" aria-label="垂直抓握区">
              <img class="mg-tug-track-art" src="${assetPath("Image/Ui/ConductorTug/track.webp")}" alt="" draggable="false">
              <div class="mg-tug-track-line"></div>
              <div class="mg-tug-target" id="mgTugTarget" aria-label="红色控制杆">
                <img class="mg-tug-target-art" src="${assetPath("Image/Ui/ConductorTug/target.webp")}" alt="控制杆" draggable="false">
              </div>
              <div class="mg-tug-zone" id="mgTugZone" aria-label="绿色抓握区"></div>
            </div>
            <div class="mg-tug-caption">
              <strong id="mgTugInsideText">寻找抓握时机</strong>
              <span id="mgTugMeterText">目标在绿色区内时，我方倾向上升</span>
            </div>
          </div>

          <div class="mg-tug-gauge-wrap">
            <div class="mg-tug-gauge-labels" aria-hidden="true"><span>我方</span><span>列车员</span></div>
            <div class="mg-tug-gauge" id="mgTugGauge" role="img" aria-label="控制权倾向仪表盘">
              <img class="mg-tug-dashboard-art" src="${assetPath("Image/Scene/Background/ConductorTug/dashboard.webp")}" alt="仪表盘" draggable="false">
              <span class="mg-tug-pointer" id="mgTugPointer" aria-hidden="true">
                <img class="mg-tug-pointer-art" src="${assetPath("Image/Scene/Background/ConductorTug/pointer.webp")}" alt="" draggable="false">
              </span>
            </div>
            <strong class="mg-tug-tilt-text" id="mgTugTiltText">倾向居中</strong>
          </div>
        </div>

        <div class="mg-tug-fighter mg-tug-conductor">
          <div class="mg-tug-avatar-frame">
            <img class="mg-tug-avatar-art" src="${assetPath("Image/Portrait/conductor.webp")}" alt="" draggable="false">
          </div>
          <h2>列车员</h2>
          <p>对方<br>别让他夺走控制杆</p>
        </div>
      </div>

      <p class="mg-tug-status" id="mgTugStatus"><strong>拉扯：</strong>把绿色区域移到红色控制杆上。</p>
      <p class="mg-tug-control">倒计时结束后，按住空格 / W / ↑ 或鼠标左键：绿色区域上移　·　松开：绿色区域下落</p>

      <div class="mg-tug-intro" id="mgTugIntro" role="status" aria-live="polite">
        <div class="mg-tug-intro-card">
          <p class="mg-tug-intro-kicker">操作规则</p>
          <h2>先看规则</h2>
          <p class="mg-tug-intro-rules">按住空格 / W / ↑ 或鼠标左键，把绿色抓握区压到红色控制杆上。仪表盘显示控制权倾向；完全偏向一边，该方获胜。</p>
          <div class="mg-tug-countdown" id="mgTugCountdown">5</div>
          <p class="mg-tug-intro-hint" id="mgTugIntroHint">倒计时后开始</p>
        </div>
      </div>
    `;
    stage.replaceChildren(root);
    root.focus({ preventScroll: true });

    const target = root.querySelector("#mgTugTarget");
    const zone = root.querySelector("#mgTugZone");
    const track = root.querySelector("#mgTugTrack");
    const gauge = root.querySelector("#mgTugGauge");
    const pointer = root.querySelector("#mgTugPointer");
    const timeText = root.querySelector("#mgTugTime");
    const status = root.querySelector("#mgTugStatus");
    const insideText = root.querySelector("#mgTugInsideText");
    const meterText = root.querySelector("#mgTugMeterText");
    const tiltText = root.querySelector("#mgTugTiltText");
    const intro = root.querySelector("#mgTugIntro");
    const countdownText = root.querySelector("#mgTugCountdown");
    const introHint = root.querySelector("#mgTugIntroHint");

    let resolveSettlement = null;
    let frameHandle = 0;
    let finishHandle = 0;
    let introTimer = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let progress = 50;
    let playerY = 0.59;
    let playerVelocity = 0;
    let targetY = 0.38;
    let targetVelocity = 0.07;
    let finished = false;
    let phase = "countdown";
    let pointerDown = false;
    const pressedKeys = new Set();

    const finishedPromise = new Promise((resolve) => { resolveSettlement = resolve; });
    const isHolding = () => pointerDown || pressedKeys.size > 0;

    const render = () => {
      const targetCenter = targetY + 0.055;
      const inside = targetCenter >= playerY && targetCenter <= playerY + config.zoneHeight;
      const tilt = clamp((50 - progress) / 50, -1, 1);
      // 左侧为我方、右侧为列车员；指针轴心固定在圆心，扫过仪表盘上方的优弧。
      // pointer.png 的左下端是轴心，旋转角度经过 180°→410°，两端正好落到左右刻度终点。
      const rotation = 295 + tilt * 115;
      zone.style.top = `${playerY * 100}%`;
      zone.style.height = `${config.zoneHeight * 100}%`;
      target.style.top = `${targetY * 100}%`;
      zone.classList.toggle("is-inside", inside);
      pointer.style.setProperty("--mg-tug-pointer-rotation", `${rotation.toFixed(2)}deg`);
      if (document.documentMode) pointer.style.transform = `rotate(${rotation.toFixed(2)}deg)`;
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

    const finish = (won) => {
      if (finished) return;
      finished = true;
      phase = "finished";
      progress = won ? 100 : 0;
      cancelAnimationFrame(frameHandle);
      window.clearInterval(introTimer);
      render();
      root.classList.add(won ? "is-win" : "is-loss");
      status.innerHTML = won
        ? "<strong>抢到控制杆了。</strong>你猛地压下操作杆。"
        : "<strong>控制杆脱手。</strong>正在返回剧情。";
      insideText.textContent = won ? "控制杆已锁定" : "控制杆脱手";
      tiltText.textContent = won ? "完全倾向我方" : "完全倾向列车员";
      meterText.textContent = won ? "正在切换列车控制模式" : "列车员重新抓住了操作杆";
      finishHandle = window.setTimeout(() => resolveSettlement([
        { type: "setFlag", key: "conductor_tug_won", value: won },
        { type: "jump", next: won ? "E_034" : "E_035" }
      ]), 650);
    };

    const frame = (timestamp) => {
      if (finished || phase !== "active") return;
      // 先排下一帧，避免一次异常让整个小游戏停在最后一帧。
      frameHandle = requestAnimationFrame(frame);
      const delta = Math.min(0.035, Math.max(0.001, (timestamp - lastFrame) / 1000));
      lastFrame = timestamp;
      elapsed += delta;

      playerVelocity += (isHolding() ? -config.lift : config.gravity) * delta;
      playerVelocity *= Math.pow(config.damping, delta * 60);
      playerY = clamp(playerY + playerVelocity * delta, 0, 1 - config.zoneHeight);
      if (playerY === 0 || playerY === 1 - config.zoneHeight) playerVelocity *= -0.28;

      const wave = Math.sin(elapsed * 2.15) * 0.92 + Math.sin(elapsed * 4.8 + 1.3) * 0.42;
      targetVelocity += wave * config.targetIntensity * 1.45 * delta;
      targetVelocity *= Math.pow(0.82, delta * 60);
      targetY += targetVelocity * delta;
      if (targetY < 0) { targetY = 0; targetVelocity = Math.abs(targetVelocity) * 0.72; }
      if (targetY > 0.90) { targetY = 0.90; targetVelocity = -Math.abs(targetVelocity) * 0.72; }

      const inside = render();
      progress = clamp(progress + (inside ? config.playerGain : -config.conductorGain) * delta, 0, 100);
      const remaining = Math.max(0, config.timeLimit - elapsed);
      timeText.textContent = `剩余 ${remaining.toFixed(1)} 秒`;
      status.innerHTML = inside
        ? "<strong>抓稳：</strong>继续保持，控制权正在上升。"
        : "<strong>拉扯：</strong>把绿色区域移到红色控制杆上。";

      if (progress >= 100) { progress = 100; render(); finish(true); return; }
      if (progress <= 0 || elapsed >= config.timeLimit) { progress = Math.max(0, progress); render(); finish(false); return; }
    };

    const onKeyDown = (event) => {
      if (!PLAYER_KEYS.has(event.code)) return;
      if (phase !== "active") return;
      event.preventDefault();
      pressedKeys.add(event.code);
    };
    const onKeyUp = (event) => {
      if (!PLAYER_KEYS.has(event.code)) return;
      event.preventDefault();
      pressedKeys.delete(event.code);
    };
    const onPointerDown = (event) => {
      if (phase !== "active") return;
      pointerDown = true;
      track.setPointerCapture?.(event.pointerId);
    };
    const onPointerUp = () => { pointerDown = false; };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    context.onQuit(() => null);
    context.registerCleanup(() => {
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
    let introRemaining = INTRO_COUNTDOWN_SECONDS;
    introTimer = window.setInterval(() => {
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
      frameHandle = requestAnimationFrame(frame);
    }, 1000);
    return finishedPromise;
  }

  Game.Minigames.register("conductor_tug", {
    title: "控制杆争夺",
    run
  });
})(window.TrainGame);
