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

        <!-- 按钮 -->
        <div class="hero-actions">
          <DownloadButton platform="android" variant="hero" />
          <DownloadButton platform="ios" variant="hero" />
        </div>
      </RevealOnScroll>

      <!-- ========== 右栏：三张对话截图扇形排列 ========== -->
      <div class="hotchain-right">
        <div class="dialogue-fan">
          <img class="dialogue-img dialogue-img--left" :src="IMAGES.dialog1" alt="对话" />
          <img class="dialogue-img dialogue-img--mid" :src="IMAGES.dialog2" alt="对话" />
          <img class="dialogue-img dialogue-img--right" :src="IMAGES.dialog3" alt="对话" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import { IMAGES } from '@/data/images'

const titleStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--fs-h1)',
  fontWeight: 700,
  lineHeight: 1.04,
  letterSpacing: '-0.01em',
}
</script>
