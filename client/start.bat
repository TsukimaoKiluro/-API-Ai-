@echo off
title 本地数据交互系统
color 0A

:: 创建日志目录
if not exist "logs" mkdir "logs"

:: 设置日志文件路径
set LOG_FILE=logs\%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
echo %date% %time% 系统启动 >> %LOG_FILE%

:: 启动本地Web服务器
echo %date% %time% 正在启动本地Web服务器... >> %LOG_FILE%
start "" /MIN python -m http.server 8000 --directory www
echo %date% %time% 本地Web服务器已启动，访问 http://localhost:8000 >> %LOG_FILE%

:: 启动模拟API接口
echo %date% %time% 正在启动模拟API接口... >> %LOG_FILE%
start "" /MIN cmd /c api.cmd
echo %date% %time% 模拟API接口已启动 >> %LOG_FILE%

:: 打开浏览器
echo %date% %time% 正在打开浏览器... >> %LOG_FILE%
start "" "http://localhost:8000"

echo %date% %time% 系统启动完成 >> %LOG_FILE%
echo 系统已启动，按任意键退出...
pause >nul

:: 关闭所有相关进程
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im cmd.exe >nul 2>&1
echo %date% %time% 系统已关闭 >> %LOG_FILE%
exit