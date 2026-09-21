(function (Game) {
  "use strict";

  const DEFAULT_ASSETS = {
    state1: "assets/Image/Scene/Background/end-3-state1.webp",
    state2: "assets/Image/Scene/Background/end-3-state2.webp",
    state3: "assets/Image/Scene/Background/end-3-state3.webp"
  };
  const IMAGE_LOAD_TIMEOUT_MS = 12000;
  const ENDING_TITLE = Game.ENDING_CATALOG.find((ending) => ending.id === "lost")?.title || "失落";
  const LOST_TEXT = "你第一次见到如此令人安心的场景，天堂应该是这样的，神圣的，慈悲的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福，辛福，幸幅，幸富，幸服，幸褔，倖福，莘福，悻福，幸辐，幸蝠，幸偪，幸畐，幸冨，幸複，辛畐，辛辐，辛富，辛服，辛褔，莘辐，莘畐，悻畐，倖畐，幸福，幸𤔜，幸𥛽，幸𥚃，幸𥘿，幸𥙆，幸𥙷，幸𥛉，辛𤔜，辛𥛽，莘𤔜，悻𥛽，倖𥛽，幸畐，辛偪，莘偪，悻偪，倖偪，幸逼，辛逼，莘逼，悻逼，倖逼，幸副，辛副，莘副，悻副，倖副，幸蝠，辛蝠，莘蝠，悻蝠，倖蝠，幸辐，辛辐，莘辐，悻辐，倖辐，幸富，辛富，莘富，悻富，倖富，幸服，辛服，莘服，悻服，倖服，幸幅，辛幅，莘幅，悻幅，倖幅，幸褔，辛褔，莘褔，悻褔，倖褔，幸福，辛福，幸畐，莘畐，悻畐，倖畐，幸福，辛福，莘福，倖福";

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
      const handleError = () => finish(new Error(`失落结局图片加载失败：${image.src}`));
      const timeout = setTimeout(() => finish(new Error(`失落结局图片加载超时：${image.src}`)), IMAGE_LOAD_TIMEOUT_MS);
      image.addEventListener("load", handleLoad, { once: true });
      image.addEventListener("error", handleError, { once: true });
    });
  }

  class LostEndingSequence {
    constructor(options = {}) {
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.backgroundAudio = options.backgroundAudio || null;
      this.assets = { ...DEFAULT_ASSETS, ...(options.assets || {}) };
      this.timers = new Set();
      this.running = null;

      this.overlay = createElement("section", "lost-ending-sequence");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
      this.cinema = createElement("div", "lost-ending-cinema");
      this.backgrounds = [
        createElement("img", "lost-ending-background is-active"),
        createElement("img", "lost-ending-background"),
        createElement("img", "lost-ending-background")
      ];
      this.backgrounds.forEach((image) => { image.alt = ""; });
      this.cinema.append(...this.backgrounds);
      this.text = createElement("p", "lost-ending-text");
      this.wordWall = createElement("div", "lost-ending-word-wall");
      this.populateWordWall();
      this.blackout = createElement("div", "lost-ending-blackout");
      this.overlay.append(this.cinema, this.text, this.wordWall, this.blackout);
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
      this.backgroundAudio?.setTrack?.("ending_lost", { fadeMs: 7200 });

      await this.showState(0, "你第一次见到如此令人安心的场景，天堂应该是这样的，神圣的，慈悲的。", 5200);
      this.overlay.classList.add("is-holy");
      await this.showState(1, "幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的，幸福的。", 5800, true);
      this.overlay.classList.add("is-fracturing");
      await this.showState(2, "", 7600, true);
      await this.delay(900);
      this.blackout.classList.add("is-visible");
      await this.delay(1800);
    }

    async preload() {
      await Promise.all(this.backgrounds.map((image, index) => {
        image.src = this.assets[`state${index + 1}`];
        return waitForImage(image);
      }));
    }

    populateWordWall() {
      const variants = LOST_TEXT
        .slice(LOST_TEXT.indexOf("幸福的"))
        .split("，")
        .filter(Boolean);
      const words = Array.from({ length: 3 }, () => variants).flat();
      this.wordWall.replaceChildren(...words.map((word, index) => {
        const span = createElement("span", "lost-ending-word", word);
        span.style.setProperty("--lost-word-delay", `${(index % 17) * -95}ms`);
        if (document.documentMode) span.style.animationDelay = `${(index % 17) * -95}ms`;
        return span;
      }));
    }

    async showState(index, text, duration, showWall = false) {
      this.backgrounds.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === index));
      this.text.classList.remove("is-visible");
      this.wordWall.classList.toggle("is-visible", showWall);
      await this.delay(420);
      this.text.textContent = text;
      this.text.classList.toggle("is-visible", Boolean(text));
      await this.delay(duration);
    }

    delay(milliseconds) {
      return new Promise((resolve) => {
        const timer = { handle: setTimeout(resolve, milliseconds) };
        this.timers.add(timer);
        setTimeout(() => this.timers.delete(timer), milliseconds);
      });
    }

    close() {
      for (const timer of this.timers) clearTimeout(timer.handle);
      this.timers.clear();
      this.backgroundAudio?.stopAll?.({ duration: 4600 });
      this.overlay.remove();
      this.running = null;
    }
  }

  Game.LostEndingSequence = LostEndingSequence;
  Game.playLostEndingSequence = (options) => new LostEndingSequence(options).play();
})(window.TrainGame);
