/**
 * 版本更新 —— 法律/信息页正文（从原 public/*.html 迁移）
 * 正文以原始 HTML 存储，由 LegalPage.vue 用 v-html 注入。
 * 内容为本项目自有法律文案，非用户输入，v-html 安全。
 */
export const changelog = {
  title: "版本更新",
  updated: null,
  body: "<span class=\"ver\">v0.0.1</span>\n    <p class=\"date\">2026 年 8 月</p>\n    <ul>\n      <li>首个公开测试版本发布（Android）；</li>\n      <li>AI 营养方案：基于身体数据计算每日热量与三大营养素配比；</li>\n      <li>热链配送：午晚双餐现做现送，到手≥60℃；</li>\n      <li>体验装 / 周计划 / 月计划三档套餐上线；</li>\n      <li>忌口与过敏原标记、随时暂停无违约金。</li>\n    </ul>\n\n    <h2>即将到来</h2>\n    <ul>\n      <li>iOS 版本（TestFlight 测试）；</li>\n      <li>每周口味学习调优与营养师周报；</li>\n      <li>更多城市配送范围拓展。</li>\n    </ul>"
}
