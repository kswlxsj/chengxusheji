"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var HIT_ALPHA_THRESHOLD = 8;
var WORKER_TASK_TIMEOUT_MS = 10000;
function withTimeout(promise, milliseconds) {
  var handle = null;
  var timeout = new Promise(function (resolve, reject) {
    handle = setTimeout(function () {
      return reject(new Error("场景图片分析超时"));
    }, milliseconds);
  });
  return Promise.race([promise, timeout]).finally(function () {
    if (handle !== null) clearTimeout(handle);
  });
}
function packAlphaMask(pixels) {
  var width = pixels.width,
    height = pixels.height,
    data = pixels.data;
  var mask = new Uint8Array(Math.ceil(width * height / 8));
  var x0 = width;
  var y0 = height;
  var x1 = -1;
  var y1 = -1;
  for (var y = 0; y < height; y += 1) {
    for (var x = 0; x < width; x += 1) {
      var pixelIndex = y * width + x;
      if (data[pixelIndex * 4 + 3] <= HIT_ALPHA_THRESHOLD) continue;
      mask[pixelIndex >> 3] |= 1 << (pixelIndex & 7);
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  return {
    width: width,
    height: height,
    mask: mask,
    bbox: x1 >= x0 && y1 >= y0 ? {
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1
    } : null
  };
}
function analyzeImage(_x) {
  return _analyzeImage.apply(this, arguments);
} // 整屏图层的 RGBA 数据很大，串行处理可避免多张图同时解码和扫描造成内存峰值。
function _analyzeImage() {
  _analyzeImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(event) {
    var _ref, id, src, bitmap, canvas, context, result, _bitmap, _bitmap$close, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _ref = event.data || {}, id = _ref.id, src = _ref.src;
          bitmap = null;
          _context2.p = 1;
          _context2.n = 2;
          return withTimeout(_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var response, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return fetch(src, {
                    cache: "force-cache"
                  });
                case 1:
                  response = _context.v;
                  if (response.ok) {
                    _context.n = 2;
                    break;
                  }
                  throw new Error("\u573A\u666F\u56FE\u7247\u8BF7\u6C42\u5931\u8D25\uFF1A".concat(response.status));
                case 2:
                  _t = createImageBitmap;
                  _context.n = 3;
                  return response.blob();
                case 3:
                  return _context.a(2, _t(_context.v));
              }
            }, _callee);
          }))(), WORKER_TASK_TIMEOUT_MS);
        case 2:
          bitmap = _context2.v;
          canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
          context = canvas.getContext("2d", {
            willReadFrequently: true
          });
          context.drawImage(bitmap, 0, 0);
          result = packAlphaMask(context.getImageData(0, 0, bitmap.width, bitmap.height));
          self.postMessage({
            id: id,
            width: result.width,
            height: result.height,
            bbox: result.bbox,
            mask: result.mask
          }, [result.mask.buffer]);
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          self.postMessage({
            id: id,
            error: _t2 instanceof Error ? _t2.message : "命中区域分析失败"
          });
        case 4:
          _context2.p = 4;
          (_bitmap = bitmap) === null || _bitmap === void 0 || (_bitmap$close = _bitmap.close) === null || _bitmap$close === void 0 || _bitmap$close.call(_bitmap);
          return _context2.f(4);
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3, 4, 5]]);
  }));
  return _analyzeImage.apply(this, arguments);
}
var taskQueue = Promise.resolve();
self.addEventListener("message", function (event) {
  taskQueue = taskQueue.then(function () {
    return analyzeImage(event);
  });
});
