(function (Game) {
  "use strict";

  // E-0008 收音机调频小游戏：控制指针追踪不断移动的绿色频段，并持续稳定 3 秒。
  // 顶层只注册编号；DOM、键盘监听、动画帧都延迟到 run()，保证编译器可在无 DOM 环境加载。

  const RESULT_FLAG = "ev0008_radio_tuned";
  const RANGE_SPAN = 64.8;
  const HOLD_DURATION = 3000;
  const RANGE_SPEED_SCALE = 1.08;
  const POINTER_STEP = 10;

  const STYLE_TEXT = `
    .radio-tuning { box-sizing: border-box; width: 100%; height: 100%; min-height: 0; overflow: auto; padding: clamp(14px, 3vw, 28px); color: #f2e9dc; background: radial-gradient(circle at 20% 8%, rgba(213, 159, 101, .16), transparent 30%), repeating-linear-gradient(10deg, rgba(255, 225, 180, .035) 0 2px, transparent 2px 25px), linear-gradient(135deg, #17100f, #40271d 50%, #100c0c); font-family: Georgia, "Microsoft YaHei", sans-serif; }
    .radio-tuning * { box-sizing: border-box; }
    .radio-tuning button { font: inherit; }
    .rt-shell { width: min(860px, 100%); min-height: 100%; margin: auto; padding: clamp(18px, 4vw, 42px); border: 1px solid rgba(255, 226, 184, .18); border-radius: 4px; background: repeating-linear-gradient(0deg, rgba(255, 225, 180, .03) 0 1px, transparent 1px 17px), linear-gradient(145deg, rgba(124, 80, 50, .97), rgba(54, 33, 26, .98) 55%, rgba(27, 19, 19, .99)); box-shadow: 0 24px 72px rgba(0, 0, 0, .58), inset 0 0 90px rgba(0, 0, 0, .34); }
    .rt-kicker { margin: 0 0 7px; color: #e2ad70; font-size: 12px; letter-spacing: .17em; text-transform: uppercase; }
    .rt-title { margin: 0; color: #f2e9dc; font-size: clamp(27px, 5vw, 46px); letter-spacing: .08em; }
    .rt-subtitle { margin: 10px 0 0; color: #b8aa9b; line-height: 1.7; }
    .rt-radio { margin: 28px auto 0; padding: clamp(18px, 4vw, 34px); border: 2px solid #66564d; border-radius: 16px 16px 8px 8px; background: linear-gradient(115deg, rgba(255, 255, 255, .035), transparent 35%), linear-gradient(160deg, #352a27, #171212 72%); box-shadow: inset 0 0 40px rgba(0, 0, 0, .38); }
    .rt-radio-top { display: grid; grid-template-columns: 1fr minmax(210px, 330px) 1fr; gap: 18px; align-items: center; }
    .rt-speaker { height: 74px; border-radius: 10px; opacity: .7; background: radial-gradient(circle, #9d8f87 0 2px, transparent 3px) 0 0 / 14px 14px, linear-gradient(135deg, #5f514a, #261e1c); }
    .rt-screen { min-height: 74px; display: grid; place-items: center; padding: 10px; border: 9px solid #191312; border-radius: 8px; color: #9fc786; background: #172119; box-shadow: inset 0 0 18px rgba(159, 199, 134, .16), 0 2px 0 #7b675a; text-align: center; }
    .rt-screen-label { display: block; color: #73916b; font-size: 11px; letter-spacing: .12em; }
    .rt-screen-value { display: block; margin-top: 3px; font-size: clamp(15px, 2vw, 21px); }
    .rt-tracker { display: grid; grid-template-columns: minmax(240px, 1fr) minmax(190px, .7fr); gap: clamp(20px, 5vw, 48px); align-items: center; margin-top: 30px; }
    .rt-dial { --needle-angle: 0deg; --range-start: 0deg; --range-span: 64.8deg; position: relative; width: min(330px, 68vw); aspect-ratio: 1; margin: auto; border: 12px solid #2c2523; border-radius: 50%; cursor: pointer; background: repeating-conic-gradient(from -1deg, rgba(226, 173, 112, .24) 0deg 1deg, transparent 1deg 10deg), radial-gradient(circle, #342a27 0 52%, #201817 53% 70%, #4b3932 71% 76%, #1a1312 77%); box-shadow: 0 10px 30px rgba(0, 0, 0, .5), inset 0 0 0 3px rgba(226, 173, 112, .22); }
    .rt-dial::before { content: ""; position: absolute; inset: 12%; border-radius: 50%; background: conic-gradient(from var(--range-start), transparent 0deg, transparent 5deg, rgba(159, 199, 134, .2) 5deg, #9fc786 5deg calc(5deg + var(--range-span)), transparent calc(5deg + var(--range-span)) 360deg); filter: drop-shadow(0 0 8px rgba(159, 199, 134, .7)); transition: filter .15s ease; }
    .rt-dial.in-range::before { filter: drop-shadow(0 0 14px rgba(159, 199, 134, .95)); }
    .rt-needle { position: absolute; left: 50%; bottom: 50%; width: 5px; height: 39%; border-radius: 6px; background: #efb45f; box-shadow: 0 0 8px rgba(239, 180, 95, .75); transform: translateX(-50%) rotate(var(--needle-angle)); transform-origin: 50% 100%; }
    .rt-hub { position: absolute; inset: 43%; display: grid; place-items: center; border: 3px solid #a4876c; border-radius: 50%; color: #f2e9dc; background: #2c2523; font-size: 11px; }
    .rt-panel { min-width: 0; padding: 18px; border: 1px solid rgba(255, 226, 184, .17); background: rgba(20, 14, 13, .62); }
    .rt-angle { margin: 0 0 20px; color: #efb45f; font-size: clamp(27px, 5vw, 44px); letter-spacing: .12em; text-align: center; }
    .rt-hold-label { display: flex; justify-content: space-between; gap: 8px; color: #d5c6ae; font-size: 12px; }
    .rt-hold-track { height: 12px; margin-top: 8px; overflow: hidden; border: 1px solid #66564d; background: #120d0a; }
    .rt-hold-fill { width: 0; height: 100%; background: linear-gradient(90deg, #9fc786, #55d0d4); transition: width .08s linear; }
    .rt-instruction { margin: 22px 0 0; color: #b8aa9b; font-size: 13px; line-height: 1.7; text-align: center; }
    .rt-instruction kbd { display: inline-block; min-width: 24px; margin: 0 2px; padding: 2px 6px; border: 1px solid #806a59; border-radius: 3px; color: #f2e9dc; background: #2c2523; }
    .rt-status { min-height: 42px; margin: 18px 0 0; color: #b8aa9b; font-size: 13px; line-height: 1.55; text-align: center; }
    .rt-status.stable { color: #9fc786; }
    .rt-result { margin: 28px auto 0; padding: 30px 24px; border: 1px solid rgba(159, 199, 134, .55); color: #f2e9dc; background: rgba(18, 31, 22, .8); text-align: center; }
    .rt-result h2 { margin: 0; color: #9fc786; font-size: clamp(24px, 4vw, 37px); }
    .rt-result p { margin: 12px 0 0; color: #b8aa9b; line-height: 1.7; }
    @media (max-width: 650px) { .rt-radio-top { grid-template-columns: 1fr; } .rt-speaker { display: none; } .rt-tracker { grid-template-columns: 1fr; } .rt-dial { width: min(280px, 78vw); } }
  `;

  const TEMPLATE = `
    <section class="rt-shell" aria-live="polite">
      <p class="rt-kicker">E-0008 · Signal Tracking</p>
      <h1 class="rt-title">动态范围调频</h1>
      <p class="rt-subtitle">绿色频段会不断移动。控制指针跟随它，并连续稳定 3 秒，尝试解码这台收音机里的广播。</p>
      <section class="rt-radio" aria-label="动态范围收音机">
        <div class="rt-radio-top">
          <div class="rt-speaker" aria-hidden="true"></div>
          <div class="rt-screen"><span class="rt-screen-label">SIGNAL HOLD</span><strong class="rt-screen-value" data-screen>未捕获</strong></div>
        </div>
        <div class="rt-tracker">
          <button class="rt-dial" type="button" data-dial aria-label="调频圆盘">
            <span class="rt-needle" aria-hidden="true"></span><span class="rt-hub" aria-hidden="true">指针</span>
          </button>
          <div class="rt-panel">
            <p class="rt-angle" data-angle>000°</p>
            <div class="rt-hold-label"><span>稳定时间</span><span data-hold-time>0.0 / 3.0 秒</span></div>
            <div class="rt-hold-track"><div class="rt-hold-fill" data-hold-fill></div></div>
            <p class="rt-instruction"><kbd>←</kbd><kbd>→</kbd> 或 <kbd>A</kbd><kbd>D</kbd><br>旋转指针追踪绿色频段</p>
            <p class="rt-status" data-status>让指针进入绿色频段。</p>
          </div>
        </div>
      </section>
      <section class="rt-result" data-result hidden>
        <h2>信号捕获成功</h2><p>指针稳定达成，广播正在解码……</p>
      </section>
    </section>
  `;

  function normalize(angle) {
    return (angle + 360) % 360;
  }

  function angleDistance(left, right) {
    const difference = Math.abs(left - right);
    return Math.min(difference, 360 - difference);
  }

  function run(context) {
    if (!context.stage) return Promise.resolve(null);

    const root = document.createElement("div");
    root.className = "radio-tuning";
    root.innerHTML = `<style>${STYLE_TEXT}</style>${TEMPLATE}`;
    context.stage.append(root);

    const dial = root.querySelector("[data-dial]");
    const screen = root.querySelector("[data-screen]");
    const angleReadout = root.querySelector("[data-angle]");
    const holdTime = root.querySelector("[data-hold-time]");
    const holdFill = root.querySelector("[data-hold-fill]");
    const status = root.querySelector("[data-status]");
    const result = root.querySelector("[data-result]");

    let pointerAngle = 0;
    let pointerDisplayAngle = 0;
    let rangeCenter = 0;
    let rangeSpeed = 0;
    let nextDirectionChange = 0;
    let heldFor = 0;
    let lastFrame = 0;
    let animationFrame = 0;
    let resolved = false;
    let resolveFinish;
    const finished = new Promise((resolve) => { resolveFinish = resolve; });

    function isPointerInside() {
      return angleDistance(pointerAngle, rangeCenter) <= RANGE_SPAN / 2;
    }

    function render(inside) {
      const rangeStart = normalize(rangeCenter - RANGE_SPAN / 2);
      dial.style.setProperty("--needle-angle", `${pointerDisplayAngle}deg`);
      dial.style.setProperty("--range-start", `${rangeStart}deg`);
      dial.style.setProperty("--range-span", `${RANGE_SPAN}deg`);
      dial.classList.toggle("in-range", inside);
      angleReadout.textContent = `${String(Math.round(pointerAngle)).padStart(3, "0")}°`;
      const progress = Math.min(1, heldFor / HOLD_DURATION);
      holdFill.style.width = `${progress * 100}%`;
      holdTime.textContent = `${(heldFor / 1000).toFixed(1)} / 3.0 秒`;
      screen.textContent = inside ? `锁定 ${(progress * 100).toFixed(0)}%` : "未捕获";
      status.classList.toggle("stable", inside);
      status.textContent = inside ? "信号稳定，继续跟随绿色频段。" : "让指针进入绿色频段；离开范围会重新计时。";
    }

    function randomizeRangeMotion(now) {
      const direction = Math.random() > .5 ? 1 : -1;
      rangeSpeed = direction * (44 + Math.random() * 32) * RANGE_SPEED_SCALE;
      nextDirectionChange = now + 450 + Math.random() * 850;
    }

    async function finish() {
      if (resolved) return;
      resolved = true;
      cancelAnimationFrame(animationFrame);
      holdFill.style.width = "100%";
      holdTime.textContent = "3.0 / 3.0 秒";
      screen.textContent = "SIGNAL LOCKED";
      status.classList.add("stable");
      status.textContent = "稳定时间达成，正在解码广播……";
      result.hidden = false;
      await context.wait(720);
      resolveFinish([{ type: "setFlag", key: RESULT_FLAG, value: true }]);
    }

    function tick(now) {
      if (resolved) return;
      const elapsed = Math.min(80, now - lastFrame);
      lastFrame = now;
      if (now >= nextDirectionChange) randomizeRangeMotion(now);
      rangeCenter = normalize(rangeCenter + rangeSpeed * elapsed / 1000);
      const inside = isPointerInside();
      heldFor = inside ? heldFor + elapsed : 0;
      render(inside);
      if (heldFor >= HOLD_DURATION) void finish();
      else animationFrame = requestAnimationFrame(tick);
    }

    function rotate(direction) {
      if (resolved) return;
      pointerAngle = normalize(pointerAngle + direction * POINTER_STEP);
      pointerDisplayAngle += direction * POINTER_STEP;
      render(isPointerInside());
    }

    function onKeydown(event) {
      const key = event.key.toLowerCase();
      if (!["arrowleft", "arrowright", "a", "d"].includes(key)) return;
      event.preventDefault();
      rotate(key === "arrowright" || key === "d" ? 1 : -1);
    }

    context.onQuit(() => {
      if (resolved) return null;
      resolved = true;
      cancelAnimationFrame(animationFrame);
      return [{ type: "setFlag", key: RESULT_FLAG, value: false }];
    });

    context.registerCleanup(() => {
      cancelAnimationFrame(animationFrame);
      root.removeEventListener("keydown", onKeydown);
      root.remove();
    });

    root.addEventListener("keydown", onKeydown);
    dial.addEventListener("click", () => dial.focus());
    pointerAngle = 0;
    rangeCenter = 82 + Math.random() * 80;
    randomizeRangeMotion(performance.now());
    lastFrame = performance.now();
    render(false);
    dial.focus();
    animationFrame = requestAnimationFrame(tick);
    return finished;
  }

  Game.Minigames.register("radio_tuning", {
    title: "收音机调频",
    run
  });
})(window.TrainGame);
