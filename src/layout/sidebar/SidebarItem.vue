<!--
 * @Author: ykx
 * @Date: 2021-04-23 16:30:49
 * @LastEditTime: 2021-04-25 15:14:27
 * @LastEditors: your name
 * @Description:
 * @FilePath: \zdww-base-frame\src\layout\sidebar\SidebarItem.vue
-->
/**
 * @Author: xulian
 * @Date: 2019-12-19 17:15:24
 * @Last Modified by: xulian
 * @Last Modified time: 2019-12-19 17:15:44
 * @Desc: 无限级菜单组件 采用组件递归形式 （绝对路由直接绑定url,非绝对路由需要对key进行处理）
 */
<template functional>
  <a-sub-menu
    :key="props.menuInfo.path"
    :class="{'menu2 root-menu-item': props.rootSubmenuKeys.indexOf(props.menuInfo.path) !== -1}"
  >
    <div
      slot="title"
      :class="{'root openMenu' : props.rootSubmenuKeys.indexOf(props.menuInfo.path) !== -1}"
    >
      <template v-if="props.rootSubmenuKeys.indexOf(props.menuInfo.path) !== -1">
        <!-- 采用自带图标 -->
        <a-icon :type="props.menuInfo.meta.icon" />
        <span :title="props.menuInfo.meta.title">{{props.menuInfo.meta.title}}</span>
      </template>
      <span
        v-else
        :title="props.menuInfo.meta.title"
      >
        {{ props.menuInfo.meta.title }}
      </span>
    </div>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="(item.children && item.children.length === 0) || !item.children"
        :key="item.path"
      >
        <router-link :to="item.path">
          <!-- <i class="iconfont iconshuangxiangyoujiantou" /> 去掉箭头 -->
          {{ item.meta.title }}
        </router-link>
      </a-menu-item>
      <sidebar-item
        v-else
        :key="item.path"
        :menu-info="item"
        :rootSubmenuKeys="props.rootSubmenuKeys"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo', 'rootSubmenuKeys']
};
</script>
<style lang="less" scoped>
</style>
