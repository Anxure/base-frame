/**
 * @Author: zdww Chengdu r&d center
 * @Date: 2020-05-19 17:51:11
 * @Desc: 权限指令
 */
import Vue from 'vue'
import { checkPermission } from '@/permission'
export function initPermission () {
  Vue.use(Vue => {
    Vue.directive('permission', {
      inserted (el, binding) {
        if (!checkPermission(binding.value)) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    })
  })
}
