<template>
  <section class="story-section section-panel panel-cream" id="pricing" aria-label="价格">
    <div class="story-inner" :style="{ paddingBottom: '80px', width: 'min(1320px, calc(100% - 40px))' }">
      <h2 :style="{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h2)', fontWeight: 680, textAlign: 'center', marginBottom: '20px' }">
        一顿外卖的价，吃定制健康餐
      </h2>
      <p :style="{ textAlign: 'center', color: '#000', fontSize: 'var(--fs-lede)', fontWeight: 400, margin: '0 0 44px' }">
        订得越长，单餐越省。
      </p>
      <div class="price-grid-inline" :style="{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', margin: '0 auto', alignItems: 'stretch' }">
        <RevealOnScroll
          v-for="(plan, i) in pricingPlans"
          :key="plan.name"
          :delay="i * 0.12"
          :amount="0.1"
          variant="scaleIn"
          :style="{ height: '100%' }"
        >
          <article :style="cardStyle(plan)">
            <div :style="{ marginBottom: '20px' }">
              <h3 :style="{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#000' }">
                <SplitText>{{ plan.name }}</SplitText>
              </h3>
              <div :style="{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '18px' }">
                <span :style="{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#000' }">¥</span>
                <strong :style="{ fontSize: 'clamp(50px, 4vw, 66px)', fontWeight: 700, lineHeight: 1, color: '#000' }">{{ plan.price }}</strong>
              </div>
              <div :style="{ marginTop: '10px' }">
                <span class="price-per-glass">{{ plan.per }}</span>
                <span :style="{ display: 'block', marginTop: '10px', color: '#000', fontSize: '15px' }">{{ plan.spec }}</span>
              </div>
            </div>
            <div :style="{ marginTop: '20px', padding: '16px 0', borderTop: '1px solid var(--line-cream)', color: '#000', fontSize: '15px', lineHeight: 1.6 }">
              <p :style="{ margin: '0 0 8px', fontWeight: 600, color: '#000' }">每份餐均含：</p>
              <p :style="{ margin: '0 0 4px' }">✓ AI 定制餐单</p>
              <p :style="{ margin: 0 }">✓ 热链配送到手</p>
            </div>
            <DownloadButton
              :platform="plan.platform || 'android'"
              variant="pricing"
              :show-qr="true"
              :label="plan.cta"
              :custom-style="ctaStyle"
              class="price-cta-wrap"
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

const cardStyle = (plan) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 'clamp(24px, 3vw, 40px) clamp(24px, 3.5vw, 60px) 38px',
  height: '100%',
  border: '1px solid rgba(43,31,20,0.06)',
  borderRadius: 'var(--r-2xl)',
  background: '#ffffff',
  boxShadow: plan.hot
    ? '0 26px 68px rgba(5,150,105,0.16)'
    : '0 18px 48px rgba(43,31,20,0.06)',
  transition: 'transform 220ms ease',
})

const ctaStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '54px',
  padding: '14px 26px',
  borderRadius: '999px',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.55)',
  background: 'linear-gradient(135deg, rgba(110,231,183,0.85), rgba(5,150,105,0.9))',
  fontWeight: 700,
  fontSize: '16px',
  textDecoration: 'none',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 16px 38px rgba(5,150,105,0.3)',
}
</script>

<style scoped>
/* pricing variant：下载按钮容器贴到卡片底部 */
.price-cta-wrap :deep(.download-btn-group) {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}
</style>
