function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function (Game) {
  "use strict";

  // 视为“命中”的最小不透明度（抗锯齿毛边不计入）。
  var HIT_ALPHA_THRESHOLD = 8;
  var IMAGE_RESOURCE_TIMEOUT_MS = 15000;
  var sceneScriptUrl = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : null;
  var hitMaskWorkerUrl = sceneScriptUrl ? new URL("image-hit-worker.js", sceneScriptUrl).href : null;
  var imageMetaCache = new Map();
  var readyImageCache = new Map();
  var hitMaskWorkerTasks = new Map();
  var hitMaskWorker = null;
  var hitMaskWorkerSerial = 0;
  var hitMaskWorkerUnavailable = false;
  function withTimeout(promise, milliseconds, message) {
    var handle = null;
    var timeout = new Promise(function (resolve, reject) {
      handle = setTimeout(function () {
        return reject(new Error(message));
      }, milliseconds);
    });
    return Promise.race([promise, timeout]).finally(function () {
      if (handle !== null) clearTimeout(handle);
    });
  }
  function getHitMaskWorker() {
    if (typeof document !== "undefined" && document.documentMode) return null;
    if (hitMaskWorkerUnavailable || !hitMaskWorkerUrl || typeof Worker === "undefined") return null;
    if (hitMaskWorker) return hitMaskWorker;
    try {
      var worker = new Worker(hitMaskWorkerUrl);
      worker.addEventListener("message", function (event) {
        var _event$data;
        var task = hitMaskWorkerTasks.get((_event$data = event.data) === null || _event$data === void 0 ? void 0 : _event$data.id);
        if (!task) return;
        hitMaskWorkerTasks.delete(event.data.id);
        clearTimeout(task.timeout);
        if (event.data.error) task.reject(new Error(event.data.error));else {
          task.resolve({
            width: event.data.width,
            height: event.data.height,
            bbox: event.data.bbox,
            mask: new Uint8Array(event.data.mask)
          });
        }
      });
      worker.addEventListener("error", function (event) {
        var error = new Error(event.message || "命中区域 Worker 运行失败");
        hitMaskWorkerUnavailable = true;
        hitMaskWorker = null;
        var _iterator = _createForOfIteratorHelper(hitMaskWorkerTasks.values()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var task = _step.value;
            clearTimeout(task.timeout);
            task.reject(error);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        hitMaskWorkerTasks.clear();
        worker.terminate();
      });
      hitMaskWorker = worker;
      return worker;
    } catch (_error) {
      hitMaskWorkerUnavailable = true;
      return null;
    }
  }
  function analyzeImageInWorker(src) {
    var worker = getHitMaskWorker();
    if (!worker) return Promise.resolve(null);
    var resolvedSrc = new URL(src, document.baseURI).href;
    return new Promise(function (resolve, reject) {
      var id = ++hitMaskWorkerSerial;
      var timeout = setTimeout(function () {
        hitMaskWorkerTasks.delete(id);
        reject(new Error("\u573A\u666F\u56FE\u7247\u5206\u6790\u8D85\u65F6\uFF1A".concat(src)));
      }, IMAGE_RESOURCE_TIMEOUT_MS);
      hitMaskWorkerTasks.set(id, {
        resolve: resolve,
        reject: reject,
        timeout: timeout
      });
      worker.postMessage({
        id: id,
        src: resolvedSrc
      });
    });
  }
  function prepareImage(src) {
    if (!readyImageCache.has(src)) {
      var image = new Image();
      image.src = src;
      var ready = withTimeout(image.decode(), IMAGE_RESOURCE_TIMEOUT_MS, "\u573A\u666F\u56FE\u7247\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(src)).catch(function () {
        readyImageCache.delete(src);
        throw new Error("\u573A\u666F\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A".concat(src));
      });
      readyImageCache.set(src, ready);
    }
    return readyImageCache.get(src);
  }

  // 读取并缓存整幅画布贴图（fullCanvas）的尺寸与不透明内容包围盒。
  function readImageMeta(src) {
    if (!imageMetaCache.has(src)) {
      var meta = loadImageMeta(src).catch(function (error) {
        console.warn("读取物件贴图信息失败：", src, error);
        return null;
      });
      imageMetaCache.set(src, meta);
    }
    return imageMetaCache.get(src);
  }
  function packAlphaMask(_x) {
    return _packAlphaMask.apply(this, arguments);
  }
  function _packAlphaMask() {
    _packAlphaMask = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(pixels) {
      var width, height, data, mask, x0, y0, x1, y1, y, x, pixelIndex;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            width = pixels.width, height = pixels.height, data = pixels.data;
            mask = new Uint8Array(Math.ceil(width * height / 8));
            x0 = width;
            y0 = height;
            x1 = -1;
            y1 = -1;
            y = 0;
          case 1:
            if (!(y < height)) {
              _context3.n = 7;
              break;
            }
            x = 0;
          case 2:
            if (!(x < width)) {
              _context3.n = 5;
              break;
            }
            pixelIndex = y * width + x;
            if (!(data[pixelIndex * 4 + 3] <= HIT_ALPHA_THRESHOLD)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(3, 4);
          case 3:
            mask[pixelIndex >> 3] |= 1 << (pixelIndex & 7);
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          case 4:
            x += 1;
            _context3.n = 2;
            break;
          case 5:
            if (!((y & 127) === 127)) {
              _context3.n = 6;
              break;
            }
            _context3.n = 6;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 0);
            });
          case 6:
            y += 1;
            _context3.n = 1;
            break;
          case 7:
            return _context3.a(2, {
              width: width,
              height: height,
              mask: mask,
              bbox: x1 >= x0 && y1 >= y0 ? {
                x0: x0,
                y0: y0,
                x1: x1,
                y1: y1
              } : null
            });
        }
      }, _callee3);
    }));
    return _packAlphaMask.apply(this, arguments);
  }
  function loadImageMetaOnMainThread(src) {
    return new Promise(function (resolve) {
      var image = new Image();
      var settled = false;
      var timeout = setTimeout(function () {
        if (settled) return;
        settled = true;
        resolve(null);
      }, IMAGE_RESOURCE_TIMEOUT_MS);
      image.onload = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var canvas, context, pixels, result, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!settled) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              settled = true;
              clearTimeout(timeout);
              _context.p = 2;
              canvas = document.createElement("canvas");
              canvas.width = image.naturalWidth;
              canvas.height = image.naturalHeight;
              context = canvas.getContext("2d", {
                willReadFrequently: true
              });
              context.drawImage(image, 0, 0);
              pixels = context.getImageData(0, 0, canvas.width, canvas.height);
              _context.n = 3;
              return packAlphaMask(pixels);
            case 3:
              result = _context.v;
              resolve(result.bbox ? result : null);
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.warn("读取物件贴图信息失败：", src, _t);
              resolve(null);
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[2, 4]]);
      }));
      image.onerror = function () {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        console.warn("物件贴图加载失败：", src);
        resolve(null);
      };
      image.src = src;
    });
  }
  function loadImageMeta(_x2) {
    return _loadImageMeta.apply(this, arguments);
  } // 与 CSS object-fit: cover 一致（等比缩放填满容器、居中裁剪）的画布→容器映射。
  // fullCanvas 贴图与背景共用同一映射叠放，等同把图层贴回背景画布。
  function _loadImageMeta() {
    _loadImageMeta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(src) {
      var workerMeta, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (!(typeof document !== "undefined")) {
              _context4.n = 5;
              break;
            }
            _context4.p = 1;
            _context4.n = 2;
            return analyzeImageInWorker(src);
          case 2:
            workerMeta = _context4.v;
            if (!workerMeta) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2, workerMeta.bbox ? workerMeta : null);
          case 3:
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t3 = _context4.v;
            console.warn("Worker 分析物件贴图失败，回退主线程：", src, _t3);
          case 5:
            return _context4.a(2, loadImageMetaOnMainThread(src));
        }
      }, _callee4, null, [[1, 4]]);
    }));
    return _loadImageMeta.apply(this, arguments);
  }
  function coverTransform(containerWidth, containerHeight, canvasWidth, canvasHeight) {
    var scale = Math.max(containerWidth / canvasWidth, containerHeight / canvasHeight);
    return {
      scale: scale,
      offsetX: (containerWidth - canvasWidth * scale) / 2,
      offsetY: (containerHeight - canvasHeight * scale) / 2
    };
  }
  function readObjectState(state, query) {
    var object = state.objectStates[query.objectId] || {};
    return object[query.property];
  }
  function isCarriageScene(sceneId) {
    return sceneId === "front_carriage" || /^carriage_\d{2}$/.test(sceneId);
  }

  // 场景是否处于「无光」状态：2号车厢首次照明前只留极弱轮廓；
  // 3号车厢在认知崩塌「灯灭了」之后（`carriage_03_blackout`，离开3号时清除）。
  function isSceneUnlit(sceneId, flags) {
    if (sceneId === "carriage_02") return flags.light_used !== true;
    if (sceneId === "carriage_03") return flags.carriage_03_blackout === true;
    if (sceneId === "carriage_05") {
      return flags.carriage_05_newspaper_blackout === true && flags.carriage_05_newspaper_flashlight !== true;
    }
    return false;
  }

  // 2号车厢使用手机或手电筒后仍保持黑暗，只显示从画面右侧中点射向鼠标的光束。
  function isSceneDirectionallyLit(sceneId, flags) {
    return sceneId === "carriage_02" && flags.light_used === true;
  }

  // 5号车厢读报时的手电筒只照亮鼠标周围的一小片圆形区域。
  function isScenePointLit(sceneId, flags) {
    return sceneId === "carriage_05" && flags.carriage_05_newspaper_blackout === true && flags.carriage_05_newspaper_flashlight === true;
  }
  function isSceneHalfDark(sceneId, flags) {
    return sceneId === "carriage_05" && flags.carriage_05_half_dark === true;
  }
  var comparisonOperators = {
    eq: function eq(left, right) {
      return left === right;
    },
    ne: function ne(left, right) {
      return left !== right;
    },
    lt: function lt(left, right) {
      return left < right;
    },
    lte: function lte(left, right) {
      return left <= right;
    },
    gt: function gt(left, right) {
      return left > right;
    },
    gte: function gte(left, right) {
      return left >= right;
    }
  };
  function evaluateCondition(condition, state) {
    if (!condition) return true;
    if (condition.all) return condition.all.every(function (part) {
      return evaluateCondition(part, state);
    });
    if (condition.any) return condition.any.some(function (part) {
      return evaluateCondition(part, state);
    });
    if (condition.not) return !evaluateCondition(condition.not, state);
    if (condition.flag) return Boolean(state.flags[condition.flag]) === condition.equals;
    if (condition.hasItem) return state.inventory.includes(condition.hasItem);
    if (condition.attribute) {
      var compare = comparisonOperators[condition.operator];
      return Boolean(compare) && compare(state.getAttribute(condition.attribute), condition.value);
    }
    if (condition.skill) return state.getSkill(condition.skill) === condition.equals;
    if (condition.objectState) {
      return readObjectState(state, condition.objectState) === condition.objectState.equals;
    }
    console.warn("未知显示条件，按不满足处理：", condition);
    return false;
  }
  var SceneManager = /*#__PURE__*/function () {
    function SceneManager(root, scenes, state) {
      var _this = this;
      _classCallCheck(this, SceneManager);
      this.root = root;
      this.state = state;
      this.scenes = new Map(scenes.map(function (scene) {
        return [scene.id, scene];
      }));
      this.onObjectClick = null;
      this.interactionEnabled = true;
      // fullCanvas 物件的运行时条目：{ object, art, button, meta }
      this.canvasObjects = [];
      // 普通矩形热点：当上层 fullCanvas 按钮的透明区域截获点击时，用于继续向下命中。
      this.rectObjects = [];
      this.hotEntry = null;
      this.directionalLightCanvas = null;
      this.lastLightPoint = null;
      this.ready = Promise.resolve();
      this.renderSignature = null;
      this.root.addEventListener("pointermove", function (event) {
        return _this.handlePointerMove(event);
      }, {
        passive: true
      });
      this.root.addEventListener("pointerleave", function () {
        return _this.setHotEntry(null);
      });
      this.root.addEventListener("click", function (event) {
        return _this.handleCanvasClick(event);
      });
      this.root.addEventListener("focusin", function (event) {
        return _this.handleCanvasFocus(event, true);
      });
      this.root.addEventListener("focusout", function (event) {
        return _this.handleCanvasFocus(event, false);
      });
    }
    return _createClass(SceneManager, [{
      key: "load",
      value: function load(sceneId) {
        var scene = this.scenes.get(sceneId);
        if (!scene) throw new Error("\u573A\u666F\u4E0D\u5B58\u5728\uFF1A".concat(sceneId));
        this.state.sceneId = sceneId;
        this.render(scene);
      }

      // 只准备素材，不提交场景；事件引擎在等待后检查暂停/取消，再调用 load。
    }, {
      key: "prepare",
      value: function () {
        var _prepare = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sceneId) {
          var _this2 = this;
          var scene, variant, tasks, _iterator2, _step2, object, needsAlphaMask, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                scene = this.scenes.get(sceneId);
                if (scene) {
                  _context2.n = 1;
                  break;
                }
                throw new Error("\u573A\u666F\u4E0D\u5B58\u5728\uFF1A".concat(sceneId));
              case 1:
                variant = (scene.backgroundVariants || []).find(function (entry) {
                  return evaluateCondition(entry.visibleWhen, _this2.state);
                });
                tasks = [prepareImage((variant === null || variant === void 0 ? void 0 : variant.image) || scene.background)];
                _iterator2 = _createForOfIteratorHelper(scene.objects || []);
                _context2.p = 2;
                _iterator2.s();
              case 3:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.n = 6;
                  break;
                }
                object = _step2.value;
                if (!(object.invisible || !evaluateCondition(object.visibleWhen, this.state))) {
                  _context2.n = 4;
                  break;
                }
                return _context2.a(3, 5);
              case 4:
                needsAlphaMask = object.fullCanvas && !object.visualOnly && !object.hitPosition;
                tasks.push(needsAlphaMask ? readImageMeta(object.image) : prepareImage(object.image));
              case 5:
                _context2.n = 3;
                break;
              case 6:
                _context2.n = 8;
                break;
              case 7:
                _context2.p = 7;
                _t2 = _context2.v;
                _iterator2.e(_t2);
              case 8:
                _context2.p = 8;
                _iterator2.f();
                return _context2.f(8);
              case 9:
                _context2.n = 10;
                return Promise.all(tasks);
              case 10:
                return _context2.a(2);
            }
          }, _callee2, this, [[2, 7, 8, 9]]);
        }));
        function prepare(_x3) {
          return _prepare.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "whenReady",
      value: function whenReady() {
        return this.ready;
      }
    }, {
      key: "hasScene",
      value: function hasScene(sceneId) {
        return this.scenes.has(sceneId);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (!this.state.sceneId) return;
        var scene = this.scenes.get(this.state.sceneId);
        if (!scene) return;
        var signature = this.buildRenderSignature(scene);
        if (signature === this.renderSignature) return;
        this.render(scene);
      }
    }, {
      key: "setInteractionEnabled",
      value: function setInteractionEnabled(value) {
        this.interactionEnabled = value;
        var _iterator3 = _createForOfIteratorHelper(this.root.querySelectorAll(".scene-object")),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var object = _step3.value;
            object.disabled = !value;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (!value) this.setHotEntry(null);
      }
    }, {
      key: "buildRenderSignature",
      value: function buildRenderSignature(scene) {
        var _this3 = this;
        var backgroundVariant = (scene.backgroundVariants || []).find(function (variant) {
          return evaluateCondition(variant.visibleWhen, _this3.state);
        });
        var visibleObjects = [];
        var _iterator4 = _createForOfIteratorHelper(scene.objects || []),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var object = _step4.value;
            if (!evaluateCondition(object.visibleWhen, this.state)) continue;
            visibleObjects.push([object.id, object.image, object.zIndex || 10, object.visualOnly === true, object.glow === true || object.glowWhen && evaluateCondition(object.glowWhen, this.state)].join(":"));
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        return JSON.stringify([scene.id, (backgroundVariant === null || backgroundVariant === void 0 ? void 0 : backgroundVariant.image) || scene.background, isSceneUnlit(scene.id, this.state.flags), isSceneDirectionallyLit(scene.id, this.state.flags), isScenePointLit(scene.id, this.state.flags), isSceneHalfDark(scene.id, this.state.flags), this.state.flags.light_type || "", visibleObjects]);
      }
    }, {
      key: "render",
      value: function render(scene) {
        var _this4 = this;
        this.setHotEntry(null);
        this.canvasObjects = [];
        this.rectObjects = [];
        this.directionalLightCanvas = null;
        this.renderSignature = this.buildRenderSignature(scene);
        this.root.replaceChildren();
        var carriageScene = isCarriageScene(scene.id);
        var unlit = isSceneUnlit(scene.id, this.state.flags);
        var directionallyLit = isSceneDirectionallyLit(scene.id, this.state.flags);
        var pointLit = isScenePointLit(scene.id, this.state.flags);
        var halfDark = isSceneHalfDark(scene.id, this.state.flags);
        var carriageLit = carriageScene && !unlit;
        this.root.dataset.sceneId = scene.id;
        this.root.classList.toggle("is-carriage", carriageScene);
        this.root.classList.toggle("is-lit", carriageLit);
        this.root.classList.toggle("is-unlit", unlit);
        this.root.classList.toggle("is-directionally-lit", directionallyLit);
        this.root.classList.toggle("is-point-lit", pointLit);
        this.root.classList.toggle("is-half-dark", halfDark);
        var background = document.createElement("img");
        background.className = "scene-background";
        background.decoding = "async";
        var backgroundVariant = (scene.backgroundVariants || []).find(function (variant) {
          return evaluateCondition(variant.visibleWhen, _this4.state);
        });
        background.src = (backgroundVariant === null || backgroundVariant === void 0 ? void 0 : backgroundVariant.image) || scene.background;
        background.alt = scene.name;
        this.root.append(background);
        var _iterator5 = _createForOfIteratorHelper(scene.objects || []),
          _step5;
        try {
          var _loop = function _loop() {
              var object = _step5.value;
              if (!evaluateCondition(object.visibleWhen, _this4.state)) return 0; // continue
              if (object.fullCanvas) {
                _this4.renderCanvasObject(object);
                return 0; // continue
              }
              var button = document.createElement("button");
              button.type = "button";
              button.className = "scene-object";
              button.disabled = !_this4.interactionEnabled;
              button.title = object.name || object.id;
              button.setAttribute("aria-label", object.name || object.id);
              if (object.noHighlight) button.dataset.noHighlight = "true";
              if (object.showImage) button.dataset.showImage = "true";
              if (object.glow) button.dataset.glow = "true";
              button.style.left = "".concat(object.position.x, "%");
              button.style.top = "".concat(object.position.y, "%");
              button.style.width = "".concat(object.position.width, "%");
              button.style.height = "".concat(object.position.height, "%");
              button.style.zIndex = String(object.zIndex || 10);
              // 隐形命中区：命中矩形直接落在“背景上已经画好的东西”（如车厢门）上，不叠加任何贴图。
              if (!object.invisible) {
                var image = document.createElement("img");
                image.src = object.image;
                image.alt = "";
                image.decoding = "async";
                button.append(image);
              }
              button.addEventListener("click", function () {
                if (_this4.interactionEnabled && object.clickEvent && _this4.onObjectClick) {
                  _this4.onObjectClick(object.clickEvent, object);
                }
              });
              _this4.rectObjects.push({
                object: object,
                button: button
              });
              _this4.root.append(button);
            },
            _ret;
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            _ret = _loop();
            if (_ret === 0) continue;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        if (halfDark) {
          var halfDarkOverlay = document.createElement("div");
          halfDarkOverlay.className = "scene-half-dark";
          halfDarkOverlay.setAttribute("aria-hidden", "true");
          this.root.append(halfDarkOverlay);
        }
        if (directionallyLit) this.renderDirectionalLight();
        if (pointLit) this.renderPointLight();
        document.querySelector("#scene-name").textContent = scene.name;
        // 预加载解码后，新建 DOM 图片仍可能尚未完成自身的加载任务。
        this.ready = withTimeout(Promise.all(_toConsumableArray(this.root.querySelectorAll("img")).map(function (image) {
          return image.decode();
        })), IMAGE_RESOURCE_TIMEOUT_MS, "\u573A\u666F\u6E32\u67D3\u56FE\u7247\u52A0\u8F7D\u8D85\u65F6\uFF1A".concat(scene.id));
        // 同步 load/refresh 的调用者不一定等待；事件路径通过 whenReady 接收失败并回滚。
        this.ready.catch(function () {});
      }

      // fullCanvas 物件：视觉层整幅叠放（与背景同映射），命中按钮贴内容包围盒，
      // 点击与悬停由 handlePointerMove/handleCanvasClick 按不透明像素判定。
    }, {
      key: "renderCanvasObject",
      value: function renderCanvasObject(object) {
        var _this5 = this;
        var art = document.createElement("img");
        art.className = "scene-object-art";
        art.dataset.objectId = object.id;
        if (object.glow || object.glowWhen && evaluateCondition(object.glowWhen, this.state)) art.classList.add("is-glow");
        art.src = object.image;
        art.alt = "";
        art.decoding = "async";
        art.style.zIndex = String(object.zIndex || 10);
        this.root.append(art);

        // 只用于遮挡后景的全画布贴图，不创建命中按钮，也不参与悬停/点击判定。
        if (object.visualOnly) return;
        var button = document.createElement("button");
        button.type = "button";
        button.className = "scene-object scene-object-hit";
        button.dataset.objectId = object.id;
        button.disabled = !this.interactionEnabled;
        button.title = object.name || object.id;
        button.setAttribute("aria-label", object.name || object.id);
        button.style.zIndex = String(object.zIndex || 10);
        // 贴图信息就绪前不拦截指针，避免出现整幅舞台大小的“隐形按钮”。
        button.style.pointerEvents = "none";
        this.root.append(button);
        var entry = {
          object: object,
          art: art,
          button: button,
          meta: null
        };
        this.canvasObjects.push(entry);
        // 贴图加载前先使用场景里声明的命中框，避免本地文件/缓存导致整幅物件无法点击。
        if (object.hitPosition) {
          this.placeHitButton(entry);
          button.style.pointerEvents = "";
        }
        if (!object.hitPosition) {
          readImageMeta(object.image).then(function (meta) {
            if (!meta || !button.isConnected) return;
            entry.meta = meta;
            _this5.placeHitButton(entry);
            button.style.pointerEvents = "";
          }).catch(function (error) {
            return console.warn("物件命中区域准备失败：", object.image, error);
          });
        }
      }
    }, {
      key: "placeHitButton",
      value: function placeHitButton(entry) {
        var rect = this.root.getBoundingClientRect();
        var stageWidth = rect.width || this.root.clientWidth || 1600;
        var stageHeight = rect.height || this.root.clientHeight || 900;
        var meta = entry.meta;
        if (!meta) {
          var hit = entry.object.hitPosition;
          if (!hit) return;
          entry.button.style.left = "".concat(hit.x, "%");
          entry.button.style.top = "".concat(hit.y, "%");
          entry.button.style.width = "".concat(hit.width, "%");
          entry.button.style.height = "".concat(hit.height, "%");
          return;
        }
        var transform = coverTransform(stageWidth, stageHeight, meta.width, meta.height);
        var left = transform.offsetX + meta.bbox.x0 * transform.scale;
        var top = transform.offsetY + meta.bbox.y0 * transform.scale;
        var width = (meta.bbox.x1 - meta.bbox.x0 + 1) * transform.scale;
        var height = (meta.bbox.y1 - meta.bbox.y0 + 1) * transform.scale;
        entry.button.style.left = "".concat(left / stageWidth * 100, "%");
        entry.button.style.top = "".concat(top / stageHeight * 100, "%");
        entry.button.style.width = "".concat(width / stageWidth * 100, "%");
        entry.button.style.height = "".concat(height / stageHeight * 100, "%");
      }
    }, {
      key: "handlePointerMove",
      value: function handlePointerMove(event) {
        this.updateDirectionalLight(event);
        if (!this.interactionEnabled) {
          this.setHotEntry(null);
          return;
        }
        var target = event.target;
        var targetButton = target && target.closest ? target.closest(".scene-object-hit") : null;
        var targetEntry = targetButton ? this.findCanvasEntry(targetButton) : null;
        var canvasEntry = this.topCanvasEntryAt(event) || targetEntry;
        var rectEntry = this.topRectEntryAt(event);
        var canvasZ = (canvasEntry === null || canvasEntry === void 0 ? void 0 : canvasEntry.object.zIndex) || 10;
        var rectZ = (rectEntry === null || rectEntry === void 0 ? void 0 : rectEntry.object.zIndex) || 10;
        // 矩形热点（如车窗）位于全画布物件之上时，不应让下层行李继续发亮。
        this.setHotEntry(canvasEntry && (!rectEntry || canvasZ >= rectZ) ? canvasEntry : null);
      }
    }, {
      key: "renderDirectionalLight",
      value: function renderDirectionalLight() {
        var canvas = document.createElement("canvas");
        canvas.className = "scene-directional-light";
        canvas.setAttribute("aria-hidden", "true");
        this.directionalLightCanvas = canvas;
        this.root.append(canvas);
        this.drawDirectionalLight(this.lastLightPoint);
      }
    }, {
      key: "renderPointLight",
      value: function renderPointLight() {
        var canvas = document.createElement("canvas");
        canvas.className = "scene-directional-light scene-point-light";
        canvas.setAttribute("aria-hidden", "true");
        this.directionalLightCanvas = canvas;
        this.root.append(canvas);
        this.drawPointLight(this.lastLightPoint);
      }
    }, {
      key: "updateDirectionalLight",
      value: function updateDirectionalLight(event) {
        if (!this.directionalLightCanvas) return;
        var point = this.stagePoint(event);
        if (!point) return;
        this.lastLightPoint = {
          x: point.x,
          y: point.y
        };
        if (this.directionalLightCanvas.classList.contains("scene-point-light")) {
          this.drawPointLight(this.lastLightPoint);
        } else {
          this.drawDirectionalLight(this.lastLightPoint);
        }
      }
    }, {
      key: "drawPointLight",
      value: function drawPointLight(target) {
        var canvas = this.directionalLightCanvas;
        if (!canvas) return;
        var rect = this.root.getBoundingClientRect();
        var width = Math.max(1, Math.round(rect.width));
        var height = Math.max(1, Math.round(rect.height));
        var ratio = Math.min(2, window.devicePixelRatio || 1);
        var pixelWidth = Math.round(width * ratio);
        var pixelHeight = Math.round(height * ratio);
        if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
          canvas.width = pixelWidth;
          canvas.height = pixelHeight;
        }
        var context = canvas.getContext("2d");
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgba(1, 1, 1, .992)";
        context.fillRect(0, 0, width, height);
        var point = target || {
          x: width * .5,
          y: height * .48
        };
        var radius = Math.max(110, Math.min(width, height) * .22);
        var glow = context.createRadialGradient(point.x, point.y, radius * .12, point.x, point.y, radius);
        glow.addColorStop(0, "rgba(0, 0, 0, .98)");
        glow.addColorStop(.45, "rgba(0, 0, 0, .88)");
        glow.addColorStop(.72, "rgba(0, 0, 0, .48)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = glow;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fill();
        context.globalCompositeOperation = "source-over";
      }
    }, {
      key: "drawDirectionalLight",
      value: function drawDirectionalLight(target) {
        var canvas = this.directionalLightCanvas;
        if (!canvas) return;
        var rect = this.root.getBoundingClientRect();
        var width = Math.max(1, Math.round(rect.width));
        var height = Math.max(1, Math.round(rect.height));
        var ratio = Math.min(2, window.devicePixelRatio || 1);
        var pixelWidth = Math.round(width * ratio);
        var pixelHeight = Math.round(height * ratio);
        if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
          canvas.width = pixelWidth;
          canvas.height = pixelHeight;
        }
        var context = canvas.getContext("2d");
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgba(1, 1, 1, .985)";
        context.fillRect(0, 0, width, height);
        var origin = {
          x: 0,
          y: height / 2
        };
        var aim = target || {
          x: width * .52,
          y: height / 2
        };
        var dx = aim.x - origin.x;
        var dy = aim.y - origin.y;
        var magnitude = Math.hypot(dx, dy);
        if (magnitude < 1) {
          dx = -1;
          dy = 0;
          magnitude = 1;
        }
        dx /= magnitude;
        dy /= magnitude;
        var perpendicular = {
          x: -dy,
          y: dx
        };
        var length = Math.hypot(width, height) * 1.45;
        var end = {
          x: origin.x + dx * length,
          y: origin.y + dy * length
        };
        var phone = this.state.flags.light_type === "phone";
        var baseAngle = phone ? 17 : 12;
        context.globalCompositeOperation = "destination-out";
        var drawCone = function drawCone(degrees, opacity) {
          var halfWidth = Math.tan(degrees * Math.PI / 180) * length;
          var gradient = context.createLinearGradient(origin.x, origin.y, end.x, end.y);
          gradient.addColorStop(0, "rgba(0, 0, 0, ".concat(opacity, ")"));
          gradient.addColorStop(.68, "rgba(0, 0, 0, ".concat(opacity * .96, ")"));
          gradient.addColorStop(1, "rgba(0, 0, 0, ".concat(opacity * .45, ")"));
          context.fillStyle = gradient;
          context.beginPath();
          context.moveTo(origin.x + dx * -10, origin.y + dy * -10);
          context.lineTo(end.x + perpendicular.x * halfWidth, end.y + perpendicular.y * halfWidth);
          context.lineTo(end.x - perpendicular.x * halfWidth, end.y - perpendicular.y * halfWidth);
          context.closePath();
          context.fill();
        };
        // 多层低透明度光锥细分边缘，避免出现生硬的三角形切口；中心光束保持清晰。
        for (var ring = 0; ring < 12; ring += 1) {
          drawCone(baseAngle + 8 - ring * .65, .075);
        }
        drawCone(baseAngle, .55);
        drawCone(Math.max(5, baseAngle - 5), .28);
        context.globalCompositeOperation = "source-over";
      }
    }, {
      key: "handleCanvasClick",
      value: function handleCanvasClick(event) {
        var target = event.target;
        var button = target && target.closest ? target.closest(".scene-object-hit") : null;
        var regularButton = target && target.closest ? target.closest(".scene-object") : null;
        // 普通矩形热点由自己的 click 监听处理；全画布热点则允许在舞台层补做命中，
        // 这样图片加载、透明层或浏览器点击穿透时也不会让行李完全失去交互。
        if (regularButton && !button) return;
        if (!this.interactionEnabled || !this.onObjectClick) return;
        var targetEntry = button ? this.findCanvasEntry(button) : null;
        // 键盘激活直接使用当前焦点；鼠标则按真实不透明像素重新选最上层物件。
        if (event.detail === 0) {
          if (targetEntry !== null && targetEntry !== void 0 && targetEntry.object.clickEvent) this.onObjectClick(targetEntry.object.clickEvent, targetEntry.object);
          return;
        }
        var canvasEntry = this.topCanvasEntryAt(event);
        var rectEntry = this.topRectEntryAt(event);
        var canvasZ = (canvasEntry === null || canvasEntry === void 0 ? void 0 : canvasEntry.object.zIndex) || 10;
        var rectZ = (rectEntry === null || rectEntry === void 0 ? void 0 : rectEntry.object.zIndex) || 10;
        // 事件目标已经是某个全画布命中按钮时，优先保留该目标作为兜底；
        // 只有明确命中了更高层矩形/画布物件时才切换，避免坐标换算误差吞掉行李点击。
        var entry = canvasEntry && (!rectEntry || canvasZ >= rectZ) ? canvasEntry : rectEntry || targetEntry;
        if (entry !== null && entry !== void 0 && entry.object.clickEvent) this.onObjectClick(entry.object.clickEvent, entry.object);
      }
    }, {
      key: "handleCanvasFocus",
      value: function handleCanvasFocus(event, focused) {
        var target = event.target;
        var button = target && target.closest ? target.closest(".scene-object-hit") : null;
        var entry = button ? this.findCanvasEntry(button) : null;
        if (!entry) return;
        if (!focused) {
          entry.art.classList.remove("is-focused");
          return;
        }
        // 只在键盘等 :focus-visible 聚焦时显示高亮，鼠标点击留下的普通焦点不残留光效。
        requestAnimationFrame(function () {
          if (document.activeElement === entry.button && (document.documentMode || entry.button.matches(":focus-visible"))) {
            entry.art.classList.add("is-focused");
          }
        });
      }
    }, {
      key: "findCanvasEntry",
      value: function findCanvasEntry(button) {
        var _iterator6 = _createForOfIteratorHelper(this.canvasObjects),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var entry = _step6.value;
            if (entry.button === button) return entry;
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        return null;
      }
    }, {
      key: "setHotEntry",
      value: function setHotEntry(entry) {
        if (this.hotEntry === entry) return;
        if (this.hotEntry) {
          this.hotEntry.art.classList.remove("is-hot");
          this.hotEntry.button.classList.remove("is-hot");
        }
        this.hotEntry = entry;
        if (entry) {
          entry.art.classList.add("is-hot");
          entry.button.classList.add("is-hot");
        }
      }

      // 指针位置换算成贴图画布像素后，检查是否落在不透明内容包围盒内（多物件按层级取最上层）。
    }, {
      key: "topCanvasEntryAt",
      value: function topCanvasEntryAt(event) {
        var point = this.stagePoint(event);
        if (!point) return null;
        var rect = point.rect;
        var best = null;
        var _iterator7 = _createForOfIteratorHelper(this.canvasObjects),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var entry = _step7.value;
            if (!entry.meta && !entry.object.hitPosition || entry.button.disabled) continue;
            if (this.alphaHit(entry, rect, point.x, point.y)) {
              var z = entry.object.zIndex || 10;
              if (!best || z >= (best.object.zIndex || 10)) best = entry;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        return best;
      }

      // fullCanvas 的透明包围盒可能覆盖下方矩形热点；透明像素处继续命中实际位于指针下方的热点。
    }, {
      key: "topRectEntryAt",
      value: function topRectEntryAt(event) {
        var point = this.stagePoint(event);
        if (!point) return null;
        var best = null;
        var _iterator8 = _createForOfIteratorHelper(this.rectObjects),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var entry = _step8.value;
            if (entry.button.disabled) continue;
            var position = entry.object.position;
            if (!position) continue;
            var left = position.x / 100 * point.rect.width;
            var top = position.y / 100 * point.rect.height;
            var right = left + position.width / 100 * point.rect.width;
            var bottom = top + position.height / 100 * point.rect.height;
            if (point.x < left || point.x > right || point.y < top || point.y > bottom) continue;
            var z = entry.object.zIndex || 10;
            if (!best || z >= (best.object.zIndex || 10)) best = entry;
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        return best;
      }
    }, {
      key: "isEntryHit",
      value: function isEntryHit(entry, event) {
        if (!entry.meta && !entry.object.hitPosition) return false;
        var point = this.stagePoint(event);
        return Boolean(point) && this.alphaHit(entry, point.rect, point.x, point.y);
      }
    }, {
      key: "stagePoint",
      value: function stagePoint(event) {
        var rect = this.root.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
        return {
          rect: rect,
          x: x,
          y: y
        };
      }
    }, {
      key: "alphaHit",
      value: function alphaHit(entry, rect, x, y) {
        var meta = entry.meta;
        // 显式命中框优先于透明像素：适合纸张、手机等小型线索，给边缘留出可点击余量，
        // 也避免本地贴图读取失败时按钮一直停留在 pointer-events:none。
        var hit = entry.object.hitPosition;
        if (hit) {
          var left = hit.x / 100 * rect.width;
          var top = hit.y / 100 * rect.height;
          var right = left + hit.width / 100 * rect.width;
          var bottom = top + hit.height / 100 * rect.height;
          return x >= left && x <= right && y >= top && y <= bottom;
        }
        if (!meta) {
          return false;
        }
        var transform = coverTransform(rect.width, rect.height, meta.width, meta.height);
        var canvasX = (x - transform.offsetX) / transform.scale;
        var canvasY = (y - transform.offsetY) / transform.scale;
        var xi = Math.floor(canvasX);
        var yi = Math.floor(canvasY);
        var bbox = meta.bbox;
        if (xi < bbox.x0 || xi > bbox.x1 || yi < bbox.y0 || yi > bbox.y1) return false;
        var pixelIndex = yi * meta.width + xi;
        return (meta.mask[pixelIndex >> 3] & 1 << (pixelIndex & 7)) !== 0;
      }
    }]);
  }();
  Game.evaluateCondition = evaluateCondition;
  Game.isSceneUnlit = isSceneUnlit;
  Game.isSceneDirectionallyLit = isSceneDirectionallyLit;
  Game.SceneManager = SceneManager;
})(window.TrainGame);
