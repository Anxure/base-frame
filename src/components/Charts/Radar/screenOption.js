export default {
  backgroundColor: '#101736',
  color: ['#4A99FF', '#4BFFFC'],
  title: {
    show: false
  },
  tooltip: {},
  legend: {
    orient: 'vertical',
    type: 'scroll',
    itemWidth: 15,
    itemHeight: 5,
    right: '0',
    top: '5%',
    data: [],
    textStyle: {
      color: '#7892C8',
      rich: {
        percent: {
          color: '#7892C8',
          width: 26
        },
        value: {
          color: '#EAD305'
        }
      }
    }
  },
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: '#afb6c5',
        fontSize: 12
      }
    },
    nameGap: 5,
    indicator: [],
    splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
      show: true,
      areaStyle: { // 分隔区域的样式设置。
        color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
      }
    },
    axisLine: { // 指向外圈文本的分隔线样式
      lineStyle: {
        color: '#153269'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#113865', // 分隔线颜色
        width: 1 // 分隔线线宽
      }
    }
  },
  series: [
    {
      type: 'radar',
      symbolSize: 8,
      data: [
        {
          value: [],
          name: '',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4A99FF'
                // shadowColor: '#4A99FF',
                // shadowBlur: 10,
              },
              shadowColor: '#4A99FF',
              shadowBlur: 10
            }
          },
          areaStyle: {
            normal: { // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, // 右
                y: 0, // 下
                x2: 1, // 左
                y2: 1, // 上
                colorStops: [{
                  offset: 0,
                  color: '#4A99FF'
                }, {
                  offset: 0.5,
                  color: 'rgba(0,0,0,0)'
                }, {
                  offset: 1,
                  color: '#4A99FF'
                }],
                globalCoord: false
              },
              opacity: 1 // 区域透明度
            }
          }
        },
        {
          value: [],
          name: '',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4BFFFC'
                // shadowColor: '#4BFFFC',
                // shadowBlur: 10,
              },
              shadowColor: '#4BFFFC',
              shadowBlur: 10
            }
          },
          areaStyle: {
            normal: { // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, // 右
                y: 0, // 下
                x2: 1, // 左
                y2: 1, // 上
                colorStops: [{
                  offset: 0,
                  color: '#4BFFFC'
                }, {
                  offset: 0.5,
                  color: 'rgba(0,0,0,0)'
                }, {
                  offset: 1,
                  color: '#4BFFFC'
                }],
                globalCoord: false
              },
              opacity: 1 // 区域透明度
            }
          }
        }
      ]
    }
  ]
}
