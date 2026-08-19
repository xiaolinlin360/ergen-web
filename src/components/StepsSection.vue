<template>
  <section
    ref="sectionRef"
    class="story-section story-steps section-panel panel-cream"
    id="steps"
    aria-label="使用流程"
  >
    <div class="story-inner steps-sticky-layout">
      <!-- 标题 -->
      <div class="steps-new-head">
        <h2>三步，每天准时开饭</h2>
        <p class="steps-new-sub">
          填一次数据、确认偏好、准时就餐——把吃饭这件麻烦事，交给小折全程托管。
        </p>
      </div>

      <!-- 左栏滚动步骤 + 右栏钉住手机图 -->
      <div class="steps-scroll-wrap">
        <div class="steps-scroll-left">
          <div
            v-for="(step, i) in steps"
            :key="step.no"
            :ref="(el) => setBlockRef(el, i)"
            :data-idx="i"
            :class="['steps-scroll-block', { 'is-active': i === activeStep }]"
          >
            <div class="steps-new-text">
              <div class="steps-title-row">
                <span class="steps-new-no">{{ step.no }}</span>
                <h3>{{ step.title }}</h3>
              </div>
              <p>{{ step.desc }}</p>
            </div>
            <!-- 移动端：每步下方直接带一张图（成对展示） -->
            <div class="steps-mobile-phone">
              <img
                :src="step.image"
                :alt="`${step.title}示意`"
                width="240"
                height="496"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <!-- 右栏：sticky 钉住的图片，随滚动切换 -->
        <div class="steps-sticky-right">
          <div class="steps-sticky-phone">
            <div
              v-for="(step, i) in steps"
              :key="step.no"
              :class="['steps-slide', { 'is-active': i === activeStep }]"
              :aria-hidden="i !== activeStep"
            >
              <img
                :src="step.image"
                :alt="`${step.title}示意`"
                width="300"
                height="620"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const steps = [
  { no: '01', title: '填数据', desc: '性别、年龄、身高、体重、活动量——填一次，有变化才改。', image: '/images/dialog-1.webp' },
  { no: '02', title: '小折配餐', desc: '匹配偏好，确认执行，不用算，不用选，不用纠结。', image: '/images/dialog-2.webp' },
  { no: '03', title: '热链送达', desc: '每日现做，准时送达，入口新鲜。', image: '/images/dialog-3.webp' },
]

const activeStep = ref(0)
const blockRefs = ref([])
const sectionRef = ref(null)
const activeRef = ref(0)

const setBlockRef = (el, i) => {
  blockRefs.value[i] = el
}

/* 滚动驱动：哪一步的文字块离屏幕正中央最近，就显示对应的图 */
let ticking = false
let onScroll = null
let onResize = null

/* 滚轮劫持：切到 02 时锁住页面不滚动，向下滚动累积到阈值才切到 03 */
let accum = 0
let onWheel = null

onMounted(() => {
  const update = () => {
    const section = sectionRef.value
    const blocks = blockRefs.value
    if (!section || !blocks.length) return
    const vh = window.innerHeight || document.documentElement.clientHeight
    const center = vh / 2

    let best = 0
    let bestDist = Infinity
    blocks.forEach((b, i) => {
      if (!b) return
      const r = b.getBoundingClientRect()
      const blockCenter = r.top + r.height / 2
      const dist = Math.abs(blockCenter - center)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    activeStep.value = best
    activeRef.value = best
    ticking = false
  }

  onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  onResize = onScroll
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  /* 滚动劫持：仅桌面端，且仅在显示 02 且继续向下滚时劫持 */
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches
  onWheel = (e) => {
    if (isMobile()) return
    if (activeRef.value === 1 && e.deltaY > 0) {
      e.preventDefault()
      accum += e.deltaY
      if (accum >= 160) {
        accum = 0
        activeStep.value = 2
        activeRef.value = 2
      }
    } else {
      accum = 0
    }
  }
  window.addEventListener('wheel', onWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('wheel', onWheel)
})
</script>
