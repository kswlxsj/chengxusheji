# 常暗之厢网页游戏框架

一个面向短周期课程项目的轻量、事件驱动型剧情网页游戏框架。项目使用原生 HTML、CSS 和 JavaScript，不依赖前端框架，也没有玩家侧构建步骤；内容维护者编辑 JSON，编译器负责校验引用并生成浏览器可直接加载的数据包。

现行剧情文案以 `data/events.json` 为唯一事实源；转换审查记录仅作历史留档，不作为运行内容。

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
5. 存档只记录事件引擎检查点：完整事件结束后、等待玩家选择前，或属性分配完成后的开场入口；不保存半句对白或其他未完成动作。
6. 项目专属演出通过白名单注册，不使用 `eval` 或字符串形式的函数代码。
7. 事件执行期间锁定场景物件的点击与高亮；只有普通对话允许点击文本框外的场景区域推进。
8. 事件执行中可以暂停并保存，但只会写入最近检查点；返回游戏或读档后从检查点游标续跑，执行到一半的非选项演出不会写入存档。

## 当前开发进度

当前运行时版本为 **v0.5.0**，数据格式版本为 **4**，存档版本为 **5**。

### 已完成

- 可配置标题和 16:9 封面的主界面。
- 新游戏属性点分配；必须用完全部点数。
- 单场景背景和按百分比定位的可点击贴图。
- 流式对话、角色立绘、自动播放、快进和跳过本句；同一段文本按句自动拆分，每句单独显示并等待推进。常用说话人自动匹配立绘，也可由剧情用 `portrait` 指定情绪变体。
- 普通场景调查窗口、物品栏全屏调查、条件选项和基于 `src/dice.js` 编号的可编程检定；标准属性检定为 2d6＋属性 ≥ 14，双6/双1为大成功/大失败，并可配置独立剧情分支。
- 场景、旗标、属性、技能、物品和物件状态修改。
- 技能按属性自动触发，以及手动永久覆盖自动触发。
- 可暂停、可取消的自定义异步演出。
- 以小游戏注册表（`TrainGame.Minigames`，仿 dice.js 的“JSON 只写编号”分离架构）接入“事件内小游戏”：事件用 `{ "type": "minigame", "game": "<编号>" }` 触发，小游戏模块结束时可返回**结算动作列表**，由事件引擎按当前事件普通动作的语义顺序执行；宿主窗口 `MinigameWindow`（模态居中近满屏、游戏画面变暗、标题栏含“退出小游戏”）内可自绘任意 DOM/canvas/WebGL 画面，小游戏进行中游戏本体冻结、系统暂停与 Esc 被屏蔽。
- 原生 WebGL 3D 技术演示小游戏 `webgl3d_demo`（`src/minigame-games/`，零第三方库），验证“触发→独立 3D 画面交互→完成/退出两条结算路径→结算动作列表执行”全链路；演示触发物 `mg3d_demo_spot_06` 默认隐藏（验收与删除方法见 `docs/API使用说明.md` 示例九）。
- 终局控制杆争夺小游戏 `conductor_tug`（`src/minigame-games/conductor-tug.js`）：玩家在先头车厢点击控制把手、选择「右杆下拉——加速，继续前进」（`E_033`）且乘务员同行时触发，使用竖直抓握条让玩家与列车员争夺控制杆，并用 `Assets/Image/Scene/Background/ConductorTug` 的仪表盘与指针显示控制权倾向；按住空格/W/↑或鼠标左键把绿色区推向红色控制杆，控制权完全偏向一侧即判定该方获胜，成功跳 `E_034`、失败跳 `E_035`；退出小游戏不产生结算，玩家留在先头车厢可再点控制把手重试。
- 独立登录、注册、标题主页、游戏、存档管理/写入、结束及 Options 页面；Options 以页内标签提供三类账号级音量设置和五类结局收藏。
- 浏览器本地账号注册、严格键值对登录、标签页会话和受保护页面守卫。
- 浏览器本地三个存档槽位，支持读取、覆盖和删除。
- 细粒度稳定检查点：完整事件结束和 `choice` 等待前都会形成检查点；事件中可随时暂停保存，读档后从最近事件入口或原选项继续。
- 新游戏在属性分配完成后、`E_001` 开场前建立首个检查点，开场期间退出、保存或刷新都能保留属性并重新进入开场。
- SAN 归零后立即终止事件并进入结束页。
- 游戏内全部位图（场景背景、物件、物品栏图标、插图、封面）默认最近邻插值（`image-rendering: pixelated`），放大呈像素游戏的硬边感。
- 场景物件支持 `fullCanvas` **整幅画布贴图**：素材按“背景图层蒙版”整幅导出（与背景同画布尺寸、透明边含位置信息），运行时与背景同映射叠放（等同把图层贴回背景）；点击与悬停按不透明像素判定，透明区域不触发事件、不悬停高亮。
- 底部常驻物品快捷栏：渲染持有物品的图标与名称（含数字快捷键），点击物品运行其 `inspectEvent`；普通物品会在压暗的完整游戏画面中放大展示图片、名称与说明。手机和手电筒在 2 号车厢尚未照明时经项目 `useLight` 自定义动作优先提供“照亮”选择；饮料可确认饮用以回复 2 点 SAN 并变为空易拉罐，但在 Clicker 面前饮用会直接触发困难战斗；空易拉罐和玻璃瓶均可投掷引开 Clicker。开启光源后保留黑幕，并显示从画面右侧中点指向鼠标的射线状光束。
- 原生音效播放：音效索引集中在 `data/audio.json`（编号、音频路径、默认音量；编译期校验音频文件真实存在且非空），事件用内置 `{ "type": "sound", "sound": "<编号>" }` 触发，默认与对话并行（不阻塞），可加 `await: true` 等它播完、用 `start`/`duration` 截取一段、用 `volume` 单次微调。事件音效与场景背景音各用独立管理器，共享一秒线性淡入淡出和异步音源生命周期；暂停、取消和终止会启动淡出但不阻塞游戏流程。
- 页面音乐与游戏内背景音分离：标题页、设置页和结束页由 `src/bgm.js` 管理；游戏页按 `scenes.json` 的场景绑定选择唯一背景音，列车声与2号、7号、被啃食6号、伪4号和花海等专属环境音切换时交叉淡化，同一音轨跨场景不重启。玩家可分别调整页面音乐、游戏背景音和游戏音效；滑杆 60% 对应原始设计音量，最终输出按“资源默认值 × 剧情单次倍率 ×（滑杆值 ÷ 60%）”计算并限制在浏览器音量上限内。
- 七份内容 JSON（含 `audio.json`）的 VS Code Schema、编译期交叉引用校验和运行时测试。
- 无前端依赖、通过同源静态服务器交付。

