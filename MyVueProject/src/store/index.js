import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const path = require('path')
const modules = {}

files.keys().forEach(key => {
  const name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  // modules: {
  //   modules
  // }
  modules
})

export default store
