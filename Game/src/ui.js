(function (Game) {
  "use strict";

  class GameWindow {
    constructor(root, className = "") {
      this.root = root;
      this.element = document.createElement("section");
      this.element.className = `game-window ${className}`.trim();
    }

    open() {
      if (!this.element.isConnected) this.root.append(this.element);
      return this;
    }

    close() {
      this.element.remove();
    }

    setContent(content) {
      this.element.replaceChildren();
      if (typeof content === "string") this.element.textContent = content;
      else if (content) this.element.append(content);
      return this;
    }

    addChild(child) {
      this.element.append(child.element || child);
      return this;
    }
  }

  class TextPlayer {
    constructor(element) {
      this.element = element;
      this.timer = null;
      this.running = false;
      this.paused = false;
      this.index = 0;
      this.text = "";
      this.speed = 28;
      this.resolve = null;
      this.tick = () => {
        if (this.paused || !this.running) return;
        this.index += 1;
        this.element.textContent = this.text.slice(0, this.index);
        if (this.index >= this.text.length) {
          this.complete();
          return;
        }
        this.timer = setTimeout(this.tick, this.speed);
      };
    }

    play(text, speed = 28) {
      this.cancel();
      this.text = String(text);
      this.speed = speed;
      this.index = 0;
      this.element.textContent = "";
      this.running = true;

      return new Promise((resolve) => {
        this.resolve = resolve;
        if (this.text.length === 0) this.complete();
        else if (!this.paused) this.timer = setTimeout(this.tick, this.speed);
      });
    }

    finish() {
      if (!this.running) return;
      this.element.textContent = this.text;
      this.index = this.text.length;
      this.complete();
    }

    setPaused(value) {
      if (this.paused === value) return;
      this.paused = value;
      clearTimeout(this.timer);
      this.timer = null;
      if (!value && this.running) this.timer = setTimeout(this.tick, this.speed);
    }

    complete() {
      clearTimeout(this.timer);
      this.timer = null;
      this.running = false;
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve();
    }

    cancel() {
      clearTimeout(this.timer);
      this.timer = null;
      this.running = false;
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve();
    }
  }

  class DialogWindow extends GameWindow {
    constructor(root) {
      super(root, "dialog-window");
      this.auto = false;
      this.fast = false;
      this.paused = false;
      this.advance = null;
      this.autoTimer = null;
      this.lineToken = 0;
      this.speaker = document.createElement("div");
      this.speaker.className = "dialog-speaker";
      this.text = document.createElement("p");
      this.text.className = "dialog-text";
      this.hint = document.createElement("span");
      this.hint.className = "dialog-hint";
      this.hint.textContent = "点击继续";
      this.player = new TextPlayer(this.text);

      const controls = document.createElement("div");
      controls.className = "window-controls";
      this.autoButton = this.makeToggle("自动", () => this.setAuto(!this.auto));
      this.fastButton = this.makeToggle("快进", () => this.setFast(!this.fast));
      const skipButton = document.createElement("button");
      skipButton.type = "button";
      skipButton.textContent = "跳过本句";
      skipButton.addEventListener("click", (event) => {
        event.stopPropagation();
        this.handleAdvance();
      });
      controls.append(this.autoButton, this.fastButton, skipButton);
      this.element.append(this.speaker, this.text, controls, this.hint);
      this.element.addEventListener("click", () => this.handleAdvance());
    }

    makeToggle(label, callback) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        callback();
      });
      return button;
    }

    setAuto(value) {
      this.auto = value;
      this.autoButton.setAttribute("aria-pressed", String(value));
      if (value && !this.player.running && this.advance) this.scheduleAdvance();
      if (!value) this.clearAutoTimer();
    }

    setFast(value) {
      this.fast = value;
      this.fastButton.setAttribute("aria-pressed", String(value));
      if (value) {
        if (this.player.running) this.player.finish();
        if (this.advance) this.scheduleAdvance();
        return;
      }
      // 关闭快进：取消快进排程的自动连跳，避免已排程的连跳“收不住”；
      // 若“自动”仍开启，则改按自动节奏重新排程。
      if (this.advance && this.auto) this.scheduleAdvance();
      else this.clearAutoTimer();
    }

    setPaused(value) {
      this.paused = value;
      this.player.setPaused(value);
      if (value) this.clearAutoTimer();
      else if (this.advance && (this.auto || this.fast)) this.scheduleAdvance();
    }

    isAwaitingAdvance() {
      return this.element.isConnected && (this.player.running || Boolean(this.advance));
    }

    handleAdvance() {
      if (this.paused) return;
      if (this.player.running) {
        this.player.finish();
        return;
      }
      this.resolveLine();
    }

    clearAutoTimer() {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }

    scheduleAdvance() {
      if (this.paused) return;
      this.clearAutoTimer();
      const activeAdvance = this.advance;
      this.autoTimer = setTimeout(() => {
        if (this.advance === activeAdvance && !this.player.running) this.resolveLine();
      }, this.fast ? 90 : 850);
    }

    resolveLine() {
      this.clearAutoTimer();
      if (!this.advance) return;
      const resolve = this.advance;
      this.advance = null;
      resolve();
    }

    async showLine({ speaker = "", text = "", speed = 28 }) {
      const token = ++this.lineToken;
      this.open();
      this.speaker.textContent = speaker;
      await this.player.play(text, this.fast ? 1 : speed);
      if (token !== this.lineToken) return;
      return new Promise((resolve) => {
        this.advance = resolve;
        if (this.auto || this.fast) this.scheduleAdvance();
      });
    }

    close() {
      this.lineToken += 1;
      this.player.cancel();
      this.resolveLine();
      super.close();
    }
  }

  class AttributeAllocationWindow extends GameWindow {
    constructor(root) {
      super(root, "attribute-allocation-window");
      this.backdrop = null;
      this.resolve = null;
    }

    choose(definitions, totalPoints) {
      this.close(null);
      const values = Object.fromEntries(definitions.map((definition) => [definition.id, definition.initial]));
      const initialTotal = definitions.reduce((sum, definition) => sum + definition.initial, 0);
      const targetTotal = initialTotal + totalPoints;
      let remaining = totalPoints;
      // 新游戏默认均衡填满全部可分配点数，方便直接开始测试；玩家仍可在确认前手动调整。
      while (remaining > 0) {
        let changed = false;
        for (const definition of definitions) {
          if (remaining <= 0) break;
          if (values[definition.id] >= definition.max) continue;
          values[definition.id] += 1;
          remaining -= 1;
          changed = true;
        }
        if (!changed) throw new Error("属性上限不足以分配全部初始属性点");
      }
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop attribute-allocation-backdrop";
      const heading = document.createElement("h1");
      heading.textContent = "分配属性点";
      const introduction = document.createElement("p");
      introduction.className = "allocation-introduction";
      introduction.textContent = `已自动均衡分配 ${totalPoints} 点，可直接确认；也可以继续调整。普通属性最高为 10，SAN 初始为 5。`;
      const summary = document.createElement("div");
      summary.className = "allocation-summary";
      const remainingText = document.createElement("p");
      remainingText.className = "allocation-remaining";
      const totalText = document.createElement("p");
      totalText.className = "allocation-total";
      const progress = document.createElement("progress");
      progress.className = "allocation-progress";
      progress.max = totalPoints;
      summary.append(remainingText, totalText, progress);
      const list = document.createElement("div");
      list.className = "attribute-allocation-list";
      const actions = document.createElement("div");
      actions.className = "allocation-actions";
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.textContent = "返回主界面";
      const resetButton = document.createElement("button");
      resetButton.type = "button";
      resetButton.textContent = "重置点数";
      const confirmButton = document.createElement("button");
      confirmButton.type = "button";
      confirmButton.textContent = "确认分配";
      actions.append(backButton, resetButton, confirmButton);
      this.element.replaceChildren(heading, introduction, summary, list, actions);
      backdrop.append(this.element);
      this.root.append(backdrop);
      this.backdrop = backdrop;

      const rows = new Map();
      const refresh = () => {
        const spent = totalPoints - remaining;
        remainingText.textContent = `剩余点数：${remaining}`;
        totalText.textContent = `已分配：${spent}/${totalPoints}　当前总值：${initialTotal + spent}/${targetTotal}`;
        progress.value = spent;
        confirmButton.disabled = remaining !== 0;
        resetButton.disabled = spent === 0;
        for (const definition of definitions) {
          const row = rows.get(definition.id);
          row.value.textContent = String(values[definition.id]);
          row.minus.disabled = values[definition.id] <= definition.initial;
          row.plus.disabled = remaining <= 0 || values[definition.id] >= definition.max;
        }
      };

      for (const definition of definitions) {
        const row = document.createElement("section");
        row.className = "attribute-allocation-row";
        const details = document.createElement("div");
        const name = document.createElement("h2");
        name.textContent = definition.name;
        const description = document.createElement("p");
        description.textContent = definition.description || definition.id;
        const limits = document.createElement("small");
        limits.className = "attribute-allocation-limits";
        limits.textContent = `初始 ${definition.initial} · 创建上限 ${definition.max}`;
        details.append(name, description, limits);
        const controls = document.createElement("div");
        controls.className = "attribute-stepper";
        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", `降低${definition.name}`);
        const value = document.createElement("output");
        value.setAttribute("aria-label", `${definition.name}当前值`);
        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", `提高${definition.name}`);
        minus.addEventListener("click", () => {
          if (values[definition.id] <= definition.initial) return;
          values[definition.id] -= 1;
          remaining += 1;
          refresh();
        });
        plus.addEventListener("click", () => {
          if (remaining <= 0 || values[definition.id] >= definition.max) return;
          values[definition.id] += 1;
          remaining -= 1;
          refresh();
        });
        controls.append(minus, value, plus);
        row.append(details, controls);
        list.append(row);
        rows.set(definition.id, { minus, value, plus });
      }

      resetButton.addEventListener("click", () => {
        for (const definition of definitions) values[definition.id] = definition.initial;
        remaining = totalPoints;
        refresh();
      });
      refresh();
      return new Promise((resolve) => {
        this.resolve = resolve;
        backButton.addEventListener("click", () => this.close(null), { once: true });
        confirmButton.addEventListener("click", () => {
          if (remaining === 0) this.close(Game.deepClone(values));
        }, { once: true });
        list.querySelector("button:not(:disabled)")?.focus();
      });
    }

    close(value = null) {
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve(value);
    }
  }

  class ChoiceWindow extends GameWindow {
    constructor(root) {
      super(root, "choice-window");
      this.backdrop = null;
      this.resolve = null;
    }

    choose(prompt, options) {
      this.close(null);
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      const title = document.createElement("h2");
      title.textContent = prompt || "请选择";
      const list = document.createElement("div");
      list.className = "choice-list";
      this.element.replaceChildren(title, list);
      backdrop.append(this.element);
      this.root.append(backdrop);
      this.backdrop = backdrop;

      return new Promise((resolve) => {
        this.resolve = resolve;
        for (const option of options) {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = option.label;
          button.addEventListener("click", () => this.close(option));
          list.append(button);
        }
      });
    }

    close(value = null) {
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve(value);
    }
  }

  class InspectWindow extends GameWindow {
    constructor(root) {
      super(root, "inspect-window");
      this.backdrop = null;
      this.resolve = null;
    }

    show({ title = "调查", text = "", image = null, large = false }) {
      this.close();
      this.element.classList.toggle("inspect-large", large === true);
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      const heading = document.createElement("h2");
      heading.textContent = title;
      const content = document.createElement("div");
      content.className = "inspect-content";
      if (image) {
        const media = document.createElement("div");
        media.className = "inspect-media";
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        media.append(img);
        content.append(media);
      }
      const paragraph = document.createElement("p");
      paragraph.className = "inspect-text";
      paragraph.textContent = text;
      content.append(paragraph);
      const close = document.createElement("button");
      close.type = "button";
      close.className = "inspect-close";
      close.textContent = "关闭";
      this.element.replaceChildren(heading, content, close);
      backdrop.append(this.element);
      this.root.append(backdrop);
      this.backdrop = backdrop;

      return new Promise((resolve) => {
        this.resolve = resolve;
        close.addEventListener("click", () => this.close());
      });
    }

    close() {
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve();
    }
  }

  // 检定抖动动画节奏：只影响 roll() 里的抖动阶段（第一段等待）；
  // 算式与成败的停留时长不受倍速影响。实际时长 = 基准时长 / 倍速，
  // CSS 的抖动关键帧周期按同一倍速缩放（见 styles/main.css 的 --check-animation-scale）。
  const CHECK_ROLL_BASE_MS = 1100;
  const CHECK_ANIMATION_SPEED = 2;

  class DiceRollWindow {
    constructor(root) {
      this.root = root;
      this.backdrop = null;
      this.diceBox = null;
      this.image = null;
      this.status = null;
      this.result = null;
    }

    async roll({ value = null, success = true, text = "", outcomeText = "", wait = Game.delay }) {
      this.close();
      const backdrop = document.createElement("div");
      backdrop.className = "check-roll-modal";
      // 倍速交给 CSS，避免等待时长与关键帧周期各写一个数字而失步。
      backdrop.style.setProperty("--check-animation-scale", String(1 / CHECK_ANIMATION_SPEED));
      const content = document.createElement("div");
      content.className = "check-roll-content";
      const diceBox = document.createElement("div");
      diceBox.className = "dice-box dice-rolling";
      const image = document.createElement("img");
      image.src = "assets/ui/dice_00.png";
      image.alt = "骰子";
      diceBox.append(image);
      const status = document.createElement("p");
      status.className = "check-roll-status";
      status.textContent = "检定中……";
      const result = document.createElement("p");
      result.className = "check-result-panel";
      result.setAttribute("aria-live", "polite");
      content.append(diceBox, status, result);
      backdrop.append(content);
      this.root.append(backdrop);
      this.backdrop = backdrop;
      this.diceBox = diceBox;
      this.image = image;
      this.status = status;
      this.result = result;

      try {
        await wait(CHECK_ROLL_BASE_MS / CHECK_ANIMATION_SPEED);
        if (this.backdrop !== backdrop) return;
        const face = Number.isInteger(value) && value >= 1 && value <= 6
          ? `assets/ui/dice_0${value}.png`
          : "assets/ui/dice_00.png";
        this.image.src = face;
        this.diceBox.classList.remove("dice-rolling");
        this.diceBox.classList.add("dice-result-static");
      this.status.hidden = true;
      this.result.textContent = text;
      this.result.classList.add(success ? "success" : "fail", "is-visible");
      await wait(1200);
      if (this.backdrop !== backdrop) return;
      if (outcomeText) {
        this.result.classList.remove("is-visible");
        await wait(220);
        if (this.backdrop !== backdrop) return;
        this.result.textContent = outcomeText;
        this.result.classList.add("is-visible");
      }
      await wait(1900);
      } finally {
        if (this.backdrop === backdrop) this.close();
      }
    }

    close() {
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      this.diceBox = null;
      this.image = null;
      this.status = null;
      this.result = null;
    }
  }

  class MenuWindow extends GameWindow {
    constructor(root, className) {
      super(root, className);
      this.backdrop = null;
      this.resolve = null;
      this.previousFocus = null;
    }

    choose({ title, coverImage = null, options, backdropClass = "menu-backdrop" }) {
      this.close(null);
      this.previousFocus = document.activeElement;
      const backdrop = document.createElement("div");
      backdrop.className = backdropClass;
      const content = document.createElement("div");
      content.className = "menu-content";
      if (coverImage) {
        const image = document.createElement("img");
        image.className = "menu-cover";
        image.src = coverImage;
        image.alt = "";
        backdrop.append(image);
      }
      const heading = document.createElement("h1");
      heading.textContent = title;
      const list = document.createElement("div");
      list.className = "menu-actions";
      content.append(heading, list);
      this.element.replaceChildren(content);
      backdrop.append(this.element);
      this.root.append(backdrop);
      this.backdrop = backdrop;

      return new Promise((resolve) => {
        this.resolve = resolve;
        let firstEnabledButton = null;
        for (const option of options) {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = option.label;
          button.disabled = Boolean(option.disabled);
          if (!button.disabled && !firstEnabledButton) firstEnabledButton = button;
          if (option.description) button.title = option.description;
          button.addEventListener("click", () => this.close(option.value));
          list.append(button);
        }
        firstEnabledButton?.focus();
      });
    }

    close(value = null) {
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve(value);
      if (this.previousFocus instanceof HTMLElement && this.previousFocus.isConnected) {
        this.previousFocus.focus();
      }
      this.previousFocus = null;
    }
  }

  // 小游戏宿主窗口：通用模态外壳（深色变暗遮罩 + 居中近满屏内容区 + 标题栏“退出小游戏”）。
  // 只提供外壳与生命周期，具体玩法由小游戏模块在 stage 里自绘；
  // 引擎通过 openAndStage/quitPromise/close 与宿主协作，退出按钮保证玩家随时可离开。
  class MinigameWindow extends GameWindow {
    constructor(root) {
      super(root, "minigame-window");
      this.backdrop = null;
      this.running = false;
      this.quitProvider = null;
      this.pendingQuit = null;
      this.stage = null;
    }

    isOpen() {
      return this.running;
    }

    // 打开宿主并返回玩法内容区；模块把自绘 UI 挂进 stage。标题来自注册表 spec.title。
    openAndStage(title) {
      this.close();
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop minigame-backdrop";
      const titlebar = document.createElement("header");
      titlebar.className = "minigame-titlebar";
      const heading = document.createElement("h2");
      heading.className = "minigame-title";
      heading.textContent = title || "小游戏";
      const exit = document.createElement("button");
      exit.type = "button";
      exit.className = "minigame-exit";
      exit.textContent = "退出小游戏";
      exit.setAttribute("aria-label", "退出小游戏并返回剧情");
      exit.addEventListener("click", () => this.requestQuit());
      titlebar.append(heading, exit);
      this.stage = document.createElement("div");
      this.stage.className = "minigame-stage";
      this.element.replaceChildren(titlebar, this.stage);
      backdrop.append(this.element);
      this.root.append(backdrop);
      this.backdrop = backdrop;
      this.running = true;
      return this.stage;
    }

    // 模块经 context.onQuit 注册退出结算提供者：返回值（可为 Promise）作为退出时的结算。
    setQuitProvider(provider) {
      this.quitProvider = provider;
    }

    // 引擎等待“玩家点退出”的 Promise；未点退出前保持挂起，close 时兜底解析为 undefined。
    quitPromise() {
      if (!this.pendingQuit) {
        const pending = {};
        pending.promise = new Promise((resolve) => { pending.resolve = resolve; });
        this.pendingQuit = pending;
      }
      return this.pendingQuit.promise;
    }

    async requestQuit() {
      if (!this.running) return;
      let settlement;
      try {
        settlement = this.quitProvider ? await this.quitProvider() : undefined;
      } catch (error) {
        console.error("小游戏退出结算失败：", error);
      }
      this.resolveQuit(settlement);
      this.close();
    }

    resolveQuit(settlement) {
      if (this.pendingQuit && this.pendingQuit.resolve) {
        const resolve = this.pendingQuit.resolve;
        this.pendingQuit.resolve = null;
        resolve(settlement);
      }
    }

    close() {
      // 无论自然结束、点退出还是取消，都要解除等待中的引擎竞态。
      this.resolveQuit(undefined);
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      this.running = false;
      this.quitProvider = null;
      this.pendingQuit = null;
      this.stage = null;
      super.close();
    }
  }

  class UIManager {
    constructor(root) {
      this.root = root;
      this.dialog = new DialogWindow(root);
      this.attributeAllocation = new AttributeAllocationWindow(root);
      this.choice = new ChoiceWindow(root);
      this.inspect = new InspectWindow(root);
      this.dice = new DiceRollWindow(root);
      this.mainMenu = new MenuWindow(root, "main-menu-window");
      this.pauseMenu = new MenuWindow(root, "pause-menu-window");
      this.confirmMenu = new MenuWindow(root, "confirm-menu-window");
      this.minigame = new MinigameWindow(root);
      this.toastElement = document.querySelector("#toast");
      this.toastTimer = null;
    }

    closeDialog() {
      this.dialog.close();
    }

    setPaused(value) {
      this.dialog.setPaused(value);
    }

    cancelPending() {
      this.dialog.close();
      this.choice.close(null);
      this.inspect.close();
      this.dice.close();
      this.minigame.close();
    }

    closePauseMenus() {
      this.pauseMenu.close("resume");
      this.confirmMenu.close(false);
    }

    toast(message) {
      clearTimeout(this.toastTimer);
      this.toastElement.textContent = message;
      this.toastElement.classList.add("visible");
      this.toastTimer = setTimeout(() => this.toastElement.classList.remove("visible"), 1800);
    }
  }

  Game.GameWindow = GameWindow;
  Game.TextPlayer = TextPlayer;
  Game.MinigameWindow = MinigameWindow;
  Game.UIManager = UIManager;
})(window.TrainGame);
