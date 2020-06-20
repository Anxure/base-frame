
const TOKENKEY = 'Admin-Token';// token键

/**
 * 获取本地sessionStorage
 * @param {String} key - 键名
 * @return {String} 本地存储值
 */
export const getStore = (key) => {
  return sessionStorage.getItem(key);
}

/**
 * 设置本地sessionStorage
 * @param {String} key - 键名
 */
export const setStore = (key, value) => {
  return sessionStorage.setItem(key, value);
}
/**
 * 移除sessionStorage
 * @param {String} key - 键名
 */
export const removeStore = (key) => {
  return sessionStorage.removeItem(key);
}
/**
 * 移除全部存储数据
 */
export const removeAll = () => {
  return sessionStorage.clear();
}
/** *****auto token相关******/
/**
 * 获取本地token
 */
export const getToken = () => {
  return getStore(TOKENKEY);
}
/**
 * 设置本地token
 * @param {String} token
 */
export const setToken = (token) => {
  return setStore(TOKENKEY, token);
}

/**
 * 移除本地token
 */
export const removeToken = () => {
  return removeStore(TOKENKEY);
}
/**
 * 判断是否属于非routePath格式
 * @param {String} path - 路由地址
 */

export const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/**
   * 兼容的事件绑定方法(兼容ie)
   */
export const addEvent = (element, event, handler) => {
  if (document.addEventListener) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  } else {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler)
    }
  }
}
/**
   * 兼容的事件移除方法(兼容ie)
   */
export const removeEvent = (element, event, handler) => {
  if (document.addEventListener) {
    if (element && event && handler) {
      element.removeEventListener(event, handler, false)
    }
  } else {
    if (element && event && handler) {
      element.detachEvent('on' + event, handler)
    }
  }
}
