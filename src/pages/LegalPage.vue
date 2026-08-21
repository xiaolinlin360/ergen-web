<template>
  <section class="legal-page section-panel panel-cream" :class="`legal-page--${variant}`">
    <div class="legal-wrap">
      <div class="legal-hero">
        <h1 class="legal-title">{{ doc.title }}</h1>
        <p v-if="doc.updated" class="legal-updated">最后更新日期：{{ doc.updated }}</p>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -- 内容为项目自有法律文案，非用户输入 -->
      <div class="legal-body" v-html="doc.body" @click="onBodyClick" />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import '@/styles/sections/legal.css'

defineProps({
  doc: { type: Object, required: true },
  /** pandoc 族（隐私/用户协议）正文含 h1 章节标题 + 表格，需要更宽的正文样式 */
  variant: { type: String, default: 'simple' },
})

const router = useRouter()

// v-html 里的站内 <a href="/xxx"> 拦截走 SPA 路由，避免整页刷新
const onBodyClick = (e) => {
  const a = e.target.closest('a')
  if (!a) return
  const href = a.getAttribute('href')
  if (!href || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#')) return
  e.preventDefault()
  router.push(href)
}
</script>
