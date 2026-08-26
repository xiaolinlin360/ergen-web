<template>
  <header class="site-nav" :class="{ 'is-scrolled': scrolled || menuOpen }">
    <nav class="site-nav-inner" aria-label="页面模块导航">
      <a href="#top" class="nav-logo" @click.prevent="$emit('navigate', '')">
        <span class="logo-icon" aria-hidden="true">
          <img :src="logoIcon" alt="" />
        </span>
        <span class="logo-text">折耳根<em>健康餐</em></span>
      </a>

      <div class="nav-links">
        <a
          href="#top"
          :class="{ 'is-active': activeId === '' }"
          @click.prevent="$emit('navigate', '')"
        >
          首页
        </a>
        <a
          v-for="item in items"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeId === item.id }"
          @click.prevent="$emit('navigate', item.id)"
        >
          {{ item.label }}
        </a>
      </div>

      <div v-if="showDownload" class="nav-actions">
        <DownloadButton platform="android" variant="nav" :show-qr="false" label="下载 App" />
      </div>

      <button
        class="nav-burger"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>

    <transition name="nav-menu">
      <div v-if="menuOpen" class="nav-mobile-panel">
        <a
          href="#top"
          :class="{ 'is-active': activeId === '' }"
          @click.prevent="onMobileNavigate('')"
        >
          首页
        </a>
        <a
          v-for="item in items"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeId === item.id }"
          @click.prevent="onMobileNavigate(item.id)"
        >
          {{ item.label }}
        </a>
        <DownloadButton
          v-if="showDownload"
          class="nav-mobile-cta"
          platform="android"
          variant="nav"
          :show-qr="false"
          label="下载 App"
        />
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DownloadButton from './DownloadButton.vue'

defineProps({
  items: { type: Array, default: () => [] },
  activeId: { type: String, default: '' },
  showDownload: { type: Boolean, default: true },
})

const emit = defineEmits(['navigate'])

const logoIcon = `${import.meta.env.BASE_URL}ic_launcher.svg`

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const onMobileNavigate = (id) => {
  menuOpen.value = false
  emit('navigate', id)
}
</script>
