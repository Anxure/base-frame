<template>
    <div :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
const animationDuration = 2000
export default {
  name: 'MiniBar',
  props: {
    chartData: {
      type: Array
      // required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '50px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'walden');// 初始化实例&主题配置
      this.setOptions()
    },
    setOptions () {
      this.chart.setOption({
        grid: {
          left: 10,
          right: 10,
          bottom: 0,
          top: 0,
          containLabel: true
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          }
        },

        yAxis: {
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        // 低高度无法随鼠标移动 ？？
        tooltip: {
          axisPointer: {
            type: 'none'
          },
          padding: [5, 10],
          textStyle: { fontSize: 12 }
        },
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            data: [79, 52, 200, 334, 390, 330, 220],
            animationDuration
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
