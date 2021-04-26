<template>
  <div class="nav-wrapper">
    <Logo :collapse="logoOpen" />
    <div class="nav-right-wrapper">
      <div class="nav-left-content">
        <div
          class="side-menu-switch"
          @click="toggleSideMenu"
          :title="foldText"
          v-if="globalConfig.layoutStyle === 'partHeader'"
        >
         <a-icon type="menu-fold" v-show="open"/>
         <a-icon type="menu-unfold" v-show="!open"/>
        </div>
        <a-breadcrumb
          separator="/"
          v-show="isShowBread"
          :style="breadcrumbStyle"
        >
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbData"
            :key="item.path"
          >
            <span v-if="index === breadcrumbData.length - 1">{{item.title}}</span>
            <router-link
              :to="item.path"
              v-else
            >
              {{item.title}}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="nav-right-content">
        <a-dropdown class="actions-item">
          <div class="action-trigger">
            <img
              :src="userInfo.avatar"
              class="avatar"
              alt
            />
            <span class="user-name">{{userInfo.name}}</span>
          </div>
          <a-menu
            slot="overlay"
            @click="handleCommand"
          >
            <a-menu-item key="screen">
              大屏展示
            </a-menu-item>
            <a-menu-item key="loginOut">
              退出登录
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Logo from './Logo.vue';
import variables from '@/assets/style/variables.less';
export default {
  name: 'Navbar',
  data () {
    return {
      activeIndex: '1',
      curMeta: {}, // 当前路由预留信息段
      matchedRoutes: [] // 匹配的路由项（会按照树级结构返回）
    };
  },
  components: {
    Logo
  },
  computed: {
    ...mapState(['userInfo', 'open', 'globalConfig']),
    breadcrumbStyle () {
      return this.globalConfig.layoutStyle === 'partHeader'
        ? {
          marginLeft: '10px'
        }
        : {
          marginLeft: '22px'
        };
    },
    rotateIcon () {
      return ['menu-icon', this.open ? '' : 'rotate-icon'];
    },
    foldText () {
      return `点击${this.open ? '收起' : '展开'}`;
    },
    variables () {
      // TODO 修改为引用scss的变量（做主题配置）
      return variables;
    },
    logoOpen () {
      return this.globalConfig.layoutStyle === 'partHeader'
        ? !this.open
        : false;
    },
    breadcrumbData () {
      if (this.matchedRoutes.some((item) => !!item.meta)) {
        const tempRoutes = this.matchedRoutes
          .map((route) => {
            const { meta } = route;
            return {
              title: meta.title,
              path: route.path
            };
          })
          .filter((r) => !!r.path);
        return tempRoutes || [];
      }
      return this.matchedRoutes;
    },
    // 是否显示面包屑（全局配置 openBreadcrumd, 当前路由 hiddenBreadcrumb）
    isShowBread () {
      return this.globalConfig.openBreadcrumd || !this.curMeta.hiddenBreadcrumb;
    }
  },
  created () {
    this.curMeta = this.$route.meta;
    this.matchedRoutes = this.curMeta.breadcrumbs || this.$route.matched;
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDERBAR']),
    ...mapActions(['loginOut']),
    toggleSideMenu () {
      this.TOGGLE_SIDERBAR();
    },
    handleCommand ({ key }) {
      switch (key) {
        case 'loginOut':
          this.logout();
          break;
        // https://www.jianshu.com/p/c796266442b9 添加块级作用域
        case 'screen': {
          // 跳转新界面
          const { href } = this.$router.resolve({
            path: '/screenDataAls'
          });
          window.open(href, '_blank');
          break;
        }
      }
    },
    logout () {
      this.$confirm({
        title: '系统提示',
        content: '是否退出登录？',
        onOk: async () => {
          const res = await this.loginOut();
          res &&
            res.code === 0 &&
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }
      });
    }
  },
  watch: {
    $route () {
      this.curMeta = this.$route.meta;
      this.matchedRoutes = this.curMeta.breadcrumbs || this.$route.matched;
    }
  }
};
</script>

<style lang="less">
.nav-wrapper {
  display: flex;
  .nav-right-wrapper {
    flex: 1;
    box-shadow: 2px 2px 5px #f0f1f2; //水平向右边偏移
    width: calc(~"100% - @{sideBarWidth}"); // calc变量使用插值;
  }
}
</style>
<style lang="less" scoped>
.rotate-icon {
  transform: rotate(-90deg);
}

.nav-wrapper {
  height: 60px;
  .side-menu-switch {
    padding: 0 15px;
    display: inline-block;
    cursor: pointer;
    transition: background 0.3s;
    height: 60px;
    line-height: 60px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }

    i {
      font-size: 20px;
      vertical-align: -.225em;
    }
  }

  .nav-right-wrapper {
    .fj();
  }
}

.nav-left-content {
  .fj(flex-start);
}

.nav-right-content {
  .actions-item {
    height: 60px;
    line-height: 60px;
    text-align: center;
    transition: background-color 0.3s;
    background-color: #fff;
    padding: 0 12px;

    &:hover {
      background: rgba(31, 30, 30, 0.025);
    }

    .action-trigger {
      cursor: pointer;

      &.language {
        transform: scale(1.3); //这里fontsize 回影响左边高度（line-height?）

        .svg-icon {
          margin-right: 0;
        }
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 15px;
  }
}

.el-dropdown-menu__item.selected {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>
