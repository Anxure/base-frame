<template>
    <a-card class="chart-card-container">
        <div slot="title"  v-if="showTitleSlot">
          <slot name="title"></slot>
        </div>
        <div slot="extra"  v-if="showExtraSlot">
            <slot name="extra"></slot>
        </div>
        <div :style="{height: typeof bodyH === 'string' ? bodyH : bodyH + 'px'}">
          <slot></slot>
        </div>
        <div class="footer-wrapper">
            <slot name="footer"></slot>
        </div>
    </a-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: {
    bodyH: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data () {
    return {
      showTitleSlot: false,
      showExtraSlot: false
    }
  },
  // 需要放在created中
  created () {
    // 注：span 无法作为slot节点
    this.showTitleSlot = !!this.$slots.title;
    this.showExtraSlot = !!this.$slots.extra;
  }
}
</script>
<!--scoped下 子组件无法影响 slot 样式-->
<style lang="less">
.has-radio-group{
  .ant-card-extra{
    padding: 12px 0;
  }
}
</style>
