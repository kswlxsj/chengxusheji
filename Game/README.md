# 末班列车网页游戏框架

一个面向短周期课程项目的轻量、事件驱动型剧情网页游戏框架。项目使用原生 HTML、CSS 和 JavaScript，不依赖前端框架，也没有玩家侧构建步骤；内容维护者编辑 JSON，编译器负责校验引用并生成浏览器可直接加载的数据包。

本文同时是两类协作者的工作手册：

- **游戏内容维护者**：编剧、场景/素材制作与剧本数据转换人员，重点阅读[内容维护者手册](#游戏内容维护者手册)和[数据接口参考](#数据接口参考)。
- **游戏框架维护者**：负责运行时、UI、存档、校验器和通用能力的程序员，重点阅读[框架维护者手册](#游戏框架维护者手册)。

## 目录

- [项目定位](#项目定位)
- [当前开发进度](#当前开发进度)
- [快速开始](#快速开始)
- [运行原理](#运行原理)
- [项目文件结构](#项目文件结构)
- [游戏内容维护者手册](#游戏内容维护者手册)
- [数据接口参考](#数据接口参考)
- [游戏框架维护者手册](#游戏框架维护者手册)
- [复杂维护工作示例](#复杂维护工作示例)
- [测试排错与交付](#测试排错与交付)

## 项目定位

本项目是“场景 + 可点击物件 + 顺序事件 + 状态分支”的剧情解释器，不是通用游戏引擎，适合多人并行制作固定流程的调查、解谜或视觉小说式游戏。

- **场景**决定玩家看见什么、物件在哪里以及点击后进入哪个事件。
- **事件**用有限的原子动作组织对话、调查、检定、选择和状态修改。
- **状态**记录属性、技能、旗标、物品、物件状态和检定结果。
- **编译器**发现重复 ID、悬空引用、错误字段和部分数值错误，并生成 `data/compiled-game-data.js`。
- **浏览器运行时**读取编译产物并驱动界面；JSON 不能执行任意 JavaScript。

核心边界：

1. 同时只显示一个场景。
2. 场景物件只保存视觉信息、显示条件和 `clickEvent`，不内嵌剧情逻辑。
3. 等待玩家回到场景点击物件必须作为事件边界。
4. `choice` 和 `check` 会结束当前事件，并跳到目标事件继续执行。
5. 存档只记录完整事件结束后的稳定状态，不保存执行到一半的调用栈。
6. 项目专属演出通过白名单注册，不使用 `eval` 或字符串形式的函数代码。

## 当前开发进度

当前运行时版本为 **v0.1.0**，数据格式版本为 **2**，存档版本为 **2**。

### 已完成

- 可配置标题和 16:9 封面的主界面。
- 新游戏属性点分配；必须用完全部点数。
- 单场景背景和按百分比定位的可点击贴图。
- 流式对话、自动播放、快进和跳过本句。
- 调查窗口、条件选项和基于属性的 d100 检定。
- 场景、旗标、属性、技能、物品和物件状态修改。
- 技能按属性自动触发，以及手动永久覆盖自动触发。
- 可暂停、可取消的自定义异步演出。
- 独立主页、游戏页、存档管理/写入页、结束页及占位信息页。
- 浏览器本地三个存档槽位，支持读取、覆盖和删除。
- 稳定状态存档：事件中保存的是该事件开始前最近的完整状态。
- SAN 归零后立即终止事件并进入结束页。
- 六份内容 JSON 的 VS Code Schema、编译期交叉引用校验和运行时测试。
- 无前端依赖、通过同源静态服务器交付。

当前示例已跑通：

```text
新游戏 → 分配属性 → 6 号车厢
       ├─ 点击便签 → 获得旧车票 → 便签永久隐藏
       └─ 点击门 → 灵感检定
                    ├─ 失败 → 理智 -3
                    └─ 成功 → 选择进入 7 号车厢
                                 └─ 调查收音机 / 返回 6 号车厢
```

### 尚未实现

- 云存档和服务器同步。
- 独立物品栏窗口、物品详情和主动使用；当前 HUD 只显示物品名称。
- 通用 NPC 注册系统。
- Canvas 或透明像素级不规则命中；当前点击区域是图片外接矩形。
- 恢复到事件中间某句文本的协程式存档。
- 任意表达式求值器、可视化编辑器和完整 Markdown 剧本转换器。
- 完整浏览器端自动化测试；现有测试聚焦状态、技能、条件、存档和部分动作。

## 快速开始

### 玩家或验收人员

保留完整目录，通过固定地址的本地静态服务器打开 `index.html`。点击对话框或场景空白处推进普通对话，按 `Esc` 或点击“暂停”打开菜单。

第一次运行或遇到启动问题时，请阅读独立的[游戏启动说明](启动说明.md)。

例如在 `Game` 目录启动 Python 自带的静态服务器：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

然后始终通过 `http://127.0.0.1:8000/` 访问；更换协议、主机或端口会进入另一份浏览器存储空间。

> [!NOTE]
> 多个页面依靠同源的 `localStorage` 和 `sessionStorage` 传递存档。浏览器对 `file:` 地址下存储的行为没有统一保证，因此直接双击只可用于查看静态页面，不属于受支持的游戏运行方式。

### 内容或框架维护者

需要 Node.js 与 npm。当前 `package.json` 没有依赖，无需执行 `npm install`。

```powershell
# 校验六份内容数据并重新生成浏览器数据包
npm run compile

# 运行不依赖 DOM 的运行时测试
npm test

# 提交前：重新编译、检查源码语法并运行测试
npm run check
```

当前数据的完整检查结果最后应包含：

```text
编译完成：2 个场景，135 个事件，1 个物品，8 个属性，6 个技能。
运行时测试通过：属性分配、技能触发、条件读取、三槽存档与终止状态。
```

## 运行原理

```text
data/*.json（人工维护）
    │ npm run compile
    ▼
tools/compile-data.mjs（校验与合并）
    ▼
data/compiled-game-data.js（生成 window.GAME_DATA）
    │ 各页面按职责加载共享数据与模块
    ▼
主页 / 存档页 / GameState + SceneManager + UIManager + EventEngine
    ▼
浏览器场景、事件、跨页交接和三槽 localStorage 存档
```

一次物件点击的处理过程：

1. `SceneManager` 根据 `scenes.json` 渲染满足条件的物件。
2. 点击后，`scene.onObjectClick` 收到物件的 `clickEvent`。
3. `EventEngine.play(eventId)` 锁定场景交互并依次解释动作。
4. 动作调用 UI 或 `GameState`，状态变化后刷新 HUD。
5. 完整事件链成功结束后更新稳定快照并开放场景交互。
6. 动作报错或事件取消时回滚到旧稳定快照。

## 项目文件结构

以下列出当前所有项目目录及受版本控制文件。新增或调整职责后应同步更新本节。

```text
Game/
├─ .vscode/
│  └─ settings.json
├─ assets/
│  ├─ carriage-06.svg
│  ├─ carriage-07.svg
│  ├─ cover-placeholder.svg
│  ├─ door.svg
│  ├─ note.svg
│  └─ radio.svg
├─ data/
│  ├─ attributes.json
│  ├─ compiled-game-data.js
│  ├─ events.json
│  ├─ items.json
│  ├─ meta.json
│  ├─ scenes.json
│  └─ skills.json
├─ docs/
│  ├─ API使用说明.md
│  ├─ 三天计划.md
│  └─ 架构设计.md
├─ schemas/
│  ├─ attributes.schema.json
│  ├─ events.schema.json
│  ├─ game-data.schema.json
│  ├─ items.schema.json
│  ├─ meta.schema.json
│  ├─ scenes.schema.json
│  └─ skills.schema.json
├─ src/
│  ├─ custom-actions.js
│  ├─ events.js
│  ├─ home.js
│  ├─ main.js
│  ├─ namespace.js
│  ├─ page-flow.js
│  ├─ save-manager.js
│  ├─ save-write.js
│  ├─ scene.js
│  ├─ state.js
│  └─ ui.js
├─ styles/
│  └─ main.css
├─ tools/
│  ├─ compile-data.mjs
│  └─ test-runtime.mjs
├─ AGENTS.md
├─ about.html
├─ ending.html
├─ game.html
├─ index.html
├─ package.json
├─ save-manager.html
├─ save-write.html
├─ settings.html
├─ 启动说明.md
└─ README.md
```

### `.vscode/`

| 文件 | 用途 |
| --- | --- |
| `settings.json` | 将六份 `data/*.json` 关联到对应 Schema。用 VS Code 打开整个目录即可获得补全和错误提示。 |

### `assets/`

| 文件 | 用途 |
| --- | --- |
| `carriage-06.svg` | 6 号车厢示例背景。 |
| `carriage-07.svg` | 7 号车厢示例背景。 |
| `cover-placeholder.svg` | `meta.coverImage` 使用的主界面占位封面。 |
| `door.svg` | 两个车厢门共用的透明物件贴图。 |
| `note.svg` | 便签贴图，同时暂作旧车票图片。 |
| `radio.svg` | 收音机贴图，同时用于调查窗口插图。 |

建议背景为 16:9；物件使用边界裁紧的透明 PNG、WebP 或 SVG。文件名宜用小写英文、数字和连字符，路径大小写必须一致。

### `data/`

| 文件 | 手动编辑 | 用途 |
| --- | --- | --- |
| `meta.json` | 是 | 标题、封面、入口和初始状态。 |
| `scenes.json` | 是 | 场景背景、物件位置、点击入口和显示条件。 |
| `events.json` | 是 | 剧情事件、动作、选择和检定分支。 |
| `items.json` | 是 | 物品注册表；当前 UI 只使用名称。 |
| `attributes.json` | 是 | 属性、边界和新游戏可分配点数。 |
| `skills.json` | 是 | 技能和可选的属性自动触发条件。 |
| `compiled-game-data.js` | **否** | `npm run compile` 生成的数据包；必须随游戏交付。 |

### `docs/`

| 文件 | 用途 |
| --- | --- |
| `架构设计.md` | v0.1 架构目标、职责、状态示例和边界。 |
| `API使用说明.md` | 早期精简接口速查；README 是当前完整手册。 |
| `三天计划.md` | 最初三天交付安排，保留作过程记录。 |

### `schemas/`

| 文件 | 用途 |
| --- | --- |
| `meta.schema.json` | `meta.json` 的编辑器 Schema。 |
| `scenes.schema.json` | 场景、物件、坐标和显示条件。 |
| `events.schema.json` | 事件、全部内置动作和选择条件。 |
| `items.schema.json` | 物品注册表。 |
| `attributes.schema.json` | 属性注册表和点数类型。 |
| `skills.schema.json` | 技能和属性自动触发条件。 |
| `game-data.schema.json` | 六类数据合并后的总结构参考；当前 VS Code 不直接关联它。 |

Schema 提供编辑提示，`compile-data.mjs` 负责跨文件引用和业务校验。修改数据协议时通常要同步更新 Schema、编译器、运行时、测试和本文。

### `src/`

| 文件 | 用途 |
| --- | --- |
| `namespace.js` | 创建 `window.TrainGame`，提供版本、深拷贝和普通延迟。 |
| `page-flow.js` | 集中维护页面路径、槽位参数和跨页临时状态。 |
| `state.js` | `GameState`、属性/技能规则、快照恢复与 `SaveManager`。 |
| `ui.js` | 窗口基类、文本播放器、各类窗口和 `UIManager`。 |
| `scene.js` | 通用条件求值与 `SceneManager`。 |
| `events.js` | 注册表、取消机制、终止条件、内置动作与 `EventEngine`。 |
| `custom-actions.js` | 项目动作白名单；当前包含 `flashScreen`。 |
| `home.js` | 从游戏元数据初始化主页标题与封面。 |
| `save-manager.js` | 渲染三个槽位并处理读取与删除。 |
| `save-write.js` | 处理新游戏选槽及游戏稳定快照的跨页写入。 |
| `main.js` | 游戏页组装入口，处理新游戏、读取、恢复、暂停与 SAN 归零。 |

### 其他目录和根文件

| 文件 | 用途 |
| --- | --- |
| `styles/main.css` | 16:9 容器、场景、HUD、窗口、菜单和动画的全部样式。 |
| `tools/compile-data.mjs` | 读取六份 JSON，校验并覆盖生成编译数据。 |
| `tools/test-runtime.mjs` | 在 Node.js `vm` 沙箱测试状态、技能、条件、存档和部分动作。 |
| `index.html` | 独立主页；其他 HTML 分别承载游戏、存档、结束和占位页面。 |
| `package.json` | 项目信息及 `compile`、`test`、`check` 命令。 |
| `README.md` | 项目总说明和维护手册。 |
| `AGENTS.md` | 仓库协作与提交约束。 |

## 游戏内容维护者手册

### 日常工作流

1. 在 `assets/` 放入素材。
2. 修改对应的 `data/*.json`，不要编辑编译产物。
3. 根据 VS Code Schema 提示修正字段和类型。
4. 运行 `npm run compile`，修正跨文件引用。
5. 通过静态服务器刷新 `index.html`，从“新的游戏”验证内容。
6. 提交前运行 `npm run check`。

### ID 与路径约定

- ID 必须匹配 `^[A-Za-z][A-Za-z0-9_-]*$`。
- 各注册表内不能重名；**物件 ID 在所有场景之间也必须全局唯一**。
- 推荐事件使用 `E_` 前缀，检定使用 `事件语义_序号`，如 `door_insight_001`。
- `checkId` 应匹配 ID 格式、全局唯一且长期稳定；当前 Schema 可提示格式错误，但编译器只检查它非空，不检查格式或重复。
- 素材路径相对于根目录，如 `assets/radio.svg`，不能写本机绝对路径。

一个最小可点击物件由场景物件和同名引用事件组成：

```json
// data/scenes.json 中某个 scene.objects[]
{
  "id": "box_06",
  "name": "木箱",
  "image": "assets/box.png",
  "position": { "x": 18, "y": 54, "width": 20, "height": 24 },
  "zIndex": 12,
  "clickEvent": "E_BOX"
}
```

```json
// data/events.json
{
  "id": "E_BOX",
  "actions": [
    { "type": "dialogue", "speaker": "旁白", "text": "箱子没有上锁。" }
  ]
}
```

注释只用于说明，实际 JSON 文件中不能保留 `//` 注释。`position` 均为相对于游戏区域的百分比：`x/y` 是左上角，`width/height` 是按钮大小。

## 数据接口参考

### `meta.json`

| 字段 | 类型 | 用法 |
| --- | --- | --- |
| `formatVersion` | `2` | 当前数据协议版本，只能为 `2`。 |
| `title` | 非空字符串 | 主界面标题。 |
| `coverImage` | 非空字符串 | 封面路径，建议 16:9。 |
| `startEvent` | 事件 ID | 完成属性分配后自动播放。 |
| `initialScene` | 场景 ID | 启动和重置时载入。 |
| `initialState.sceneId` | 场景 ID | 状态中的初始场景，通常同上。 |
| `initialState.currentEventId` | 字符串或 `null` | 通常为 `null`。 |
| `initialState.flags` | 对象 | 初始旗标。 |
| `initialState.inventory` | 唯一 ID 数组 | 初始物品。 |
| `initialState.objectStates` | 对象 | 以物件 ID 为键的初始状态。 |
| `initialState.checkResults` | 对象 | 初始检定记录，通常为空。 |

属性、技能、技能覆盖状态和属性分配标记由 `GameState` 创建，不写入 `initialState`。

### `scenes.json`

场景必填 `id`、`name`、`background`、`objects`。物件字段：

| 字段 | 必填 | 用法 |
| --- | --- | --- |
| `id` | 是 | 跨场景全局唯一。 |
| `name` | 是 | 鼠标提示和无障碍标签。 |
| `image` | 是 | 贴图路径。 |
| `position` | 是 | `x/y` 为 0–100；`width/height` 大于 0、不超过 100。 |
| `clickEvent` | 是 | 已注册事件 ID。 |
| `zIndex` | 否 | 整数层级，省略时运行时使用 `10`。 |
| `visibleWhen` | 否 | 显示条件；省略则始终显示。 |

### `events.json` 与 13 种动作

事件包含唯一 `id`、`actions` 和可选 `next`。动作顺序执行；没有 `choice`/`check` 提前分支时，最后进入 `next`。

| `type` | 必填字段 | 可选字段 | 行为 |
| --- | --- | --- | --- |
| `dialogue` | `text` | `speaker`, `speed` | 流式显示并等待推进；`speed` 为每字符毫秒数，默认 `28`。 |
| `inspect` | `title`, `text` | `image` | 打开调查窗口并等待关闭。 |
| `choice` | `prompt`, `options` | 每项可有 `when` | 每项含 `label`、`next`；过滤后无选项会报错回滚。 |
| `check` | `checkId`, `attribute`, `success`, `fail` | `modifier`, `label` | 掷 `1..100`；目标为属性加修正后限制到 `1..99`，`roll <= target` 成功。 |
| `changeScene` | `scene` | — | 关闭对话并加载场景。 |
| `setFlag` | `key`, `value` | — | 写入任意 JSON 值；条件会将其转成布尔值。 |
| `modifyAttribute` | `attribute`, `amount` | — | 增减整数、限制边界并重算相关技能。 |
| `setSkill` | `skill`, `value` | — | 设置布尔值，不屏蔽自动重算。 |
| `learnSkill` | `skill` | — | 设为 `true`，永久屏蔽该存档内的自动重算。 |
| `loseSkill` | `skill` | — | 设为 `false`，永久屏蔽该存档内的自动重算。 |
| `addItem` | `item` | — | 加入已注册物品；重复获得不会生成第二份。 |
| `setObjectState` | `object`, `patch` | — | 将 `patch` 浅合并到物件状态。 |
| `custom` | `name` | `params` | 调用白名单动作；未注册名称在运行时报错。 |

完整事件示例：

```json
{
  "id": "E_BOX",
  "actions": [
    { "type": "dialogue", "text": "箱子没有上锁。" },
    { "type": "addItem", "item": "brass_key" },
    { "type": "setObjectState", "object": "box_06", "patch": { "opened": true } }
  ],
  "next": "E_BOX_DONE"
}
```

### 条件

`choice.options[].when` 与 `scene.objects[].visibleWhen` 共用条件接口。一个对象必须且只能有一种分支：

| 条件 | 示例 |
| --- | --- |
| 全部满足 | `{ "all": [条件1, 条件2] }` |
| 任一满足 | `{ "any": [条件1, 条件2] }` |
| 取反 | `{ "not": 条件 }` |
| 旗标 | `{ "flag": "doorOpened", "equals": true }` |
| 持有物品 | `{ "hasItem": "brass_key" }` |
| 属性比较 | `{ "attribute": "insight", "operator": "gte", "value": 70 }` |
| 技能状态 | `{ "skill": "keen_insight", "equals": true }` |
| 物件状态 | `{ "objectState": { "objectId": "box_06", "property": "opened", "equals": true } }` |

比较符为 `eq`、`ne`、`lt`、`lte`、`gt`、`gte`。组合示例：

```json
{
  "all": [
    { "hasItem": "brass_key" },
    {
      "any": [
        { "attribute": "insight", "operator": "gte", "value": 70 },
        { "skill": "keen_insight", "equals": true }
      ]
    }
  ]
}
```

### 物品、属性与技能

`items.json` 每项必须有 `id`、非空 `name`、非空 `image` 和字符串 `description`。当前 HUD 只消费 `name`；`image` 和 `description` 尚未显示。

`attributes.json` 根对象包含非负整数 `totalPoints` 和非空 `attributes`。属性必填 `id/name/initial/min/max`，可选 `description`；数值必须是整数且 `min <= initial <= max`。全部 `max - initial` 的总和必须不小于 `totalPoints`。

`skills.json` 每项必填 `id/name/initial`，可选 `description/autoTrigger`。`autoTrigger` 允许单项属性比较、多个属性求和比较与 `all/any/not`，不能读取旗标、物品、技能或物件状态。求和条件使用 `{ "sum": ["education", "insight"], "operator": "gte", "value": 14 }`。

```json
{
  "id": "keen_insight",
  "name": "敏锐直觉",
  "description": "灵感达到 70 且理智大于 0 时自动生效。",
  "initial": false,
  "autoTrigger": {
    "all": [
      { "attribute": "insight", "operator": "gte", "value": 70 },
      { "attribute": "san", "operator": "gt", "value": 0 }
    ]
  }
}
```

## 游戏框架维护者手册

### 全局与状态 API

脚本通过 `window.TrainGame` 共享模块，以支持静态文件直接运行。

| 接口 | 用法 |
| --- | --- |
| `TrainGame.version` | 当前运行时版本 `0.1.0`。 |
| `deepClone(value)` | JSON 深拷贝；不适用函数、DOM 或循环引用。 |
| `delay(ms)` | 普通延迟；事件演出应改用 `context.wait()`。 |
| `evaluateCondition(condition, state)` | 计算通用条件；未知条件警告并返回 `false`。 |

```javascript
const state = new TrainGame.GameState(
  data.meta.initialState,
  data.attributes,
  data.skills
);
```

| `GameState` 方法 | 行为 |
| --- | --- |
| `reset()` | 从初始配置重置，属性分配标记恢复为 `false`。 |
| `snapshot()` | 返回可序列化状态深拷贝。 |
| `restore(snapshot)` | 严格校验并恢复；属性/技能键必须与注册表完全一致。 |
| `getAttribute(id)` | 读取已注册属性。 |
| `setAttribute(id, value)` | 接受整数，钳制到边界并重算相关技能。 |
| `modifyAttribute(id, amount)` | 增加整数，规则同上。 |
| `completeAttributeAllocation(values)` | 一次性确认全部属性并要求恰好用完点数。 |
| `getSkill(id)` | 读取技能布尔值。 |
| `setSkill(id, value)` | 普通设置，不屏蔽自动触发。 |
| `learnSkill(id)` / `loseSkill(id)` | 强制设置并永久屏蔽该存档内的自动触发。 |
| `reevaluateSkillsFor(attributeId)` | 重算依赖指定属性的技能。 |
| `reevaluateAllAutomaticSkills()` | 重算全部自动技能。 |
| `evaluateAttributeCondition(condition)` | 求值技能属性条件。 |
| `addItem(itemId)` | 去重加入物品；底层方法本身不检查注册表。 |
| `setObjectState(objectId, patch)` | 深拷贝补丁后浅合并物件状态。 |

框架可只读查询 `attributeDefinitions`、`skillDefinitions` 和 `totalAttributePoints`。不要直接改 `state.attributes` 或 `state.skills`，否则会跳过边界和技能重算。

快照包含 `sceneId`、`currentEventId`、`attributes`、`skills`、`skillOverrides`、`attributeAllocationComplete`、`flags`、`inventory`、`objectStates`、`checkResults`。

### 存档 API

```javascript
const saves = new TrainGame.SaveManager(state);
```

| 方法 | 行为 |
| --- | --- |
| `listSlots()` | 返回固定三个槽位的占用、兼容性、保存时间、场景和 SAN 摘要。 |
| `hasSave(slot)` | 判断指定的 `1..3` 槽位是否存在数据。 |
| `save(slot, snapshot = state.snapshot())` | 写入 `{ saveVersion: 2, savedAt, state }`；属性未分配完时拒绝。 |
| `load(slot)` | 空槽返回 `false`；不兼容时抛错；成功恢复并返回 `true`。 |
| `delete(slot)` | 删除指定槽位；非法槽位抛错。 |

默认存储键为 `train-game-save-slot-1` 至 `train-game-save-slot-3`。旧单槽键 `train-game-save-v1` 不迁移也不删除；兼容判断仍以数据内的 `saveVersion: 2` 为准。

### 场景 API

```javascript
const scene = new TrainGame.SceneManager(rootElement, data.scenes, state);
```

| 接口 | 行为 |
| --- | --- |
| `onObjectClick` | 可赋回调 `(eventId, object) => {}`，入口连接到 `engine.play()`。 |
| `load(sceneId)` | 校验、更新 `state.sceneId` 并重绘。 |
| `hasScene(sceneId)` | 判断场景是否注册。 |
| `refresh()` | 重载当前场景以更新显隐。 |
| `setInteractionEnabled(value)` | 更新开关及物件按钮 `disabled`。 |
| `render(scene)` | 重建背景和物件并更新场景名。 |

### 事件 API

```javascript
const engine = new TrainGame.EventEngine({ events, state, scene, ui, items });
```

`new TrainGame.Registry(label)` 是事件系统使用的通用注册表。`register(name, handler)` 注册函数并拒绝重复名称，`get(name)` 返回处理器并在未注册时抛错。通常应通过下面的 `EventEngine` 注册方法使用它，而不是由业务代码另建注册表。

| 接口 | 行为 |
| --- | --- |
| `busy` / `paused` | 是否正运行事件、是否暂停。 |
| `onStateChanged` | 状态回调，入口用它刷新 HUD。 |
| `registerAction(type, handler)` | 注册通用动作；重复名称或非函数会抛错。 |
| `registerCustomAction(name, handler)` | 注册 `custom` 白名单。 |
| `context()` | 创建当前动作上下文。 |
| `getStableSnapshot()` | 返回最近完整事件链状态的深拷贝。 |
| `adoptStableState()` | 将当前状态设为稳定点。 |
| `restoreStableState()` | 恢复稳定点、重载场景并通知状态变化。 |
| `setPaused(value)` | 暂停/恢复 UI、等待和引擎计时器。 |
| `wait(milliseconds, run?)` | 可暂停、取消的计时器。 |
| `cancelToStable()` | 取消运行、关闭待处理 UI 并恢复稳定点。 |
| `play(eventId)` | 忙碌时返回 `false`；成功为 `true`；取消/错误时回滚并返回 `false`。 |

事件链最多连续进入 100 个事件，超过视为可能存在无输入死循环。通用动作处理器签名为 `async (action, context)`；返回 `{ next: "E_TARGET", stop: true }` 可跳转并停止当前事件。

只有频繁复用的基础能力才使用 `registerAction()`。新通用动作还要同步修改 `events.schema.json`、`compile-data.mjs`、测试和本文；单次演出优先用 `custom`。

### 自定义动作上下文

`src/custom-actions.js` 暴露 `TrainGame.registerProjectActions(engine)`，入口会调用它集中注册项目白名单动作：

```javascript
engine.registerCustomAction("shakeWindow", async (params, context) => {
  const duration = Number(params.duration || 500);
  context.ui.toast(`震动 ${duration}ms`);
  await context.wait(duration);
  context.throwIfCancelled();
  context.state.setObjectState("door_06", { shaken: true });
});
```

| 字段 | 用法 |
| --- | --- |
| `state` / `scene` / `ui` / `engine` | 当前四个核心实例。 |
| `items` / `attributes` / `skills` | 只读用途的定义 `Map`。 |
| `wait(milliseconds)` | 随暂停冻结、返回主界面时取消的延迟。 |
| `throwIfCancelled()` | 异步等待后、写状态前确认运行仍有效。 |

不要修改定义 `Map`，不要直接用普通延迟控制事件演出，也不要按 JSON 字符串访问 `window[name]`。

### UI API

`new TrainGame.GameWindow(root, className)` 是窗口基类：`open()` 挂载并返回自身；`close()` 移除；`setContent(content)` 通过 `textContent` 安全写字符串或追加 DOM；`addChild(child)` 追加节点/窗口并返回自身。基类不自动提供遮罩、关闭按钮、焦点或 Promise。

`new TrainGame.TextPlayer(element)` 提供 `play(text, speed)`、`finish()`、`setPaused(value)`、`complete()` 和 `cancel()`，通常只由 UI 内部使用。

`UIManager` 常用接口：

| 接口 | 用法 |
| --- | --- |
| `ui.dialog.showLine(action)` | 显示对话并等待推进。 |
| `handleAdvance()` / `isAwaitingAdvance()` | 补全或结束本句 / 判断能否推进。 |
| `ui.attributeAllocation.choose(definitions, totalPoints)` | 返回属性对象或 `null`。 |
| `ui.choice.choose(prompt, options)` | 返回选项对象或 `null`。 |
| `ui.inspect.show({ title, text, image })` | 显示调查并等待关闭。 |
| `ui.mainMenu/pauseMenu/confirmMenu.choose(config)` | 显示菜单并返回选项值。 |
| `ui.closeDialog()` / `setPaused(value)` | 关闭对话 / 暂停文字。 |
| `ui.cancelPending()` / `closePauseMenus()` | 取消剧情窗口 / 关闭暂停相关菜单。 |
| `ui.toast(message)` | 显示约 1.8 秒提示。 |

菜单配置含 `title`、可选 `coverImage/backdropClass` 和 `options`；选项可含 `label/value/disabled/description`。

### 浏览器调试入口

`window.game` 只用于调试，不是剧情 API：

```javascript
game.state.snapshot()
game.engine.getStableSnapshot()
game.engine.play("E_NOTE")
game.scene.refresh()
game.pauseGame()
game.resumeGame()
game.saves.listSlots()
```

## 复杂维护工作示例

### 示例一：新增车厢和可点击物件

目标：进入 8 号车厢并点击座椅调查。

1. 将 `carriage-08.webp`、`seat-08.webp` 放入 `assets/`。
2. 修改 `data/scenes.json`：新增 `carriage_08`，座椅 `clickEvent` 写 `E_SEAT_08`。
3. 修改 `data/events.json`：新增 `E_ENTER_08`，用 `changeScene` 进入新场景；新增包含 `inspect` 的 `E_SEAT_08`。
4. 把 7 号车厢入口事件连接到 `E_ENTER_08`。
5. 运行 `npm run compile`。场景和事件数量应增加，且没有悬空引用。
6. 刷新游戏，进入 8 号车厢；点击座椅应弹出调查窗口。
7. 运行 `npm run check`。

位置不准时只改 `scenes.json` 的 `position`，重新编译并刷新，不要改 `scene.js`。

### 示例二：新增带条件选项的剧情

目标：持有旧车票且灵感至少 70 才能出示车票。

1. 修改 `data/events.json`，加入选项：

```json
{
  "label": "向检票员出示车票",
  "next": "E_SHOW_TICKET",
  "when": {
    "all": [
      { "hasItem": "old_ticket" },
      { "attribute": "insight", "operator": "gte", "value": 70 }
    ]
  }
}
```

2. 同文件新增 `E_SHOW_TICKET`，运行 `npm run compile`。
3. 分别用不满足和满足条件的状态测试；预期选项先隐藏、后出现。
4. 所有选项都有条件时必须保留合法退路，否则运行时会报无可用选项并回滚。

### 示例三：获得物品并让物件永久消失

1. 放入 `assets/brass-key.png`。
2. 在 `data/items.json` 注册 `brass_key`。
3. 在 `data/scenes.json` 新增物件 `brass_key_06`，设置：

```json
"visibleWhen": {
  "not": {
    "objectState": {
      "objectId": "brass_key_06",
      "property": "taken",
      "equals": true
    }
  }
}
```

4. 在 `data/events.json` 的点击事件中依次加入：

```json
{ "type": "addItem", "item": "brass_key" },
{ "type": "setObjectState", "object": "brass_key_06", "patch": { "taken": true } },
{ "type": "dialogue", "text": "你获得了【黄铜钥匙】。" }
```

5. 运行 `npm run compile` 并测试。预期 HUD 出现钥匙，事件结束后贴图消失，保存读取后仍不出现。

### 示例四：新增属性与自动技能

1. 修改 `data/attributes.json`，新增整数边界完整的 `stamina`。
2. 确认所有属性的可增长容量足以容纳 `totalPoints`。
3. 修改 `data/skills.json`，新增 `strong_body`，其 `autoTrigger` 为 `stamina gte 70`。
4. 运行 `npm run compile` 和 `npm test`。
5. 开新游戏。属性窗口和 HUD 应出现体力；体力达到 70 后，控制台执行 `game.state.getSkill("strong_body")` 应为 `true`。
6. 注册表变化会让既有 v2 存档因键不一致而读取失败；正式升级需按下一例制定迁移策略。

### 示例五：修改存档结构或兼容规则

1. 修改 `src/state.js`：在 `reset()` 初始化，在 `snapshot()` 写出，在 `restore()` 校验并恢复。
2. 若不能安全迁移旧数据，提升 `SAVE_VERSION`；若能迁移，在 `SaveManager.load()` 中显式迁移后再恢复。
3. 若字段来自初始内容，同步修改 `meta.json`、`meta.schema.json` 和 `compile-data.mjs`。
4. 修改 `test-runtime.mjs`，覆盖新存档往返、旧版拒绝或迁移、非法值拒绝。
5. 更新本文版本和快照说明，运行 `npm run check`。
6. 用浏览器准备旧存档再刷新；预期明确迁移成功或提示不兼容，且失败不污染当前状态。

不要仅修改存储键。键决定去哪里找数据，`saveVersion` 才表达结构兼容性。

### 示例六：新增可暂停、可取消的演出

1. 修改 `src/custom-actions.js`，注册 `shakeCarriage`；样式清理放入 `try/finally`，等待用 `context.wait()`，等待后写状态前调用 `throwIfCancelled()`。
2. 修改 `styles/main.css`，添加 `.shake-carriage` 动画并处理暂停状态。
3. 在 `events.json` 调用 `custom`，传入 `{ "duration": 800 }`。
4. 确认 VS Code Schema 没有名称格式错误，再运行 `npm run compile` 和 `npm run check`。
5. 实际触发：动画应运行；暂停时等待冻结；返回主界面后样式被清除，旧演出不再写状态。

编译器只检查名称格式，不确认 JavaScript 已注册，因此必须手动触发。

### 示例七：派生新窗口

1. 修改 `src/ui.js`，从 `GameWindow` 派生 `NoticeWindow`，让 `show(title, text)` 返回关闭时解决的 Promise。
2. 在 `UIManager` 构造函数中只创建一次 `this.notice`。
3. 修改 `styles/main.css`，用 `.notice-window` 添加专属布局。
4. 少量使用时在 `custom-actions.js` 调用 `await context.ui.notice.show(...)`；若成为通用动作，还要修改 `events.schema.json`、`compile-data.mjs` 和 `events.js`。
5. 补充测试，运行 `npm run check`，手动验证打开、关闭、暂停和取消没有残留窗口。

### 示例八：新增通用 `removeItem` 动作

1. 在 `GameState` 添加并测试删除物品方法，明确物品不存在时的行为。
2. 修改 `src/events.js` 的 `registerBuiltIns()` 注册动作。
3. 修改 `schemas/events.schema.json`，定义 `type/item` 和 `additionalProperties: false`。
4. 修改 `tools/compile-data.mjs`：加入动作名并校验物品引用。
5. 修改 `tools/test-runtime.mjs`，覆盖存在、不存在和重复操作。
6. 更新本文动作表，运行 `npm run check`。
7. 在 `events.json` 加真实调用并从 UI 验证。

只用一次的能力应保持为 `custom`，不要扩大通用协议。

## 测试排错与交付

### 编译器覆盖范围

`npm run compile` 会检查 JSON 结构、部分未知字段、ID 格式和唯一性、初始入口、跨文件引用、属性边界与分配容量、技能条件、显示/选项条件以及动作关键类型和值。

它目前**不会**检查素材文件是否存在、`checkId` 是否重复、旗标是否声明、自定义动作是否注册，也不会证明所有分支可达，因此仍需实际游玩。

### 常见问题

| 现象 | 处理 |
| --- | --- |
| 缺少 `compiled-game-data.js` | 运行 `npm run compile`，并确保产物随项目交付。 |
| “引用了不存在的……” | 用 `rg "目标ID" data` 找到引用，统一拼写后重编译。 |
| 修改 JSON 后仍是旧内容 | 重新编译并强制刷新浏览器。 |
| 物件不可见 | 检查路径大小写、坐标、透明度、`visibleWhen`，再执行 `game.scene.refresh()`。 |
| 点击无反应 | 检查 `clickEvent`、控制台错误及 `engine.busy/paused`。 |
| 没有可用选项 | 添加无条件退路或修正状态条件。 |
| 自定义动作未注册 | 对齐 JSON 名称与 `custom-actions.js` 注册名。 |
| 存档不兼容 | 注册表或版本已变化；开始新游戏或实现明确迁移。 |
| 换浏览器或地址后找不到存档 | `localStorage` 按来源隔离；固定浏览器、用户配置、协议、主机和端口。 |
| 保存按钮显示事件结束后可用 | 跨页无法保留事件调用栈；完成当前对话、调查或事件链后再保存。 |

提交前执行：

```powershell
git status --short
npm run check
git diff --check
```

并手动验证新游戏、属性分配、新增入口和分支、暂停/恢复/保存/返回、刷新后读取，以及取消后无残留窗口或动画。

交付时保留整个目录及全部 HTML，尤其不能遗漏 `data/compiled-game-data.js`、`assets/`、`styles/` 和 `src/`。玩家不需要 `node_modules`。压缩前应从干净副本通过同源静态服务器验证完整导航和存档流程。

## 进一步阅读与外部依据

- `docs/架构设计.md`：架构决策和职责边界。
- `docs/API使用说明.md`：精简接口速查。
- `docs/三天计划.md`：最初课程排期记录。
- [MDN：Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)：来源隔离、持久化及 `file:` URL 行为。
- [npm 官方文档：npm run-script](https://docs.npmjs.com/cli/v11/commands/npm-run-script/)：`npm run` 脚本规则。
- [VS Code 官方文档：JSON editing](https://code.visualstudio.com/docs/languages/json)：JSON Schema 关联与编辑支持。
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)：本项目 Schema 声明的规范版本。
