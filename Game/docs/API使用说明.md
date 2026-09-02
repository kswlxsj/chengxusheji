# 组员 API 与数据约定

## 一、场景制作人员：贴图与可点击物

在 `data/scenes.json` 添加对象。坐标全部是相对于 16:9 游戏画面的百分比，因此窗口缩放后仍能对齐。

```json
{
  "id": "box_06",
  "name": "木箱",
  "image": "assets/box.png",
  "position": { "x": 18, "y": 54, "width": 20, "height": 24 },
  "zIndex": 12,
  "clickEvent": "E_BOX"
}
```

单独切图最好保留透明背景。当前点击区域是图片外接矩形；透明像素较多的极不规则物件，第一版建议把切图边界裁紧。以后若确实误触严重，再添加 SVG `clip-path` 或透明像素命中，不要现在扩大引擎复杂度。

隐藏条件示例：

```json
{
  "visibleWhen": {
    "not": {
      "objectState": {
        "objectId": "box_06",
        "property": "hidden",
        "equals": true
      }
    }
  }
}
```

## 二、剧情/AI 转换：事件动作

事件是刚性剧情的最小单位：

```json
{
  "id": "E_BOX",
  "actions": [
    { "type": "dialogue", "speaker": "旁白", "text": "箱子没有上锁。" },
    { "type": "addItem", "item": "key" },
    { "type": "setObjectState", "object": "box_06", "patch": { "opened": true } }
  ]
}
```

### v0.1 动作表

| `type` | 必填字段 | 作用 |
| --- | --- | --- |
| `dialogue` | `text` | 常驻文本框流式输出一句话 |
| `inspect` | `title`, `text` | 弹出调查窗口；可加 `image` |
| `choice` | `prompt`, `options[]` | 玩家选择；每项含 `label`, `next` |
| `check` | `checkId`, `attribute`, `success`, `fail` | d100 与角色属性比较；可加 `modifier`, `label` |
| `changeScene` | `scene` | 清空旧场景并加载目标场景 |
| `setFlag` | `key`, `value` | 写入重要事件旗标 |
| `modifyAttribute` | `attribute`, `amount` | 增减角色属性 |
| `setSkill` | `skill`, `value` | 普通设置技能布尔值，不屏蔽自动触发 |
| `learnSkill` | `skill` | 强制习得技能，并永久屏蔽该技能的自动触发 |
| `loseSkill` | `skill` | 强制失去技能，并永久屏蔽该技能的自动触发 |
| `addItem` | `item` | 向物品栏加入已注册物品 |
| `setObjectState` | `object`, `patch` | 合并更新场景物件状态 |
| `custom` | `name` | 调用程序员白名单动作；可加 `params` |

检定必须有全局唯一且稳定的 `checkId`。推荐格式：`事件语义_序号`，例如 `door_insight_001`；不要只依赖数组位置，因为编剧插入动作后位置会改变。

## 三、程序员：注册特殊动作

在 `src/custom-actions.js` 中注册：

```javascript
engine.registerCustomAction("shakeWindow", async (params, context) => {
  // params 来自 JSON；context 提供 state、scene、ui、engine、items、wait 和取消检查。
  context.ui.toast(`震动 ${params.duration}ms`);
  // 有等待过程的演出必须使用 context.wait，才能随暂停冻结并在返回主界面时取消。
  await context.wait(params.duration);
  context.throwIfCancelled();
});
```

JSON 里调用：

```json
{
  "type": "custom",
  "name": "shakeWindow",
  "params": { "duration": 500 }
}
```

不要让 JSON 传入 JavaScript 源码，也不要按字符串访问 `window[name]`。特殊动作的注册位置就是安全边界和组员协作清单。

修改属性或技能时使用状态接口，不要直接写 `state.attributes` 或 `state.skills`：

```javascript
context.state.getAttribute("insight");
context.state.setAttribute("insight", 70);
context.state.modifyAttribute("san", -3);
context.state.getSkill("keen_insight");
context.state.setSkill("keen_insight", false);
context.state.learnSkill("keen_insight");
context.state.loseSkill("keen_insight");
```

属性接口只接受整数，并把结果限制在注册的 `min` 与 `max` 之间。`setSkill` 仍可能在相关属性下次变化时被自动逻辑覆盖；`learnSkill` 和 `loseSkill` 会永久关闭该技能在当前存档中的自动逻辑。
注册定义可通过 `context.attributes` 与 `context.skills` 两个只读用途的 `Map` 查询；不要在运行时修改定义。

`context.wait(milliseconds)` 是可暂停、可取消的延迟；不要在自定义动作中直接使用 `setTimeout` 或普通延迟 Promise。异步等待后、继续修改状态前调用 `context.throwIfCancelled()`，避免已返回主界面的旧演出继续写入状态。

