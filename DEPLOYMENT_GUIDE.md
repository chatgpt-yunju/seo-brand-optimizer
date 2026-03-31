# SEO品牌优化系统 - 部署指南

## 📦 当前状态

✅ 前端 GitHub Actions 工作流已配置（`.github/workflows/gh-pages.yml`）
✅ 后端 Vercel 配置已完成（`vercel.json`, `api/index.js`）
✅ 前端 API 地址已抽象化（`public/js/api-config.js`）
✅ 所有代码更改已提交到本地

⏳ **待完成**：推送到 GitHub 并部署到 Vercel

---

## 🚀 完整部署步骤

### 第一步：推送到 GitHub

```bash
cd /e/RT750/seo-brand-optimizer
git push origin main
```

如果推送到 GitHub 遇到网络问题，可以：
- 检查网络连接
- 或使用代理
- 或稍后重试

---

### 第二步：部署前端到 GitHub Pages

1. 访问您的 GitHub 仓库：https://github.com/chatgpt-yunju/seo-brand-optimizer
2. 点击 **Settings** → **Pages**
3. 在 **Build and deployment** 中：
   - Source: 选择 **GitHub Actions**
4. 点击 **Save**
5. GitHub Actions 会自动运行，几分钟后前端将上线

前端地址：`https://chatgpt-yunju.github.io/seo-brand-optimizer/`

---

### 第三步：部署后端到 Vercel

#### 方式 A：通过 Vercel 网站（推荐）

1. 访问 https://vercel.com/new
2. 选择 **Import Git Repository**
3. 选择 `chatgpt-yunju/seo-brand-optimizer`
4. Vercel 会自动检测配置
5. 点击 **Deploy**
6. 等待部署完成

后端地址：`https://seo-brand-optimizer-你的用户名.vercel.app`

#### 方式 B：使用 Vercel CLI

```bash
cd /e/RT750/seo-brand-optimizer
vercel --prod
```

---

### 第四步：配置前端 API 地址

获得 Vercel 后端 URL 后（例如 `https://your-app.vercel.app`），修改前端配置：

#### 选项 1：在 `public/js/api-config.js` 中硬编码（推荐用于生产）

```javascript
// 修改为：
window.API_BASE_URL = 'https://your-app.vercel.app';
```

#### 选项 2：在每个 HTML 页面中添加配置

在 `<head>` 中的 `api-config.js` 之后添加：

```html
<script>
  window.API_BASE_URL = 'https://your-app.vercel.app';
</script>
```

---

### 第五步：提交 API 地址配置并重新部署

```bash
cd /e/RT750/seo-brand-optimizer
git add .
git commit -m "feat: configure API endpoint for production"
git push origin main
```

GitHub Actions 会自动重新部署前端。

---

## ✅ 验证部署

1. 访问前端：`https://chatgpt-yunju.github.io/seo-brand-optimizer/`
2. 访问后端：`https://your-app.vercel.app/api/analyze`（POST 测试）
3. 在前端页面测试功能：
   - SEO 分析
   - 搜索引擎推送
   - 外链发布
   - 等

---

## 📝 注意事项

- GitHub Pages 有 100MB 仓库大小限制
- Vercel 免费套餐有限制（每月 100GB 流量）
- API 调用是模拟数据（server.js 中的模拟返回），需要真实 API Key 才能实际推送
- CORS 已配置允许所有来源

---

## 🔧 故障排除

**问题**：GitHub Actions 未运行  
**解决**：确保仓库 Settings → Pages → Source 选择 GitHub Actions

**问题**：前端无法访问后端 API（跨域错误）  
**解决**：检查 `window.API_BASE_URL` 配置是否正确

**问题**：Vercel 部署失败  
**解决**：检查 `vercel.json` 配置，确保 `api/index.js` 存在且可导出

---

需要帮助？请提供具体的错误信息。
