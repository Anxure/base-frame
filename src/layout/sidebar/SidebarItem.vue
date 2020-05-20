<template>
 <!-- 这里使用的elem自带的图标 -->
    <div v-if="!item.hidden">
        <template v-if="showOneChildMenu">
            <AppLink :to="item.path">
                <el-menu-item :index="item.path"
                >
                 <i v-if="item.meta.icon" :class="`el-icon-${item.meta.icon}`"></i>
                <span>{{item.meta.title}}</span>
                </el-menu-item>
            </AppLink>
        </template>
        <el-submenu :index="item.path" v-else>
            <template slot="title">
              <i v-if="item.meta.icon" :class="`el-icon-${item.meta.icon}`"></i>
              <span v-if="item.meta">{{item.meta.title}}</span>
            </template>
            <SidebarItem
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
            ></SidebarItem>
        </el-submenu>
    </div>
</template>

<script>
import AppLink from './Link'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  components: {
    AppLink
  },
  computed: {
    showOneChildMenu () {
      const children = this.item.children || [];
      return !children.some(item => !item.hidden);
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
    /*elem图标*/
    .el-icon-s-grid{
        font-size: 16px;
        margin-right: 8px;
        margin-left: -5px;
    }
</style>
