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

const faqs = [
  {
    q: 'AI怎么算出我该吃多少？',
    a: '你告诉它性别、年龄、身高、体重和活动量，小折帮你算出每天该吃多少热量——这不是猜的，是基于你的真实数据算出来的。然后根据你的口味偏好和饮食目标，匹配最适合你的餐。你确认，餐送到手。',
  },
  {
    q: '配送范围覆盖哪些城市？',
    a: '目前已覆盖上海、北京、深圳、杭州、成都的主城区，并在持续拓展。下单前App会根据你的收货地址自动校验能否送达。',
  },
  {
    q: '能看到每餐的热量和营养成分吗？',
    a: '当然能。每份餐都标注了热量、蛋白质、碳水和脂肪含量，App里还能按天查看三大营养素占比，比你自己做笔记还清楚。',
  },
  {
    q: '配送怎么保证到手还是热的？',
    a: '合作餐厅现做后直接装入保温箱，由骑手专送，到手中心温度≥60℃，开盖即食，不用微波炉加热。冷天配送有保温袋，确保你拿到的每一餐都是烫的。',
  },
  {
    q: '吃这个真的能瘦/增重吗？',
    a: '取决于你实际摄入与消耗的热量差。小折推荐的热量是基于你的TEE和BMI算出来的——选低于TEE的规格会减重，选高于TEE的规格会增重。但长期效果也取决于你每餐是否按时吃、中间有没有额外加餐或漏餐。小折会按你选的方案持续推进，你吃满一个周期，效果自然看得到。',
  },
]

const openSet = ref([])

const toggle = (i) => {
  const open = openSet.value.includes(i)
  openSet.value = open
    ? openSet.value.filter((x) => x !== i)
    : [...openSet.value, i]
}
</script>
