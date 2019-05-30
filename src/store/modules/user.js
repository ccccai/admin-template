import { getToken, setToken, removeToken } from '@/assets/utils/auth'
import API from '@/api/apiUrl'
import Request from '@/assets/http'

const user = {
  state: {
    token: getToken()
    // name: '',
    // selfInfo: {},
    // avatar: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
    // SET_NAME: (state, name) => {
    //   state.name = name
    // },
    // SET_SELF_INFO: (state, selfInfo) => {
    //   state.selfInfo = selfInfo
    // },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 请求接口
        Request.httpRequest({
          method: 'post',
          url: API.Login,
          params: userInfo,
          success: (data) => {
            console.log('data', data)
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          }
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 请求接口
        Request.httpRequest({
          method: 'post',
          url: API.GetEmployeeSelfInfo,
          params: {},
          success: (data) => {
            // 设置用户信息
            // commit('SET_SELF_INFO', data.employee_info_list[0])
            // commit('SET_NAME', data.employee_info_list[0].full_name)
            // commit('SET_AVATAR', 'src/assets/logo.jpg')
            resolve(data.employee_info_list[0])
          }
        })
      })
    },

    // 后台登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 请求接口
        // Request.httpRequest({
        //   method: 'post',
        //   url: API.LoginOut,
        //   params: {},
        //   success: (data) => {
        //     commit('SET_TOKEN', '')
        //     commit('SET_ROLES', [])
        //     removeToken()
        //     resolve()
        //   }
        // })
        // 测试数据
        commit('SET_TOKEN', '')
        commit('SET_SELF_INFO', {})
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
