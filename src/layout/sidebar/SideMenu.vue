<template>
  <div class="side-menu-wrapper">
    <Menu ref="menu"  :active-name="$route.name" :open-names="openedNames"  :theme="menuStyle"  width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
        <side-menu-item :item="item" :key="item.path"></side-menu-item>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SideMenuItem from './SideMenuItem.vue'
export default {
  name: 'SideMenu',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SideMenuItem
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    handleSelect () {

    }
  },
  computed: {
    ...mapState(['open', 'globalConfig']),
    menuStyle () {
      return this.globalConfig.menuStyle
    }
  }
}
</script>
<style lang="scss">

</style>
