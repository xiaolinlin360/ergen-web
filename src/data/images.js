/**
 * 复用的图片路径常量 —— 避免硬编码字符串散落各组件。
 * 仅收录跨组件复用或语义明确的图片，单组件独有的可仍写在各自 data 文件。
 */
export const IMAGES = {
  /** 对话截图（Hero 三张扇形 + Steps 三步示意，复用同一组） */
  dialog1: `${import.meta.env.BASE_URL}images/dialog-1.webp`,
  dialog2: `${import.meta.env.BASE_URL}images/dialog-2.webp`,
  dialog3: `${import.meta.env.BASE_URL}images/dialog-3.webp`,
  /** 二维码 */
  qrcode: `${import.meta.env.BASE_URL}images/qrcode.webp`,
  qrcodeDl: `${import.meta.env.BASE_URL}images/qrcode-dl.webp`,
}
