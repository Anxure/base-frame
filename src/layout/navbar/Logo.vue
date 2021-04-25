<template>
  <div
    class="logo-wrapper"
    :class="{'collapse' : collapse}"
    :style="{'background-color' : variables[`${menuStyle}MenuBg`]} "
  >
    <template>
      <router-link to="/">
        <img
          :src="logo"
          alt=""
          class="sidebar-logo"
        >
        <transition name="sidebarLogoFade">
          <h1
            v-if="!collapse"
            class="sidebar-title"
            :style="{'color': menuStyle === 'dark' ? variables[`lightMenuBg`] : variables[`darkMenuBg`]}"
          >{{title}}</h1>
        </transition>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import variables from '@/assets/style/variables.less';
export default {
  data () {
    return {
      title: 'vue-base-frame',
      logo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    };
  },
  props: {
    collapse: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    ...mapState(['globalConfig']),
    menuStyle () {
      return this.globalConfig.menuStyle;
    },
    variables () {
      // TODO 修改为引用scss的变量（做主题配置）
      return variables;
    }
  }
};
</script>
<style lang="less">
// flex显示会抖动下
.sidebarLogoFade-enter-active {
  transition: opacity .3s;
}
.sidebarLogoFade-leave-active {
  transition: opacity 0s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
<style lang="less" scoped>
.logo-wrapper {
  transition: width 0.2s;
  &.collapse {
    width: @colSideBarWidth;
  }

  width: @sideBarWidth;
  box-sizing: border-box;
  text-align: center;
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }

  .sidebar-title {
    font-size: 16px;
    display: inline-block;
    margin: 0;
    margin-left: 12px
  }
}
</style>
