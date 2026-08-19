<template>
  <section class="story-section story-answer section-panel panel-cream" id="answer">
    <div class="story-inner story-answer-inner" aria-label="食材溯源">
      <div class="ingredient-head">
        <RevealOnScroll variant="fadeIn" :amount="0.1">
          <h2 style="color: #000000">你吃的每一口，都有来处</h2>
          <p>每一份食材标明产地、供应商，来源透明。</p>
        </RevealOnScroll>
      </div>
      <div class="ingredient-grid">
        <RevealOnScroll
          v-for="(item, i) in ingredients"
          :key="item.name"
          :delay="i * 0.08"
          :amount="0.1"
          variant="popUp"
        >
          <article class="ingredient-card split">
            <div class="ingredient-img">
              <img :src="item.img" :alt="item.name" loading="lazy" />
            </div>
            <div class="ingredient-body">
              <h4 class="ingredient-name">{{ item.name }}</h4>
              <span class="ingredient-desc">{{ item.desc }}</span>
              <div class="ingredient-nutri">
                <span class="ingredient-nutri-label">来源说明</span>
                <p>{{ item.source }}</p>
              </div>
            </div>
          </article>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<script setup>
import RevealOnScroll from './RevealOnScroll.vue'

const ingredients = [
  { img: '/images/salad.webp', name: '新鲜蔬果', desc: '当日直采·不囤货', source: '餐厅当天采购、当天使用' },
  { img: '/images/quinoa.webp', name: '优质杂粮', desc: '产地直供·可溯源', source: '源头可查，品质稳定' },
  { img: '/images/tuna.webp', name: '海鲜蛋奶', desc: '冷链直达·每日到货', source: '当天到货、当天使用' },
  { img: '/images/chicken.webp', name: '新鲜肉类', desc: '资质定期复查', source: '正规屠场宰杀，可追溯' },
]
</script>
