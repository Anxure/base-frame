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
        path: 'https://github.com/Anxure/zdww-base-frame',
        name: 'Document',
        auth: ['guest'],
        meta: { title: '文档查看', icon: 'md-book' }
      },
      {
        path: '/permission',
        name: 'Permission',
        redirect: '/permission/page',
        component: () => import('@/layout/PageView.vue'),
        children: [
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
            path: '/table/dynamic-table/add',
            name: 'DynamicTableAdd',
            component: () => import('@/views/table/DynamicTableAdd.vue'),
            hidden: true,
            auth: ['guest'],
            meta: {
              title: '新增',
              breadcrumbs: [
                { title: '表格模块', path: '/table' },
                { title: '表格1', path: '/table/dynamic-table' },
                { title: '新增', path: '/table/dynamic-table/add' }
              ]
            }
          },
          {
            path: '/table/dynamic-table/edit/:id',
            name: 'DynamicTableEdit',
            component: () => import('@/views/table/DynamicTableEdit.vue'),
            hidden: true,
            auth: ['guest'],
            meta: {
              title: '编辑',
              // 这里需要树形结构，故自定义写结构
              breadcrumbs: [
                { title: '表格模块', path: '/table' },
                { title: '表格1', path: '/table/dynamic-table' },
                { title: '编辑', path: '@/views/table/DynamicTableEdit.vue' }
              ]
            }
          },
          {
            path: '/table/menu-nest',
            name: 'Table',
            redirect: '/table/menu-nest/test-menu1',
            component: () => import('@/layout/PageView.vue'),
            children: [
              {
                path: '/table/menu-nest/test-menu1',
                name: 'TestMenu1',
                component: () => import('@/views/table/menuNest/TestMenu1.vue')
              }
            ]
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, auth: ['guest'] }
]
