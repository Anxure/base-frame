<template>
  <Dropdown placement="right">
    <li v-if="topLevel" :class="[topLevel && 'top-level', menuItemClasses]">
      <Icon v-if="item.meta.icon" :type="item.meta.icon" size="24" />
    </li>
    <DropdownItem
      v-else
      :class="{
        'dropdown-collapse-item-title-selected':
          openName.indexOf(item.path) >= 0,
      }"
    >
      <Icon v-if="item.meta.icon" :type="item.meta.icon" size="24" />
      <span v-if="!topLevel"
        >{{ item.meta.title }}
        <Icon type="ios-arrow-forward"></Icon>
      </span>
    </DropdownItem>
    <DropdownMenu slot="list">
      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <template v-if="showChildren(child)">
            <!-- 这里添加原生事件 -->
            <AppLink :to="child.path" :key="child.path">
              <DropdownItem
                :key="child.path"
                @click.native="updateActiveName(child.path)"
                :class="{
                  'dropdown-collapse-item-selected': child.path === activeName,
                }"
              >
                <span>{{ child.meta.title }}</span>
              </DropdownItem>
            </AppLink>
          </template>
          <!-- 这里把初始属性再次传入,$listeners 传入事件 -->
          <collapsed-menu
            v-else
            :item="child"
            :openName="openName"
            :activeName="activeName"
            @parentUpdateActiveName="$listeners.parentUpdateActiveName"
            :key="child.path"
          ></collapsed-menu>
        </template>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import mixin from './mixin';
import AppLink from './Link';
export default {
  name: 'CollapsedMenu',
  mixins: [mixin],
  props: {
    item: {
      type: Object,
      required: true
    },
    openName: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      default: ''
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
      return [
        'ivu-menu-item',
        {
          'ivu-menu-item-selected ivu-menu-item-active':
            this.openName.indexOf(this.item.path) >= 0 // -active 在高亮时，有背景
        }
      ];
    }
  },
  mounted () {
    console.log(this.$route);
  },
  methods: {
    updateActiveName (path) {
      this.$emit('parentUpdateActiveName', path);
    }
  }
};
</script>

<style lang="less">
</style>
