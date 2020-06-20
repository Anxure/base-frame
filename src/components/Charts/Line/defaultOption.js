// 折线图默认配置项
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
    top: 0
  },
  yAxis: {
    axisLine: {
      show: false
    },
    data: [],
    axisTick: {
      show: false
    },
    type: 'value'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [],
      animationDuration
    },
    {
      type: 'line',
      smooth: true,
      data: [],
      animationDuration
    }
  ]
}
