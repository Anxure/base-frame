import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission' // permission control
import store from './store'
import * as filters from '@/filters'
import './plugins/element'
import '@/assets/style/common.scss'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import api from '@/api'
import * as utils from '@/utils'
import { authDirective } from '@/directives/permission'
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})
Vue.use(authDirective)
// initPermission()
// 全局修改滚动条样式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
