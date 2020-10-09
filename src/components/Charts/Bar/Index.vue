<template>
  <div class="chart-outer-container">
    <div class="block-title" v-if="option.title && option.title.text">{{option.title.text}}</div>
    <!--loading显示-->
    <div class="loading-wrapper" v-if="loading">
      <a-spin :spinner="true"></a-spin>
    </div>
    <div v-else class="chart" ref="chartNode" :style="{height:chartH,width:width}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { merge, cloneDeep } from 'lodash'
import defaultOption from './defaultOption'
import screenOption from './screenOption'
export default {
  name: 'Bar',
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
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
    }
  },
  data () {
    return {
      chart: null
    }
  },
  components: { },
  computed: {
    chartH () {
      let chartH = this.height;
      const { title } = this.option;
      if (title && title.text) {
        chartH = 'calc(100% - 40px)';
      }
      return chartH
    }
  },
  mounted () {
    this.initChart();
  },
  methods: {
    initChart () {
      console.log(this.$refs.chartNode.style);
      if (!this.$refs.chartNode) { return }
      this.chart = echarts.init(this.$refs.chartNode, 'walden');// 初始化实例&主题配置
      console.log(this.chart);
      const that = this;
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
      const { series: propsSeries } = this.option;
      const copyOption = cloneDeep(this.option);
      const copyDefOption = cloneDeep(this.theme === 'primary' ? defaultOption : screenOption);
      console.log(merge(copyDefOption, copyOption));
      // 合并后进行处理(注意这里请使用深拷贝)
      const newOption = cloneDeep(merge(copyDefOption, copyOption));
      if (this.theme === 'screen') {
        newOption.tooltip.formatter = (params) => {
          const contentStr = params.map(param => {
            return ` <div class="tips-content">
                      ${param.seriesName}:<span class="value">${param.value}</span>
                    </div>`
          }).join('');
          return `<div class="tips-box">${contentStr}</div>`
        }
      }
      propsSeries.length > 1 && (newOption.legend.show = true); // 多系列显示legend
      const { series } = newOption;
      newOption.series = series.slice(0, propsSeries.length); // 去除多余的系列  形如 默认配置 3系列 只传入单系列
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
    },
    containerIsShow (val) {
      val && (this.initChart())
    }
  }
}
</script>

<style lang="less" scoped>
</style>
