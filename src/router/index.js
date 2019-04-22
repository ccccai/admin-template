import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
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

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
