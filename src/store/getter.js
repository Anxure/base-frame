/**
 * 递归路由为一维数组
 * @param {Array} routers - 过滤后的路由
 */
export const loopTranformRouter = (routers = []) => {
  let newRouter = [];
  routers.forEach(item => {
    const tmp = { ...item }
    const { path, children, meta } = tmp;
    if (children && children.length > 0) {
      newRouter = newRouter.concat(loopTranformRouter(children));
    } else {
      newRouter.push(meta && meta.code ? { path, code: meta.code } : { path }); // 考虑携带参数
    }
  })
  return newRouter
};
export default {
  // 转换后的一维数组
  transformedRoutes: (state) => {
    const { addRoutes } = state;
    if (addRoutes && addRoutes.length > 0) {
      return loopTranformRouter(addRoutes);
    }
    return []
  }
}
