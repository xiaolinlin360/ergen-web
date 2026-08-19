<template>
  <section class="download section-panel panel-cream" id="download" aria-label="下载百度网盘">
    <div class="download-baidu-inner max-frame">
      <RevealOnScroll variant="fadeUp" :amount="0.1">
        <h2 class="download-baidu-title"><SplitText>下载折耳根健康餐</SplitText></h2>
      </RevealOnScroll>

      <div class="download-platforms" aria-label="支持的平台">
        <RevealOnScroll
          v-for="(p, i) in downloadPlatforms"
          :key="p.label"
          :delay="i * 0.08"
          :amount="0.1"
          variant="popUp"
        >
          <div
            :class="[
              'platform-card',
              { 'platform-card--dl': p.dl, 'platform-card--qr': p.qr },
            ]"
          >
            <div v-if="p.dl" class="platform-dl-hint">
              <div class="dl-circle">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
              <span class="dl-text">{{ p.dl }}</span>
            </div>
            <div v-if="p.qr" class="platform-qr-hint">
              <img :src="p.qr" :alt="`${p.label} 扫码下载`" class="qr-hint-img" />
              <span class="qr-hint-text">扫码下载 {{ p.label }} 版</span>
            </div>
            <div class="platform-icon">
              <img
                v-if="p.img"
                :src="p.img"
                :alt="p.label"
                :style="{ width: 48, height: 48 }"
              />
            </div>
            <span class="platform-label">{{ p.label }}</span>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<script setup>
import RevealOnScroll from './RevealOnScroll.vue'
import SplitText from './SplitText.vue'

const downloadPlatforms = [
  { img: '/images/icon-win.svg', label: 'Windows', dl: '点击下载 Windows 版' },
  { img: '/images/icon-apple.svg', label: 'Mac OS', dl: '点击下载 Mac 版' },
  { img: '/images/icon-phone.svg', label: '手机', qr: '/images/qrcode-dl.webp' },
  { img: '/images/icon-tablet.svg', label: '平板', qr: '/images/qrcode-dl.webp' },
]
</script>
