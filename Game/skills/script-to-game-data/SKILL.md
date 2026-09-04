---
name: script-to-game-data
description: 把 TRPG“剧本”形式的 Markdown 清洗转换为 webGame 框架可用的 JSON 候选与逐次运行的审查清单（review checklist）。按本文件的工作流树执行，三段闸门强制；仅在用户要求转换剧本并明确指定一个或多个输入文件时使用，输入未指定时必须先询问。
---

# script-to-game-data · 剧本 → 游戏 JSON（工作流树）

规则细节以同目录 [`conversion-rules.md`](conversion-rules.md) 为准（命名 §10、白名单 §11、审查清单格式 §13、阻断情形 §16）；本树是 agent 的执行顺序与判定点。产物约定：候选 JSON + `docs/conversion-reviews/review-checklist-YYYY-MM-DD-HHmm.md`。

图例：`▸` 节点步骤；`├─`/`└─` 子步骤或分支；`?` 判定点（右分支为否定/退回）；`⛔` 硬性禁止（违反即失败）。

```
▸ 0 触发判断
   ├─ 用：用户要求“把剧本转成游戏数据 / JSON / 按剧本生成事件”，并给出输入文件
   ├─ 不用：只是讨论剧情内容 / 数值设计 / 框架功能（不执行转换）
   └─ ⛔ 未给出可读的剧本正文输入时：不产出任何 JSON

▸ 1 确认输入（每次运行第一步；流程中一旦需要可回到本步）
   ├─ 索取：一个或多个 Markdown 剧本路径（仓库内相对路径或绝对路径均可）
   ├─ ? 未指定 / 文件不存在 / 非 UTF-8 / 内容不是剧本正文
   │    └─ 停下询问：列出候选文件与“放弃”选项；不得默认任何路径、不得沿用上次输入
   ├─ 多文件 → 问清关系（连载 / 版本并列 / 各自独立）；事件编号冲突 → 停下询问
   └─ 只读准备
        ├─ 读本目录 conversion-rules.md
        └─ 快照（只读）：data/attributes.json、skills.json、items.json、scenes.json、events.json
              └─ ⛔ 任何情况下不改这些注册表文件与 schemas/、src/、tools/、assets/

▸ 2 候选转换（candidate：只产出候选与清单，不写 data/）
   ├─ 逐事件解析剧本（conversion-rules.md §4 结构模型、§5 语法映射、§6 检定决策树）
   │    ├─ 可直译 → 生成候选事件片段：
   │    │    叙述/台词 → dialogue；说话人行 → speaker；选择 → choice；
   │    │    命中已注册属性名的检定 → check（§6.1）；SAN 记法 → 按 §7 直译；合流/变体拆分见 §4.2/§8
   │    ├─ 不可直译（技能检定、%修正、或组合、对抗、×2、自动成功、物品获得、
   │    │    跨路径条件、纯舞台指令等）→ 事件流当前位置放“原文整行占位”dialogue（§9），
   │    │    分支/条件原文整块不进 JSON，只登记为清单条目（类别见 §13.2）
   │    └─ ? 悬空跳转 / ID 冲突 / 分支归属无法判定 / 结构无法辨识（§16 阻断清单）
   │         └─ 停下询问，不猜测
   ├─ 生成审查清单（第 1 闸门产物）
   │    ├─ 复制 templates/review-checklist-template.md，替换全部 {{…}} 占位符
   │    └─ 落盘 docs/conversion-reviews/review-checklist-YYYY-MM-DD-HHmm.md
   │         （时间戳精确到分钟；每次转换新建文件，不覆盖旧文件）
   └─ 隔离编译验证：把 Game/ 复制到临时目录 → 注入本次候选（必要时注入隔离 stub/示例场景）
        → node tools/compile-data.mjs → 断言“编译完成”且退出码 0 → 删除临时目录
        └─ 失败即视为转换缺陷：修复候选后重跑；⛔ 不得“关掉校验蒙混”，真实 data/ 全程不被写

▸ 3 闸门 1 · 决策闸（candidate 结束点；不可跳过、不可与写盘合并）
   ├─ 停：告知用户清单路径与待决项概览
   ├─ 用户直接在清单文件上操作：
   │    ├─ “决策”行填首词：批准 / 修改(备注里给替代) / 否决 / 转交 / 留待（§13.3）
   │    └─ 可在“备注/补充说明”自由书写（agent 不改写用户内容）
   ├─ 用户回复“已修改，继续” → agent 重读改后清单，按决策词逐条执行
   ├─ ? 用户回复“按清单落地”？
   │    ├─ 是 → 进入 ▸ 4
   │    └─ 否（“先修订候选 / 清单”“先不落地”）→ 停在本闸门；仓库只留清单与候选，
   │          data/ 零改动，本文件结束
   └─ ⛔ 未获批准：不写 data/、不进入 landing、不提交 git

▸ 4 闸门 2 · 改动方案确认闸（landing 写盘之前）
   ├─ 摆出逐文件 diff 草稿：
   │    ├─ data/events.json：仅追加本 skill 命名空间事件，既有条目零改动
   │    └─ data/scenes.json、items.json、meta.json：如涉及，逐处单列（坐标/素材/
   │         物品注册/入口均属设计输入）
   ├─ ? 用户逐文件确认？
   │    ├─ 是 → 按白名单写入（conversion-rules.md §11）
   │    └─ 否 / 要求修改 → 退回修订并重出 diff，不写入
   └─ ⛔ 未逐文件确认前不写入任何白名单文件

▸ 5 落地执行与闸门 3 · 终审闸（提交之前）
   ├─ 写入后：在真实仓库运行 node tools/compile-data.mjs
   │    └─ 报错 → 回滚已写入改动 → 修复 → 重跑，不蒙混
   ├─ 汇报：改动文件清单 + diff 摘要 + 编译结果 + 已执行清单条目追加“→已落地（日期）”
   ├─ ? 用户终审通过？
   │    ├─ 是 → 按仓库规范做中文、原子、详细的 git 提交（如 feat(skills):…、docs(剧本):…）
   │    └─ 否 → 退回闸门 2（或闸门 1）重新处理
   └─ ⛔ 任何一步用户要求“先等等”：就地停止等待；提交必须以终审为前置条件

▸ 6 收尾验收（每次运行结束自查）
   ├─ 候选 JSON：全部 ID 合法且唯一；无悬空引用；只引用已注册属性/场景；
   │     node -e "JSON.parse(...)" 可解析
   ├─ 审查清单：覆盖每个事件中的不可直译检定、SAN、前提/条件、物品获得、表现指令、文本疑点
   ├─ ⛔ 红线复核：
   │    ├─ 输入剧本文件未被修改
   │    ├─ attributes.json / skills.json / schemas/ / src/ / tools/ / styles/ / assets/
   │    │     与 data/compiled-game-data.js 未被写
   │    └─ 无任何用户未同意的推断悄悄落地
   └─ 汇报收尾：清单路径、待决项概览、（如落地）diff 与编译结果、未推送提交提醒
```

术语与产物位置速查：

| 名称 | 含义 / 位置 |
| --- | --- |
| candidate / landing | 流程两段：候选产出（不写 `data/`）→ 批准后落地写入；无配置文件授权开关，由闸门逐次批准 |
| review checklist | 人机决策台账；`templates/review-checklist-template.md` 为空白模板，产物落 `docs/conversion-reviews/review-checklist-<ts>.md` |
| 原文占位行 | 不可落地内容的原文整行 `dialogue`（`conversion-rules.md` §9） |
| 样例 | `samples/sample-input.md`、`samples/sample-output.json`、`samples/sample-notes.md` |
