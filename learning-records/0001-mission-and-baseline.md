# 教学目标切换 + 维护性基线诊断

用户从"看懂别人的 Vue 3 项目"切换到"让自己的官网代码可维护、可迭代"。基线（由代码本身推断）：已具备数据外移、composable 抽取、design tokens、按 section 拆分 CSS 的能力，未发现这些再教的需求；不足集中在**一致性**——样式三套并行、FAQ 重复数据源、无 ESLint（LegalPage 里有条 `eslint-disable` 注释但没装 lint）、main.scss 脚手架残留 + README 技术栈漂移、法律文案硬编码内联色值。

- **Evidence**: 仓库是用户自建并维护的 Vue 3 + Vite 官网（`src/data/`、`composables/`、`styles/tokens.css`、`constants/download.js` 已存在，质量不错）。
- **Implications**: 不再教"如何读懂组件/数据流"，直接教"如何识别与消除不一致"；第 1 课用真实文件（PricingInline.vue、faq.js vs legal/help.js、README vs package.json）做反例。下一课候选：把内联样式收敛进 section CSS + tokens 并删 `!important`。
