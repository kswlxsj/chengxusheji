(function (Game) {
  "use strict";

  const INNER_SCARE = {
    duration: 5000,
    charactersPerSecond: 600,
    tick: 20,
    shakeWidthRatio: 0.01,
    phrase: "停下来"
  };

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
        await context.ui.inspect.show({
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
      await context.ui.inspect.show({
        title: "照亮车厢",
        text: `${itemName}的光芒照亮了2号车厢，你终于看清了那个没有眼睛的Clicker。`,
        image: item.image
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
