<template>
  <div class="main-layout">
      <header class="header-wrapper">
          <div class="weather">
            <img class="weather-icon" :src="weatherIcon">
            <span class="weather-title">晴转多云</span>
            <span class="temperature">8℃~14℃</span>
          </div>
          <div class="title">{{title}}</div>
          <div class="date">
            <span style="margin-right:3%">{{time}}</span>
            <span>{{year}}<i>/</i></span>
            <span>{{month}}<i>/</i></span>
            <span>{{day}}</span>
            <span style="margin-left:3%" class="week">{{week}}</span>
          </div>
          <div class="light-bg">
            <img :src="lightIcon" alt="光">
          </div>
      </header>
      <div class="chart-display-wrapper">
        <div class="line-block middle">
          <el-row class="full-block">
            <el-col :span="6" class="full-block">
              <div class="block-info middle-block">
                <sort-list
                  sortTitle="网评检测分析-好评TOP10"
                  :sortHeader="parseHeader"
                  :sortData="parseData"
                />
              </div>
              <div class="block-info middle-block">
                <Bar :option="dataSource" theme="screen" height="100%" />
              </div>
            </el-col>
            <el-col :span="12" style="position:relative;height:100%" >
              <map-timeline></map-timeline>
              <div class="marquee-wrapper" style="display:none">
                <Marquee :content="marqueeData"></Marquee>
              </div>
            </el-col>
            <el-col :span="6"  class="full-block">
              <div class="block-info middle-block">
                <group-list title="六要素好评分析率" :data="sixElemData"></group-list>
              </div>
              <div class="block-info middle-block">
                 <line-chart :option="scenicGradeOption" theme="screen"/>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="line-block">
          <el-row class="full-block">
            <el-col :span="6" class="full-block">
               <div class="block-info full-block">
                 <Pie :option="touristSexOption" theme="screen" />
               </div>
            </el-col>
            <el-col :span="12" class="full-block">
              <div class="block-info full-block">
                <Bar
                  :option="tourNewOldOption"
                  theme="screen"
                />
              </div>
            </el-col>
            <el-col :span="6" class="full-block">
              <div class="block-info full-block">
                <Radar
                  :option="carInfoOption"
                  theme="screen"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>