若要新增一种所有剧情都会频繁使用的通用原子动作，再调用 `engine.registerAction(type, handler)`；一次性演出优先注册 `custom`，不要修改 `EventEngine.play()` 主循环。

## 四、程序员：派生通用窗口

`TrainGame.GameWindow` 负责窗口元素的基础生命周期和内容装载。构造时传入窗口挂载层（通常是 `#window-layer`）与可选的自定义 CSS 类名：

| 方法 | 作用 |
| --- | --- |
| `new GameWindow(root, className)` | 创建带有 `.game-window` 基础样式的窗口 |
| `open()` | 将窗口挂载到 `root`；已挂载时不会重复添加 |
| `close()` | 从页面移除窗口元素 |
| `setContent(content)` | 清空旧内容并写入字符串或 DOM 节点；字符串使用 `textContent` |
| `addChild(child)` | 追加 DOM 节点或另一个 `GameWindow` 的元素 |

需要新窗口类型时应派生基类，并在 `UIManager` 中只创建一个实例。下面的窗口会返回一个 Promise，适合由事件动作等待玩家关闭：

```javascript
class NoticeWindow extends TrainGame.GameWindow {
  constructor(root) {
    super(root, "notice-window");
  }

  show(title, text) {
    const content = document.createElement("div");
    const heading = document.createElement("h2");
    const paragraph = document.createElement("p");
    const closeButton = document.createElement("button");
    heading.textContent = title;
    paragraph.textContent = text;
    closeButton.type = "button";
    closeButton.textContent = "关闭";
    content.append(heading, paragraph, closeButton);
    this.setContent(content).open();

    return new Promise((resolve) => {
      closeButton.addEventListener("click", () => {
        this.close();
        resolve();
      }, { once: true });
    });
  }
}

// UIManager 构造函数中：this.notice = new NoticeWindow(root);
// 事件动作中：await context.ui.notice.show("提示", "窗口内容");
```

基类不会自动创建模态遮罩、关闭按钮或 Promise，也不会决定窗口何时出现；这些行为由派生类负责。常驻对话、选项和调查窗口可分别参考 `DialogWindow`、`ChoiceWindow` 与 `InspectWindow` 的现有实现。新增样式时使用传入的自定义类名，保留 `.game-window` 的公共外观和交互规则。

## 五、常用调试入口

开发时浏览器控制台可查看：

```javascript
// 查看当前可序列化游戏状态。
game.state.snapshot()

// 手动播放一个事件，方便单独调试剧情节点。
game.engine.play("E_NOTE")

// 重新渲染当前场景，方便检查显示条件。
game.scene.refresh()
```

这些只是调试入口，不应写进剧情 JSON。

## 六、主界面配置与稳定存档

`data/meta.json` 必须提供非空的 `title` 和 `coverImage`。`coverImage` 是相对于项目根目录的图片路径；推荐使用 16:9 图片，界面会以 `object-fit: cover` 填满游戏区域。

`EventEngine.getStableSnapshot()` 返回最近一次完整事件链结束后的状态副本；读取存档或重置状态后，应调用 `EventEngine.adoptStableState()` 建立新的稳定点。`SaveManager.save(snapshot)` 可以保存显式快照，未传参数时仍保存当前状态以保持兼容。

## 七、属性与技能注册

属性在 `data/attributes.json` 注册。`totalPoints` 是新游戏时必须全部分配的额外点数：

```json
{
  "totalPoints": 10,
  "attributes": [
    {
      "id": "insight",
      "name": "灵感",
      "description": "观察和理解异常现象的能力。",
      "initial": 60,
      "min": 0,
      "max": 99
    }
  ]
}
```

技能在 `data/skills.json` 注册。没有 `autoTrigger` 的技能只受手动动作影响；有条件时，条件为真即自动设为 `true`，否则设为 `false`：

```json
[
  {
    "id": "keen_insight",
    "name": "敏锐直觉",
    "description": "灵感达到 70 时自动生效。",
    "initial": false,
    "autoTrigger": {
      "all": [
        { "attribute": "insight", "operator": "gte", "value": 70 },
        { "attribute": "san", "operator": "gt", "value": 0 }
      ]
    }
  }
]
```

条件可用 `all`、`any`、`not` 组合；比较符支持 `eq`、`ne`、`lt`、`lte`、`gt`、`gte`。自动条件只能引用属性。选择项的 `when` 和场景物件的 `visibleWhen` 还可以读取属性或技能：

```json
{ "attribute": "insight", "operator": "gte", "value": 70 }
{ "skill": "keen_insight", "equals": true }
```

修改注册表后必须运行 `npm run compile`。编译器会检查重复 ID、整数边界、可分配容量，以及事件和条件引用是否存在。
