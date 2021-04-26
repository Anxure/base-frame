<template>
  <div class="trend-wrapper">
    <span>
      <slot></slot>
      <a-icon
        :class="['trend-icon', flag === 'up' ? 'arrow-up' : 'arrow-down']"
        :type="flag === 'up' ? 'arrow-up' : 'arrow-down'"
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
    &.arrow-down {
      color: #ff4d4f;
    }
    &.arrow-up {
      color: #52c41a;
    }
  }
}
</style>
