export default {
  title: {
    x: 'center',
    show: false,
    top: 30
  },
  grid: {
    left: '2%',
    right: '4%',
    bottom: '2%',
    top: '10%',
    containLabel: true
  },
  legend: {
    orient: 'vertical',
    type: 'scroll',
    right: '0',
    top: '5%',
    textStyle: {
      color: '#7892C8',
      rich: {
        percent: {
          color: '#7892C8',
          width: 50
        },
        value: {
          color: '#EAD305'
        }
      }
    }
  },
  // 也可以使用title设置（注意这里环形偏移的话，此方式无法居中 对应提问：https://github.com/apache/incubator-echarts/issues/11889）
  graphic: { // 图形中间文字(默认处理4字两行偏移)
    elements: [{
      type: 'text',
      style: {
        text: '',
        fontSize: 14,
        fill: 'rgba(0,0,0,.65)',
        textAlign: 'center'
      },
      left: 'center',
      top: 'center'
    }]
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'pie',
      center: ['50%', '50%'],
      label: {
        color: '#7892C8',
        formatter: (params) => {
          const { name, percent } = params;
          return `${name}：${percent}%`;
        }
      },
      // left: 'left',
      labelLine: {
        length: 0,
        show: false
      },
      data: [],
      radius: ['50%', '70%']
    }
  ]
}
