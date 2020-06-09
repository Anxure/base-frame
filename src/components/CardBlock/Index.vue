<template>
    <el-card class="chart-card-container" shadow="never">
        <div slot="header" v-if="hasHeader" class="clearfix">
            <slot name="header"></slot>
        </div>
        <div :style="{height: typeof bodyH === 'string' ? bodyH : bodyH + 'px'}">
          <slot></slot>
        </div>
        <div class="footer-wrapper">
            <slot name="footer"></slot>
        </div>
    </el-card>
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
      hasHeader: false
    }
  },
  mounted () {
    this.hasHeader = !!this.$slots.header
  }
}
</script>
<!--scoped下 子组件无法影响 slot 样式-->
<style lang="scss">

</style>
