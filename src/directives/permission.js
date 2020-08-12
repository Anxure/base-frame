/**
 * @Author: zdww Chengdu r&d center
 * @Date: 2020-05-19 17:51:11
 * @Desc: 权限指令
 */
import { checkPermission } from '@/permission'
/**
 * 注册权限指令
 * @param {*} hidden 按钮是否隐藏按钮
 * @param {*} disabledClass 无权限时按钮添加的class，配合UI库用，默认使用elementUI，仅在hidden为false有效
 */
export const authDirective = {
  install (Vue, { hidden = false, disabledClass = 'is-disabled' } = {}) {
    Vue.directive('permission', {
      inserted (el, binding) {
        if (!checkPermission(binding.value)) {
          if (!hidden) {
            el.setAttribute('disabled', true);
            el.setAttribute('title', '您没有操作权限！');
            el.className += ` ${disabledClass}`;
            return false;
          }
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    })
  }
}
