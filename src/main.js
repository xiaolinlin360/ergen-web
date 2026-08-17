import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/main.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(pinia)
app.mount('#app')
