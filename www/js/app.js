document.addEventListener('DOMContentLoaded', function() {
    // DOM元素
    const inputText = document.getElementById('inputText');
    const sendButton = document.getElementById('sendButton');
    const responseDiv = document.getElementById('response');
    const sendStatus = document.getElementById('sendStatus');
    const receiveStatus = document.getElementById('receiveStatus');
    const autoUpdateCheckbox = document.getElementById('autoUpdate');
    const viewLogsButton = document.getElementById('viewLogs');
    const logSection = document.getElementById('logSection');
    const logContent = document.getElementById('logContent');
    
    // API接口占位符
    const API_ENDPOINT = '///API///';
    
    // 初始化日志
    let logEntries = [];
    
    // 自动更新功能
    let autoUpdateInterval = null;
    
    // 启动时隐藏日志区域
    logSection.style.display = 'none';
    
    // 添加日志条目
    function addLogEntry(message) {
        const timestamp = formatTime();
        logEntries.push(`${timestamp} ${message}`);
        if (logSection.style.display !== 'none') {
            updateLogDisplay();
        }
    }
    
    // 更新日志显示
    function updateLogDisplay() {
        logContent.textContent = logEntries.join('\n');
        logContent.scrollTop = logContent.scrollHeight;
    }
    
    // 初始化自动更新
    function initAutoUpdate() {
        if (autoUpdateCheckbox.checked) {
            startAutoUpdate();
        }
    }
    
    // 启动自动更新
    function startAutoUpdate() {
        autoUpdateInterval = setInterval(fetchServerData, 5000);
        receiveStatus.textContent = '自动更新已启用，每5秒获取一次数据...';
        fetchServerData(); // 立即获取一次数据
        addLogEntry('自动更新功能已启用');
    }
    
    // 停止自动更新
    function stopAutoUpdate() {
        clearInterval(autoUpdateInterval);
        receiveStatus.textContent = '自动更新已禁用';
        addLogEntry('自动更新功能已禁用');
    }
    
    // 事件监听
    autoUpdateCheckbox.addEventListener('change', function() {
        if (this.checked) {
            startAutoUpdate();
        } else {
            stopAutoUpdate();
        }
    });
    
    sendButton.addEventListener('click', sendDataToServer);
    
    inputText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendDataToServer();
        }
    });
    
    viewLogsButton.addEventListener('click', function() {
        if (logSection.style.display === 'none') {
            logSection.style.display = 'block';
            updateLogDisplay();
            addLogEntry('日志视图已打开');
        } else {
            logSection.style.display = 'none';
            addLogEntry('日志视图已关闭');
        }
    });
    
    // 发送数据到服务器
    function sendDataToServer() {
        const text = inputText.value.trim();
        if (!text) {
            sendStatus.textContent = '请输入要发送的文本';
            inputText.focus();
            addLogEntry('发送失败: 输入为空');
            return;
        }
        
        sendStatus.textContent = '发送中...';
        sendButton.disabled = true;
        addLogEntry(`开始发送数据: ${truncateText(text, 50)}`);
        
        // 模拟API请求
        setTimeout(() => {
            try {
                // 这里应该是实际的fetch请求
                // fetch(`${API_ENDPOINT}/data`, {...});
                
                // 模拟成功响应
                const response = {
                    status: "success",
                    message: "数据已更新",
                    timestamp: new Date().toISOString()
                };
                
                sendStatus.textContent = `数据已发送 (${formatTime()})`;
                responseDiv.textContent = `模拟API响应:\n${JSON.stringify(response, null, 2)}`;
                receiveStatus.textContent = `数据已接收 (${formatTime()})`;
                sendButton.disabled = false;
                
                addLogEntry(`数据发送成功: ${truncateText(text, 50)}`);
                addLogEntry(`收到API响应: ${JSON.stringify(response)}`);
                
                // 如果是真实API，触发自动更新
                if (autoUpdateCheckbox.checked) {
                    fetchServerData();
                }
            } catch (error) {
                sendStatus.textContent = '发送失败';
                receiveStatus.textContent = '错误: ' + error.message;
                sendButton.disabled = false;
                
                addLogEntry(`发送错误: ${error.message}`);
                console.error('Error:', error);
            }
        }, 1000);
    }
    
    // 从服务器获取数据
    function fetchServerData() {
        receiveStatus.textContent = '获取数据中...';
        addLogEntry('开始从服务器获取数据');
        
        // 模拟API请求
        setTimeout(() => {
            try {
                // 这里应该是实际的fetch请求
                // fetch(`${API_ENDPOINT}/data`, {...});
                
                // 模拟成功响应
                const response = {
                    text: "这是从服务器获取的模拟数据",
                    timestamp: new Date().toISOString()
                };
                
                responseDiv.textContent = `模拟API数据:\n${JSON.stringify(response, null, 2)}`;
                receiveStatus.textContent = `数据已更新 (${formatTime()})`;
                
                addLogEntry(`获取数据成功: ${JSON.stringify(response)}`);
            } catch (error) {
                receiveStatus.textContent = '获取数据失败: ' + error.message;
                addLogEntry(`获取数据错误: ${error.message}`);
                console.error('Error:', error);
            }
        }, 1000);
    }
    
    // 辅助函数
    function formatTime() {
        const now = new Date();
        return now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    // 初始化
    initAutoUpdate();
    addLogEntry('系统初始化完成');
});