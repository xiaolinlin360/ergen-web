# 折耳根健康餐 · 官网

折耳根健康餐 App 的品牌官网，以滚动叙事展示产品卖点（AI 营养方案、热链配送、食材溯源），并提供公司简介与法律/信息页。

## 技术栈

- **Vue 3.5** + **Vite 8**（`<script setup>` 为主）
- **Vue Router 5**（嵌套路由，DefaultLayout 作父路由）
- **Pinia 3**（含持久化插件，当前无业务 store）
- **Supabase JS**（客户端已初始化，暂未接入业务）
- **Element Plus 2.14**（已全局注册，当前业务未使用组件）
- **SCSS**（仅全局基础样式）
- 纯 JavaScript，无 TypeScript

## 环境要求

- Node `^20.19.0 || >=22.12.0`
- pnpm（有 `pnpm-lock.yaml`）

## 快速开始

```bash
pnpm install
pnpm dev       # 开发服务器（默认 http://localhost:5173）
pnpm build     # 生产构建
pnpm preview   # 预览构建产物
pnpm format    # Prettier 格式化
```

## 环境变量

`.env`（已 gitignore，需自行创建）：

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## 目录结构

```
src
├── assets/             # 静态资源（main.scss 全局基础样式）
├── components/
│   ├── sections/       # 页面区块组件（Hero/Pain/Answer/Steps/Pricing/Trust/Faq/Download + PainSplit）
│   ├── CountUp.vue          # 数字滚动动画
│   ├── DownloadButton.vue   # 通用下载按钮（hero/pricing/nav 三 variant）
│   ├── RevealOnScroll.vue   # 入场动画包装器
│   ├── SplitText.vue        # 逐字浮现动画
│   ├── SiteNav.vue          # 顶部导航
│   └── SiteFooter.vue       # 页脚
├── composables/
│   ├── useInView.js         # IntersectionObserver 统一封装 + usePrefersReducedMotion
│   └── useActiveSection.js  # 首页 section 滚动高亮
├── constants/
│   └── download.js          # 下载链接单一数据源
├── data/                # 业务数据（从组件外移，含 JSDoc 类型）
│   ├── legal/               # 6 份法律/信息页正文（v-html 注入）
│   ├── nav.js foods.js steps.js pricing.js trust.js faq.js pain.js platforms.js images.js
├── layouts/
│   └── DefaultLayout.vue    # 全站壳层（导航/装饰/返回按钮/Footer）
├── pages/
│   ├── HomePage.vue         # 首页（8 个 section 拼装）
│   ├── Company.vue          # 公司简介
│   └── LegalPage.vue        # 通用法律页（6 条路由复用，v-html 注入正文）
├── router/
│   └── index.js             # 嵌套路由：/ + /company + 6 条法律页路由
├── stores/              # Pinia（当前无业务 store）
├── styles/              # 全站样式（按模块拆分）
│   ├── tokens.css           # :root 设计变量
│   ├── base.css             # reset + 全局壳层
│   └── sections/            # 各区块样式（nav/hero/pain/answer/steps/pricing/trust/faq/download/footer/legal）
├── utils/
│   └── supabase.js          # Supabase 客户端初始化
├── App.vue              # 根组件（裸 router-view）
└── main.js              # 入口（挂载插件 + 按序 import 样式）
```

## 路由

| 路径 | 页面 | 说明 |
|---|---|---|
| `/` | HomePage | 首页 8 个 section 滚动叙事 |
| `/company` | Company | 公司简介（薄荷绿信息页风格） |
| `/privacy` `/terms` `/service` `/help` `/changelog` `/copyright` | LegalPage | 6 个法律/信息页，复用同一组件 |

所有非首页路由共用 DefaultLayout：无顶部导航、左上"返回首页"按钮、薄荷绿背景。

## 设计系统

- 主题色：薄荷绿渐变（`--cream` token，`#D1FAE5 → #ECFDF5 → #F0FDF7`）
- 字体：Fraunces（展示）+ 系统无衬线（正文），通过 Google Fonts 加载
- 设计变量集中在 `src/styles/tokens.css`（颜色/间距/圆角/阴影/缓动/流式字号）
- 法律页用独立 `.legal-page` 体系（`src/styles/sections/legal.css`），刻意不套营销 token

## 部署

- `vite.config.js` 的 `base: './'`（相对路径，适配 GitHub Pages 子路径）
- `public/_headers` 配置 CSP / HSTS 等安全头（Netlify / Cloudflare Pages 生效；GitHub Pages 不支持自定义头）
- 部署路径前缀：`/zheergan-healthy-meals/`

## 开发约定

- 组件用 `<script setup>`（SplitText 因逐字渲染用 Options API + `h()`）
- 业务数据外移到 `src/data/`，组件不内联硬编码数组
- 重复逻辑抽 composable（如 `useInView` 统一所有 IntersectionObserver 用法）
- 样式保持全局类名，按 section 拆分到 `src/styles/sections/`，不使用 scoped（法律页除外）
