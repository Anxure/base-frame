<template>
    <div class="logo-wrapper" :class="{'collapse' : collapse}">
        <transition name="sidebarLogoFade">
            <!--收起显示-->
            <router-link v-if="collapse" key="collapse" to="/">
                <img :src="logo" alt="" class="sidebar-logo" style="margin-right:0">
            </router-link>
            <!--展开显示-->
            <router-link v-else  key="expand" to="/">
                <img :src="logo" alt="" class="sidebar-logo">
                <h1 class="sidebar-title">{{title}}</h1>
            </router-link>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'vue-base-frame',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  props: {
    collapse: {
      type: Boolean,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>

    //查看过度文档
    .sidebarLogoFade-enter-active{
        transition: opacity 1.5s;
    }
    .sidebarLogoFade-enter,
    .sidebarLogoFade-leave-to{
        opacity: 0;
    }
    .logo-wrapper{
        transition: width 0.28s;
        &.collapse{
            width: $colSideBarWidth;
        }
        width: $sideBarWidth;
        box-sizing: border-box;
        height:60px;
        line-height: 60px;
        background-color: #2b2f3a;
        text-align: center;
        &>a{
            display: inline-block;
            width: 100%;
            height:100%;
            overflow: hidden;
        }
        .sidebar-logo{
            width:32px;
            height:32px;
            vertical-align: middle;
            margin-right:12px;
        }
        .sidebar-title{
            color:#fff;
            font-size: 16px;
            display: inline-block;
            margin: 0;
        }
    }

</style>
