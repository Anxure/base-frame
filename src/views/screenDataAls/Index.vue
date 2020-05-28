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
      </header>
      <div class="chart-display-wrapper">
        <div class="line-block middle">
          <el-row style="height:100%">
            <el-col :span="6" style="height:100%">
              <div class="block-info" style="height:50%">
                <sort-list
                  sortTitle="网评检测分析-好评TOP10"
                  :sortHeader="parseHeader"
                  :sortData="parseData"
                />
              </div>
              <div style="height:50%">图表3</div>
            </el-col>
            <el-col :span="12" style="position:relative;height:100%" >
              <div class="marquee-wrapper">
                <Marquee :content="marqueeData"></Marquee>
              </div>
            </el-col>
            <el-col :span="6">
              <div>图表2</div>
              <div>图表4</div>
            </el-col>
          </el-row>
        </div>
        <div class="block-info">333</div>
      </div>
    </div>
</template>
<script>
import SortList from '@/components/SortList/Index.vue'
import Marquee from '@/components/Marquee/Index.vue';
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
    Marquee
  },
  data () {
    return {
      marqueeData: [],
      weatherIcon: require('@/assets/image/weather-icon.png'),
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
      ]
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
    .main-layout{
        color:#fff;
        height: 100%;
        background: #001E49 url("../../assets/image/index-bg.png") no-repeat;
        background-size: 100% 100%;
        .header-wrapper{
          height:20vh;
          width:100%;
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
          height:80vh;
          padding-top:7vh;
          .line-block{
            height: 33.33%;
            &.middle{
              height:66.66%;
            }
          }
          .block-info{
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
