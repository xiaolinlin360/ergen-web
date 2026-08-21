<template>
  <strong ref="el">
    {{ shown }}{{ suffix }}
  </strong>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useInView, usePrefersReducedMotion } from '@/composables/useInView'

/**
 * CountUp — 进入视口时数字从 0 滚动到目标值
 */
const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  decimals: { type: Number, default: 0 },
  duration: { type: Number, default: 1600 },
})

const display = ref(0)
let raf = 0
let startTime = 0
let started = false

const reduced = usePrefersReducedMotion()

const tick = (now) => {
  if (!startTime) startTime = now
  const t = Math.min((now - startTime) / props.duration, 1)
  const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
  display.value = props.value * eased
  if (t < 1) raf = requestAnimationFrame(tick)
  else display.value = props.value
}

const startAnimation = () => {
  if (started) return
  started = true
  if (reduced.value) {
    display.value = props.value
    return
  }
  raf = requestAnimationFrame(tick)
}

const { el } = useInView({
  amount: 0.4,
  once: true,
  onEnter: startAnimation,
})

onBeforeUnmount(() => cancelAnimationFrame(raf))

const shown = computed(() =>
  props.decimals > 0 ? display.value.toFixed(props.decimals) : Math.round(display.value)
)
</script>
