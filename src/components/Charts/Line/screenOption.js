// 折现默认配置项
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
    right: 0,
    itemWidth: 8, // 设置宽度
    itemHeight: 8, // 设置高度
    itemGap: 15, // 设置间距
    textStyle: { color: '#7892C8' }
  },
  yAxis: {
    name: '单位：人次',
    nameTextStyle: {
      color: '#7892C8'
    },
    axisLine: {
      show: false
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
    axisPointer: {
      lineStyle: {
        color: '#174C75'
      }
    }
  },
  series: [{
    type: 'line',
    smooth: true,
    data: [],
    animationDuration,
    symbol: 'circle',
    symbolSize: 4,
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#299FA5' // 0% 处的颜色
        }, {
          offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: '#AAF5F1',
      borderColor: '#3FF1DF',
      borderWidth: 3
    },
    lineStyle: {
      color: '#36D6CC'
    }
  },
  {
    type: 'line',
    smooth: true,
    data: [],
    symbol: 'circle',
    symbolSize: 4,
    animationDuration,
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#637B46' // 0% 处的颜色
        }, {
          offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    },
    itemStyle: {
      color: '#F0F1B4',
      borderColor: '#F1E50C',
      borderWidth: 3
    },
    lineStyle: {
      color: '#CAC71A'
    }
  }
  ]
}
