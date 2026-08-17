import { createRouter, createWebHistory } from 'vue-router'

//https://vitejs.cn/vite3-cn/guide/env-and-mode.html

const router = createRouter({
  //前缀路径
  history: createWebHistory(import.meta.env.BASE_URL),

  //路由配置
  routes: [],
})
// console.log(router)

// 路由守卫
// 每次路由跳转前，都会执行
// 可以在守卫中判断是否需要登录转跳转
// router.beforeEach((to) => {
//   if (to.name !== 'login' && !JSON.parse(localStorage.getItem('big-user'))?.token) {
//     return { name: 'login' }
//   }
// })

export default router
