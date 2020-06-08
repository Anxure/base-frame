<template>
    <div class="sidebar-container " :class="[menuStyle]"
         :style="{'background-color' : variables[`${menuStyle}MenuBg`]}">
        <Logo :collapse="!open"/>
        <!--   左边菜单列表     -->
        <vue-scroll>
            <el-menu
                    :default-active="activeMenu"
                    :background-color="variables[`${menuStyle}MenuBg`]"
                    :text-color="variables[`${menuStyle}MenuText`]"
                    :active-text-color="variables[`${menuStyle}MenuActiveColor`]"
                    :collapse-transition="false"
                    :collapse="!open"
            >
                <SidebarItem
                        v-for="route in currentMenuRoutes"
                        :key="route.path"
                        :item="route"
                >
                </SidebarItem>
            </el-menu>
        </vue-scroll>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { config } from '@/config'
import variables from '@/assets/style/variables.scss'
import SidebarItem from './SidebarItem'
import Logo from './Logo.vue'
export default {
  data () {
    return {
      menuStyle: config.menuStyle
    }
  },
  components: { Logo, SidebarItem },
  computed: {
    ...mapState(['open', 'addRoutes']),
    currentMenuRoutes () {
      return this.addRoutes[0].children; // 从第一项children开始遍历
    },
    variables () { // TODO 修改为引用scss的变量（做主题配置）
      return variables;
    },
    activeMenu () {
      return this.$route.path;
    }
  }
}
</script>
<style lang="scss">
    .sidebar-container{
        box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
        .el-menu-item{
            width:auto;
        }
        //这里未提供相关props，采用样式覆盖了
        &.light{
            .logo-wrapper{
                background: #fff;
                margin-bottom: 1px;
                box-shadow: 1px 1px 0 0 #e8e8e8;
                h1.sidebar-title{
                    color:#409EFF;
                }
            }
            border-right: 1px solid #e8e8e8;
            .el-submenu__title:focus,.el-submenu__title:hover,
            .el-menu-item:focus, .el-menu-item:hover {
                outline: none;
                background-color: #ecf5ff !important;
            }
        }
        .el-menu{
            border: none;//去除右边框
            a{
                display: inline-block;
                width:100%;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .sidebar-container{
        transition: width 0.28s;
        width:210px;
    }
    .scrollbar-wrapper{
        overflow-x: hidden !important;
    }
</style>
