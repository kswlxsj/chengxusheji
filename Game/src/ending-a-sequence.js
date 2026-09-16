(function (Game) {
  "use strict";

  const DEFAULT_ASSETS = {
    frontCarriage: "assets/Image/Scene/Background/front-carriage.png",
    memory: "assets/Image/Scene/Background/op-01.png",
    trueEndVideo: "assets/video/trueend.mp4",
    terminalPlatform: "assets/Image/Scene/Background/true-end-platform.png",
    welcome: "assets/Image/Scene/Background/welcome.PNG",
    conductorSmile: "assets/Image/Portrait/conductor.png",
    pcHappy: "assets/Image/Portrait/player-happy.png"
  };
  const IMAGE_LOAD_TIMEOUT_MS = 12000;
  const ENDING_TITLE = Game.ENDING_CATALOG.find((ending) => ending.id === "true_end")?.title || "真结局";

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
      const handleError = () => finish(new Error(`真结局图片加载失败：${image.src}`));
      const timeout = setTimeout(
        () => finish(new Error(`真结局图片加载超时：${image.src}`)),
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
      this.backgroundAudio = options.backgroundAudio || null;
      this.assets = { ...DEFAULT_ASSETS, ...(options.assets || {}) };
      this.timers = new Set();
      this.resolveAdvance = null;
      this.autoAdvanceTimer = null;
      this.running = null;
      this.speedVoice = null;

      this.overlay = createElement("section", "ending-a-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
      this.cinema = createElement("div", "ending-a-cinema");
      this.backgroundPrimary = createElement("img", "ending-a-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "ending-a-background");
      this.backgroundSecondary.alt = "";
      this.video = createElement("video", "ending-a-video");
      this.video.src = this.assets.trueEndVideo;
      this.video.playsInline = true;
      this.video.preload = "auto";
      this.video.setAttribute("aria-hidden", "true");
      this.portrait = createElement("img", "ending-a-portrait");
      this.portrait.alt = "";
      this.portrait.hidden = true;
      this.cinema.append(this.backgroundPrimary, this.backgroundSecondary, this.video, this.portrait);

      this.dialogue = createElement("div", "ending-a-dialogue");
      this.speaker = createElement("p", "ending-a-speaker");
      this.speaker.hidden = true;
      this.line = createElement("p", "ending-a-line");
      this.hint = createElement("span", "ending-a-hint", "点击继续");
      this.dialogue.append(this.speaker, this.line, this.hint);
      this.white = createElement("div", "ending-a-white");
      this.blackout = createElement("div", "ending-a-blackout");
      this.overlay.append(this.cinema, this.white, this.blackout, this.dialogue);

      this.handleAdvance = (event) => {
        if (!this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
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
      this.stopAudio();
      await this.setBackground("frontCarriage", true);
      this.speedVoice = this.playSound("metro_speed_up", { volume: 0.95 });
      await this.showLine({ text: "你不顾乘务员反对，向上拉了拉杆。", auto: 2400, stageClass: "is-accelerating" });

      await this.fadeToWhite(2100);
      await this.showLine({ text: "你听到了列车加速的声音，震动着五脏六腑。", auto: 3000 });
      await this.showLine({
        text: "陡然增加的加速度让你喘不过气，意识恍惚之际，脑海中突然闪过一些模糊的片段。",
        auto: 4300
      });

      await this.setBackground("memory", true);
      this.overlay.classList.add("is-memory-blurred");
      await this.revealFromWhite(1700);
      const clearMemory = this.delay(120).then(() => {
        this.overlay.classList.remove("is-memory-blurred");
        this.overlay.classList.add("is-memory-clear");
      });
      await this.showLine({ text: "眼前像蒙了一层雾，你努力想要看清。", auto: 3600 });
      await clearMemory;
      await this.showLine({ text: "——哦。原来是在回家的时候，在列车上抱怨的你自己。", auto: 3800 });
      this.overlay.classList.remove("is-memory-clear");
      this.overlay.classList.add("is-memory-blurred");
      await this.showLine({
        text: "想到自己未经大脑许下的那个愿望，虽然现在还是喘不过气，但是你莫名其妙笑了出来。",
        auto: 4400
      });
      await this.showLine({ text: "一边笑，一边咳嗽。", auto: 2300 });
      await this.showLine({ text: "明明是自己寻求的改变，到最后还是选择回到原来的生活。", auto: 3900 });

      this.speedVoice?.stop?.();
      this.speedVoice = null;
      this.overlay.classList.remove("is-memory-blurred", "is-memory-clear");
      await this.playTrueEndVideo();
      await this.showLine({ text: "留下会不会更好，说不定这样反而能活下来。", auto: 3300 });
      await this.showLine({ text: "算了，没有下次了。", auto: 2400 });
      await this.showLine({ text: "所有的神，鬼，恶心的东西，或者美好的幻象，", auto: 3600 });
      await this.showLine({ text: "都去他的吧。", auto: 2300 });
      await this.showLine({ text: "不去试一下，怎么知道。", auto: 3200 });

      await this.fadeToBlack(1500);
      this.video.pause();
      this.video.classList.remove("is-visible");
      await this.setBackground("terminalPlatform", true);
      await this.revealFromBlack(1300);
      await this.showLine({ text: "你猛地惊醒。这是哪？", auto: 2800 });
      await this.showLine({
        speaker: "列车员",
        text: "您好，我们已经到终点站了，您好像睡着了。坐过站的话，可以坐另外一班回去。",
        portrait: "conductorSmile"
      });
      await this.showLine({ speaker: "PC", text: "啊？哦，不用了，我从这里下就好。", portrait: "pcHappy" });
      await this.showLine({ text: "你踉踉跄跄地走出了车厢，留下乘务员在背后担忧地望着你。", auto: 3900 });
      await this.showLine({ text: "新鲜空气涌入肺中的感觉前所未有的好。", auto: 3300 });

      await this.setBackground("welcome");
      await this.showLine({ text: "你活下来了，明天依旧是无聊的一天。", auto: 3600 });
      await this.showLine({ text: "崭新的一天。", auto: 3600, stageClass: "is-final" });
      await this.fadeToBlack(1100);
    }

    async preload() {
      const imageSources = [
        this.assets.frontCarriage,
        this.assets.memory,
        this.assets.terminalPlatform,
        this.assets.welcome,
        this.assets.conductorSmile,
        this.assets.pcHappy
      ];
      await Promise.all(imageSources.map((source) => {
        const image = new Image();
        image.src = source;
        return waitForImage(image);
      }));
      // 视频会在前面的对白播放期间继续预载；不要让 35 MB 视频阻塞结局开场。
      this.video.load();
    }

    async setBackground(name, immediate = false) {
      const source = this.assets[name];
      if (!source) throw new Error(`真结局缺少背景：${name}`);
      const current = this.backgroundPrimary.classList.contains("is-active")
        ? this.backgroundPrimary
        : this.backgroundSecondary;
      const next = current === this.backgroundPrimary ? this.backgroundSecondary : this.backgroundPrimary;
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
      await this.delay(760);
    }

    async setPortrait(name, immediate = false) {
      if (!name) {
        if (this.portrait.hidden) return;
        this.portrait.classList.remove("is-visible", "is-conductor", "is-pc");
        if (!immediate) await this.delay(240);
        this.portrait.hidden = true;
        return;
      }
      const source = this.assets[name];
      if (!source) throw new Error(`真结局缺少立绘：${name}`);
      this.portrait.classList.remove("is-visible", "is-conductor", "is-pc");
      this.portrait.hidden = false;
      this.portrait.classList.add(name === "conductorSmile" ? "is-conductor" : "is-pc");
      if (this.portrait.src !== new URL(source, document.baseURI).href) {
        this.portrait.src = source;
        await waitForImage(this.portrait);
      }
      this.portrait.classList.add("is-visible");
    }

    async showLine({ text = "", speaker = "", portrait = null, auto = 0, hold = 0, stageClass = "" }) {
      await this.setPortrait(portrait);
      if (stageClass) this.overlay.classList.add(stageClass);
      this.speaker.textContent = speaker;
      this.speaker.hidden = !speaker;
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

    async playTrueEndVideo() {
      this.video.currentTime = 0;
      this.video.volume = 0.9;
      try {
        await this.video.play();
      } catch (error) {
        this.video.muted = true;
        try {
          await this.video.play();
        } catch (mutedError) {
          console.warn("真结局视频未能自动播放：", mutedError || error);
        }
      }
      this.video.classList.add("is-visible");
      await this.delay(1600);
    }

    waitForAdvance(autoMilliseconds = 0) {
      return new Promise((resolve) => {
        this.resolveAdvance = resolve;
        this.overlay.addEventListener("click", this.handleAdvance);
        document.addEventListener("keydown", this.handleAdvance);
        if (autoMilliseconds > 0) this.autoAdvanceTimer = setTimeout(() => this.advance(), autoMilliseconds);
      });
    }

    advance() {
      if (!this.resolveAdvance) return;
      const resolve = this.resolveAdvance;
      this.resolveAdvance = null;
      if (this.autoAdvanceTimer !== null) clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
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

    async fadeToBlack(duration) {
      this.blackout.style.transitionDuration = `${duration}ms`;
      this.blackout.classList.add("is-visible");
      await this.delay(duration);
    }

    async revealFromBlack(duration) {
      this.blackout.style.transitionDuration = `${duration}ms`;
      this.blackout.classList.remove("is-visible");
      await this.delay(duration);
    }

    playSound(sound, options = {}) {
      if (!this.audio || typeof this.audio.play !== "function") return null;
      return this.audio.play(sound, options);
    }

    stopAudio() {
      this.audio?.stopAll?.();
      this.backgroundAudio?.stopAll?.();
    }

    delay(milliseconds) {
      return new Promise((resolve) => {
        const timer = { handle: null, resolve };
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
      this.speedVoice?.stop?.();
      this.speedVoice = null;
      this.video.pause();
      this.stopAudio();
      this.overlay.remove();
      this.running = null;
    }

    alignPortraitToDialogue() {
      if (this.portrait.hidden || !this.dialogue.classList.contains("is-visible")) return;
      const stageRect = this.root.getBoundingClientRect();
      const dialogueRect = this.dialogue.getBoundingClientRect();
      this.portrait.style.bottom = `${Math.max(0, stageRect.bottom - dialogueRect.top)}px`;
    }
  }

  Game.EndingASequence = EndingASequence;
  Game.playEndingASequence = (options) => new EndingASequence(options).play();
})(window.TrainGame);
