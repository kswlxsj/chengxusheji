function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game) {
  "use strict";

  // 游戏页内两类声音共用同一条音源生命周期：AudioManager 管事件音效，
  // BackgroundAudioManager 管场景唯一背景音。主页与结束页 BGM 不经过这里。
  var MAX_VOICES = 8;
  var MAX_VOICE_WAIT_MS = 30000;
  var FADE_MS = 1000;
  var FADE_TICK_MS = 30;
  var MAX_MASTER_VOLUME = 2;
  var AUTOPLAY_HINT = "浏览器阻止了自动播放，音效已跳过；请点击画面任意处后再试。";
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  function createSilentVoice(soundId) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var loop = options.loop === true;
    var limit = Number(options.duration) > 0 ? Number(options.duration) : null;
    return {
      id: soundId,
      element: null,
      started: false,
      stopped: true,
      stopping: false,
      failed: false,
      serial: 0,
      duration: limit == null ? loop ? null : 0 : limit / 1000,
      finished: Promise.resolve(),
      stop: function stop() {},
      resume: function resume() {
        return false;
      },
      setVolume: function setVolume() {}
    };
  }
  var AudioVoice = /*#__PURE__*/function () {
    function AudioVoice(_ref) {
      var _this = this;
      var id = _ref.id,
        entry = _ref.entry,
        element = _ref.element,
        root = _ref.root,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        _ref$masterVolume = _ref.masterVolume,
        masterVolume = _ref$masterVolume === void 0 ? 1 : _ref$masterVolume,
        _ref$fadeMs = _ref.fadeMs,
        fadeMs = _ref$fadeMs === void 0 ? FADE_MS : _ref$fadeMs,
        onSettled = _ref.onSettled,
        onPlaybackFailure = _ref.onPlaybackFailure;
      _classCallCheck(this, AudioVoice);
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
      this.playbackRate = clamp(Number(options.playbackRate) || 1, 0.25, 4);
      this.multiplier = options.volume == null ? 1 : clamp(Number(options.volume) || 0, 0, 1);
      this.baseVolume = entry.volume == null ? 1 : clamp(Number(entry.volume) || 0, 0, 1);
      this.masterVolume = clamp(Number(masterVolume) || 0, 0, MAX_MASTER_VOLUME);
      this.targetVolume = clamp(this.baseVolume * this.multiplier * this.masterVolume, 0, 1);
      this.metadataTimeout = null;
      this.endTimeout = null;
      this.fadeStartTimeout = null;
      this.loopGapTimeout = null;
      this.segmentTimeout = null;
      this.fadeTimeout = null;
      this.fadeToken = 0;
      this.resolveFinished = function () {};
      this.finished = new Promise(function (resolve) {
        _this.resolveFinished = resolve;
      });
      this.handleEnded = function () {
        return _this.onEnded();
      };
      this.handleError = function () {
        return _this.settle();
      };
      this.startPlayback = function () {
        return _this.beginPlayback();
      };
    }
    return _createClass(AudioVoice, [{
      key: "start",
      value: function start() {
        var _this2 = this;
        var element = this.element;
        if (!element) {
          this.duration = this.limitMs == null ? this.loop ? null : 0 : this.limitMs / 1000;
          this.settle();
          return this;
        }
        element.volume = 0;
        element.src = this.entry.file;
        element.preload = "auto";
        element.loop = this.loop && !this.gappedLoop && !this.segmentedLoop;
        // 降低播放速度时同时降低音高；不支持 preservesPitch 的浏览器会自然跟随变调。
        try {
          element.preservesPitch = false;
          element.mozPreservesPitch = false;
          element.webkitPreservesPitch = false;
        } catch (_error) {
          // 部分浏览器不允许设置这些兼容属性，仍使用 playbackRate。
        }
        element.playbackRate = this.playbackRate;
        element.hidden = true;
        element.setAttribute("aria-hidden", "true");
        element.addEventListener("ended", this.handleEnded);
        element.addEventListener("error", this.handleError);
        if (this.root && typeof this.root.append === "function") this.root.append(element);
        this.metadataTimeout = setTimeout(function () {
          return _this2.settle();
        }, MAX_VOICE_WAIT_MS);
        if (element.readyState >= 1 || this.options.startWithoutMetadata === true) this.beginPlayback();else element.addEventListener("loadedmetadata", this.startPlayback, {
          once: true
        });
        return this;
      }
    }, {
      key: "applyDuration",
      value: function applyDuration() {
        if (this.limitMs !== null) this.duration = this.limitMs / 1000;else if (this.loop) this.duration = null;else if (Number.isFinite(Number(this.element.duration)) && Number(this.element.duration) > 0) {
          this.duration = Math.max(1, Number(this.element.duration) * 1000 - this.startMs) / 1000;
        } else {
          this.duration = null;
        }
      }
    }, {
      key: "beginPlayback",
      value: function beginPlayback() {
        var _this3 = this;
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
        var fadeInMs = this.limitMs === null ? this.fadeMs : Math.min(this.fadeMs, this.limitMs / 2);
        this.fadeTo(this.targetVolume, fadeInMs);
        if (this.segmentedLoop) this.scheduleSegmentRestart();else if (this.limitMs !== null) this.scheduleLimitedEnd();else if (!this.loop) {
          var fallbackMs = this.duration === null ? MAX_VOICE_WAIT_MS : this.duration * 1000 + this.fadeMs;
          this.endTimeout = setTimeout(function () {
            return _this3.settle();
          }, fallbackMs);
        }
      }
    }, {
      key: "scheduleLimitedEnd",
      value: function scheduleLimitedEnd() {
        var _this4 = this;
        var fadeOutMs = Math.min(this.fadeMs, this.limitMs / 2);
        this.fadeStartTimeout = setTimeout(function () {
          if (_this4.stopped) return;
          _this4.stopping = true;
          _this4.clearPlaybackTimers();
          // 独立截止时钟保证 finished 不因淡化刷新粒度而延长到 duration 之外。
          _this4.endTimeout = setTimeout(function () {
            return _this4.settle();
          }, fadeOutMs);
          _this4.fadeTo(0, fadeOutMs, function () {
            return _this4.settle();
          });
        }, Math.max(0, this.limitMs - fadeOutMs));
      }
    }, {
      key: "playElement",
      value: function playElement() {
        var _this5 = this;
        var promise = this.element.play();
        if (promise && typeof promise.catch === "function") {
          promise.catch(function (error) {
            if (_this5.stopped) return;
            _this5.failed = true;
            _this5.onPlaybackFailure(error, _this5);
            _this5.settle();
          });
        }
      }
    }, {
      key: "fadeTo",
      value: function fadeTo(target) {
        var _this6 = this;
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fadeMs;
        var onComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        if (!this.element || this.stopped) return;
        var token = ++this.fadeToken;
        clearTimeout(this.fadeTimeout);
        this.fadeTimeout = null;
        var startVolume = clamp(Number(this.element.volume) || 0, 0, 1);
        var targetVolume = clamp(Number(target) || 0, 0, 1);
        var fadeDuration = Math.max(0, Number(duration) || 0);
        if (fadeDuration === 0 || startVolume === targetVolume) {
          this.element.volume = targetVolume;
          if (onComplete) onComplete();
          return;
        }
        var startedAt = performance.now();
        var _step = function step() {
          if (_this6.stopped || token !== _this6.fadeToken) return;
          var progress = Math.min(1, (performance.now() - startedAt) / fadeDuration);
          _this6.element.volume = startVolume + (targetVolume - startVolume) * progress;
          if (progress >= 1) {
            _this6.fadeTimeout = null;
            if (onComplete) onComplete();
            return;
          }
          _this6.fadeTimeout = setTimeout(_step, Math.min(FADE_TICK_MS, fadeDuration));
        };
        this.fadeTimeout = setTimeout(_step, Math.min(FADE_TICK_MS, fadeDuration));
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this7 = this;
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$immediate = _ref2.immediate,
          immediate = _ref2$immediate === void 0 ? false : _ref2$immediate,
          _ref2$duration = _ref2.duration,
          duration = _ref2$duration === void 0 ? this.fadeMs : _ref2$duration;
        if (this.stopped) return this.finished;
        if (this.stopping && !immediate) return this.finished;
        if (immediate || !this.started || !this.element || this.element.volume <= 0) {
          this.settle();
          return this.finished;
        }
        this.stopping = true;
        this.clearPlaybackTimers();
        this.fadeTo(0, duration, function () {
          return _this7.settle();
        });
        return this.finished;
      }

      // 仅供背景音管理器使用：淡出未结束时恢复同一元素和播放位置。
    }, {
      key: "resume",
      value: function resume() {
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
    }, {
      key: "setVolume",
      value: function setVolume(value) {
        this.multiplier = clamp(Number(value) || 0, 0, 1);
        this.applyTargetVolume();
      }
    }, {
      key: "setMasterVolume",
      value: function setMasterVolume(value) {
        this.masterVolume = clamp(Number(value) || 0, 0, MAX_MASTER_VOLUME);
        this.applyTargetVolume();
      }
    }, {
      key: "setPlaybackRate",
      value: function setPlaybackRate(value) {
        this.playbackRate = clamp(Number(value) || 1, 0.25, 4);
        if (!this.element) return;
        // 少数浏览器在循环音播放中修改速率时会意外回到开头；变调必须延续当前段落。
        var currentTime = Number(this.element.currentTime);
        this.element.playbackRate = this.playbackRate;
        if (Number.isFinite(currentTime) && currentTime >= 0 && this.element.currentTime !== currentTime) {
          try {
            this.element.currentTime = currentTime;
          } catch (_error) {
            // 浏览器暂时拒绝定位时保留已设置的变调，不让演出链中断。
          }
        }
      }
    }, {
      key: "applyTargetVolume",
      value: function applyTargetVolume() {
        this.targetVolume = clamp(this.baseVolume * this.multiplier * this.masterVolume, 0, 1);
        if (this.element && !this.stopped && !this.stopping) {
          // 项目演出主动接管音量时终止自动淡入，避免两套动画互相抢写 volume。
          this.fadeToken += 1;
          clearTimeout(this.fadeTimeout);
          this.fadeTimeout = null;
          this.element.volume = this.targetVolume;
        }
      }
    }, {
      key: "scheduleSegmentRestart",
      value: function scheduleSegmentRestart() {
        var _this8 = this;
        if (!this.segmentedLoop || this.stopped || this.stopping) return;
        clearTimeout(this.segmentTimeout);
        this.segmentTimeout = setTimeout(function () {
          _this8.segmentTimeout = null;
          if (_this8.stopped || _this8.stopping) return;
          _this8.element.pause();
          try {
            _this8.element.currentTime = _this8.startMs / 1000;
          } catch (_error) {
            // 定位失败仍继续循环，避免演出链中断。
          }
          _this8.playElement();
          _this8.scheduleSegmentRestart();
        }, this.segmentDuration);
      }
    }, {
      key: "onEnded",
      value: function onEnded() {
        var _this9 = this;
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
        this.loopGapTimeout = setTimeout(function () {
          _this9.loopGapTimeout = null;
          if (_this9.stopped || _this9.stopping) return;
          try {
            _this9.element.currentTime = _this9.startMs / 1000;
          } catch (_error) {
            // 定位失败仍尝试重播。
          }
          _this9.playElement();
        }, this.loopGapMs);
      }
    }, {
      key: "clearPlaybackTimers",
      value: function clearPlaybackTimers() {
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
    }, {
      key: "settle",
      value: function settle() {
        var _this0 = this;
        if (this.stopped) return;
        var wasStopping = this.stopping;
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
          setTimeout(function () {
            if (_this0.element.isConnected && typeof _this0.element.remove === "function") _this0.element.remove();
          }, 0);
        }
        this.onSettled(this);
        this.resolveFinished();
      }
    }]);
  }();
  var AudioManager = /*#__PURE__*/function () {
    function AudioManager(root) {
      var registry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck(this, AudioManager);
      this.root = root || null;
      this.registry = new Map((Array.isArray(registry) ? registry : []).map(function (entry) {
        return [entry.id, entry];
      }));
      this.voices = new Map();
      this.activeVoices = new Set();
      this.serial = 0;
      this.autoplayWarned = false;
      this.muted = false;
      this.mutedAllowlist = new Set();
      this.onAutoplayBlocked = null;
      this.masterVolume = options.masterVolume == null ? 1 : clamp(Number(options.masterVolume) || 0, 0, MAX_MASTER_VOLUME);
      this.fadeMs = Number.isFinite(options.fadeMs) ? Math.max(0, options.fadeMs) : FADE_MS;
    }
    return _createClass(AudioManager, [{
      key: "setMuted",
      value: function setMuted(value) {
        var allowedSoundIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        this.muted = value === true;
        this.mutedAllowlist = new Set(Array.isArray(allowedSoundIds) ? allowedSoundIds : []);
        if (!this.muted) return;
        for (var _i = 0, _arr = _toConsumableArray(this.voices); _i < _arr.length; _i++) {
          var _arr$_i = _slicedToArray(_arr[_i], 2),
            id = _arr$_i[0],
            voice = _arr$_i[1];
          if (this.mutedAllowlist.has(id)) continue;
          this.voices.delete(id);
          voice.stop();
        }
      }
    }, {
      key: "play",
      value: function play(soundId) {
        var _this1 = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var entry = this.registry.get(soundId);
        if (!entry) throw new Error("\u97F3\u6548\u672A\u6CE8\u518C\uFF1A".concat(soundId || "空"));
        if (this.muted && !this.mutedAllowlist.has(soundId)) return createSilentVoice(soundId, options);
        var previous = this.voices.get(soundId);
        if (previous) {
          this.voices.delete(soundId);
          previous.stop();
        }
        var voice = new AudioVoice({
          id: soundId,
          entry: entry,
          element: this.createElement(entry),
          root: this.root,
          options: options,
          masterVolume: this.masterVolume,
          fadeMs: Number.isFinite(options.fadeMs) ? Math.max(0, options.fadeMs) : this.fadeMs,
          onSettled: function onSettled(settledVoice) {
            _this1.activeVoices.delete(settledVoice);
            if (_this1.voices.get(soundId) === settledVoice) _this1.voices.delete(soundId);
          },
          onPlaybackFailure: function onPlaybackFailure(error) {
            console.warn("\u97F3\u6548 ".concat(soundId, " \u64AD\u653E\u5931\u8D25\uFF1A"), error);
            _this1.warnAutoplay();
          }
        });
        voice.serial = ++this.serial;
        this.voices.set(soundId, voice);
        this.activeVoices.add(voice);
        voice.start();
        this.evictOverflow(voice);
        return voice;
      }
    }, {
      key: "stopAll",
      value: function stopAll() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.voices.clear();
        for (var _i2 = 0, _arr2 = _toConsumableArray(this.activeVoices); _i2 < _arr2.length; _i2++) {
          var voice = _arr2[_i2];
          voice.stop(options);
        }
      }
    }, {
      key: "setMasterVolume",
      value: function setMasterVolume(value) {
        this.masterVolume = clamp(Number(value) || 0, 0, MAX_MASTER_VOLUME);
        var _iterator = _createForOfIteratorHelper(this.activeVoices),
          _step2;
        try {
          for (_iterator.s(); !(_step2 = _iterator.n()).done;) {
            var voice = _step2.value;
            voice.setMasterVolume(this.masterVolume);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "createElement",
      value: function createElement(_entry) {
        if (typeof document === "undefined" || typeof document.createElement !== "function") return null;
        return document.createElement("audio");
      }
    }, {
      key: "evictOverflow",
      value: function evictOverflow(currentVoice) {
        while (this.activeVoices.size > MAX_VOICES) {
          var oldest = null;
          var _iterator2 = _createForOfIteratorHelper(this.activeVoices),
            _step3;
          try {
            for (_iterator2.s(); !(_step3 = _iterator2.n()).done;) {
              var voice = _step3.value;
              if (voice === currentVoice) continue;
              if (!oldest || voice.serial < oldest.serial) oldest = voice;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (!oldest) return;
          oldest.stop({
            immediate: true
          });
        }
      }
    }, {
      key: "warnAutoplay",
      value: function warnAutoplay() {
        if (this.autoplayWarned) return;
        this.autoplayWarned = true;
        if (typeof this.onAutoplayBlocked === "function") this.onAutoplayBlocked(AUTOPLAY_HINT);
      }
    }]);
  }();
  var BackgroundAudioManager = /*#__PURE__*/function () {
    function BackgroundAudioManager(root) {
      var registry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck(this, BackgroundAudioManager);
      this.root = root || null;
      this.registry = new Map((Array.isArray(registry) ? registry : []).map(function (entry) {
        return [entry.id, entry];
      }));
      this.current = null;
      this.targetId = null;
      this.autoplayWarned = false;
      this.onAutoplayBlocked = null;
      this.masterVolume = options.masterVolume == null ? 1 : clamp(Number(options.masterVolume) || 0, 0, MAX_MASTER_VOLUME);
      this.fadeMs = Number.isFinite(options.fadeMs) ? Math.max(0, options.fadeMs) : FADE_MS;
    }
    return _createClass(BackgroundAudioManager, [{
      key: "setTrack",
      value: function setTrack(soundId) {
        var _this10 = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var nextId = soundId || null;
        if (nextId && !this.registry.has(nextId)) throw new Error("\u80CC\u666F\u97F3\u672A\u6CE8\u518C\uFF1A".concat(nextId));
        this.targetId = nextId;
        if (nextId && this.current && this.current.id === nextId && !this.current.stopped) {
          this.current.resume();
          return this.current;
        }
        if (this.current && !this.current.stopped) this.current.stop();
        if (!nextId) return null;
        var entry = this.registry.get(nextId);
        var voice = new AudioVoice({
          id: nextId,
          entry: entry,
          element: this.createElement(entry),
          root: this.root,
          options: _objectSpread(_objectSpread({}, options), {}, {
            loop: true
          }),
          masterVolume: this.masterVolume,
          fadeMs: Number.isFinite(options.fadeMs) ? Math.max(0, options.fadeMs) : this.fadeMs,
          onSettled: function onSettled(settledVoice) {
            if (_this10.current === settledVoice) _this10.current = null;
          },
          onPlaybackFailure: function onPlaybackFailure(error) {
            console.warn("\u80CC\u666F\u97F3 ".concat(nextId, " \u64AD\u653E\u5931\u8D25\uFF1A"), error);
            _this10.warnAutoplay();
          }
        });
        this.current = voice;
        voice.start();
        return voice;
      }
    }, {
      key: "stopAll",
      value: function stopAll() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.targetId = null;
        if (this.current && !this.current.stopped) this.current.stop(options);
      }
    }, {
      key: "setMasterVolume",
      value: function setMasterVolume(value) {
        var _this$current;
        this.masterVolume = clamp(Number(value) || 0, 0, MAX_MASTER_VOLUME);
        (_this$current = this.current) === null || _this$current === void 0 || _this$current.setMasterVolume(this.masterVolume);
      }
    }, {
      key: "setPlaybackRate",
      value: function setPlaybackRate(value) {
        var _this$current2;
        (_this$current2 = this.current) === null || _this$current2 === void 0 || _this$current2.setPlaybackRate(value);
      }
    }, {
      key: "createElement",
      value: function createElement(_entry) {
        if (typeof document === "undefined" || typeof document.createElement !== "function") return null;
        return document.createElement("audio");
      }
    }, {
      key: "warnAutoplay",
      value: function warnAutoplay() {
        if (this.autoplayWarned) return;
        this.autoplayWarned = true;
        if (typeof this.onAutoplayBlocked === "function") this.onAutoplayBlocked(AUTOPLAY_HINT);
      }
    }]);
  }();
  Game.AudioManager = AudioManager;
  Game.BackgroundAudioManager = BackgroundAudioManager;
  Game.AUDIO_AUTOPLAY_HINT = AUTOPLAY_HINT;
  Game.AUDIO_MAX_VOICES = MAX_VOICES;
  Game.AUDIO_MAX_VOICE_WAIT_MS = MAX_VOICE_WAIT_MS;
  Game.AUDIO_FADE_MS = FADE_MS;
})(window.TrainGame);
