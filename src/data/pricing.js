/**
 * @typedef {Object} PricingPlan
 * @property {string} name - 方案名
 * @property {number} price - 价格
 * @property {string} per - 单餐折算
 * @property {string} spec - 规格
 * @property {string} cta - 按钮文案
 * @property {boolean} [hot] - 是否热门
 * @property {('android'|'ios'|'windows'|'mac')} [platform] - 下载平台（默认 android）
 */

/** @type {PricingPlan[]} */
export const pricingPlans = [
  { name: '3天尝鲜', price: 228, per: '≈¥38/餐', spec: '3天·6餐', cta: '试3天', platform: 'android' },
  { name: '7天周计划', price: 476, per: '≈¥34/餐', spec: '7天·14餐', cta: '最划算', hot: true, platform: 'android' },
  { name: '28天月计划', price: 1792, per: '≈¥32/餐', spec: '28天·56餐', cta: '深度定制', platform: 'android' },
]
