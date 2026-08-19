<template>
  <div
    class="pain-split"
    ref="wrapRef"
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

const painPoints = [
  { keyword: '外卖重油重盐', tag: '饮食困境', desc: '吃完心里难受，罪恶感爆棚', image: '/images/pain-takeout.webp' },
  { keyword: '自己做费时费力', tag: '时间成本', desc: '买菜洗切炒刷碗，没时间也没精力', image: '/images/pain-headache.webp' },
  { keyword: '减脂餐难吃', tag: '恶性循环', desc: '坚持不过第三天，最后还是炸鸡奶茶兜底', image: '/images/pain-friedchicken.webp' },
]

const activeImg = ref(0)
const direction = ref(1) /* 1=向下转入, -1=向上转出 */
const paused = ref(false)
const inView = ref(true)
const wrapRef = ref(null)

let io = null
let timer = null

const switchTo = (i) => {
  direction.value = i > activeImg.value ? 1 : -1
  activeImg.value = i
}

onMounted(() => {
  const el = wrapRef.value
  if (!el || typeof IntersectionObserver === 'undefined') return
  io = new IntersectionObserver(
    ([entry]) => { inView.value = entry.isIntersecting },
    { threshold: 0.2 }
  )
  io.observe(el)

  /* 自动轮播：3.5s 切一张，鼠标悬停/减动偏好/不在视口时暂停 */
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  timer = setInterval(() => {
    if (paused.value || !inView.value) return
    if (prefersReduced) return
    direction.value = 1
    activeImg.value = (activeImg.value + 1) % painPoints.length
  }, 3500)
})

onUnmounted(() => {
  if (io) io.disconnect()
  if (timer) clearInterval(timer)
})
</script>
