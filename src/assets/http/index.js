/* 封装axios请求 */
import service from './request'
import {
  Message,
  Loading
  // ,MessageBox
} from 'element-ui'

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
      Loading.service().close() // 关闭loading
      Message({
        message: data.resultMessage,
        type: 'error',
        duration: 3 * 1000
      })
    }
    if (!options.noLoading) { // loading完毕
      Loading.service().close() // 关闭loading
      loading.close()
    }
  })
}
export default {
  httpRequest
}
