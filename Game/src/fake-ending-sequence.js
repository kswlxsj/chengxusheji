(function (Game) {
  "use strict";

  const DEFAULT_ASSETS = {
    frontCarriage: "assets/Image/Scene/Background/front-carriage.webp",
    carriage06: "assets/Image/Scene/Background/carriage-06.webp",
    platform: "assets/Image/Scene/Background/sunny-platform.webp",
    moveBlur: "assets/Image/Scene/Background/move-blur.webp",
    move: "assets/Image/Scene/Background/move.webp",
    pcHappy: "assets/Image/Portrait/player-happy.webp",
    pcScared: "assets/Image/Portrait/player-scared.webp"
  };
  const IMAGE_LOAD_TIMEOUT_MS = 12000;
  const ENDING_TITLE = Game.ENDING_CATALOG.find((ending) => ending.id === "fake_end")?.title || "伪结局";
  const FAKE_ENDING_MUSIC = "ending_he2";
  const FAKE_ENDING_MUSIC_FADE_IN_MS = 4200;
  const MOVE_MUSIC_PLAYBACK_RATE = 0.68;

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
      const handleError = () => finish(new Error(`伪结局图片加载失败：${image.src}`));
      const timeout = setTimeout(
        () => finish(new Error(`伪结局图片加载超时：${image.src}`)),
        IMAGE_LOAD_TIMEOUT_MS
      );
      image.addEventListener("load", handleLoad, { once: true });
      image.addEventListener("error", handleError, { once: true });
    });
  }

  class FakeEndingSequence extends Game.EndingASequence {
    constructor(options = {}) {
      super({
        ...options,
        assets: { ...DEFAULT_ASSETS, ...(options.assets || {}) }
      });
      this.overlay.setAttribute("aria-label", ENDING_TITLE);
    }

    async run() {
      this.root.append(this.overlay);
      this.overlay.classList.add("is-visible", "is-loading");
      await this.preload();
      this.overlay.classList.remove("is-loading");
      this.stopAudio();
      this.playEndingMusic(FAKE_ENDING_MUSIC, FAKE_ENDING_MUSIC_FADE_IN_MS);
      await this.setBackground("frontCarriage", true);

      this.speedVoice = this.playSound("metro_speed_up", { volume: 0.92 });
      await this.showLine({
        text: "电车加速到极致，视野被刺眼白光覆盖。",
        auto: 3200,
        stageClass: "is-accelerating"
      });

      await this.fadeToWhite(1900);
      this.audio?.stopAll?.();
      await this.setBackground("carriage06", true);
      this.playSound("metro_arriving", { volume: 0.9 });
      await this.revealFromWhite(620);

      await this.showLine({ text: "你睁开眼，发现自己仍坐在6号车厢。" });
      await this.showLine({ text: "广播声响起——" });
      await this.showLine({ text: "终点站已到。" });
      await this.setBackground("platform");
      await this.showLine({ text: "车厢里的人们陆续醒来，揉着眼睛下车。" });
      await this.showLine({ text: "你翻看背包：便签、报纸、手机、手电筒——全都不在了。" });
      await this.showLine({ text: "那是一场共同的噩梦。恐怖的记忆慢慢淡忘。" });

      this.audio?.stopAll?.();
      this.playSound("airport_gate1", { volume: 0.88 });
      await this.showLine({ text: "你跟在人群后面走出站台。" });
      await this.showLine({ text: "身后，末班电车的车门缓缓关闭。" });
      await this.showLine({ text: "阳光正好，刚刚的一切都好像一场梦，人群叽叽喳喳，一切生机盎然。" });
      await this.showLine({ text: "这是……活下来了吗？" });
      await this.showLine({ text: "“太好了！”", portrait: "pcHappy" });

      await this.setBackground("moveBlur");
      await this.showLine({ text: "“欸，那是什么？”" });
      // 只切掉站台环境音，伪结局 BGM 要持续到 MOVE FORWARD，并在画面出现时变调。
      this.audio?.stopAll?.();
      this.overlay.classList.add("is-silent-cut");
      await this.delay(100);
      this.overlay.classList.remove("is-silent-cut");
      await this.showLine({ text: "“！”", portrait: "pcScared" });

      await this.setBackground("move", true);
      this.backgroundAudio?.setPlaybackRate?.(MOVE_MUSIC_PLAYBACK_RATE);
      await this.showLine({ text: "", hold: 2400, stageClass: "is-final" });
      await this.fadeToBlack(900);
    }

    async preload() {
      await Promise.all(Object.values(DEFAULT_ASSETS).map((source) => {
        const image = new Image();
        image.src = source;
        return waitForImage(image);
      }));
    }
  }

  Game.FakeEndingSequence = FakeEndingSequence;
  Game.playFakeEndingSequence = (options) => new FakeEndingSequence(options).play();
})(window.TrainGame);
