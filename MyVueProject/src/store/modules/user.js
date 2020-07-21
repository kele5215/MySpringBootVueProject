import { login } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const actions = {
  // user login
  _login ({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.data.code === 200) {
            Message.success(res.data.message)
            // commit('SET_TOKEN', res.data.token)
            resolve(res)
          } else {
            Message.error(res.data.message)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut ({ commit }) {
    // commit('DEL_TOKEN')
    resetRouter()
    router.push({
      path: '/login',
      query: {
        redirect: '/'
      }
    })
  }
}

export default {
  namespaced: true,
  actions
}
