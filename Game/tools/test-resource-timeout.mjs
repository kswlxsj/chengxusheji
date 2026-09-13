import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const sandbox = {
  console,
  clearTimeout,
  setTimeout,
  window: {}
};
vm.createContext(sandbox);
vm.runInContext(await readFile("src/namespace.js", "utf8"), sandbox);
vm.runInContext(await readFile("src/events.js", "utf8"), sandbox);

const Game = sandbox.window.TrainGame;
const engine = new Game.EventEngine({
  events: [],
  state: { snapshot: () => ({}) },
  scene: {},
  ui: {},
  items: []
});
const run = { cancelled: false };
engine.activeRun = run;

const startedAt = Date.now();
await assert.rejects(
  () => engine.waitFor(new Promise(() => {}), run, { timeoutMs: 30, label: "测试资源" }),
  /测试资源加载超时/
);
assert.ok(Date.now() - startedAt < 1000, "资源等待应被主动超时，而不是永久挂起");
engine.activeRun = null;

let workerMessageHandler = null;
let workerResult = null;
const bitmap = { width: 2, height: 1, close() {} };
const workerSandbox = {
  Error,
  Uint8Array,
  clearTimeout,
  setTimeout,
  self: {
    addEventListener(name, handler) {
      if (name === "message") workerMessageHandler = handler;
    },
    postMessage(message) {
      workerResult = message;
    }
  },
  fetch: async () => ({ ok: true, blob: async () => new Blob() }),
  createImageBitmap: async () => bitmap,
  OffscreenCanvas: class {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    getContext() {
      return {
        drawImage() {},
        getImageData() {
          return {
            width: 2,
            height: 1,
            data: new Uint8Array([
              0, 0, 0, 0,
              255, 255, 255, 255
            ])
          };
        }
      };
    }
  }
};
vm.createContext(workerSandbox);
vm.runInContext(await readFile("src/image-hit-worker.js", "utf8"), workerSandbox);
workerMessageHandler({ data: { id: 7, src: "http://127.0.0.1/test.png" } });
await new Promise((resolve) => setImmediate(resolve));
assert.equal(workerResult.id, 7);
assert.equal(workerResult.width, 2);
assert.equal(workerResult.height, 1);
assert.equal(workerResult.mask.byteLength, 1, "命中数据应按位压缩，而不是保留整张 RGBA");
assert.equal(workerResult.mask[0], 2, "第二个不透明像素应写入第二个命中位");
assert.deepEqual(
  { ...workerResult.bbox },
  { x0: 1, y0: 0, x1: 1, y1: 0 },
  "包围盒应只覆盖不透明内容"
);

const clearedTimers = [];
const scheduledTimers = [];
let nextTimerId = 1;
const uiSandbox = {
  clearTimeout(handle) {
    clearedTimers.push(handle);
  },
  performance,
  setTimeout(callback, milliseconds) {
    const id = nextTimerId++;
    scheduledTimers.push({ id, callback, milliseconds });
    return id;
  },
  window: {}
};
vm.createContext(uiSandbox);
vm.runInContext(await readFile("src/namespace.js", "utf8"), uiSandbox);
vm.runInContext(await readFile("src/ui.js", "utf8"), uiSandbox);
const TextPlayer = uiSandbox.window.TrainGame.TextPlayer;
const player = new TextPlayer({ textContent: "" });
player.running = true;
player.paused = false;
player.text = "第二句";
player.index = 0;
player.speed = 28;
player.timer = 99;
player.lastProgressAt = performance.now() - 2000;
player.ensureRunning();
assert.equal(clearedTimers.includes(99), true, "失效的非空计时器也应被清理");
assert.equal(scheduledTimers.length, 1, "停止推进的文本应重新安排打字计时器");
assert.equal(scheduledTimers[0].milliseconds, 28);

console.log("资源等待、命中位图与对白计时器测试通过。");
