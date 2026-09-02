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
  }

  class EventEngine {
    constructor({ events, state, scene, ui, items }) {
      this.events = new Map(events.map((event) => [event.id, event]));
      this.items = new Map(items.map((item) => [item.id, item]));
      this.state = state;
      this.scene = scene;
      this.ui = ui;
      this.actions = new Registry("动作类型");
      this.customActions = new Registry("自定义动作");
      this.busy = false;
      this.onStateChanged = () => {};
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
        await this.ui.inspect.show(action);
      });

      this.registerAction("choice", async (action) => {
        this.ui.closeDialog();
        const options = action.options.filter((option) => Game.evaluateCondition(option.when, this.state));
        if (!options.length) throw new Error(`选项动作没有可用选项：${action.id || "未命名"}`);
        const selected = await this.ui.choice.choose(action.prompt, options);
        return { next: selected.next, stop: true };
      });

      this.registerAction("check", async (action) => {
        const base = Number(this.state.attributes[action.attribute] || 0);
        const target = Math.max(1, Math.min(99, base + Number(action.modifier || 0)));
        const roll = Math.floor(Math.random() * 100) + 1;
        const success = roll <= target;
        this.state.checkResults[action.checkId] = { roll, target, success };
        await this.ui.inspect.show({
          title: success ? "检定成功" : "检定失败",
          text: `${action.label || action.attribute}：掷出 ${roll}，目标值 ${target}。`
        });
        return { next: success ? action.success : action.fail, stop: true };
      });

      this.registerAction("changeScene", async (action) => {
        this.ui.closeDialog();
        this.scene.load(action.scene);
      });

      this.registerAction("setFlag", async (action) => {
        this.state.flags[action.key] = action.value;
      });

      this.registerAction("modifyAttribute", async (action) => {
        const current = Number(this.state.attributes[action.attribute] || 0);
        this.state.attributes[action.attribute] = current + Number(action.amount);
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
      return {
        state: this.state,
        scene: this.scene,
        ui: this.ui,
        engine: this,
        items: this.items
      };
    }

    async play(eventId) {
      if (this.busy) return false;
      this.busy = true;
      this.scene.setInteractionEnabled(false);
      this.onStateChanged();
      try {
        let nextId = eventId;
        let guard = 0;
        while (nextId) {
          if (++guard > 100) throw new Error("连续事件超过 100 个，可能存在无输入死循环");
          const event = this.events.get(nextId);
          if (!event) throw new Error(`事件不存在：${nextId}`);
          this.state.currentEventId = nextId;
          nextId = null;

          for (const action of event.actions || []) {
            const result = await this.actions.get(action.type)(action, this.context());
            this.onStateChanged();
            if (result && result.stop) {
              nextId = result.next || null;
              break;
            }
          }
          if (!nextId && event.next) nextId = event.next;
        }
        return true;
      } catch (error) {
        console.error(error);
        this.ui.toast(`运行错误：${error.message}`);
        return false;
      } finally {
        this.ui.closeDialog();
        this.scene.refresh();
        this.scene.setInteractionEnabled(true);
        this.busy = false;
        this.onStateChanged();
      }
    }
  }

  Game.Registry = Registry;
  Game.EventEngine = EventEngine;
})(window.TrainGame);
