import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import Company from '@/pages/Company.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'company', name: 'company', component: Company },
      ],
    },
  ],

  // 路由切换时回到顶部
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
