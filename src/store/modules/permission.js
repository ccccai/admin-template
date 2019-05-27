import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import API from '@/api/apiUrl'
import Request from '@/assets/http'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  if (route.meta && route.meta.title) {
    return menus.some(menu => route.meta.title.includes(menu.name) && route.path.includes(menu.path))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes = [], menus = []) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(menus, tmp)) {
      const findMenu = menus.find((menu, index, menus) => {
        return menu.name.includes(tmp.meta.title) && menu.path.includes(tmp.path)
      })

      if (findMenu.children.length) {
        tmp.children = filterAsyncRoutes(tmp.children, findMenu.children)
      } else {
        delete tmp.children
      }

      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },

  actions: {
    GenerateRoutes({ commit }, params) {
      resetRouter() // 先初始化路由
      return new Promise((resolve, reject) => {
        Request.httpRequest({
          method: 'post',
          url: API.GetPermissionList,
          params: {},
          success: (data) => {
            console.log('accessedRoutes:', data)
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, data)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
          }
        })
      })
    }
  }
}

export default permission
