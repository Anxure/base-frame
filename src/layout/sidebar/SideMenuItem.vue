<template>
  <Submenu :name="`${item}`">
    <template slot="title">
     <AppLink :to="item.path">
        <Icon v-if="item.meta.icon" :type="item.meta.icon" size="18" />
        <span>{{item.meta.title}}111</span>
      </AppLink>
    </template>
  </Submenu>
</template>

<script>
import AppLink from './Link'
import variables from '@/assets/style/variables.scss'
import {
  mapState
} from 'vuex'
export default {
  name: 'SideMenuItem',
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
    ...mapState(['open', 'globalConfig']),
    menuStyle () {
      return this.globalConfig.menuStyle
    },
    showOneChildMenu () {
      const children = this.item.children || [];
      return children.every(item => item.hidden);
    },
    variables () { // TODO 修改为引用scss的变量（做主题配置）
      return variables;
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.title-icon {
  width: 100%;
  height: 52px;
  padding: 14px 19px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
