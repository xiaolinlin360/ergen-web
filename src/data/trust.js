/**
 * @typedef {Object} TrustStat
 * @property {number} value - 数值
 * @property {string} suffix - 后缀
 * @property {string} label - 标签
 * @property {string} desc - 描述
 * @property {number} [decimals] - 小数位
 */

/** @type {TrustStat[]} */
export const trustStats = [
  { value: 12, suffix: '万+', label: '正在使用我们的app', desc: '来自全国各地的真实用户，每天都在用折耳根吃上热乎的健康餐' },
  { value: 300, suffix: '万+', label: '份健康餐已送达', desc: '从第一份到三百万份，每一份都是现炒现送、到手还是烫的' },
  { value: 200, suffix: '+', label: '合作健康餐商家', desc: '每一家入驻商家都经过实地考察与用户评分双重筛选' },
  { value: 94, suffix: '%', label: '热量匹配度', desc: '算法按你的身体数据配餐，热量精准匹配，蛋白质达标率自动锁定' },
]
