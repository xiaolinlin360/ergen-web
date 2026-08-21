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
import { trustStats } from '@/data/trust'
</script>
