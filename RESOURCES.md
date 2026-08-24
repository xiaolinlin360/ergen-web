# 可维护前端 / Vue 资源

> 本工作区的知识从这里取材，而非参数化猜测。Wisdom 来自社区。
> 状态：2026-08-24 新建（目标：官网代码可维护、可迭代）。

## Knowledge

- [Vue 官方风格指南](https://cn.vuejs.org/style-guide/)
  官方对 Vue 代码风格的分级建议（A 必需防错 / B 强烈推荐提可读性 / C 推荐选一个并保持一致 / D 谨慎使用）。用于：判断组件文件组织、命名、写法的"应该"。第 1 课主源。
- [Vue 官方文档 · 状态管理](https://cn.vuejs.org/guide/scaling-up/state-management.html)
  明确出现"现在我们有了单一的数据源"的表述。用于："单一事实来源"概念最权威的出处。
- [Vue 官方文档 · 单文件组件 CSS 功能（Scoped）](https://cn.vuejs.org/api/sfc-css-features.html)
  scoped 样式、`:deep()`、`v-bind()`。用于：样式作用域的选择与迁移。
- [Vue 官方文档 · 组件基础](https://cn.vuejs.org/guide/essentials/component-basics.html)
  props 单向数据流、组件组织。用于：理解"数据从哪来、改哪里生效"。

## Wisdom (Communities)

- [Vue 官方 GitHub Discussions](https://github.com/vuejs/core/discussions)
  官方问答区。用于：直接问核心维护者、查"这个写法该不该"。
- [r/vuejs](https://www.reddit.com/r/vuejs/)
  全球最大 Vue 社区。用于：最佳实践、写法优劣、排障。

## Gaps

- 中文语境下讲"前端可维护性/小步重构"的高质量系统性资源较少；暂时以官方文档为主，用户报出具体痛点再补充。
- 若后续引入 ESLint，需补 Vue 官方 eslint-plugin-vue 文档（未核实链接，动手前先抓取）。
