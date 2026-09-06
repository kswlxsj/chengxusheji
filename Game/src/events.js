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

  class EventEngine {
    constructor({ events, state, scene, ui, items, shouldTerminate = () => false, onTerminate = () => {} }) {
      this.events = new Map(events.map((event) => [event.id, event]));
      this.items = new Map(items.map((item) => [item.id, item]));
      this.state = state;
      this.scene = scene;
      this.ui = ui;
      this.actions = new Registry("动作类型");
      this.customActions = new Registry("自定义动作");
      this.busy = false;
      this.paused = false;
      this.activeRun = null;
      this.runSerial = 0;
      this.pauseWaiters = new Set();
      this.timers = new Set();
      this.stableSnapshot = state.snapshot();
      this.onStateChanged = () => {};
      this.shouldTerminate = shouldTerminate;
      this.onTerminate = onTerminate;
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
        await this.ui.dialog.showLine(action);
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
          image: action.image || item.image
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
        if (!hasBranch) return null;
        return { next: outcomes[index], stop: true };
      });

      this.registerAction("changeScene", async (action) => {
        this.ui.closeDialog();
        this.scene.load(action.scene);
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
        if (!this.items.has(action.item)) throw new Error(`物品不存在：${action.item}`);
        this.state.addItem(action.item);
      });

      this.registerAction("setObjectState", async (action) => {
        this.state.setObjectState(action.object, action.patch);
      });

      this.registerAction("custom", async (action) => {
        const handler = this.customActions.get(action.name);
        await handler(action.params || {}, this.context());
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

    getStableSnapshot() {
      return Game.deepClone(this.stableSnapshot);
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
        timer.resolve();
      }, timer.remaining);
    }

    pauseTimer(timer) {
      if (timer.handle === null) return;
      clearTimeout(timer.handle);
      timer.handle = null;
      timer.remaining = Math.max(0, timer.remaining - (performance.now() - timer.startedAt));
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
            await this.waitWhilePaused(run);
            const result = await this.actions.get(action.type)(action, this.context());
            this.assertActive(run);
            this.onStateChanged();
            if (this.shouldTerminate(this.state)) throw new TerminalStateReached();
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
          this.onTerminate(this.state);
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
