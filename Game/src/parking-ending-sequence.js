(function (Game) {
  "use strict";

  const DEFAULT_ASSETS = {
    frontCarriage: "assets/Image/Scene/Background/front-carriage.webp",
    devoured: "assets/Video/swallowed.mp4",
    carriage03: "assets/Image/Scene/Background/carriage-03.webp"
  };
  const IMAGE_LOAD_TIMEOUT_MS = 12000;
  const ENDING_TITLE = Game.ENDING_CATALOG.find((ending) => ending.id === "bad_end")?.title || "停车结局";
  const VIDEO_LOAD_TIMEOUT_MS = 30000;

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
      const handleError = () => finish(new Error(`停车结局图片加载失败：${image.src}`));
      const timeout = setTimeout(
        () => finish(new Error(`停车结局图片加载超时：${image.src}`)),
        IMAGE_LOAD_TIMEOUT_MS
      );
      image.addEventListener("load", handleLoad, { once: true });
      image.addEventListener("error", handleError, { once: true });
    });
  }

  function waitForVideo(video) {
    if (video.readyState >= 2) return Promise.resolve();
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        video.removeEventListener("loadeddata", handleLoaded);
        video.removeEventListener("error", handleError);
        if (error) reject(error);
        else resolve();
      };
      const handleLoaded = () => finish();
      const handleError = () => finish(new Error(`停车结局视频加载失败：${video.src}`));
      const timeout = setTimeout(
        () => finish(new Error(`停车结局视频加载超时：${video.src}`)),
        VIDEO_LOAD_TIMEOUT_MS
      );
      video.addEventListener("loadeddata", handleLoaded, { once: true });
      video.addEventListener("error", handleError, { once: true });
    });
  }

  class ParkingEndingSequence {
    constructor(options = {}) {
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.audio = options.audio || null;
      this.backgroundAudio = options.backgroundAudio || null;
      this.assets = { ...DEFAULT_ASSETS, ...(options.assets || {}) };
      this.timers = new Set();
      this.resolveAdvance = null;
      this.autoAdvanceTimer = null;
      this.eatingVoice = null;
      this.running = null;

      this.overlay = createElement("section", "parking-ending-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", ENDING_TITLE);

      this.cinema = createElement("div", "parking-ending-cinema");
      this.backgroundPrimary = createElement("img", "parking-ending-background is-active");
      this.backgroundPrimary.alt = "";
      this.backgroundSecondary = createElement("img", "parking-ending-background");
      this.backgroundSecondary.alt = "";
      this.devouredVideo = createElement("video", "parking-ending-video");
      this.devouredVideo.src = this.assets.devoured;
      this.devouredVideo.muted = true;
      this.devouredVideo.playsInline = true;
      this.devouredVideo.preload = "auto";
      this.devouredVideo.setAttribute("aria-hidden", "true");
      this.speed = createElement("div", "parking-ending-speed");
      this.blood = createElement("div", "parking-ending-blood");
      this.vignette = createElement("div", "parking-ending-vignette");

      this.memory = createElement("div", "parking-ending-memory");
      this.memoryLabel = createElement("p", "parking-ending-memory-label", "你想起一路上那些字：");
      this.memoryWord = createElement("p", "parking-ending-memory-word", "MOVE FORWARD");
      this.memory.append(this.memoryLabel, this.memoryWord);

      this.caption = createElement("div", "parking-ending-caption");
      this.captionLine = createElement("p", "parking-ending-caption-line");
      this.caption.append(this.captionLine);

      this.desperation = createElement("div", "parking-ending-desperation");
      this.desperation.setAttribute("aria-live", "polite");
      this.desperationLine = createElement("p", "parking-ending-desperation-line");
      this.desperationWall = createElement("div", "parking-ending-desperation-wall");
      this.desperationWall.setAttribute("aria-hidden", "true");
      for (let index = 0; index < 48; index += 1) {
        this.desperationWall.append(createElement("span", "", "我不想死"));
      }
      this.desperation.append(this.desperationWall, this.desperationLine);

      this.dialogue = createElement("div", "parking-ending-dialogue");
      this.line = createElement("p", "parking-ending-line");
      this.hint = createElement("span", "parking-ending-hint", "点击继续");
      this.dialogue.append(this.line, this.hint);

      this.blackout = createElement("div", "parking-ending-blackout");
      this.cinema.append(
        this.backgroundPrimary,
        this.backgroundSecondary,
        this.devouredVideo,
        this.speed,
        this.blood,
        this.vignette,
        this.memory,
        this.caption,
        this.desperation
      );
      this.overlay.append(this.cinema, this.dialogue, this.blackout);

      this.handleAdvance = (event) => {
        if (!this.resolveAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        if (event.type === "click") event.preventDefault();
        if (event.type === "keydown") event.preventDefault();
        this.advance();
      };
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

      this.stopBackgroundAudio();
      await this.setBackground("frontCarriage", true);
      const speedVoice = this.playSound("metro_speed_down", { volume: 0.95 });

      await this.showLine({
        text: "拉杆减速，列车停下的瞬间，四周陷入漆黑。",
        auto: 2800,
        stageClass: "is-braking"
      });
      await this.fadeToBlack(2200);
      speedVoice?.stop?.();

      this.overlay.classList.add("is-black");
      await this.delay(620);

      this.eatingVoice = this.playSound("eating_crisps", { loop: true, volume: 0.12 });
      const eatingRamp = this.rampVolume(this.eatingVoice, 0.12, 0.88, 3000);
      await this.showLine({
        text: "嘎吱嘎吱的咀嚼声接近。",
        auto: 2800
      });
      await eatingRamp;

      this.eatingVoice?.stop?.({ immediate: true });
      this.eatingVoice = null;
      // badend 音乐从血水出现这一刻开始，用较长淡入避免突然切入。
      this.backgroundAudio?.setTrack?.("ending_bad", { fadeMs: 4200 });
      this.overlay.classList.add("is-blood");
      await this.showLine({
        text: "脚下流过粘稠血水与残骸。",
        auto: 3200
      });

      await this.showLine({
        text: "你想起一路上那些字：",
        auto: 1800
      });
      await this.showMemory(2600);

      this.overlay.classList.remove("is-blood");
      this.overlay.classList.add("is-devoured");
      const revealPromise = this.revealFromBlack(1800);
      const videoStarted = await this.playDevouredVideo();
      await revealPromise;
      await this.showDesperation("我不想死。", 1500, "is-whisper");
      await this.showDesperation("我不想死，我不想死", 1800, "is-panic");
      await this.showDesperationWall(2600);
      await this.showDesperation(
        "失去意识之前，你用尽最后的力气发出一条消息",
        2500,
        "is-narration"
      );
      await this.showDesperation("不要停下", 2000, "is-message");
      await this.showDesperation(
        "你感受到自己渐渐与它们融为一体。",
        3600,
        "is-narration"
      );
      await this.showDesperation(
        "主将重现…主将重现…",
        4600,
        "is-message"
      );
      if (videoStarted && Number.isFinite(this.devouredVideo.duration)) {
        const remaining = Math.max(0, this.devouredVideo.duration - this.devouredVideo.currentTime);
        await this.delay(remaining * 1000);
      }

      this.overlay.classList.add("is-swallowing");
      await this.showCaption("意识与身体一同消失……", 2600);
      await this.fadeToBlack(2300);

      this.overlay.classList.remove("is-blood", "is-devoured", "is-swallowing");
      await this.delay(700);
      await this.setBackground("carriage03", true);
      this.overlay.classList.add("is-awakening");
      this.eatingVoice?.setVolume?.(0.28);
      await this.revealFromBlack(1800);

      await this.showLine({
        text: "在座位上醒来，分不清梦境与现实。",
        auto: 3200
      });
      await this.showLine({
        text: "啃食声挥之不去，从此恐惧度日。",
        auto: 3400
      });

      await this.fadeToBlack(900);
    }

    async preload() {
      const imageSources = [
        this.assets.frontCarriage,
        this.assets.carriage03
      ];
      await Promise.all(imageSources.map((source) => {
        const image = new Image();
        image.src = source;
        return waitForImage(image);
      }));
      await waitForVideo(this.devouredVideo);
    }

    async setBackground(name, immediate = false) {
      const source = this.assets[name];
      if (!source) throw new Error(`停车结局缺少背景：${name}`);

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
      await this.delay(680);
    }

    async showLine({ text = "", auto = 0, stageClass = "" }) {
      if (stageClass) this.overlay.classList.add(stageClass);
      this.line.textContent = text;
      this.hint.hidden = auto > 0 || !text;
      this.dialogue.classList.toggle("is-visible", text !== "");

      if (auto > 0) await this.waitForAdvance(auto);
      else if (text) await this.waitForAdvance(0);

      this.dialogue.classList.remove("is-visible");
      if (stageClass) this.overlay.classList.remove(stageClass);
      await this.delay(180);
    }

    async showMemory(duration) {
      this.dialogue.classList.remove("is-visible");
      this.overlay.classList.add("is-memory");
      await this.waitForAdvance(duration);
      this.overlay.classList.remove("is-memory");
      await this.delay(420);
    }

    async showCaption(text, duration) {
      this.captionLine.textContent = text;
      this.caption.classList.add("is-visible");
      await this.waitForAdvance(duration);
      this.caption.classList.remove("is-visible");
      await this.delay(420);
    }

    async showDesperation(text, duration, mode) {
      this.desperationLine.textContent = text;
      this.desperation.className = `parking-ending-desperation is-visible ${mode}`;
      await this.waitForAdvance(duration);
      this.desperation.className = "parking-ending-desperation";
      await this.delay(180);
    }

    async showDesperationWall(duration) {
      this.desperationLine.textContent = "我不想死";
      this.desperation.className = "parking-ending-desperation is-visible is-wall";
      await this.waitForAdvance(duration);
      this.desperation.className = "parking-ending-desperation";
      await this.delay(180);
    }

    async playDevouredVideo() {
      try {
        this.devouredVideo.currentTime = 0;
        await this.devouredVideo.play();
        return true;
      } catch (error) {
        console.warn("停车结局吞噬视频未能自动播放：", error);
        return false;
      }
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

    async rampVolume(voice, from, to, duration) {
      if (!voice || typeof voice.setVolume !== "function") {
        await this.delay(duration);
        return;
      }
      const steps = Math.max(1, Math.ceil(duration / 80));
      voice.setVolume(from);
      for (let step = 1; step <= steps; step += 1) {
        await this.delay(duration / steps);
        if (voice.stopped) return;
        voice.setVolume(from + (to - from) * (step / steps));
      }
    }

    stopBackgroundAudio() {
      this.audio?.stopAll?.();
      this.backgroundAudio?.stopAll?.();
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
      this.resolveAdvance = null;
      this.eatingVoice?.stop?.();
      this.eatingVoice = null;
      this.backgroundAudio?.stopAll?.({ duration: 1600 });
      this.devouredVideo.pause();
      this.audio?.stopAll?.();
      const overlay = this.overlay;
      setTimeout(() => overlay.remove(), 0);
      this.running = null;
    }
  }

  Game.ParkingEndingSequence = ParkingEndingSequence;
  Game.playParkingEndingSequence = (options) => new ParkingEndingSequence(options).play();
})(window.TrainGame);
