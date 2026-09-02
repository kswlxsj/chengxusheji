# 末班列车网页游戏框架 v0.1

面向三周课程项目的原生 HTML/CSS/JavaScript 剧情运行框架。无需安装依赖，也无需 `npm run build`；解压后可直接双击 `index.html` 运行示例。

## 现在已经跑通的链路

场景贴图 → 点击不规则物件 → 播放事件 → 流式文本 → 检定/选择 → 切换事件与场景 → 修改属性/物品/物件可见性 → 单槽存档。

示例中可以：

1. 点击便签，获得旧车票，并让便签永久隐藏。
2. 点击门，进行一次依赖 `insight` 的 d100 检定。
3. 检定成功后选择是否进入 7 号车厢。
4. 在 7 号车厢调查收音机，查看派生自通用窗口的调查窗口。
5. 使用保存、读取、自动播放、快进与跳过本句。

## 编辑数据

主要编辑：

- `data/events.json`：剧情事件与原子动作。
- `data/scenes.json`：背景、贴图物件、百分比位置和点击入口。
- `data/items.json`：物品定义。
- `data/meta.json`：初始状态和入口。

项目已在 `.vscode/settings.json` 关联四份 Schema。用 VS Code 打开整个目录后，编辑这些 JSON 会直接获得字段补全和错误提示。

数据变动后运行：

```powershell
# 进入项目目录后，将四份 JSON 校验并编译成浏览器可直接加载的 JS 数据包。
npm run compile
```

完整检查：

```powershell
# 重新编译数据，并检查所有 JavaScript 文件是否存在语法错误。
npm run check
```

Node.js 只是内容编译工具；玩家运行游戏不需要 Node.js。

## 交付建议

最终压缩时保留整个目录。`node_modules` 不存在，也不需要放入压缩包。老师直接打开 `index.html` 就能查看。

进一步说明见：

- `docs/架构设计.md`
- `docs/API使用说明.md`
- `docs/三天计划.md`
- `schemas/game-data.schema.json`
