<template>
  <div ref="el" :style="wrapperStyle">
    <slot />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * RevealOnScroll — 元素进入视口时触发入场动画
 * variant: 'fadeIn' | 'fadeUp' | 'popUp' | 'scaleIn'
 */
const props = defineProps({
  variant: { type: String, default: 'fadeUp' },
  delay: { type: Number, default: 0 },
  amount: { type: Number, default: 0.1 },
})

const el = ref(null)
const visible = ref(false)
let observer = null

const shift = computed(() => {
  switch (props.variant) {
    case 'fadeUp': return 40
    case 'popUp': return 60
    case 'scaleIn': return 40
    default: return 24
  }
})

const wrapperStyle = computed(() => {
  const transition = `opacity 0.6s var(--ease-out) ${props.delay}s, margin-top 0.6s var(--ease-out) ${props.delay}s`
  if (visible.value) {
    return { opacity: 1, marginTop: 0, transition }
  }
  return { opacity: 0, marginTop: `${shift.value}px`, transition }
})

onMounted(() => {
  const target = el.value
  if (!target) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.unobserve(target)
      }
    },
    { threshold: props.amount }
  )
  observer.observe(target)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
