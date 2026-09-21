此文件夹保存项目随附的 skill 源文件。独立发布布局中它不会自动安装，但内容可直接审阅，也可复制或链接到所用 agent 的 skill 目录。

原始课程总仓库可能在上级 `.agents/skills/` 中维护指向本目录的符号链接；该链接属于总仓库集成方式，不是独立发布项目的运行依赖。

## Windows 上符号链接失效时如何恢复

若要在独立仓库根创建 `.agents/skills/script-to-game-data` 链接，Windows 需要启用「开发人员模式」或使用管理员终端。

> 原始总仓库已有链接时不要重建；先用 `git rev-parse --show-toplevel` 判断当前是独立布局还是总仓库布局。

独立布局下，在项目根目录执行：

```powershell
# 方式一：cmd 的 mklink（目录符号链接）
cmd /c mklink /D ".agents\skills\script-to-game-data" "..\..\skills\script-to-game-data"
```

```powershell
# 方式二：PowerShell 原生（效果相同）
New-Item -ItemType SymbolicLink -Path '.agents\skills\script-to-game-data' -Target '..\..\skills\script-to-game-data'
```

创建后可执行 `git status`：若没有报 `.agents` 相关改动即为成功（仓库中链接的目标文本与本说明一致）。

> 提示：Windows 设置 → 隐私和安全性 → 开发者选项 → 打开「开发人员模式」后，普通终端（非管理员）也可以创建符号链接。
