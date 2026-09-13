(function (Game) {
  "use strict";

  // 音效播放：数据侧只有一份注册表 data/audio.json（经编译器并入 window.GAME_DATA.audio），
  // 这里负责把“编号 → 文件”变成真正的声音。JSON 永远只写编号，路径与音量配平留在数据文件。
  //
  // 与本项目其它运行时模块一致：
  // - 构造时不做任何 DOM 操作；无 DOM 环境（自动化测试）下所有播放降级为静默句柄；
  // - 播放中的音效属“演出资源”，不写入游戏状态，因此不进存档快照、也不参与状态回滚；
  // - 暂停、取消、终止统一经 UIManager.cancelPending / setPaused 掐断，避免暂停菜单背后还在响。

  // 同时可闻的音源上限：超出时停掉最早开始的一条，防止连点/连播把几十条声音叠在一起。
  const MAX_VOICES = 8;
  // 单条音效的最长等待：元数据始终加载不出来时不能把事件链永久挂住。
  const MAX_VOICE_WAIT_MS = 30000;
  // 浏览器自动播放策略拦截时的提示文案（每局最多提示一次）。
  const AUTOPLAY_HINT = "浏览器阻止了自动播放，音效已跳过；请点击画面任意处后再试。";

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  class AudioManager {
    constructor(root, registry = []) {
      this.root = root || null;
      this.registry = new Map((Array.isArray(registry) ? registry : []).map((entry) => [entry.id, entry]));
      this.voices = new Map();
      this.serial = 0;
      this.autoplayWarned = false;
      this.muted = false;
      this.mutedAllowlist = new Set();
      // 由 UIManager 接上 toast；未接时只写控制台。
      this.onAutoplayBlocked = null;
    }

    // 进入剧情静音区时只保留白名单音效，并立即停掉其余正在播放的声音。
    setMuted(value, allowedSoundIds = []) {
      this.muted = value === true;
      this.mutedAllowlist = new Set(Array.isArray(allowedSoundIds) ? allowedSoundIds : []);
      if (!this.muted) return;
      for (const voice of [...this.voices.values()]) {
        if (!this.mutedAllowlist.has(voice.id)) voice.stop();
      }
    }

    // 播放编号对应的音效，返回句柄 { finished, duration, stop() }。
    // options.start 从第几毫秒开始；options.duration 最多播放多少毫秒（截取一段音频）；
    // options.volume 是相对注册表音量的倍率；options.loop 用于场景循环音；
    // options.loopGapMs 为正时在每轮之间留出间隔；
    // options.segmentDuration 为正时只循环音频开头的这段时长，直到 voice.stop()。
    play(soundId, options = {}) {
      const entry = this.registry.get(soundId);
      if (!entry) throw new Error(`音效未注册：${soundId || "空"}`);
      // 同一编号重播时先收掉上一条，避免同一声重叠。
      const playing = this.voices.get(soundId);
      if (playing) playing.stop();

      const start = Math.max(0, Number(options.start) || 0);
      const limit = Number(options.duration) > 0 ? Number(options.duration) : null;
      const loop = options.loop === true;
      const segmentDuration = loop ? Math.max(0, Number(options.segmentDuration) || 0) : 0;
      const segmentedLoop = loop && segmentDuration > 0;
      const loopGapMs = loop ? Math.max(0, Number(options.loopGapMs) || 0) : 0;
      const gappedLoop = loop && loopGapMs > 0;
      const multiplier = options.volume == null ? 1 : clamp(Number(options.volume) || 0, 0, 1);
      const baseVolume = entry.volume == null ? 1 : clamp(Number(entry.volume) || 0, 0, 1);
      const mutedSilent = this.muted && !this.mutedAllowlist.has(soundId);
      const element = mutedSilent ? null : this.createElement(entry);
      const voice = {
        id: soundId,
        element,
        started: false,
        stopped: false,
        serial: 0,
        finished: null,
        duration: null,
        segmentReady: !segmentedLoop || !element,
        settle: () => {},
        stop: () => {}
      };

      if (mutedSilent) {
        voice.finished = Promise.resolve();
        voice.duration = limit == null ? (loop ? null : 0) : limit / 1000;
        this.voices.set(soundId, voice);
        return voice;
      }

      if (!element) {
        // 无 DOM 环境（测试沙箱）：不建音源，立即“播完”，调用方逻辑照常推进。
        voice.finished = Promise.resolve();
        voice.duration = limit == null ? (loop ? null : 0) : limit / 1000;
        this.voices.set(soundId, voice);
        return voice;
      }

      // 实际开始播放后才会产生有效时长：显式截断优先，否则取音频自身时长减去起点。
      const applyDuration = () => {
        if (limit !== null) voice.duration = limit / 1000;
        else if (loop) voice.duration = null;
        else if (Number.isFinite(Number(element.duration)) && Number(element.duration) > 0) {
          voice.duration = Math.max(1, Number(element.duration) * 1000 - start) / 1000;
        } else {
          voice.duration = null;
        }
        return voice.duration;
      };

      let timeoutHandle = null;
      let loopGapHandle = null;
      let segmentHandle = null;
      let resolveFinished = () => {};

      // 每次播放只结算一次：静音、清监听、清时钟、退出活动表、归还元素、解决 finished。
      const settle = () => {
        if (voice.stopped) return;
        voice.stopped = true;
        voice.segmentReady = true;
        if (timeoutHandle !== null) clearTimeout(timeoutHandle);
        if (loopGapHandle !== null) clearTimeout(loopGapHandle);
        if (segmentHandle !== null) clearTimeout(segmentHandle);
        element.removeEventListener("ended", handleEnded);
        element.removeEventListener("error", settle);
        element.pause();
        if (this.voices.get(soundId) === voice) this.voices.delete(soundId);
        // 延迟归还，避免同编号立刻重播时出现上一条的尾音交叠。
        setTimeout(() => {
          if (element.isConnected && typeof element.remove === "function") element.remove();
        }, 0);
        resolveFinished();
      };
      voice.finished = new Promise((resolve) => { resolveFinished = resolve; });
      voice.settle = settle;
      voice.stop = () => settle();

      const handlePlaybackFailure = (error) => {
        console.warn(`音效 ${soundId} 播放失败：`, error);
        voice.failed = true;
        voice.segmentReady = true;
        this.warnAutoplay();
        settle();
      };
      const playElement = () => {
        const promise = element.play();
        if (promise && typeof promise.catch === "function") {
          promise.catch(handlePlaybackFailure);
        }
      };
      const scheduleSegmentRestart = () => {
        if (!segmentedLoop || voice.stopped) return;
        if (segmentHandle !== null) clearTimeout(segmentHandle);
        segmentHandle = setTimeout(() => {
          segmentHandle = null;
          voice.segmentReady = true;
          restartSegment();
        }, segmentDuration);
      };
      const restartSegment = () => {
        if (!segmentedLoop || voice.stopped) return;
        voice.segmentReady = true;
        element.pause();
        try {
          element.currentTime = start / 1000;
        } catch (_error) {
          // 设置播放位置失败时从当前可用位置继续，避免循环链中断。
        }
        playElement();
        scheduleSegmentRestart();
      };
      const handleEnded = () => {
        if (segmentedLoop) {
          restartSegment();
          return;
        }
        if (!gappedLoop) {
          settle();
          return;
        }
        element.pause();
        loopGapHandle = setTimeout(() => {
          loopGapHandle = null;
          if (voice.stopped) return;
          try {
            element.currentTime = start / 1000;
          } catch (_error) {
            // 播放位置复位失败时仍尝试继续，避免循环链永久停住。
          }
          playElement();
        }, loopGapMs);
      };

      element.addEventListener("ended", handleEnded);
      element.addEventListener("error", settle);

      element.volume = baseVolume * multiplier;
      element.src = entry.file;
      element.preload = "auto";
      element.loop = loop && !gappedLoop && !segmentedLoop;
      element.hidden = true;
      element.setAttribute("aria-hidden", "true");
      if (this.root && typeof this.root.append === "function") this.root.append(element);

      // 元数据未就绪时 play() 已经排队，时长与兜底时钟等 loadedmetadata 之后再安排。
      // 这里先在 play() 前设一个安全超时，保证“永远加载不出元数据”也不会挂死事件链。
      const startPlayback = () => {
        if (voice.stopped) return;
        voice.started = true;
        if (start > 0) {
          try {
            element.currentTime = start / 1000;
          } catch (_error) {
            // 元数据未就绪或设置失败时从头播放，不打断音效本身。
          }
        }
        applyDuration();
        if (timeoutHandle !== null) clearTimeout(timeoutHandle);
        if (segmentedLoop) scheduleSegmentRestart();
        else if (limit !== null) timeoutHandle = setTimeout(settle, limit);
        else if (!loop) {
          timeoutHandle = setTimeout(
            settle,
            voice.duration === null ? MAX_VOICE_WAIT_MS : voice.duration * 1000
          );
        }
        // 浏览器自动播放策略或解码失败：音效是可选演出，只告警并立刻结算，
        // 不让“根本不会响的声音”把 await 中的事件链白等一整段时长。
        playElement();
      };
      timeoutHandle = setTimeout(settle, MAX_VOICE_WAIT_MS);
      if (element.readyState >= 1) startPlayback();
      else element.addEventListener("loadedmetadata", startPlayback, { once: true });

      this.voices.set(soundId, voice);
      voice.serial = ++this.serial;
      this.evictOverflow(soundId);
      return voice;
    }

    // 停止全部正在播放的音效（暂停、取消、终止路径统一入口）。
    stopAll() {
      for (const voice of [...this.voices.values()]) voice.stop();
      this.voices.clear();
    }

    // 建独立 Audio 元素（多个音效可同时播放）；无 DOM 时返回 null，由调用方降级处理。
    createElement(entry) {
      if (typeof document === "undefined" || typeof document.createElement !== "function") return null;
      return document.createElement("audio");
    }

    // 超出并发上限时停掉最早开始的一条。
    evictOverflow(currentId) {
      while (this.voices.size > MAX_VOICES) {
        let oldest = null;
        for (const [id, voice] of this.voices) {
          if (id === currentId) continue;
          if (!oldest || voice.serial < oldest.voice.serial) oldest = { id, voice };
        }
        if (!oldest) return;
        oldest.voice.stop();
      }
    }

    warnAutoplay() {
      if (this.autoplayWarned) return;
      this.autoplayWarned = true;
      if (typeof this.onAutoplayBlocked === "function") this.onAutoplayBlocked(AUTOPLAY_HINT);
    }
  }

  Game.AudioManager = AudioManager;
  Game.AUDIO_AUTOPLAY_HINT = AUTOPLAY_HINT;
  Game.AUDIO_MAX_VOICES = MAX_VOICES;
  Game.AUDIO_MAX_VOICE_WAIT_MS = MAX_VOICE_WAIT_MS;
})(window.TrainGame);
