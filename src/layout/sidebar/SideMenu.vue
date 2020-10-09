<template>
<div class="side-menu-wrapper">
  <template v-if="!item.hidden">
    <template v-if="showChildren(item)">
      <MenuItem :name="item.path" :to="item.path" :target="isExternal(item.path)">
        <Icon v-if="item.meta.icon" :type="item.meta.icon" size="18" />
        <span>{{item.meta.title}}</span>
      </MenuItem>
    </template>
    <Submenu :name="item.path" v-else>
      <template slot="title">
        <Icon v-if="item.meta.icon" :type="item.meta.icon" size="18" />
        <span v-if="item.meta">{{item.meta.title}}</span>
      </template>
      <side-menu v-for="child in item.children" :key="child.path" :item="child"></side-menu>
    </Submenu>
  </template>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'
import { isExternal } from '@/utils'
import mixin from './mixin'
export default {
  name: 'SideMenu',
  mixins: [mixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    isExternal (path) {
      return isExternal(path) ? '_blank' : '_self'
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

<style lang="less">

</style>