当前剧情主线已全部接线并通过编译校验（数据规模见下文「快速开始」的检查结果）。开局路径示例：

```text
新游戏 → 属性分配 → E_001 开场（2013 年 7 月 15 日，1 号线末班电车醒来，含灵感检定）
  → 6 号车厢：门上便签 / 便签背面 / 车厢地图（整幅蒙版）/ 车门（灵感检定分支）
  → 玩家点门进 7 号车厢：尸体 / 车厢深处洞察检定；演出后自行逐门返回 6 号、进入 5 号
  → 5 号车厢（报纸线索、手电筒与右侧塑料袋内的饮料）→ 玩家点门进 4 号（乘务员）→ 玩家点门进 3 号（黑包钥匙与手机后剧情停下）
  → 点 3 号车厢通往 2 号的门：首次进里世界（见下），里世界返程回到真 2 号 → 2 号车厢（Clicker）
  → 通过 Clicker 后停在安全门前 → 玩家点门进先头车厢（驾驶室操作台，结局分支）
```

3号车厢的行李画面随黑包流程分四阶段更新：初入为满载，首次清出通道后变为半清理，使用应急割带器和撬杆后只留下黑包，完成黑包调查后恢复为空车厢；读到包内 `MOVE FORWARD` 便签时会短暂显示纸条特写。5号工具背包使用独立杂物图层，不再复用3号黑包；7号尸体与收音机使用对应的新版热点素材。

检定结果统一由事件 JSON 的 `outcomes` 承接：骰子函数只计算结果和修改数值，不直接播放剧情。创建属性总值固定为32，默认体质/教育/灵感/SAN均为8；普通属性范围3—10时，2d6标准检定成功率约为8.3%—91.7%。SAN不设上限且不参与自身检定，SAN检定固定以单颗d6判定。3号教育+灵感综合检定取向下取整平均值并以2d6＋平均值 ≥ 15判定；4号交涉小游戏仍按答对0—3题提供40% / 55% / 70% / 85%的最终成功率。SAN归零时会直接进入终止流程。

