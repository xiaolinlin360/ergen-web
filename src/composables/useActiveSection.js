import { ref, onMounted, onBeforeUnmount, watch, nextTick, unref } from 'vue'
import { useRoute } from 'vue-router'

/**
 * useActiveSection — 观察多个 section 元素，高亮当前最靠近视口中心的那个。
 * 同时处理“点击导航 → 锁定 → 平滑滚动 → 解锁”流程。
 *
 * @param {string[] | import('vue').Ref<string[]>} sectionIds - 要观察的 section id 列表（空数组则不启用）。可传响应式 ref/getter，路由切换时自动重建。
 * @param {Object} [options]
 * @param {string} [options.rootMargin='-8% 0px -8% 0px']
 * @param {number} [options.topThreshold=120] - 滚动到顶部多少 px 内时清空高亮
 * @returns {{ activeSection: import('vue').Ref<string>, scrollTo: (id: string) => void, lock: (ms: number) => void, goHome: () => void }}
 */
export function useActiveSection(sectionIds, options = {}) {
  const { rootMargin = '-8% 0px -8% 0px', topThreshold = 120 } = options
  const activeSection = ref('')
  const clickLockUntil = ref(0)
  let observer = null
  let scrollHandler = null

  // 统一成 getter：支持传数组、ref、或 () => 数组
  const getIds = () => {
    const v = typeof sectionIds === 'function' ? sectionIds() : unref(sectionIds)
    return v || []
  }

  const isLocked = () => Date.now() < clickLockUntil.value
  const lock = (ms) => {
    clickLockUntil.value = Date.now() + ms
  }

  const scrollTo = (id) => {
    lock(1500)
    activeSection.value = id
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const goHome = () => {
    lock(1500)
    activeSection.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setup = () => {
    const ids = getIds()
    if (!ids.length) return
    observer = new IntersectionObserver(
      (entries) => {
        if (isLocked()) return
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          activeSection.value = visible[0].target.id
        }
      },
      { rootMargin, threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    scrollHandler = () => {
      if (isLocked()) return
      if (window.scrollY < topThreshold) activeSection.value = ''
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
  }

  const teardown = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
      scrollHandler = null
    }
  }

  onMounted(setup)
  onBeforeUnmount(teardown)

  // 路由切换时重建（Home 的 section 与 Company 不同，sectionIds 会变）
  const route = useRoute()
  watch(
    () => route.name,
    () => {
      teardown()
      activeSection.value = ''
      nextTick(setup)
    }
  )

  return { activeSection, scrollTo, lock, goHome }
}
