// 这里tab-panle 切换可能会造成图表渲染宽高不对，建议采用dom v-if
<template>
  <card-block>
    <Tabs v-model="active">
      <TabPane label="销售额(柱状)" name="sale">
        <Row :gutter="20">
          <Col :span="16">
            <Bar v-if="active === 'sale'" :option="dataSalesSource" />
          </Col>
          <Col :span="8">
            <div class="rank-wrapper">
              <h4>
                门店前10名销售额排名情况
              </h4>
              <ul>
                <li v-for="(item, index) in rankSalesList" :key="item.id" :class="{active: index < 3}">
                  <span>
                    <i class="order-icon">{{index+1}}</i>
                    <span>{{item.name}}</span>
                  </span>
                  <span class="sale-total">{{item.saleTotal}}</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="访问量(折线)" name="visited">
        <Row :gutter="20">
          <Col :span="16">
            <line-chart v-if="active === 'visited'" :option="dataVisitedSource" />
          </Col>
          <Col :span="8">
            <div class="rank-wrapper">
              <h4>
                门店前10名访问量排名情况
              </h4>
              <ul>
                <li v-for="(item, index) in rankVisitedList" :key="item.id" :class="{active: index < 3}">
                  <span>
                    <i class="order-icon">{{index+1}}</i>
                    <span>{{item.name}}</span>
                  </span>
                  <span class="sale-total">{{item.saleTotal}}</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </card-block>
</template>

<script>
import CardBlock from '@/components/CardBlock/Index.vue'
import {
  Bar,
  LineChart
} from '@/components/Charts'
export default {
  name: 'Dashboard',
  data () {
    return {
      active: 'sale',
      saleWrapperWidth: '',
      dataSalesSource: {
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月']
        },
        yAxis: {
          name: '销售趋势'
        },
        series: [{
          name: '第一季度',
          type: 'bar',
          data: [200, 400, 500, 800]
        },
        {
          name: '第二季度',
          type: 'bar',
          data: [204, 410, 560, 700]
        }
        ]
      },
      rankSalesList: [{
        name: 'xx路1号店面',
        saleTotal: 20000,
        id: 687
      },
      {
        name: 'xx路1号店面',
        saleTotal: 10620,
        id: 688
      },
      {
        name: 'xx路1号店面',
        saleTotal: 10300,
        id: 689
      },
      {
        name: 'xx路1号店面',
        saleTotal: 10200,
        id: 690
      },
      {
        name: 'xx路1号店面',
        saleTotal: 9000,
        id: 691
      },
      {
        name: 'xx路1号店面',
        saleTotal: 8000,
        id: 692
      },
      {
        name: 'xx路1号店面',
        saleTotal: 7000,
        id: 693
      }
      ],
      dataVisitedSource: {
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月']
        },
        yAxis: {
          name: '销售趋势'
        },
        series: [{
          name: '第一季度',
          type: 'line',
          data: [200, 400, 100, 800]
        },
        {
          name: '第二季度',
          type: 'line',
          data: [204, 50, 560, 700]
        }
        ]
      },
      rankVisitedList: [{
        name: 'xx路1号店面',
        saleTotal: 20000,
        id: 687
      },
      {
        name: 'xx路1号店面',
        saleTotal: 10600,
        id: 688
      },
      {
        name: 'xx路1号店面',
        saleTotal: 10300,
        id: 689
      },
      {
        name: 'xx路1号店面',
        saleTotal: 10200,
        id: 690
      },
      {
        name: 'xx路1号店面',
        saleTotal: 9000,
        id: 691
      },
      {
        name: 'xx路1号店面',
        saleTotal: 8000,
        id: 692
      },
      {
        name: 'xx路1号店面',
        saleTotal: 7000,
        id: 693
      }
      ]
    }
  },
  components: {
    CardBlock,
    Bar,
    LineChart
  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.rank-wrapper {
  li {
    height: $base-height;
    line-height: $base-height;
    display: flex;
    justify-content: space-between;

    &.active {
      i {
        color: #fff;
        background-color: #314659;
      }
    }

    i {
      line-height: 20px;
      text-align: center;
      background-color: #fafafa;
      border-radius: 20px;
      margin-right: 16px;
      font-weight: 600;
      font-size: 12px;
      display: inline-block;
      width: 20px;
      height: 20px;
      font-style: normal;
    }
  }
}
</style>
