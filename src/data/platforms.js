import { IMAGES } from './images'

/**
 * @typedef {Object} DownloadPlatform
 * @property {string} img - 平台图标
 * @property {string} label - 平台名
 * @property {string} [dl] - 下载提示文案（有则显示下载图标）
 * @property {string} [qr] - 二维码路径（有则显示扫码）
 */

/** @type {DownloadPlatform[]} */
export const downloadPlatforms = [
  { img: '/images/icon-win.svg', label: 'Windows', dl: '点击下载 Windows 版' },
  { img: '/images/icon-apple.svg', label: 'Mac OS', dl: '点击下载 Mac 版' },
  { img: '/images/icon-phone.svg', label: '手机', qr: IMAGES.qrcodeDl },
  { img: '/images/icon-tablet.svg', label: '平板', qr: IMAGES.qrcodeDl },
]
