(function (Game) {
  "use strict";

  const ASSETS = {
    background: "assets/Image/Scene/Background/thanks.jpg",
    video: "assets/video/thanks.mp4"
  };
  const THANKS_LINES = [
    "感谢终末列车组的所有成员",
    "是大家无私的精诚合作造就了《常暗之厢》这一奇迹",
    "感谢在屏幕前游玩的您",
    "即使在列车上共度的时间非常短暂",
    "我们仍然希望为您带来一段难忘的时光"
  ];

  function createElement(tagName, className, textContent = "") {
    const element = document.createElement(tagName);
    element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  function waitForImage(image) {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve) => {
      const finish = () => {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);
        resolve();
      };
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    });
  }

  function waitForVideo(video) {
    if (video.readyState >= 2) return Promise.resolve();
    return new Promise((resolve) => {
      const finish = () => {
        video.removeEventListener("loadeddata", finish);
        video.removeEventListener("error", finish);
        resolve();
      };
      video.addEventListener("loadeddata", finish, { once: true });
      video.addEventListener("error", finish, { once: true });
    });
  }

  class ThanksEndingSequence {
    constructor(options = {}) {
      this.root = options.root || document.querySelector("#game-shell") || document.body;
      this.timers = new Set();
      this.running = null;
      this.overlay = createElement("section", "thanks-ending-sequence");
      this.overlay.setAttribute("role", "dialog");
      this.overlay.setAttribute("aria-label", "制作人员致谢");
      this.background = createElement("img", "thanks-ending-background");
      this.background.src = ASSETS.background;
      this.background.alt = "";
      this.scrim = createElement("div", "thanks-ending-scrim");
      this.credits = createElement("div", "thanks-ending-credits");
      THANKS_LINES.forEach((line) => this.credits.append(createElement("p", "thanks-ending-line", line)));
      this.video = createElement("video", "thanks-ending-video");
      this.video.src = ASSETS.video;
      this.video.preload = "auto";
      this.video.playsInline = true;
      this.video.setAttribute("aria-label", "感谢视频");
      this.overlay.append(this.background, this.scrim, this.credits, this.video);
    }

    play() {
      if (this.running) return this.running;
      this.running = this.run().finally(() => this.close());
      return this.running;
    }

    async run() {
      this.root.append(this.overlay);
      await Promise.all([waitForImage(this.background), waitForVideo(this.video)]);
      this.overlay.classList.add("is-visible");
      await this.waitForCredits();
      await this.playVideo();
    }

    waitForCredits() {
      return new Promise((resolve) => {
        const finish = () => {
          this.credits.removeEventListener("animationend", finish);
          resolve();
        };
        this.credits.addEventListener("animationend", finish, { once: true });
        this.credits.classList.add("is-scrolling");
      });
    }

    async playVideo() {
      this.video.classList.add("is-visible");
      this.video.currentTime = 0;
      try {
        await this.video.play();
      } catch (error) {
        this.video.muted = true;
        try {
          await this.video.play();
        } catch (mutedError) {
          console.warn("感谢视频未能自动播放：", mutedError || error);
          await this.delay(3000);
          return;
        }
      }
      await new Promise((resolve) => {
        const finish = () => {
          this.video.removeEventListener("ended", finish);
          this.video.removeEventListener("error", finish);
          resolve();
        };
        this.video.addEventListener("ended", finish, { once: true });
        this.video.addEventListener("error", finish, { once: true });
      });
    }

    delay(milliseconds) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          this.timers.delete(timer);
          resolve();
        }, milliseconds);
        this.timers.add(timer);
      });
    }

    close() {
      for (const timer of this.timers) clearTimeout(timer);
      this.timers.clear();
      this.video.pause();
      this.overlay.remove();
      this.running = null;
    }
  }

  Game.ThanksEndingSequence = ThanksEndingSequence;
  Game.playThanksEndingSequence = (options) => new ThanksEndingSequence(options).play();
})(window.TrainGame);
