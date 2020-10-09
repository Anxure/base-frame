<template>
<div class="sidebar-container " :class="[menuStyle]">
  <!-- 控制切换按钮 -->
  <div class="side-menu-switch" @click="toggleSideMenu" :title="foldText" v-if="globalConfig.layoutStyle === 'fullHeader'">
    <Icon :type="foldCls" />
  </div>
  <!--   左边菜单列表   -->
  <Sider collapsible :collapsed-width="62" hide-trigger :value="!open" :style="{'height':'100%'}" :width="variables.sideBarWidth">
    <Menu v-show="open" ref="menu" accordion :theme="menuStyle" width="auto" :active-name="activeName" @on-select="onSelect" :open-names="openName">
      <side-menu v-for="item in currentMenuRoutes" :key="item.path" :item="item"></side-menu>
    </Menu>
    <div :class="['menu-collapsed',`ivu-theme-${menuStyle}`]" v-show="!open" >
      <template v-for="item in currentMenuRoutes">
        <div v-if="!item.hidden" class="menu-collapsed-item" :key="item.path">
          <template v-if="showChildren(item)">
            <Tooltip transfer :content="item.meta.title" placement="right" :key="`drop-menu-${item.path}`">
              <AppLink :to="item.path">
                <Icon v-if="item.meta.icon" :type="item.meta.icon" size="24" />
              </AppLink>
            </Tooltip>
          </template>
          <collapsed-menu v-else :key="item.path" :item="item" topLevel></collapsed-menu>
        </div>
      </template>
    </div>
  </Sider>
</div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import SideMenu from './SideMenu'
import CollapsedMenu from './CollapsedMenu'
import AppLink from './Link'
import variables from '@/assets/style/variables.less'
import mixin from './mixin'
export default {
  mixins: [mixin],
  components: {
    SideMenu,
    CollapsedMenu,
    AppLink
  },
  data () {
    return {
      openName: [],
      activeName: ''
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
    onSelect (name) {
      this.activeName = name
    },
    updateOpenName (name) {
      this.openName = name
    },
    toggleSideMenu () {
      this.TOGGLE_SIDERBAR();
    }
  },
  mounted () {
    this.activeName = this.$route.path
    const match = this.$route.matched
    match.pop()
    match.shift()
    match.map(item => {
      this.openName.push(item.path)
    })
  },
  watch: {
    openName () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  }
}
</script>

<style lang="less">
.sidebar-container {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);

}
</style>
<style lang="less" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: 210px;
  position: relative;

  .side-menu-switch {
    color: #fff;
    background-color: @dark-menu-bg;
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
