<template>
  <div
    class="pain-split"
    ref="el"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <div class="pain-split-left">
      <div class="pain-split-stage">
        <div
          v-for="(point, i) in painPoints"
          :key="point.keyword"
          :class="[
            'pain-split-slide',
            { 'is-active': i === activeImg, 'slide-down': direction > 0, 'slide-up': direction <= 0 },
          ]"
        >
          <img :src="point.image" :alt="point.desc" loading="eager" />
        </div>
      </div>
    </div>
    <div class="pain-split-right">
      <div
        v-for="(point, i) in painPoints"
        :key="point.keyword"
        :class="['pain-split-row', { 'is-active': i === activeImg }]"
        @mouseenter="switchTo(i)"
      >
        <span class="pain-split-kw">{{ point.keyword }}</span>
        <span class="pain-split-desc">{{ point.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useInView, usePrefersReducedMotion } from '@/composables/useInView'
import { painPoints } from '@/data/pain'

const activeImg = ref(0)
const direction = ref(1) /* 1=向下转入, -1=向上转出 */
const paused = ref(false)

const reduced = usePrefersReducedMotion()

/* once: false → 进出视口都更新 inView，离开时停轮播 */
const { el, inView } = useInView({
  amount: 0.2,
  once: false,
})

const switchTo = (i) => {
  direction.value = i > activeImg.value ? 1 : -1
  activeImg.value = i
}

let timer = null

onMounted(() => {
  /* 自动轮播：3.5s 切一张，鼠标悬停/减动偏好/不在视口时暂停 */
  timer = setInterval(() => {
    if (paused.value || !inView.value || reduced.value) return
    direction.value = 1
    activeImg.value = (activeImg.value + 1) % painPoints.length
  }, 3500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
