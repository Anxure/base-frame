<template>
  <div class="chart-outer-container">
    <!--loading显示-->
    <div class="loading-wrapper" v-if="loading">
      <a-spin :spinner="true"></a-spin>
    </div>
    <div class="chart" v-else ref="chartNode" :style="{height:height,width:width}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { merge, cloneDeep } from 'lodash'
import defaultOption from './defaultOption'
export default {
  name: 'Pie',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object,
      default: () => ({})
    },
    changeLineNum: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      chart: null,
      defaultOption // 默认配置项
    }
  },
  components: { },
  mounted () {
    this.initChart();
  },
  methods: {
    initChart () {
      if (!this.$refs.chartNode) { return }
      this.chart = echarts.init(this.$refs.chartNode, 'walden');// 初始化实例&主题配置
      const that = this;
      that.chart.resize();// 注：添加这条重新更新高度
      this.$utils.addEvent(window, 'resize', function () {
        that.chart.resize()
      });
      // 添加事件监听(先去除绑定的点击事件)
      this.chart.off('click');
      this.chart.on('click', (params) => {
        this.$emit('chartEvent', params);
      });

      this.setOptions();
    },
    setOptions () {
      if (!this.$refs.chartNode) { return };
      const copyDefOption = cloneDeep(this.defaultOption);
      const { series: propsSeries } = copyDefOption;
      // 合并后进行处理(注意这里请使用深拷贝)
      const newOption = cloneDeep(merge(copyDefOption, this.option));
      // 设置中间显示文字换行
      if (!newOption.graphic.style.text) {
        const defaultName = propsSeries[0].name; const result = [];
        for (let i = 0; i < defaultName.length; i += this.changeLineNum) {
          result.push(defaultName.split('').slice(i, i + this.changeLineNum));
        }
        newOption.graphic.style.text = result.join('\n').replace(/,/g, '');
      }
      // 配置tootip
      newOption.tooltip.formatter = function (params) {
        const { value, name, marker } = params;
        let htmlStr = '<div>';
        htmlStr += marker + name + '<br/>';
        // 添加点
        htmlStr += '占比：' + value + '%<br/>';
        htmlStr += '</div>';
        return htmlStr;
      }
      // 配置legend
      newOption.legend.formatter = name => {
      // 根据name获取值
        const target = newOption.series[0].data.find(s => s.name === name);
        return `{percent|${name}}     {value|${target.value}%}`
      }
      console.log(newOption);
      this.chart.setOption(newOption)
    }
  },
  watch: {
    // 监听 option变化
    option: {
      handler () {
        this.setOptions();
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-outer-container {
  width: 100%;
  height: 100%;
}
</style>
