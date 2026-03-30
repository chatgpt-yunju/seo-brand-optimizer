# SEO品牌优化系统

一站式帮助客户网站提升搜索引擎权重和排名的专业工具。

## 功能特性

### 1. SEO分析仪表板
- 网站URL输入和分析
- SEO评分系统（0-100分）
- 检查项：标题、元描述、H标签、图片ALT、链接结构等

### 2. 搜索引擎推送
- 百度搜索资源平台API推送（实时/快速）
- 360搜索推送
- 搜狗搜索推送
- 神马搜索推送
- 批量URL推送

### 3. 外链自动发布
- 支持多个博客/论坛平台
- 账号管理
- 自动发布文章（含外链）
- 发布状态跟踪

### 4. 元标签优化
- 动态生成SEO元标签
- SERP预览
- Open Graph标签生成
- Twitter Card标签生成

### 5. 网站地图生成
- 自动生成sitemap.xml
- 百度/Google格式支持

### 6. 结构化数据
- Organization schema
- LocalBusiness schema
- Product schema
- Article schema

### 7. 性能优化
- Core Web Vitals检测
- 优化建议

### 8. 关键词分析
- 关键词密度分析
- 优化建议

## 快速开始

### 1. 安装依赖
```bash
cd seo-brand-optimizer
npm install
```

### 2. 启动服务
```bash
npm start
```

### 3. 访问系统
打开浏览器访问 http://localhost:3000

## 搜索引擎推送配置

### 百度搜索资源平台
1. 登录 https://ziyuan.baidu.com
2. 添加您的网站
3. 获取API Key（站点管理 → 链接提交 → API）
4. 在系统中配置API Key

### 其他搜索引擎
- 360站长平台：https://zhanzhang.so.com/
- 搜狗站长平台：https://zhanzhang.sogou.com/
- 神马站长平台：https://zhanzhang.sm.cn/

## 外链发布说明

### 支持的平台
- 博客类：新浪博客、网易博客、搜狐博客
- 论坛类：百度贴吧、天涯社区
- 分类信息：58同城、百姓网
- 自媒体：百家号、头条号

### 使用步骤
1. 在"外链发布"页面配置各平台账号
2. 填写发布内容（标题、内容、目标URL）
3. 选择要发布的平台
4. 点击发布

### ⚠️ 重要提示
- 全自动外链发布可能违反各平台服务条款
- 建议先小规模测试
- 建议结合手动发布方式
- 质量比数量更重要

## 项目结构

```
seo-brand-optimizer/
├── public/                 # 前端页面
│   ├── index.html         # SEO分析首页
│   ├── submit.html        # 搜索引擎推送
│   ├── backlinks.html     # 外链发布
│   ├── meta-optimizer.html # 元标签优化
│   ├── sitemap-generator.html # 网站地图
│   ├── schema-generator.html  # 结构化数据
│   ├── performance.html   # 性能优化
│   ├── keywords.html      # 关键词分析
│   ├── css/
│   │   └── style.css      # 样式
│   └── js/
│       └── seo-analyzer.js # SEO分析JS
├── server.js              # Node.js后端
├── package.json           # 依赖配置
└── README.md              # 本说明
```

## 技术栈

- 前端：HTML5、CSS3、JavaScript (ES6+)
- 后端：Node.js、Express
- HTTP客户端：Axios

## 注意事项

1. 本系统仅供学习和合法使用
2. 外链发布需遵守各平台规定
3. 搜索引擎推送需要真实的API密钥
4. 定期检查并更新SEO策略

## 许可证

MIT License