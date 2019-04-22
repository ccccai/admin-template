import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import store from './store'
import Api from '@/api/apiUrl'
import Request from '@/assets/http'

import '@/assets/mock'
import '@/icons' // icon
import '@/permission' // permission control

import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

Vue.use(ElementUI, { locale })
Vue.prototype.API = Api
Vue.prototype.$request = Request
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