逐车厢完整通关与各结局的到达仍需要在浏览器里实测；分支是否可达以实际游玩为准。

**里世界支线（E-501~E-525）**：3号通往2号的门是进入2号车厢的唯一入口——手电筒只在5号取得；3号完成黑包流程并取得手机后，剧情停在3号车厢（`E_022_ITEM` 不再自动接 `E_023`），玩家自己点门；点门先播**门前认知崩塌** `E_023`（车厢编号变成3、来路门消失、广播「请不要下车」、灯灭了——3号车厢随之淡入黑场），再由 `E_501` 推门。`ev023_intro_seen` 独立记录这段演出，早退回3号再进入也不会重播；`inner_world_entered` 同时兼容已到过伪4的旧存档并改走主线 `E_DOOR_03`。旧线「光源侦查」`E_024` 已删除，照明统一走现行机制，见[主线接线维护记录](docs/main-route-wiring.md)。首次进入5号车厢时即置 `carriage_06_eaten`；隔门只听见异响，真正返回6号后才显示并描写被啃食的红画面 `assets/Image/Scene/Background/carriage-06-eaten.png`。空车厢左门的“试图回头”只做**一次**静默判定（10%回6号被啃食 / 60%门被关死 / 30%回3号），判定用掉后重复调查一律只报「门被关死，打不开。」并留在空车厢；到过伪4后该门解锁，成为返程出口（磨损门 → 真实2号）。花草车厢左门不设防，任何方向都回空车厢。返程回到真2号后由 `E_025` 播喘息段（乘务员同行时含她的低语），播完停下等玩家照明、点 Clicker。

- 两端车门均点击背景上的隐形热点（左退右进，无贴图、无高亮）；窗外、瓶子仍使用整幅蒙版。
- 花海调头：花海 → 伪4号停下 → 点左门 → 花草车厢停下 → 点左门 → 空车厢停下 → 点左门（磨损门）→ 2号停下（接着播 `E_025` 喘息段）。窗边交谈后同样点左门进入这条返程链；中途再向前探索不受影响。
- 里世界的瓶子只靠点击拾取；拾瓶后留在场景，不重播入场介绍。2号出口不自动强制Clicker检定，玩家继续照明、调查及主线操作——里世界返程回到真2号后同样如此（先播 `E_025` 喘息段，再由玩家照明、点 Clicker）。
- 2号 Clicker 初见需进行一次 SAN 检定（1—2 扣2、3—4 扣1、5—6 不扣）。潜行需连续完成三轮体质与 SAN 检定：每轮体质成功后，SAN 检定为1—3 扣2、4—5 扣1、6 不扣；任一体质失败进入困难卡牌。正面迎战直接进入简单卡牌；持有彩色玻璃瓶时，初见会给出一句模糊提示，玩家可从物品栏触发体质+SAN综合投掷检定，成功直接引开怪物、失手则消耗瓶子并进入困难卡牌。
- 车厢、门、瓶堆、花海、假3号断头及伪4窗边长谈等首次描写各自只播一次；重复经过保持移动和必要短反馈，不重播长演出、惊吓或首次 SAN。
- 花草车厢窗外的灵感侦察只检定一次，成功/失败结果写入存档；之后点击按固定结果给短反馈。
- 伪4号初次为完整雾景。点击窗外后，在“雾气散开”后揭示完整花海背景，此后保留；窗边揭示不会获得花海污染。
- 乘务员按 `crew_04_dead`（是否死亡，由 3 号车厢黑包流程的第二次医学检定失败置位）分支：死亡线走 `E_507` 疯狂低语，含 5 秒红底黑字“停下来”惊吓，超高速输出并震动，可暂停、取消，不扣SAN；在世线走 `E_508`。同行的现实乘务员进入里世界时会暂时消失，返回现实后恢复；里世界内部出现的乘务员始终是独立存在。最终出口另做一次单颗d6 SAN损失检定。
- 交出钥匙会移出背包，出口归还一次；曾交出记录永久保留，控制杆抓握区从20%缩为15%。迷失进入独立结束页；涉足花海后到达原真结局会改走伪结局：主角看似在终点站成功下车，最终再次看见「MOVE FORWARD」。

