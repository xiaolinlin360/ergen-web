<template>
  <nav class="sub-nav is-visible" aria-label="页面模块导航">
    <div class="sub-nav-inner">
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
      <DownloadButton
        v-if="showDownload"
        platform="android"
        variant="nav"
        :show-qr="false"
        label="下载 App"
      />
    </div>
  </nav>
</template>

<script setup>
import DownloadButton from './DownloadButton.vue'

defineProps({
  items: { type: Array, default: () => [] },
  activeId: { type: String, default: '' },
  showDownload: { type: Boolean, default: true },
})

defineEmits(['navigate'])
</script>
