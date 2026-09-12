(function (Game) {
  "use strict";

  // 终局小游戏：仿星露谷钓鱼的“控制杆争夺”。
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

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  function run(context) {
    // 无 DOM 的编译/自动化环境直接跳过画面；E_026 的 next 会继续原来的把手事件。
    if (!context.stage) return Promise.resolve(null);

    const stage = context.stage;
    const config = { ...CONFIG, ...(context.config || {}) };
    if (context.state?.flags.ev519_key_ever_given === true) {
      config.zoneHeight = config.keyGivenZoneHeight;
    }
    // 独立预览仍可指定源资产目录；正式游戏只依赖 Game/assets。
    const assetPath = (relativePath, filename) => context.assetBase
      ? `${context.assetBase}/${relativePath}` : `assets/ui/conductor-tug/${filename}`;
    const root = document.createElement("section");
    root.className = "mg-tug";
    root.setAttribute("aria-label", "控制杆争夺小游戏");
    root.innerHTML = `
      <header class="mg-tug-header">
        <div>
          <p class="mg-tug-eyebrow">FINAL CONFRONTATION · CAB CONTROL</p>
          <h1>控制杆争夺</h1>
          <p class="mg-tug-subtitle">列车员死死拽住操作杆。把目标留在绿色抓握区内，控制权就会向你倾斜。</p>
        </div>
        <p class="mg-tug-time" id="mgTugTime">剩余 24.0 秒</p>
      </header>

      <div class="mg-tug-scoreboard">
        <div class="mg-tug-score-labels"><span>我方控制权</span><span>列车员控制权</span></div>
        <div class="mg-tug-score-track" aria-label="争夺进度">
          <div class="mg-tug-score-player" id="mgTugPlayerScore"></div>
          <div class="mg-tug-score-conductor" id="mgTugConductorScore"></div>
          <i></i>
        </div>
        <p class="mg-tug-score-number" id="mgTugScoreNumber">双方拉力：50 / 50</p>
      </div>

      <div class="mg-tug-board">
        <div class="mg-tug-fighter mg-tug-player">
          <div class="mg-tug-avatar-frame">
            <img class="mg-tug-avatar-art" src="${assetPath("Image/Portrait/pc.png", "player.png")}" alt="" draggable="false">
          </div>
          <h2>你</h2>
          <p>稳住目标<br>一点点拉回来</p>
        </div>

        <div class="mg-tug-track-wrap">
          <div class="mg-tug-track" id="mgTugTrack" aria-label="垂直抓握区">
            <img class="mg-tug-track-art" src="${assetPath("Image/UI/钓鱼条.png", "track.png")}" alt="" draggable="false">
            <div class="mg-tug-track-line"></div>
            <div class="mg-tug-target" id="mgTugTarget" aria-label="控制杆">
              <img class="mg-tug-target-art" src="${assetPath("Image/UI/钓鱼条_浮块.png", "target.png")}" alt="" draggable="false">
            </div>
            <div class="mg-tug-zone" id="mgTugZone" aria-label="绿色抓握区"></div>
          </div>
          <div class="mg-tug-caption">
            <strong id="mgTugInsideText">寻找抓握时机</strong>
            <span id="mgTugMeterText">目标在绿色区内时，我方进度上升</span>
          </div>
        </div>

        <div class="mg-tug-fighter mg-tug-conductor">
          <div class="mg-tug-avatar-frame">
            <img class="mg-tug-avatar-art" src="${assetPath("Image/Portrait/乘务员.png", "crew.png")}" alt="" draggable="false">
          </div>
          <h2>列车员</h2>
          <p>不断施压<br>别让他抢走控制杆</p>
        </div>
      </div>

      <p class="mg-tug-status" id="mgTugStatus"><strong>拉扯：</strong>把绿色区域移到控制杆上。</p>
      <p class="mg-tug-control">按住空格 / W / ↑ 或鼠标左键：上移　·　松开：下落</p>
    `;
    stage.replaceChildren(root);

    const target = root.querySelector("#mgTugTarget");
    const zone = root.querySelector("#mgTugZone");
    const track = root.querySelector("#mgTugTrack");
    const playerScore = root.querySelector("#mgTugPlayerScore");
    const conductorScore = root.querySelector("#mgTugConductorScore");
    const scoreNumber = root.querySelector("#mgTugScoreNumber");
    const timeText = root.querySelector("#mgTugTime");
    const status = root.querySelector("#mgTugStatus");
    const insideText = root.querySelector("#mgTugInsideText");
    const meterText = root.querySelector("#mgTugMeterText");

    let resolveSettlement = null;
    let frameHandle = 0;
    let finishHandle = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let progress = 50;
    let playerY = 0.59;
    let playerVelocity = 0;
    let targetY = 0.38;
    let targetVelocity = 0.07;
    let finished = false;
    let pointerDown = false;
    const pressedKeys = new Set();

    const finishedPromise = new Promise((resolve) => { resolveSettlement = resolve; });

    const isHolding = () => pointerDown || pressedKeys.size > 0;

    const render = () => {
      const targetCenter = targetY + 0.055;
      const inside = targetCenter >= playerY && targetCenter <= playerY + config.zoneHeight;
      zone.style.top = `${playerY * 100}%`;
      zone.style.height = `${config.zoneHeight * 100}%`;
      target.style.top = `${targetY * 100}%`;
      zone.classList.toggle("is-inside", inside);
      playerScore.style.width = `${progress}%`;
      conductorScore.style.width = `${100 - progress}%`;
      scoreNumber.textContent = `双方拉力：${Math.round(progress)} / ${Math.round(100 - progress)}`;
      insideText.textContent = inside ? "抓住了！" : "脱离抓握区";
      insideText.classList.toggle("is-inside", inside);
      meterText.textContent = inside ? "我方控制权正在上升" : "列车员正在把控制杆拽走";
      return inside;
    };

    const finish = (won) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frameHandle);
      root.classList.add(won ? "is-win" : "is-loss");
      status.innerHTML = won
        ? "<strong>抢到控制杆了。</strong>你猛地压下操作杆。"
        : "<strong>控制杆脱手。</strong>正在返回剧情。";
      insideText.textContent = won ? "控制杆已锁定" : "控制杆脱手";
      meterText.textContent = won ? "正在切换列车控制模式" : "列车员重新抓住了操作杆";
      finishHandle = window.setTimeout(() => resolveSettlement([
        { type: "setFlag", key: "conductor_tug_won", value: won },
        { type: "jump", next: won ? "E_029" : "E_030_TUG" }
      ]), 650);
    };

    const frame = (timestamp) => {
      if (finished) return;
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
        : "<strong>拉扯：</strong>把绿色区域移到控制杆上。";

      if (progress >= 100) { progress = 100; render(); finish(true); return; }
      if (progress <= 0 || elapsed >= config.timeLimit) { progress = Math.max(0, progress); render(); finish(false); return; }
      frameHandle = requestAnimationFrame(frame);
    };

    const onKeyDown = (event) => {
      if (!["Space", "ArrowUp", "KeyW"].includes(event.code)) return;
      event.preventDefault();
      pressedKeys.add(event.code);
    };
    const onKeyUp = (event) => {
      if (!["Space", "ArrowUp", "KeyW"].includes(event.code)) return;
      event.preventDefault();
      pressedKeys.delete(event.code);
    };
    const onPointerDown = (event) => {
      pointerDown = true;
      track.setPointerCapture?.(event.pointerId);
    };
    const onPointerUp = () => { pointerDown = false; };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    context.onQuit(() => null);
    context.registerCleanup(() => {
      cancelAnimationFrame(frameHandle);
      window.clearTimeout(finishHandle);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      pressedKeys.clear();
      pointerDown = false;
    });

    render();
    lastFrame = performance.now();
    frameHandle = requestAnimationFrame(frame);
    return finishedPromise;
  }

  Game.Minigames.register("conductor_tug", {
    title: "控制杆争夺",
    run
  });
})(window.TrainGame);
