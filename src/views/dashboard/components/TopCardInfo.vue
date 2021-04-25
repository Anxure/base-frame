<template>
  <a-row :gutter="20">
    <a-col :span="6">
      <CardBlock>
        <div class="header clearfix">
          <span>总销售额</span>
          <a-tooltip  theme="dark" content="介绍" placement="top">
            <a-icon type="ios-information-circle-outline" :size="18"/>
          </a-tooltip>
        </div>
        <div>
          <p class="total">{{200000 | toThousandFilter('¥')}}</p>
          <div class="middle-info">
            <div class="trend-list">
              <Trend>
                周同比
                <span class="trend-text">12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span class="trend-text">15%</span>
              </Trend>
            </div>
          </div>
        </div>
        <div slot="footer" class="footer">
          <p class="daily-num">
            <span class="daily-num-label">日销售额</span>
            {{200000 | toThousandFilter('¥')}}
          </p>
        </div>
      </CardBlock>
    </a-col>
    <a-col :span="6">
      <CardBlock>
        <div class="header clearfix">
          <span>日访问量</span>
            <Tooltip  theme="dark" content="介绍" placement="top">
            <Icon type="ios-information-circle-outline" :size="18"/>
          </Tooltip>
        </div>
        <div>
          <p class="total">{{200000 | toThousandFilter()}}</p>
          <div style="margin-bottom:15px">
            <MiniArea :chartData="miniAreaData"></MiniArea>
          </div>
        </div>
        <div slot="footer" class="footer">
          <p class="daily-num">
            <span class="daily-num-label">日访问量</span>
            {{200000 | toThousandFilter()}}
          </p>
        </div>
      </CardBlock>
    </a-col>
    <a-col :span="6">
      <CardBlock>
        <div class="header clearfix">
          <span>支付笔数</span>
         <Tooltip  theme="dark" content="介绍" placement="top">
            <Icon type="ios-information-circle-outline" :size="18"/>
          </Tooltip>
        </div>
        <div>
          <p class="total">{{200000 | toThousandFilter()}}</p>
          <div style="margin-bottom:15px">
            <MiniBar></MiniBar>
          </div>
        </div>
        <div slot="footer" class="footer">
          <p class="daily-num">
            <span class="daily-num-label">转化率</span>
            60%
          </p>
        </div>
      </CardBlock>
    </a-col>
    <a-col :span="6">
      <CardBlock>
        <div class="header clearfix">
          <span>运营活动效果</span>
          <Tooltip  theme="dark" content="介绍" placement="top">
            <Icon type="ios-information-circle-outline" :size="18"/>
          </Tooltip>
        </div>
        <div>
          <p class="total">70%</p>
          <div class="middle-info">
            <div class="trend-list" style="display: flex;align-items: center;width:100%">
              <MiniProgress :percent="percent" :strokeWidth="8"></MiniProgress>
            </div>
          </div>
        </div>
        <div slot="footer" class="footer">
          <div class="trend-list bto">
            <Trend>
              周同比
              <span class="trend-text">12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span class="trend-text">15%</span>
            </Trend>
          </div>
        </div>
      </CardBlock>
    </a-col>
  </a-row>
</template>

<script>
import { MiniArea, MiniBar, MiniProgress } from '@/components/Charts';
import CardBlock from '@/components/CardBlock/Index.vue';
import Trend from '@/components/Trend/Index.vue';
export default {
  name: 'IntroduceRow',
  data () {
    return {
      miniAreaData: [100, 120, 161, 134, 105, 160, 165],
      percent: 0
    };
  },
  components: {
    CardBlock,
    Trend,
    MiniArea,
    MiniBar,
    MiniProgress
  },
  created () {
    window.requestAnimationFrame(() => {
      this.percent = 35;
    });
  }
};
</script>
<style lang="less">
.chart-card-container {
  .el-card__body {
    padding-bottom: 10px;
  }
}
</style>
<style lang="less" scoped>
//卡片组
.chart-card-container {
  color: rgba(0, 0, 0, 0.65);
  .header {
    color: rgba(0, 0, 0, 0.45);
  }
  .total {
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
    margin-top: 15px;
  }
  .middle-info {
    position: relative;
    margin-bottom: 15px;
    height: 50px;
  }
  .trend-list {
    position: absolute;
    bottom: 0;
    &.bto {
      margin-top: 15px;
      position: inherit;
    }
    .trend-text {
      margin-left: 5px;
    }
    .trend-wrapper:last-child {
      margin-right: 0;
    }
  }
  .footer {
    border-top: 1px solid #e8e8e8;
  }
  .footer .daily-num {
    margin-top: 15px;
    margin-bottom: 0;
    .daily-num-label {
      margin-right: 5px;
    }
  }
  .card-title-icon {
    float: right;
  }
}
</style>
