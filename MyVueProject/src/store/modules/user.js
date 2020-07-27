import { login } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
  // 认证凭证
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userName: ''
}

const mutations = {
  SET_TOKEN (state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN (state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    state.introduce = ''
    localStorage.removeItem('token')
  }
}

const actions = {
  // user login
  _login ({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.data.code === 200) {
            Message.success(res.data.message)
            commit('SET_TOKEN', res.data.token)
          } else {
            Message.error(res.data.message)
          }
          resolve(res)
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
  state,
  mutations,
  actions
}
