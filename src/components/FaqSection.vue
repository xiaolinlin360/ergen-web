<template>
  <section class="faq section-panel panel-cream" id="faq" aria-label="常见问题">
    <div class="story-inner faq-inner">
      <div class="faq-split">
        <div class="faq-head">
          <h2 class="faq-title"><SplitText>常见问题</SplitText></h2>
          <p class="faq-sub">
            <SplitText :stagger="0.012">关于配送、热量、效果，这里回答了你能想到的</SplitText>
          </p>
        </div>
        <ul class="faq-list">
          <RevealOnScroll
            v-for="(item, i) in faqs"
            :key="item.q"
            :delay="i * 0.06"
            :amount="0.08"
            variant="fadeIn"
          >
            <li :class="['faq-item', { 'is-open': openSet.includes(i) }]">
              <button
                type="button"
                class="faq-q-row"
                :aria-expanded="openSet.includes(i)"
                @click="toggle(i)"
              >
                <span class="faq-q">{{ item.q }}</span>
                <svg
                  class="faq-chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div class="faq-a-wrap">
                <span class="faq-a">{{ item.a }}</span>
              </div>
            </li>
          </RevealOnScroll>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import RevealOnScroll from './RevealOnScroll.vue'
import SplitText from './SplitText.vue'
import { faqs } from '@/data/faq'

const openSet = ref([])

const toggle = (i) => {
  const open = openSet.value.includes(i)
  openSet.value = open
    ? openSet.value.filter((x) => x !== i)
    : [...openSet.value, i]
}
</script>
