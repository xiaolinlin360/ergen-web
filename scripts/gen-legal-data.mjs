// 一次性脚本：把 public 下 6 个法律 HTML 转成 src/data/legal/*.js
// 用完即弃。运行：node scripts/gen-legal-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pubDir = join(root, 'public')
const outDir = join(root, 'src', 'data', 'legal')
mkdirSync(outDir, { recursive: true })

// 文件名 → { slug, title, updated, file }
const specs = [
  { file: '版本更新.html', slug: 'changelog', title: '版本更新' },
  { file: '帮助中心.html', slug: 'help', title: '帮助中心' },
  { file: '服务协议.html', slug: 'service', title: '服务协议', updated: '2026 年 8 月 7 日' },
  { file: '版权投诉.html', slug: 'copyright', title: '版权投诉', updated: '2026 年 8 月 7 日' },
  { file: '隐私政策.html', slug: 'privacy', title: '折耳根隐私政策' },
  { file: '用户协议.html', slug: 'terms', title: '折耳根用户服务协议' },
]

function extractBodyInner(html) {
  // 取 <body> 与 </body> 之间
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  if (!m) throw new Error('no body')
  let body = m[1]

  // normalize 换行符（去 \r）
  body = body.replace(/\r\n/g, '\n')

  // 去掉 pandoc 的 <header id="title-block-header">...</header>
  body = body.replace(/<header[^>]*id="title-block-header"[^>]*>[\s\S]*?<\/header>/i, '')

  // 去掉返回首页链接
  body = body.replace(/<a[^>]*class="back"[^>]*>[\s\S]*?<\/a>/i, '')

  // 去掉 <div class="wrap"> 的开闭标签（薄荷绿族小页用的包裹，LegalPage 自己提供容器）
  body = body.replace(/<div[^>]*class="wrap"[^>]*>/i, '').replace(/<\/div>\s*$/i, '')

  // 去掉首个 <h1>...</h1>（标题交给 LegalPage 渲染）
  body = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')

  // 去掉 <p class="updated">...</p>（日期交给 LegalPage 渲染，但先抓出来）
  let updated = null
  const upM = body.match(/<p[^>]*class="updated"[^>]*>([\s\S]*?)<\/p>/i)
  if (upM) {
    updated = upM[1].replace(/最后更新日期：\s*/, '').trim()
    body = body.replace(/<p[^>]*class="updated"[^>]*>[\s\S]*?<\/p>/i, '')
  }

  // 去掉底部版权 <p>（含 © 或 京ICP）
  body = body.replace(/<p[^>]*style="[^"]*"[^>]*>\s*©[\s\S]*?<\/p>/gi, '')

  // 清掉 pandoc 残留的空 href（交叉引用目标丢失，保留文字去掉链接）
  body = body.replace(/<a\s+href="">([\s\S]*?)<\/a>/gi, '$1')

  return { body: body.trim(), updated }
}

for (const spec of specs) {
  const raw = readFileSync(join(pubDir, spec.file), 'utf8')
  const { body, updated } = extractBodyInner(raw)
  const updatedFinal = spec.updated || updated

  // 隐私政策 / 用户协议：正文末尾追加"相关协议"互引（服务协议 + 版权投诉）
  let bodyFinal = body
  if (spec.slug === 'privacy' || spec.slug === 'terms') {
    bodyFinal +=
      '\n<hr />\n' +
      '<p style="margin-top:1.5em;color:#77675a;font-size:14px;">' +
      '相关：' +
      '<a href="/service">服务协议</a> · ' +
      '<a href="/copyright">版权投诉</a>' +
      '</p>'
  }

  const content = `/**
 * ${spec.title} —— 法律/信息页正文（从原 public/*.html 迁移）
 * 正文以原始 HTML 存储，由 LegalPage.vue 用 v-html 注入。
 * 内容为本项目自有法律文案，非用户输入，v-html 安全。
 */
export const ${spec.slug} = {
  title: ${JSON.stringify(spec.title)},
  ${updatedFinal ? `updated: ${JSON.stringify(updatedFinal)},` : 'updated: null,'}
  body: ${JSON.stringify(bodyFinal)}
}
`
  writeFileSync(join(outDir, `${spec.slug}.js`), content, 'utf8')
  console.log(`generated: src/data/legal/${spec.slug}.js (${bodyFinal.length} chars body)`)
}

// 生成 index.js 汇总
const index = `// 法律/信息页数据汇总
export { changelog } from './changelog.js'
export { help } from './help.js'
export { service } from './service.js'
export { copyright } from './copyright.js'
export { privacy } from './privacy.js'
export { terms } from './terms.js'
`
writeFileSync(join(outDir, 'index.js'), index, 'utf8')
console.log('generated: src/data/legal/index.js')
