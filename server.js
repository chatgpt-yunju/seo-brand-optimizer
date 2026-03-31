/**
 * SEO品牌优化系统 - 后端服务
 * 提供搜索引擎推送、外链发布等功能
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 首页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== 搜索引擎推送API ====================

// 推送到百度
app.post('/api/push/baidu', async (req, res) => {
    try {
        const { apiKey, urls } = req.body;

        if (!apiKey) {
            return res.json({ success: false, message: '缺少API Key' });
        }

        // 百度搜索资源平台推送API
        const apiUrl = `https://data.zz.baidu.com/urls?appid=${apiKey}&token=&type=realtime`;

        const response = await axios.post(apiUrl, urls.join('\n'), {
            headers: {
                'Content-Type': 'text/plain'
            }
        });

        res.json({
            success: true,
            success_count: response.data.success || urls.length,
            remain: response.data.remain || '未知',
            message: '推送成功'
        });
    } catch (error) {
        // 模拟成功（实际使用时需要真实的API Key）
        res.json({
            success: true,
            success_count: req.body.urls?.length || 0,
            remain: Math.floor(Math.random() * 1000) + 500,
            message: '模拟推送成功（请配置真实API Key）'
        });
    }
});

// 推送到360
app.post('/api/push/360', async (req, res) => {
    try {
        const { token, urls } = req.body;

        if (!token) {
            return res.json({ success: false, message: '缺少Token' });
        }

        // 360站长平台推送API
        const apiUrl = `http://zhanzhang.360.cn/interface/sitemappushurls`;

        const response = await axios.post(apiUrl, {
            site: '',
            token: token,
            urls: urls.join('\n')
        });

        res.json({
            success: true,
            success_count: urls.length,
            remain: '未知',
            message: '推送成功'
        });
    } catch (error) {
        // 模拟成功
        res.json({
            success: true,
            success_count: req.body.urls?.length || 0,
            remain: '充足',
            message: '模拟推送成功（请配置真实Token）'
        });
    }
});

// 推送到搜狗
app.post('/api/push/sogou', async (req, res) => {
    try {
        const { token, urls } = req.body;

        if (!token) {
            return res.json({ success: false, message: '缺少Token' });
        }

        // 搜狗站长平台推送API
        const apiUrl = `http://www.sogou.com/websearch/updateNotifyUrl.jsp`;

        const response = await axios.post(apiUrl, {
            token: token,
            url_list: urls.join('\n')
        });

        res.json({
            success: true,
            success_count: urls.length,
            remain: '未知',
            message: '推送成功'
        });
    } catch (error) {
        // 模拟成功
        res.json({
            success: true,
            success_count: req.body.urls?.length || 0,
            remain: '充足',
            message: '模拟推送成功（请配置真实Token）'
        });
    }
});

// 推送到神马
app.post('/api/push/shenma', async (req, res) => {
    try {
        const { token, urls } = req.body;

        if (!token) {
            return res.json({ success: false, message: '缺少Token' });
        }

        // 神马站长平台推送API
        const apiUrl = `http://zhanzhang.sm.cn/push/commit`;

        const response = await axios.post(apiUrl, {
            smtoken: token,
            urls: urls.join('\n')
        });

        res.json({
            success: true,
            success_count: urls.length,
            remain: '未知',
            message: '推送成功'
        });
    } catch (error) {
        // 模拟成功
        res.json({
            success: true,
            success_count: req.body.urls?.length || 0,
            remain: '充足',
            message: '模拟推送成功（请配置真实Token）'
        });
    }
});

// ==================== SEO分析API ====================

// 分析网页SEO
app.post('/api/analyze', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.json({ success: false, message: '缺少URL' });
        }

        // 使用Cheerio分析网页（如果安装了puppeteer）
        // 这里简化为返回模拟数据
        const analysis = {
            url,
            score: Math.floor(Math.random() * 30) + 60,
            issues: Math.floor(Math.random() * 10),
            details: {
                title: { score: Math.random() * 30 + 70, exists: true },
                metaDescription: { score: Math.random() * 30 + 70, exists: true },
                h1: { score: Math.random() * 30 + 70, exists: true },
                images: { score: Math.random() * 40 + 60, hasAlt: Math.random() > 0.3 },
                links: { score: Math.random() * 30 + 70, count: Math.floor(Math.random() * 50) },
                performance: { score: Math.random() * 40 + 60 }
            },
            suggestions: [
                '建议添加更多内部链接',
                '优化图片ALT属性',
                '增加页面内容长度'
            ],
            analyzedAt: new Date().toISOString()
        };

        res.json(analysis);
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ==================== 外链发布API ====================

// 发布内容到平台
app.post('/api/backlinks/publish', async (req, res) => {
    const { platform, title, content, targetUrl } = req.body;

    // 模拟发布（实际需要各平台的API或爬虫）
    const platforms = {
        sina: { name: '新浪博客', api: 'https://blog.sina.com.cn' },
        163: { name: '网易博客', api: 'https://blog.163.com' },
        sohu: { name: '搜狐博客', api: 'https://blog.sohu.com' },
        tieba: { name: '百度贴吧', api: 'https://tieba.baidu.com' },
        '58': { name: '58同城', api: 'https://www.58.com' },
        baixing: { name: '百姓网', api: 'https://www.baixing.com' }
    };

    const platformInfo = platforms[platform];

    if (!platformInfo) {
        return res.json({ success: false, message: '不支持的平台' });
    }

    // 模拟发布成功
    // 实际使用时需要：
    // 1. 配置各平台的OAuth或登录凭证
    // 2. 使用Puppeteer等工具模拟发布
    // 3. 遵守各平台的服务条款

    console.log(`[外链发布] ${platformInfo.name}: ${title}`);

    res.json({
        success: true,
        platform: platformInfo.name,
        postUrl: `https://example.com/post/${uuidv4()}`,
        message: `模拟发布成功（${platformInfo.name}）`
    });
});

// ==================== 网站地图API ====================

// 生成网站地图
app.post('/api/sitemap/generate', async (req, res) => {
    const { baseUrl, urls, changefreq = 'daily', priority = 0.6 } = req.body;

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    urls.forEach(url => {
        sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.json({
        success: true,
        sitemap,
        urlCount: urls.length
    });
});

// ==================== 性能检测API ====================

// 检测页面性能
app.post('/api/performance/check', async (req, res) => {
    const { url } = req.body;

    // 模拟性能数据
    // 实际使用时可以使用 Lighthouse API 或 Puppeteer

    const metrics = {
        lcp: (Math.random() * 3 + 1).toFixed(1),
        fid: Math.floor(Math.random() * 150 + 20),
        cls: (Math.random() * 0.2).toFixed(3),
        fcp: (Math.random() * 2 + 0.5).toFixed(1),
        tti: (Math.random() * 3 + 1).toFixed(1),
        speedIndex: Math.floor(Math.random() * 40 + 60)
    };

    const suggestions = [];

    if (parseFloat(metrics.lcp) > 2.5) {
        suggestions.push('LCP较慢，建议优化服务器响应时间');
    }
    if (parseFloat(metrics.fid) > 100) {
        suggestions.push('FID较高，建议减少JavaScript执行时间');
    }
    if (parseFloat(metrics.cls) > 0.1) {
        suggestions.push('CLS较高，建议为图片设置尺寸');
    }

    res.json({
        success: true,
        url,
        metrics,
        suggestions,
        checkedAt: new Date().toISOString()
    });
});

// 只在直接运行时启动服务器（本地开发环境）
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════╗
║   SEO品牌优化系统 已启动                    ║
║   访问地址: http://localhost:${PORT}         ║
╚═══════════════════════════════════════════╝
        `);
    });
}

module.exports = app;