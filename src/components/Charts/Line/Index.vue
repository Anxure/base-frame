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
import { cloneDeep, merge } from 'lodash'
import defaultOption from './defaultOption'
export default {
  name: 'LineChart',
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
      default: '100%'
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null,
      defaultOption
    }
  },
  components: { },
  computed: {
    chartH () {
      let chartH = '100%';
      const { title } = this.option;
      if (title && title.text) {
        chartH = 'calc(100% - 45px)';
      }
      return chartH
    }
  },
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
      if (!this.$refs.chartNode) { return }
      const copyDefOption = cloneDeep(this.defaultOption);
      // 合并后进行处理
      const newOption = cloneDeep(merge(copyDefOption, this.option));
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
      // 处理横轴显示(这里不能放在默认配置,初始无法读取到数据)
      newOption.xAxis.axisLabel.formatter = function (params) {
        let newParamsName = ''// 最终拼接成的字符串
        const paramsNameNumber = params.length// 实际标签的个数
        const provideNumber = 5// 每行能显示的字的个数
        const rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
        /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
        // 条件等同于rowNumber>1
        if (paramsNameNumber > provideNumber) {
          /** 循环每一行,p表示行 */
          for (let p = 0; p < rowNumber; p++) {
            let tempStr = ''// 表示每一次截取的字符串
            const start = p * provideNumber// 开始截取的位置
            const end = start + provideNumber// 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p === rowNumber - 1) {
              // 最后一次不换行
              tempStr = params.substring(start, paramsNameNumber)
            } else {
              // 每一次拼接字符串并换行
              tempStr = params.substring(start, end) + '\n'
            }
            newParamsName += tempStr// 最终拼成的字符串
          }
        } else {
          // 将旧标签的值赋给新标签
          newParamsName = params;
        }
        // 将最终的字符串返回
        return newParamsName
      }
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
