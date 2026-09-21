function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (Game) {
  "use strict";

  var INNER_SCARE = {
    duration: 5000,
    charactersPerSecond: 600,
    tick: 20,
    shakeWidthRatio: 0.01,
    phrase: "停下来"
  };
  function requireGameShell() {
    var shell = document.querySelector("#game-shell");
    if (!shell) throw new Error("找不到游戏舞台 #game-shell");
    return shell;
  }
  Game.registerProjectActions = function registerProjectActions(engine) {
    // JSON 只能调用这里显式注册过的名称，不能执行任意字符串代码。
    engine.registerCustomAction("refreshScene", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(params, context) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return context.engine.loadScene(context.state.sceneId);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    // 拒绝交钥匙后，笑声作为里世界的连续背景音接管当前音乐；具体是否播放
    // 由 main.js 按场景决定，进入花海车厢时会自动让位给花海音乐。
    engine.registerCustomAction("startInnerWorldLaugh", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_params, context) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              // 使用专用剧情旗标，避免旧版本误触发留下的 inner_world_laughing 污染存档。
              context.state.flags.ev519_laugh_started = true;
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());

    // 普通环境调查只显示一条随机文案，不改变任何剧情状态或事件分支。
    engine.registerCustomAction("randomDialogue", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(params, context) {
        var texts, text;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              texts = Array.isArray(params.texts) ? params.texts.filter(function (text) {
                return typeof text === "string" && text.trim();
              }) : [];
              if (texts.length) {
                _context3.n = 1;
                break;
              }
              throw new Error("randomDialogue 缺少 texts 列表");
            case 1:
              text = texts[Math.floor(Math.random() * texts.length)];
              _context3.n = 2;
              return context.ui.dialog.showLine({
                text: text,
                speaker: typeof params.speaker === "string" ? params.speaker : "",
                portrait: typeof params.portrait === "string" ? params.portrait : ""
              });
            case 2:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("innerWhisperScare", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(params, context) {
        var shell, overlay, text, config, total, message, elapsed, count, amplitude, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              context.ui.closeDialog();
              shell = document.querySelector("#game-shell");
              overlay = document.createElement("div");
              overlay.className = "inner-whisper-scare";
              overlay.setAttribute("aria-label", "停下来");
              text = document.createElement("div");
              text.className = "inner-whisper-text";
              text.setAttribute("aria-hidden", "true");
              overlay.append(text);
              shell.append(overlay);
              config = INNER_SCARE;
              total = Math.ceil(config.duration * config.charactersPerSecond / 1000);
              message = config.phrase.repeat(Math.ceil(total / config.phrase.length));
              _context4.p = 1;
              elapsed = 0;
            case 2:
              if (!(elapsed < config.duration)) {
                _context4.n = 5;
                break;
              }
              count = Math.floor((elapsed + config.tick) * config.charactersPerSecond / 1000);
              text.textContent = message.slice(0, count);
              amplitude = shell.clientWidth * config.shakeWidthRatio;
              text.style.transform = "translate(".concat((Math.random() * 2 - 1) * amplitude, "px, ").concat((Math.random() * 2 - 1) * amplitude, "px)");
              overlay.scrollTop = overlay.scrollHeight;
              // 字符增长和震动共用可暂停计时，取消时由 finally 清理。
              // 累计实际有效等待时间，避免 Windows 定时器精度让5秒演出拖长。
              _t = elapsed;
              _context4.n = 3;
              return context.wait(Math.min(config.tick, config.duration - elapsed));
            case 3:
              elapsed = _t += _context4.v;
              context.throwIfCancelled();
            case 4:
              _context4.n = 2;
              break;
            case 5:
              _context4.p = 5;
              overlay.remove();
              return _context4.f(5);
            case 6:
              return _context4.a(2);
          }
        }, _callee4, null, [[1,, 5, 6]]);
      }));
      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }());

    // 不使用对话框的全屏 CG 字幕。等待走事件计时器，因此暂停不会吃掉演出时间，
    // 取消/读档时 finally 也会移除覆盖层。
    engine.registerCustomAction("centeredCinematic", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(params, context) {
        var shell, overlay, image, text;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              context.ui.closeDialog();
              if (!(typeof document === "undefined")) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              shell = requireGameShell();
              overlay = document.createElement("section");
              overlay.className = "inner-cinematic".concat(params.flash === true ? " is-flashback" : "");
              overlay.setAttribute("aria-label", String(params.text || "剧情画面"));
              image = document.createElement("img");
              image.src = String(params.image || "");
              image.alt = "";
              image.decoding = "async";
              text = document.createElement("p");
              text.textContent = String(params.text || "");
              overlay.append(image, text);
              shell.append(overlay);
              _context5.p = 2;
              _context5.n = 3;
              return context.engine.waitFor(image.decode(), undefined, {
                timeoutMs: 15000,
                label: "里世界演出图片"
              });
            case 3:
              _context5.n = 4;
              return context.wait(Math.max(0, Number(params.duration) || 1800));
            case 4:
              _context5.p = 4;
              overlay.remove();
              return _context5.f(4);
            case 5:
              return _context5.a(2);
          }
        }, _callee5, null, [[2,, 4, 5]]);
      }));
      return function (_x9, _x0) {
        return _ref5.apply(this, arguments);
      };
    }());

    // 带可暂停倒计时的剧情选项。超时会采用数据里指定的默认项。
    engine.registerCustomAction("timedStoryChoice", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(params, context) {
        var _context$ui$choice$cl, _context$ui$choice;
        var duration, options, fallback, settled, selection, countdown, selected;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              duration = Math.max(1000, Number(params.duration) || 5000);
              options = Array.isArray(params.options) ? params.options : [];
              if (options.length) {
                _context7.n = 1;
                break;
              }
              throw new Error("timedStoryChoice 缺少 options");
            case 1:
              fallback = options.find(function (option) {
                return option.value === params.defaultValue;
              }) || options[0];
              settled = false;
              selection = context.ui.choice.choose("", options).then(function (value) {
                settled = true;
                return value;
              });
              countdown = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
                var remaining, _context$ui$choice$el, _context$ui$choice$el2, seconds, heading, slice;
                return _regenerator().w(function (_context6) {
                  while (1) switch (_context6.n) {
                    case 0:
                      remaining = duration;
                    case 1:
                      if (!(!settled && remaining > 0)) {
                        _context6.n = 3;
                        break;
                      }
                      seconds = Math.ceil(remaining / 1000);
                      heading = (_context$ui$choice$el = context.ui.choice.element) === null || _context$ui$choice$el === void 0 || (_context$ui$choice$el2 = _context$ui$choice$el.querySelector) === null || _context$ui$choice$el2 === void 0 ? void 0 : _context$ui$choice$el2.call(_context$ui$choice$el, "h2");
                      if (heading) heading.textContent = "".concat(params.prompt || "请选择", "\uFF08").concat(seconds, "\u79D2\uFF09");
                      slice = Math.min(250, remaining);
                      _context6.n = 2;
                      return context.wait(slice);
                    case 2:
                      remaining -= slice;
                      _context6.n = 1;
                      break;
                    case 3:
                      return _context6.a(2, settled ? null : fallback);
                  }
                }, _callee6);
              }))();
              _context7.n = 2;
              return Promise.race([selection, countdown]);
            case 2:
              selected = _context7.v;
              if (!selected) selected = fallback;
              settled = true;
              (_context$ui$choice$cl = (_context$ui$choice = context.ui.choice).close) === null || _context$ui$choice$cl === void 0 || _context$ui$choice$cl.call(_context$ui$choice, selected);
              context.state.flags[String(params.flag || "timed_story_choice")] = selected.value;
            case 3:
              return _context7.a(2);
          }
        }, _callee7);
      }));
      return function (_x1, _x10) {
        return _ref6.apply(this, arguments);
      };
    }());

    // 假2号车厢的四次拍击。演出期间只放行左门；玩家抢先点门时，
    // 当前事件直接播放打不开的三句对白，之后继续剩余拍击。
    engine.registerCustomAction("fakeCarriageHandprints", /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(params, context) {
        var flags, sound, interval, _iterator, _step, _context$ui$audio, _context$ui$audio$pla, flag, originalClick, resolveDoorAttempt, index, _context$ui$audio2, _context$ui$audio2$pl, attempted, outcome, _i, _arr, line;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              flags = Array.isArray(params.flags) ? params.flags : [];
              if (flags.length) {
                _context8.n = 1;
                break;
              }
              throw new Error("fakeCarriageHandprints 缺少 flags");
            case 1:
              if (!(context.state.flags[String(params.doneFlag)] === true)) {
                _context8.n = 2;
                break;
              }
              return _context8.a(2);
            case 2:
              sound = String(params.sound || "knocking_wall");
              interval = Math.max(150, Number(params.interval) || 650);
              if (!(typeof document === "undefined")) {
                _context8.n = 3;
                break;
              }
              _iterator = _createForOfIteratorHelper(flags);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  flag = _step.value;
                  context.state.flags[flag] = true;
                  (_context$ui$audio = context.ui.audio) === null || _context$ui$audio === void 0 || (_context$ui$audio$pla = _context$ui$audio.play) === null || _context$ui$audio$pla === void 0 || _context$ui$audio$pla.call(_context$ui$audio, sound);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              context.state.flags[String(params.doneFlag)] = true;
              return _context8.a(2);
            case 3:
              originalClick = context.scene.onObjectClick;
              resolveDoorAttempt = null;
              context.scene.onObjectClick = function (eventId, object) {
                if (eventId === params.lockedEvent && resolveDoorAttempt) {
                  var resolve = resolveDoorAttempt;
                  resolveDoorAttempt = null;
                  resolve("door");
                  return;
                }
                if (typeof originalClick === "function" && eventId !== params.lockedEvent) {
                  originalClick(eventId, object);
                }
              };
              context.scene.setInteractionEnabled(true);
              _context8.p = 4;
              index = 0;
            case 5:
              if (!(index < flags.length)) {
                _context8.n = 13;
                break;
              }
              context.state.flags[flags[index]] = true;
              context.scene.refresh();
              context.scene.setInteractionEnabled(true);
              (_context$ui$audio2 = context.ui.audio) === null || _context$ui$audio2 === void 0 || (_context$ui$audio2$pl = _context$ui$audio2.play) === null || _context$ui$audio2$pl === void 0 || _context$ui$audio2$pl.call(_context$ui$audio2, sound);
              if (!(index === flags.length - 1)) {
                _context8.n = 6;
                break;
              }
              return _context8.a(3, 13);
            case 6:
              attempted = new Promise(function (resolve) {
                resolveDoorAttempt = resolve;
              });
              _context8.n = 7;
              return Promise.race([context.wait(interval).then(function () {
                return "tick";
              }), attempted]);
            case 7:
              outcome = _context8.v;
              resolveDoorAttempt = null;
              if (!(outcome !== "door")) {
                _context8.n = 8;
                break;
              }
              return _context8.a(3, 12);
            case 8:
              context.scene.setInteractionEnabled(false);
              _i = 0, _arr = ["怎么打不开！", "求求你了…快点开门！", "开门啊！"];
            case 9:
              if (!(_i < _arr.length)) {
                _context8.n = 11;
                break;
              }
              line = _arr[_i];
              _context8.n = 10;
              return context.ui.dialog.showLine({
                speaker: "你",
                portrait: "assets/Image/Portrait/player-scared.ie.png",
                text: line
              });
            case 10:
              _i++;
              _context8.n = 9;
              break;
            case 11:
              context.ui.closeDialog();
              context.scene.setInteractionEnabled(true);
            case 12:
              index += 1;
              _context8.n = 5;
              break;
            case 13:
              context.state.flags[String(params.doneFlag)] = true;
            case 14:
              _context8.p = 14;
              resolveDoorAttempt = null;
              context.scene.onObjectClick = originalClick;
              context.scene.setInteractionEnabled(false);
              return _context8.f(14);
            case 15:
              return _context8.a(2);
          }
        }, _callee8, null, [[4,, 14, 15]]);
      }));
      return function (_x11, _x12) {
        return _ref8.apply(this, arguments);
      };
    }());

    // 黑场内完成切景，避免先移除黑幕再换背景产生一帧闪回。
    engine.registerCustomAction("fadeScene", /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(params, context) {
        var shell, overlay;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              if (!(typeof document === "undefined")) {
                _context9.n = 2;
                break;
              }
              _context9.n = 1;
              return context.engine.loadScene(params.scene);
            case 1:
              return _context9.a(2);
            case 2:
              shell = requireGameShell();
              overlay = document.createElement("div");
              overlay.className = "inner-fade-transition";
              shell.append(overlay);
              _context9.p = 3;
              void overlay.offsetWidth;
              overlay.classList.add("is-black");
              _context9.n = 4;
              return context.wait(Math.max(0, Number(params.fadeIn) || 1600));
            case 4:
              _context9.n = 5;
              return context.wait(80);
            case 5:
              _context9.n = 6;
              return context.engine.loadScene(params.scene);
            case 6:
              _context9.n = 7;
              return context.wait(Math.max(0, Number(params.hold) || 500));
            case 7:
              overlay.classList.add("is-revealing");
              _context9.n = 8;
              return context.wait(Math.max(0, Number(params.fadeOut) || 900));
            case 8:
              _context9.p = 8;
              overlay.remove();
              return _context9.f(8);
            case 9:
              return _context9.a(2);
          }
        }, _callee9, null, [[3,, 8, 9]]);
      }));
      return function (_x13, _x14) {
        return _ref9.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("flashScreen", /*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(params, context) {
        var shell, className;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              shell = document.querySelector("#game-shell");
              className = params.mode === "blackWhite" ? "flash-black-white" : "flash";
              shell.classList.remove("flash", "flash-black-white");
              void shell.offsetWidth;
              shell.classList.add(className);
              _context0.p = 1;
              _context0.n = 2;
              return context.wait(Number(params.duration || 450));
            case 2:
              _context0.p = 2;
              shell.classList.remove(className);
              return _context0.f(2);
            case 3:
              return _context0.a(2);
          }
        }, _callee0, null, [[1,, 2, 3]]);
      }));
      return function (_x15, _x16) {
        return _ref0.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("newspaperBlackout", /*#__PURE__*/function () {
      var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(params, context) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              context.state.flags.carriage_05_newspaper_blackout = true;
              context.state.flags.carriage_05_newspaper_flashlight = false;
              context.scene.refresh();
            case 1:
              return _context1.a(2);
          }
        }, _callee1);
      }));
      return function (_x17, _x18) {
        return _ref1.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("awaitNewspaperFlashlight", /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(params, context) {
        var shell, itemIndex, slots, slot, guide, wasDisabled, positionGuide, resolveSelection, handleSelection, selected;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              if (!(typeof document === "undefined")) {
                _context10.n = 1;
                break;
              }
              context.state.flags.carriage_05_newspaper_flashlight = true;
              return _context10.a(2);
            case 1:
              context.ui.closeDialog();
              shell = requireGameShell();
              itemIndex = context.state.inventory.indexOf("flashlight");
              slots = document.querySelectorAll("#inventory-slots .inventory-slot");
              slot = itemIndex >= 0 ? slots[itemIndex] : null;
              if (slot) {
                _context10.n = 2;
                break;
              }
              throw new Error("读报手电筒引导找不到物品格");
            case 2:
              guide = document.createElement("div");
              guide.className = "newspaper-flashlight-guide";
              guide.textContent = String(params.label || "点击手电筒");
              guide.setAttribute("aria-hidden", "true");
              shell.append(guide);
              wasDisabled = slot.disabled;
              positionGuide = function positionGuide() {
                var shellRect = shell.getBoundingClientRect();
                var slotRect = slot.getBoundingClientRect();
                guide.style.left = "".concat(slotRect.left - shellRect.left + slotRect.width / 2, "px");
                guide.style.top = "".concat(slotRect.top - shellRect.top, "px");
              };
              handleSelection = function handleSelection() {
                return resolveSelection();
              };
              selected = new Promise(function (resolve) {
                resolveSelection = resolve;
              });
              slot.addEventListener("click", handleSelection, {
                once: true,
                capture: true
              });
              slot.disabled = false;
              slot.classList.add("newspaper-flashlight-target");
              positionGuide();
              window.addEventListener("resize", positionGuide);
              _context10.p = 3;
              _context10.n = 4;
              return context.engine.waitFor(selected, undefined, {
                label: "点击手电筒"
              });
            case 4:
              context.throwIfCancelled();
              context.state.flags.carriage_05_newspaper_flashlight = true;
              context.scene.refresh();
            case 5:
              _context10.p = 5;
              slot.removeEventListener("click", handleSelection, {
                capture: true
              });
              window.removeEventListener("resize", positionGuide);
              slot.classList.remove("newspaper-flashlight-target");
              slot.disabled = wasDisabled;
              guide.remove();
              return _context10.f(5);
            case 6:
              return _context10.a(2);
          }
        }, _callee10, null, [[3,, 5, 6]]);
      }));
      return function (_x19, _x20) {
        return _ref10.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("restoreNewspaperLighting", /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(params, context) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              context.state.flags.carriage_05_newspaper_blackout = false;
              context.state.flags.carriage_05_newspaper_flashlight = false;
              if (params.halfDark === true) context.state.flags.carriage_05_half_dark = true;
              context.scene.refresh();
            case 1:
              return _context11.a(2);
          }
        }, _callee11);
      }));
      return function (_x21, _x22) {
        return _ref11.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("useLight", /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(params, context) {
        var item, itemName, inCarriage02, alreadyLit, use;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              item = context.items.get(params.item);
              if (item) {
                _context12.n = 1;
                break;
              }
              throw new Error("\u7167\u660E\u7269\u54C1\u4E0D\u5B58\u5728\uFF1A".concat(params.item || "空"));
            case 1:
              itemName = item.name;
              inCarriage02 = context.state.sceneId === "carriage_02";
              alreadyLit = context.state.flags.light_used === true;
              if (!(!inCarriage02 || alreadyLit)) {
                _context12.n = 3;
                break;
              }
              _context12.n = 2;
              return context.ui.itemInspect.show({
                title: itemName,
                text: alreadyLit ? "".concat(itemName, "\u7684\u5149\u8292\u4ECD\u7136\u7167\u5F97\u6E05\u524D\u65B9\u7684\u8F66\u53A2\u3002") : item.description,
                image: item.image
              });
            case 2:
              return _context12.a(2);
            case 3:
              _context12.n = 4;
              return context.ui.choice.choose("\u8981\u4F7F\u7528".concat(itemName, "\u7167\u4EAE\u524D\u65B9\u5417\uFF1F"), [{
                label: "\u4F7F\u7528".concat(itemName),
                value: true
              }, {
                label: "暂不使用",
                value: false
              }]);
            case 4:
              use = _context12.v;
              if (!(!use || use.value !== true)) {
                _context12.n = 5;
                break;
              }
              return _context12.a(2);
            case 5:
              context.state.flags.light_used = true;
              context.state.flags.light_type = params.item;
              _context12.n = 6;
              return context.ui.dialog.showLine({
                text: "".concat(itemName, "\u7684\u5149\u675F\u8DB3\u4EE5\u7167\u4EAE2\u53F7\u8F66\u53A2\u7684\u4E00\u89D2\u3002")
              });
            case 6:
              return _context12.a(2);
          }
        }, _callee12);
      }));
      return function (_x23, _x24) {
        return _ref12.apply(this, arguments);
      };
    }());
    engine.registerCustomAction("endGame", /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(params, context) {
        var reason;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              reason = params.reason;
              if (["true_end", "cry_end", "bad_end", "lost", "fake_end"].includes(reason)) {
                _context13.n = 1;
                break;
              }
              throw new Error("\u672A\u77E5\u7ED3\u5C40\u7C7B\u578B\uFF1A".concat(reason || "空"));
            case 1:
              context.state.flags.ending_reason = reason;
            case 2:
              return _context13.a(2);
          }
        }, _callee13);
      }));
      return function (_x25, _x26) {
        return _ref13.apply(this, arguments);
      };
    }());

    // 找到钥匙后依据当前 SAN 给出希望奖励；钥匙可能由玩家或乘务员保管。
    engine.registerCustomAction("keyHopeSanReward", /*#__PURE__*/function () {
      var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(params, context) {
        var holder, amount;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              holder = params.holder === "crew" ? "乘务员" : "你";
              _context14.n = 1;
              return context.ui.dialog.showLine({
                text: "\u770B\u7740".concat(holder, "\u624B\u4E2D\u7684\u94A5\u5319\uFF0C\u4F60\u89C9\u5F97\u53C8\u6709\u4E86\u6D3B\u4E0B\u53BB\u7684\u5E0C\u671B\u3002")
              });
            case 1:
              amount = context.state.getAttribute("san") <= 3 ? 3 : 2;
              context.modifyAttribute("san", amount);
            case 2:
              return _context14.a(2);
          }
        }, _callee14);
      }));
      return function (_x27, _x28) {
        return _ref14.apply(this, arguments);
      };
    }());

    // 按权重随机分岔（静默判定）：掷一次权重表，把选中结果的旗标置 true、其余置 false，
    // 由事件里的 conditionalJump 读取分支。不弹任何窗口，玩家只看到剧情结果。
    // params.outcomes = [{ weight: 10, flag: "ev502_return_eaten" }, ...]，权重为正数、顺序即掷点区间顺序。
    engine.registerCustomAction("weightedBranch", /*#__PURE__*/function () {
      var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(params, context) {
        var outcomes, _iterator2, _step2, outcome, total, roll, accumulated, picked, _iterator3, _step3, _outcome, _iterator4, _step4, _outcome2, _t2, _t3;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              outcomes = Array.isArray(params.outcomes) ? params.outcomes : [];
              if (outcomes.length) {
                _context15.n = 1;
                break;
              }
              throw new Error("weightedBranch 缺少 outcomes 列表");
            case 1:
              _iterator2 = _createForOfIteratorHelper(outcomes);
              _context15.p = 2;
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context15.n = 7;
                break;
              }
              outcome = _step2.value;
              if (!(!outcome || _typeof(outcome) !== "object" || Array.isArray(outcome))) {
                _context15.n = 4;
                break;
              }
              throw new Error("weightedBranch 的 outcomes 存在无效条目");
            case 4:
              if (!(typeof outcome.flag !== "string" || !outcome.flag)) {
                _context15.n = 5;
                break;
              }
              throw new Error("weightedBranch 的每个结果都需要 flag");
            case 5:
              if (!(!Number.isFinite(outcome.weight) || outcome.weight <= 0)) {
                _context15.n = 6;
                break;
              }
              throw new Error("weightedBranch \u7684\u6743\u91CD\u65E0\u6548\uFF1A".concat(outcome.flag));
            case 6:
              _context15.n = 3;
              break;
            case 7:
              _context15.n = 9;
              break;
            case 8:
              _context15.p = 8;
              _t2 = _context15.v;
              _iterator2.e(_t2);
            case 9:
              _context15.p = 9;
              _iterator2.f();
              return _context15.f(9);
            case 10:
              total = outcomes.reduce(function (sum, outcome) {
                return sum + outcome.weight;
              }, 0);
              roll = Math.random() * total;
              accumulated = 0;
              picked = outcomes[outcomes.length - 1];
              _iterator3 = _createForOfIteratorHelper(outcomes);
              _context15.p = 11;
              _iterator3.s();
            case 12:
              if ((_step3 = _iterator3.n()).done) {
                _context15.n = 14;
                break;
              }
              _outcome = _step3.value;
              accumulated += _outcome.weight;
              if (!(roll < accumulated)) {
                _context15.n = 13;
                break;
              }
              picked = _outcome;
              return _context15.a(3, 14);
            case 13:
              _context15.n = 12;
              break;
            case 14:
              _context15.n = 16;
              break;
            case 15:
              _context15.p = 15;
              _t3 = _context15.v;
              _iterator3.e(_t3);
            case 16:
              _context15.p = 16;
              _iterator3.f();
              return _context15.f(16);
            case 17:
              _iterator4 = _createForOfIteratorHelper(outcomes);
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  _outcome2 = _step4.value;
                  context.state.flags[_outcome2.flag] = _outcome2 === picked;
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            case 18:
              return _context15.a(2);
          }
        }, _callee15, null, [[11, 15, 16, 17], [2, 8, 9, 10]]);
      }));
      return function (_x29, _x30) {
        return _ref15.apply(this, arguments);
      };
    }());
  };
})(window.TrainGame);
