import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * 非响应式版，供 composable 内部判断用。
 */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * usePrefersReducedMotion — 响应式读取 prefers-reduced-motion 偏好。
 * @returns {import('vue').Ref<boolean>}
 */
export function usePrefersReducedMotion() {
  const reduced = ref(false)
  if (typeof window === 'undefined' || !window.matchMedia) return reduced
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  const handler = (e) => {
    reduced.value = e.matches
  }
  mq.addEventListener?.('change', handler)
  onBeforeUnmount(() => mq.removeEventListener?.('change', handler))
  return reduced
}

/**
 * useInView — 统一封装 IntersectionObserver。
 *
 * @param {Object} options
 * @param {number} [options.amount=0] - threshold，0~1
 * @param {string} [options.rootMargin='0px'] - rootMargin
 * @param {boolean} [options.once=true] - 是否只触发一次（true：进入后 unobserve）
 * @param {(entry: IntersectionObserverEntry) => void} [options.onEnter] - 进入视口回调
 * @param {(entry: IntersectionObserverEntry) => void} [options.onLeave] - 离开视口回调（仅 once=false 时触发）
 * @param {boolean} [options.respectReducedMotion=true] - 是否在 prefers-reduced-motion 下直接置 inView=true
 * @returns {{ el: import('vue').Ref<HTMLElement|null>, inView: import('vue').Ref<boolean>, stop: () => void }}
 */
export function useInView(options = {}) {
  const {
    amount = 0,
    rootMargin = '0px',
    once = true,
    onEnter,
    onLeave,
    respectReducedMotion = true,
  } = options

  const el = ref(null)
  const inView = ref(false)
  let observer = null

  onMounted(() => {
    const target = el.value
    if (!target) return

    if (typeof IntersectionObserver === 'undefined') {
      inView.value = true
      onEnter?.({ isIntersecting: true, target })
      return
    }

    if (respectReducedMotion && prefersReducedMotion()) {
      inView.value = true
      onEnter?.({ isIntersecting: true, target })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inView.value = true
            onEnter?.(entry)
            if (once) {
              observer.unobserve(target)
              observer = null
            }
          } else if (!once) {
            inView.value = false
            onLeave?.(entry)
          }
        }
      },
      { threshold: amount, rootMargin }
    )
    observer.observe(target)
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  const stop = () => {
    if (observer && el.value) {
      observer.unobserve(el.value)
      observer.disconnect()
      observer = null
    }
  }

  return { el, inView, stop }
}
