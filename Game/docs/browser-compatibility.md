# 浏览器兼容与 IE 模式维护

## 支持范围

- Chrome、Edge、Firefox：当前稳定版及之前两个大版本，使用 `src/`、`styles/` 和 WebP 原始素材。
- Edge IE 模式：使用 IE11 文档模式，加载 `compat/` 下的 ES5 镜像、`*.ie.css` 与 `*.ie.png` / `*.ie.jpg` 后备素材。
- IE10 及更早版本、已经退役的独立 IE 桌面程序不在支持范围内。

IE 模式以流程完整为验收标准。字体栅格、模糊、混合模式、复杂渐变和部分装饰动画允许降级；登录、存档、剧情、物件点击、小游戏和结局不能因此中断。

## 实现边界

页面中的 `src/compat-loader.js` 是 ES5 启动加载器。现代浏览器仍在原位置加载原始脚本；检测到 `document.documentMode` 时，加载器先加载 `compat/polyfills.js` 和素材映射，再改为加载 `compat/` 下的同路径脚本。不要把现代传统脚本与单独的 `nomodule` 镜像并排放置，否则 IE11 仍会尝试解析现代脚本。

兼容构建会：

1. 用 Babel 按 IE11 目标转译 `src/` 与 `GroupIntro/` 的 JavaScript。
2. 用 PostCSS 展开可静态确定的 CSS 变量并添加 IE 前缀；无法自动转换的布局由 `styles/ie-overrides.css` 处理。
3. 将透明 WebP 生成 PNG、无透明通道的 WebP 生成高质量 JPEG，并生成 `compat/asset-map.json`。
4. 将 `Game/assets/` 的后备素材以相同路径和字节同步到 `Assets/`；成员介绍页的局部素材保留在其原目录。
5. 生成 IE 专用 `data/compiled-game-data.js`，不改变原始 JSON、存档版本或剧情协议。

`*.ie.css`、`*.ie.png`、`*.ie.jpg` 和 `compat/` 都是必须随玩家版本交付的生成文件，不应手工编辑。

## 构建与检查

首次维护先在 `Game/` 安装锁定依赖：

```powershell
pnpm install --frozen-lockfile
```

源码或 WebP 变化后执行：

```powershell
npm run compile
npm run compat:build
npm run compat:check
npm run check
```

`compat:check` 会重新计算期望产物、用 ES5 解析器检查所有兼容脚本，并验证每个 WebP 映射均指向非空文件。兼容构建连续运行两次不应产生 Git 差异。

## IE 模式验收

1. 在 Edge 的 IE 模式站点列表中加入启动器显示的本地地址，兼容模式选择“默认”，让页面的 `IE=edge` 使用 IE11 文档模式。
2. 从 `index.html` 注册并登录，依次验证主页、设置、三个存档槽和新游戏属性分配。
3. 覆盖对话推进、检定、物件热点、透明图片命中、暂停、保存、读取和刷新恢复。
4. 覆盖卡牌、交涉、收音机、控制杆小游戏；WebGL 演示允许走现有的不支持回退。
5. 验证全部结局、感谢视频与所有成员介绍页。

硬性失败条件：语法错误、流程死锁、关键文字或图片缺失、无法完成操作。IE 模式无法由普通 Playwright 会话驱动，最终验收需要人工执行；调试方式见 Microsoft 的 IEChooser 文档。
