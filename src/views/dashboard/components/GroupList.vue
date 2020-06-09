<template>
  <div class="group-content">
    <div class="content">
      <!-- <Group/> -->
      <div class="content-top">
        <div class="group-item"  v-for="(list,index) in topListOption" :key="index">
          <liquid-fill :option="list" :sourceData="topData[index]"/>
        </div>
      </div>
      <div class="content-bottom">
        <div class="group-item"  v-for="(list,index) in bottomListOption" :key="index">
          <liquid-fill :option="list" :sourceData="bottomData[index]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LiquidFill } from '@/components/Charts'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      listOption: [
        {
          graphic: [{
            children: [{
              style: {
                text: '吃'
              }
            }]
          }],
          series: [
            {
              radius: '95%',
              backgroundStyle: {
                color: {
                  colorStops: [{
                    offset: 1,
                    color: 'rgba(243, 192, 31, .5)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(66, 73, 86, .25)'
                  }, {
                    offset: 0,
                    color: 'rgba(243, 192, 31, .5)'
                  }]
                }
              },
              outline: {
                itemStyle: {
                  borderColor: ['#F2B705'],
                  shadowBlur: 0,
                  shadowColor: '#F2B705'
                }
              },
              color: ['#FDC618']
            }
          ]
        },
        {
          graphic: [{
            children: [{
              style: {
                text: '住'
              }
            }]
          }],
          series: [
            {
              radius: '95%',
              backgroundStyle: {
                color: {
                  colorStops: [{
                    offset: 1,
                    color: 'rgba(13, 166, 249, .5)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(47, 87, 129, .25)'
                  }, {
                    offset: 0,
                    color: 'rgba(13, 166, 249, .5)'
                  }]
                }
              },
              outline: {
                itemStyle: {
                  borderColor: ['#21E8FF'],
                  shadowBlur: 0,
                  shadowColor: '#21E8FF'
                }
              },
              color: ['#0FADF9']
            }
          ]
        },
        {
          graphic: [{
            children: [{
              style: {
                text: '行'
              }
            }]
          }],
          series: [
            {
              radius: '95%',
              backgroundStyle: {
                color: {
                  colorStops: [{
                    offset: 1,
                    color: 'rgba(186, 97, 255, .5)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(103, 109,142, .25)'
                  }, {
                    offset: 0,
                    color: 'rgba(186, 97, 255, .5)'
                  }]
                }
              },
              outline: {
                itemStyle: {
                  borderColor: ['#AE5BFF'],
                  shadowBlur: 0,
                  shadowColor: '#AE5BFF'
                }
              },
              color: ['#AE5BFF']
            }
          ]
        },
        {
          graphic: [{
            children: [{
              style: {
                text: '游'
              }
            }]
          }],
          series: [
            {
              radius: '95%',
              backgroundStyle: {
                color: {
                  colorStops: [{
                    offset: 1,
                    color: 'rgba(20, 54, 214, .5)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(53, 92, 132, .25)'
                  }, {
                    offset: 0,
                    color: 'rgba(20, 54, 214, .5)'
                  }]
                }
              },
              outline: {
                itemStyle: {
                  borderColor: ['#0866FF'],
                  shadowBlur: 0,
                  shadowColor: '#0866FF'
                }
              },
              color: ['#1941FF']
            }
          ]
        },
        {
          graphic: [{
            children: [{
              style: {
                text: '购'
              }
            }]
          }],
          series: [
            {
              radius: '95%',
              backgroundStyle: {
                color: {
                  colorStops: [{
                    offset: 1,
                    color: 'rgba(19, 226, 225, .5)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(81, 103, 136, .25)'
                  }, {
                    offset: 0,
                    color: 'rgba(19, 226, 225, .5)'
                  }]
                }
              },
              outline: {
                itemStyle: {
                  borderColor: ['#16F7DE'],
                  shadowBlur: 0,
                  shadowColor: '#16F7DE'
                }
              },
              color: ['#16F7DE']
            }
          ]
        },
        {
          graphic: [{
            children: [{
              style: {
                text: '娱'
              }
            }]
          }],
          series: [
            {
              radius: '95%',
              backgroundStyle: {
                color: {
                  colorStops: [{
                    offset: 1,
                    color: 'rgba(255, 199, 33, .5)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(95, 104, 98, .25)'
                  }, {
                    offset: 0,
                    color: 'rgba(255, 199, 33, .5)'
                  }]
                }
              },
              outline: {
                itemStyle: {
                  borderColor: ['#FFD421'],
                  shadowBlur: 0,
                  shadowColor: '#FFD421'
                }
              },
              color: ['#FFD421']
            }
          ]
        }
      ]
    }
  },
  name: 'GroupList',
  components: { LiquidFill },
  computed: {
    topListOption () {
      return this.listOption.slice(0, 3)
    },
    bottomListOption () {
      return this.listOption.slice(3, 6)
    },
    topData () {
      return this.data.slice(0, 3)
    },
    bottomData () {
      return this.data.slice(3, 6)
    }
  }
}
</script>
<style lang="scss" scoped>
.group-content{
  margin: 0 auto;
  height:100%;
  overflow: hidden;
  .content{
    height:100%;
  }
}
.content-top,.content-bottom{
  width:100%;
  margin: 2% auto;
  display: flex;
  height:40%;
  background-color: transparent;
  .group-item{
    flex:1
  }
}
</style>
