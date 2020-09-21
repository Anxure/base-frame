<template>
<div class="sidebar-container " :class="[menuStyle]">
  <!-- 控制切换按钮 -->
  <div class="side-menu-switch" @click="toggleSideMenu" :title="foldText" v-if="globalConfig.layoutStyle === 'fullHeader'">
    <Icon :type="foldCls" />
  </div>
  <!--   左边菜单列表   -->
  <Sider collapsible :collapsed-width="62" hide-trigger :value="!open" :width="variables.sideBarWidth">
    <side-menu ref="sideMenu" @on-select="turnToPage" :menuList="currentMenuRoutes"></side-menu>
  </Sider>
</div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import SideMenu from './SideMenu'
import variables from '@/assets/style/variables.scss'
export default {
  components: {
    SideMenu
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    ...mapState(['open', 'addRoutes', 'globalConfig']),
    menuStyle () {
      return this.globalConfig.menuStyle
    },
    currentMenuRoutes () {
      return this.addRoutes[0].children; // 从第一项children开始遍历
    },
    variables () { // TODO 修改为引用scss的变量（做主题配置）
      return variables;
    },
    foldText () {
      return `点击${this.open ? '收起' : '展开'}`;
    },
    activeMenu () {
      return this.$route.path;
    },
    foldCls () {
      return this.open ? 'md-arrow-dropleft' : 'md-arrow-dropright';
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDERBAR']),
    turnToPage () {},
    toggleSideMenu () {
      // this.isCollapsed = !this.isCollapsed
      this.TOGGLE_SIDERBAR();
    }
  }
}
</script>

<style lang="scss">
.sidebar-container {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);

  .el-menu-item {
    width: auto;
  }

  //这里未提供相关props，采用样式覆盖了
  &.light {
    .logo-wrapper {
      background: #fff;
      margin-bottom: 1px;
      box-shadow: 1px 1px 0 0 #e8e8e8;

      h1.sidebar-title {
        color: #409EFF;
      }
    }

    border-right: 1px solid #e8e8e8;

    .el-submenu__title:focus,
    .el-submenu__title:hover,
    .el-menu-item:focus,
    .el-menu-item:hover {
      outline: none;
      background-color: #ecf5ff !important;
    }
  }

  .el-menu {
    border: none; //去除右边框

    a {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: 210px;
  position: relative;

  .side-menu-switch {
    color: #fff;
    background-color: $dark-menu-bg;
    position: absolute;
    top: 50%;
    right: -15px;
    padding: 10px 5px;
    padding-right: 0px;
    border-radius: 3px;
    cursor: pointer;
  }
}

.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
