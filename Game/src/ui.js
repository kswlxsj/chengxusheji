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
      this.index = 0;
      this.text = "";
      this.resolve = null;
    }

    play(text, speed = 28) {
      this.cancel();
      this.text = String(text);
      this.index = 0;
      this.element.textContent = "";
      this.running = true;

      return new Promise((resolve) => {
        this.resolve = resolve;
        const tick = () => {
          this.index += 1;
          this.element.textContent = this.text.slice(0, this.index);
          if (this.index >= this.text.length) {
            this.complete();
            return;
          }
          this.timer = setTimeout(tick, speed);
        };
        if (this.text.length === 0) this.complete();
        else this.timer = setTimeout(tick, speed);
      });
    }

    finish() {
      if (!this.running) return;
      this.element.textContent = this.text;
      this.index = this.text.length;
      this.complete();
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
      this.resolve = null;
    }
  }

  class DialogWindow extends GameWindow {
    constructor(root) {
      super(root, "dialog-window");
      this.auto = false;
      this.fast = false;
      this.advance = null;

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
    }

    setFast(value) {
      this.fast = value;
      this.fastButton.setAttribute("aria-pressed", String(value));
      if (value && this.player.running) this.player.finish();
      if (value && this.advance) this.scheduleAdvance();
    }

    handleAdvance() {
      if (this.player.running) {
        this.player.finish();
        return;
      }
      this.resolveLine();
    }

    scheduleAdvance() {
      const activeAdvance = this.advance;
      setTimeout(() => {
        if (this.advance === activeAdvance && !this.player.running) this.resolveLine();
      }, this.fast ? 90 : 850);
    }

    resolveLine() {
      if (!this.advance) return;
      const resolve = this.advance;
      this.advance = null;
      resolve();
    }

    async showLine({ speaker = "", text = "", speed = 28 }) {
      this.open();
      this.speaker.textContent = speaker;
      const typing = this.player.play(text, this.fast ? 1 : speed);
      await typing;
      return new Promise((resolve) => {
        this.advance = resolve;
        if (this.auto || this.fast) this.scheduleAdvance();
      });
    }

    close() {
      this.player.cancel();
      this.resolveLine();
      super.close();
    }
  }

  class ChoiceWindow extends GameWindow {
    constructor(root) {
      super(root, "choice-window");
    }

    choose(prompt, options) {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      const title = document.createElement("h2");
      title.textContent = prompt || "请选择";
      const list = document.createElement("div");
      list.className = "choice-list";
      this.element.replaceChildren(title, list);
      backdrop.append(this.element);
      this.root.append(backdrop);

      return new Promise((resolve) => {
        for (const option of options) {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = option.label;
          button.addEventListener("click", () => {
            backdrop.remove();
            resolve(option);
          });
          list.append(button);
        }
      });
    }
  }

  class InspectWindow extends GameWindow {
    constructor(root) {
      super(root, "inspect-window");
    }

    show({ title = "调查", text = "", image = null }) {
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

      return new Promise((resolve) => {
        close.addEventListener("click", () => {
          backdrop.remove();
          resolve();
        });
      });
    }
  }

  class UIManager {
    constructor(root) {
      this.root = root;
      this.dialog = new DialogWindow(root);
      this.choice = new ChoiceWindow(root);
      this.inspect = new InspectWindow(root);
      this.toastElement = document.querySelector("#toast");
      this.toastTimer = null;
    }

    closeDialog() {
      this.dialog.close();
    }

    toast(message) {
      clearTimeout(this.toastTimer);
      this.toastElement.textContent = message;
      this.toastElement.classList.add("visible");
      this.toastTimer = setTimeout(() => this.toastElement.classList.remove("visible"), 1500);
    }
  }

  Game.GameWindow = GameWindow;
  Game.TextPlayer = TextPlayer;
  Game.UIManager = UIManager;
})(window.TrainGame);
