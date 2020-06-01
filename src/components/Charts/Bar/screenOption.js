// 柱状图默认配置项
import echarts from 'echarts'
const animationDuration = 2000
export default {
  dataZoom: [{ show: false }],
  backgroundColor: 'rgba(0,0,0,0)',
  title: {
    top: 0,
    show: false
  },
  grid: {
    left: '2%',
    right: '4%',
    bottom: '3%',
    top: '22%',
    containLabel: true
  },
  xAxis: {
    data: [],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    type: 'category',
    axisLabel: {
      interval: 0,
      color: '#afb6c5'
    }
  },
  legend: {
    show: false,
    top: 0,
    right: 0,
    itemWidth: 15,
    itemHeight: 5,
    textStyle: {
      color: '#afb6c5'
    },
    itemGap: 15 // 设置间距
  },
  yAxis: {
    axisLine: {
      show: false
    },
    nameTextStyle: {
      color: '#7892C8'
    },
    data: [],
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#022877'
      }
    },
    type: 'value',
    axisLabel: {
      interval: 0,
      color: '#afb6c5'
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0)',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      shadowStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#0042A5' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }
    }
  },
  series: [
    {
      type: 'bar',
      data: [],
      barMaxWidth: 25,
      animationDuration,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#26DDFF' // 100% 处的颜色
          }, {
            offset: 1,
            color: '#2952FF' // 0% 处的颜色
          }], false)
        }
      }
    },
    {
      type: 'bar',
      data: [],
      barMaxWidth: 25,
      animationDuration,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#E9FF00' // 100% 处的颜色
          }, {
            offset: 1,
            color: '#FF9400' // 0% 处的颜色
          }], false)
        }
      }
    }
  ]
}
