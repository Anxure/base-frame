/**
 * 业务框架通用配置
 * menuStyle： dark || light // 框架整体色系，具体采用elementUI的配色
 * layoutStyle：fullHeader || partHeader // 布局方式 fullHeader指的是头部拉通，上下布局，partHeader指的是左右布局
 * openBreadcrumd: 默认所有界面开启面包屑导航
 * authByRole: 默认通过树菜单判断权限，true为根据role判断
 **/
export default {
  menuStyle: 'dark',
  layoutStyle: 'fullHeader',
  openBreadcrumd: true,
  authByRole: false
}
