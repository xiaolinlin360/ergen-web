/**
 * 下载链接单一数据源。
 * 当前 iOS app 未上架 App Store，iOS 链接用 '#' 占位，
 * 避免原 bug（iOS 按钮错误指向 Android APK）。
 * 上架后在此处替换为 App Store 链接即可，全站生效。
 */
export const DOWNLOAD_URLS = {
  /** Android APK（GitHub Releases 托管） */
  android:
    'https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk',
  /** iOS —— 待上架，暂用占位 */
  ios: '#',
  /** Windows —— 待发布 */
  windows: '#',
  /** macOS —— 待发布 */
  mac: '#',
}

/** 二维码图片路径（hover 弹层用） */
export const DOWNLOAD_QR_IMAGE = '/images/qrcode.webp'
