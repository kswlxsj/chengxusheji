(function (Game) {
  "use strict";

  // 视为“命中”的最小不透明度（抗锯齿毛边不计入）。
  const HIT_ALPHA_THRESHOLD = 8;
  const IMAGE_RESOURCE_TIMEOUT_MS = 15000;
  const sceneScriptUrl = typeof document !== "undefined" && document.currentScript
    ? document.currentScript.src
    : null;
  const hitMaskWorkerUrl = sceneScriptUrl
    ? new URL("image-hit-worker.js", sceneScriptUrl).href
    : null;
  const imageMetaCache = new Map();
  const readyImageCache = new Map();
  const hitMaskWorkerTasks = new Map();
  let hitMaskWorker = null;
  let hitMaskWorkerSerial = 0;
  let hitMaskWorkerUnavailable = false;

  function withTimeout(promise, milliseconds, message) {
    let handle = null;
    const timeout = new Promise((resolve, reject) => {
      handle = setTimeout(() => reject(new Error(message)), milliseconds);
    });
    return Promise.race([promise, timeout]).finally(() => {
      if (handle !== null) clearTimeout(handle);
    });
  }

  function getHitMaskWorker() {
    if (hitMaskWorkerUnavailable || !hitMaskWorkerUrl || typeof Worker === "undefined") return null;
    if (hitMaskWorker) return hitMaskWorker;
    try {
      const worker = new Worker(hitMaskWorkerUrl);
      worker.addEventListener("message", (event) => {
        const task = hitMaskWorkerTasks.get(event.data?.id);
        if (!task) return;
        hitMaskWorkerTasks.delete(event.data.id);
        clearTimeout(task.timeout);
        if (event.data.error) task.reject(new Error(event.data.error));
        else {
          task.resolve({
            width: event.data.width,
            height: event.data.height,
            bbox: event.data.bbox,
            mask: new Uint8Array(event.data.mask)
          });
        }
      });
      worker.addEventListener("error", (event) => {
        const error = new Error(event.message || "命中区域 Worker 运行失败");
        hitMaskWorkerUnavailable = true;
        hitMaskWorker = null;
        for (const task of hitMaskWorkerTasks.values()) {
          clearTimeout(task.timeout);
          task.reject(error);
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
    const worker = getHitMaskWorker();
    if (!worker) return Promise.resolve(null);
    const resolvedSrc = new URL(src, document.baseURI).href;
    return new Promise((resolve, reject) => {
      const id = ++hitMaskWorkerSerial;
      const timeout = setTimeout(() => {
        hitMaskWorkerTasks.delete(id);
        reject(new Error(`场景图片分析超时：${src}`));
      }, IMAGE_RESOURCE_TIMEOUT_MS);
      hitMaskWorkerTasks.set(id, { resolve, reject, timeout });
      worker.postMessage({ id, src: resolvedSrc });
    });
  }

  function prepareImage(src) {
    if (!readyImageCache.has(src)) {
      const image = new Image();
      image.src = src;
      const ready = withTimeout(
        image.decode(),
        IMAGE_RESOURCE_TIMEOUT_MS,
        `场景图片加载超时：${src}`
      ).catch(() => {
        readyImageCache.delete(src);
        throw new Error(`场景图片加载失败：${src}`);
      });
      readyImageCache.set(src, ready);
    }
    return readyImageCache.get(src);
  }

  // 读取并缓存整幅画布贴图（fullCanvas）的尺寸与不透明内容包围盒。
  function readImageMeta(src) {
    if (!imageMetaCache.has(src)) {
      const meta = loadImageMeta(src).catch((error) => {
        console.warn("读取物件贴图信息失败：", src, error);
        return null;
      });
      imageMetaCache.set(src, meta);
    }
    return imageMetaCache.get(src);
  }

  async function packAlphaMask(pixels) {
    const { width, height, data } = pixels;
    const mask = new Uint8Array(Math.ceil(width * height / 8));
    let x0 = width;
    let y0 = height;
    let x1 = -1;
    let y1 = -1;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const pixelIndex = y * width + x;
        if (data[pixelIndex * 4 + 3] <= HIT_ALPHA_THRESHOLD) continue;
        mask[pixelIndex >> 3] |= 1 << (pixelIndex & 7);
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
      if ((y & 127) === 127) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    return {
      width,
      height,
      mask,
      bbox: x1 >= x0 && y1 >= y0 ? { x0, y0, x1, y1 } : null
    };
  }

  function loadImageMetaOnMainThread(src) {
    return new Promise((resolve) => {
      const image = new Image();
      let settled = false;
      const timeout = setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve(null);
      }, IMAGE_RESOURCE_TIMEOUT_MS);
      image.onload = async () => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        try {
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d", { willReadFrequently: true });
          context.drawImage(image, 0, 0);
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
          const result = await packAlphaMask(pixels);
          resolve(result.bbox ? result : null);
        } catch (error) {
          console.warn("读取物件贴图信息失败：", src, error);
          resolve(null);
        }
      };
      image.onerror = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        console.warn("物件贴图加载失败：", src);
        resolve(null);
      };
      image.src = src;
    });
  }

  async function loadImageMeta(src) {
    if (typeof document !== "undefined") {
      try {
        const workerMeta = await analyzeImageInWorker(src);
        if (workerMeta) return workerMeta.bbox ? workerMeta : null;
      } catch (error) {
        console.warn("Worker 分析物件贴图失败，回退主线程：", src, error);
      }
    }
    return loadImageMetaOnMainThread(src);
  }

  // 与 CSS object-fit: cover 一致（等比缩放填满容器、居中裁剪）的画布→容器映射。
  // fullCanvas 贴图与背景共用同一映射叠放，等同把图层贴回背景画布。
  function coverTransform(containerWidth, containerHeight, canvasWidth, canvasHeight) {
    const scale = Math.max(containerWidth / canvasWidth, containerHeight / canvasHeight);
    return {
      scale,
      offsetX: (containerWidth - canvasWidth * scale) / 2,
      offsetY: (containerHeight - canvasHeight * scale) / 2
    };
  }

  function readObjectState(state, query) {
    const object = state.objectStates[query.objectId] || {};
    return object[query.property];
  }

  const comparisonOperators = {
    eq: (left, right) => left === right,
    ne: (left, right) => left !== right,
    lt: (left, right) => left < right,
    lte: (left, right) => left <= right,
    gt: (left, right) => left > right,
    gte: (left, right) => left >= right
  };

  function evaluateCondition(condition, state) {
    if (!condition) return true;
    if (condition.all) return condition.all.every((part) => evaluateCondition(part, state));
    if (condition.any) return condition.any.some((part) => evaluateCondition(part, state));
    if (condition.not) return !evaluateCondition(condition.not, state);
    if (condition.flag) return Boolean(state.flags[condition.flag]) === condition.equals;
    if (condition.hasItem) return state.inventory.includes(condition.hasItem);
    if (condition.attribute) {
      const compare = comparisonOperators[condition.operator];
      return Boolean(compare) && compare(state.getAttribute(condition.attribute), condition.value);
    }
    if (condition.skill) return state.getSkill(condition.skill) === condition.equals;
    if (condition.objectState) {
      return readObjectState(state, condition.objectState) === condition.objectState.equals;
    }
    console.warn("未知显示条件，按不满足处理：", condition);
    return false;
  }

  class SceneManager {
    constructor(root, scenes, state) {
      this.root = root;
      this.state = state;
      this.scenes = new Map(scenes.map((scene) => [scene.id, scene]));
      this.onObjectClick = null;
      this.interactionEnabled = true;
      // fullCanvas 物件的运行时条目：{ object, art, button, meta }
      this.canvasObjects = [];
      this.hotEntry = null;
      this.ready = Promise.resolve();
      this.root.addEventListener("pointermove", (event) => this.handlePointerMove(event), { passive: true });
      this.root.addEventListener("pointerleave", () => this.setHotEntry(null));
      this.root.addEventListener("click", (event) => this.handleCanvasClick(event));
      this.root.addEventListener("focusin", (event) => this.handleCanvasFocus(event, true));
      this.root.addEventListener("focusout", (event) => this.handleCanvasFocus(event, false));
    }

    load(sceneId) {
      const scene = this.scenes.get(sceneId);
      if (!scene) throw new Error(`场景不存在：${sceneId}`);
      this.state.sceneId = sceneId;
      this.render(scene);
    }

    // 只准备素材，不提交场景；事件引擎在等待后检查暂停/取消，再调用 load。
    async prepare(sceneId) {
      const scene = this.scenes.get(sceneId);
      if (!scene) throw new Error(`场景不存在：${sceneId}`);
      const variant = (scene.backgroundVariants || [])
        .find((entry) => evaluateCondition(entry.visibleWhen, this.state));
      const tasks = [prepareImage(variant?.image || scene.background)];
      for (const object of scene.objects || []) {
        if (object.invisible || !evaluateCondition(object.visibleWhen, this.state)) continue;
        const needsAlphaMask = object.fullCanvas && !object.visualOnly && !object.hitPosition;
        tasks.push(needsAlphaMask ? readImageMeta(object.image) : prepareImage(object.image));
      }
      await Promise.all(tasks);
    }

    whenReady() {
      return this.ready;
    }

    hasScene(sceneId) {
      return this.scenes.has(sceneId);
    }

    refresh() {
      if (this.state.sceneId) this.load(this.state.sceneId);
    }

    setInteractionEnabled(value) {
      this.interactionEnabled = value;
      for (const object of this.root.querySelectorAll(".scene-object")) object.disabled = !value;
      if (!value) this.setHotEntry(null);
    }

    render(scene) {
      this.setHotEntry(null);
      this.canvasObjects = [];
      this.root.replaceChildren();
      const background = document.createElement("img");
      background.className = "scene-background";
      background.decoding = "async";
      const backgroundVariant = (scene.backgroundVariants || [])
        .find((variant) => evaluateCondition(variant.visibleWhen, this.state));
      background.src = backgroundVariant?.image || scene.background;
      background.alt = scene.name;
      this.root.append(background);

      for (const object of scene.objects || []) {
        if (!evaluateCondition(object.visibleWhen, this.state)) continue;
        if (object.fullCanvas) {
          this.renderCanvasObject(object);
          continue;
        }
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scene-object";
        button.disabled = !this.interactionEnabled;
        button.title = object.name || object.id;
        button.setAttribute("aria-label", object.name || object.id);
        if (object.noHighlight) button.dataset.noHighlight = "true";
        if (object.showImage) button.dataset.showImage = "true";
        if (object.glow) button.dataset.glow = "true";
        button.style.left = `${object.position.x}%`;
        button.style.top = `${object.position.y}%`;
        button.style.width = `${object.position.width}%`;
        button.style.height = `${object.position.height}%`;
        button.style.zIndex = String(object.zIndex || 10);
        // 隐形命中区：命中矩形直接落在“背景上已经画好的东西”（如车厢门）上，不叠加任何贴图。
        if (!object.invisible) {
          const image = document.createElement("img");
          image.src = object.image;
          image.alt = "";
          image.decoding = "async";
          button.append(image);
        }
        button.addEventListener("click", () => {
          if (this.interactionEnabled && object.clickEvent && this.onObjectClick) {
            this.onObjectClick(object.clickEvent, object);
          }
        });
        this.root.append(button);
      }

      document.querySelector("#scene-name").textContent = scene.name;
      // 预加载解码后，新建 DOM 图片仍可能尚未完成自身的加载任务。
      this.ready = withTimeout(
        Promise.all([...this.root.querySelectorAll("img")].map(image => image.decode())),
        IMAGE_RESOURCE_TIMEOUT_MS,
        `场景渲染图片加载超时：${scene.id}`
      );
      // 同步 load/refresh 的调用者不一定等待；事件路径通过 whenReady 接收失败并回滚。
      this.ready.catch(() => {});
    }

    // fullCanvas 物件：视觉层整幅叠放（与背景同映射），命中按钮贴内容包围盒，
    // 点击与悬停由 handlePointerMove/handleCanvasClick 按不透明像素判定。
    renderCanvasObject(object) {
      const art = document.createElement("img");
      art.className = "scene-object-art";
      art.dataset.objectId = object.id;
      if (object.glow || (object.glowWhen && evaluateCondition(object.glowWhen, this.state))) art.classList.add("is-glow");
      art.src = object.image;
      art.alt = "";
      art.decoding = "async";
      art.style.zIndex = String(object.zIndex || 10);
      this.root.append(art);

      // 只用于遮挡后景的全画布贴图，不创建命中按钮，也不参与悬停/点击判定。
      if (object.visualOnly) return;

      const button = document.createElement("button");
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

      const entry = { object, art, button, meta: null };
      this.canvasObjects.push(entry);
      // 贴图加载前先使用场景里声明的命中框，避免本地文件/缓存导致整幅物件无法点击。
      if (object.hitPosition) {
        this.placeHitButton(entry);
        button.style.pointerEvents = "";
      }
      if (!object.hitPosition) {
        readImageMeta(object.image).then((meta) => {
          if (!meta || !button.isConnected) return;
          entry.meta = meta;
          this.placeHitButton(entry);
          button.style.pointerEvents = "";
        }).catch((error) => console.warn("物件命中区域准备失败：", object.image, error));
      }
    }

    placeHitButton(entry) {
      const rect = this.root.getBoundingClientRect();
      const stageWidth = rect.width || this.root.clientWidth || 1600;
      const stageHeight = rect.height || this.root.clientHeight || 900;
      const { meta } = entry;
      if (!meta) {
        const hit = entry.object.hitPosition;
        if (!hit) return;
        entry.button.style.left = `${hit.x}%`;
        entry.button.style.top = `${hit.y}%`;
        entry.button.style.width = `${hit.width}%`;
        entry.button.style.height = `${hit.height}%`;
        return;
      }
      const transform = coverTransform(stageWidth, stageHeight, meta.width, meta.height);
      const left = transform.offsetX + meta.bbox.x0 * transform.scale;
      const top = transform.offsetY + meta.bbox.y0 * transform.scale;
      const width = (meta.bbox.x1 - meta.bbox.x0 + 1) * transform.scale;
      const height = (meta.bbox.y1 - meta.bbox.y0 + 1) * transform.scale;
      entry.button.style.left = `${(left / stageWidth) * 100}%`;
      entry.button.style.top = `${(top / stageHeight) * 100}%`;
      entry.button.style.width = `${(width / stageWidth) * 100}%`;
      entry.button.style.height = `${(height / stageHeight) * 100}%`;
    }

    handlePointerMove(event) {
      if (!this.interactionEnabled) {
        this.setHotEntry(null);
        return;
      }
      this.setHotEntry(this.topCanvasEntryAt(event));
    }

    handleCanvasClick(event) {
      const target = event.target;
      const button = target && target.closest ? target.closest(".scene-object-hit") : null;
      if (!button || !this.interactionEnabled) return;
      const entry = this.findCanvasEntry(button);
      if (!entry || !entry.object.clickEvent || !this.onObjectClick) return;
      // 键盘激活的 click（detail === 0）不做像素判定；鼠标点击必须落在不透明内容上。
      if (event.detail > 0 && !this.isEntryHit(entry, event)) return;
      this.onObjectClick(entry.object.clickEvent, entry.object);
    }

    handleCanvasFocus(event, focused) {
      const target = event.target;
      const button = target && target.closest ? target.closest(".scene-object-hit") : null;
      const entry = button ? this.findCanvasEntry(button) : null;
      if (!entry) return;
      if (!focused) {
        entry.art.classList.remove("is-focused");
        return;
      }
      // 只在键盘等 :focus-visible 聚焦时显示高亮，鼠标点击留下的普通焦点不残留光效。
      requestAnimationFrame(() => {
        if (document.activeElement === entry.button && entry.button.matches(":focus-visible")) {
          entry.art.classList.add("is-focused");
        }
      });
    }

    findCanvasEntry(button) {
      for (const entry of this.canvasObjects) {
        if (entry.button === button) return entry;
      }
      return null;
    }

    setHotEntry(entry) {
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
    topCanvasEntryAt(event) {
      const point = this.stagePoint(event);
      if (!point) return null;
      const rect = point.rect;
      let best = null;
      for (const entry of this.canvasObjects) {
        if ((!entry.meta && !entry.object.hitPosition) || entry.button.disabled) continue;
        if (this.alphaHit(entry, rect, point.x, point.y)) {
          const z = entry.object.zIndex || 10;
          if (!best || z >= (best.object.zIndex || 10)) best = entry;
        }
      }
      return best;
    }

    isEntryHit(entry, event) {
      if (!entry.meta && !entry.object.hitPosition) return false;
      const point = this.stagePoint(event);
      return Boolean(point) && this.alphaHit(entry, point.rect, point.x, point.y);
    }

    stagePoint(event) {
      const rect = this.root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
      return { rect, x, y };
    }

    alphaHit(entry, rect, x, y) {
      const { meta } = entry;
      // 显式命中框优先于透明像素：适合纸张、手机等小型线索，给边缘留出可点击余量，
      // 也避免本地贴图读取失败时按钮一直停留在 pointer-events:none。
      const hit = entry.object.hitPosition;
      if (hit) {
        const left = (hit.x / 100) * rect.width;
        const top = (hit.y / 100) * rect.height;
        const right = left + (hit.width / 100) * rect.width;
        const bottom = top + (hit.height / 100) * rect.height;
        return x >= left && x <= right && y >= top && y <= bottom;
      }
      if (!meta) {
        return false;
      }
      const transform = coverTransform(rect.width, rect.height, meta.width, meta.height);
      const canvasX = (x - transform.offsetX) / transform.scale;
      const canvasY = (y - transform.offsetY) / transform.scale;
      const xi = Math.floor(canvasX);
      const yi = Math.floor(canvasY);
      const { bbox } = meta;
      if (xi < bbox.x0 || xi > bbox.x1 || yi < bbox.y0 || yi > bbox.y1) return false;
      const pixelIndex = yi * meta.width + xi;
      return (meta.mask[pixelIndex >> 3] & (1 << (pixelIndex & 7))) !== 0;
    }
  }

  Game.evaluateCondition = evaluateCondition;
  Game.SceneManager = SceneManager;
})(window.TrainGame);
