import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

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

app.use(router)
app.mount('#app')
