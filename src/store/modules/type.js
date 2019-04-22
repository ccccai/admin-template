import API from '@/api/apiUrl'
import Request from '@/assets/http'

const type = {
  state: {
    enterpriseType: {},
    positionList: {},
    industryType: {}
  },

  mutations: {
    SET_ENTERPRISE_TYPE: (state, data) => {
      state.enterpriseType = data
    },
    SET_INDUSTRY_TYPE: (state, data) => {
      state.industryType = data
    },
    SET_POSITION_LIST: (state, data) => {
      state.positionList = data
    }
  },

  actions: {
    // 获取企业类型
    GetEnterpriseType({ commit }) {
      return new Promise((resolve) => {
        // 请求接口
        Request.httpRequest({
          method: 'post',
          url: API.GetEnterpriseType,
          params: {},
          success: (data) => {
            // console.log('enterprise_types:', data)
            commit('SET_ENTERPRISE_TYPE', data.enterprise_types)
            resolve()
          }
        })
      })
    },
    // 获取行业类型
    GetIndustryInfo({ commit }) {
      return new Promise((resolve) => {
        // 请求接口
        Request.httpRequest({
          method: 'post',
          url: API.GetIndustryInfo,
          params: {},
          success: (data) => {
            var i = 0
            var list = {}
            for (const key in data) {
              list[i] = {}
              list[i].title = key
              list[i].content = data[key]
              i++
            }
            // console.log('industry_types:', list)
            commit('SET_INDUSTRY_TYPE', list)
            resolve()
          }
        })
      })
    },
    // 获取商户职位列表
    GetPositionList({ commit }) {
      return new Promise((resolve) => {
        // 请求接口
        Request.httpRequest({
          method: 'post',
          url: API.GetPositionList,
          params: {},
          success: (data) => {
            // console.log('position:', data.list)
            commit('SET_POSITION_LIST', data.list)
            resolve()
          }
        })
      })
    }
  }
}

export default type
