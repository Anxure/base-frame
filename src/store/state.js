import { getToken, getStore } from '@/utils'
import config from '@/config'
export default {
  userInfo: getStore('userInfo') ? JSON.parse(getStore('userInfo')) : {},
  token: getToken(),
  open: true, // 左侧菜单默认展开
  addRoutes: [], // 过滤后的路由
  role: getStore('userInfo') ? JSON.parse(getStore('userInfo')).role : [],
  globalConfig: config, // 系统全局配置
  openName: [], // 打开菜单标识
  activeName: '' // 选中菜单标识
}
