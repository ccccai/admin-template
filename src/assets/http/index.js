/* 封装axios请求 */
/* 用法示例：(*)为必须参数
  this.$request.httpRequest({
    (*)method: 'post', // 请求方式，post或get
    (*)url: this.API.ResetPassword, // 请求地址，请求地址的配置在@/api/apiUrl.js
    noLoading: true, // 是否显示全局Loading遮罩，默认每个请求都显示遮罩，即默认不设置该参数。如果需要某个请求不加遮罩，就设置noLoading: true即可
    returnFullData: true, // 是否返回完整数据，例如接口返回的数据格式为{ code:0, data: [], meaasge:''}，则默认请求成功之后的回调函数的参数为data:[]，如果设置returnFullData: true，则回调参数为{ code:0, data: [], meaasge:''}
    (*)params: {}, // 请求参数，object类型
    (*)success: (data) => { // 请求成功之后的回调函数，data是回调参数
      // 在这里写请求成功后的逻辑
    }
  })
*/
import service from './request'
import { Message, Loading } from 'element-ui'

function requestMethods(options) {
  switch (options.method) {
    case 'post':
      return service({
        url: options.url,
        method: 'post',
        data: options.params
      })
    case 'get':
      return service({
        url: options.url,
        method: 'get',
        params: options.params
      })
    default:
      Message({
        message: 'HTTP请求方法出错！',
        type: 'error',
        duration: 3 * 1000
      })
      break
  }
}

function httpRequest(options = {}) {
  let loading
  if (!options.noLoading) { // 启用全局loading
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }

  requestMethods(options).then(response => {
    // 成功返回结果的逻辑。根据接口定义的数据返回格式 修改判断条件
    const data = response.data
    if (data.resultCode === 1) { // 成功
      const result = options.returnFullData ? data : data.data // 返回完整数据结构还是只返回有效数据
      options.success(result)
    } else { // 失败
      if (data.hasOwnProperty('msg')) {
        Message({
          message: !data.msg ? '操作失败' : data.msg,
          type: "error",
          customClass: "errorloginwidth",
          duration: "3000"
        })
      }
    }
    if (!options.noLoading) { // loading完毕
      loading.close()
    }
  })
}
export default {
  httpRequest
}
