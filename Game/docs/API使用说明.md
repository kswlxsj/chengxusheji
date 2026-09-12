# 接口使用与维护手册（API 使用说明）

本文档是数据接口（`data/*.json`）与运行时接口（`window.TrainGame`）的**最详细维护和使用手册**，是"如何正确修改这份游戏内容和框架"的权威参考。

阅读前请先通读总览文档 `Game/README.md`（项目定位、快速开始、运行原理、排错与交付），本文不再重复总览级说明；`Game/docs/README.md` 是 docs 目录索引。历史设计文档（`_Archived/架构设计.md`、`_Archived/三天计划.md`）已归档，行为规则一律以本文档与源码为准。

当前版本对照：运行时 **v0.2.0**，数据格式版本 **3**（`meta.json.formatVersion`），存档版本 **3**（`saveVersion`）。修改本文所述协议时，必须同步更新本文档与 `Game/README.md` 中的版本声明。

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
  - [ConfirmDialog（存档页页面内确认框）](#confirmdialog存档页页面内确认框)
  - [SceneManager（场景渲染与物件点击）](#scenemanager场景渲染与物件点击)
  - [EventEngine 与 Registry（事件引擎）](#eventengine-与-registry事件引擎)
  - [自定义动作上下文](#自定义动作上下文)
  - [小游戏：TrainGame.Minigames 注册表与 minigame 动作](#小游戏traingame-minigames-注册表与-minigame-动作)
  - [UI：GameWindow / TextPlayer / UIManager](#ui-gamewindow-textplayer-uimanager)
  - [浏览器调试入口](#浏览器调试入口)
- [复杂维护工作示例](#复杂维护工作示例)
- [相关文档](#相关文档)

## 维护工作流与约定

### 日常维护流程

任何内容维护都应遵守同一条工作流，先做内容后校验，不要跳过编译：

1. 在 `assets/` 放入素材（透明背景的 PNG、WebP 或 SVG；场景背景按“正方形画布、内容居中排版”制作，运行时按 16:9 舞台居中裁切显示，见下文 scenes.json 一节的素材约定）。
2. 修改对应的 `data/*.json`，**不要编辑编译产物** `data/compiled-game-data.js`。
3. 根据 VS Code Schema 提示修正字段和类型（六份 JSON 已关联对应 Schema）。
4. 运行 `npm run compile`，修正编译器报告的跨文件引用错误。
5. 通过本地静态服务器登录后刷新 `home.html`，从"新的游戏"验证内容。
6. 提交前运行 `npm run check`（重新编译 + 源码语法检查 + 运行时测试）。

### ID 与路径约定

- ID 必须匹配 `^[A-Za-z][A-Za-z0-9_-]*$`。
- 各注册表内不能重名；**物件 ID 在所有场景之间也必须全局唯一**。
- 车厢门物件的 ID 与左右位置遵循 scenes.json 一节的「车厢门布局约定」：命名为 `door_<本车厢>_to_<目标>`，左侧门＝后退（车厢号增大）、右侧门＝前进（车厢号减小或 `front`）。
- 事件 id 推荐使用 `E_` 前缀：剧本事件沿用其编号（`E_005`，派生片段加后缀，见剧本转换 skill 命名约定）；非剧本的系统/演示事件使用保留段 `E_9NN`（如 `E_901`，不与剧本编号冲突）。
- 检定（骰子）编号建议 `ev<事件编号原样，保留零填充>_<语义>_<序号>`（如 `ev005_insight_01`）；该编号对应 `src/dice.js` 中**唯一**一条检定规则，须匹配 ID 格式、全局唯一且长期稳定。Schema 校验格式；编译器通过 vm 加载 `src/dice.js` 校验事件引用确实已注册。
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

仓库内置“剧本 → 游戏 JSON”转换 skill：把 Markdown 剧本（如 `Assets/Text/剧本.md`）清洗转换为数据**候选**与**审查清单**。执行规范见 `Game/skills/script-to-game-data/SKILL.md`（入口与唯一事实源，AI 工作流树）与 `Game/skills/script-to-game-data/conversion-rules.md`（规则手册，含命名 §10、白名单 §11、审查清单格式与路径 §13），空白清单模板见 `Game/skills/script-to-game-data/templates/review-checklist-template.md`，手把手使用教程见 `Game/docs/skill-tutorials/script-to-game-data.md`，较早运行留档见 `Game/docs/conversion-reviews/review-checklist-2026-09-05-1454.md`（E-005~E-008 批，旧版格式）。要点：

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
| `formatVersion` | `3` | 当前数据协议版本，只能为 `3`。 |
| `title` | 非空字符串 | 主界面标题。 |
| `coverImage` | 非空字符串 | 封面路径，建议 16:9；界面以 `object-fit: cover` 填满游戏区域。 |
| `startEvent` | 事件 ID | 完成属性分配后自动播放。 |
| `initialScene` | 场景 ID | 启动和重置时载入。 |
| `initialState.sceneId` | 场景 ID | 状态中的初始场景，通常同上。 |
| `initialState.currentEventId` | 字符串或 `null` | 通常为 `null`。 |
| `initialState.flags` | 对象 | 初始旗标。 |
| `initialState.inventory` | 唯一 ID 数组 | 初始物品。 |
| `initialState.objectStates` | 对象 | 以物件 ID 为键的初始状态。 |
| `initialState.checkResults` | 对象 | 初始检定记录（以 dice 编号为键），通常为空。 |

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
| `fullCanvas` | 否 | `true` 表示**整幅画布贴图**：图片是与场景背景同尺寸画布的透明底整幅素材（透明边内含位置信息），渲染时与背景共用同一张画布→屏幕映射整幅叠放，等同把该图层贴回背景图；此时 `position` 必须固定为 `{x:0,y:0,width:100,height:100}`，点击与悬停由运行时按贴图不透明像素判定（透明区域不可点、不高亮）。省略或 `false` 即普通贴图模式。 |

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

切图建议：普通物件请把切图边界裁紧（透明背景、内容占满画布），点击区域是内容外接矩形，透明像素多的极不规则物件容易误触。**整幅画布贴图**（`fullCanvas: true`）不需要裁边——素材按“背景图层蒙版”制作：在背景同尺寸画布上把物件画到最终位置后整幅导出，四周透明边即位置信息；运行时把整幅图与背景同映射叠放（等同 PS/赛璐璐图层），透明边不响应点击与悬停。要求贴图画布宽高比与场景背景一致（本项目背景为正方形画布、内容居中排版）；物件若另在物品栏当图标用，请为 `items.json` 单独准备一张裁紧的小图标（整幅蒙版在物品栏小格子中会几乎不可见）。

**车厢门布局约定**（本项目是固定编组的列车，每节车厢两端各有一扇门，左右分工必须全车统一）：

- **命名**：`door_<本车厢>_to_<目标>`；`<目标>` 是相邻车厢号（`02`–`08`）或 `front`（先头车厢）。例：`door_06_to_05` 是 6 号车厢通往 5 号车厢的门。
- **右侧＝前进**：`x: 89` 的门通往**朝先头车厢**的方向，目标车厢号**减小**（2 号车厢通往先头车厢用 `door_02_to_front`）。
- **左侧＝后退**：`x: 0` 的门通往反方向，目标车厢号**增大**。
- **几何统一**：门热点固定 `y: 21`、`width: 12`、`height: 63`，左门 `x: 0`、右门 `x: 89`；两端保持一致，玩家来回穿行时才有稳定的位置感。
- **唯一例外**：`door_07_to_08` 对应的 8 号车厢门在剧情中已消失（只存在一片漆黑），它的 `clickEvent`（`E_008`）只播放调查、不切换场景。
- **自检**：新增车厢或改动门接线后，逐门核对「左侧→车厢号更大 / 右侧→车厢号更小或 `front`」，再运行 `npm run compile`。

### events.json 与内置动作

事件是刚性剧情的最小单位，包含唯一 `id`、`actions` 和可选 `next`。动作顺序执行；没有 `choice`/`check` 提前分支时，最后进入 `next`。

| `type` | 必填字段 | 可选字段 | 行为 |
| --- | --- | --- | --- |
| `dialogue` | `text` | `speaker`, `speed` | 流式显示并等待推进；`speed` 为每字符毫秒数，默认 `28`。 |
| `inspect` | `title`、`text`，或 `item` | `image` | 打开调查窗口并等待关闭。给出 `item`（已注册物品 ID）时，引擎自动取该物品的名称/说明/图片作默认内容，`title`/`text`/`image` 均可省略；否则必须直接提供 `title` 与 `text`。 |
| `choice` | `prompt`, `options` | 每项可有 `when` | 每项含 `label`、`next`；过滤后无选项会报错回滚。 |
| `check` | `dice` | `outcomes` | 委托 `src/dice.js` 注册的检定函数执行（函数只返回结果下标）；有 `outcomes` 时跳 `outcomes[下标]`，省略/为空 = 纯副作用、事件继续。 |
| `changeScene` | `scene` | — | 关闭对话并加载场景。 |
| `setFlag` | `key`, `value` | — | 写入任意 JSON 值；条件会将其转成布尔值。 |
| `conditionalJump` | `when`, `next` | — | 条件成立时立即结束当前事件并进入 `next`，不成立则继续执行本事件后续动作（常用于按旗标/物品选择剧情变体，替代把分支拆成一整棵事件树）。 |
| `modifyAttribute` | `attribute`, `amount` | — | 增减整数、限制边界并重算相关技能。 |
| `setSkill` | `skill`, `value` | — | 设置布尔值，不屏蔽自动重算。 |
| `learnSkill` | `skill` | — | 设为 `true`，永久屏蔽该存档内的自动重算。 |
| `loseSkill` | `skill` | — | 设为 `false`，永久屏蔽该存档内的自动重算。 |
| `addItem` | `item` | — | 加入已注册物品；重复获得不会生成第二份。 |
| `setObjectState` | `object`, `patch` | — | 将 `patch` 浅合并到物件状态。 |
| `custom` | `name` | `params` | 调用白名单动作；未注册名称在运行时报错。 |
| `minigame` | `game` | — | 运行 `game` 对应的小游戏模块（只写 `TrainGame.Minigames` 注册表索引，仿 `check`→`dice.js` 的分离架构，不做分支事件假设）；模块结束时可返回一个动作列表，解释器按当前事件内普通动作的语义顺序执行，未返回或返回空则无事发生、事件继续。 |

检定记录按 `dice` 编号存于状态 `checkResults`。每个 `dice` 编号对应 `src/dice.js` 里唯一一条可编程检定规则，且必须全局唯一、长期稳定（规则或剧情修改不能改编号，旧记录才可追溯）。引擎每次执行检定后自动合并写入最小记录 `{ dice, outcome }`：`outcomes` 非空时 `outcome` 为函数返回的下标，为空时为 `null`；检定函数可在返回前先写入补充字段，引擎合并保留。`outcomes` 里的分支事件不要依赖数组位置之外的信息——编剧插入动作后位置会变。

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
  "inspectEvent": "E_903"
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
- 注册表变化（新增/删除属性或技能等）会让旧存档因键不一致而读取失败，需要在[示例五](#复杂维护工作示例)的迁移策略下处理。
- 编译器的检查范围、常见报错排错与提交前检查清单见 `Game/README.md` 的「测试排错与交付」，本文不重复。

## 运行时接口参考

运行时各模块脚本通过 `window.TrainGame` 共享模块，以支持静态文件直接运行；页面按职责在 `<script>` 中按依赖顺序加载共享数据与各模块（加载与组装顺序见 `Game/src/main.js` 等入口）。模块的文件归属见 `Game/README.md`「项目文件结构」的 `src/` 表；本节按**类/接口**给出契约。

### 通用基础（TrainGame 命名空间）

| 接口 | 用法 |
| --- | --- |
| `TrainGame.version` | 当前运行时版本 `0.2.0`。 |
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
  "currentEventId": "E_902",
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

`TrainGame.Auth` 为静态课程项目提供浏览器本地认证。用户名和密码均须非空但不限制长度；用户名会去除首尾空格并区分大小写，密码不会裁剪空格。

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
| `save(slot, snapshot = state.snapshot())` | 写入 `{ saveVersion: 3, savedAt, state }`；属性未分配完时拒绝。 |
| `load(slot)` | 空槽返回 `false`；不兼容时抛错；成功恢复并返回 `true`。 |
| `delete(slot)` | 删除指定槽位；非法槽位抛错。 |

默认存储键为 `train-game-save-user-v1:<编码后的用户名>:slot-1` 至 `slot-3`。创建默认存档管理器时必须已有有效登录会话。旧共享槽 `train-game-save-slot-1` 至 `slot-3` 与旧单槽键 `train-game-save-v1` 均不迁移也不删除；兼容判断仍以数据内的 `saveVersion: 3` 为准。**不要仅修改存储键**——键决定去哪里找数据，`saveVersion` 才表达结构兼容性。

`SaveManager` 本身不做任何交互确认：覆盖已占用槽位与删除存档的二次确认属于页面职责，由存档页在调用前经 `TrainGame.ConfirmDialog` 询问（见下一节）。

### ConfirmDialog（存档页页面内确认框）

存档页（`save-write.html` / `save-manager.html`）用它代替浏览器原生 `window.confirm`，外观与游戏本体的暂停 / 确认菜单一致。它只负责"询问并返回玩家的选择"，不读游戏数据、不接管页面导航，因此不属于 `UIManager`，也不会把对话窗口、小游戏宿主等游戏内窗口带进存档页。

```javascript
const confirmed = await TrainGame.ConfirmDialog.ask({
  title: `槽位 ${slot} 已有存档。属性分配确认后将覆盖它，是否继续？`,
  confirmLabel: "继续覆盖"
});
if (!confirmed) return;
```

| 接口 | 行为 |
| --- | --- |
| `ask({ title, confirmLabel, cancelLabel, backdropClass, windowClass })` | 显示确认框并返回 `Promise<boolean>`：确认 `true`；取消、按 Esc 或点击遮罩 `false`。`confirmLabel` / `cancelLabel` 默认"确定"/"取消"；`cancelLabel` 传空串则只显示一个确认按钮（纯提示型窗口）；`backdropClass` / `windowClass` 可覆盖默认类名。 |
| `close(value = false)` | 主动关闭并结算等待中的 Promise（默认按取消处理）；未打开时为无操作。 |
| `isOpen()` | 是否正在显示确认框。 |

行为约定：

- 挂载点为页面预置的 `#confirm-layer`（缺失时回退 `document.body`）；`main.css` 中 `#confirm-layer` 负责定位与层级，实际点击拦截由 `.confirm-backdrop` 完成。面板复用 `.game-window`、`.menu-content`、`.menu-actions` 的既有外观（与 `MenuWindow` 同构），只为标题字号与面板宽度补少量规则。
- 打开时焦点落在确认按钮，关闭后焦点还原到触发元素；键盘可用 Esc 取消。
- 同一实例重复 `ask()` 会先以 `false` 结算上一次，避免连点堆叠多层遮罩。
- 单实例：`TrainGame.ConfirmDialog` 暴露的就是共享实例，两个存档页各自加载同一个脚本即可。

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

`fullCanvas: true` 的物件由 SceneManager 拆成两层：整幅叠放（与背景同映射、不拦截指针）的视觉层，和贴在**不透明内容包围盒**上的透明命中按钮；鼠标点击与悬停高亮只在贴图不透明像素上生效（透明边不触发事件、不高亮、不显示手型光标），键盘 Tab 聚焦 + Enter/Space 激活不受像素限制（聚焦高亮仍显示）。事件 busy/暂停期间的禁用行为与普通物件一致，由 `setInteractionEnabled` 统一控制。

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
  context.state.setObjectState("door_06_to_07", { shaken: true });
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

### 检定：dice.js 注册表与 check 动作

`Game/src/dice.js` 暴露 `TrainGame.Dice`（Registry），游戏内所有检定按编号注册为**独立可编程函数**；JSON 的 `check` 动作只传编号与结果事件列表，规则细节全部由函数负责：

```javascript
// dice.js 内新增/修改检定的形态；编号必须全局唯一、长期稳定
registerDice("my_custom_roll_01", async (context, outcomes) => {
  const score = context.state.getAttribute("insight") + 1 + Math.floor(Math.random() * 6);
  context.ui.toast(`检定骰点：${score}`);
  return score >= 11 ? 0 : 1; // 对应 outcomes[0] / outcomes[1]
});
```

| 约定 | 说明 |
| --- | --- |
| 签名 | `async (context, outcomes) => 非负整数下标` |
| context | 与[自定义动作上下文](#自定义动作上下文)一致（`state`/`scene`/`ui`/`engine`/`items`/`attributes`/`skills`/`wait`/`throwIfCancelled`） |
| 返回值 | 引擎校验 `0 <= 下标 < outcomes.length` 后跳 `outcomes[下标]`；越界或非整数报错并回滚本事件链；`outcomes` 省略/为空时返回值被忽略（纯副作用，事件继续） |
| 记录 | 引擎每次执行后自动合并写入 `state.checkResults[dice] = { dice, outcome }`（无分支时 `outcome: null`）；函数可先写补充字段（如 `checkResults[dice] = { 成功: true }`）供排查/复用 |
| 规则内状态 | 一律经 `context.state` 接口修改（含扣损）；等待用 `context.wait()`、写状态前用 `context.throwIfCancelled()`，与自定义动作同一套安全边界 |

建议：需要重复使用的低层能力（标准 1d6 属性检定、SAN 扣损掷骰等）做成 dice.js 内部的工厂函数，具体检定条目一行引用，保持条目独立可读。新增检定 = 改 `src/dice.js`（追加条目）+ 在 `events.json` 引用其编号与 `outcomes`；编译器通过 node:vm 加载 `src/dice.js` 校验引用与注册唯一性，运行时对未注册编号同样报错回滚。

### 小游戏：TrainGame.Minigames 注册表与 minigame 动作

`Game/src/minigames.js` 暴露 `TrainGame.Minigames`：`register(id, spec)`（拒绝重复）、`get(id)` / `has(id)` / `list()`。events.json 的 `minigame` 动作只写注册表索引——仿 `check`→`dice.js` 的“JSON 只写编号、机制全在 JS”分离架构，但**不做分支事件假设**：模块结束时可自由选择返回或不返回一个**结算动作列表**，解释器按当前事件内普通动作的语义顺序执行该列表；没有分支时小游戏动作本身不跳转。

```json
{ "type": "minigame", "game": "webgl3d_demo" }
```

`spec` 契约：

| 字段 | 说明 |
| --- | --- |
| `title` | 宿主窗口标题栏文案。 |
| `run(context)` | 把玩法画面挂进 `context.stage` 并开始运行；小游戏自然结束时 resolve，返回值可为结算动作列表（数组）或 `undefined`。 |

`run` 收到的 `context` 在[动作上下文](#自定义动作上下文)基础上追加：

| 字段 | 说明 |
| --- | --- |
| `stage` | 宿主窗口内容区 DOM 元素（`ui.minigame` 的 `.minigame-stage`）；自动化测试等无 DOM 环境为 `null`，模块应跳过画面直接返回。 |
| `onQuit(provider)` | 注册“退出小游戏”按钮的结算提供者（`() => 结算动作列表 | undefined`，可返回 Promise）；未注册时点退出视为放弃、无结算。 |
| `registerCleanup(fn)` | 登记收尾函数（取消 rAF、移除监听、释放 GL 上下文等），宿主关闭后由引擎统一执行一次。 |

语义与安全边界：

- **结算动作列表与普通动作同语义**：由引擎逐个执行，同样经过暂停等待、取消/终止检查（SAN 归零仍会触发终止流程）、`onStateChanged` 与稳定快照回滚；列表内动作支持 `{ next, stop }` 跳转分支。项目内置的 `jump` 结算动作可直接跳转到指定事件（例如 `{ type: "jump", next: "E_029" }`）。列表上限 **100 条**，且不允许再包含 `minigame` 动作（宿主为单实例）。
- 过程状态一律经 `context.state` 接口读写；异步等待用 `context.wait()`、等待后写状态前调用 `throwIfCancelled()`（与自定义动作同一套安全边界）。**推荐写法规约**：玩法过程不改游戏状态（内部计时/尝试次数等留在模块闭包），结果一律以结算动作列表表达，可被引擎整体回滚与存档稳定点保护。
- 宿主窗口为 `ui.minigame`（`MinigameWindow`）：模态居中、接近占满 16:9 舞台、四边留白，打开时游戏本体画面变暗；小游戏进行中系统暂停与 Esc 被屏蔽（`pauseButton.disabled` 与键位守卫都检查 `ui.minigame.isOpen()`），标题栏“退出小游戏”按钮保证玩家随时可离开。
- 编译器通过 node:vm 加载 `src/minigames.js` 与全部 `src/minigame-games/*.js` 收集注册编号，校验 `minigame` 动作的 `game` 引用；**模块文件必须顶层只做注册、运行期再触碰 DOM**，否则编译期加载会失败。
- 取消/报错路径：`UIManager.cancelPending()` 会关闭小游戏宿主（`ui.minigame.close()`），等待中的引擎竞态随即解除，状态回滚到稳定点，不会留下残留窗口。

接入一个小游戏的完整步骤见[示例九：接入一个小游戏](#示例九接入一个小游戏)。

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
| `ui.cancelPending()` / `closePauseMenus()` | 取消剧情窗口（含小游戏宿主）/ 关闭暂停相关菜单。 |
| `ui.minigame.openAndStage(title)` / `isOpen()` / `close()` | 打开小游戏宿主并返回内容区 / 判断宿主是否打开（用于屏蔽暂停）/ 关闭宿主并释放运行句柄。宿主即 `MinigameWindow`：模态居中、游戏画面变暗、标题栏含“退出小游戏”，契约见小游戏一节。 |
| `ui.toast(message)` | 显示约 1.8 秒提示。 |

菜单配置含 `title`、可选 `coverImage/backdropClass` 和 `options`；选项可含 `label/value/disabled/description`。

### 浏览器调试入口

`window.game` 只用于调试，不是剧情 API：

```javascript
game.state.snapshot()
game.engine.getStableSnapshot()
game.engine.play("E_902")
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

新车厢若位于列车中段，记得同时补上两端门并按 scenes.json 一节的「车厢门布局约定」摆位：左门通往车厢号更大的相邻车厢，右门通往车厢号更小的相邻车厢（通往头车用 `front`）；再在 `events.json` 为两端门各加一条带 `changeScene` 的开门事件。

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
6. 注册表变化（如新增属性或技能）会让旧存档因键不一致而读取失败；正式升级需按下一例制定迁移策略。

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

### 示例九：接入一个小游戏

目标：新增一个小游戏 `clock_puzzle`（齿轮对位），在某个事件里作为动作触发，成功后发旗标与奖励对话，失败（退出）时事件继续。

1. **注册模块**：在 `src/minigame-games/clock-puzzle.js` 顶层调用 `Game.Minigames.register("clock_puzzle", { title: "...", run })`。文件顶层只做注册；`run(context)` 内再建 DOM/画布。`src/minigames.js` 与模块文件都必须在 `main.js` 之前加载（在 `game.html` 加 `<script>`）。
2. **编写玩法**：在 `run` 里把界面挂进 `context.stage`；自然结束（玩家完成/超时等）时 resolve 结算动作列表，例如：
   ```javascript
   function run(context) {
     if (!context.stage) return Promise.resolve(null); // 无 DOM 测试环境直接跳过
     let resolveFinish;
     const finished = new Promise((resolve) => { resolveFinish = resolve; });
     // ...绘制与交互...
     const onComplete = () => resolveFinish([
       { type: "setFlag", key: "clock_puzzle_done", value: true },
       { type: "dialogue", text: "齿轮咔哒一声咬合复位。" }
     ]);
     // 退出按钮：返回放弃结算（可省，缺省即放弃、无结算）
     context.onQuit(() => [{ type: "dialogue", text: "你放下了齿轮。" }]);
     // 收尾：取消 rAF/监听、释放资源
     context.registerCleanup(() => { cancelAnimationFrame(handle); });
     return finished;
   }
   ```
3. **接线**：在 `data/events.json` 需要的动作位置写 `{ "type": "minigame", "game": "clock_puzzle" }`；需要按结果分流时，由模块在结算列表里用 `choice`/`check` 表达，或在结算里写旗标后由后续 `choice` 条件分流。
4. **编译校验**：运行 `npm run compile`，确认事件数量正确且没有“小游戏动作引用了未注册的编号”报错（编译器通过 node:vm 加载注册表与模块收集编号）。
5. **测试与文档**：按 `tools/test-runtime.mjs` 的小游戏段落补充回归（结算执行、无结算继续、未注册报错、非法结算回滚），运行 `npm run check`；按本节开头“变更协议时的联动清单”检查是否需同步文档/README。

> 仓库自带的 `webgl3d_demo`（`src/minigame-games/webgl3d-demo.js`）是原生 WebGL 3D 技术演示：它同时验证“事件动作 → 宿主窗口内自绘独立可交互画面 → 3D canvas → 完成/退出两条结算路径 → 结算动作列表被执行”。演示触发物 `mg3d_demo_spot_06` 默认不可见（`visibleWhen` 检查旗标 `mg3d_demo_visible`），验收时进入游戏后在控制台执行 `game.state.flags.mg3d_demo_visible = true; game.scene.refresh();` 再点击该装置。该物件与事件 `E_MG3D_DEMO`、素材 `assets/mg3d-demo-spot.svg` 构成独立演示块，正式剧情不需要时可整体删除。

## 相关文档

- `Game/README.md`：全局总览、快速开始、运行原理、排错与交付。
- `Game/docs/README.md`：docs 目录索引与归档说明。
- `Game/skills/script-to-game-data/`（`SKILL.md`、`conversion-rules.md`、`templates/`）：剧本转换 skill 的规则（SKILL.md 为入口与唯一事实源）与空白审查清单模板。
- `Game/docs/skill-tutorials/script-to-game-data.md`：剧本转换 skill 手把手教程。
- `Game/docs/conversion-reviews/`：各次转换的审查清单（`review-checklist-<时间戳>.md`）。
- `Game/docs/_Archived/`：已归档历史文档（`架构设计.md`、`三天计划.md`），不再随功能更新。
