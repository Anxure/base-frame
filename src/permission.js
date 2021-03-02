/*
 *@description: 路由权限拦截
 *@date: 2020-05-14 11:31:24
 *@version: V1.0.5
 */
import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Message } from 'view-design';
import { getToken } from '@/utils';
console.log(Message)
/**
 * 递归路由为一维数组
 * @param {Array} resRouter - 后端 | 本地 返回路由树
 * @return {Array} 处理后的路由 形如：[{path:xx,title:xx,icon:xx}]
 */
export const loopTranformRouter = (resRouter = []) => {
  let newRouter = [];
  resRouter.forEach(item => {
    const tmp = { ...item };
    if (tmp.children && tmp.children.length > 0) {
      const noChildTmp = { ...tmp };
      delete noChildTmp.children;
      newRouter.push(noChildTmp);
      newRouter = newRouter.concat(loopTranformRouter(tmp.children));
    } else {
      newRouter.push(tmp); // 将整个对象传入
    }
  });
  return newRouter;
};
/*
 *@functionName: 递归路由过滤
 *@params {Array} asyncRoutes 本地全量路由表
 *@params {Array} resRoutes 后台接口路由表（传入一维处理后的数据类型）
 */
export const filterAsyncRoutes = (asyncRoutes, resRoutes) => {
  const res = [];
  asyncRoutes.forEach(route => {
    const tmp = { ...route };
    // 首层路由直接加入
    const targetRoute = resRoutes.find(r => r.path === route.path);
    if (!!targetRoute) {
      // 后台存在此路由(merge(后台路由，本地路由),合并到meta中)
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, resRoutes);
      }
      const tempMeta = { ...tmp.meta, ...targetRoute };
      delete tempMeta.path;
      tmp.meta = tempMeta;
      res.push(tmp);
    } else {
      if (route.path === '/' || (route.auth && route.auth.includes('guest'))) {
        // 首页 || auth 包含guest    直接加入
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, resRoutes);
        }
        res.push(tmp);
      }
    }
  });
  return res;
};

const whiteList = ['/login'];
NProgress.configure({ showSpinner: false }); // NProgress Configuration
let isAddedRoutes = false; // 是否追加过路由
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (isAddedRoutes) {
      if (to.path === '/login') {
        // 已登录跳转首个返回地址
        const transformedRoutes = store.getters.transformedRoutes;
        const { path } = transformedRoutes[0];
        next({ path });
        NProgress.done();
      } else {
        // 提示msg(放在这里最后一次跳转才提示，否则会有卡顿)
        const userInfo = store.state.userInfo;
        if (from.path === '/login') {
          Message.success(`${userInfo.name},欢迎回来`)
        }
        next();
      }
    } else {
      let addRoutes = store.state.addRoutes;
      if (!addRoutes || addRoutes.length === 0) {
        addRoutes = await store.dispatch('generateRoutes');
      }
      router.addRoutes(addRoutes);
      isAddedRoutes = true;
      console.log(to);
      next({ ...to, replace: true });
    }
  } else {
    isAddedRoutes = false;
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.fullPath}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

/**
 * 检测传入的标识是否有权访问
 * @param {Array} permission
 * @desc 这里采用的是后台返回角色的标识，例如 ['admin','add'] , ['editor'] ,前端按钮绑定有操作权限的角色，是一个数据 例如       v-permission = ['editor', 'admin'] ，当然后台也可以返回根据模块来返回标识，前端同样的去匹配，例如后台返回['user:add','user:delete','menu:add']等等，前端使用 v-permission=['user:delete']等等
 */
export const checkPermission = (permissions) => {
  const permission = store.state.role || [];
  if (permissions && permissions instanceof Array && permissions.length > 0) {
    const hasPermission = permission.some(role => {
      return permissions.includes(role)
    })
    return hasPermission
  } else {
    throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
  }
}
