(function (Game) {
  "use strict";

  class Registry {
    constructor(label) {
      this.label = label;
      this.entries = new Map();
    }

    register(name, handler) {
      if (typeof handler !== "function") throw new TypeError(`${this.label} 必须注册函数`);
      if (this.entries.has(name)) throw new Error(`${this.label} 重复注册：${name}`);
      this.entries.set(name, handler);
    }

    get(name) {
      const handler = this.entries.get(name);
      if (!handler) throw new Error(`${this.label} 未注册：${name}`);
      return handler;
    }

    keys() {
      return [...this.entries.keys()];
    }
  }

  class EventCancelled extends Error {
    constructor() {
      super("事件已取消");
      this.name = "EventCancelled";
    }
  }

  class TerminalStateReached extends Error {
    constructor() {
      super("游戏已进入终止状态");
      this.name = "TerminalStateReached";
    }
  }

  // 小游戏结算动作列表的长度上限，防止模块返回无界列表拖垮事件链。
  const MINIGAME_SETTLEMENT_LIMIT = 100;
  const SCENE_RESOURCE_TIMEOUT_MS = 20000;
  const DIALOGUE_TERMINATORS = new Set(["。", "！", "？", "!", "?"]);
  const DIALOGUE_TRAILING_MARKS = new Set([
    "\"", "'", "”", "’", "」", "』", "】", "）", ")", "》", "〉", "›", "»"
  ]);

  // 一句话只占一个对话框：保留句末标点和尾随引号，空白行也作为分段边界。
  function splitDialogueText(value) {
    const text = String(value ?? "");
    const paragraphs = text.split(/\r?\n[ \t]*\r?\n/);
    const lines = [];

    for (const paragraph of paragraphs) {
      const normalized = paragraph.replace(/\s*\r?\n\s*/g, " ").trim();
      if (!normalized) continue;

      let start = 0;
      for (let index = 0; index < normalized.length;) {
        if (!DIALOGUE_TERMINATORS.has(normalized[index])) {
          index += 1;
          continue;
        }

        index += 1;
        while (
          index < normalized.length
          && (
            DIALOGUE_TERMINATORS.has(normalized[index])
            || DIALOGUE_TRAILING_MARKS.has(normalized[index])
          )
        ) {
          index += 1;
        }

        const line = normalized.slice(start, index).trim();
        if (line) lines.push(line);
        start = index;
      }

      const line = normalized.slice(start).trim();
      if (line) lines.push(line);
    }

    return lines.length ? lines : [text];
  }

  class EventEngine {
    constructor({
      events,
      state,
      scene,
      ui,
      items,
      shouldTerminate = () => false,
      onTerminate = () => {},
      onCheckCompleted = async () => {}
    }) {
      this.events = new Map(events.map((event) => [event.id, event]));
      this.items = new Map(items.map((item) => [item.id, item]));
      this.state = state;
      this.scene = scene;
      this.ui = ui;
      this.actions = new Registry("动作类型");
      this.customActions = new Registry("自定义动作");
      this.busy = false;
      this.paused = false;
      this.waitReason = null;
      this.activeRun = null;
      this.runSerial = 0;
      this.pauseWaiters = new Set();
      this.timers = new Set();
      this.pendingWaits = new Set();
      this.stableSnapshot = state.snapshot();
      this.onStateChanged = () => {};
      this.shouldTerminate = shouldTerminate;
      this.onTerminate = onTerminate;
      this.onCheckCompleted = onCheckCompleted;
      this.registerBuiltIns();
    }

    registerAction(type, handler) {
      this.actions.register(type, handler);
    }

    registerCustomAction(name, handler) {
      this.customActions.register(name, handler);
    }

    registerBuiltIns() {
      this.registerAction("dialogue", async (action) => {
        const run = this.activeRun;
        await this.waitFor(this.scene.whenReady(), run, {
          timeoutMs: SCENE_RESOURCE_TIMEOUT_MS,
          label: "场景图片"
        });
        await this.waitWhilePaused(run);
        for (const text of splitDialogueText(action.text)) {
          await this.ui.dialog.showLine({ ...action, text });
        }
      });

      this.registerAction("inspect", async (action) => {
        if (!action.item) {
          await this.ui.inspect.show(action);
          return;
        }
        const item = this.items.get(action.item);
        if (!item) throw new Error(`调查物品未注册：${action.item}`);
        await this.ui.inspect.show({
          title: action.title || item.name,
          text: action.text || item.description,
          image: action.image || item.image,
          large: action.large === true
        });
      });

      this.registerAction("choice", async (action) => {
        this.ui.closeDialog();
        const options = action.options.filter((option) => Game.evaluateCondition(option.when, this.state));
        if (!options.length) throw new Error(`选项动作没有可用选项：${action.id || "未命名"}`);
        const selected = await this.ui.choice.choose(action.prompt, options);
        return selected ? { next: selected.next, stop: true } : null;
      });

      this.registerAction("check", async (action) => {
        if (!Game.Dice) throw new Error("检定系统未加载：缺少 src/dice.js");
        const outcomes = Array.isArray(action.outcomes) ? action.outcomes : [];
        const resolver = Game.Dice.get(action.dice);
        const index = await resolver(this.context(), outcomes);
        const hasBranch = outcomes.length > 0;
        if (hasBranch && (!Number.isInteger(index) || index < 0 || index >= outcomes.length)) {
          throw new Error(`检定 ${action.dice} 返回了无效的结果编号：${index}`);
        }
        // 自动留痕：以 dice 编号为键写入最小记录；检定函数可先写入补充字段，此处合并保留。
        this.state.checkResults[action.dice] = Object.assign(
          {},
          this.state.checkResults[action.dice],
          { dice: action.dice, outcome: hasBranch ? index : null }
        );
        await this.onCheckCompleted(action, hasBranch ? index : null);
        if (!hasBranch) return null;
        return { next: outcomes[index], stop: true };
      });

      this.registerAction("changeScene", async (action) => {
        this.ui.closeDialog();
        await this.loadScene(action.scene);
      });

      this.registerAction("setFlag", async (action) => {
        this.state.flags[action.key] = action.value;
      });

      this.registerAction("modifyAttribute", async (action) => {
        this.state.modifyAttribute(action.attribute, action.amount);
      });

      this.registerAction("setSkill", async (action) => {
        this.state.setSkill(action.skill, action.value);
      });

      this.registerAction("learnSkill", async (action) => {
        this.state.learnSkill(action.skill);
      });

      this.registerAction("loseSkill", async (action) => {
        this.state.loseSkill(action.skill);
      });

      this.registerAction("addItem", async (action) => {
        const item = this.items.get(action.item);
        if (!item) throw new Error(`物品不存在：${action.item}`);
        const alreadyOwned = this.state.inventory.includes(action.item);
        this.state.addItem(action.item);
        if (!alreadyOwned) {
          this.ui.showAcquisition?.({
            name: item.name,
            image: item.image,
            detail: "已加入物品栏"
          });
        }
      });

      this.registerAction("removeItem", async (action) => {
        if (!this.items.has(action.item)) throw new Error(`物品不存在：${action.item}`);
        this.state.removeItem(action.item);
      });

      this.registerAction("setObjectState", async (action) => {
        this.state.setObjectState(action.object, action.patch);
      });

      // 小游戏结算专用跳转动作：模块返回后把当前事件链切到指定事件。
      this.registerAction("jump", async (action) => {
        if (typeof action.next !== "string" || !action.next) {
          throw new Error("跳转动作缺少目标事件编号");
        }
        return { next: action.next, stop: true };
      });

      // 条件成立时结束当前事件并进入指定事件；用于把物件调查完成状态接到剧情入口。
      this.registerAction("conditionalJump", async (action) => {
        if (!Game.evaluateCondition(action.when, this.state)) return null;
        if (typeof action.next !== "string" || !action.next) {
          throw new Error("条件跳转动作缺少目标事件编号");
        }
        return { next: action.next, stop: true };
      });

      this.registerAction("custom", async (action) => {
        const handler = this.customActions.get(action.name);
        await handler(action.params || {}, this.context());
      });

      // 小游戏动作：JSON 只写注册表索引（仿 check→dice.js 的分离架构，不做分支假设）。
      // 小游戏模块可自由选择返回或不返回一个动作列表；解释器拿到动作列表时按当前事件的
      // 语义顺序执行（含暂停/取消/终止检查，见 runAction），列表为空或未返回则无事发生。
      this.registerAction("minigame", async (action) => {
        if (!Game.Minigames) throw new Error("小游戏系统未加载：缺少 src/minigames.js");
        const spec = Game.Minigames.get(action.game);
        const host = this.ui.minigame || null;
        const stage = host ? host.openAndStage(spec.title) : null;
        const context = this.context();
        const cleanups = [];
        const gameContext = {
          ...context,
          stage,
          // 注册“退出小游戏”按钮的结算提供者；未注册时退出视为放弃、无结算。
          onQuit: (provider) => {
            if (host && typeof provider === "function") host.setQuitProvider(provider);
          },
          // 模块在此登记收尾函数（取消 rAF/移除监听/释放 GL 等），宿主关闭后统一执行一次。
          registerCleanup: (fn) => {
            if (typeof fn === "function") cleanups.push(fn);
          }
        };
        let settlement = null;
        try {
          const running = Promise.resolve(spec.run(gameContext));
          if (!host) {
            settlement = await running;
          } else {
            // 自然结束与“退出”按钮二者取其先；退出先行时 running 的后发拒绝被吞掉，
            // 只记日志，不打断剧情（正常路径的失败仍会经 Promise.race 抛给事件链回滚）。
            const quit = host.quitPromise();
            settlement = await Promise.race([
              running.then((value) => ({ value })),
              quit.then((value) => ({ value }))
            ]).then((winner) => winner.value);
            running.catch((error) => console.error("小游戏运行异常：", error));
          }
        } finally {
          for (const cleanup of cleanups) {
            try { cleanup(); } catch (error) { console.error("小游戏收尾失败：", error); }
          }
          if (host) host.close();
        }
        if (!Array.isArray(settlement) || settlement.length === 0) return null;
        if (settlement.length > MINIGAME_SETTLEMENT_LIMIT) {
          throw new Error(`小游戏 ${action.game} 返回的结算动作超过 ${MINIGAME_SETTLEMENT_LIMIT} 条`);
        }
        let result = null;
        for (const item of settlement) {
          if (!item || typeof item !== "object" || typeof item.type !== "string") {
            throw new Error(`小游戏 ${action.game} 返回了无效的结算动作`);
          }
          if (item.type === "minigame") {
            throw new Error("小游戏结算动作里不能再嵌套小游戏");
          }
          result = await this.runAction(item);
          if (result && result.stop) break;
        }
        return result;
      });
    }

    context() {
      const run = this.activeRun;
      return {
        state: this.state,
        scene: this.scene,
        ui: this.ui,
        engine: this,
        items: this.items,
        attributes: this.state.attributeDefinitions,
        skills: this.state.skillDefinitions,
        wait: (milliseconds) => this.wait(milliseconds, run),
        throwIfCancelled: () => this.assertActive(run)
      };
    }

    // 执行单个动作的公共步骤：暂停等待 → 调处理器 → 校验运行仍有效 → 刷新状态 → 终止检查。
    // 事件主循环与小游戏结算动作列表共用同一语义，避免两套行为分叉。
    async runAction(action) {
      const run = this.activeRun;
      await this.waitWhilePaused(run);
      const result = await this.actions.get(action.type)(action, this.context());
      this.assertActive(run);
      this.onStateChanged();
      if (this.shouldTerminate(this.state)) throw new TerminalStateReached();
      return result;
    }

    getStableSnapshot() {
      return Game.deepClone(this.stableSnapshot);
    }

    async loadScene(sceneId) {
      const run = this.activeRun;
      await this.waitFor(this.scene.prepare(sceneId), run, {
        timeoutMs: SCENE_RESOURCE_TIMEOUT_MS,
        label: "场景资源"
      });
      await this.waitWhilePaused(run);
      this.scene.load(sceneId);
      await this.waitFor(this.scene.whenReady(), run, {
        timeoutMs: SCENE_RESOURCE_TIMEOUT_MS,
        label: "场景图片"
      });
      await this.waitWhilePaused(run);
    }

    // 图片加载本身不能取消，但取消事件必须立即结束等待，且不提交迟到的画面。
    async waitFor(promise, run = this.activeRun, options = {}) {
      this.assertActive(run);
      const timeoutMs = Math.max(0, Number(options.timeoutMs) || 0);
      const label = options.label || "资源";
      const previousWaitReason = this.waitReason;
      this.waitReason = label;
      let pending;
      let timeoutHandle = null;
      const cancelled = new Promise((resolve, reject) => {
        pending = { run, reject };
        this.pendingWaits.add(pending);
      });
      const waits = [promise, cancelled];
      if (timeoutMs > 0) {
        waits.push(new Promise((resolve, reject) => {
          timeoutHandle = setTimeout(() => reject(new Error(`${label}加载超时`)), timeoutMs);
        }));
      }
      try {
        const result = await Promise.race(waits);
        this.assertActive(run);
        return result;
      } finally {
        if (timeoutHandle !== null) clearTimeout(timeoutHandle);
        if (this.waitReason === label) this.waitReason = previousWaitReason;
        this.pendingWaits.delete(pending);
      }
    }

    adoptStableState() {
      this.stableSnapshot = this.state.snapshot();
    }

    restoreStableState() {
      this.state.restore(this.stableSnapshot);
      if (this.state.sceneId) this.scene.load(this.state.sceneId);
      this.onStateChanged();
    }

    setPaused(value) {
      if (this.paused === value) return;
      this.paused = value;
      this.ui.setPaused(value);
      for (const timer of this.timers) {
        if (value) this.pauseTimer(timer);
        else this.startTimer(timer);
      }
      if (!value) {
        for (const resolve of this.pauseWaiters) resolve();
        this.pauseWaiters.clear();
      }
    }

    waitWhilePaused(run) {
      this.assertActive(run);
      if (!this.paused) return Promise.resolve();
      return new Promise((resolve) => this.pauseWaiters.add(resolve)).then(() => this.assertActive(run));
    }

    wait(milliseconds, run = this.activeRun) {
      this.assertActive(run);
      const duration = Math.max(0, Number(milliseconds) || 0);
      return new Promise((resolve, reject) => {
        const timer = {
          run,
          remaining: duration,
          elapsed: 0,
          startedAt: 0,
          handle: null,
          resolve,
          reject
        };
        this.timers.add(timer);
        if (!this.paused) this.startTimer(timer);
      });
    }

    startTimer(timer) {
      if (timer.handle !== null || !this.timers.has(timer)) return;
      timer.startedAt = performance.now();
      timer.handle = setTimeout(() => {
        timer.handle = null;
        this.timers.delete(timer);
        timer.elapsed += performance.now() - timer.startedAt;
        timer.resolve(timer.elapsed);
      }, timer.remaining);
    }

    pauseTimer(timer) {
      if (timer.handle === null) return;
      clearTimeout(timer.handle);
      timer.handle = null;
      const elapsed = performance.now() - timer.startedAt;
      timer.elapsed += elapsed;
      timer.remaining = Math.max(0, timer.remaining - elapsed);
    }

    cancelTimers(run) {
      for (const timer of [...this.timers]) {
        if (timer.run !== run) continue;
        clearTimeout(timer.handle);
        this.timers.delete(timer);
        timer.reject(new EventCancelled());
      }
    }

    assertActive(run) {
      if (!run || run.cancelled || this.activeRun !== run) throw new EventCancelled();
    }

    async cancelToStable() {
      const run = this.activeRun;
      if (run) {
        run.cancelled = true;
        for (const pending of this.pendingWaits) {
          if (pending.run === run) pending.reject(new EventCancelled());
        }
        this.cancelTimers(run);
        this.setPaused(false);
        this.ui.cancelPending();
        await run.finished;
      }
      this.restoreStableState();
    }

    async play(eventId) {
      if (this.busy) return false;
      const run = { id: ++this.runSerial, cancelled: false, finished: null, finish: null };
      run.finished = new Promise((resolve) => { run.finish = resolve; });
      this.activeRun = run;
      this.busy = true;
      this.scene.setInteractionEnabled(false);
      this.onStateChanged();
      let completed = false;
      let terminated = false;

      try {
        let nextId = eventId;
        let guard = 0;
        while (nextId) {
          await this.waitWhilePaused(run);
          if (++guard > 100) throw new Error("连续事件超过 100 个，可能存在无输入死循环");
          const event = this.events.get(nextId);
          if (!event) throw new Error(`事件不存在：${nextId}`);
          this.state.currentEventId = nextId;
          // 每个事件开始时把“快进”重置为关闭，开关状态不跨事件记忆：
          // 避免上一事件遗留的快进让新事件自动连跳，玩家来不及关闭。
          this.ui.dialog.setFast(false);
          nextId = null;

          for (const action of event.actions || []) {
            const result = await this.runAction(action);
            if (result && result.stop) {
              nextId = result.next || null;
              break;
            }
          }
          if (!nextId && event.next) nextId = event.next;
        }
        completed = true;
        this.adoptStableState();
        return true;
      } catch (error) {
        terminated = error instanceof TerminalStateReached;
        if (terminated) {
          try {
            await this.onTerminate(this.state);
          } catch (terminationError) {
            console.error("终止回调失败：", terminationError);
          }
        } else {
          this.restoreStableState();
        }
        if (!(error instanceof EventCancelled) && !terminated) {
          console.error(error);
          this.ui.toast(`运行错误：${error.message}`);
        }
        return false;
      } finally {
        this.ui.cancelPending();
        this.activeRun = null;
        this.busy = false;
        if (!terminated) {
          this.scene.refresh();
          this.scene.setInteractionEnabled(!this.paused);
          this.onStateChanged();
        }
        run.finish(completed);
      }
    }
  }

  Game.Registry = Registry;
  Game.EventEngine = EventEngine;
})(window.TrainGame);
