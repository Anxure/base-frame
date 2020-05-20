import { setToken, setStore, removeAll } from '@/utils'
import { asyncRoutes } from '../../router/router'
import { filterAsyncRoutes, loopTranformRouter } from '@/permission'
import user from '@/api/user';

export default {
  // 用户登录
  async login ({ commit }, userInfo) {
    const { username, password } = userInfo;
    const result = await user.login({ username: username.trim(), password });
    const { token } = result.data;
    commit('SET_TOKEN', token)
    commit('SET_USERINFO', result.data)
    commit('SET_ROLE', result.data.role)
    setToken(token);
    setStore('userInfo', JSON.stringify(result.data));
    return result;
  },
  // 获取菜单路由表
  async generateRoutes ({ commit }) {
    const res = await user.generateRoutes(); // 获取后台路由表
    // 将后台树菜单转换为一维数组
    const resRoutes = loopTranformRouter(res.data);
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, resRoutes);
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes;
  },
  // 退出登录
  async loginOut ({ commit }) {
    const res = await user.loginOut(); // 退出登录
    if (res && res.code === 0) {
      // 清除SessionStorage & vuex 本地数据
      commit('SET_TOKEN', '');
      commit('SET_USERINFO', {});
      removeAll();
      return res;
    }
  }
};
