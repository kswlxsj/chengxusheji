此文件夹下的skill作为开发中的对象，不直接使用。

在此文件夹做的任何更新会通过symbolic link自动同步到 `../../.agents/skills` 目录下，这是正式的部署位置。

## Windows 上符号链接失效时如何恢复

仓库中的 `.agents/skills/script-to-game-data` 是指向本目录的**相对路径**符号链接。Windows 上创建符号链接需要「开发人员模式」或管理员权限；直接 `git clone` 出来的仓库默认不会生成真实链接（只会得到存放路径文本的普通文件），此时需要在本机手动创建一次。

用**管理员身份**打开 PowerShell，然后执行一次（仓库根目录下）：

```powershell
cmd /c mklink /D ".agents\skills\script-to-game-data" "../../Game/skills/script-to-game-data"
```

> 提示：Windows 设置 → 隐私和安全性 → 开发者选项 → 打开「开发人员模式」后，普通终端（非管理员）也可以创建符号链接。