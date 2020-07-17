import Vue from 'vue'
import App from './App.vue'
// 路由添加到程序入口
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
