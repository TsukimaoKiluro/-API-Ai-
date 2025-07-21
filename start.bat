@echo off
:: 本地数据交互系统启动脚本
:: 版本 1.1 - 支持子目录路径

title 本地数据交互系统启动器
color 0A

echo 正在启动本地数据交互系统...
echo.

:: 获取当前目录路径
set "current_dir=%~dp0"

:: 检查文件是否存在
if not exist "%current_dir%www\index.html" (
    echo 错误: 未找到 www\index.html 文件
    echo 请确保目录结构如下：
    echo.
    echo [您的文件夹]
    echo ├── start_webpage.bat
    echo └── www\
    echo     └── index.html
    echo.
    pause
    exit /b 1
)

:: 构建完整的文件URL路径
set "file_url=file:///%current_dir:\=/%www/index.html"

:: 根据不同的Windows版本选择最佳的打开方式
ver | find "10." > nul
if %errorlevel% == 0 (
    :: Windows 10/11 - 使用Edge应用模式
    echo 检测到Windows 10/11，使用Microsoft Edge应用模式打开...
    start "" msedge.exe --app="%file_url%" --window-size=1200,800
) else (
    ver | find "6." > nul
    if %errorlevel% == 0 (
        :: Windows 7/8 - 使用Chrome应用模式
        echo 检测到Windows 7/8，尝试使用Chrome应用模式打开...
        start "" chrome.exe --app="%file_url%" --window-size=1200,800
    ) else (
        :: 其他Windows版本 - 使用默认浏览器
        echo 使用默认浏览器打开...
        start "" "%current_dir%www\index.html"
    )
)

echo.
echo 系统已启动，请稍候...
echo 如果浏览器没有自动打开，请手动打开以下文件：
echo %current_dir%www\index.html
echo.
pause