<script>
import SortList from '@/components/SortList/Index.vue'
import Marquee from '@/components/Marquee/Index.vue';
import GroupList from './components/GroupList';
import MapTimeline from './components/MapTimeline';
import { Bar, LineChart, Pie, Radar } from '@/components/Charts';
export default {
  name: 'ScreenDataAls',
  props: {
    title: {
      type: String,
      default: '大数据测试看板'
    }
  },
  components: {
    SortList,
    Marquee,
    GroupList,
    Bar,
    LineChart,
    Pie,
    MapTimeline,
    Radar
  },
  data () {
    return {
      marqueeData: [],
      sixElemData: [
        { percentage: 0.2, name: '吃' },
        { percentage: 0.3, name: '吃' },
        { percentage: 0.4, name: '吃' },
        { percentage: 0.2, name: '吃' },
        { percentage: 0.2, name: '吃' },
        { percentage: 0.2, name: '吃' }
      ],
      weatherIcon: require('@/assets/image/weather-icon.png'),
      lightIcon: require('@/assets/image/ray-icon.png'),
      week: '',
      time: '',
      year: '',
      month: '',
      day: '',
      parseHeader: [
        {
          name: '红榜排名',
          width: '30%'
        },
        {
          name: '景区名称',
          width: '40%'
        },
        {
          name: '热度',
          width: '15%'
        },
        {
          name: '较平时',
          width: '15%'
        }
      ],
      parseData: [
        { name: '四姑娘山', hot: 200, id: 111, arrows: 1 },
        { name: '四姑娘山', hot: 200, id: 112, arrows: 1 },
        { name: '四姑娘山', hot: 200, id: 113, arrows: 1 },
        { name: '四姑娘山', hot: 200, id: 114, arrows: -1 },
        { name: '四姑娘山', hot: 200, id: 115, arrows: 0 }
      ],
      // 数据来源分析配置项
      dataSource: {
        title: { text: '数据来源分析' },
        xAxis: {
          type: 'category',
          data: ['九寨沟', '乌龙山', '黄龙', '峨眉山', '乐山大佛']
        },
        yAxis: {
          name: '单位：人次'
        },
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [2000, 500, 567, 400, 1240]
          }
        ]
      },
      // 景区分值走势
      scenicGradeOption: {
        title: { text: '景区分值走势分析' },
        xAxis: {
          type: 'category',
          data: ['05-22', '05-23', '05-24', '05-25', '05-26']
        },
        yAxis: {
          name: '单位：个'
        },
        tooltip: {
          formatter: '分值: {c0}'
        },
        legend: { data: ['当月分值'] },
        series: [
          {
            name: '当月分值',
            type: 'line',
            data: [200, 300, 400, 500, 600]
          }
        ]
      },
      touristSexOption: {
        title: { text: '游客性别分析' },
        legend: {
          data: ['男', '女', '未知']
        },
        graphic: {
          type: 'text',
          left: '29%'
        },
        series: [
          {
            name: '游客性别占比',
            type: 'pie',
            data: [
              { name: '男', value: 20 },
              { name: '女', value: 30 },
              { name: '其他', value: 50 }
            ]
          }
        ]
      },
      tourNewOldOption: {
        title: { text: '新游客 / 重游游客分析' },
        xAxis: {
          type: 'category',
          data: ['南天湖', '插花谷', '蝶恋溪', '七仙湖', '南天湖']
        },
        yAxis: {
          name: '单位：人次'
        },
        series: [
          {
            name: '好评',
            type: 'bar',
            data: [100, 200, 500, 345, 800]
          },
          {
            name: '差评',
            type: 'line',
            data: [120, 100, 520, 347, 810]
          }
        ]
      },
      carInfoOption: {
        title: { text: '车辆信息分析' },
        legend: {
          data: ['车辆数', '设计车位']
        },
        radar: {
          indicator: [{
            text: '小型车',
            max: 6000
          },
          {
            text: '中型车',
            max: 5000
          },
          {
            text: '大型车',
            max: 5000
          },
          {
            text: '货车',
            max: 5000
            //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
          },
          {
            text: '特种车',
            max: 5000
          },
          {
            text: '贵宾车',
            max: 5000
          }
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              { name: '车辆数', value: [4300, 4700, 3600, 3900, 3800, 4200] },
              { name: '设计车位', value: [3200, 3000, 3400, 2000, 3900, 2000] }
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.timeInit();
    this.marqueeData = [{ content: '值得来玩 有山有水 有美食' }, { content: '景色优美 空气怡人' }, { content: '值得来玩 有山有水 有美食' }, { content: '景色优美 空气怡人' }, { content: '值得来玩 有山有水 有美食' }, { content: '景色优美 空气怡人' }, { content: '景美 人美' }, { content: '度假胜地' }, { content: '快来玩儿' }];
  },
  methods: {
    // 时间
    timeInit () {
      const now = new Date()
      this.year = now.getFullYear()
      this.month = now.getMonth() + 1
      this.day = now.getDate()
      this.week = '星期' + '日一二三四五六'.charAt(new Date().getDay())
      setInterval(() => {
        const time = new Date()
        const hours = time.getHours()
        const min = time.getMinutes()
        const seconds = time.getSeconds()
        this.time = (hours < 10 ? '0' + hours : hours) + ':' + (min < 10 ? '0' + min : min) + ':' + (seconds < 10 ? '0' + seconds : seconds)
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.full-block{
  height:100%
}
.middle-block{
  height:50%;
}
    .main-layout{
        color:#fff;
        height: 100%;
        background: #001E49 url("../../assets/image/index-bg.png") no-repeat;
        background-size: 100% 100%;
        .header-wrapper{
          height:15vh;
          width:100%;
          z-index:100;
          position: fixed;
          background-image: url("../../assets/image/top-bg.png");
          background-size: 100% 100%;
          display: flex;
          padding:0 1%;
          box-sizing: border-box;
          .weather, .date{
            flex:1;
            height:40%;
              display: flex;
                align-items: center;
          }
          .light-bg{
            position: absolute;
            top:0;
            left: 50%;
            transform: translateX(-50%);
            width:45%;
            img{
              width:100%;
              height: auto;
            }
          }
          .weather{
              .weather-icon{
                  width:10%;
                  height: auto;
                  vertical-align: middle;
                  margin-right: 3%;
              }
          }
          .title{
              flex:2;
              display: flex;
              font-size: 30px;
              margin-top: 3%;
              justify-content: center;
          }
          .date{
            font-family:'electronicFont';
            justify-content: flex-end;
            font-size: 20px;
            i{
              font-size: 15px;
              font-style: normal;
              margin:0 5px;
            }
            .week{
              font-size: 16px;
            }
          }
        }
        .chart-display-wrapper{
          height:95vh;
          padding-top:5vh;
          .line-block{
            height: 33.33%;
            &.middle{
              height:66.66%;
            }
          }
          .block-info{
            padding: 0 2%;
            background: url(../../assets/image/mask-bg.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .marquee-wrapper{
            position: absolute;
            width: 100%;
            bottom: 10px;
        }
    }
</style>
