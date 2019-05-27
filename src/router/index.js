/*
  title：页面标题，同时页面的图标也是根据title来命名，以及做匹配的，图标放在@/icons/svg目录下面。不要改变svg存放的路径，会出错的。
  hidden：是否对侧边栏隐藏该菜单
  keepAlive：是否缓存该页面
  isBack：用于从特定的一组页面进入该页面时，页面是否要根据上一个页面来做不同的初始化逻辑，和keepAlive一起用
*/
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/* 所有权限通用路由表
   如首页和登录页和一些不用权限的公用页面 */
export const constantRoutes = [
  {
    path: '/login',
    component: resolve => void require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: resolve => void require(['@/views/404'], resolve),
    hidden: true
  },
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'test',
        name: 'Test',
        component: resolve => void require(['@/views/test'], resolve),
        meta: {
          title: '工作台',
          icon: 'table',
          keepAlive: true, // 该字段表示该页面需要缓存
          isBack: false // 用于判断上一个页面是哪个
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 异步挂载的路由
 * 动态需要根据权限加载的路由表
 */
export const asyncRoutes = [
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
