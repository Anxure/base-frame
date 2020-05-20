import { post } from '../utils/request'
export default {
  login: (params) => post('/login', params),
  generateRoutes: () => post('/getMenus'),
  loginOut: () => post('/loginOut'),
  changeRole: (params) => post('/changeRole', params)
}
