/**
 * @typedef {Object} PainPoint
 * @property {string} keyword - 关键词
 * @property {string} tag - 标签
 * @property {string} desc - 描述
 * @property {string} image - 图片路径
 */

/** @type {PainPoint[]} */
export const painPoints = [
  { keyword: '外卖重油重盐', tag: '饮食困境', desc: '吃完心里难受，罪恶感爆棚', image: '/images/pain-takeout.webp' },
  { keyword: '自己做费时费力', tag: '时间成本', desc: '买菜洗切炒刷碗，没时间也没精力', image: '/images/pain-headache.webp' },
  { keyword: '减脂餐难吃', tag: '恶性循环', desc: '坚持不过第三天，最后还是炸鸡奶茶兜底', image: '/images/pain-friedchicken.webp' },
]
