import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  // baseURL: process.env.VUE_APP_BASE_API
  baseURL: 'http://192.168.31.23:8088/'
})

// 在全局请求和响应拦截器中添加请求状态
let loading = null

// 请求拦截器
$axios.interceptors.request.use(config => {
  loading = Loading.service({ text: '拼命加载中' })
  const token = store.getters.token
  if (token) {
    // 请求头部添加token
    config.header.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
$axios.interceptors.response.use(response => {
  if (loading) {
    loading.close()
  }

  const code = response.status
  if ((code >= 200 && code < 300) || code === 304) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (loading) {
    loading.close()
  }
  console.log(error)

  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回401 跳转到登陆页面
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      case 404:
        Message.error('网络请求不存在')
        break
      default:
        Message.error(error.response.data.message)
    }
  }

  return Promise.reject(error)
})

// 请求封装完成后，还需要对方法进行封装，方便调用
// const base = $axios.baseURL;
export const postRequest = (url, params) => {
  console.log(url)
  return axios({
    method: 'post',
    // url: 'http://10.1.4.155:8088/' + url,
    url: 'http://192.168.31.23:8088/' + url,
    data: params,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url
  });
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url
  });
}
