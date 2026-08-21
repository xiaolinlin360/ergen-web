/**
 * @typedef {Object} Ingredient
 * @property {string} img - 图片路径
 * @property {string} name - 名称
 * @property {string} desc - 描述
 * @property {string} source - 来源说明
 */

/** @type {Ingredient[]} */
export const ingredients = [
  { img: '/images/salad.webp', name: '新鲜蔬果', desc: '当日直采·不囤货', source: '餐厅当天采购、当天使用' },
  { img: '/images/quinoa.webp', name: '优质杂粮', desc: '产地直供·可溯源', source: '源头可查，品质稳定' },
  { img: '/images/tuna.webp', name: '海鲜蛋奶', desc: '冷链直达·每日到货', source: '当天到货、当天使用' },
  { img: '/images/chicken.webp', name: '新鲜肉类', desc: '资质定期复查', source: '正规屠场宰杀，可追溯' },
]
