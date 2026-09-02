import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function readJson(relativePath) {
  return JSON.parse(await readFile(resolve(projectRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertUnique(records, label) {
  const ids = new Set();
  for (const record of records) {
    assert(record && typeof record.id === "string" && record.id, `${label}存在无效 id`);
    assert(!ids.has(record.id), `${label} id 重复：${record.id}`);
    ids.add(record.id);
  }
  return ids;
}

function validate(meta, scenes, events, items) {
  assert(meta.formatVersion === 1, "当前编译器只支持 formatVersion=1");
  const sceneIds = assertUnique(scenes, "场景");
  const eventIds = assertUnique(events, "事件");
  const itemIds = assertUnique(items, "物品");
  assert(sceneIds.has(meta.initialScene), `初始场景不存在：${meta.initialScene}`);
  assert(eventIds.has(meta.startEvent), `起始事件不存在：${meta.startEvent}`);

  const actionTypes = new Set([
    "dialogue", "inspect", "choice", "check", "changeScene", "setFlag",
    "modifyAttribute", "addItem", "setObjectState", "custom"
  ]);

  for (const scene of scenes) {
    assert(typeof scene.background === "string", `场景缺少背景：${scene.id}`);
    for (const object of scene.objects || []) {
      assert(object.clickEvent && eventIds.has(object.clickEvent), `物件 ${object.id} 引用了不存在的事件`);
      assert(object.position && ["x", "y", "width", "height"].every((key) => Number.isFinite(object.position[key])), `物件 ${object.id} 的 position 无效`);
    }
  }

  for (const event of events) {
    assert(Array.isArray(event.actions), `事件缺少 actions：${event.id}`);
    if (event.next) assert(eventIds.has(event.next), `事件 ${event.id} 的 next 不存在`);
    for (const action of event.actions) {
      assert(actionTypes.has(action.type), `事件 ${event.id} 使用未知动作：${action.type}`);
      if (action.type === "changeScene") assert(sceneIds.has(action.scene), `事件 ${event.id} 引用了不存在的场景`);
      if (action.type === "addItem") assert(itemIds.has(action.item), `事件 ${event.id} 引用了不存在的物品`);
      if (action.type === "check") {
        assert(action.checkId, `事件 ${event.id} 的检定缺少 checkId`);
        assert(eventIds.has(action.success) && eventIds.has(action.fail), `事件 ${event.id} 的检定分支不存在`);
      }
      if (action.type === "choice") {
        assert(Array.isArray(action.options) && action.options.length, `事件 ${event.id} 的选择为空`);
        for (const option of action.options) assert(eventIds.has(option.next), `事件 ${event.id} 的选项分支不存在：${option.next}`);
      }
      if (action.type === "custom") assert(typeof action.name === "string" && action.name, `事件 ${event.id} 的自定义动作缺少 name`);
    }
  }
}

const [meta, scenes, events, items] = await Promise.all([
  readJson("data/meta.json"),
  readJson("data/scenes.json"),
  readJson("data/events.json"),
  readJson("data/items.json")
]);

validate(meta, scenes, events, items);
const bundle = JSON.stringify({ meta, scenes, events, items }, null, 2)
  .replaceAll("\u2028", "\\u2028")
  .replaceAll("\u2029", "\\u2029");
await writeFile(resolve(projectRoot, "data/compiled-game-data.js"), `window.GAME_DATA = ${bundle};\n`, "utf8");
console.log(`编译完成：${scenes.length} 个场景，${events.length} 个事件，${items.length} 个物品。`);
