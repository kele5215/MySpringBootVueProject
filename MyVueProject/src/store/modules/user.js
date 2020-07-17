import { login } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const actions = {
  // user login
  _login ({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.code === 0) {
            if (res.data.success) {
              Message.success(res.data.msg)
              //commit('SET_TOKEN', res.data.token)
            } else {
              Message.error(res.data.msg)
            }
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut ({ commit }) {
    //commit('DEL_TOKEN')
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
