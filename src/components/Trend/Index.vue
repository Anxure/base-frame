<template>
  <div class="trend-wrapper">
    <span>
      <slot></slot>
      <a-icon
        :class="['trend-icon', flag === 'up' ? 'caret-up' : 'caret-down']"
        :type="flag === 'up' ? 'caret-up' : 'caret-down'"
        :size="18"
      ></a-icon>
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
};
</script>

<style lang="less" scoped>
.trend-wrapper {
  display: inline-block;
  &:not(last-child) {
    margin-right: 20px;
  }
  .trend-icon {
    margin-left: 5px;
    &.caret-down {
      color: #ff4d4f;
    }
    &.caret-up {
      color: #52c41a;
    }
  }
}
</style>
