// 不需要权限的路由
export const constantRoutes = [
  {
    path: '/screenDataAls',
    name: 'ScreenDataAls',
    component: () => import('@/views/screenDataAls/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue')
  }
]
// 需要权限的路由
export const asyncRoutes = [
  {
    path: '/',
    name: 'app',
    component: () => import('@/layout/BasicLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: { hiddenBreadcrumb: true }
      },
      {
        path: '/permission',
        name: 'Permission',
        redirect: '/permission/page',
        component: () => import('@/layout/PageView.vue'),
        children: [
          {
            path: '/permission/page',
            name: 'PagePermission',
            component: () => import('@/views/permission/PagePermission.vue')
          },
          {
            path: '/permission/directive',
            name: 'DirectPermission',
            component: () => import('@/views/permission/DirectPermission.vue')
          }
        ]
      },
      {
        path: '/table',
        name: 'Table',
        redirect: '/table/dynamic-table',
        component: () => import('@/layout/PageView.vue'),
        children: [
          {
            path: '/table/dynamic-table',
            name: 'DynamicTable',
            component: () => import('@/views/table/DynamicTable.vue')
          },
          {
            path: '/table/dynamic-table/edit',
            name: 'DynamicTableEdit',
            component: () => import('@/views/table/DynamicTableEdit.vue'),
            hidden: true,
            meta: { title: '表格编辑' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
