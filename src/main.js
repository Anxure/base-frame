import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission' // permission control
import store from './store'
import * as filters from '@/filters'
import vuescroll from 'vuescroll'
import './plugins/element'
import '@/assets/style/common.scss'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import api from '@/api'
import * as utils from '@/utils'
import { initPermission } from '@/directives/permission'
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})
initPermission()
// 全局修改滚动条样式
Vue.use(vuescroll, {
  ops: {
    rail: {
      opacity: '0',
      background: '#fff',
      border: '0px solid #cecece',
      size: '3px'
    },
    bar: {
      background: '#E6E6E6',
      keepShow: true,
      size: '3px',
      minSize: 0.2
    },
    vuescroll: {
      wheelScrollDuration: 0
    }
  },
  width: '3px',
  dataCount: 1024,
  items: []
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
