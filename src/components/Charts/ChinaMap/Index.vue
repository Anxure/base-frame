<template>
    <div class="chart-outer-container">
        <div class="chart" ref="chartNode" :style="{height:height,width:width}"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: 'index',
  props: {
    chartData: {
      type: Array
    },
    option: {
      type: Object,
      default: () => ({})
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
      default: '700px'
    },
    series: {
      type: [Array, Object],
      default: () => {
        return [
          {
            type: 'map',
            mapType: 'china',
            zoom: 1.2,
            roam: false, // 是否开启鼠标缩放和平移漫游
            itemStyle: { // 地图区域的多边形 图形样式
              normal: { // 是图形在默认状态下的样式
                label: {
                  show: true, // 是否显示标签
                  textStyle: {
                    color: 'rgb(249, 249, 249)'
                  }
                }
              },
              emphasis: { // 是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: { show: true }
              }
            },
            top: '8%', // 组件距离容器的距离
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    });
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.chartNode, 'walden');// 初始化实例&主题配置
      const that = this;
      this.$utils.addEvent(window, 'resize', function () {
        that.chart.resize()
      });
      // 添加事件监听
      this.chart.on('click', (params) => {
        this.$emit('chartEvent', params);
      })
      this.setOptions();
    },
    setOptions () {
      if (this.chartData && this.series.length === 1) { // 单条数据
        this.series[0].data = this.chartData;
      }
      const { title, legend } = this.option;
      // 判断max值
      let max;
      if (this.series[0].data.length === 0) {
        max = 10;
      } else {
        max = Math.max(...this.series[0].data.map(item => item.value));
      }
      const option = {
        title: {
          text: '',
          subtext: '',
          x: 'center',
          ...title
        },
        tooltip: { // 提示框组件。
          trigger: 'item', // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          formatter: (params) => {
            return `${params.name} ：${params.value || 0}`;
          }
        },
        legend: {
          orient: 'horizontal', // 图例的排列方向
          x: 'left', // 图例的位置
          ...legend
        },
        visualMap: {
          left: 'left',
          bottom: '20%',
          min: 0,
          max,
          inRange: {
            //                            color: ['rgb(238,238,238)', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            color: ['#8fcffe', '#0071c5']
          },
          calculable: true
        },
        toolbox: { // 工具栏
          show: true,
          left: 'right',
          top: 'top',
          feature: { // 各工具配置项。
            mark: { show: true },
            dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
            restore: { show: true }, // 配置项还原。
            saveAsImage: { show: true, name: title && title.text }// 保存为图片。
          }
        },
        roamController: { // 控制地图的上下左右放大缩小 图上没有显示
          show: true,
          x: 'right',
          mapTypeControl: {
            china: true
          }
        },
        series: this.series
      };

      this.chart.setOption(option)
    }
  },
  watch: {
    chartData () {
      this.$nextTick(() => {
        this.setOptions();
      })
    }
  }
}
</script>

<style scoped>
</style>
