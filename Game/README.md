# 常暗之厢网页游戏框架

一个面向短周期课程项目的轻量、事件驱动型剧情网页游戏框架。项目使用原生 HTML、CSS 和 JavaScript，不依赖前端框架，也没有玩家侧构建步骤；内容维护者编辑 JSON，编译器负责校验引用并生成浏览器可直接加载的数据包。

本文是全局总览：先建立“游戏是什么、怎么运行、目录在哪、出了问题怎么排错”的整体认识。两类协作者的**详细接口维护手册**统一放在 `docs/API使用说明.md`，本文只保留角色入口导读，不与细分文档重复。

- **游戏内容维护者**：编剧、场景/素材制作与剧本数据转换人员。从[协作者入口](#协作者入口)开始，详细规则见[接口手册：数据接口参考](docs/API使用说明.md#数据接口参考)。
- **游戏框架维护者**：负责运行时、UI、存档、校验器和通用能力的程序员。先读[运行原理](#运行原理)与[协作者入口](#协作者入口)，接口契约见[接口手册：运行时接口参考](docs/API使用说明.md#运行时接口参考)。

## 目录

- [项目定位](#项目定位)
- [当前开发进度](#当前开发进度)
- [快速开始](#快速开始)
- [运行原理](#运行原理)
- [项目文件结构](#项目文件结构)
- [协作者入口](#协作者入口)
- [测试排错与交付](#测试排错与交付)
- [进一步阅读与外部依据](#进一步阅读与外部依据)

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
7. 事件执行期间锁定场景物件的点击与高亮；只有普通对话允许点击文本框外的场景区域推进。
8. 事件执行中不能跨页保存或先返回主界面再继续剧情：保存与返回都以稳定快照为准，执行到一半的演出不会写入存档。

## 当前开发进度

当前运行时版本为 **v0.2.0**，数据格式版本为 **3**，存档版本为 **3**。

### 已完成

- 可配置标题和 16:9 封面的主界面。
- 新游戏属性点分配；必须用完全部点数。
- 单场景背景和按百分比定位的可点击贴图。
- 流式对话、自动播放、快进和跳过本句。
- 调查窗口、条件选项和基于 `src/dice.js` 编号的可编程检定（每个检定独立注册规则，返回结果下标按 `outcomes` 列表跳转；标准属性检定仍为 1d6＋属性 ≥ 11）。
- 场景、旗标、属性、技能、物品和物件状态修改。
- 技能按属性自动触发，以及手动永久覆盖自动触发。
- 可暂停、可取消的自定义异步演出。
- 以小游戏注册表（`TrainGame.Minigames`，仿 dice.js 的“JSON 只写编号”分离架构）接入“事件内小游戏”：事件用 `{ "type": "minigame", "game": "<编号>" }` 触发，小游戏模块结束时可返回**结算动作列表**，由事件引擎按当前事件普通动作的语义顺序执行；宿主窗口 `MinigameWindow`（模态居中近满屏、游戏画面变暗、标题栏含“退出小游戏”）内可自绘任意 DOM/canvas/WebGL 画面，小游戏进行中游戏本体冻结、系统暂停与 Esc 被屏蔽。
- 原生 WebGL 3D 技术演示小游戏 `webgl3d_demo`（`src/minigame-games/`，零第三方库），验证“触发→独立 3D 画面交互→完成/退出两条结算路径→结算动作列表执行”全链路；演示触发物 `mg3d_demo_spot_06` 默认隐藏（验收与删除方法见 `docs/API使用说明.md` 示例九）。
- 终局控制杆争夺小游戏 `conductor_tug`（`src/minigame-games/conductor-tug.js`）：进入先头车厢的 `E_026` 时触发，使用仿星露谷钓鱼的垂直抓握区让玩家与列车员争夺控制权，成功/失败分别接入 `E_029` / `E_030`。
- 独立登录、注册、标题主页、游戏、存档管理/写入、结束及占位信息页。
- 浏览器本地账号注册、严格键值对登录、标签页会话和受保护页面守卫。
- 浏览器本地三个存档槽位，支持读取、覆盖和删除。
- 稳定状态存档：事件中保存的是该事件开始前最近的完整状态。
- SAN 归零后立即终止事件并进入结束页。
- 游戏内全部位图（场景背景、物件、物品栏图标、插图、封面）默认最近邻插值（`image-rendering: pixelated`），放大呈像素游戏的硬边感。
- 场景物件支持 `fullCanvas` **整幅画布贴图**：素材按“背景图层蒙版”整幅导出（与背景同画布尺寸、透明边含位置信息），运行时与背景同映射叠放（等同把图层贴回背景）；点击与悬停按不透明像素判定，透明区域不触发事件、不悬停高亮。
- 底部常驻物品快捷栏：渲染持有物品的图标与名称（含数字快捷键），点击物品运行其 `inspectEvent` 做调查/使用；手机与手电筒的调查事件经项目 `useLight` 自定义动作提供“照亮”选择。
- 六份内容 JSON 的 VS Code Schema、编译期交叉引用校验和运行时测试。
- 无前端依赖、通过同源静态服务器交付。

当前剧情主线已全部接线并通过编译校验（数据规模见下文「快速开始」的检查结果）。开局路径示例：

```text
新游戏 → 属性分配 → E_001 开场（2013 年 1 号线末班电车醒来，含灵感检定）
  → 6 号车厢：门上便签 / 便签背面 / 车厢地图（整幅蒙版）/ 车门（灵感检定分支）
  → 7 号车厢：尸体 / 车厢深处
  → 5 号车厢（报纸线索）→ 4 号车厢（乘务员）→ 3 号车厢（黑包钥匙）
  → 2 号车厢（Clicker）→ 先头车厢（驾驶室操作台，结局分支）
```

车厢两端门的布局全车统一：**右侧门＝前进（朝先头车厢，车厢号减小）**，**左侧门＝后退（车厢号增大）**；字段级约定与自检方法见[接口手册](docs/API使用说明.md)的 `scenes.json` 一节。

逐车厢完整通关与各结局的到达仍需要在浏览器里实测；分支是否可达以实际游玩为准。

**里世界支线（E-501~E-525）**：3 号车厢通往 2 号车厢的门现在通向里世界第一幕（剧本《里世界剧本》的第 1 幕），主线在门后的推进改由里世界承接。**里世界只能进一次**：第一次推门进入里世界，之后再推同一扇门则由 `E_DOOR_03` 直接进入 2 号车厢（原「查看2号车厢」的敏捷检定 `E_024` 由此成为重复推门时的回退路径），不会第二次进入里世界。

**交互方式与主分支一致**：前进 / 回头 / 深处等**位移一律点击车厢门热点**触发（与主线各车厢门同一套左右布局约定），窗外、玻璃瓶等可交互物用 **StillLife 整幅蒙版贴图**（`fullCanvas: true`，按不透明像素命中 + 悬停高亮）。**例外一：花海·车门外不设门热点，去留由 `E_510` 的选择菜单决定**（`继续深入` / `调头`）；**例外二：里世界的三扇"回头"左门是隐形命中区**——不叠任何贴图（`invisible: true`，热点就是背景美术上那扇已画好的车门，没有具体物件）、悬停也不减亮放大（`noHighlight: true`），鼠标移上去仍是手型。各场景的热点：

| 场景 | 热点 → 事件 |
| --- | --- |
| `carriage_inner_01` 空车厢 | 右门 → `E_503`（前进）；左门（隐形区）→ `E_502_RETURN`（回头） |
| `carriage_inner_02` 花草车厢 | 窗外 → `E_504` 侦察；彩色玻璃瓶 → `E_503_PICK`；左门（隐形区）→ `E_503_BACK`（回头路由）；右门 → `E_505`（前进） |
| `carriage_fake_04` 伪4号车厢 | 左门（隐形区）→ `E_509_BACK`（回头路由）；右门 → `E_510`（深入花海）；两个互斥车窗（花海版/白茫茫版）→ `E_516` |
| `flower_sea` 花海·车门外 | **无热点**（去留由 `E_510` 选择菜单决定） |
| `flower_sea_inside` 花海·室内 | 无热点（结局播完即止） |

里世界内部的走法：

```text
E_501 进入里世界（空车厢）→ E_502 空车厢（点右门前进／点左门试图回头）
  → E_503 花草车厢（点瓶拾取、点窗外侦察、点右门前进、点左门回头）
  → E_505 → E_506 伪4号车厢（按乘务员存活状态分 E_507 疯狂低语 / E_508 回应）
  → E_509 岔路点（点右门 → E_510 花海；点车窗 → E_516 乘务员插话）
      · 花海 E_510 的选择：继续深入 → E_511 结局「迷失」；调头 → 见下「调头回程」
      · 车窗 E_516 → 按是否侦察过窗外分 E_517 花海独白 / E_518 白茫茫独白 → E_519 钥匙
        → E_519（持有驾驶室钥匙才有交钥匙的选择）→ E_520 选择：继续深入 → 回花海 E_510（循环）；
          原路返回 → 回花草车厢（E_521 鬼打墙 → E_522）
调头回程（全由点击驱动）：E_513 → 走过鬼打墙停在花草车厢（E_522）→ 点左门 → E_523 磨损车门 → E_524 → 主线 E_025
E_525（仅在随机回头线上可达，本批未接）
```

其中 `E_503_BACK` / `E_509_BACK` 是里世界的两扇**左门路由事件**：同一扇左门在"正向探索"与"反向行走（已在花海调过头）"两种状态下指向不同去处，由旗标 `ev_inner_backtrack` 区分——`E_513` 的「调头」把它置为 `true`，`E_524` 离开里世界时清掉。**回程完全由点击驱动**：调头后依次点「伪4左门 → 花草车厢左门」即可一路走回 2 号车厢（`E_522` 鬼打墙 → `E_523` 磨损车门 → `E_524`），中途在花草车厢会停下来，玩家可以捡最后一次瓶子再走。`E_514` 是伪4车厢左门在正向探索时的过渡（回花草车厢）。

**Trauma 结局（`E_515`）的触发条件**：达成真结局（`E_029` 拉杆前进）但**去过花海**（`ev510_flower_sea` 为真）。`E_029` 开头按该旗标改跳 `E_515`，未涉足花海的正常真结局不受影响。

未接线的部分：`E_502` 与 `E_503` 的**随机分岔**（10/60/30、50/50）因框架暂无"按权重随机分岔"能力，本批只落地了剧本中紧跟其后的可走线路，其余出口待框架支持后接入；`E_507` 的 SAN 损失数值剧本尚未定稿；`E-511`（迷失）与 `E_515`（Trauma，文本与旗标已接入）两个新结局类型尚未注册进结束页；`E-525` 触发后的"6 号车厢永久变红"因缺素材暂缓。详见 `docs/conversion-reviews/review-checklist-2026-09-12-1203.md` 的执行台账。

> [!NOTE]
> 里世界的门热点沿用主线门的百分比坐标（左 `x: 0` / 右 `x: 89`，`y: 21`、`12% × 63%`），而里世界背景是 16:9 宽幅素材，**门与背景上实际车门的位置尚未对齐**，需要美术确认或按背景实际门位微调 `position`。

### 尚未实现

- 云存档和服务器同步。
- 独立的物品栏/背包窗口与通用的“主动使用”面板：当前物品显示在 HUD 底部常驻快捷栏（图标＋名称），点击物品运行其 `inspectEvent` 完成调查/使用；没有独立的物品详情窗口，也没有对所有物品统一可用的主动使用入口。
- 通用 NPC 注册系统。
- 完整场景物件的透明像素级命中：仅 `fullCanvas` 整幅画布贴图物件支持不透明像素命中；普通矩形物件（裁紧贴图）仍是图片外接矩形。
- 恢复到事件中间某句文本的协程式存档。
- 任意表达式求值器、可视化编辑器和完整 Markdown 剧本转换器。
- 完整浏览器端自动化测试；现有测试聚焦状态、技能、条件、存档和部分动作。

## 快速开始

### 玩家或验收人员

保留完整目录，通过固定地址的本地静态服务器打开 `index.html`。首次进入时先注册本地账号，再使用相同的用户名和密码登录。进入标题主页后可以开始游戏；点击对话框或场景空白处推进普通对话，按 `Esc` 或点击“暂停”打开菜单。

第一次运行或遇到启动问题时，请阅读独立的[游戏启动说明](启动说明.md)。

例如在 `Game` 目录启动 Python 自带的静态服务器：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

然后始终通过 `http://127.0.0.1:8000/` 访问；更换协议、主机或端口会进入另一份浏览器存储空间。

> [!NOTE]
> 本地账号和正式存档使用同源 `localStorage`，登录状态与跨页临时数据使用 `sessionStorage`。浏览器对 `file:` 地址下存储的行为没有统一保证，因此直接双击只可用于查看静态页面，不属于受支持的游戏运行方式。

> [!WARNING]
> 当前登录功能只用于纯前端课程演示，密码以明文保存在浏览器中，页面守卫也不能替代服务端鉴权。请勿使用任何真实密码。

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
编译完成：12 个场景，154 个事件，7 个物品，8 个属性，6 个技能，6 个小游戏。
运行时测试通过：本地认证、属性分配、技能触发、条件读取、三槽存档、终止状态与小游戏结算。
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
登录 / 注册 / 主页 / 存档页 / GameState + SceneManager + UIManager + EventEngine
    ▼
本地认证、浏览器场景、事件、跨页交接和三槽 localStorage 存档
```

一次物件点击的处理过程：

1. `SceneManager` 根据 `scenes.json` 渲染满足条件的物件。
2. 点击后，`scene.onObjectClick` 收到物件的 `clickEvent`。
3. `EventEngine.play(eventId)` 锁定场景交互并依次解释动作。
4. 动作调用 UI 或 `GameState`，状态变化后刷新 HUD。
5. 完整事件链成功结束后更新稳定快照并开放场景交互。
6. 动作报错或事件取消时回滚到旧稳定快照。

### 模块职责与边界

各模块按职责严格分工，“不负责”列同样重要——正是这些边界让 JSON 剧情无法绕过校验执行任意代码：

| 模块 | 职责 | 不负责 |
| --- | --- | --- |
| `GameState` | 属性边界、技能自动触发与屏蔽、旗标、物品、物件状态、检定结果；快照与严格恢复 | DOM 与剧情跳转 |
| `SceneManager` | 单场景背景、贴图物件、点击入口与显示条件 | 物件点击后的剧情逻辑 |
| `EventEngine` | 顺序解释事件动作、处理分支与取消、维护稳定快照；内置 `check` 动作委托 `TrainGame.Dice` 并校验返回下标 | 检定规则本身 |
| `dice.js`（`TrainGame.Dice`） | 按编号注册全部检定函数：可读取属性/技能/状态/UI，自定义掷骰与扣损，只返回结果下标 | 保存剧情状态与事件跳转 |
| UI（`GameWindow`、`TextPlayer`、各窗口与 `UIManager`） | 窗口生命周期、文本播放、选择/调查/菜单等交互 | 保存剧情状态 |
| `SaveManager` | 当前账号三个槽位的读取、写入、摘要与删除 | 判断事件状态是否稳定 |
| `Auth` / `AuthGuard` | 本地账号键值对、当前标签页登录态、页面守卫与后退缓存恢复 | 提供真实安全认证 |
| `PageFlow` | 页面路径、入口参数与 `sessionStorage` 跨页交接 | 持久化正式存档 |
| 数据编译器 | 静态校验六份 JSON（含检定编号与结果分支引用，dice 清单由 vm 加载 `src/dice.js` 读取）并生成 `data/compiled-game-data.js` | 运行游戏 |

各模块全部类与方法的契约见 `docs/API使用说明.md` 的[运行时接口参考](docs/API使用说明.md#运行时接口参考)。

## 项目文件结构

以下列出当前所有项目目录及受版本控制文件。新增或调整职责后应同步更新本节。

```text
Game/
├─ .vscode/
│  └─ settings.json
├─ assets/
│  ├─ audio/
│  │  ├─ bgm.mp3
│  │  └─ op.mp3
│  ├─ miniGame/
│  │  └─ 交涉背景.png
│  ├─ op/
│  │  ├─ op-1.png
│  │  ├─ op-2.png
│  │  ├─ op-3.png
│  │  ├─ op-4.png
│  │  └─ op-5.png
│  ├─ ui/
│  │  ├─ card-battle/
│  │  │  ├─ attack.png
│  │  │  ├─ background.png
│  │  │  ├─ card-base.png
│  │  │  ├─ defend.png
│  │  │  ├─ enemy.png
│  │  │  ├─ heal.png
│  │  │  ├─ hp-bar.png
│  │  │  └─ ultimate.png
│  │  ├─ beibao.png
│  │  ├─ dice_00.png
│  │  ├─ dice_01.png
│  │  ├─ dice_02.png
│  │  ├─ dice_03.png
│  │  ├─ dice_04.png
│  │  ├─ dice_05.png
│  │  ├─ dice_06.png
│  │  ├─ hp-bar.png
│  │  └─ initial-menu-marker.png
│  ├─ video/
│  │  ├─ end.mp4
│  │  └─ start.mp4
│  ├─ bag-05-a.png
│  ├─ bag-05-b.png
│  ├─ black-bag-03.png
│  ├─ bottle-inner.png
│  ├─ carriage-02.png
│  ├─ carriage-03.png
│  ├─ carriage-04.png
│  ├─ carriage-05.png
│  ├─ carriage-06-note-removed.png
│  ├─ carriage-06.png
│  ├─ carriage-07.png
│  ├─ carriage-fake-04.png
│  ├─ carriage-inner-01.png
│  ├─ carriage-inner-02.png
│  ├─ clicker-02.png
│  ├─ control-lever.png
│  ├─ corpse-07.png
│  ├─ corpse-07.svg
│  ├─ cover-placeholder.svg
│  ├─ crew-04.png
│  ├─ crew-portrait.png
│  ├─ deep-07.svg
│  ├─ door.svg
│  ├─ flashlight.png
│  ├─ flower-sea-inside.png
│  ├─ flower-sea.png
│  ├─ front-carriage.png
│  ├─ inner-02-bottle.png
│  ├─ inner-02-window.png
│  ├─ inner-03-flower-window.png
│  ├─ inner-03-fog-window.png
│  ├─ label-back.png
│  ├─ label-front.png
│  ├─ map-06.png
│  ├─ map-failure.png
│  ├─ map-success.png
│  ├─ mg3d-demo-spot.svg
│  ├─ newspaper-05.png
│  ├─ newspaper-icon.png
│  ├─ note-06.png
│  ├─ note.png
│  ├─ note.svg
│  ├─ pc-portrait.png
│  ├─ phone.png
│  ├─ placeholder-key.svg
│  ├─ radio-07.png
│  ├─ radio.svg
│  ├─ trash-05-a.png
│  └─ trash-05-b.png
├─ data/
│  ├─ attributes.json
│  ├─ compiled-game-data.js
│  ├─ events.json
│  ├─ items.json
│  ├─ meta.json
│  ├─ scenes.json
│  └─ skills.json
├─ docs/
│  ├─ README.md
│  ├─ API使用说明.md
│  ├─ skill-tutorials/
│  │  └─ script-to-game-data.md
│  ├─ conversion-reviews/
│  │  └─ review-checklist-2026-09-05-1454.md
│  └─ _Archived/
│     ├─ 架构设计.md
│     └─ 三天计划.md
├─ GroupIntro/
│  ├─ back-button.css
│  ├─ back-button.js
│  ├─ background.png
│  ├─ cr/
│  │  ├─ images/
│  │  │  └─ avatar.jpg
│  │  ├─ index.html
│  │  └─ style.css
│  ├─ czh/
│  │  ├─ avatar.jpg
│  │  └─ index.html
│  ├─ dxh/
│  │  ├─ assets/
│  │  │  ├─ 1_1.png
│  │  │  ├─ 20260427_fin.png
│  │  │  ├─ 20260615.png
│  │  │  ├─ 20260717.png
│  │  │  ├─ 20260722.png
│  │  │  ├─ bottom.png
│  │  │  ├─ profile.png
│  │  │  ├─ README.md
│  │  │  ├─ screen2_1.png
│  │  │  ├─ screen2_2.png
│  │  │  └─ screen2_3.png
│  │  ├─ build-markdown.cmd
│  │  ├─ content/
│  │  │  ├─ about.md
│  │  │  └─ directions/
│  │  │     ├─ interests.md
│  │  │     ├─ projects.md
│  │  │     └─ technology.md
│  │  ├─ index.html
│  │  ├─ script.js
│  │  ├─ styles.css
│  │  ├─ tools/
│  │  │  └─ embed-markdown.ps1
│  │  └─ vendor/
│  │     └─ marked/
│  │        ├─ LICENSE
│  │        ├─ marked.umd.js
│  │        └─ README.md
│  ├─ index.html
│  ├─ lty/
│  │  ├─ demo.html
│  │  ├─ picture/
│  │  │  └─ 2.gif
│  │  └─ video/
│  │     └─ Timeline 1.mov
│  ├─ xyx/
│  │  ├─ index.html
│  │  └─ yue.gif
│  └─ zxy/
│     ├─ image/
│     │  ├─ p1.png
│     │  └─ p2.png
│     └─ index.html
├─ schemas/
│  ├─ attributes.schema.json
│  ├─ events.schema.json
│  ├─ game-data.schema.json
│  ├─ items.schema.json
│  ├─ meta.schema.json
│  ├─ scenes.schema.json
│  └─ skills.schema.json
├─ skills/
│  └─ script-to-game-data/
│     ├─ SKILL.md
│     ├─ conversion-rules.md
│     ├─ samples/
│     │  ├─ sample-input.md
│     │  ├─ sample-notes.md
│     │  └─ sample-output.json
│     └─ templates/
│        └─ review-checklist-template.md
├─ src/
│  ├─ auth-guard.js
│  ├─ auth.js
│  ├─ confirm-dialog.js
│  ├─ custom-actions.js
│  ├─ dice.js
│  ├─ events.js
│  ├─ home.js
│  ├─ login.js
│  ├─ main.js
│  ├─ minigame-games/
│  │  └─ webgl3d-demo.js
│  ├─ minigames.js
│  ├─ namespace.js
│  ├─ page-flow.js
│  ├─ register.js
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
├─ ending.html
├─ game.html
├─ home.html
├─ index.html
├─ package.json
├─ register.html
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

目录按用途分层：`ui/`（控件贴图）、`op/`（开场动画分镜）、`video/`、`audio/`、`miniGame/`；其余车厢背景、物件贴图与物品图标平铺在根下。

| 文件 | 用途 |
| --- | --- |
| `carriage-02/03/04/05/06/07.png`、`front-carriage.png` | 各车厢成品背景（与仓库根 `Assets/Image/Scene/Background/` 源文件一致，2848×1600 画布、内容居中排版，运行时按 16:9 舞台居中裁切显示）。 |
| `carriage-06-note-removed.png` | 6 号车厢"便签已取走"的背景变体。 |
| `carriage-inner-01.png`、`carriage-inner-02.png`、`carriage-fake-04.png`、`flower-sea.png`、`flower-sea-inside.png` | **里世界（E-501~E-525）**背景：空车厢、花草车厢、伪4号车厢、花海·车门外、花海·室内。注意 `assets/` 名与源目录名**不同名**，对照关系为 `inner_01_empty.png` → `carriage-inner-01.png`、`inner_02.png` → `carriage-fake-04.png`、`inner_03_flower.png` → `carriage-inner-02.png`、`花海.png` → `flower-sea.png`、`室内.png` → `flower-sea-inside.png`。这批源图为 16:9 宽幅（非正方形），与既有车厢美术的出图规格不同，物件对齐若要精确需美术统一画布。 |
| `inner-02-window.png` | 花草车厢的"窗外"调查点贴图（整幅蒙版，复制自 `Assets/Image/Scene/StillLife/inner_02_window.png`；`fullCanvas: true`，`clickEvent → E_504`）。 |
| `inner-02-bottle.png` | 花草车厢的"彩色玻璃瓶"拾取点贴图（整幅蒙版，复制自 `StillLife/inner_02_bottle.png`；`fullCanvas: true`，`clickEvent → E_503_PICK`，拾取后按旗标隐藏）。 |
| `inner-03-flower-window.png`、`inner-03-fog-window.png` | 伪4号车厢车窗的两个互斥版本（整幅蒙版，复制自 `StillLife/inner_03_flower_window.png` / `inner_03_fog_window.png`；按"是否已侦察窗外"二选一显示，均 `clickEvent → E_516`）。**待确认**：`inner-03-fog-window.png` 与源目录 `Scene/Background/inner_03_fog.png`（一张白茫茫的**背景**，2843×1600）逐字节相同，疑为接入时选错源文件。 |
| `bottle-inner.png` | 瓶子道具图标（复制自 `Assets/Image/Item/玻璃瓶.png`），里世界与主剧本 2 号车厢的瓶子共用此图标。 |
| `black-bag-03.png`、`clicker-02.png`、`control-lever.png`、`crew-04.png`、`map-06.png`、`bag-05-a.png`、`bag-05-b.png`、`trash-05-a.png`、`trash-05-b.png`、`newspaper-05.png`、`note-06.png`、`radio-07.png`、`corpse-07.png` | 美工按“背景图层蒙版”整幅导出的物件贴图（`fullCanvas: true`，与背景同画布尺寸、透明边含位置信息），运行时整幅叠放并只在不透明像素上响应点击/悬停。 |
| `newspaper-icon.png` | 报纸物品栏图标（由 `newspaper-05.png` 内容裁紧的小图）。 |
| `label-front.png`、`label-back.png`、`map-success.png`、`map-failure.png` | 便签正反面与地图检定成功/失败插图。 |
| `phone.png` | 手机物件/物品栏图标。 |
| `corpse-07.svg`、`deep-07.svg` | 7 号车厢尸体与深处占位贴图。 |
| `door.svg` | 各车厢门共用的透明物件贴图。 |
| `flashlight.png` | 手电筒物品图标（由 `Assets/Image/Item/手电筒.png` 等比缩放至 384×384 后入库）。 |
| `note.svg` | 便签贴图，同时暂作旧车票图片。 |
| `radio.svg` | 收音机贴图，同时用于调查窗口插图。 |
| `cover-placeholder.svg` | `meta.coverImage` 使用的主界面占位封面。 |
| `mg3d-demo-spot.svg` | 小游戏演示触发物占位图标（`mg3d_demo_spot_06` 物件使用，即 `webgl3d_demo` 小游戏的演示入口；默认由旗标隐藏）。 |
| `placeholder-key.svg` | 钥匙的占位贴图。 |
| `crew-portrait.png`、`pc-portrait.png` | 交涉小游戏（`crew-negotiation`）的乘务员与玩家立绘。 |
| `ui/dice_00.png`、`ui/dice_01.png` ~ `ui/dice_06.png` | 检定骰子贴图：`dice_00` 为滚动中的过渡帧，`dice_01`~`dice_06` 对应投出的 1~6 点（`src/ui.js` 按点数拼名读取）。 |
| `ui/hp-bar.png`、`ui/beibao.png`、`ui/initial-menu-marker.png` | HUD 血条底图、背包框与初始界面进度标记（`styles/main.css` 引用）。 |
| `ui/card-battle/` | 卡牌战斗小游戏的背景、卡底、四类卡面、敌人头像与血条槽。 |
| `miniGame/交涉背景.png` | 交涉小游戏背景（该文件名含中文，是 `assets/` 下唯一的非 ASCII 路径）。 |
| `op/op-1.png` ~ `op/op-5.png` | 开场动画分镜（`src/home-op.js` 顺序播放）。 |
| `video/start.mp4`、`video/end.mp4` | 主页开场视频与结局视频。 |
| `audio/bgm.mp3`、`audio/op.mp3` | 背景音乐与开场音乐。 |

背景采用正方形画布、内容居中排版（16:9 舞台会裁去上下边）；普通物件使用边界裁紧的透明 PNG、WebP 或 SVG，整幅蒙版素材见上表并配合 `fullCanvas: true` 使用。文件名宜用小写英文、数字和连字符，路径大小写必须一致。物品图标基准边长 384px（`note.png` 200px、`newspaper-icon.png` 30px 为历史遗留的小图）。

> 新增素材前的自检：仓库根 `Assets/` 是美术源目录（**只读**，最新版都在那里），`Game/assets/` 是运行目录。源图入库需复制并改为 ASCII 语义化文件名，且必须在 `data/*.json` 里有对应引用，否则会成为无人引用的死素材。审计方法：把全仓 `assets/...` 字符串引用与 `Game/assets/` 实际文件做集合差。

### `data/`

| 文件 | 手动编辑 | 用途 |
| --- | --- | --- |
| `meta.json` | 是 | 标题、封面、入口和初始状态。 |
| `scenes.json` | 是 | 场景背景、物件位置、点击入口和显示条件。 |
| `events.json` | 是 | 剧情事件、动作、选择和检定分支。 |
| `items.json` | 是 | 物品注册表；配置名称、图标、说明和点击调查事件。 |
| `attributes.json` | 是 | 属性、边界和新游戏可分配点数。 |
| `skills.json` | 是 | 技能和可选的属性自动触发条件。 |
| `compiled-game-data.js` | **否** | `npm run compile` 生成的数据包；必须随游戏交付。 |

### `docs/`

| 文件 | 用途 |
| --- | --- |
| `README.md` | docs 目录索引：本文件夹存放细分板块的详细文档，归档见 `_Archived/`。 |
| `API使用说明.md` | 数据接口（`data/*.json`）与运行时接口（`window.TrainGame`）的**最详细维护和使用手册**，含复杂维护工作示例。 |
| `skill-tutorials/script-to-game-data.md` | 剧本转换 skill 的手把手使用教程（从 skill 被触发后开始：输入确认、三段闸门、在清单上逐条作答与指定素材、落地与提交）。 |
| `conversion-reviews/review-checklist-2026-09-05-1454.md` | E-005~E-008 批剧本转换的审查清单留档（**旧版格式**：编号条目 + 类别标记 + 决策列；当前格式见 skill 空白模板：人话提问 + 素材指定 + 执行台账）。审查清单统一存放于 `docs/conversion-reviews/`，文件名时间戳精确到分钟。 |
| `conversion-reviews/review-checklist-2026-09-12-1203.md` | 《里世界剧本》E-501~E-525 批转换的审查清单留档（**当前格式**：21 条人话提问 + 11 行素材指定 + 执行台账），已按审阅者作答落地：追加 39 个里世界事件 + 1 个承载原选项的分支事件，新增 5 个场景与 1 个调查点物件，并改写既有 E_023 与 3 号车厢门指向（详见该文件执行台账的"用户答复/状态"列）。 |
| `_Archived/` | 已归档历史文档（`架构设计.md`、`三天计划.md`），归档后不再跟随功能更新，仅供追溯。 |

### `GroupIntro/`

小组介绍（成员汇总）独立子站，从 `home.html` 主页菜单“小组介绍”进入，接替原 `about.html` 占位页。页面自带样式与返回按钮，不依赖游戏主样式与登录态。

| 文件/目录 | 用途 |
| --- | --- |
| `index.html` | 成员汇总入口页；顶部“返回”按钮返回游戏主页。 |
| `back-button.css` / `back-button.js` | 各页共用的“返回”胶囊按钮样式与附加行为。 |
| `background.png` | 汇总页背景图。 |
| `cr/` `czh/` `dxh/` `lty/` `xyx/` `zxy/` | 六位成员各自的介绍子页，内容与素材由对应作者维护。 |

### `skills/`

| 文件 | 用途 |
| --- | --- |
| `script-to-game-data/SKILL.md` | “剧本 → 游戏 JSON”转换 skill 入口：输入要求、三段强制确认闸门与工作流 SOP。 |
| `script-to-game-data/conversion-rules.md` | 完整转换规则：语法映射表、SAN 语义、命名约定、占位策略与隔离验证。 |
| `script-to-game-data/samples/` | 样例输入/输出与逐条说明，配套隔离编译验证。 |
| `script-to-game-data/templates/` | 空白审查清单模板（人话提问作答 + 素材指定区 + 执行台账说明），生成清单时复制并替换占位符。 |

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
| `auth.js` | 管理本地账号、键值对登录、标签页会话和认证跳转。 |
| `auth-guard.js` | 在受保护页面加载和恢复显示时验证登录状态。 |
| `confirm-dialog.js` | `TrainGame.ConfirmDialog`：存档页（选择槽位 / 存档管理）共用的页面内确认框，替代浏览器原生 `window.confirm`，外观与游戏本体菜单一致。 |
| `page-flow.js` | 集中维护页面路径、槽位参数和跨页临时状态。 |
| `state.js` | `GameState`、属性/技能规则、快照恢复与 `SaveManager`。 |
| `ui.js` | 窗口基类、文本播放器、各类窗口和 `UIManager`。 |
| `scene.js` | 通用条件求值与 `SceneManager`。 |
| `events.js` | 注册表、取消机制、终止条件、内置动作与 `EventEngine`。 |
| `dice.js` | `TrainGame.Dice` 检定注册表：每个检定独立注册、可访问状态/UI，只返回结果下标；被 `check` 动作委托。 |
| `custom-actions.js` | 项目动作白名单；当前包含 `flashScreen`。 |
| `minigames.js` | `TrainGame.Minigames` 小游戏注册表：事件 JSON 的 `minigame` 动作只引用这里的编号；模块顶层只注册，运行期才碰 DOM。 |
| `minigame-games/` | 项目小游戏模块（每个小游戏一个文件，见 `minigames.js` 契约与 `docs/API使用说明.md` 小游戏一节）。`webgl3d-demo.js` 为原生 WebGL 3D 技术演示，`conductor-tug.js` 为终局控制杆争夺。 |
| `home.js` | 从游戏元数据初始化主页标题与封面。 |
| `login.js` / `register.js` | 处理登录、注册表单和注册后用户名预填。 |
| `save-manager.js` | 渲染三个槽位并处理读取与删除（删除前用页内确认框二次确认）。 |
| `save-write.js` | 处理新游戏选槽及游戏稳定快照的跨页写入（覆盖已占用槽位前用页内确认框二次确认）。 |
| `main.js` | 游戏页组装入口：新游戏、读取、恢复、暂停菜单与 SAN 归零跳转结束页；渲染 HUD 与底部物品快捷栏（含侦察技能连续点击三次解锁）；小游戏进行中屏蔽系统暂停（`ui.minigame.isOpen()` 守卫暂停按钮与 Esc）。 |

### 其他目录和根文件

| 文件 | 用途 |
| --- | --- |
| `styles/main.css` | 16:9 容器、场景、HUD、窗口、菜单和动画的全部样式。 |
| `tools/compile-data.mjs` | 读取六份 JSON，校验并覆盖生成编译数据。 |
| `tools/test-runtime.mjs` | 在 Node.js `vm` 沙箱测试本地认证、状态、技能、条件、存档和部分动作。 |
| `index.html` / `register.html` | 公共登录入口和独立注册页。 |
| `home.html` | 登录后显示的游戏标题主页；主页菜单含新的游戏、存档管理、设置（占位页）、小组介绍与退出登录；其余 HTML 分别承载游戏、存档写入/管理、设置占位与结束页。 |
| `package.json` | 项目信息及 `compile`、`test`、`check` 命令。 |
| `README.md` | 项目总览与协作者入口；细分接口手册见 `docs/API使用说明.md`。 |
| `AGENTS.md` | 仓库协作与提交约束。 |

## 协作者入口

### 游戏内容维护者：从这里开始

你是编剧、场景/素材制作或剧本数据转换人员，工作对象是 `data/*.json` 六份内容数据与 `assets/` 素材。字段级规则统一放在接口手册，本文只保留入口导读：

- **内容怎么改**：素材放 `assets/` → 修改 `data/*.json`（编辑器有 Schema 补全提示）→ `npm run compile` → 静态服务器刷新验证 → `npm run check`。全部字段与动作规则见[接口手册：数据接口参考](docs/API使用说明.md#数据接口参考)，维护工作流与 ID/路径约定见[接口手册：维护工作流与约定](docs/API使用说明.md#维护工作流与约定)。
- **红线**：只编辑源 JSON，不碰 `data/compiled-game-data.js`（由 `npm run compile` 生成，但必须随游戏交付）；JSON 不能执行 JavaScript，自定义演出只能引用程序员白名单动作。
- **剧本转换**：仓库内置“剧本 → 游戏 JSON”转换 skill，执行规范见 `skills/script-to-game-data/`（`SKILL.md` 为入口与唯一事实源，`conversion-rules.md` 为规则手册，空白清单模板在 `templates/review-checklist-template.md`），手把手教程见 `docs/skill-tutorials/script-to-game-data.md`。skill 执行三段强制闸门：**审查清单**（落在 `docs/conversion-reviews/`，文件名 `review-checklist-<时间戳>.md`）面向你呈现**人话提问 + 素材指定区**（技术细节封装在文末执行台账，供 agent 用）——由你逐条勾选答复（同意 / 需要调整 / 本次跳过）、逐行指定素材（沿用 / 新建 / 委托占位补位 / 暂缓并注明影响），agent 校验全部完成后才继续；skill 不替编剧设计数值、不自行选定既有 `assets/` 素材——素材盘点时 agent 会先从仓库根 `Assets/` 源目录按文件名检索现成图片（只看命名；源目录严格只读），命中则复制到运行目录 `assets/` 并自行改名复用；仅在你勾选「委托占位补位」时才生成占位 SVG，新增文件均经闸门 2 diff 确认。
- **练手**：按[接口手册：复杂维护工作示例](docs/API使用说明.md#复杂维护工作示例)的示例一至示例四各做一遍，即可覆盖新增场景物件、条件选项、物品拾取与属性技能的最常见任务。

### 游戏框架维护者：从这里开始

你负责运行时、UI、存档、校验器与通用能力。模块划分与职责边界见上文[运行原理](#运行原理)的「模块职责与边界」，文件归属见[项目文件结构](#项目文件结构)的 `src/` 表；全部类与方法的契约见[接口手册：运行时接口参考](docs/API使用说明.md#运行时接口参考)。

- **两条铁律**：① 项目专属演出只走白名单注册（`src/custom-actions.js`），禁止 `eval` 或按字符串查找函数；② 状态修改一律经 `GameState` / 动作 `context.state` 接口，保证边界钳制与技能重算，存档只落稳定快照。
- **改协议先看联动清单**：新增通用动作或修改字段/存档结构时，按[接口手册：变更协议时的联动清单](docs/API使用说明.md#变更协议时的联动清单)同步 Schema、编译器、运行时、测试与文档。
- **练手**：按[接口手册：复杂维护工作示例](docs/API使用说明.md#复杂维护工作示例)的示例五至示例八演练存档兼容、可取消演出、派生窗口与新增通用动作。

## 测试排错与交付

### 编译器覆盖范围

`npm run compile` 会检查 JSON 结构、部分未知字段、ID 格式和唯一性、初始入口、跨文件引用、属性边界与分配容量、技能条件、显示/选项条件以及动作关键类型和值。

它目前**不会**检查素材文件是否存在、旗标是否声明、自定义动作是否注册，也不会证明所有分支可达或检定函数返回的下标总是落在列表内，因此仍需实际游玩。

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
| 刷新后突然回到登录页 | 当前标签页会话已失效，或浏览器阻止了 `sessionStorage`；重新登录并检查站点存储权限。 |
| 注册或登录提示无法使用存储 | 浏览器隐私策略可能阻止 Web Storage；允许该地址保存站点数据后重试。 |
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

- `docs/README.md`：docs 目录索引与归档说明。
- `docs/API使用说明.md`：数据接口与运行时接口的最详细维护手册。
- `docs/skill-tutorials/script-to-game-data.md`：剧本转换 skill 手把手教程。
- `docs/_Archived/`：已归档历史文档（`架构设计.md`、`三天计划.md`），归档后不再更新。
- [MDN：Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)：来源隔离、持久化及 `file:` URL 行为。
- [npm 官方文档：npm run-script](https://docs.npmjs.com/cli/v11/commands/npm-run-script/)：`npm run` 脚本规则。
- [VS Code 官方文档：JSON editing](https://code.visualstudio.com/docs/languages/json)：JSON Schema 关联与编辑支持。
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)：本项目 Schema 声明的规范版本。

