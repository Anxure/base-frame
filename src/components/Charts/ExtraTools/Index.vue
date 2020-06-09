<template>
  <div class="extra-container">
    <span>展示数据：</span>
    <a-dropdown-button>
      {{selectedKeys[0]}}
      <a-menu selectable slot="overlay" @click="selectMenuItem" :selectedKeys="selectedKeys" class="menuStyle"
        placement="bottomRight">
        <a-menu-item key="5">5</a-menu-item>
        <a-menu-item key="10">10</a-menu-item>
        <a-menu-item key="15">15</a-menu-item>
      </a-menu>
    </a-dropdown-button>

    <div class="dir-arrow-wrapper">
      <span class="arrow-item" :class="enablePrev && 'disabled'" :title="!enablePrev && '上一页'"
        @click="handleDir('prev')">
        <a-icon type="left" />
      </span>
      <span class="arrow-item" :class="enableNext && 'disabled'" :title="!enableNext && '下一页'"
        @click="handleDir('next')">
        <a-icon type="right" />
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ExtraTools',
  props: ['enablePrev', 'enableNext'],
  data () {
    return {
      selectedKeys: ['10']
    }
  },
  methods: {
    /**
     * 当前页显示量变化
     * @param
    */
    selectMenuItem (row) {
      this.selectedKeys = [row.key];
      this.$emit('pageSizeChange', row.key);
    },
    /**
     * 上一页下一页
     * @param {String} type - 翻页
    */
    handleDir (type) {
      this.$emit('pageChange', type);
    }
  }
}
</script>

<style lang="less" scoped>
.menuStyle {
  min-width: 80px;
}
.dir-arrow-wrapper {
  display: inline-block;
  margin-left: 20px;

  .arrow-item {
    text-align: center;
    display: inline-block;
    background-color: #054e8b;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &.disabled {
      background-color: #ccc !important;
      cursor: not-allowed;
    }
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>
