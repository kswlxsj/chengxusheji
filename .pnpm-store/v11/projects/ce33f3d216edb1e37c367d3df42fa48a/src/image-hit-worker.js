"use strict";

const HIT_ALPHA_THRESHOLD = 8;
const WORKER_TASK_TIMEOUT_MS = 10000;

function withTimeout(promise, milliseconds) {
  let handle = null;
  const timeout = new Promise((resolve, reject) => {
    handle = setTimeout(() => reject(new Error("场景图片分析超时")), milliseconds);
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (handle !== null) clearTimeout(handle);
  });
}

function packAlphaMask(pixels) {
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
  }
  return {
    width,
    height,
    mask,
    bbox: x1 >= x0 && y1 >= y0 ? { x0, y0, x1, y1 } : null
  };
}

async function analyzeImage(event) {
  const { id, src } = event.data || {};
  let bitmap = null;
  try {
    bitmap = await withTimeout((async () => {
      const response = await fetch(src, { cache: "force-cache" });
      if (!response.ok) throw new Error(`场景图片请求失败：${response.status}`);
      return createImageBitmap(await response.blob());
    })(), WORKER_TASK_TIMEOUT_MS);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(bitmap, 0, 0);
    const result = packAlphaMask(context.getImageData(0, 0, bitmap.width, bitmap.height));
    self.postMessage({
      id,
      width: result.width,
      height: result.height,
      bbox: result.bbox,
      mask: result.mask
    }, [result.mask.buffer]);
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : "命中区域分析失败"
    });
  } finally {
    bitmap?.close?.();
  }
}

// 整屏图层的 RGBA 数据很大，串行处理可避免多张图同时解码和扫描造成内存峰值。
let taskQueue = Promise.resolve();
self.addEventListener("message", (event) => {
  taskQueue = taskQueue.then(() => analyzeImage(event));
});
