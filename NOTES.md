# 教学备注

## 用户偏好

- 授课语言：**中文**
- 目标：把折耳根官网代码写成可维护、可迭代的（见 [[MISSION.md]]）
- 教学空间：当前目录（ergen-web 仓库根）—— 由 /teach 在本仓库根启动
- 教学文件（MISSION/NOTES/RESOURCES、lessons/reference/assets/learning-records）与产品代码混在同一目录；如用户介意可整体 gitignore 或移到仓库外

## 用户画像（zone of proximal development 的依据）

- 已能**独立搭建并维护**一个 Vue 3 + Vite 网站——这个仓库就是他的，不是练手 demo
- 已具备的良好习惯（课程基线，不重复教）：数据外移 `src/data/`、composable 抽取（`useInView` 等）、design tokens（`tokens.css`）、按 section 拆分 CSS、README 写了开发约定
- 待加强（教学重点）：**一致性**（样式三套并行）、**重复数据源**（FAQ 两处）、**无自动化护栏**（无 ESLint/类型/测试）、**脚手架残留**（main.scss、README 漂移）

## 待办 / 观察

- 第 1 课（0001）✅：单一事实来源 + 全站诊断清单（含 3 个真实反例）
- 候选下一课：样式一致性落地（内联样式 → section CSS + tokens，删 `!important`）；引入 ESLint / 构建护栏；法律文案数据源去重；README 与 package.json 对齐
- 网络：主会话 WebSearch 被拦截，资料收集走 mcp fetch（已确认 cn.vuejs.org 可抓取）

## 诊断快照（2026-08-24，改动前的基线）

已做对：数据/内容与组件分离；下载链接与图片路径集中；composable 复用；CSS 变量令牌；JSDoc 类型。
五大不足：① 样式三套并行（内联 :style / 全局 section CSS / scoped） ② FAQ 文案两处数据源 ③ 无 ESLint（LegalPage 里有条 eslint-disable 但没装 lint） ④ main.scss 脚手架残留（sass 依赖仅为它存在）+ README 技术栈漂移（写了 Pinia/Supabase/Element Plus，实际 package.json 只有 vue + vue-router） ⑤ 法律文案是"HTML 字符串 + 硬编码内联色值"，绕过 token。

## 已修复（2026-08-24，随"样式单一来源"清扫）

- PricingInline.vue：删掉全部内联 `:style`（含 cardStyle/ctaStyle 对象）→ 语义化 class；热门卡阴影改 class 切换；scoped 块删除
- pricing.css：收纳全部卡片样式，用 token（`--cream-card`/`--r-2xl`/`--ink-cream`/`--r-pill`），去掉 `!important` 与内联样式"打架"；网格规则回 CSS 后媒体查询不再需要 `!important`
- AnswerSection.vue：删除 h2 内联色值；answer.css 修掉 `.ingredient-head h2` 的 `#ffffff`（白字配米底 bug，一直靠内联救回），其余硬编码 `#000` 换 `--ink-cream`
- HotChainHero.vue：删除 `titleStyle` 内联对象；把内联那套数值（fs-h1/1.04/-0.01em）合并进 `.hotchain-title--plain`，视觉不变
- 删除脚手架残留 `src/assets/main.scss`（唯一 scss，内容已被 tokens.css 覆盖/无人用）+ 移除 `sass` 依赖 + 删空目录
- README：技术栈/目录结构/环境变量与 package.json 现实对齐（移除 Pinia/Supabase/Element Plus/SCSS/stores/utils）

构建验证通过（npm run build）。待办：FAQ 两处数据源去重（需定文案谁为准）、ESLint 引入（需装依赖）、法律文案内联色值收敛。
