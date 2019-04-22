import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 在此处设置请求头参数
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// axios response 拦截器
service.interceptors.response.use(
  response => {
    return response // 返回请求成功结果
  },
  error => {
    Loading.service().close() // 关闭全局loading
    console.error(error)
    Message({
      message: error.response,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response)
  }
)

export default service
