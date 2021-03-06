import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import { create } from 'core-js/fn/object'
// @符号就是代表src路径
import getTitle from '@/utils/getTitle'
import store from '@/store'
import Layout from '@/layout'

Vue.use(VueRouter)

const currencyRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { title: '登录页', requireAuth: false },
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
    component: Layout,
    redirect: '/dashbord',
    meta: { requireAuth: true },
    children: [
      {
        path: 'dashbord',
        name: 'Dashbord',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data', requireAuth: true }
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
    // 对于所有路由导航，简单地让页面滚动到顶部
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
  document.title = getTitle(to.meta.title)

  console.log('先判断是否登录')
  if (to.path === '/login') {
    // 如果是登录页则用next方法resolve掉这个钩子
    next()
  } else {
    // 检查是否需要登录权限
    if (to.matched.some((r) => r.meta.requireAuth)) {
      const token = store.getters.token
      // 判断用户是否登录|
      if (token) {
        // 如果来源路由有query
        const redirect = from.query.redirect
        if (to.path === redirect) {
          // 这行是解决next无限循环的问题
          // next() 表示路由成功进行，直接进入to的路由地址，不会再次调用router.beforeEach()了；
          next()
        } else {
          // 跳转到目的路由
          // next('/login') 表示路由拦截成功，重定向至/login，并且还会再次调用router.beforeEach()；
          if (redirect === '/') {
            next()
          } else {
            next({ path: redirect })
          }
        }
      } else {
        if (to.path === '/login') {
          next()
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      }
      // // 不是这种目标拦截的情况（就from.query是空对象）直接next()
      // if (Object.keys(from.query).length === 0) {
      //   next()
      // } else {
      //   // 是目标拦截的情况，记录redirect
      //   const redirect = from.query.redirect
      //   // 这个是处理无限循环的问题
      //   if (to.path === redirect) {
      //     next()
      //   } else {
      //     // 加上query之后，就判断它有了query，就next()跳转进去
      //     if (Object.keys(to.query).length > 0) {
      //       next()
      //     } else {
      //       // 第一次跳转to路由是没有query的，我们需要加上query来记录我们需要的目标路由
      //       next({
      //         path: to.path,
      //         query: { redirect: redirect }
      //       })
      //     }
      //   }
      // }
    } else {
      next()
      // if (token === 'null' || token === '') {
      //   if (Object.keys(from.query).length === 0) {

      //   } else {
      //     const redirect = from.query.redirect
      //     if (to.path === redirect) {
      //       next()
      //     } else {
      //       next({ path: redirect })
      //     }
      //   }
      // } else {
      //   if (to.path === '/login') {
      //     next()
      //   } else {
      //     next({
      //       path: '/login',
      //       query: { redirect: to.fullPath }
      //     })
      //   }
      // }
    }
  }
  // if (to.path === '/login') {
  //   next()
  // } else {
  //   // 检查是否需要登录权限
  //   if (to.matched.some((r) => r.meta.requireAuth)) {
  //     // 判断是否已经登录
  //     if (token) {
  //       if (token === 'null' || token === '') {
  //         // 登录成功后重定向到当前页面
  //         next({
  //           path: '/login',
  //           query: { redirect: to.fullPath }
  //         });
  //       } else {
  //         console.log('这是通过拦截后到处理', from);
  //         next();
  //       }
  //     } else {
  //       // 登录成功后重定向到当前页面
  //       next({
  //         path: '/login',
  //         query: { redirect: to.fullPath }
  //       });
  //     }
  //   } else {
  //     console.log('这是拦截');
  //     next();
  //   }
  // }

  // if (to.matched.some(record => record.meta.requireAuth)) { // 检查是否需要登录权限
  //   if (!store.state.auth) { // 检查是否已登录
  //     if (store.state.token) { // 未登录，但是有token，获取用户信息
  //       try {
  //         const data = store.dispatch('getUserInfo', store.state.token)
  //         if (data.code === 200) {
  //           next()
  //         } else {
  //           window.alert('请登录')
  //           store.commit('clearToken')
  //           // 登录成功后重定向到当前页面
  //           next({
  //             path: '/login',
  //             query: { redirect: to.fullPath }
  //           });
  //         }
  //       } catch (err) {
  //         window.alert('请登录')
  //         store.commit('clearToken')
  //         // 登录成功后重定向到当前页面
  //         next({
  //           path: '/login',
  //           query: { redirect: to.fullPath }
  //         });
  //       }
  //     } else {
  //       window.alert('请登录')
  //       // 登录成功后重定向到当前页面
  //       next({
  //         path: '/login',
  //         query: { redirect: to.fullPath }
  //       });
  //     }
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
})

export default router
