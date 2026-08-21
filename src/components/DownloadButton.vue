<template>
  <div class="download-btn-group" :class="`download-btn-group--${variant}`">
    <a
      :class="anchorClass"
      :href="href"
      :target="href === '#' ? '_self' : '_blank'"
      :rel="href === '#' ? '' : 'noreferrer'"
      :style="customStyle"
    >
      <img
        v-if="platform === 'ios' || platform === 'mac'"
        src="/images/icon-apple.svg"
        alt=""
        class="hero-dl-icon"
      />
      <svg
        v-else-if="platform === 'android'"
        class="hero-dl-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"
        />
      </svg>
      <img
        v-else-if="platform === 'windows'"
        src="/images/icon-win.svg"
        alt=""
        class="hero-dl-icon"
      />
      {{ label }}
    </a>
    <div v-if="showQr" class="download-qr-pop">
      <img :src="DOWNLOAD_QR_IMAGE" alt="扫码下载" />
      <span>手机扫码下载</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { DOWNLOAD_URLS, DOWNLOAD_QR_IMAGE } from '@/constants/download'

const props = defineProps({
  platform: {
    type: String,
    default: 'android',
    validator: (v) => ['android', 'ios', 'windows', 'mac'].includes(v),
  },
  variant: {
    type: String,
    default: 'hero',
    validator: (v) => ['hero', 'pricing', 'nav'].includes(v),
  },
  showQr: { type: Boolean, default: true },
  label: { type: String, default: null },
  /** pricing variant 下透传到 <a> 的自定义样式（保留原 CTA 渐变） */
  customStyle: { type: Object, default: null },
})

const href = computed(() => DOWNLOAD_URLS[props.platform] || '#')

const defaultLabels = {
  android: 'Android 下载',
  ios: 'iOS 下载',
  windows: 'Windows 下载',
  mac: 'Mac 下载',
}
const label = computed(() => props.label || defaultLabels[props.platform])

const anchorClass = computed(() => {
  if (props.variant === 'nav') return 'sub-nav-dl'
  return 'hero-dl-btn'
})
</script>

<style scoped>
/* icon 尺寸统一：Apple/Win 是 <img>，Android 是 <svg>，用同一个 class 对齐 */
.hero-dl-icon {
  width: 20px;
  height: 20px;
}
img.hero-dl-icon {
  filter: brightness(0) invert(1);
}
</style>
