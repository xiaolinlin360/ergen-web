import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/main.scss'
import 'element-plus/dist/index.css'
// 折耳根健康餐官网全站样式（覆盖脚手架灰底，定义 --cream/--ease-out 等变量）
import './styles.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(pinia)
app.mount('#app')
