(function (Game) {
  "use strict";

  const DEFAULT_ASSETS = {
    frontCarriage: "assets/front-carriage.png",
    carriage06: "assets/carriage-06.png",
    platform: "assets/sunny-platform.png",
    moveBlur: "assets/move-blur.png",
    move: "assets/move.png",
    pcHappy: "assets/pc-happy.png",
    pcScared: "assets/pc-scared.png"
  };
  const IMAGE_LOAD_TIMEOUT_MS = 12000;

  function createElement(tagName, className, textContent = "") {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  function waitForImage(image) {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        image.removeEventListener("load", handleLoad);
        image.removeEventListener("error", handleError);
        if (error) reject(error);
        else resolve();
      };
      const handleLoad = () => finish();
      const handleError = () => finish(new Error(`结局 A 图片加载失败：${image.src}`));
      const timeout = setTimeout(
        () => finish(new Error(`结局 A 图片加载超时：${image.src}`)),
        IMAGE_LOAD_TIMEOUT_MS
      );
      image.addEventListener("load", handleLoad, { once: true });
      image.addEventListener("error", handleError, { once: true });
    });
  }

  class EndingASequence {
    constructor(options = {}) {
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.audio = options.audio || null;
      this.assets = { ...DEFAULT_ASSETS, ...(options.assets || {}) };
      this.timers = new Set();
      this.resolveAdvance = null;
      this.autoAdvanceTimer = null;
      this.running = null;

      this.overlay = createElement("section", "ending-a-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", "结局 A");

      this.cinema = createElement("div", "ending-a-cinema");
      this.backgroundPrimary = createElement("img", "ending-a-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "ending-a-background");
      this.backgroundSecondary.alt = "";
      this.portrait = createElement("img", "ending-a-portrait");
      this.portrait.alt = "";
      this.portrait.hidden = true;
      this.cinema.append(this.backgroundPrimary, this.backgroundSecondary, this.portrait);

      this.dialogue = createElement("div", "ending-a-dialogue");
      this.line = createElement("p", "ending-a-line");
      this.hint = createElement("span", "ending-a-hint", "点击继续");
      this.dialogue.append(this.line, this.hint);

      this.white = createElement("div", "ending-a-white");
      this.overlay.append(this.cinema, this.dialogue, this.white);

      this.handleAdvance = (event) => {
        if (!this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        if (event.type === "click") event.preventDefault();
        if (event.type === "keydown") event.preventDefault();
        this.advance();
      };
      this.handleResize = () => this.alignPortraitToDialogue();
      window.addEventListener("resize", this.handleResize);
    }

    play() {
      if (this.running) return this.running;
      this.running = this.run().finally(() => this.close());
      return this.running;
    }

    async run() {
      this.root.append(this.overlay);
      this.overlay.classList.add("is-visible", "is-loading");
      await this.preload();
      this.overlay.classList.remove("is-loading");
      await this.setBackground("frontCarriage", true);

      this.playSound("metro_speed_up", { volume: 0.92 });
      await this.showLine({
        text: "电车加速到极致，视野被刺眼白光覆盖。",
        auto: 3200,
        stageClass: "is-accelerating"
      });

      await this.fadeToWhite(1900);
      this.stopAudio();
      await this.setBackground("carriage06", true);
      this.playSound("metro_arriving", { volume: 0.9 });
      await this.revealFromWhite(620);

      await this.showLine({ text: "你睁开眼，发现自己仍坐在6号车厢。" });
      await this.showLine({ text: "广播声响起——" });
      await this.showLine({ text: "终点站已到。" });
      await this.showLine({
        text: "车厢里的人们陆续醒来，揉着眼睛下车。",
        background: "platform"
      });
      await this.showLine({ text: "你翻看背包：便签、报纸、手机、手电筒——全都不在了。" });
      await this.showLine({ text: "那是一场共同的噩梦。恐怖的记忆慢慢淡忘。" });

      this.stopAudio();
      this.playSound("airport_gate1", { volume: 0.88 });
      await this.showLine({ text: "你跟在人群后面走出站台。" });
      await this.showLine({ text: "身后，末班电车的车门缓缓关闭。" });
      await this.showLine({ text: "阳光正好，刚刚的一切都好像一场梦，人群叽叽喳喳，一切生机盎然。" });
      await this.showLine({ text: "这是……活下来了吗？" });
      await this.showLine({
        text: "“太好了！”",
        portrait: "pcHappy",
        portraitClass: "is-happy"
      });
      await this.showLine({
        text: "“欸，那是什么？”",
        background: "moveBlur"
      });

      this.stopAudio();
      this.overlay.classList.add("is-silent-cut");
      await this.delay(100);
      this.overlay.classList.remove("is-silent-cut");
      await this.showLine({
        text: "“！”",
        portrait: "pcScared",
        portraitClass: "is-scared"
      });
      await this.showLine({
        text: "",
        background: "move",
        hold: 2400,
        stageClass: "is-final"
      });

      this.overlay.classList.add("is-closing");
      await this.delay(680);
    }

    async preload() {
      await Promise.all(Object.values(this.assets).map((source) => {
        const image = new Image();
        image.src = source;
        return waitForImage(image);
      }));
    }

    async setBackground(name, immediate = false) {
      const source = this.assets[name];
      if (!source) throw new Error(`结局 A 缺少背景：${name}`);

      const current = this.backgroundPrimary.classList.contains("is-active")
        ? this.backgroundPrimary
        : this.backgroundSecondary;
      const next = current === this.backgroundPrimary
        ? this.backgroundSecondary
        : this.backgroundPrimary;
      if (next.src !== new URL(source, document.baseURI).href) {
        next.src = source;
        await waitForImage(next);
      }
      next.classList.add("is-active");
      if (immediate) {
        current.classList.remove("is-active");
        return;
      }
      await this.delay(90);
      current.classList.remove("is-active");
      await this.delay(680);
    }

    async setPortrait(name, portraitClass = "", immediate = false) {
      if (!name) {
        if (this.portrait.hidden) return;
        this.portrait.classList.remove("is-visible", "is-happy", "is-scared");
        if (immediate) {
          this.portrait.hidden = true;
          return;
        }
        await this.delay(260);
        this.portrait.hidden = true;
        return;
      }

      const source = this.assets[name];
      if (!source) throw new Error(`结局 A 缺少立绘：${name}`);
      this.portrait.classList.remove("is-visible", "is-happy", "is-scared");
      this.portrait.hidden = false;
      if (portraitClass) this.portrait.classList.add(portraitClass);
      if (this.portrait.src !== new URL(source, document.baseURI).href) {
        this.portrait.src = source;
        await waitForImage(this.portrait);
      }
      this.portrait.classList.add("is-visible");
    }

    async showLine({
      text = "",
      background = null,
      portrait = null,
      portraitClass = "",
      auto = 0,
      hold = 0,
      stageClass = ""
    }) {
      if (background) await this.setBackground(background);
      await this.setPortrait(portrait, portraitClass);
      if (stageClass) this.overlay.classList.add(stageClass);

      this.line.textContent = text;
      this.hint.hidden = auto > 0 || !text;
      this.dialogue.classList.toggle("is-visible", text !== "");
      this.alignPortraitToDialogue();
      requestAnimationFrame(() => this.alignPortraitToDialogue());

      if (auto > 0) await this.waitForAdvance(auto);
      else if (text) await this.waitForAdvance(0);
      else if (hold > 0) await this.delay(hold);

      this.dialogue.classList.remove("is-visible");
      if (stageClass) this.overlay.classList.remove(stageClass);
      await this.delay(180);
      await this.setPortrait(null);
    }

    waitForAdvance(autoMilliseconds = 0) {
      return new Promise((resolve) => {
        this.resolveAdvance = resolve;
        this.overlay.addEventListener("click", this.handleAdvance);
        document.addEventListener("keydown", this.handleAdvance);
        if (autoMilliseconds > 0) {
          this.autoAdvanceTimer = setTimeout(() => this.advance(), autoMilliseconds);
        }
      });
    }

    advance() {
      if (!this.resolveAdvance) return;
      const resolve = this.resolveAdvance;
      this.resolveAdvance = null;
      if (this.autoAdvanceTimer !== null) {
        clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }
      this.overlay.removeEventListener("click", this.handleAdvance);
      document.removeEventListener("keydown", this.handleAdvance);
      resolve();
    }

    async fadeToWhite(duration) {
      this.white.style.transitionDuration = `${duration}ms`;
      this.white.classList.add("is-visible");
      await this.delay(duration);
    }

    async revealFromWhite(duration) {
      this.white.style.transitionDuration = `${duration}ms`;
      this.white.classList.remove("is-visible");
      await this.delay(duration);
    }

    playSound(sound, options = {}) {
      if (!this.audio || typeof this.audio.play !== "function") return;
      this.audio.play(sound, options);
    }

    stopAudio() {
      this.audio?.stopAll?.();
      window.__TRAIN_GAME_TRAIN_AUDIO__?.setEnabled?.(false);
    }

    delay(milliseconds) {
      return new Promise((resolve) => {
        const timer = {
          handle: null,
          resolve
        };
        timer.handle = setTimeout(() => {
          this.timers.delete(timer);
          resolve();
        }, milliseconds);
        this.timers.add(timer);
      });
    }

    close() {
      for (const timer of this.timers) clearTimeout(timer.handle);
      this.timers.clear();
      if (this.autoAdvanceTimer !== null) clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
      this.overlay.removeEventListener("click", this.handleAdvance);
      document.removeEventListener("keydown", this.handleAdvance);
      window.removeEventListener("resize", this.handleResize);
      this.resolveAdvance = null;
      this.stopAudio();
      this.overlay.remove();
      this.running = null;
    }

    alignPortraitToDialogue() {
      if (this.portrait.hidden || !this.dialogue.classList.contains("is-visible")) return;
      const stageRect = this.root.getBoundingClientRect();
      const dialogueRect = this.dialogue.getBoundingClientRect();
      const bottom = Math.max(0, stageRect.bottom - dialogueRect.top);
      this.portrait.style.bottom = `${bottom}px`;
    }
  }

  Game.EndingASequence = EndingASequence;
  Game.playEndingASequence = (options) => new EndingASequence(options).play();
})(window.TrainGame);
