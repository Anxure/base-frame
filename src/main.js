/*
 * @Author: ykx
 * @Date: 2021-04-23 16:30:49
 * @LastEditTime: 2021-04-23 17:21:50
 * @LastEditors: your name
 * @Description:主入口
 * @FilePath: \zdww-base-frame\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission' // permission control
import store from './store'
import * as filters from '@/filters'
import '@/plugins/useAntd'
import '@/assets/style/theme.less';
import '@/assets/style/common.less'
import '@/assets/style/side-menu.less'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/assets/font/iconfont.css'
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
