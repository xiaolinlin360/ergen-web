<template>
  <section class="story-section story-trust trust-dark" id="trust" aria-label="口碑">
    <RevealOnScroll variant="fadeUp" :amount="0.1" class="story-inner story-trust-inner">
      <div class="trust-head">
        <h2>
          <SplitText>12万+人，<span>已经换了种方式吃饭</span></SplitText>
        </h2>
        <p class="trust-sub">
          <SplitText :stagger="0.012">每一个数字背后，都是用户对我们的认可</SplitText>
        </p>
      </div>

      <div class="trust-strip" aria-label="平台数据">
        <template v-for="(stat, i) in trustStats" :key="stat.label">
          <span v-if="i > 0" class="trust-strip-divider" />
          <div class="trust-strip-item">
            <CountUp :value="stat.value" :suffix="stat.suffix" :decimals="stat.decimals || 0" />
            <span class="trust-strip-label">{{ stat.label }}</span>
            <span class="trust-strip-desc">{{ stat.desc }}</span>
          </div>
        </template>
      </div>
    </RevealOnScroll>
  </section>
</template>

<script setup>
import RevealOnScroll from './RevealOnScroll.vue'
import SplitText from './SplitText.vue'
import CountUp from './CountUp.vue'

const trustStats = [
  { value: 12, suffix: '万+', label: '正在使用我们的app', desc: '来自全国各地的真实用户，每天都在用折耳根吃上热乎的健康餐' },
  { value: 300, suffix: '万+', label: '份健康餐已送达', desc: '从第一份到三百万份，每一份都是现炒现送、到手还是烫的' },
  { value: 200, suffix: '+', label: '合作健康餐商家', desc: '每一家入驻商家都经过实地考察与用户评分双重筛选' },
  { value: 94, suffix: '%', label: '热量匹配度', desc: '算法按你的身体数据配餐，热量精准匹配，蛋白质达标率自动锁定' },
]
</script>
