<template>
  <strong ref="el">
    {{ shown }}{{ suffix }}
  </strong>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * CountUp — 进入视口时数字从 0 滚动到目标值
 */
const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  decimals: { type: Number, default: 0 },
  duration: { type: Number, default: 1600 },
})

const el = ref(null)
const display = ref(0)

let raf = 0
let startTime = 0
let started = false
let io = null

onMounted(() => {
  const target = el.value
  if (!target) return

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    display.value = props.value
    return
  }

  const tick = (now) => {
    if (!startTime) startTime = now
    const t = Math.min((now - startTime) / props.duration, 1)
    const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
    display.value = props.value * eased
    if (t < 1) raf = requestAnimationFrame(tick)
    else display.value = props.value
  }

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true
          raf = requestAnimationFrame(tick)
          io.disconnect()
        }
      })
    },
    { threshold: 0.4 }
  )
  io.observe(target)
})

onUnmounted(() => {
  if (io) io.disconnect()
  cancelAnimationFrame(raf)
})

const shown = computed(() =>
  props.decimals > 0 ? display.value.toFixed(props.decimals) : Math.round(display.value)
)
</script>
