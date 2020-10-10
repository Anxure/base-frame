import { checkPermission } from '@/permission'
/**
 * 注册权限指令
 * @param {*} hidden 按钮是否隐藏按钮
 * @param {*} disabledClass 无权限时按钮添加的class，配合UI库用，默认使用view-ui，仅在hidden为false有效
 */
export const authDirective = {
  install (Vue, { hidden = false } = {}) {
    Vue.directive('permission', {
      inserted (el, binding) {
        if (!checkPermission(binding.value)) {
          if (!hidden) {
            el.setAttribute('disabled', 'disabled');
            el.setAttribute('title', '您没有操作权限！');
            return false;
          }
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    })
  }
}
