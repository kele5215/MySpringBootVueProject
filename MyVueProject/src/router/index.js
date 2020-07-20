import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import { create } from 'core-js/fn/object'
import getTitle from '@/utils/getTitle'

Vue.use(VueRouter)

const currencyRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { title: '登录页' },
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/dashbord',
    children: [
      {
        path: 'dashbord',
        name: 'Dashbord',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8
// 如果返回一个 falsy (译者注：falsy 不是 false，参考这里)的值，或者是一个空对象，那么不会发生滚动
const createRouter = () => {
  return new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: currencyRoutes,
    scrollBehavior () {
      return { x: 0, y: 0 }
    }
  })
}

const router = createRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter () {
  const reset = createRouter()
  router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook}
  console.log('先判断是否登录')
  document.title = getTitle(to.meta.title)
  if (to.path === '/login') {
    next()
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})

export default router
