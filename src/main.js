import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/main.scss'
import 'element-plus/dist/index.css'
// 折耳根健康餐官网全站样式(覆盖脚手架灰底，定义 --cream/--ease-out 等变量)
// 拆分自原 styles.css 巨石文件，按依赖顺序加载：tokens → base → 各 section
import './styles/tokens.css'
import './styles/base.css'
import './styles/sections/nav.css'
import './styles/sections/hero.css'
import './styles/sections/pain.css'
import './styles/sections/answer.css'
import './styles/sections/steps.css'
import './styles/sections/pricing.css'
import './styles/sections/trust.css'
import './styles/sections/faq.css'
import './styles/sections/download.css'
import './styles/sections/footer.css'
import './styles/sections/legal.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(pinia)
app.mount('#app')
