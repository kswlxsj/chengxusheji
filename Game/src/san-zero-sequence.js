(function (Game) {
  "use strict";

  const DEFAULT_ASSETS = {
    broadcast: "assets/cutscene/san-zero/broadcast.png",
    hospital: "assets/cutscene/san-zero/hospital.png",
    closeup: "assets/cutscene/san-zero/closeup.png",
    closeupSmile: "assets/cutscene/san-zero/closeup-smile.png",
    doctor: "assets/cutscene/san-zero/doctor.png",
    pcScared: "assets/cutscene/san-zero/pc-scared.png"
  };

  const SCREAM_TEXT =
    "我不想死我不想死我不想死我不想死我不想死我不想死我不想死我不想死我不想死我不想死" +
    "我不想死我不想死我不想死我不想死我不想死我不想死——";

  function createElement(tagName, className, textContent = "") {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  function waitForImage(image) {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve) => {
      const finish = () => resolve();
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    });
  }

  class SanZeroSequence {
    constructor(options = {}) {
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.assets = { ...DEFAULT_ASSETS, ...(options.assets || {}) };
      this.timers = new Set();
      this.snowFrame = null;
      this.resolveAdvance = null;
      this.running = null;

      this.overlay = createElement("section", "san-zero-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", "SAN 归零演出");

      this.cinema = createElement("div", "san-zero-cinema");
      this.backgroundPrimary = createElement("img", "san-zero-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "san-zero-background");
      this.backgroundSecondary.alt = "";
      this.vignette = createElement("div", "san-zero-vignette");
      this.portrait = createElement("img", "san-zero-portrait");
      this.portrait.alt = "";
      this.portrait.hidden = true;
      this.snow = createElement("canvas", "san-zero-snow");
      this.snow.width = 192;
      this.snow.height = 108;
      this.snow.hidden = true;
      this.cinema.append(
        this.backgroundPrimary,
        this.backgroundSecondary,
        this.vignette,
        this.portrait,
        this.snow
      );

      this.dialogue = createElement("div", "san-zero-dialogue");
      this.speaker = createElement("div", "san-zero-speaker");
      this.line = createElement("p", "san-zero-line");
      this.hint = createElement("span", "san-zero-hint", "点击继续");
      this.dialogue.append(this.speaker, this.line, this.hint);

      this.scream = createElement("div", "san-zero-scream");
      this.overlay.append(this.cinema, this.dialogue, this.scream);

      this.handleAdvance = (event) => {
        if (!this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        if (event.type === "click") event.preventDefault();
        if (event.type === "keydown") event.preventDefault();
        const resolve = this.resolveAdvance;
        this.resolveAdvance = null;
        resolve();
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
      await this.preload();
      this.root.append(this.overlay);
      this.setBackground("broadcast", true);
      requestAnimationFrame(() => this.overlay.classList.add("is-visible"));
      await this.delay(500);

      const beats = [
        {
          speaker: "新闻播报",
          text: "今日，我市突发恶性事件。一伙极端分子在列车车厢内持刀行凶，血案骤起，同车乘客在极度惊恐中大面积精神崩溃。",
          background: "broadcast"
        },
        {
          speaker: "新闻播报",
          text: "以下是本台记者带来的现场采访。",
          background: "broadcast"
        },
        {
          speaker: "记者",
          text: "医生，请问目前这些患者的状态如何？预计多久能够恢复？",
          background: "hospital"
        },
        {
          speaker: "医生",
          text: "患者们受到的刺激过于强烈，目前精神仍处于极不稳定的状态。有人时而癫狂嘶喊，有人整日喃喃自语。我们正在全力救治，但恢复时间……目前还无法给出准确判断。",
          background: "hospital",
          portrait: "doctor",
          portraitType: "doctor"
        },
        {
          text: "（镜头缓缓转向PC）",
          background: "closeup"
        },
        {
          text: "PC蜷缩在角落，浑身剧烈颤抖，瞳孔涣散。他死死盯着镜头后方某个不存在的方向，像在看着什么逼近的东西。",
          background: "closeup"
        },
        {
          speaker: "PC",
          text: "别过来！别过来……啊！",
          background: "closeup",
          portrait: "pcScared",
          portraitType: "pc"
        },
        {
          text: "他突然抱住自己的头，指甲嵌进头皮，声音陡然拔高，变成一连串失控的嘶喊——",
          background: "closeup",
          portrait: "pcScared",
          portraitType: "pc"
        }
      ];

      for (const beat of beats) await this.showLine(beat);

      await this.showScream();
      await this.showLine({
        speaker: "PC",
        text: "放过我吧！谁来救救我！",
        background: "closeup",
        portrait: "pcScared",
        portraitType: "pc"
      });
      await this.showLine({
        text: "（嘶喊戛然而止）",
        background: "closeup"
      });
      await this.showLine({
        text: "他忽然停止了一切动作，缓缓抬起头，目光精准地穿过镜头——像终于找到了什么。",
        background: "closeup"
      });
      await this.showLine({
        text: "嘴角一点点咧开，露出一个过于正常的笑容。",
        background: "closeupSmile"
      });
      await this.showLine({
        speaker: "PC",
        text: "……找到了。",
        background: "closeupSmile"
      });

      await this.showFreezeAndSnow();
    }

    async preload() {
      const images = Object.values(this.assets).map((source) => {
        const image = new Image();
        image.src = source;
        return waitForImage(image);
      });
      await Promise.all(images);
    }

    async setBackground(name, immediate = false) {
      const source = this.assets[name];
      if (!source) throw new Error(`SAN 归零演出缺少背景：${name}`);

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
      await this.delay(120);
      current.classList.remove("is-active");
      await this.delay(620);
    }

    async setPortrait(name, type) {
      if (!name) {
        const wasVisible = !this.portrait.hidden;
        this.portrait.classList.remove("is-visible");
        if (!wasVisible) return;
        await this.delay(220);
        this.portrait.hidden = true;
        return;
      }
      const source = this.assets[name];
      if (!source) throw new Error(`SAN 归零演出缺少立绘：${name}`);
      this.portrait.classList.remove("is-visible");
      this.portrait.hidden = false;
      this.portrait.classList.toggle("is-doctor", type === "doctor");
      this.portrait.classList.toggle("is-pc", type === "pc");
      if (this.portrait.src !== new URL(source, document.baseURI).href) {
        this.portrait.src = source;
        await waitForImage(this.portrait);
      }
      this.portrait.classList.add("is-visible");
    }

    async showLine({ speaker = "", text = "", background, portrait = null, portraitType = "" }) {
      if (background) await this.setBackground(background);
      await this.setPortrait(portrait, portraitType);
      this.speaker.textContent = speaker;
      this.speaker.hidden = !speaker;
      this.line.textContent = text;
      this.dialogue.classList.add("is-visible");
      this.alignPortraitToDialogue();
      requestAnimationFrame(() => this.alignPortraitToDialogue());
      this.overlay.classList.add("is-waiting");
      this.overlay.addEventListener("click", this.handleAdvance);
      document.addEventListener("keydown", this.handleAdvance);
      await new Promise((resolve) => {
        this.resolveAdvance = resolve;
      });
      this.overlay.removeEventListener("click", this.handleAdvance);
      document.removeEventListener("keydown", this.handleAdvance);
      this.overlay.classList.remove("is-waiting");
      this.dialogue.classList.remove("is-visible");
      await this.setPortrait(null);
    }

    async showScream() {
      this.dialogue.classList.remove("is-visible");
      await this.setPortrait(null);
      this.scream.textContent = SCREAM_TEXT;
      this.overlay.classList.add("is-screaming");
      this.scream.classList.add("is-visible");
      await this.delay(3000);
      this.scream.classList.remove("is-visible");
      this.overlay.classList.remove("is-screaming");
      await this.delay(320);
    }

    async showFreezeAndSnow() {
      await this.setPortrait(null);
      this.overlay.classList.add("is-frozen");
      await this.delay(700);

      this.dialogue.classList.remove("is-visible");
      this.snow.hidden = false;
      const context = this.snow.getContext("2d", { alpha: false });
      const pixels = context.createImageData(this.snow.width, this.snow.height);
      const renderNoise = () => {
        for (let index = 0; index < pixels.data.length; index += 4) {
          const value = Math.random() > 0.48
            ? 215 + Math.floor(Math.random() * 41)
            : Math.floor(Math.random() * 91);
          pixels.data[index] = value;
          pixels.data[index + 1] = value;
          pixels.data[index + 2] = value;
          pixels.data[index + 3] = 255;
        }
        context.putImageData(pixels, 0, 0);
        this.snowFrame = requestAnimationFrame(renderNoise);
      };
      renderNoise();
      await this.delay(720);
      cancelAnimationFrame(this.snowFrame);
      this.snowFrame = null;

      this.overlay.classList.add("is-flashing");
      await this.delay(90);
      this.overlay.classList.remove("is-flashing");
      await this.delay(180);
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
      if (this.snowFrame !== null) cancelAnimationFrame(this.snowFrame);
      this.snowFrame = null;
      this.overlay.removeEventListener("click", this.handleAdvance);
      document.removeEventListener("keydown", this.handleAdvance);
      window.removeEventListener("resize", this.handleResize);
      this.resolveAdvance = null;
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

  Game.SanZeroSequence = SanZeroSequence;
  Game.playSanZeroSequence = (options) => new SanZeroSequence(options).play();
})(window.TrainGame);
