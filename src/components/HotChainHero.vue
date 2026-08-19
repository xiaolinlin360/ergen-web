<template>
  <section class="hotchain-hero section-panel panel-cream" aria-label="热链鲜送 AI 健康餐">
    <!-- 背景光斑 -->
    <div class="hc-bg-blobs" aria-hidden="true">
      <span class="hc-blob hc-blob--1" />
      <span class="hc-blob hc-blob--2" />
      <span class="hc-blob hc-blob--3" />
    </div>
    <div class="hotchain-grid hotchain-grid--center max-frame">
      <!-- ========== 品牌宣传区 ========== -->
      <RevealOnScroll
        variant="fadeUp"
        :amount="0.1"
        class="hotchain-left hotchain-left--center"
      >
        <!-- 标题+描述 -->
        <div class="hotchain-hero-text">
          <h1
            class="hotchain-title hotchain-title--plain"
            :style="titleStyle"
          >
            你的身体数据，决定你每一餐
          </h1>
          <p class="hotchain-desc hotchain-desc--wide">
            告诉小折你的身体数据，它配好餐送到你手上
          </p>
        </div>

        <!-- 按钮：照搬原 Hero 的下载按钮 -->
        <div class="hero-actions">
          <div class="download-btn-group">
            <a
              class="hero-dl-btn"
              href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" /></svg>
              Android 下载
            </a>
            <div class="download-qr-pop">
              <img src="/images/qrcode.webp" alt="扫码下载" />
              <span>手机扫码下载</span>
            </div>
          </div>
          <div class="download-btn-group">
            <a
              class="hero-dl-btn"
              href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/icon-apple.svg"
                alt=""
                :style="{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }"
              />
              iOS 下载
            </a>
            <div class="download-qr-pop">
              <img src="/images/qrcode.webp" alt="扫码下载" />
              <span>手机扫码下载</span>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <!-- ========== 右栏：三张对话截图扇形排列 ========== -->
      <div class="hotchain-right">
        <div class="dialogue-fan">
          <img class="dialogue-img dialogue-img--left" src="/images/dialog-1.webp" alt="对话" />
          <img class="dialogue-img dialogue-img--mid" src="/images/dialog-2.webp" alt="对话" />
          <img class="dialogue-img dialogue-img--right" src="/images/dialog-3.webp" alt="对话" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import RevealOnScroll from './RevealOnScroll.vue'

const titleStyle = reactive({
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--fs-h1)',
  fontWeight: 700,
  lineHeight: 1.04,
  letterSpacing: '-0.01em',
})
</script>
