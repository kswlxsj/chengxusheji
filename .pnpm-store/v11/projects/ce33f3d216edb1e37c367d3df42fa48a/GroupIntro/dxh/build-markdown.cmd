@echo off
chcp 65001 >nul
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\embed-markdown.ps1"
set "build_exit_code=%ERRORLEVEL%"
echo.
if not "%build_exit_code%"=="0" (
  echo Markdown build failed. Check the error above.
) else (
  echo Build succeeded. You can now open index.html directly.
)
pause
exit /b %build_exit_code%
