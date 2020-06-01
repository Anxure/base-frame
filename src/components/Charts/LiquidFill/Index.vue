<template>
  <div class="gropu-content">
    <div class="loading-wrapper" v-if="loading">
      <a-spin :spinner="true"></a-spin>
    </div>
    <div v-else class="chart" ref="chartNode" :style="{height:height,width:width}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js';
import { cloneDeep, merge } from 'lodash'
// 默认配置项
const value = 0.2
const data = [value, value, value]
const defaultOption = {
  title: {
    text: value,
    textStyle: {
      fontSize: 16,
      fontFamily: 'Microsoft Yahei',
      fontWeight: 'normal',
      color: '#FFF',
      rich: {
        a: {
          fontSize: 16
        }
      }
    },
    x: 'center',
    y: '30%'
  },
  graphic: [{
    type: 'group',
    left: 'center',
    top: '60%',
    children: [{
      type: 'text',
      z: 100,
      left: '10',
      top: 'middle',
      style: {
        fill: '#FFF',
        text: '吃',
        font: '14px Microsoft YaHei'
      }
    }]
  }],
  series: [{
    type: 'liquidFill',
    radius: '80%',
    center: ['50%', '50%'],
    //  shape: 'roundRect',
    data: data,
    backgroundStyle: {
      color: {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0.5,
        y2: 1,
        colorStops: [{
          offset: 1,
          color: 'rgba(243, 192, 31, .5)'
        }, {
          offset: 0.5,
          color: 'rgba(66, 73, 86, .25)'
        }, {
          offset: 0,
          color: 'rgba(243, 192, 31, .5)'
        }],
        globalCoord: false
      }
    },
    outline: {
      borderDistance: 0,
      itemStyle: {
        borderWidth: 2,
        borderColor: ['#FBEA0A'],
        shadowBlur: 60,
        shadowColor: '#FBEA0A'
      }
    },
    color: ['#FDC618'],
    label: {
      normal: {
        formatter: ''
      }
    }
  }]
}
export default {
  name: 'Group',
  data () {
    return {
      chart: null
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '70px'
    },
    sourceData: {
      type: Object,
      default () {
        return {
          data: 0,
          totla: 0,
          name: ''
        }
      }
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.initChart();
  },
  watch: {
    sourceData: {
      handler () {
        this.setOptions();
      },
      deep: true
    }
  },
  methods: {
    initChart () {
      if (!this.$refs.chartNode) { return }
      this.chart = echarts.init(this.$refs.chartNode);// 初始化实例&主题配置
      const that = this;
      that.chart.resize();// 注：添加这条重新更新高度
      this.$utils.addEvent(window, 'resize', function () {
        that.chart.resize()
      });
      this.setOptions();
    },
    setOptions () {
      if (!this.$refs.chartNode) { return }
      const tempOption = cloneDeep(this.option); // 拷贝系列数据
      const chartOption = merge(defaultOption, tempOption)
      chartOption.title.text = (this.sourceData.percentage * 100).toFixed(0) + '{a|%}'
      chartOption.series[0].data = [this.sourceData.percentage, this.sourceData.percentage, this.sourceData.percentage]
      chartOption.graphic[0].children[0].style.text = this.sourceData.name
      this.chart.setOption(chartOption)
    }
  }
}
</script>
<style lang="scss" scoped>
.gropu-content {
  width: 95%;
  height:100%;
  margin: 0 auto;
  .title {
    height: 45px;
    font-size: 21px;
    color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #043ba7;
  }
  .bar-title{
    color:#FFF;
    font-size: 20px;
    text-align: center;
  }
}
</style>
