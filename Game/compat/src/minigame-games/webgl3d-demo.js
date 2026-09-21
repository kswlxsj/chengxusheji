function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function (Game) {
  "use strict";

  // 原型小游戏：陀螺仪校准（WebGL 3D 技术演示）。
  // - 目的：验证“事件动作 → 宿主窗口内自绘独立可交互画面 → 原生 WebGL 3D → 退出/完成
  //   两条结算路径 → 返回动作列表由事件引擎顺序执行”的完整链路，不依赖任何第三方库。
  // - 顶层只做注册（编译器会在 node:vm 里加载本文件收集编号），DOM/GL 全部延迟到 run()。
  // - 玩法：拖拽或方向键转动立方体，把“当前方位”对准随机“目标方位”后，“完成校准”
  //   按钮可用，点击即成功结算；标题栏“退出小游戏”由宿主提供，视为放弃、无结算。

  // ==== 简易 4x4 矩阵（列主序 Float32Array，仅本模块用） ====
  function mat4Identity() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  function mat4Multiply(a, b) {
    var out = new Float32Array(16);
    for (var col = 0; col < 4; col += 1) {
      for (var row = 0; row < 4; row += 1) {
        out[col * 4 + row] = a[0 * 4 + row] * b[col * 4 + 0] + a[1 * 4 + row] * b[col * 4 + 1] + a[2 * 4 + row] * b[col * 4 + 2] + a[3 * 4 + row] * b[col * 4 + 3];
      }
    }
    return out;
  }
  function mat4Perspective(fovY, aspect, near, far) {
    var f = 1 / Math.tan(fovY / 2);
    var out = new Float32Array(16);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = 2 * far * near / (near - far);
    return out;
  }
  function mat4RotateX(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var out = mat4Identity();
    out[5] = c;
    out[6] = s;
    out[9] = -s;
    out[10] = c;
    return out;
  }
  function mat4RotateY(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var out = mat4Identity();
    out[0] = c;
    out[2] = -s;
    out[8] = s;
    out[10] = c;
    return out;
  }
  function mat4TranslateZ(distance) {
    var out = mat4Identity();
    out[14] = distance;
    return out;
  }
  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("\u7740\u8272\u5668\u7F16\u8BD1\u5931\u8D25\uFF1A".concat(message));
    }
    return shader;
  }
  function createProgram(gl, vertexSource, fragmentSource) {
    var program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var message = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("\u7740\u8272\u5668\u94FE\u63A5\u5931\u8D25\uFF1A".concat(message));
    }
    return program;
  }

  // 六面彩色立方体（每面 4 个顶点 + 索引，平面着色）。
  function buildCube(gl) {
    var faces = [{
      color: [0.85, 0.42, 0.24],
      verts: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]
    },
    // +Z 前
    {
      color: [0.35, 0.55, 0.82],
      verts: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]]
    },
    // -Z 后
    {
      color: [0.55, 0.75, 0.32],
      verts: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]]
    },
    // -X 左
    {
      color: [0.90, 0.75, 0.22],
      verts: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]]
    },
    // +X 右
    {
      color: [0.62, 0.40, 0.76],
      verts: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]]
    },
    // +Y 顶
    {
      color: [0.45, 0.50, 0.55],
      verts: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]]
    } // -Y 底
    ];
    var indices = [0, 1, 2, 0, 2, 3];
    var positions = [];
    var colors = [];
    var elements = [];
    for (var faceIndex = 0; faceIndex < faces.length; faceIndex += 1) {
      var face = faces[faceIndex];
      var _iterator = _createForOfIteratorHelper(face.verts),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var vertex = _step.value;
          positions.push(vertex[0], vertex[1], vertex[2]);
          // 沿朝向微调明暗，增强立体感。
          var shade = 0.78 + 0.22 * Math.abs(vertex[0] * face.color[0] + vertex[1] * face.color[1] + vertex[2] * face.color[2]);
          colors.push(face.color[0] * shade, face.color[1] * shade, face.color[2] * shade);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(indices),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var index = _step2.value;
          elements.push(faceIndex * 4 + index);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), gl.STATIC_DRAW);
    return {
      positionBuffer: positionBuffer,
      colorBuffer: colorBuffer,
      indexBuffer: indexBuffer,
      count: elements.length
    };
  }
  function normalizeDegrees(degrees) {
    return (degrees % 360 + 360) % 360;
  }
  function angleDistance(a, b) {
    var diff = Math.abs(normalizeDegrees(a) - normalizeDegrees(b));
    return Math.min(diff, 360 - diff);
  }
  function deg(radians) {
    return radians * 180 / Math.PI;
  }
  function rad(degrees) {
    return degrees * Math.PI / 180;
  }
  function run(context) {
    // 无 DOM（自动化测试）时直接跳过画面，视为无结算。
    if (!context.stage) return Promise.resolve(null);
    var stage = context.stage;
    var canvas = document.createElement("canvas");
    canvas.className = "mg-webgl-canvas";
    canvas.setAttribute("aria-label", "陀螺仪校准 3D 视图");
    stage.append(canvas);

    // 覆盖层 HUD：提示、方位读数、完成按钮。
    var overlay = document.createElement("div");
    overlay.className = "mg-webgl-overlay";
    var hint = document.createElement("p");
    hint.className = "mg-webgl-hint";
    hint.textContent = "拖拽立方体或按 ←/→ 旋转，把当前方位对准目标方位（±3° 内可完成）。";
    var readout = document.createElement("p");
    readout.className = "mg-webgl-readout";
    var attemptsText = document.createElement("p");
    attemptsText.className = "mg-webgl-attempts";
    var doneButton = document.createElement("button");
    doneButton.type = "button";
    doneButton.className = "mg-webgl-done";
    doneButton.disabled = true;
    doneButton.textContent = "完成校准";
    overlay.append(hint, readout, attemptsText, doneButton);
    stage.append(overlay);
    var gl = null;
    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (error) {
      gl = null;
    }
    if (!gl) {
      hint.textContent = "当前环境不支持 WebGL，演示已跳过。";
      doneButton.disabled = false;
      doneButton.textContent = "继续";
      return new Promise(function (resolve) {
        doneButton.addEventListener("click", function () {
          return resolve([{
            type: "setFlag",
            key: "mg3d_demo_done",
            value: true
          }, {
            type: "dialogue",
            text: "（WebGL 不可用，校准演示自动跳过。）"
          }]);
        }, {
          once: true
        });
      });
    }
    var program = createProgram(gl, "attribute vec3 aPos; attribute vec3 aColor; uniform mat4 uMVP; varying vec3 vColor;" + "void main(){ vColor = aColor; gl_Position = uMVP * vec4(aPos, 1.0); }", "precision mediump float; varying vec3 vColor; void main(){ gl_FragColor = vec4(vColor, 1.0); }");
    gl.useProgram(program);
    var location = {
      position: gl.getAttribLocation(program, "aPos"),
      color: gl.getAttribLocation(program, "aColor"),
      mvp: gl.getUniformLocation(program, "uMVP")
    };
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.06, 0.075, 0.09, 1);
    var cube = buildCube(gl);

    // 玩法状态。
    var yaw = 30;
    var pitch = 15;
    var dragging = false;
    var lastX = 0;
    var lastY = 0;
    var target = Math.floor(Math.random() * 360);
    var alignedWindow = 3;
    var wasAligned = false;
    var alignedCount = 0;
    var resolved = false;
    var resize = function resize() {
      var width = stage.clientWidth || 640;
      var height = stage.clientHeight || 480;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    var frameHandle = 0;
    var _draw = function draw() {
      frameHandle = requestAnimationFrame(_draw);
      resize();

      // 未被拖拽时缓慢自转；对准后停住，方便玩家点击完成。
      var yawDegrees = normalizeDegrees(deg(yaw));
      var aligned = angleDistance(yawDegrees, target) <= alignedWindow;
      if (!dragging && !aligned) yaw += rad(0.18);

      // 刷新 HUD。
      readout.textContent = "\u5F53\u524D\u65B9\u4F4D ".concat(Math.round(yawDegrees), "\xB0\u3000\u76EE\u6807\u65B9\u4F4D ").concat(target, "\xB0\u3000") + (aligned ? "已对准 —— 可以完成校准" : "未对准");
      if (aligned && !wasAligned) alignedCount += 1;
      wasAligned = aligned;
      attemptsText.textContent = "\u5BF9\u51C6\u6B21\u6570\uFF1A".concat(alignedCount);
      doneButton.disabled = !aligned;
      var aspect = canvas.width / Math.max(1, canvas.height);
      var projection = mat4Perspective(rad(50), aspect, 0.1, 100);
      var view = mat4TranslateZ(-6);
      var model = mat4Multiply(mat4RotateY(yaw), mat4RotateX(pitch));
      var mvp = mat4Multiply(projection, mat4Multiply(view, model));
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
      gl.vertexAttribPointer(location.position, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(location.position);
      gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
      gl.vertexAttribPointer(location.color, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(location.color);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.indexBuffer);
      gl.uniformMatrix4fv(location.mvp, false, mvp);
      gl.drawElements(gl.TRIANGLES, cube.count, gl.UNSIGNED_SHORT, 0);
    };
    var onPointerDown = function onPointerDown(event) {
      var _stage$setPointerCapt;
      if (resolved) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      (_stage$setPointerCapt = stage.setPointerCapture) === null || _stage$setPointerCapt === void 0 || _stage$setPointerCapt.call(stage, event.pointerId);
    };
    var onPointerMove = function onPointerMove(event) {
      if (!dragging || resolved) return;
      yaw += (event.clientX - lastX) * 0.006;
      pitch += (event.clientY - lastY) * 0.006;
      pitch = Math.max(rad(-75), Math.min(rad(75), pitch));
      lastX = event.clientX;
      lastY = event.clientY;
    };
    var endDrag = function endDrag() {
      dragging = false;
    };
    var onKeyDown = function onKeyDown(event) {
      if (resolved) return;
      if (event.key === "ArrowLeft") yaw -= rad(3);else if (event.key === "ArrowRight") yaw += rad(3);else if (event.key === "ArrowUp") pitch = Math.min(rad(75), pitch + rad(3));else if (event.key === "ArrowDown") pitch = Math.max(rad(-75), pitch - rad(3));else return;
      event.preventDefault();
    };
    var onDone = function onDone() {
      if (resolved || doneButton.disabled) return;
      resolved = true;
      resolveSettlement([{
        type: "setFlag",
        key: "mg3d_demo_done",
        value: true
      }, {
        type: "dialogue",
        text: "\u4F60\u628A\u9640\u87BA\u4EEA\u5BF9\u5230\u4E86 ".concat(target, "\xB0 \u5E76\u9501\u7D27\u4E86\u5361\u6263\uFF08\u5BF9\u51C6 ").concat(alignedCount, " \u6B21\uFF09\u3002")
      }]);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("keydown", onKeyDown);
    doneButton.addEventListener("click", onDone);
    if (typeof ResizeObserver === "function") {
      var observer = new ResizeObserver(resize);
      observer.observe(stage);
      context.registerCleanup(function () {
        return observer.disconnect();
      });
    }

    // 结算：成功（完成校准）时 resolve 动作列表；放弃（退出按钮）时不 resolve，
    // 由宿主竞态接管（context.onQuit 返回 null 即视为放弃、无结算）。
    var resolveSettlement = null;
    var finished = new Promise(function (resolve) {
      resolveSettlement = resolve;
    });
    context.registerCleanup(function () {
      cancelAnimationFrame(frameHandle);
      canvas.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("keydown", onKeyDown);
      doneButton.removeEventListener("click", onDone);
      var lose = gl.getExtension("WEBGL_lose_context");
      lose === null || lose === void 0 || lose.loseContext();
    });
    context.onQuit(function () {
      return null;
    });
    _draw();
    return finished;
  }
  Game.Minigames.register("webgl3d_demo", {
    title: "陀螺仪校准（WebGL 3D 演示）",
    run: run
  });
})(window.TrainGame);
