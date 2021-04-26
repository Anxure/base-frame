<template>
<div class="mini-pro-container">
  <a-tooltip class="item" theme="dark" :title="`${percent}%`" placement="top">
    <div class="target" :style="{left : targetPercent + '%',lineHeight : strokeWidthStr,height : strokeWidthStr}">
      <span></span>
      <span></span>
    </div>
  </a-tooltip>
  <div class="pro-wrapper">
    <div class="pro-finished" :style="{width : percent + '%',backgroundColor : color,height : strokeWidthStr}"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'MiniProgress',
  props: {
    strokeWidth: {
      type: Number,
      default: 6
    },
    percent: Number,
    color: {
      type: String,
      default: 'rgb(19, 194, 194)'
    }
  },
  computed: {
    strokeWidthStr () {
      return this.strokeWidth + 'px'
    },
    targetPercent () {
      return this.percent === 100 ? this.percent : this.percent + 2
    }
  }
}
</script>

<style lang="less" scoped>
.mini-pro-container {
  position: relative;
  width: 100%;

  .target {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    transition: left 1s;

    &>span {
      display: inline-block;
      width: 2px;
      background-color: rgb(19, 194, 194);
      height: 3px;
      position: absolute;

      &:first-child {
        top: -3px;
      }

      &:last-child {
        bottom: -3px;
      }
    }
  }

  .pro-wrapper {
    background-color: #f1f1f1;

    .pro-finished {
      width: 0;
      transition: width 1s;
    }
  }
}
</style>