已确认暂缓的内容及验收记录统一见 [里世界演出维护记录](docs/inner-world-presentation.md)。原转换审查记录仅保留历史，不作为当前路线依据。

### 尚未实现

- 云存档和服务器同步。
- 独立的物品栏/背包管理窗口与通用的“主动使用”面板：当前物品显示在 HUD 底部常驻快捷栏（图标＋名称），点击后可进入全屏物品调查；除手机和手电筒的照明分支外，还没有对所有物品统一可用的主动使用入口。
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
> 本地账号、正式存档、账号音量设置与结局收藏使用同源 `localStorage`，登录状态与跨页临时数据使用 `sessionStorage`。游戏页也会在当前标签页暂存最近稳定检查点（含待续跑事件游标），因此刷新可从事件边界或原选项恢复；关闭标签页后该暂存失效，仍需读取正式存档。浏览器对 `file:` 地址下存储的行为没有统一保证，因此直接双击只可用于查看静态页面，不属于受支持的游戏运行方式。

> [!WARNING]
> 当前登录功能只用于纯前端课程演示，密码以明文保存在浏览器中，页面守卫也不能替代服务端鉴权。请勿使用任何真实密码。

### 内容或框架维护者

需要 Node.js 与 npm。当前 `package.json` 没有依赖，无需执行 `npm install`。

```powershell
# 校验七份内容数据并重新生成浏览器数据包
npm run compile

# 运行不依赖 DOM 的运行时测试
npm test

# 提交前：重新编译、检查源码语法并运行测试
npm run check
```

当前数据的完整检查结果最后应包含：

```text
编译完成：15 个场景，265 个事件，11 个物品，4 个属性，1 个技能，6 个小游戏，33 个音效。
运行时测试通过：本地认证、属性分配、技能触发、条件读取、三槽存档、终止状态、小游戏结算与音效播放。
里世界回归通过：逐句场景、随机出口、交互分支、回程接主剧本2号、道具、结局与切景取消。
主线接线回归通过：4号车厢首次发现与医学询问、折返描写、3号→2号点门驱动、Clicker 与控制杆接线。
资源等待、命中位图与对白计时器测试通过。
```

> 事件数会随剧情接线继续变化；`audio.json` 当前登记检定、背景、车门、搜索与剧情演出音效，新增音效时按 `npm run compile` 的校验要求登记编号与音频文件。

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
5. 自由探索触发事件时先记录事件入口；每个事件结束后更新检查点；遇到 `choice` 时在显示选项前额外提交带动作游标的检查点。
6. 动作报错或事件取消时回滚到最近检查点；事件链全部结束后开放场景交互。

### 模块职责与边界

各模块按职责严格分工，“不负责”列同样重要——正是这些边界让 JSON 剧情无法绕过校验执行任意代码：

| 模块 | 职责 | 不负责 |
| --- | --- | --- |
| `GameState` | 属性边界、技能自动触发与屏蔽、旗标、物品、物件状态、检定结果；快照与严格恢复 | DOM 与剧情跳转 |
| `SceneManager` | 单场景背景、贴图物件、点击入口与显示条件 | 物件点击后的剧情逻辑 |
| `EventEngine` | 顺序解释事件动作、处理分支与取消、定义并维护稳定检查点及续跑游标；内置 `check` 动作委托 `TrainGame.Dice` 并校验返回下标 | 持久化正式存档、检定规则本身 |
| `dice.js`（`TrainGame.Dice`） | 按编号注册全部检定函数：可读取属性/技能/状态/UI，自定义掷骰与扣损，只返回结果下标 | 保存剧情状态与事件跳转 |
| UI（`GameWindow`、`TextPlayer`、各窗口与 `UIManager`） | 窗口生命周期、文本播放、选择/调查/菜单等交互 | 保存剧情状态 |
| `SaveManager` | 当前账号三个槽位的检查点读取、写入、摘要、v4 迁移与删除 | 创建检查点或判断事件状态是否稳定 |
| `Auth` / `AuthGuard` | 本地账号键值对、当前标签页登录态、页面守卫与后退缓存恢复 | 提供真实安全认证 |
| `PageFlow` | 页面路径、入口参数与 `sessionStorage` 跨页交接 | 持久化正式存档 |
| 数据编译器 | 静态校验七份 JSON（含检定编号与结果分支引用，dice 清单由 vm 加载 `src/dice.js` 读取；音效清单校验引用并确认音频文件真实存在且非空）并生成 `data/compiled-game-data.js` | 运行游戏 |

