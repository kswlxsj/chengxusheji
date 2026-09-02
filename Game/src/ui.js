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
      if (value && this.player.running) this.player.finish();
      if (value && this.advance) this.scheduleAdvance();
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
      let remaining = totalPoints;
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop attribute-allocation-backdrop";
      const heading = document.createElement("h1");
      heading.textContent = "分配属性点";
      const remainingText = document.createElement("p");
      remainingText.className = "allocation-remaining";
      const list = document.createElement("div");
      list.className = "attribute-allocation-list";
      const actions = document.createElement("div");
      actions.className = "allocation-actions";
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.textContent = "返回主界面";
      const confirmButton = document.createElement("button");
      confirmButton.type = "button";
      confirmButton.textContent = "确认分配";
      actions.append(backButton, confirmButton);
      this.element.replaceChildren(heading, remainingText, list, actions);
      backdrop.append(this.element);
      this.root.append(backdrop);
      this.backdrop = backdrop;

      const rows = new Map();
      const refresh = () => {
        remainingText.textContent = `剩余点数：${remaining}`;
        confirmButton.disabled = remaining !== 0;
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
        details.append(name, description);
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

    show({ title = "调查", text = "", image = null }) {
      this.close();
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      const heading = document.createElement("h2");
      heading.textContent = title;
      const content = document.createElement("div");
      content.className = "inspect-content";
      if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        content.append(img);
      }
      const paragraph = document.createElement("p");
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

  class UIManager {
    constructor(root) {
      this.root = root;
      this.dialog = new DialogWindow(root);
      this.attributeAllocation = new AttributeAllocationWindow(root);
      this.choice = new ChoiceWindow(root);
      this.inspect = new InspectWindow(root);
      this.mainMenu = new MenuWindow(root, "main-menu-window");
      this.pauseMenu = new MenuWindow(root, "pause-menu-window");
      this.confirmMenu = new MenuWindow(root, "confirm-menu-window");
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
  Game.UIManager = UIManager;
})(window.TrainGame);
