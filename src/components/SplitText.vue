<script>
import { h, defineComponent } from 'vue'
import { useInView } from '@/composables/useInView'

/**
 * SplitText — 把文字拆成字符，进入视口时按从左到右、从下往上的顺序逐字冒出。
 * - 纯文本：逐字符动画
 * - 内嵌元素（如 <span>）：整体作为一个动画单元（不破坏内部效果）
 * 位移使用 transform，作用在每个字符的 inline-block <span> 上，
 * 不会像外层容器的 transform 那样破坏页面布局/绝对定位。
 *
 * 用法：<SplitText :stagger="0.012">文本或 <span>...</span></SplitText>
 * 注意：作为标签包裹其它内容时用默认插槽，自定义 tag 用 :as。
 */

function toUnits(children) {
  const units = []
  const walk = (nodes) => {
    for (const node of nodes || []) {
      if (node == null || node === false || node === true) continue
      if (typeof node === 'string' || typeof node === 'number') {
        const str = String(node)
        for (const ch of str) {
          if (ch.trim() === '') units.push({ kind: 'space', value: ch })
          else units.push({ kind: 'char', value: ch })
        }
      } else if (Array.isArray(node)) {
        walk(node)
      } else if (node.type) {
        if (typeof node.type === 'symbol') {
          // 文本 vnode（纯文本 / 插值文本）→ 深入 children 逐字拆分，保留逐字浮现效果
          walk(node.children)
        } else {
          // 元素 / 组件 vnode → 整体作为一个动画单元
          units.push({ kind: 'node', value: node })
        }
      } else {
        units.push({ kind: 'space', value: String(node) })
      }
    }
  }
  walk(children)
  return units
}

export default defineComponent({
  name: 'SplitText',
  props: {
    as: { type: String, default: 'span' },
    stagger: { type: Number, default: 0.06 },
    baseDelay: { type: Number, default: 0 },
    amount: { type: Number, default: 0.2 },
    charClassName: { type: String, default: '' },
  },
  setup(props, { slots, attrs }) {
    const { el, inView } = useInView({ amount: props.amount, once: true })

    return () => {
      const units = toUnits(slots.default ? slots.default() : [])
      let order = 0
      const charSpans = units.map((u, i) => {
        if (u.kind === 'space') {
          return u.value
        }
        const delay = props.baseDelay + order * props.stagger
        order += 1
        const style = {
          display: 'inline-block',
          opacity: inView.value ? 1 : 0,
          transform: inView.value ? 'translateY(0)' : 'translateY(0.5em)',
          transition: `opacity 0.7s var(--ease-out) ${delay}s, transform 0.7s var(--ease-out) ${delay}s`,
        }
        return h(
          'span',
          { key: i, class: props.charClassName || undefined, style },
          u.kind === 'node' ? [u.value] : u.value
        )
      })
      return h(
        props.as,
        {
          ref: el,
          class: attrs.class,
          style: attrs.style,
        },
        charSpans
      )
    }
  },
})
</script>
