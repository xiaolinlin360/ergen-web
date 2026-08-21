<template>
  <section class="story-section story-pain section-panel panel-cream" id="pain" aria-label="健康饮食的困扰">
    <RevealOnScroll variant="fadeUp" :amount="0.1" class="story-inner story-pain-inner">
      <h2 class="story-pain-title">每天三顿饭，三件烦心事</h2>
      <p class="story-pain-sub">每件都在让你放弃好好吃饭</p>
      <PainSplit />
    </RevealOnScroll>
  </section>
</template>

<script setup>
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import PainSplit from './PainSplit.vue'
</script>
