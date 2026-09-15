此文件夹下的skill作为开发中的对象，不直接使用。

在此文件夹做的任何更新会通过symbolic link自动同步到 `../../.agents/skills` 目录下，这是正式的部署位置。

## Windows 上符号链接失效时如何恢复

仓库中的 `.agents/skills/script-to-game-data` 是指向本目录的**相对路径**符号链接。Windows 上创建符号链接需要「开发人员模式」或管理员权限；直接 `git clone` 出来的仓库默认不会生成真实链接（只会得到存放路径文本的普通文件），此时需要在本机手动创建一次。

> ⚠️ 链接目标**必须使用反斜杠**（`..\..\Game\...`）。Windows 无法解析带正斜杠的相对链接目标，会导致链接悬空、内容读不到。
>
> 补充：仓库内 Git 记录的目标文本是正斜杠形式（`../../Game/...`），这是 Git for Windows 读写符号链接时的统一规范形式，**不要手动去改**；本机手动创建链接时才需要用上面的反斜杠写法。两者并存是正常的。

用**管理员身份**打开 PowerShell 或 CMD，在仓库根目录执行一次：

```powershell
# 方式一：cmd 的 mklink（目录符号链接）
cmd /c mklink /D ".agents\skills\script-to-game-data" "..\..\Game\skills\script-to-game-data"
```

```powershell
# 方式二：PowerShell 原生（效果相同）
New-Item -ItemType SymbolicLink -Path '.agents\skills\script-to-game-data' -Target '..\..\Game\skills\script-to-game-data'
```

创建后可执行 `git status`：若没有报 `.agents` 相关改动即为成功（仓库中链接的目标文本与本说明一致）。

> 提示：Windows 设置 → 隐私和安全性 → 开发者选项 → 打开「开发人员模式」后，普通终端（非管理员）也可以创建符号链接。