<template>
  <main class="site-shell" :class="{ 'company-page': isCompany }">
    <div class="grain" aria-hidden="true" />
    <div v-if="!isCompany" class="global-blobs" aria-hidden="true">
      <span class="s-blob s-blob-1" />
      <span class="s-blob s-blob-2" />
      <span class="s-blob s-blob-3" />
    </div>

    <SiteNav
      v-if="!isCompany"
      :items="navItems"
      :active-id="activeSection"
      :show-download="true"
      @navigate="handleNavigate"
    />

    <router-link
      v-if="isCompany"
      to="/"
      class="company-back-btn"
      aria-label="返回首页"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      <span>返回首页</span>
    </router-link>

    <router-view />

    <SiteFooter />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { navItems } from '@/data/nav'

const route = useRoute()
const isCompany = computed(() => route.name === 'company')

const sectionIds = computed(() =>
  isCompany.value ? [] : navItems.map((i) => i.id)
)

const { activeSection, scrollTo, goHome } = useActiveSection(
  () => sectionIds.value,
  {
    rootMargin: '-8% 0px -8% 0px',
    topThreshold: 120,
  }
)

const handleNavigate = (id) => {
  if (id === '') {
    goHome()
  } else {
    scrollTo(id)
  }
}
</script>
