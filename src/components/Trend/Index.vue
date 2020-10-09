<template>
    <div class="trend-wrapper">
        <span>
            <slot></slot>
            <Icon class="trend-icon" :type="flag === 'up' ? 'md-arrow-dropup' : 'md-arrow-dropdown'" :size="18"></Icon>
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

<style lang="less" scoped>
    .trend-wrapper{
        display: inline-block;
        &:not(last-child){
            margin-right: 20px;
        }
        .trend-icon{
            margin-left: 5px;
        }
        i.ivu-icon-md-arrow-dropup{
            color:#f5222d;
        }
        i.ivu-icon-md-arrow-dropdown{
            color:#52c41a;
        }
    }
</style>
