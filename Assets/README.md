# 素材库维护规范

`Assets/` 是美术源素材库，正式游戏只引用 `Game/assets/`。除运行期 SVG 占位符外，每个运行素材都必须在 `Assets/` 的相同相对路径存在一份 SHA-256 完全相同的副本；SVG 占位符只保留在 `Game/assets/`，不进入美术源素材库。`Assets/` 可以额外保留新版候选和尚未接入游戏的素材。

## 目录分类

```text
Assets/
├─ Audio/
│  ├─ Bgm/
│  └─ SoundEffect/
├─ Fonts/
├─ Image/
│  ├─ Item/                  # 物品栏图标
│  ├─ Portrait/              # 人物与怪物立绘
│  ├─ Scene/
│  │  ├─ Background/         # 场景背景；小游戏专属背景可继续分组
│  │  └─ StillLife/          # 场景内可点击物件和静物图层
│  └─ Ui/
│     ├─ CardBattle/
│     ├─ ConductorTug/
│     └─ Save/
└─ Video/
```

新增分类时应沿用上述大方向；只有同一功能拥有一组独立素材时才新建子文件夹。目录使用英文 PascalCase。媒体文件使用小写英文 kebab-case，扩展名小写；`.gitkeep` 不纳入媒体命名检查。

## 同步与版本规则

- 同一份素材在两边使用同一文件名和相对路径，不保存仅名称不同的副本。
- 新运行素材先按规范放入 `Assets/`，再复制到 `Game/assets/` 对应位置；不要让游戏直接引用 `../Assets`。
- 临时 SVG 占位符是唯一例外：只放入 `Game/assets/`，正式素材接入后删除，不同步回 `Assets/`。
- 内容不同但语义相同且需要并存时使用 `-v1`、`-v2` 等明确版本号。当前运行版本不一定是编号最大的版本，是否切换必须作为独立内容变更审阅。
- 不同格式的有效版本可以同名主体、保留不同扩展名，例如 `scene.jpg` 与 `scene.png`。
- 移动或改名后必须同步更新游戏引用、重新生成编译数据，并验证除 SVG 占位符外，`Game/assets/` 是 `Assets/` 的同路径同字节子集。
- 不得为了目录整理而重编码图片、音频或视频；需要更换内容时另开内容变更。

本次整理的逐项旧路径、哈希、匹配方式及版本关系见 [`Game/docs/asset-mapping.md`](../Game/docs/asset-mapping.md)。
