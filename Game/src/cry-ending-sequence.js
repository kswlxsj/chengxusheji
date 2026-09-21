(function (Game) {
  "use strict";

  const ASSETS = {
    memory: "assets/Image/Scene/Background/op-01.webp",
    trueEndVideo: "assets/Video/trueend.mp4",
    crewDead: "assets/Image/Scene/Background/chengwuyuan-dead.png",
    wake: "assets/Image/Scene/Background/carriage-03.webp",
    home: "assets/Image/Scene/Background/home1.png",
    homeFlash: "assets/Image/Scene/Background/home2.png"
  };
  const TITLE = "那半梦半醒中入耳穿骨的哭泣";

  function element(tag, className) {
    const node = document.createElement(tag);
    node.className = className;
    return node;
  }

  class CryEndingSequence {
    constructor({ root, audio, backgroundAudio } = {}) {
      this.root = root || document.querySelector("#game-shell") || document.body;
      this.audio = audio;
      this.backgroundAudio = backgroundAudio;
      this.timers = new Set();
      this.currentAdvance = null;
      this.autoTimer = null;
      this.overlay = element("section", "cry-ending is-loading");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", TITLE);
      this.stage = element("div", "cry-ending-stage");
      this.images = [element("img", "cry-ending-image is-active"), element("img", "cry-ending-image")];
      for (const image of this.images) image.alt = "";
      this.video = element("video", "cry-ending-video");
      this.video.src = ASSETS.trueEndVideo;
      this.video.preload = "auto";
      this.video.playsInline = true;
      this.video.setAttribute("aria-hidden", "true");
      this.stage.append(...this.images, this.video);
      this.white = element("div", "cry-ending-white");
      this.black = element("div", "cry-ending-black");
      this.copy = element("div", "cry-ending-copy");
      this.line = element("p", "cry-ending-line");
      this.hint = element("span", "cry-ending-hint");
      this.copy.append(this.line, this.hint);
      this.overlay.append(this.stage, this.white, this.black, this.copy);
      this.onAdvance = (event) => {
        if (!this.currentAdvance) return;
        if (event.type === "keydown" && !["Enter", " ", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
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
      await this.preload();
      this.overlay.classList.remove("is-loading");
      this.overlay.classList.add("is-visible");
      this.backgroundAudio?.setTrack?.("ending_he", { fadeMs: 2400 });
      this.audio?.play?.("metro_speed_up", { volume: 0.95 });
      this.overlay.classList.add("is-accelerating");
      this.white.classList.add("is-visible");
      await this.show("你毅然决然向上拉了拉杆。", 2200);
      this.overlay.classList.remove("is-accelerating");
      await this.show("你听到了列车加速的声音，震动着五脏六腑。", 2700);
      await this.show("陡然增加的加速度让你喘不过气，意识恍惚之际，脑海中突然闪过一些模糊的片段。", 3300);

      await this.setImage(0, true);
      this.overlay.classList.add("is-memory-blurred");
      this.white.classList.remove("is-visible");
      await this.delay(1400);
      await this.show("眼前像蒙了一层雾，你努力想要看清。", 2500);
      this.overlay.classList.remove("is-memory-blurred");
      this.overlay.classList.add("is-memory-clear");
      await this.show("——哦。原来是在回家的时候在列车上抱怨的你自己。", 2900);
      this.overlay.classList.remove("is-memory-clear");
      this.overlay.classList.add("is-memory-blurred");
      await this.show("想到自己未经大脑许的那个愿望，虽然现在还是喘不过气，但是你莫名其妙笑了出来。", 3300);
      await this.show("一边笑一边咳嗽。", 1900);
      await this.show("明明是自己寻求的改变，到最后还是选择回到原来的生活。", 2900);

      this.overlay.classList.remove("is-memory-blurred", "is-memory-clear");
      await this.playVideo();
      await this.show("留下会不会更好，说不定这样反而能活下来。", 2800);
      await this.show("算了，没有下次了。", 1900);
      await this.show("所有的神，鬼，恶心的东西，或者美好的幻象，", 2600);
      await this.show("都去他的吧。", 1900);
      await this.show("不去试一下，怎么知道。", 2400);
      await this.fadeVideoOut();
      await this.setImage(1, true);
      await this.show("弥留之际，不知为何，你的眼前闪过乘务员痛苦扭曲的样子。", 2900);
      this.black.classList.add("is-visible");
      await this.delay(1000);
      this.video.pause();
      await this.setImage(0, true, ASSETS.wake);
      this.backgroundAudio?.setTrack?.("ending_he2", { fadeMs: 2800 });
      this.black.classList.remove("is-visible");
      await this.show("你猛地惊醒。这是哪？", 2300);
      await this.show("无人回应你，列车空空荡荡。", 2200);
      await this.show("你来不及多想，连滚带爬出了车厢。", 2400);
      await this.setImage(1, false, ASSETS.home);
      await this.show("新鲜空气涌入肺中的感觉前所未有的好。你心有余悸，不敢多停留，冲回家中。", 3600);
      await this.show("你活下来了。", 1800);
      await this.show("你几乎要喜极而泣，发誓要好好生活。", 2600);
      this.backgroundAudio?.current?.setPlaybackRate?.(0.58);
      this.overlay.classList.add("is-home-flash");
      await this.setImage(0, true, ASSETS.homeFlash);
      await this.delay(420);
      await this.setImage(1, true, ASSETS.home);
      this.overlay.classList.remove("is-home-flash");
      this.backgroundAudio?.current?.setPlaybackRate?.(1);
      await this.show("刚刚那是什么？", 1500);
      await this.show("你不愿多想，也不敢多想。", 2100);
      await this.show("都过去了，都过去了。", 1900);
      await this.show("你安慰着自己。", 1800);
      await this.setImage(0, true, ASSETS.homeFlash);
      this.audio?.play?.("cry_of_despair_girls", { volume: 1 });
      await this.show("除了耳边依然回荡着的，乘务员撕心裂肺的哭喊。", 4200);
      this.black.classList.add("is-visible");
      await this.delay(1200);
    }

    async preload() {
      await Promise.all([ASSETS.memory, ASSETS.crewDead, ASSETS.wake, ASSETS.home, ASSETS.homeFlash].map((src) => new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = src;
      })));
      this.video.load();
    }

    async setImage(index, immediate = false, source = null) {
      const active = this.images.findIndex((image) => image.classList.contains("is-active"));
      const nextIndex = index ?? (active === 0 ? 1 : 0);
      const next = this.images[nextIndex];
      next.src = source || (nextIndex === 0 ? ASSETS.memory : ASSETS.crewDead);
      next.classList.add("is-active");
      if (immediate) this.images[1 - nextIndex].classList.remove("is-active");
      else {
        await this.delay(700);
        this.images[1 - nextIndex].classList.remove("is-active");
      }
    }

    async playVideo() {
      this.video.currentTime = 0;
      this.video.volume = 0.85;
      try { await this.video.play(); } catch (_error) {
        this.video.muted = true;
        try { await this.video.play(); } catch (_mutedError) { /* 继续对白演出 */ }
      }
      this.video.classList.add("is-visible");
      await this.delay(900);
    }

    async fadeVideoOut() {
      this.video.classList.remove("is-visible");
      await this.delay(900);
      this.video.pause();
    }

    show(text, duration, stageClass = "") {
      this.line.textContent = text;
      this.copy.classList.add("is-visible");
      this.hint.textContent = "点击继续";
      if (stageClass) this.overlay.classList.add(stageClass);
      return this.waitAdvance(duration).then(() => {
        this.copy.classList.remove("is-visible");
        if (stageClass) this.overlay.classList.remove(stageClass);
        return this.delay(130);
      });
    }

    waitAdvance(duration) {
      return new Promise((resolve) => {
        this.currentAdvance = resolve;
        this.overlay.addEventListener("click", this.onAdvance);
        document.addEventListener("keydown", this.onAdvance);
        this.autoTimer = setTimeout(() => this.advance(), duration);
      });
    }

    advance() {
      if (!this.currentAdvance) return;
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
      this.overlay.removeEventListener("click", this.onAdvance);
      document.removeEventListener("keydown", this.onAdvance);
      const resolve = this.currentAdvance;
      this.currentAdvance = null;
      resolve();
    }

    delay(ms) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => { this.timers.delete(timer); resolve(); }, ms);
        this.timers.add(timer);
      });
    }

    close() {
      this.advance();
      for (const timer of this.timers) clearTimeout(timer);
      this.timers.clear();
      this.video.pause();
      this.backgroundAudio?.stopAll?.({ duration: 1400 });
      this.overlay.remove();
      this.running = null;
    }
  }

  Game.CryEndingSequence = CryEndingSequence;
  Game.playCryEndingSequence = (options) => new CryEndingSequence(options).play();
})(window.TrainGame);
