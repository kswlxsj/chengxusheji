(function (Game) {
  "use strict";

  // 视为“命中”的最小不透明度（抗锯齿毛边不计入）。
  const HIT_ALPHA_THRESHOLD = 8;
  const imageMetaCache = new Map();

  // 读取并缓存整幅画布贴图（fullCanvas）的尺寸与不透明内容包围盒。
  function readImageMeta(src) {
    if (!imageMetaCache.has(src)) {
      imageMetaCache.set(src, loadImageMeta(src));
    }
    return imageMetaCache.get(src);
  }

  function loadImageMeta(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d", { willReadFrequently: true });
          context.drawImage(image, 0, 0);
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
          const bbox = computeAlphaBBox(pixels);
          resolve(bbox ? { width: canvas.width, height: canvas.height, pixels, bbox } : null);
        } catch (error) {
          console.warn("读取物件贴图信息失败：", src, error);
          resolve(null);
        }
      };
      image.onerror = () => {
        console.warn("物件贴图加载失败：", src);
        resolve(null);
      };
      image.src = src;
    });
  }

  function computeAlphaBBox(pixels) {
    const { width, height, data } = pixels;
    let x0 = width;
    let y0 = height;
    let x1 = -1;
    let y1 = -1;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (data[(y * width + x) * 4 + 3] > HIT_ALPHA_THRESHOLD) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    return x1 >= x0 && y1 >= y0 ? { x0, y0, x1, y1 } : null;
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
      this.root.addEventListener("pointermove", (event) => this.handlePointerMove(event));
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
      background.src = scene.background;
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
        button.style.left = `${object.position.x}%`;
        button.style.top = `${object.position.y}%`;
        button.style.width = `${object.position.width}%`;
        button.style.height = `${object.position.height}%`;
        button.style.zIndex = String(object.zIndex || 10);
        const image = document.createElement("img");
        image.src = object.image;
        image.alt = "";
        button.append(image);
        button.addEventListener("click", () => {
          if (this.interactionEnabled && object.clickEvent && this.onObjectClick) {
            this.onObjectClick(object.clickEvent, object);
          }
        });
        this.root.append(button);
      }

      document.querySelector("#scene-name").textContent = scene.name;
    }

    // fullCanvas 物件：视觉层整幅叠放（与背景同映射），命中按钮贴内容包围盒，
    // 点击与悬停由 handlePointerMove/handleCanvasClick 按不透明像素判定。
    renderCanvasObject(object) {
      const art = document.createElement("img");
      art.className = "scene-object-art";
      art.src = object.image;
      art.alt = "";
      art.style.zIndex = String(object.zIndex || 10);
      this.root.append(art);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "scene-object scene-object-hit";
      button.disabled = !this.interactionEnabled;
      button.title = object.name || object.id;
      button.setAttribute("aria-label", object.name || object.id);
      button.style.zIndex = String(object.zIndex || 10);
      // 贴图信息就绪前不拦截指针，避免出现整幅舞台大小的“隐形按钮”。
      button.style.pointerEvents = "none";
      this.root.append(button);

      const entry = { object, art, button, meta: null };
      this.canvasObjects.push(entry);
      readImageMeta(object.image).then((meta) => {
        if (!meta || !button.isConnected) return;
        entry.meta = meta;
        this.placeHitButton(entry);
        button.style.pointerEvents = "";
      });
    }

    placeHitButton(entry) {
      const rect = this.root.getBoundingClientRect();
      const stageWidth = rect.width || this.root.clientWidth || 1600;
      const stageHeight = rect.height || this.root.clientHeight || 900;
      const { meta } = entry;
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
        if (!entry.meta || entry.button.disabled) continue;
        if (this.alphaHit(entry, rect, point.x, point.y)) {
          const z = entry.object.zIndex || 10;
          if (!best || z >= (best.object.zIndex || 10)) best = entry;
        }
      }
      return best;
    }

    isEntryHit(entry, event) {
      if (!entry.meta) return false;
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
      const transform = coverTransform(rect.width, rect.height, meta.width, meta.height);
      const canvasX = (x - transform.offsetX) / transform.scale;
      const canvasY = (y - transform.offsetY) / transform.scale;
      const xi = Math.floor(canvasX);
      const yi = Math.floor(canvasY);
      const { bbox } = meta;
      if (xi < bbox.x0 || xi > bbox.x1 || yi < bbox.y0 || yi > bbox.y1) return false;
      return meta.pixels.data[(yi * meta.width + xi) * 4 + 3] > HIT_ALPHA_THRESHOLD;
    }
  }

  Game.evaluateCondition = evaluateCondition;
  Game.SceneManager = SceneManager;
})(window.TrainGame);
