/**
 * SEO分析核心模块
 */

// 分析网站
async function analyzeWebsite() {
    const url = document.getElementById('analyzeUrl').value.trim();

    if (!url) {
        alert('请输入要分析的网站URL');
        return;
    }

    // 验证URL格式
    try {
        new URL(url);
    } catch (e) {
        alert('请输入有效的URL（以http://或https://开头）');
        return;
    }

    const resultDiv = document.getElementById('analyzeResult');
    resultDiv.innerHTML = '<div class="result-card">🔍 正在分析...</div>';

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const result = await response.json();

        if (result.success) {
            displayAnalysisResult(result);
            saveToHistory(result);
            updateScoreDisplay(result.score);
        } else {
            resultDiv.innerHTML = `<div class="result-card error">❌ 分析失败: ${result.message}</div>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="result-card error">❌ 分析失败: ${error.message}</div>`;
    }
}

// 显示分析结果
function displayAnalysisResult(result) {
    const resultDiv = document.getElementById('analyzeResult');
    const scoreClass = result.score >= 70 ? 'good' : result.score >= 40 ? 'mid' : 'bad';

    resultDiv.innerHTML = `
        <div class="result-card ${scoreClass === 'good' ? 'success' : 'warning'}">
            <h3>📊 SEO分析结果</h3>
            <p><strong>综合评分：</strong> <span class="score-badge score-${scoreClass}">${result.score}</span></p>
            <p><strong>发现的问题：</strong> ${result.issues} 个</p>
            <hr style="margin: 15px 0; border-color: var(--border);">
            <h4>详细分析：</h4>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 8px;">
                    <span>📝 标题标签：</span>
                    <span style="color: ${result.details.title.score >= 80 ? 'green' : 'orange'}">${result.details.title.exists ? '✓ 正常' : '✗ 缺失'}</span>
                </li>
                <li style="margin-bottom: 8px;">
                    <span>📄 Meta描述：</span>
                    <span style="color: ${result.details.metaDescription.score >= 80 ? 'green' : 'orange'}">${result.details.metaDescription.exists ? '✓ 正常' : '✗ 缺失'}</span>
                </li>
                <li style="margin-bottom: 8px;">
                    <span>🏷️ H1标签：</span>
                    <span style="color: ${result.details.h1.score >= 80 ? 'green' : 'orange'}">${result.details.h1.exists ? '✓ 正常' : '✗ 缺失'}</span>
                </li>
                <li style="margin-bottom: 8px;">
                    <span>🖼️ 图片ALT：</span>
                    <span style="color: ${result.details.images.hasAlt ? 'green' : 'orange'}">${result.details.images.hasAlt ? '✓ 有ALT属性' : '✗ 缺少ALT'}</span>
                </li>
                <li style="margin-bottom: 8px;">
                    <span>🔗 链接数量：</span>
                    <span>${result.details.links.count} 个</span>
                </li>
            </ul>
            ${result.suggestions.length > 0 ? `
                <hr style="margin: 15px 0; border-color: var(--border);">
                <h4>💡 优化建议：</h4>
                <ul style="padding-left: 20px;">
                    ${result.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `;
}

// 更新评分显示
function updateScoreDisplay(score) {
    const mainScore = document.getElementById('mainScore');
    const scoreValue = mainScore.querySelector('.score-value');
    const scoreDetails = document.querySelectorAll('.score-item');

    // 更新主评分
    scoreValue.textContent = score;

    // 更新详细评分（模拟）
    const subScores = [
        Math.floor(score * (0.8 + Math.random() * 0.4)),
        Math.floor(score * (0.8 + Math.random() * 0.4)),
        Math.floor(score * (0.8 + Math.random() * 0.4)),
        Math.floor(score * (0.8 + Math.random() * 0.4))
    ];

    scoreDetails.forEach((item, index) => {
        const fill = item.querySelector('.score-fill');
        const num = item.querySelector('.score-num');

        fill.style.width = subScores[index] + '%';
        num.textContent = subScores[index] + '/100';

        // 根据分数设置颜色
        if (subScores[index] >= 70) {
            fill.style.background = 'var(--success)';
        } else if (subScores[index] >= 40) {
            fill.style.background = 'var(--warning)';
        } else {
            fill.style.background = 'var(--danger)';
        }
    });
}

// 保存到历史记录
function saveToHistory(result) {
    const history = JSON.parse(localStorage.getItem('seoAnalysisHistory') || '[]');

    history.unshift({
        id: Date.now().toString(),
        url: result.url,
        score: result.score,
        issues: result.issues,
        time: new Date().toISOString()
    });

    // 只保留最近20条记录
    localStorage.setItem('seoAnalysisHistory', JSON.stringify(history.slice(0, 20)));
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeWebsite,
        displayAnalysisResult,
        updateScoreDisplay,
        saveToHistory
    };
}