各模块全部类与方法的契约见 `docs/API使用说明.md` 的[运行时接口参考](docs/API使用说明.md#运行时接口参考)。

## 项目文件结构

以下列出当前所有项目目录及受版本控制文件。新增或调整职责后应同步更新本节。

```text
Game/
├─ .vscode/
│  └─ settings.json
├─ assets/
│  ├─ Audio/
│  │  ├─ Bgm/
│  │  └─ SoundEffect/
│  ├─ Fonts/
│  ├─ Image/
│  │  ├─ Item/
│  │  ├─ Portrait/
│  │  ├─ Scene/
│  │  │  ├─ Background/
│  │  │  └─ StillLife/
│  │  └─ Ui/
│  │     ├─ CardBattle/
│  │     ├─ ConductorTug/
│  │     └─ Save/
│  └─ Video/
├─ data/
│  ├─ attributes.json
│  ├─ audio.json
│  ├─ compiled-game-data.js
│  ├─ events.json
│  ├─ items.json
│  ├─ meta.json
│  ├─ scenes.json
│  └─ skills.json
├─ docs/
│  ├─ README.md
│  ├─ API使用说明.md
│  ├─ asset-mapping.md
│  ├─ inner-world-presentation.md
│  ├─ main-route-wiring.md
│  ├─ skill-tutorials/
│  │  └─ script-to-game-data.md
│  ├─ conversion-reviews/
│  │  ├─ review-checklist-2026-09-05-1454.md
│  │  └─ review-checklist-2026-09-12-1203.md
│  └─ _Archived/
│     ├─ 架构设计.md
│     └─ 三天计划.md
├─ GroupIntro/
│  ├─ back-button.css
│  ├─ back-button.js
│  ├─ background.webp
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
│  │  │  ├─ 1_1.webp
│  │  │  ├─ 20260427_fin.webp
│  │  │  ├─ 20260615.webp
│  │  │  ├─ 20260717.webp
│  │  │  ├─ 20260722.webp
│  │  │  ├─ bottom.webp
│  │  │  ├─ profile.webp
│  │  │  ├─ README.md
│  │  │  ├─ screen2_1.webp
│  │  │  ├─ screen2_2.webp
│  │  │  └─ screen2_3.webp
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
│  │     └─ Timeline 1.mp4
│  ├─ xyx/
│  │  ├─ index.html
│  │  └─ yue.gif
│  └─ zxy/
│     ├─ image/
│     │  ├─ p1.webp
│     │  └─ p2.webp
│     └─ index.html
├─ schemas/
│  ├─ attributes.schema.json
│  ├─ audio.schema.json
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
│  ├─ audio.js
│  ├─ custom-actions.js
│  ├─ dice.js
│  ├─ events.js
│  ├─ home.js
│  ├─ image-hit-worker.js
│  ├─ login.js
│  ├─ main.js
│  ├─ minigame-games/
│  │  └─ webgl3d-demo.js
│  ├─ minigames.js
│  ├─ namespace.js
│  ├─ page-flow.js
│  ├─ player-profile.js
│  ├─ register.js
│  ├─ save-manager.js
│  ├─ save-write.js
│  ├─ scene.js
│  ├─ settings.js
│  ├─ state.js
│  └─ ui.js
├─ styles/
│  └─ main.css
├─ tools/
│  ├─ compile-data.mjs
│  ├─ serve-preview.mjs
│  ├─ test-inner-world.mjs
│  ├─ test-main-route.mjs
│  ├─ test-resource-timeout.mjs
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
| `settings.json` | 将七份 `data/*.json` 关联到对应 Schema。用 VS Code 打开整个目录即可获得补全和错误提示。 |

### `assets/`

运行素材按类型存放在 `Audio/`、`Fonts/`、`Image/` 与 `Video/`。目录使用英文 PascalCase；媒体文件使用小写英文 kebab-case，扩展名小写。图片继续细分为物品栏图标、人物立绘、场景背景、场景静物和 UI，小游戏专属资源放在对应子目录。

仓库根 `Assets/` 保存正式美术源素材：除临时 SVG 占位符外，每个 `Game/assets/<相对路径>` 都必须存在同路径、同 SHA-256 的 `Assets/<相对路径>`；SVG 占位符只保留在运行目录。游戏只能引用本目录，不得使用 `../Assets`；源素材库可以额外保存新版候选和未接入内容。同步、版本及命名细则见 [`Assets/README.md`](../Assets/README.md)，本次迁移记录见 [`docs/asset-mapping.md`](docs/asset-mapping.md)。

背景采用正方形画布、内容居中排版（16:9 舞台会裁去上下边）；普通物件使用边界裁紧的透明 PNG、WebP 或 SVG，整幅蒙版素材配合 `fullCanvas: true` 使用。音频由 `data/audio.json` 集中登记后经 `sound` 动作播放；BGM 与 OP 位于 `assets/Audio/Bgm/`。

### `data/`

| 文件 | 手动编辑 | 用途 |
| --- | --- | --- |
| `meta.json` | 是 | 标题、封面、入口和初始状态。 |
| `scenes.json` | 是 | 场景背景、背景音绑定、物件位置、点击入口和显示条件。 |
| `events.json` | 是 | 剧情事件、动作、选择和检定分支。 |
| `audio.json` | 是 | 音效注册表；配置名称、音频路径与默认音量，事件用 `sound` 动作引用其编号。编译期会校验音频文件真实存在且非空。 |
| `items.json` | 是 | 物品注册表；配置名称、图标、说明和点击调查事件。 |
| `attributes.json` | 是 | 属性、边界和新游戏可分配点数。 |
| `skills.json` | 是 | 技能和可选的属性自动触发条件。 |
| `compiled-game-data.js` | **否** | `npm run compile` 生成的数据包；必须随游戏交付。 |

### `docs/`

| 文件 | 用途 |
| --- | --- |
| `README.md` | docs 目录索引：本文件夹存放细分板块的详细文档，归档见 `_Archived/`。 |
| `API使用说明.md` | 数据接口（`data/*.json`）与运行时接口（`window.TrainGame`）的**最详细维护和使用手册**，含复杂维护工作示例。 |
| `main-route-wiring.md` | 主线（5号→4号→3号→2号→先头车厢）的场景接线约定、统一修复对照、回归范围与未修项清单。 |
| `skill-tutorials/script-to-game-data.md` | 剧本转换 skill 的手把手使用教程（从 skill 被触发后开始：输入确认、三段闸门、在清单上逐条作答与指定素材、落地与提交）。 |
| `conversion-reviews/review-checklist-2026-09-05-1454.md` | E-005~E-008 批剧本转换的审查清单留档（**旧版格式**：编号条目 + 类别标记 + 决策列；当前格式见 skill 空白模板：人话提问 + 素材指定 + 执行台账）。审查清单统一存放于 `docs/conversion-reviews/`，文件名时间戳精确到分钟。 |
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
| `audio.schema.json` | 音效注册表：编号、名称、音频路径与默认音量。 |
| `game-data.schema.json` | 七类数据合并后的总结构参考；当前 VS Code 不直接关联它。 |

Schema 提供编辑提示，`compile-data.mjs` 负责跨文件引用和业务校验。修改数据协议时通常要同步更新 Schema、编译器、运行时、测试和本文。

### `src/`

| 文件 | 用途 |
| --- | --- |
| `namespace.js` | 创建 `window.TrainGame`，提供版本、深拷贝和普通延迟。 |
| `auth.js` | 管理本地账号、键值对登录、标签页会话和认证跳转。 |
| `auth-guard.js` | 在受保护页面加载和恢复显示时验证登录状态。 |
| `player-profile.js` | 管理当前账号的三类音量倍率、自动存档开关、五类结局收藏与结局展示目录。 |
| `page-flow.js` | 集中维护页面路径、槽位参数和跨页临时状态。 |
| `state.js` | `GameState`、属性/技能规则、状态快照恢复与仅负责持久化的 `SaveManager`。 |
| `ui.js` | 窗口基类、文本播放器、各类窗口和 `UIManager`。 |
| `scene.js` | 通用条件求值与 `SceneManager`。 |
| `events.js` | 注册表、取消机制、终止条件、内置动作，以及维护稳定检查点与续跑游标的 `EventEngine`。 |
| `dice.js` | `TrainGame.Dice` 检定注册表：每个检定独立注册、可访问状态/UI，只返回结果下标；被 `check` 动作委托。 |
| `custom-actions.js` | 项目动作白名单；当前包含 `flashScreen`、`useLight`、`endGame`、`weightedBranch`（按权重随机分岔，静默判定）。 |
| `audio.js` | `TrainGame.AudioManager` 与 `BackgroundAudioManager`：事件音和场景唯一背景音共用异步音源、循环、一秒淡化与账号音量倍率。 |
| `bgm.js` | 在 `home.html`、`settings.html` 和 `ending.html` 播放跨页 BGM，并应用账号页面音乐倍率。 |
| `minigames.js` | `TrainGame.Minigames` 小游戏注册表：事件 JSON 的 `minigame` 动作只引用这里的编号；模块顶层只注册，运行期才碰 DOM。 |
| `minigame-games/` | 项目小游戏模块（每个小游戏一个文件，见 `minigames.js` 契约与 `docs/API使用说明.md` 小游戏一节）。`webgl3d-demo.js` 为原生 WebGL 3D 技术演示，`conductor-tug.js` 为终局控制杆争夺。 |
| `home.js` | 从游戏元数据初始化主页标题与封面。 |
| `settings.js` | 管理 Options 页标签、音量滑杆与自动存档开关的即时保存，以及结局收藏卡渲染。 |
| `login.js` / `register.js` | 处理登录、注册表单和注册后用户名预填。 |
| `save-manager.js` | 渲染三个槽位并处理读取与删除。 |
| `save-write.js` | 处理新游戏选槽及游戏稳定快照的跨页写入。 |
| `main.js` | 游戏页组装入口：新游戏、检查点读取/续跑、事件中暂停保存与 SAN 归零跳转结束页；渲染 HUD 与底部物品快捷栏；自动存档开启时，首次进入新车厢后保存当前槽位；小游戏进行中屏蔽系统暂停（`ui.minigame.isOpen()` 守卫暂停按钮与 Esc）。 |

### 其他目录和根文件

| 文件 | 用途 |
| --- | --- |
| `styles/main.css` | 16:9 容器、场景、HUD、窗口、菜单和动画的全部样式。 |
| `tools/compile-data.mjs` | 读取七份 JSON，校验并覆盖生成编译数据。 |
| `tools/test-runtime.mjs` | 在 Node.js `vm` 沙箱测试本地认证、状态、技能、条件、存档和部分动作。 |
| `tools/test-inner-world.mjs` | 里世界主力回归：逐句场景轨迹、随机出口、门禁、道具、钥匙、返程接主剧本2号与结局。 |
| `tools/test-main-route.mjs` | 主线接线回归：4号车厢首次发现与医学询问、4号折返描写、3号→2号点门驱动与里世界返程接线、Clicker 与控制杆接线。 |
| `tools/test-resource-timeout.mjs` | 资源等待超时、图片命中 Worker 回退与对白计时器回归。 |
| `index.html` / `register.html` | 公共登录入口和独立注册页。 |
| `home.html` | 登录后显示的游戏标题主页；主页菜单含新的游戏、存档管理、设置、小组介绍与退出登录；其余 HTML 分别承载游戏、存档写入/管理、Options 音量与结局收藏、结束页。 |
| `package.json` | 项目信息及 `compile`、`test`、`check` 命令。 |
| `README.md` | 项目总览与协作者入口；细分接口手册见 `docs/API使用说明.md`。 |
| `AGENTS.md` | 仓库协作与提交约束。 |

## 协作者入口

### 游戏内容维护者：从这里开始

你是编剧、场景/素材制作或剧本数据转换人员，工作对象是 `data/*.json` 七份内容数据与 `assets/` 素材。字段级规则统一放在接口手册，本文只保留入口导读：

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

它目前**不会**检查图片素材文件是否存在、旗标是否声明、自定义动作是否注册，也不会证明所有分支可达或检定函数返回的下标总是落在列表内，因此仍需实际游玩。唯一的例外是 `audio.json` 的音效路径：编译器会校验音频文件真实存在且非空。

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
| 事件中保存后重放了部分内容 | 存档只写最近检查点；只有 `choice` 可直接恢复，其他未完成动作会从最近事件边界重放。 |

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
