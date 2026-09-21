function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (Game) {
  "use strict";

  var ASSETS = {
    background: "assets/Image/Scene/Background/thanks.jpg",
    videos: [{
      src: "assets/Video/thanks-h264.mp4",
      type: 'video/mp4; codecs="avc1.640028"'
    }, {
      src: "assets/Video/thanks.mp4",
      type: 'video/mp4; codecs="hvc1"'
    }]
  };
  var VIDEO_LOAD_TIMEOUT_MS = 12000;
  var THANKS_LINES = ["感谢终末列车组的所有成员", "是大家无私的精诚合作造就了《常暗之厢》这一奇迹", "感谢在屏幕前游玩的您", "即使在列车上共度的时间非常短暂", "我们仍然希望为您带来一段难忘的时光"];
  function createElement(tagName, className) {
    var textContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var element = document.createElement(tagName);
    element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }
  function waitForImage(image) {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise(function (resolve) {
      var _finish = function finish() {
        image.removeEventListener("load", _finish);
        image.removeEventListener("error", _finish);
        resolve();
      };
      image.addEventListener("load", _finish, {
        once: true
      });
      image.addEventListener("error", _finish, {
        once: true
      });
    });
  }
  function waitForVideo(video) {
    if (video.readyState >= 2) return Promise.resolve();
    return new Promise(function (resolve) {
      var settled = false;
      var _finish2 = function finish() {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        video.removeEventListener("loadeddata", _finish2);
        video.removeEventListener("error", _finish2);
        resolve();
      };
      var timeout = setTimeout(_finish2, VIDEO_LOAD_TIMEOUT_MS);
      video.addEventListener("loadeddata", _finish2, {
        once: true
      });
      video.addEventListener("error", _finish2, {
        once: true
      });
    });
  }
  var ThanksEndingSequence = /*#__PURE__*/function () {
    function ThanksEndingSequence() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, ThanksEndingSequence);
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
      THANKS_LINES.forEach(function (line) {
        return _this.credits.append(createElement("p", "thanks-ending-line", line));
      });
      this.video = createElement("video", "thanks-ending-video");
      ASSETS.videos.forEach(function (_ref) {
        var src = _ref.src,
          type = _ref.type;
        var source = createElement("source", "");
        source.src = src;
        source.type = type;
        _this.video.append(source);
      });
      this.video.preload = "auto";
      this.video.playsInline = true;
      this.video.setAttribute("aria-label", "感谢视频");
      this.overlay.append(this.background, this.scrim, this.credits, this.video);
    }
    return _createClass(ThanksEndingSequence, [{
      key: "play",
      value: function play() {
        var _this2 = this;
        if (this.running) return this.running;
        this.running = this.run().finally(function () {
          return _this2.close();
        });
        return this.running;
      }
    }, {
      key: "run",
      value: function () {
        var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                this.root.append(this.overlay);
                // 先用感谢页自身的黑底盖住旧场景，避免真结局切换期间闪出头车画面。
                this.overlay.classList.add("is-visible");
                _context.n = 1;
                return Promise.all([waitForImage(this.background), waitForVideo(this.video)]);
              case 1:
                _context.n = 2;
                return this.waitForCredits();
              case 2:
                _context.n = 3;
                return this.playVideo();
              case 3:
                return _context.a(2);
            }
          }, _callee, this);
        }));
        function run() {
          return _run.apply(this, arguments);
        }
        return run;
      }()
    }, {
      key: "waitForCredits",
      value: function waitForCredits() {
        var _this3 = this;
        return new Promise(function (resolve) {
          var _finish3 = function finish() {
            _this3.credits.removeEventListener("animationend", _finish3);
            resolve();
          };
          _this3.credits.addEventListener("animationend", _finish3, {
            once: true
          });
          _this3.credits.classList.add("is-scrolling");
        });
      }
    }, {
      key: "playVideo",
      value: function () {
        var _playVideo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var _this4 = this;
          var _t, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                this.video.classList.add("is-visible");
                this.video.currentTime = 0;
                _context2.p = 1;
                _context2.n = 2;
                return this.video.play();
              case 2:
                _context2.n = 8;
                break;
              case 3:
                _context2.p = 3;
                _t = _context2.v;
                this.video.muted = true;
                _context2.p = 4;
                _context2.n = 5;
                return this.video.play();
              case 5:
                _context2.n = 8;
                break;
              case 6:
                _context2.p = 6;
                _t2 = _context2.v;
                console.warn("感谢视频未能自动播放：", _t2 || _t);
                _context2.n = 7;
                return this.delay(3000);
              case 7:
                return _context2.a(2);
              case 8:
                _context2.n = 9;
                return new Promise(function (resolve) {
                  var _finish4 = function finish() {
                    _this4.video.removeEventListener("ended", _finish4);
                    _this4.video.removeEventListener("error", _finish4);
                    resolve();
                  };
                  _this4.video.addEventListener("ended", _finish4, {
                    once: true
                  });
                  _this4.video.addEventListener("error", _finish4, {
                    once: true
                  });
                });
              case 9:
                return _context2.a(2);
            }
          }, _callee2, this, [[4, 6], [1, 3]]);
        }));
        function playVideo() {
          return _playVideo.apply(this, arguments);
        }
        return playVideo;
      }()
    }, {
      key: "delay",
      value: function delay(milliseconds) {
        var _this5 = this;
        return new Promise(function (resolve) {
          var timer = setTimeout(function () {
            _this5.timers.delete(timer);
            resolve();
          }, milliseconds);
          _this5.timers.add(timer);
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _iterator = _createForOfIteratorHelper(this.timers),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var timer = _step.value;
            clearTimeout(timer);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.timers.clear();
        this.video.pause();
        this.overlay.remove();
        this.running = null;
      }
    }]);
  }();
  Game.ThanksEndingSequence = ThanksEndingSequence;
  Game.playThanksEndingSequence = function (options) {
    return new ThanksEndingSequence(options).play();
  };
})(window.TrainGame);
