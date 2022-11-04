import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: () => import('@/views/index'),
    meta: { requiresAuth: true, title: '索引页' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!store.state.loginUser.userId) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  }
})
export default router
