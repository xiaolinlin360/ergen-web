<template>
  <main class="site-shell">
    <div class="grain" aria-hidden="true" />
    <div class="global-blobs" aria-hidden="true">
      <span class="s-blob s-blob-1" />
      <span class="s-blob s-blob-2" />
      <span class="s-blob s-blob-3" />
    </div>
    <nav class="sub-nav is-visible" aria-label="页面模块导航">
      <div class="sub-nav-inner">
        <a
          href="#top"
          :class="{ 'is-active': activeSection === '' }"
          @click.prevent="goHome"
        >
          首页
        </a>
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeSection === item.id }"
          @click.prevent="goSection(item.id)"
        >
          {{ item.label }}
        </a>
        <a
          href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk"
          class="sub-nav-dl"
          target="_blank"
          rel="noreferrer"
        >
          下载 App
          <img src="/images/icon-download.svg" alt="" class="sub-nav-dl-icon" />
        </a>
      </div>
    </nav>
    <HotChainHero />
    <PainSection />
    <AnswerSection />
    <StepsSection />
    <PricingInline />
    <TrustSection />
    <FaqSection />
    <DownloadSection />
    <SiteFooter />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HotChainHero from './HotChainHero.vue'
import PainSection from './PainSection.vue'
import AnswerSection from './AnswerSection.vue'
import StepsSection from './StepsSection.vue'
import PricingInline from './PricingInline.vue'
import TrustSection from './TrustSection.vue'
import FaqSection from './FaqSection.vue'
import DownloadSection from './DownloadSection.vue'
import SiteFooter from './SiteFooter.vue'

const activeSection = ref('')
const clickLockUntil = ref(0)

const navItems = [
  { id: 'pain', label: '饮食痛点' },
  { id: 'answer', label: '食材溯源' },
  { id: 'steps', label: '怎么吃' },
  { id: 'pricing', label: '价格' },
  { id: 'trust', label: '口碑' },
  { id: 'faq', label: '常见问题' },
]

const sectionIds = ['pain', 'answer', 'steps', 'pricing', 'trust', 'faq']

let observer = null
let scrollHandler = null

const isLocked = () => Date.now() < clickLockUntil.value

const goHome = () => {
  clickLockUntil.value = Date.now() + 1500
  activeSection.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goSection = (id) => {
  clickLockUntil.value = Date.now() + 1500
  activeSection.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (isLocked()) return
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length > 0) {
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        activeSection.value = visible[0].target.id
      }
    },
    { rootMargin: '-8% 0px -8% 0px', threshold: 0 }
  )
  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  const onScroll = () => {
    if (isLocked()) return
    if (window.scrollY < 120) activeSection.value = ''
  }
  scrollHandler = onScroll
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>
