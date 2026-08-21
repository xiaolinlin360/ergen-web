import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import Company from '@/pages/Company.vue'
import LegalPage from '@/pages/LegalPage.vue'
import { changelog, help, service, copyright, privacy, terms } from '@/data/legal'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'company', name: 'company', component: Company },
        { path: 'changelog', name: 'changelog', component: LegalPage, props: { doc: changelog } },
        { path: 'help', name: 'help', component: LegalPage, props: { doc: help } },
        { path: 'service', name: 'service', component: LegalPage, props: { doc: service } },
        { path: 'copyright', name: 'copyright', component: LegalPage, props: { doc: copyright } },
        {
          path: 'privacy',
          name: 'privacy',
          component: LegalPage,
          props: { doc: privacy, variant: 'pandoc' },
        },
        {
          path: 'terms',
          name: 'terms',
          component: LegalPage,
          props: { doc: terms, variant: 'pandoc' },
        },
      ],
    },
  ],

  // 路由切换时回到顶部
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
