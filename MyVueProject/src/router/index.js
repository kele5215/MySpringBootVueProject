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
    path: '/error',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/dashbord',
    meta: {
      requireAuth: true
    },
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
  // 如果是登录页则用next方法resolve掉这个钩子
  document.title = getTitle(to.meta.title)
  if (to.path === '/login') {
    next()
  } else {
    if (to.matched.some((r) => r.meta.requireAuth)) {
      const user = JSON.parse(localStorage.getItem('user'));
      // 判断是否已经登录
      if (user) {
        console.log('这是通过拦截后到处理', from);
        next();
      } else {
        // 登录成功后重定向到当前页面
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    } else {
      console.log('这是拦截');
      next();
    }
  }
})

export default router
