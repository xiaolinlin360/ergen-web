<template>
  <section class="story-section section-panel panel-cream" id="pricing" aria-label="价格">
    <div class="story-inner pricing-inner">
      <h2 class="pricing-title">一顿外卖的价，吃定制健康餐</h2>
      <p class="pricing-sub">订得越长，单餐越省。</p>
      <div class="price-grid-inline">
        <RevealOnScroll
          v-for="(plan, i) in pricingPlans"
          :key="plan.name"
          :delay="i * 0.12"
          :amount="0.1"
          variant="scaleIn"
          class="price-card-wrap"
        >
          <article :class="['price-card', { 'price-card--hot': plan.hot }]">
            <div class="price-card-head">
              <h3 class="price-card-name">
                <SplitText>{{ plan.name }}</SplitText>
              </h3>
              <div class="price-card-price">
                <span class="price-card-cur">¥</span>
                <strong class="price-card-num">{{ plan.price }}</strong>
              </div>
              <div class="price-card-meta">
                <span class="price-per-glass">{{ plan.per }}</span>
                <span class="price-card-spec">{{ plan.spec }}</span>
              </div>
            </div>
            <div class="price-card-features">
              <p class="price-card-feat-lead">每份餐均含：</p>
              <p>✓ AI 定制餐单</p>
              <p>✓ 热链配送到手</p>
            </div>
            <DownloadButton
              :platform="plan.platform || 'android'"
              variant="pricing"
              :show-qr="true"
              :label="plan.cta"
              class="price-cta"
            />
          </article>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<script setup>
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import SplitText from '@/components/SplitText.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import { pricingPlans } from '@/data/pricing'
</script>
