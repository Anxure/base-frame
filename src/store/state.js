import { getToken, getStore } from '@/utils'
export default {
  userInfo: getStore('userInfo') ? JSON.parse(getStore('userInfo')) : {},
  token: getToken(),
  open: true, // 左侧菜单默认展开
  addRoutes: [], // 过滤后的路由
  role: getStore('userInfo') ? JSON.parse(getStore('userInfo')).role : []
}
