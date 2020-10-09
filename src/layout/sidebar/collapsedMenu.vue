<template>
<Dropdown placement="right">
  <li v-if="topLevel" :class="{'top-level' : topLevel, menuItemClasses}">
    <Icon v-if="item.meta.icon" :type="item.meta.icon"  size="24" />
  </li>
  <DropdownItem v-else>
    <Icon v-if="item.meta.icon" :type="item.meta.icon" size="24" />
    <span v-if="!topLevel">{{item.meta.title}}
      <Icon type="ios-arrow-forward"></Icon>
    </span>
  </DropdownItem>
  <DropdownMenu slot="list">
    <template v-for="child in item.children">
      <template v-if="!child.hidden">
        <template v-if="showChildren(child)">
          <DropdownItem :key="child.path">
            <AppLink :to="item.path">
              <span>{{item.meta.title}}1111</span>
            </AppLink>
          </DropdownItem>
        </template>
        <collapsed-menu v-else :item="child" :key="child.path"></collapsed-menu>
      </template>
    </template>
  </DropdownMenu>

</Dropdown>
</template>

<script>
import mixin from './mixin'
import AppLink from './Link'
export default {
  name: 'CollapsedMenu',
  mixins: [mixin],
  props: {
    item: {
      type: Object,
      required: true
    },
    topLevel: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AppLink
  },
  computed: {
    menuItemClasses () {
      return 1
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="less">

</style>
