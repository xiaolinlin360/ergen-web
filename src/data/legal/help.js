/**
 * 帮助中心 —— 法律/信息页正文（从原 public/*.html 迁移）
 * 正文以原始 HTML 存储，由 LegalPage.vue 用 v-html 注入。
 * 内容为本项目自有法律文案，非用户输入，v-html 安全。
 */
export const help = {
  title: "帮助中心",
  updated: null,
  body: "<p class=\"legal-note\">关于配送、价格、食材与营养成分的常见问题。</p>\n\n    <details open>\n      <summary>AI 怎么算出我该吃多少？</summary>\n      <p>你告诉它性别、年龄、身高、体重和活动量，它会用 Mifflin-St Jeor 公式算出你的基础代谢，再结合活动量得出每日总消耗，并据此给出热量与蛋白质、碳水、脂肪三大营养素的目标配比——不是凭经验猜，是算出来的。</p>\n    </details>\n\n    <details>\n      <summary>配送范围覆盖哪些城市？</summary>\n      <p>目前已覆盖上海、北京、深圳、杭州、成都的主城区，并在持续拓展。下单前 App 会根据你的收货地址自动校验能否送达。</p>\n    </details>\n\n    <details>\n      <summary>多少钱一餐？</summary>\n      <p>体验装约 38 元/餐，月计划低至 32 元/餐。先试 3 天，觉得合适再续。</p>\n    </details>\n\n    <details>\n      <summary>食材哪里来的？</summary>\n      <p>餐厅当天采购、当天使用，不囤货。供应商资质定期复查。</p>\n    </details>\n\n    <details>\n      <summary>能看到每餐的热量和营养成分吗？</summary>\n      <p>当然能。每份餐都标注了热量、蛋白质、碳水和脂肪含量，App 里还能按天查看三大营养素占比，比你自己做笔记还清楚。</p>\n    </details>\n\n    <p class=\"legal-mailto\"><a href=\"mailto:support@zheergan.example.com\">没找到答案？联系客服 ›</a></p>"
}
