import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/assets/utils/auth' // 验权

const whiteList = ['/login', '/forgetPassword'] // 不重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 有无token判断
  if (getToken()) {
    if (to.path === '/login') {
      // 访问登录页
      next(`/`)
      NProgress.done()
    } else {
      const hasUser = store.getters.name // 防止进入死循环
      if (hasUser) {
        next()
      } else {
        try {
          await store.dispatch('GetInfo') // 防止进入死循环
          const accessRoutes = await store.dispatch('GenerateRoutes')
          // 异步加载路由
          router.addRoutes(accessRoutes)
          router.options.routes = store.state.permission.routes

          // 默认为false。如果replace设置为true，那么导航不会留下history记录，点击浏览器回退按钮不会再回到这个路由。
          next({ ...to, replace: false })
        } catch (error) {
          // 移除token，重定向到登录页
          await store.dispatch('FedLogOut')
          Message.error(error || '身份验证出错，请重新登录。')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
