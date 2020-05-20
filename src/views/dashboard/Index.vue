<template>
    <div class="analysis-container">
        <top-card-info></top-card-info>
        <div class="info-divider">
          <sales-card></sales-card>
        </div>
        <div class="info-divider">
          <other-charts></other-charts>
        </div>
    </div>
</template>
<script>
import TopCardInfo from './components/TopCardInfo'
import SalesCard from './components/SalesCard'
import OtherCharts from './components/OtherCharts'
export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  components: {
    TopCardInfo,
    SalesCard,
    OtherCharts
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
    .analysis-container{
        .card-title-icon{
            float: right;
            cursor: pointer;
        }
        .info-divider{
          margin-top: $base-margin;
        }
        .rank-wrapper{
          li{
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
            i{
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
    }

</style>
