(function (Game) {
  "use strict";

  // 游戏页内两类声音共用同一条音源生命周期：AudioManager 管事件音效，
  // BackgroundAudioManager 管场景唯一背景音。主页与结束页 BGM 不经过这里。
  const MAX_VOICES = 8;
  const MAX_VOICE_WAIT_MS = 30000;
  const FADE_MS = 1000;
  const FADE_TICK_MS = 30;
  const AUTOPLAY_HINT = "浏览器阻止了自动播放，音效已跳过；请点击画面任意处后再试。";

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function createSilentVoice(soundId, options = {}) {
    const loop = options.loop === true;
    const limit = Number(options.duration) > 0 ? Number(options.duration) : null;
    return {
      id: soundId,
      element: null,
      started: false,
      stopped: true,
      stopping: false,
      failed: false,
      serial: 0,
      duration: limit == null ? (loop ? null : 0) : limit / 1000,
      finished: Promise.resolve(),
      stop: () => {},
      resume: () => false,
      setVolume: () => {}
    };
  }

  class AudioVoice {
    constructor({ id, entry, element, root, options = {}, masterVolume = 1, fadeMs = FADE_MS, onSettled, onPlaybackFailure }) {
      this.id = id;
      this.entry = entry;
      this.element = element;
      this.root = root;
      this.options = options;
      this.fadeMs = fadeMs;
      this.onSettled = onSettled;
      this.onPlaybackFailure = onPlaybackFailure;
      this.started = false;
      this.stopped = false;
      this.stopping = false;
      this.failed = false;
      this.serial = 0;
      this.duration = null;
      this.startMs = Math.max(0, Number(options.start) || 0);
      this.limitMs = Number(options.duration) > 0 ? Number(options.duration) : null;
      this.loop = options.loop === true;
      this.segmentDuration = this.loop ? Math.max(0, Number(options.segmentDuration) || 0) : 0;
      this.loopGapMs = this.loop ? Math.max(0, Number(options.loopGapMs) || 0) : 0;
      this.segmentedLoop = this.loop && this.segmentDuration > 0;
      this.gappedLoop = this.loop && this.loopGapMs > 0;
      this.multiplier = options.volume == null ? 1 : clamp(Number(options.volume) || 0, 0, 1);
      this.baseVolume = entry.volume == null ? 1 : clamp(Number(entry.volume) || 0, 0, 1);
      this.masterVolume = clamp(Number(masterVolume) || 0, 0, 1);
      this.targetVolume = this.baseVolume * this.multiplier * this.masterVolume;
      this.metadataTimeout = null;
      this.endTimeout = null;
      this.fadeStartTimeout = null;
      this.loopGapTimeout = null;
      this.segmentTimeout = null;
      this.fadeTimeout = null;
      this.fadeToken = 0;
      this.resolveFinished = () => {};
      this.finished = new Promise((resolve) => { this.resolveFinished = resolve; });
      this.handleEnded = () => this.onEnded();
      this.handleError = () => this.settle();
      this.startPlayback = () => this.beginPlayback();
    }

    start() {
      const element = this.element;
      if (!element) {
        this.duration = this.limitMs == null ? (this.loop ? null : 0) : this.limitMs / 1000;
        this.settle();
        return this;
      }
      element.volume = 0;
      element.src = this.entry.file;
      element.preload = "auto";
      element.loop = this.loop && !this.gappedLoop && !this.segmentedLoop;
      element.hidden = true;
      element.setAttribute("aria-hidden", "true");
      element.addEventListener("ended", this.handleEnded);
      element.addEventListener("error", this.handleError);
      if (this.root && typeof this.root.append === "function") this.root.append(element);
      this.metadataTimeout = setTimeout(() => this.settle(), MAX_VOICE_WAIT_MS);
      if (element.readyState >= 1 || this.options.startWithoutMetadata === true) this.beginPlayback();
      else element.addEventListener("loadedmetadata", this.startPlayback, { once: true });
      return this;
    }

    applyDuration() {
      if (this.limitMs !== null) this.duration = this.limitMs / 1000;
      else if (this.loop) this.duration = null;
      else if (Number.isFinite(Number(this.element.duration)) && Number(this.element.duration) > 0) {
        this.duration = Math.max(1, Number(this.element.duration) * 1000 - this.startMs) / 1000;
      } else {
        this.duration = null;
      }
    }

    beginPlayback() {
      if (this.stopped || this.started) return;
      this.started = true;
      clearTimeout(this.metadataTimeout);
      this.metadataTimeout = null;
      if (this.startMs > 0) {
        try {
          this.element.currentTime = this.startMs / 1000;
        } catch (_error) {
          // 元数据虽已就绪但浏览器仍拒绝定位时，从可用位置继续。
        }
      }
      this.applyDuration();
      this.playElement();
      if (this.stopped) return;
      // 截取很短时压缩两端淡化，避免淡入与淡出互相覆盖而全程静音。
      const fadeInMs = this.limitMs === null ? this.fadeMs : Math.min(this.fadeMs, this.limitMs / 2);
      this.fadeTo(this.targetVolume, fadeInMs);
      if (this.segmentedLoop) this.scheduleSegmentRestart();
      else if (this.limitMs !== null) this.scheduleLimitedEnd();
      else if (!this.loop) {
        const fallbackMs = this.duration === null
          ? MAX_VOICE_WAIT_MS
          : this.duration * 1000 + this.fadeMs;
        this.endTimeout = setTimeout(() => this.settle(), fallbackMs);
      }
    }

    scheduleLimitedEnd() {
      const fadeOutMs = Math.min(this.fadeMs, this.limitMs / 2);
      this.fadeStartTimeout = setTimeout(() => {
        if (this.stopped) return;
        this.stopping = true;
        this.clearPlaybackTimers();
        // 独立截止时钟保证 finished 不因淡化刷新粒度而延长到 duration 之外。
        this.endTimeout = setTimeout(() => this.settle(), fadeOutMs);
        this.fadeTo(0, fadeOutMs, () => this.settle());
      }, Math.max(0, this.limitMs - fadeOutMs));
    }

    playElement() {
      const promise = this.element.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch((error) => {
          if (this.stopped) return;
          this.failed = true;
          this.onPlaybackFailure(error, this);
          this.settle();
        });
      }
    }

    fadeTo(target, duration = this.fadeMs, onComplete = null) {
      if (!this.element || this.stopped) return;
      const token = ++this.fadeToken;
      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;
      const startVolume = clamp(Number(this.element.volume) || 0, 0, 1);
      const targetVolume = clamp(Number(target) || 0, 0, 1);
      const fadeDuration = Math.max(0, Number(duration) || 0);
      if (fadeDuration === 0 || startVolume === targetVolume) {
        this.element.volume = targetVolume;
        if (onComplete) onComplete();
        return;
      }
      const startedAt = performance.now();
      const step = () => {
        if (this.stopped || token !== this.fadeToken) return;
        const progress = Math.min(1, (performance.now() - startedAt) / fadeDuration);
        this.element.volume = startVolume + (targetVolume - startVolume) * progress;
        if (progress >= 1) {
          this.fadeTimeout = null;
          if (onComplete) onComplete();
          return;
        }
        this.fadeTimeout = setTimeout(step, Math.min(FADE_TICK_MS, fadeDuration));
      };
      this.fadeTimeout = setTimeout(step, Math.min(FADE_TICK_MS, fadeDuration));
    }

    stop({ immediate = false, duration = this.fadeMs } = {}) {
      if (this.stopped) return this.finished;
      if (this.stopping && !immediate) return this.finished;
      if (immediate || !this.started || !this.element || this.element.volume <= 0) {
        this.settle();
        return this.finished;
      }
      this.stopping = true;
      this.clearPlaybackTimers();
      this.fadeTo(0, duration, () => this.settle());
      return this.finished;
    }

    // 仅供背景音管理器使用：淡出未结束时恢复同一元素和播放位置。
    resume() {
      if (this.stopped) return false;
      if (!this.stopping) return true;
      this.stopping = false;
      this.fadeToken += 1;
      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;
      if (this.element.paused) this.playElement();
      this.fadeTo(this.targetVolume, this.fadeMs);
      if (this.segmentedLoop) this.scheduleSegmentRestart();
      return true;
    }

    setVolume(value) {
      this.multiplier = clamp(Number(value) || 0, 0, 1);
      this.applyTargetVolume();
    }

    setMasterVolume(value) {
      this.masterVolume = clamp(Number(value) || 0, 0, 1);
      this.applyTargetVolume();
    }

    applyTargetVolume() {
      this.targetVolume = this.baseVolume * this.multiplier * this.masterVolume;
      if (this.element && !this.stopped && !this.stopping) {
        // 项目演出主动接管音量时终止自动淡入，避免两套动画互相抢写 volume。
        this.fadeToken += 1;
        clearTimeout(this.fadeTimeout);
        this.fadeTimeout = null;
        this.element.volume = this.targetVolume;
      }
    }

    scheduleSegmentRestart() {
      if (!this.segmentedLoop || this.stopped || this.stopping) return;
      clearTimeout(this.segmentTimeout);
      this.segmentTimeout = setTimeout(() => {
        this.segmentTimeout = null;
        if (this.stopped || this.stopping) return;
        this.element.pause();
        try {
          this.element.currentTime = this.startMs / 1000;
        } catch (_error) {
          // 定位失败仍继续循环，避免演出链中断。
        }
        this.playElement();
        this.scheduleSegmentRestart();
      }, this.segmentDuration);
    }

    onEnded() {
      if (this.stopped || this.stopping) return;
      if (this.segmentedLoop) {
        this.scheduleSegmentRestart();
        return;
      }
      if (!this.gappedLoop) {
        this.settle();
        return;
      }
      this.element.pause();
      this.loopGapTimeout = setTimeout(() => {
        this.loopGapTimeout = null;
        if (this.stopped || this.stopping) return;
        try {
          this.element.currentTime = this.startMs / 1000;
        } catch (_error) {
          // 定位失败仍尝试重播。
        }
        this.playElement();
      }, this.loopGapMs);
    }

    clearPlaybackTimers() {
      clearTimeout(this.metadataTimeout);
      clearTimeout(this.endTimeout);
      clearTimeout(this.fadeStartTimeout);
      clearTimeout(this.loopGapTimeout);
      clearTimeout(this.segmentTimeout);
      this.metadataTimeout = null;
      this.endTimeout = null;
      this.fadeStartTimeout = null;
      this.loopGapTimeout = null;
      this.segmentTimeout = null;
    }

    settle() {
      if (this.stopped) return;
      const wasStopping = this.stopping;
      this.stopped = true;
      this.stopping = false;
      this.fadeToken += 1;
      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;
      this.clearPlaybackTimers();
      if (this.element) {
        if (wasStopping) this.element.volume = 0;
        this.element.removeEventListener("loadedmetadata", this.startPlayback);
        this.element.removeEventListener("ended", this.handleEnded);
        this.element.removeEventListener("error", this.handleError);
        this.element.pause();
        setTimeout(() => {
          if (this.element.isConnected && typeof this.element.remove === "function") this.element.remove();
        }, 0);
      }
      this.onSettled(this);
      this.resolveFinished();
    }
  }

  class AudioManager {
    constructor(root, registry = [], options = {}) {
      this.root = root || null;
      this.registry = new Map((Array.isArray(registry) ? registry : []).map((entry) => [entry.id, entry]));
      this.voices = new Map();
      this.activeVoices = new Set();
      this.serial = 0;
      this.autoplayWarned = false;
      this.muted = false;
      this.mutedAllowlist = new Set();
      this.onAutoplayBlocked = null;
      this.masterVolume = options.masterVolume == null
        ? 1
        : clamp(Number(options.masterVolume) || 0, 0, 1);
      this.fadeMs = Number.isFinite(options.fadeMs) ? Math.max(0, options.fadeMs) : FADE_MS;
    }

    setMuted(value, allowedSoundIds = []) {
      this.muted = value === true;
      this.mutedAllowlist = new Set(Array.isArray(allowedSoundIds) ? allowedSoundIds : []);
      if (!this.muted) return;
      for (const [id, voice] of [...this.voices]) {
        if (this.mutedAllowlist.has(id)) continue;
        this.voices.delete(id);
        voice.stop();
      }
    }

    play(soundId, options = {}) {
      const entry = this.registry.get(soundId);
      if (!entry) throw new Error(`音效未注册：${soundId || "空"}`);
      if (this.muted && !this.mutedAllowlist.has(soundId)) return createSilentVoice(soundId, options);
      const previous = this.voices.get(soundId);
      if (previous) {
        this.voices.delete(soundId);
        previous.stop();
      }
      const voice = new AudioVoice({
        id: soundId,
        entry,
        element: this.createElement(entry),
        root: this.root,
        options,
        masterVolume: this.masterVolume,
        fadeMs: this.fadeMs,
        onSettled: (settledVoice) => {
          this.activeVoices.delete(settledVoice);
          if (this.voices.get(soundId) === settledVoice) this.voices.delete(soundId);
        },
        onPlaybackFailure: (error) => {
          console.warn(`音效 ${soundId} 播放失败：`, error);
          this.warnAutoplay();
        }
      });
      voice.serial = ++this.serial;
      this.voices.set(soundId, voice);
      this.activeVoices.add(voice);
      voice.start();
      this.evictOverflow(voice);
      return voice;
    }

    stopAll(options = {}) {
      this.voices.clear();
      for (const voice of [...this.activeVoices]) voice.stop(options);
    }

    setMasterVolume(value) {
      this.masterVolume = clamp(Number(value) || 0, 0, 1);
      for (const voice of this.activeVoices) voice.setMasterVolume(this.masterVolume);
    }

    createElement(_entry) {
      if (typeof document === "undefined" || typeof document.createElement !== "function") return null;
      return document.createElement("audio");
    }

    evictOverflow(currentVoice) {
      while (this.activeVoices.size > MAX_VOICES) {
        let oldest = null;
        for (const voice of this.activeVoices) {
          if (voice === currentVoice) continue;
          if (!oldest || voice.serial < oldest.serial) oldest = voice;
        }
        if (!oldest) return;
        oldest.stop({ immediate: true });
      }
    }

    warnAutoplay() {
      if (this.autoplayWarned) return;
      this.autoplayWarned = true;
      if (typeof this.onAutoplayBlocked === "function") this.onAutoplayBlocked(AUTOPLAY_HINT);
    }
  }

  class BackgroundAudioManager {
    constructor(root, registry = [], options = {}) {
      this.root = root || null;
      this.registry = new Map((Array.isArray(registry) ? registry : []).map((entry) => [entry.id, entry]));
      this.current = null;
      this.targetId = null;
      this.autoplayWarned = false;
      this.onAutoplayBlocked = null;
      this.masterVolume = options.masterVolume == null
        ? 1
        : clamp(Number(options.masterVolume) || 0, 0, 1);
      this.fadeMs = Number.isFinite(options.fadeMs) ? Math.max(0, options.fadeMs) : FADE_MS;
    }

    setTrack(soundId, options = {}) {
      const nextId = soundId || null;
      if (nextId && !this.registry.has(nextId)) throw new Error(`背景音未注册：${nextId}`);
      this.targetId = nextId;
      if (nextId && this.current && this.current.id === nextId && !this.current.stopped) {
        this.current.resume();
        return this.current;
      }
      if (this.current && !this.current.stopped) this.current.stop();
      if (!nextId) return null;
      const entry = this.registry.get(nextId);
      const voice = new AudioVoice({
        id: nextId,
        entry,
        element: this.createElement(entry),
        root: this.root,
        options: { ...options, loop: true },
        masterVolume: this.masterVolume,
        fadeMs: this.fadeMs,
        onSettled: (settledVoice) => {
          if (this.current === settledVoice) this.current = null;
        },
        onPlaybackFailure: (error) => {
          console.warn(`背景音 ${nextId} 播放失败：`, error);
          this.warnAutoplay();
        }
      });
      this.current = voice;
      voice.start();
      return voice;
    }

    stopAll(options = {}) {
      this.targetId = null;
      if (this.current && !this.current.stopped) this.current.stop(options);
    }

    setMasterVolume(value) {
      this.masterVolume = clamp(Number(value) || 0, 0, 1);
      this.current?.setMasterVolume(this.masterVolume);
    }

    createElement(_entry) {
      if (typeof document === "undefined" || typeof document.createElement !== "function") return null;
      return document.createElement("audio");
    }

    warnAutoplay() {
      if (this.autoplayWarned) return;
      this.autoplayWarned = true;
      if (typeof this.onAutoplayBlocked === "function") this.onAutoplayBlocked(AUTOPLAY_HINT);
    }
  }

  Game.AudioManager = AudioManager;
  Game.BackgroundAudioManager = BackgroundAudioManager;
  Game.AUDIO_AUTOPLAY_HINT = AUTOPLAY_HINT;
  Game.AUDIO_MAX_VOICES = MAX_VOICES;
  Game.AUDIO_MAX_VOICE_WAIT_MS = MAX_VOICE_WAIT_MS;
  Game.AUDIO_FADE_MS = FADE_MS;
})(window.TrainGame);
