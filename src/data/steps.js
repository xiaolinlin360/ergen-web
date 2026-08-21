import { IMAGES } from './images'

/**
 * @typedef {Object} Step
 * @property {string} no - 序号
 * @property {string} title - 标题
 * @property {string} desc - 描述
 * @property {string} image - 示意图路径
 */

/** @type {Step[]} */
export const steps = [
  { no: '01', title: '填数据', desc: '性别、年龄、身高、体重、活动量——填一次，有变化才改。', image: IMAGES.dialog1 },
  { no: '02', title: '小折配餐', desc: '匹配偏好，确认执行，不用算，不用选，不用纠结。', image: IMAGES.dialog2 },
  { no: '03', title: '热链送达', desc: '每日现做，准时送达，入口新鲜。', image: IMAGES.dialog3 },
]
