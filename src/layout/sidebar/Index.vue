<template>
  <div class="sidebar-container" :class="[menuStyle]">
    <!-- 控制切换按钮 -->
    <div
      class="side-menu-switch"
      @click="toggleSideMenu"
      :title="foldText"
      v-if="globalConfig.layoutStyle === 'fullHeader'"
    >
      <Icon :type="foldCls" />
    </div>
    <!--   左边菜单列表   -->
    <Sider
      :style="{ height: '100%' }"
      :width="variables.sideBarWidth"
    >
      <Menu
        ref="menu"
        accordion
        :theme="menuStyle"
        width="auto"
        :active-name="activeName"
        @on-select="onSelect"
        :open-names="openName"
        :class="[!open ? 'menu-collapsed' : '']"
      >
        <template v-if="open">
          <side-menu
            v-for="item in currentMenuRoutes"
            :key="item.path"
            :item="item"
          ></side-menu>
        </template>
        <template v-else>
            <template v-for="item in currentMenuRoutes">
              <template
                v-if="!item.hidden"
              >
                <template v-if="showChildren(item)">
                  <Tooltip
                    transfer
                    :content="item.meta.title"
                    placement="right"
                    :key="`drop-menu-${item.path}`"
                  >
                   <MenuItem :key="item.path" :name="item.path">
                    <AppLink :to="item.path">
                      <Icon
                        v-if="item.meta.icon"
                        :type="item.meta.icon"
                        size="24"
                      />
                    </AppLink>
                    </MenuItem>
                  </Tooltip>
                </template>
                <collapsed-menu
                  v-else
                  @parentUpdateActiveName="updateActive"
                  :openName="openName"
                  :activeName="activeName"
                  :key="item.path"
                  :item="item"
                  topLevel
                ></collapsed-menu>
              </template>
            </template>
        </template>
      </Menu>
    </Sider>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import SideMenu from './SideMenu';
import CollapsedMenu from './CollapsedMenu';
import AppLink from './Link';
import variables from '@/assets/style/variables.less';
import mixin from './mixin';
// 元素是否在可视区域
function isElementInViewport (el) {
  const rect = el.getBoundingClientRect();
  return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
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
    };
  },
  computed: {
    ...mapState(['open', 'addRoutes', 'globalConfig']),
    menuStyle () {
      return this.globalConfig.menuStyle;
    },
    currentMenuRoutes () {
      return this.addRoutes[0].children; // 从第一项children开始遍历
    },
    variables () {
      // TODO 修改为引用less的变量（做主题配置）
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
      this.activeName = name;
    },
    updateActive (path) {
      this.activeName = path;
    },
    toggleSideMenu () {
      this.TOGGLE_SIDERBAR();
    }
  },
  mounted () {
    this.activeName = this.$route.path;
    const match = this.$route.matched;
    this.openName = match.map((item) => item.path);
  },
  watch: {
    openName () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    },
    $route (to) {
      const match = to.matched;
      this.openName = match.map((item) => item.path);
    },
    // 切换收起展开（需要手动更新）
    open () {
      this.$nextTick(() => {
        if (this.$refs.menu) {
          this.$refs.menu.updateActiveName();
          this.$refs.menu.updateOpened();
          // 聚焦当前项
          this.$nextTick(() => {
            const $activeMenu = document.getElementsByClassName('ivu-menu-item ivu-menu-item-active ivu-menu-item-selected');
            if ($activeMenu && $activeMenu.length && !isElementInViewport($activeMenu[0])) {
              const activeMenuTop = $activeMenu[0].getBoundingClientRect().top;
              const $menu = this.$refs.menu.$el;
              setTimeout(() => {
                this.$ScrollTop($menu, {
                  to: activeMenuTop,
                  time: 0
                });
              }, 300);
            }
          });
        }
      })
    }
  }
};
</script>

<style lang="less">
.sidebar-container {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
   .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
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
