@echo off
title 模拟API接口
color 0B

:: 创建日志目录
if not exist "logs" mkdir "logs"

:: 设置日志文件路径
set LOG_FILE=logs\api_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
echo %date% %time% API接口启动 >> %LOG_FILE%

:: 创建临时数据文件
if not exist "data.txt" (
    echo {"text": "初始数据", "timestamp": "%date% %time%"} > data.txt
    echo %date% %time% 创建初始数据文件 >> %LOG_FILE%
)

:loop
:: 监听请求
set /p input=
echo %date% %time% 收到请求: %input% >> %LOG_FILE%

:: 处理GET请求
if "%input%" == "GET" (
    type data.txt
    echo %date% %time% 返回GET响应 >> %LOG_FILE%
    goto loop
)

:: 处理POST请求
if "%input:~0,4%" == "POST" (
    set "json=%input:~5%"
    echo %json% > data.txt
    echo {"status": "success", "message": "数据已更新", "timestamp": "%date% %time%"}
    echo %date% %time% 更新数据: %json% >> %LOG_FILE%
    goto loop
)

:: 无效请求
echo {"error": "无效请求"}
echo %date% %time% 无效请求: %input% >> %LOG_FILE%
goto loop