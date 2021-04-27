# base-frame
基于Vue、View-Design的管理系统架构，让开发人员专注于业务，其他琐事，交给框架！

感谢开源社区，感谢View-Design团队提供的优秀开源项目!

# 特性
- 菜单配置：扁平化数据组织，方便编写、存库，页面菜单、标题、面包屑状态自动同步；
- 系统路由：简化路由配置，一个变量搞定；
- Ajax请求：restful规范，自动错误提示，提示可配置；自动打断未完成的请求；
- Mock模拟数据：无需等待后端，自己提供数据，简化mock写法；
- Module防冲突，用户可自定义主题颜色；
- 导航布局：多种导航方式，一键切换；
- Model(Vuex)：提供模块化管理；
- 权限控制：菜单级别、功能级别权限控制；
- 内置组件：Echart图表；
- ......

系统提供了一些基础页面：
- 登录
- Echart应用页面
- 大数据展示屏
- 指令按钮鉴权
- ......

# 目录结构

```
base-frame
├─ mock
├─ public
├─ src
│  ├─ api
│  ├─ assets
│  ├─ components
│  ├─ config
│  ├─ directives
│  ├─ filters
│  ├─ layout
│  ├─ main.js
│  ├─ mixins
│  ├─ permission.js
│  ├─ plugins
│  ├─ router
│  ├─ store
│  ├─ utils
│  ├─ App.vue
│  └─ views
├─ tests
├─ .browserslistrc
├─ .editorconfig
├─ .env.development
├─ .env.production
├─ .eslintrc.js
├─ .gitignore
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ developmentNorm.md
├─ README.md
└─ vue.config.js

```

# 快速开始
##### install dependencies
npm install

#####  serve with hot reload at localhost:8089
npm run serve

#####  build for production with minification
npm run build

#####  build for production and view the bundle analyzer report
npm run build --report
