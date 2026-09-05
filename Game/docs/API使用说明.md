# 接口使用与维护手册（API 使用说明）

本文档是数据接口（`data/*.json`）与运行时接口（`window.TrainGame`）的**最详细维护和使用手册**，是"如何正确修改这份游戏内容和框架"的权威参考。

阅读前请先通读总览文档 `Game/README.md`（项目定位、快速开始、运行原理、排错与交付），本文不再重复总览级说明；`Game/docs/README.md` 是 docs 目录索引。历史设计文档（`_Archived/架构设计.md`、`_Archived/三天计划.md`）已归档，行为规则一律以本文档与源码为准。

当前版本对照：运行时 **v0.1.0**，数据格式版本 **2**（`meta.json.formatVersion`），存档版本 **2**（`saveVersion`）。修改本文所述协议时，必须同步更新本文档与 `Game/README.md` 中的版本声明。

按读者分工：

- **游戏内容维护者**（编剧、场景/素材制作、剧本转换）：重点阅读[维护工作流与约定](#维护工作流与约定)和[数据接口参考](#数据接口参考)。
- **游戏框架维护者**（运行时、UI、存档、校验器程序员）：重点阅读[运行时接口参考](#运行时接口参考)和[复杂维护工作示例](#复杂维护工作示例)。

## 目录

- [维护工作流与约定](#维护工作流与约定)
  - [日常维护流程](#日常维护流程)
  - [ID 与路径约定](#id-与路径约定)
  - [最小可点击物件示例](#最小可点击物件示例)
  - [剧本转换 skill（内容维护者）](#剧本转换-skill内容维护者)
  - [变更协议时的联动清单](#变更协议时的联动清单)
- [数据接口参考](#数据接口参考)
  - [meta.json](#metajson)
  - [scenes.json](#scenesjson)
  - [events.json 与内置动作](#eventsjson-与内置动作)
  - [条件表达式](#条件表达式)
  - [items.json](#itemsjson)
  - [attributes.json](#attributesjson)
  - [skills.json](#skillsjson)
  - [编译流程与数据红线](#编译流程与数据红线)
- [运行时接口参考](#运行时接口参考)
  - [通用基础（TrainGame 命名空间）](#通用基础traingame-命名空间)
  - [GameState 与状态快照](#gamestate-与状态快照)
  - [Auth（浏览器本地认证）](#auth浏览器本地认证)
  - [SaveManager（三槽存档）](#savemanager三槽存档)
  - [SceneManager（场景渲染与物件点击）](#scenemanager场景渲染与物件点击)
  - [EventEngine 与 Registry（事件引擎）](#eventengine-与-registry事件引擎)
  - [自定义动作上下文](#自定义动作上下文)
  - [UI：GameWindow / TextPlayer / UIManager](#ui-gamewindow-textplayer-uimanager)
  - [浏览器调试入口](#浏览器调试入口)
- [复杂维护工作示例](#复杂维护工作示例)
- [相关文档](#相关文档)

## 维护工作流与约定

### 日常维护流程

任何内容维护都应遵守同一条工作流，先做内容后校验，不要跳过编译：

1. 在 `assets/` 放入素材（透明背景的 PNG、WebP 或 SVG；背景建议 16:9）。
2. 修改对应的 `data/*.json`，**不要编辑编译产物** `data/compiled-game-data.js`。
3. 根据 VS Code Schema 提示修正字段和类型（六份 JSON 已关联对应 Schema）。
4. 运行 `npm run compile`，修正编译器报告的跨文件引用错误。
5. 通过本地静态服务器登录后刷新 `home.html`，从"新的游戏"验证内容。
6. 提交前运行 `npm run check`（重新编译 + 源码语法检查 + 运行时测试）。

### ID 与路径约定

- ID 必须匹配 `^[A-Za-z][A-Za-z0-9_-]*$`。
- 各注册表内不能重名；**物件 ID 在所有场景之间也必须全局唯一**。
- 推荐事件使用 `E_` 前缀，检定使用 `事件语义_序号`，如 `door_insight_001`。
- `checkId` 应匹配 ID 格式、全局唯一且长期稳定；当前 Schema 可提示格式错误，但编译器只检查它非空，不检查格式或重复。
- 素材路径相对于项目根目录（仓库内为 `Game/`），如 `assets/radio.svg`，不能写本机绝对路径。
- 示例代码中的 `//` 注释只用于说明，实际 JSON 文件中不能保留注释。
- `position` 均为相对于 16:9 游戏区域的百分比：`x/y` 是左上角，`width/height` 是按钮大小；窗口缩放后仍能对齐。

### 最小可点击物件示例

一个最小可点击物件 = 场景物件 + 同名引用事件（`clickEvent` 指向已注册事件 ID）：

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

### 剧本转换 skill（内容维护者）

仓库内置“剧本 → 游戏 JSON”转换 skill：把 Markdown 剧本（如 `Assets/Text/剧本.md`）清洗转换为数据**候选**与**审查清单**。执行规范见 `Game/skills/script-to-game-data/SKILL.md`（入口与唯一事实源，AI 工作流树）与 `Game/skills/script-to-game-data/conversion-rules.md`（规则手册，含命名 §10、白名单 §11、审查清单格式与路径 §13），空白清单模板见 `Game/skills/script-to-game-data/templates/review-checklist-template.md`，手把手使用教程见 `Game/docs/skill-tutorials/script-to-game-data.md`，较早运行留档见 `Game/docs/conversion-reviews/review-checklist-2026-09-04-1849.md`（旧版格式）。要点：

- **输入由使用者指定**（一个或多个文件）；未指定时执行者会停下询问，不默认任何路径。
- **执行节奏为强制三段确认闸门**：①候选阶段只产出候选与审查清单，默认不写 `data/`；②审查清单面向使用者呈现**人话提问 + 素材指定区**（agent 内部细节收在文末执行台账）——使用者逐条勾选答复（同意 / 需要调整 / 本次跳过）、逐行指定素材（沿用 / 新建 / 委托占位补位 / 暂缓并注明影响），agent 校验全部完成后才继续；③落地（landing）前须逐文件确认改动方案，写入白名单 JSON 并真实编译通过后，经使用者终审才提交 git。任何闸门未获明确批准，执行者不得跳过或合并。
- skill 不设计数值、不自行选定既有 `assets/` 素材：技能检定、%修正、对抗、素材坐标等一律记入清单（技术细节在执行台账标注类别），正文生成易懂提问交由人工决策。素材盘点时 agent 会先从仓库根 `Assets/` 源目录按文件名检索现成图片（只看命名；**源目录 `Assets/` 严格只读**），命中则复制到运行目录 `assets/` 并自行改名复用；仅当素材区使用者勾选「委托占位补位」时才允许 agent 生成占位 SVG。两类新增文件均经闸门 2 diff 确认，正式素材到位后替换。
- 审查清单固定存放于 `Game/docs/conversion-reviews/`（文件名 `review-checklist-YYYY-MM-DD-HHmm.md`），时间戳精确到分钟，每次转换新建、不覆盖旧文件（历史留档为旧版格式，当前格式见 skill 空白模板）。

### 变更协议时的联动清单

修改数据协议（字段、动作、条件、存档结构）通常要同步更新以下全部位置，缺一不可：

1. 对应 JSON Schema（`Game/schemas/*.schema.json`），提供编辑器提示。
2. 编译器 `Game/tools/compile-data.mjs`，做跨文件引用与业务校验。
3. 运行时（`Game/src/` 对应模块）与测试 `Game/tools/test-runtime.mjs`。
4. 本文档（字段表、动作表、示例）与 `Game/README.md` 的版本/总览声明。

新增**通用动作**（会被多种剧情频繁复用）还要求：动作表、`events.schema.json`、`compile-data.mjs` 动作名与引用校验、测试、本文档五处同步；单次演出优先用 `custom`，不要扩大通用协议（参见[示例八](#复杂维护工作示例)）。

## 数据接口参考

`data/` 下有六份人工维护的 JSON（`meta.json`、`scenes.json`、`events.json`、`items.json`、`attributes.json`、`skills.json`），经 `npm run compile` 合并校验后生成浏览器数据包 `data/compiled-game-data.js`（`window.GAME_DATA`）。内容维护者只编辑六份源 JSON；编译产物**禁止手改**，但必须随游戏交付。

### meta.json

| 字段 | 类型 | 用法 |
| --- | --- | --- |
| `formatVersion` | `2` | 当前数据协议版本，只能为 `2`。 |
| `title` | 非空字符串 | 主界面标题。 |
| `coverImage` | 非空字符串 | 封面路径，建议 16:9；界面以 `object-fit: cover` 填满游戏区域。 |
| `startEvent` | 事件 ID | 完成属性分配后自动播放。 |
| `initialScene` | 场景 ID | 启动和重置时载入。 |
| `initialState.sceneId` | 场景 ID | 状态中的初始场景，通常同上。 |
| `initialState.currentEventId` | 字符串或 `null` | 通常为 `null`。 |
| `initialState.flags` | 对象 | 初始旗标。 |
| `initialState.inventory` | 唯一 ID 数组 | 初始物品。 |
| `initialState.objectStates` | 对象 | 以物件 ID 为键的初始状态。 |
| `initialState.checkResults` | 对象 | 初始检定记录，通常为空。 |

属性、技能、技能覆盖状态和属性分配标记由 `GameState` 创建，不写入 `initialState`。启动时先显示 `title`/`coverImage` 配置的主界面，玩家开始新游戏并完成属性分配后才自动播放 `startEvent`。

### scenes.json

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

物件只保存视觉信息、显示条件和 `clickEvent`，不内嵌对话或发物品逻辑；点击后的剧情一律放在 `clickEvent` 指向的事件里。隐藏条件示例：

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

切图建议：单独切图保留透明背景；当前点击区域是图片外接矩形，透明像素较多的极不规则物件请把切图边界裁紧。若以后误触严重，再考虑 SVG `clip-path` 或透明像素命中，现阶段不要扩大引擎复杂度。

### events.json 与内置动作

事件是刚性剧情的最小单位，包含唯一 `id`、`actions` 和可选 `next`。动作顺序执行；没有 `choice`/`check` 提前分支时，最后进入 `next`。

| `type` | 必填字段 | 可选字段 | 行为 |
| --- | --- | --- | --- |
| `dialogue` | `text` | `speaker`, `speed` | 流式显示并等待推进；`speed` 为每字符毫秒数，默认 `28`。 |
| `inspect` | `title`, `text` | `image` | 打开调查窗口并等待关闭。 |
| `choice` | `prompt`, `options` | 每项可有 `when` | 每项含 `label`、`next`；过滤后无选项会报错回滚。 |
| `check` | `checkId`, `attribute`, `success`, `fail` | `modifier`, `label` | 掷 1d6；骰点＋属性值＋修正 ≥ 11（引擎固定阈值）即成功，随后跳 `success`/`fail`。 |
| `changeScene` | `scene` | — | 关闭对话并加载场景。 |
| `setFlag` | `key`, `value` | — | 写入任意 JSON 值；条件会将其转成布尔值。 |
| `modifyAttribute` | `attribute`, `amount` | — | 增减整数、限制边界并重算相关技能。 |
| `setSkill` | `skill`, `value` | — | 设置布尔值，不屏蔽自动重算。 |
| `learnSkill` | `skill` | — | 设为 `true`，永久屏蔽该存档内的自动重算。 |
| `loseSkill` | `skill` | — | 设为 `false`，永久屏蔽该存档内的自动重算。 |
| `addItem` | `item` | — | 加入已注册物品；重复获得不会生成第二份。 |
| `setObjectState` | `object`, `patch` | — | 将 `patch` 浅合并到物件状态。 |
| `custom` | `name` | `params` | 调用白名单动作；未注册名称在运行时报错。 |

检定记录按 `checkId` 存于状态 `checkResults`，因此检定必须有全局唯一且稳定的 `checkId`；推荐格式 `事件语义_序号`（如 `door_insight_001`），不要依赖数组位置——编剧插入动作后位置会变。

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

### 条件表达式

`choice.options[].when` 与 `scene.objects[].visibleWhen` 共用同一套条件接口。一个条件对象必须且只能有一种分支（不能同时出现多个顶层键）：

| 条件 | 示例 |
| --- | --- |
| 全部满足 | `{ "all": [条件1, 条件2] }` |
| 任一满足 | `{ "any": [条件1, 条件2] }` |
| 取反 | `{ "not": 条件 }` |
| 旗标 | `{ "flag": "doorOpened", "equals": true }` |
| 持有物品 | `{ "hasItem": "brass_key" }` |
| 属性比较 | `{ "attribute": "insight", "operator": "gte", "value": 7 }` |
| 技能状态 | `{ "skill": "keen_insight", "equals": true }` |
| 物件状态 | `{ "objectState": { "objectId": "box_06", "property": "opened", "equals": true } }` |

比较符为 `eq`、`ne`、`lt`、`lte`、`gt`、`gte`。组合示例：

```json
{
  "all": [
    { "hasItem": "brass_key" },
    {
      "any": [
        { "attribute": "insight", "operator": "gte", "value": 7 },
        { "skill": "keen_insight", "equals": true }
      ]
    }
  ]
}
```

### items.json

`items.json` 每项必须有 `id`、非空 `name`、非空 `image`、字符串 `description` 和 `inspectEvent`。物品进入物品栏后会显示在底部常驻快捷栏中；点击物品会运行 `inspectEvent` 指向的编号事件，该事件必须在 `events.json` 中存在。

```json
{
  "id": "old_ticket",
  "name": "旧车票",
  "image": "assets/note.svg",
  "description": "一张已经褪色的车票。",
  "inspectEvent": "E_ITEM_OLD_TICKET_001"
}
```

### attributes.json

`attributes.json` 根对象包含非负整数 `totalPoints` 和非空 `attributes`。属性必填 `id/name/initial/min/max`，可选 `description`；数值必须是整数且 `min <= initial <= max`。全部 `max - initial` 的总和必须不小于 `totalPoints`。

```json
{
  "totalPoints": 30,
  "attributes": [
    {
      "id": "insight",
      "name": "灵感",
      "description": "观察和理解异常现象的能力。",
      "initial": 3,
      "min": 3,
      "max": 10
    }
  ]
}
```

`totalPoints` 是新游戏时必须全部分配完毕的额外点数：属性分配先写入临时草稿，用完全部点数并确认后才写入状态、计算自动技能并播放 `startEvent`。

### skills.json

`skills.json` 每项必填 `id/name/initial`，可选 `description/autoTrigger`。没有 `autoTrigger` 的技能只受手动动作影响；有条件时，条件为真即自动设为 `true`，否则设为 `false`。`autoTrigger` 允许单项属性比较、多个属性求和比较与 `all/any/not`，**不能**读取旗标、物品、技能或物件状态。求和条件使用 `{ "sum": ["education", "insight"], "operator": "gte", "value": 14 }`，表示两属性之和至少为 14。

```json
{
  "id": "keen_insight",
  "name": "敏锐直觉",
  "description": "灵感不低于 7 且理智大于 0 时自动生效。",
  "initial": false,
  "autoTrigger": {
    "all": [
      { "attribute": "insight", "operator": "gte", "value": 7 },
      { "attribute": "san", "operator": "gt", "value": 0 }
    ]
  }
}
```

### 编译流程与数据红线

- 修改任何 `data/*.json` 后必须运行 `npm run compile`，否则改动不会进入数据包；浏览器端修改后需强制刷新。
- 注册表变化会让既有 v2 存档因键不一致而读取失败（参见[示例五](#复杂维护工作示例)的迁移策略）。
- 编译器的检查范围、常见报错排错与提交前检查清单见 `Game/README.md` 的「测试排错与交付」，本文不重复。

## 运行时接口参考

运行时各模块脚本通过 `window.TrainGame` 共享模块，以支持静态文件直接运行；页面按职责在 `<script>` 中按依赖顺序加载共享数据与各模块（加载与组装顺序见 `Game/src/main.js` 等入口）。模块的文件归属见 `Game/README.md`「项目文件结构」的 `src/` 表；本节按**类/接口**给出契约。

### 通用基础（TrainGame 命名空间）

| 接口 | 用法 |
| --- | --- |
| `TrainGame.version` | 当前运行时版本 `0.1.0`。 |
| `deepClone(value)` | JSON 深拷贝；不适用函数、DOM 或循环引用。 |
| `delay(ms)` | 普通延迟；事件演出应改用 `context.wait()`。 |
| `evaluateCondition(condition, state)` | 计算通用条件；未知条件警告并返回 `false`。 |

### GameState 与状态快照

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

框架代码可只读查询 `state.attributeDefinitions`、`state.skillDefinitions` 和 `state.totalAttributePoints`。**不要直接改 `state.attributes` 或 `state.skills`**，否则会跳过边界钳制和技能重算；属性接口只接受整数并把结果限制在注册的 `min` 与 `max` 之间。

快照包含 `sceneId`、`currentEventId`、`attributes`、`skills`、`skillOverrides`、`attributeAllocationComplete`、`flags`、`inventory`、`objectStates`、`checkResults`。可序列化快照示例（存档与调试入口所见状态的结构）：

```json
{
  "sceneId": "carriage_06",
  "currentEventId": "E_NOTE",
  "attributes": { "insight": 7, "san": 8 },
  "skills": { "keen_insight": false },
  "skillOverrides": {},
  "attributeAllocationComplete": true,
  "flags": { "gameStarted": true },
  "inventory": ["old_ticket"],
  "objectStates": { "note_06": { "hidden": true } },
  "checkResults": {}
}
```

### Auth（浏览器本地认证）

`TrainGame.Auth` 为静态课程项目提供浏览器本地认证。用户名去除首尾空格后须为 3–20 个字符并区分大小写，密码至少 6 个字符且不会裁剪空格。

| 方法 | 行为 |
| --- | --- |
| `register(username, password)` | 以用户名为键保存明文密码；返回 `{ ok, message, username }`，拒绝完全同名账号。 |
| `login(username, password)` | 严格比较用户名和密码，成功后在当前标签页建立会话。 |
| `currentUser()` | 返回有效会话的用户名；账号不存在或存储不可用时返回 `null`。 |
| `logout()` | 清除当前标签页的登录态和注册预填信息，不删除账号或游戏存档。 |
| `requireAuth()` | 验证登录态，未登录时替换导航到 `index.html`。 |
| `redirectAuthenticated()` | 已登录时替换导航到 `home.html`。 |

账号键前缀为 `train-game-auth-user-v1:`，用户名会先经过 `encodeURIComponent`；会话键为 `train-game-auth-session-v1`。账号保存在 `localStorage`，关闭标签页后仍存在；登录态保存在 `sessionStorage`，关闭标签页后需要重新登录。每个账号拥有独立的三个游戏存档槽。该机制仅作课程演示，明文密码不替代服务端鉴权，请勿使用真实密码。

### SaveManager（三槽存档）

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

默认存储键为 `train-game-save-user-v1:<编码后的用户名>:slot-1` 至 `slot-3`。创建默认存档管理器时必须已有有效登录会话。旧共享槽 `train-game-save-slot-1` 至 `slot-3` 与旧单槽键 `train-game-save-v1` 均不迁移也不删除；兼容判断仍以数据内的 `saveVersion: 2` 为准。**不要仅修改存储键**——键决定去哪里找数据，`saveVersion` 才表达结构兼容性。

### SceneManager（场景渲染与物件点击）

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

### EventEngine 与 Registry（事件引擎）

```javascript
const engine = new TrainGame.EventEngine({ events, state, scene, ui, items });
```

`new TrainGame.Registry(label)` 是事件系统使用的通用注册表：`register(name, handler)` 注册函数并拒绝重复名称，`get(name)` 返回处理器并在未注册时抛错。通常应通过下面的 `EventEngine` 注册方法使用它，而不是由业务代码另建注册表。

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

规则与语义：

- 事件链最多连续进入 100 个事件，超过视为可能存在无输入死循环。
- 通用动作处理器签名为 `async (action, context)`；返回 `{ next: "E_TARGET", stop: true }` 可跳转并停止当前事件。
- **稳定状态**：`EventEngine` 只在完整事件链成功结束后更新稳定快照；事件执行中不保存，保存与返回主界面都以稳定快照为准，不保留半个事件的调用栈。读取存档或重置状态后，应调用 `adoptStableState()` 建立新的稳定点。
- 只有频繁复用的基础能力才使用 `registerAction()`；单次演出优先用 `custom`（见下节），并同步[变更联动清单](#变更协议时的联动清单)。

### 自定义动作上下文

`Game/src/custom-actions.js` 暴露 `TrainGame.registerProjectActions(engine)`，游戏页入口会调用它集中注册项目白名单动作：

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

规则与安全边界：

- 通过状态接口修改属性/技能：`context.state.getAttribute/setAttribute/modifyAttribute/getSkill/setSkill/learnSkill/loseSkill`；不要直接写 `state.attributes` 或 `state.skills`。
- 不要修改定义 `Map`；不要用普通延迟（`setTimeout`/普通 Promise）控制事件演出，等待一律用 `context.wait()`；异步等待后、继续修改状态前必须调用 `context.throwIfCancelled()`，避免已返回主界面的旧演出继续写状态。
- 不要让 JSON 传入 JavaScript 源码，也不要按字符串访问 `window[name]` 或使用 `eval`。自定义动作的注册位置就是安全边界和组员协作清单：JSON 里写 `{ "type": "custom", "name": "shakeWindow", "params": { ... } }`，名称必须与 `registerCustomAction` 的注册名完全一致（编译器只检查名称格式，不确认 JS 已注册，因此必须实际触发验证）。

### UI：GameWindow / TextPlayer / UIManager

`new TrainGame.GameWindow(root, className)` 是窗口基类，负责窗口元素的基础生命周期与内容装载：

| 方法 | 作用 |
| --- | --- |
| `open()` | 将窗口挂载到 `root`；已挂载时不会重复添加，返回自身。 |
| `close()` | 从页面移除窗口元素。 |
| `setContent(content)` | 清空旧内容并写入字符串或 DOM 节点；字符串使用 `textContent` 安全写入。 |
| `addChild(child)` | 追加 DOM 节点或另一个 `GameWindow` 的元素，返回自身。 |

基类**不会**自动创建模态遮罩、关闭按钮、焦点或 Promise；何时弹窗、如何关闭由派生类决定。需要新窗口类型时应从基类派生，并在 `UIManager` 构造函数中只创建一个实例。下面的完整示例派生一个"提示窗"，`show(title, text)` 返回玩家点击"关闭"后解决的 Promise，适合由事件动作等待：

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

派生窗口使用传入的自定义类名（如 `notice-window`）添加专属布局，保留 `.game-window` 的公共外观与交互规则。常驻对话、选项和调查窗口可分别参考 `DialogWindow`、`ChoiceWindow` 与 `InspectWindow` 的现有实现。

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

> 以下示例演示如何把上面的接口组合起来完成一类常见维护任务，格式沿用"目标 → 步骤 → 验收"。

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

目标：持有旧车票且灵感至少 7 才能出示车票。

1. 修改 `data/events.json`，加入选项：

```json
{
  "label": "向检票员出示车票",
  "next": "E_SHOW_TICKET",
  "when": {
    "all": [
      { "hasItem": "old_ticket" },
      { "attribute": "insight", "operator": "gte", "value": 7 }
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
3. 修改 `data/skills.json`，新增 `strong_body`，其 `autoTrigger` 为 `stamina gte 7`。
4. 运行 `npm run compile` 和 `npm test`。
5. 开新游戏。属性窗口和 HUD 应出现体力；体力达到 7 后，控制台执行 `game.state.getSkill("strong_body")` 应为 `true`。
6. 注册表变化会让既有 v2 存档因键不一致而读取失败；正式升级需按下一例制定迁移策略。

### 示例五：修改存档结构或兼容规则

1. 修改 `src/state.js`：在 `reset()` 初始化，在 `snapshot()` 写出，在 `restore()` 校验并恢复。
2. 若不能安全迁移旧数据，提升 `SAVE_VERSION`；若能迁移，在 `SaveManager.load()` 中显式迁移后再恢复。
3. 若字段来自初始内容，同步修改 `meta.json`、`meta.schema.json` 和 `compile-data.mjs`。
4. 修改 `test-runtime.mjs`，覆盖新存档往返、旧版拒绝或迁移、非法值拒绝。
5. 更新本文档快照与版本说明（含 `Game/README.md` 的版本声明），运行 `npm run check`。
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

1. 按[UI：GameWindow / TextPlayer / UIManager](#uigamewindow--textplayer--uimanager)的完整示例从 `GameWindow` 派生 `NoticeWindow`，让 `show(title, text)` 返回关闭时解决的 Promise；派生样式用自定义类名，保留 `.game-window` 公共规则。
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

## 相关文档

- `Game/README.md`：全局总览、快速开始、运行原理、排错与交付。
- `Game/docs/README.md`：docs 目录索引与归档说明。
- `Game/skills/script-to-game-data/`（`SKILL.md`、`conversion-rules.md`、`templates/`）：剧本转换 skill 的规则（SKILL.md 为入口与唯一事实源）与空白审查清单模板。
- `Game/docs/skill-tutorials/script-to-game-data.md`：剧本转换 skill 手把手教程。
- `Game/docs/conversion-reviews/`：各次转换的审查清单（`review-checklist-<时间戳>.md`）。
- `Game/docs/_Archived/`：已归档历史文档（`架构设计.md`、`三天计划.md`），不再随功能更新。
