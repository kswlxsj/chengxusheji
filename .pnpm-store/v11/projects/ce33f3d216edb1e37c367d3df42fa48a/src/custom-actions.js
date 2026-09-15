(function (Game) {
  "use strict";

  const INNER_SCARE = {
    duration: 5000,
    charactersPerSecond: 600,
    tick: 20,
    shakeWidthRatio: 0.01,
    phrase: "停下来"
  };

  function requireGameShell() {
    const shell = document.querySelector("#game-shell");
    if (!shell) throw new Error("找不到游戏舞台 #game-shell");
    return shell;
  }

  Game.registerProjectActions = function registerProjectActions(engine) {
    // JSON 只能调用这里显式注册过的名称，不能执行任意字符串代码。
    engine.registerCustomAction("refreshScene", async (params, context) => {
      await context.engine.loadScene(context.state.sceneId);
    });

    engine.registerCustomAction("innerWhisperScare", async (params, context) => {
      context.ui.closeDialog();
      const shell = document.querySelector("#game-shell");
      const overlay = document.createElement("div");
      overlay.className = "inner-whisper-scare";
      overlay.setAttribute("aria-label", "停下来");
      const text = document.createElement("div");
      text.className = "inner-whisper-text";
      text.setAttribute("aria-hidden", "true");
      overlay.append(text);
      shell.append(overlay);
      const config = INNER_SCARE;
      const total = Math.ceil(config.duration * config.charactersPerSecond / 1000);
      const message = config.phrase.repeat(Math.ceil(total / config.phrase.length));
      try {
        for (let elapsed = 0; elapsed < config.duration;) {
          const count = Math.floor((elapsed + config.tick) * config.charactersPerSecond / 1000);
          text.textContent = message.slice(0, count);
          const amplitude = shell.clientWidth * config.shakeWidthRatio;
          text.style.transform = `translate(${(Math.random() * 2 - 1) * amplitude}px, ${(Math.random() * 2 - 1) * amplitude}px)`;
          overlay.scrollTop = overlay.scrollHeight;
          // 字符增长和震动共用可暂停计时，取消时由 finally 清理。
          // 累计实际有效等待时间，避免 Windows 定时器精度让5秒演出拖长。
          elapsed += await context.wait(Math.min(config.tick, config.duration - elapsed));
          context.throwIfCancelled();
        }
      } finally {
        overlay.remove();
      }
    });

    // 不使用对话框的全屏 CG 字幕。等待走事件计时器，因此暂停不会吃掉演出时间，
    // 取消/读档时 finally 也会移除覆盖层。
    engine.registerCustomAction("centeredCinematic", async (params, context) => {
      context.ui.closeDialog();
      if (typeof document === "undefined") return;
      const shell = requireGameShell();
      const overlay = document.createElement("section");
      overlay.className = `inner-cinematic${params.flash === true ? " is-flashback" : ""}`;
      overlay.setAttribute("aria-label", String(params.text || "剧情画面"));
      const image = document.createElement("img");
      image.src = String(params.image || "");
      image.alt = "";
      image.decoding = "async";
      const text = document.createElement("p");
      text.textContent = String(params.text || "");
      overlay.append(image, text);
      shell.append(overlay);
      try {
        await context.engine.waitFor(image.decode(), undefined, {
          timeoutMs: 15000,
          label: "里世界演出图片"
        });
        await context.wait(Math.max(0, Number(params.duration) || 1800));
      } finally {
        overlay.remove();
      }
    });

    // 带可暂停倒计时的剧情选项。超时会采用数据里指定的默认项。
    engine.registerCustomAction("timedStoryChoice", async (params, context) => {
      const duration = Math.max(1000, Number(params.duration) || 5000);
      const options = Array.isArray(params.options) ? params.options : [];
      if (!options.length) throw new Error("timedStoryChoice 缺少 options");
      const fallback = options.find((option) => option.value === params.defaultValue) || options[0];
      let settled = false;
      const selection = context.ui.choice.choose("", options).then((value) => {
        settled = true;
        return value;
      });
      const countdown = (async () => {
        let remaining = duration;
        while (!settled && remaining > 0) {
          const seconds = Math.ceil(remaining / 1000);
          const heading = context.ui.choice.element?.querySelector?.("h2");
          if (heading) heading.textContent = `${params.prompt || "请选择"}（${seconds}秒）`;
          const slice = Math.min(250, remaining);
          await context.wait(slice);
          remaining -= slice;
        }
        return settled ? null : fallback;
      })();
      let selected = await Promise.race([selection, countdown]);
      if (!selected) selected = fallback;
      settled = true;
      context.ui.choice.close?.(selected);
      context.state.flags[String(params.flag || "timed_story_choice")] = selected.value;
    });

    // 假2号车厢的四次拍击。演出期间只放行左门；玩家抢先点门时，
    // 当前事件直接播放打不开的三句对白，之后继续剩余拍击。
    engine.registerCustomAction("fakeCarriageHandprints", async (params, context) => {
      const flags = Array.isArray(params.flags) ? params.flags : [];
      if (!flags.length) throw new Error("fakeCarriageHandprints 缺少 flags");
      if (context.state.flags[String(params.doneFlag)] === true) return;
      const sound = String(params.sound || "knocking_wall");
      const interval = Math.max(150, Number(params.interval) || 650);

      if (typeof document === "undefined") {
        for (const flag of flags) {
          context.state.flags[flag] = true;
          context.ui.audio?.play?.(sound);
        }
        context.state.flags[String(params.doneFlag)] = true;
        return;
      }

      const originalClick = context.scene.onObjectClick;
      let resolveDoorAttempt = null;
      context.scene.onObjectClick = (eventId, object) => {
        if (eventId === params.lockedEvent && resolveDoorAttempt) {
          const resolve = resolveDoorAttempt;
          resolveDoorAttempt = null;
          resolve("door");
          return;
        }
        if (typeof originalClick === "function" && eventId !== params.lockedEvent) {
          originalClick(eventId, object);
        }
      };
      context.scene.setInteractionEnabled(true);

      try {
        for (let index = 0; index < flags.length; index += 1) {
          context.state.flags[flags[index]] = true;
          context.scene.refresh();
          context.scene.setInteractionEnabled(true);
          context.ui.audio?.play?.(sound);
          if (index === flags.length - 1) break;

          const attempted = new Promise((resolve) => { resolveDoorAttempt = resolve; });
          const outcome = await Promise.race([
            context.wait(interval).then(() => "tick"),
            attempted
          ]);
          resolveDoorAttempt = null;
          if (outcome !== "door") continue;

          context.scene.setInteractionEnabled(false);
          for (const line of ["怎么打不开！", "求求你了…快点开门！", "开门啊！"]) {
            await context.ui.dialog.showLine({ speaker: "Pc（惊恐）", text: line });
          }
          context.ui.closeDialog();
          context.scene.setInteractionEnabled(true);
        }
        context.state.flags[String(params.doneFlag)] = true;
      } finally {
        resolveDoorAttempt = null;
        context.scene.onObjectClick = originalClick;
        context.scene.setInteractionEnabled(false);
      }
    });

    // 黑场内完成切景，避免先移除黑幕再换背景产生一帧闪回。
    engine.registerCustomAction("fadeScene", async (params, context) => {
      if (typeof document === "undefined") {
        await context.engine.loadScene(params.scene);
        return;
      }
      const shell = requireGameShell();
      const overlay = document.createElement("div");
      overlay.className = "inner-fade-transition";
      shell.append(overlay);
      try {
        void overlay.offsetWidth;
        overlay.classList.add("is-black");
        await context.wait(Math.max(0, Number(params.fadeIn) || 1600));
        await context.wait(80);
        await context.engine.loadScene(params.scene);
        await context.wait(Math.max(0, Number(params.hold) || 500));
        overlay.classList.add("is-revealing");
        await context.wait(Math.max(0, Number(params.fadeOut) || 900));
      } finally {
        overlay.remove();
      }
    });
    engine.registerCustomAction("flashScreen", async (params, context) => {
      const shell = document.querySelector("#game-shell");
      shell.classList.remove("flash");
      void shell.offsetWidth;
      shell.classList.add("flash");
      try {
        await context.wait(Number(params.duration || 450));
      } finally {
        shell.classList.remove("flash");
      }
    });

    engine.registerCustomAction("useLight", async (params, context) => {
      const item = context.items.get(params.item);
      if (!item) throw new Error(`照明物品不存在：${params.item || "空"}`);
      const itemName = item.name;
      const inCarriage02 = context.state.sceneId === "carriage_02";
      const alreadyLit = context.state.flags.light_used === true;
      if (!inCarriage02 || alreadyLit) {
        await context.ui.itemInspect.show({
          title: itemName,
          text: alreadyLit
            ? `${itemName}的光芒仍然照得清前方的车厢。`
            : item.description,
          image: item.image
        });
        return;
      }
      const use = await context.ui.choice.choose(`要使用${itemName}照亮前方吗？`, [
        { label: `使用${itemName}`, value: true },
        { label: "暂不使用", value: false }
      ]);
      if (!use || use.value !== true) return;
      context.state.flags.light_used = true;
      context.state.flags.light_type = params.item;
      await context.ui.dialog.showLine({
        text: `${itemName}的光束照亮了2号车厢的一角，你终于看清了那个没有眼睛的Clicker。`
      });
    });

    engine.registerCustomAction("endGame", async (params, context) => {
      const reason = params.reason;
      if (!["true_end", "bad_end", "lost", "trauma"].includes(reason)) {
        throw new Error(`未知结局类型：${reason || "空"}`);
      }
      context.state.flags.ending_reason = reason;
    });

    // 按权重随机分岔（静默判定）：掷一次权重表，把选中结果的旗标置 true、其余置 false，
    // 由事件里的 conditionalJump 读取分支。不弹任何窗口，玩家只看到剧情结果。
    // params.outcomes = [{ weight: 10, flag: "ev502_return_eaten" }, ...]，权重为正数、顺序即掷点区间顺序。
    engine.registerCustomAction("weightedBranch", async (params, context) => {
      const outcomes = Array.isArray(params.outcomes) ? params.outcomes : [];
      if (!outcomes.length) throw new Error("weightedBranch 缺少 outcomes 列表");
      for (const outcome of outcomes) {
        if (!outcome || typeof outcome !== "object" || Array.isArray(outcome)) {
          throw new Error("weightedBranch 的 outcomes 存在无效条目");
        }
        if (typeof outcome.flag !== "string" || !outcome.flag) {
          throw new Error("weightedBranch 的每个结果都需要 flag");
        }
        if (!Number.isFinite(outcome.weight) || outcome.weight <= 0) {
          throw new Error(`weightedBranch 的权重无效：${outcome.flag}`);
        }
      }
      const total = outcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
      const roll = Math.random() * total;
      let accumulated = 0;
      let picked = outcomes[outcomes.length - 1];
      for (const outcome of outcomes) {
        accumulated += outcome.weight;
        if (roll < accumulated) {
          picked = outcome;
          break;
        }
      }
      for (const outcome of outcomes) {
        context.state.flags[outcome.flag] = outcome === picked;
      }
    });
  };
})(window.TrainGame);
