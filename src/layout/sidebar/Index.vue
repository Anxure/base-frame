<template>
  <a-layout-sider
    :collapsed="!open"
    :trigger="null"
    collapsible
    class="fixed-sider"
  >
    <a-menu
      :openKeys="openKeys"
      @openChange="onOpenChange"
      @click="onMenuClick"
      :selectedKeys="menuSelectedKeys"
      style="height:100%"
      theme="dark"
      mode="inline"
    >
      <template v-for="item in currentMenuRoutes">
        <a-menu-item
          v-if="(!item.hidden && item.children && item.children.length === 0) || !item.children"
          :key="item.path"
        >
          <app-link :to="item.path">
            <!-- 采用自带图标 -->
            <a-icon :type="item.meta.icon" />
            <span :title="item.meta.title">{{item.meta.title}}</span>
          </app-link>
        </a-menu-item>
        <sidebar-item
          v-else
          :menu-info="item"
          :rootSubmenuKeys="rootSubmenuKeys"
          :key="item.path"
        />
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import SidebarItem from './SidebarItem';
import AppLink from './Link';
import { mapState } from 'vuex';
export default {
  components: {
    SidebarItem,
    AppLink
  },
  data () {
    return {
      openKeys: [],
      menuSelectedKeys: []
    };
  },
  computed: {
    ...mapState(['addRoutes', 'open']),
    currentMenuRoutes () {
      return this.addRoutes[0].children; // 从第一项children开始遍历
    },
    // 首层keys
    rootSubmenuKeys () {
      return this.currentMenuRoutes && this.currentMenuRoutes.length > 0
        ? this.currentMenuRoutes.map((item) => item.path)
        : [];
    }
  },
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      console.log(latestOpenKey);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    onMenuClick (item) {
      this.menuSelectedKeys = item.keyPath;
    }
  },
  created () {
    const matchedKeys = this.$route.matched.map((item) => item.path);
    this.menuSelectedKeys = matchedKeys.slice(1); // 不含第一项
    this.openKeys = matchedKeys.slice(1, matchedKeys.length);
  },
  watch: {
    open (val) {
      const matchedKeys = this.$route.matched.map((item) => item.path);
      // 展开时还原openKeys
      !val && (this.openKeys = matchedKeys.slice(1, matchedKeys.length));
    }
  }
};
</script>
<style lang="less">
.fixed-sider {
  .ant-menu-item a {
    color: inherit; // 防止默认a为蓝色，这使用继承父级，避免重复写设置代码
  }
}
</style>
<style lang="less" scoped>
.fixed-sider {
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
