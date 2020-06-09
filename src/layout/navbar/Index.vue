<template>
  <div class="nav-wrapper">
    <Logo :collapse="logoOpen"/>
    <div class="nav-right-wrapper">
      <div class="nav-left-content">
        <div class="side-menu-switch" @click="toggleSideMenu" :title="foldText" v-if="globalConfig.layoutStyle === 'partHeader'">
          <i :class="foldCls"></i>
        </div>
       <el-breadcrumb separator="/" v-show="isShowBread" style="margin-left:10px">
        <el-breadcrumb-item v-for="item in breadcrumbData" :key="item.path">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="nav-right-content">
        <el-dropdown class="actions-item" @command="handleCommand">
          <div class="action-trigger">
            <img :src="userInfo.avatar" class="avatar" alt />
            <span class="user-name">{{userInfo.name}}</span>
          </div>
          <el-dropdown-menu>
            <el-dropdown-item command="screen">大屏展示</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Logo from './Logo.vue';
import variables from '@/assets/style/variables.scss';
export default {
  name: 'Navbar',
  data () {
    return {
      activeIndex: '1',
      curMeta: {}, // 当前路由预留信息段
      matchedRoutes: [] // 匹配的路由项（会按照树级结构返回）
    };
  },
  components: { Logo },
  computed: {
    ...mapState(['userInfo', 'open', 'globalConfig']),
    foldCls () {
      return this.open ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    },
    foldText () {
      return `点击${this.open ? '收起' : '展开'}`;
    },
    variables () {
      // TODO 修改为引用scss的变量（做主题配置）
      return variables;
    },
    logoOpen () {
      return this.globalConfig.layoutStyle === 'partHeader' ? !this.open : false;
    },
    breadcrumbData () {
      const tempRoutes = this.matchedRoutes.map(route => {
        const { meta } = route;
        return { title: meta.title, path: route.path };
      }).filter(r => !!r.path);
      return tempRoutes || [];
    },
    // 是否显示面包屑（全局配置 openBreadcrumd, 当前路由 hiddenBreadcrumb）
    isShowBread () {
      return this.globalConfig.openBreadcrumd || !this.curMeta.hiddenBreadcrumb
    }
  },
  created () {
    this.curMeta = this.$route.meta;
    this.matchedRoutes = this.$route.matched;
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDERBAR']),
    ...mapActions(['loginOut']),
    toggleSideMenu () {
      this.TOGGLE_SIDERBAR();
    },
    handleCommand (key) {
      switch (key) {
        case 'loginOut':
          this.logout();
          break;
        // https://www.jianshu.com/p/c796266442b9 添加块级作用域
        case 'screen': {
          // 跳转新界面
          const { href } = this.$router.resolve({ path: '/screenDataAls' });
          window.open(href, '_blank');
          break;
        }
      }
    },
    logout () {
      this.$confirm('是否退出登录？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.loginOut();
        res &&
          res.code === 0 &&
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      });
    }
  },
  watch: {
    $route () {
      this.curMeta = this.$route.meta;
      this.matchedRoutes = this.$route.matched;
    }
  }
};
</script>
<style lang="scss">
.nav-wrapper {
  position: relative;
  display: flex;
  .el-menu {
    padding-left: 20px;
    float: left;
  }
  .el-menu-item {
    text-align: center;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .nav-right-wrapper{
    flex:1;
    box-shadow: 2px 2px 5px #f0f1f2; //水平向右边偏移
    width: calc(100% - #{$sideBarWidth}); // calc变量使用插值
  }
}
</style>
<style lang="scss" scoped>
.nav-wrapper {
  height: 60px;
  line-height: 60px;
  .side-menu-switch {
    width: 25px;
    padding: 0 15px;
    display: inline-block;
    height: 60px;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
    i {
      font-size: 25px;
      line-height: 60px; //父级无效...
    }
  }
  .nav-right-wrapper{
    @include fj();
  }
}
.nav-left-content{
  @include fj(flex-start);
}
.nav-right-content {
  .actions-item {
    text-align: center;
    transition: background-color 0.3s;
    background-color: #fff;
    padding: 0 12px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
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
