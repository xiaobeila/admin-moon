import axios from 'axios'
import { Message } from 'element-ui'
import { getCookie } from '../common/js/utils'
import routes from '@/router'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://124.71.173.208', // api的base_url
  timeout: 600000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post' && typeof config.data === 'string') {
    config.data = Qs.stringify(config.data)
  }
  const user = getCookie('admin-user') ? JSON.parse(getCookie('admin-user')) : ""
  // Do something before request is sent
  if (window.location.pathname !== '/login') {
    config.headers['Authorization'] = user ? `Bearer ${user.jwt_token}`  : ""
  }
  const data = config.data
  
  if (data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }
  
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  // config.headers['Content-Type'] = 'multipart/form-data'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code == 401) {
      routes.push({
        path: '/login'
      })
      return
    }
    return Promise.resolve(res)
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service