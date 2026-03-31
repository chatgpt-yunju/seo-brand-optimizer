/**
 * API 配置模块
 * 在分离部署时，需要配置后端 API 地址
 */

// 默认使用相对路径（适用于本地开发或前后端同域）
// 如果前后端分离，请修改为完整的后端 URL，例如：
// window.API_BASE_URL = 'https://your-backend.vercel.app';

window.API_BASE_URL = window.API_BASE_URL || '/';

/**
 * 获取完整的 API 端点 URL
 * @param {string} endpoint - API 端点（如 '/api/analyze'）
 * @returns {string} 完整 URL
 */
window.getApiUrl = function(endpoint) {
    // 如果已经配置了完整的基础 URL
    if (window.API_BASE_URL && window.API_BASE_URL !== '/') {
        // 确保基础 URL 不以 / 结尾，endpoint 以 / 开头
        const base = window.API_BASE_URL.replace(/\/$/, '');
        const ep = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
        return base + ep;
    }
    // 使用相对路径
    return endpoint;
};
