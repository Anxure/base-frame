<template>
    <div class="nav-wrapper clearfix">
        <div class="side-menu-switch" @click="toggleSideMenu" :title="foldText">
            <i :class="foldCls"></i>
        </div>
       <div class="nav-right-content">
            <el-dropdown class="actions-item" @command="handleCommand">
                <div class="action-trigger">
                    <img :src="userInfo.avatar" class="avatar" alt="">
                    <span class="user-name">{{userInfo.name}}</span>
                </div>
                <el-dropdown-menu>
                    <el-dropdown-item command="screen">
                        大屏展示
                    </el-dropdown-item>
                    <el-dropdown-item command="loginOut">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import variables from '@/assets/style/variables.scss'
export default {
  name: 'Navbar',
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'open'
    ]),
    foldCls () {
      return (this.open ? 'el-icon-s-fold' : 'el-icon-s-unfold')
    },
    foldText () {
      return `点击${this.open ? '收起' : '展开'}`
    },
    variables () { // TODO 修改为引用scss的变量（做主题配置）
      return variables
    }
  },
  created () {
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
        res && res.code === 0 && (this.$router.push(`/login?redirect=${this.$route.fullPath}`));
      })
    }
  }
}
</script>
<style lang="scss">
    .nav-wrapper{
        box-shadow: 2px 2px 5px #f0f1f2;//水平向右边偏移
        position: relative;
        .el-menu{
            padding-left: 20px;
            float: left;
        }
        .el-menu-item{
            text-align: center;
        }
        .el-menu.el-menu--horizontal {
            border-bottom: none;
        }
    }

</style>
<style lang="scss" scoped>
    .nav-wrapper{
        height:60px;
        line-height: 60px;
        .side-menu-switch{
            width:25px;
            padding:0 15px;
            display: inline-block;
            height:60px;
            float: left;
            cursor: pointer;
            transition: background .3s;
            &:hover{
                background-color: rgba(0, 0, 0, 0.025);
            }
            i{
                font-size: 25px;
                line-height: 60px;//父级无效...
            }
        }
    }
    .nav-right-content{
        float: right;
        .actions-item{
            text-align: center;
            transition: background-color 0.3s;
            background-color: #fff;
            padding:0 12px;
            &:hover{
                background: rgba(0,0,0,.025);
            }
            .action-trigger{
                cursor: pointer;
                &.language{
                    transform: scale(1.3);//这里fontsize 回影响左边高度（line-height?）

                    .svg-icon{
                        margin-right: 0;
                    }
                }
            }
            &:last-child{
                margin-right: 0;
            }
        }
        .avatar{
            width:40px;
            height:40px;
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
