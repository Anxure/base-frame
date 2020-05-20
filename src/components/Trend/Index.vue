<template>
    <div class="trend-wrapper">
        <span>
            <slot></slot>
            <i :class="['trend-icon',flag === 'up' ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
        </span>
    </div>
</template>

<script>
export default {
  name: 'Trend',
  props: {
    flag: {
      type: String,
      default: 'up'
    }
  }
}
</script>

<style lang="scss" scoped>
    .trend-wrapper{
        display: inline-block;
        &:not(last-child){
            margin-right: 20px;
        }
        .trend-icon{
            margin-left: 5px;
        }
        i.el-icon-caret-top{
            color:#f5222d;
        }
        i.el-icon-caret-bottom{
            color:#52c41a;
        }
    }
</style>
