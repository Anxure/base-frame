export default {
  backgroundColor: 'rgba(0,0,0,0)',
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
    itemWidth: 15,
    itemHeight: 5,
    right: '0',
    top: '5%',
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
  graphic: { // 图形中间文字(默认处理4字两行偏移)
    elements: [{
      type: 'text',
      style: {
        text: '',
        fontSize: 14,
        fill: '#E0E5EF',
        textAlign: 'center'
      },
      left: 'center',
      top: 'center'
    }]
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,0,0,0)'
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
      data: [
        {
          itemStyle: {
            normal: {
              color: '#E9AE24'
            }
          }
        },
        {
          itemStyle: {
            normal: {
              color: '#415AF8'
            }
          }
        },
        {
          itemStyle: {
            normal: {
              color: '#3197E0'
            }
          }
        }
      ],
      radius: ['50%', '70%']
    }
  ]
}
