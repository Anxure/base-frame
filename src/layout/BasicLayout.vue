<template>
    <div class="basicLayout" :class="changeCls">
        <Sidebar class="fixed"></Sidebar>
        <div class="main-content" :style="{
                    'margin-left' : sideBarWidth,
                    'padding-top' : '60px'
                    }">
            <div class="global-header fixed"
                 :style="{ width:`calc(100% - ${sideBarWidth})`}">
                <Navbar></Navbar>
            </div>
            <div class="main-content-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Navbar from './Navbar'
import Sidebar from './sidebar/Index.vue'
import variables from '@/assets/style/variables.scss'
export default {
  name: 'index',
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    ...mapState(['open']),
    // 改变后的样式类型
    changeCls () {
      return {
        hideSidebar: !this.open
      }
    },
    sideBarWidth () {
      return this.open ? variables.sideBarWidth : variables.colSideBarWidth;
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss">
    /*收起隐藏*/
    .basicLayout.hideSidebar{
        .sidebar-container{
            .el-menu--collapse{
                width:$colSideBarWidth;
            }
            .el-submenu,.el-menu-item,.el-submenu__title{
                &>span, &> .el-icon-arrow-right{
                    display: none;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    @import "../assets/style/variables.scss";
    .global-header{
        background-color: #fff;
        transition: width .28s;
        position: relative;
        &.fixed{
            position: fixed;
            top:0;
            right:0;
            z-index:200;
        }
    }
    .basicLayout{
        /*左边菜单组件*/
        display: flex;
        .sidebar-container{
            position: relative;
            z-index: 10;
            min-height: 100vh;
            &.fixed{
                position: fixed;
                top:0;
                bottom:0;
                left: 0;
            }
        }
        .main-content{
            background-color: $normalBg;
            transition: margin-left .28s;
            flex:1;
            min-height:calc(100vh - 60px);
            .main-content-body {
                margin:$base-margin;
            }
        }
        &.hideSidebar{
            .sidebar-container{
                width:$colSideBarWidth;
            }
            .main-content{
                margin-left: 54px;
            }
            .el-submenu .el-submenu__title{
                &>span{
                    display: none;
                }
            }
        }
    }

</style>
