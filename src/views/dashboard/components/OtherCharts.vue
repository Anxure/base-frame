<template>
  <div class="other-charts-container">
    <a-row :gutter="20">
      <a-col :span="12">
        <card-block :bodyH="300">
          <div slot="title">六要素好评率分析</div>
          <div slot="extra">
            <a-dropdown>
              <span class="el-dropdown-link">
                <a-icon type="dash" />
              </span>
              <a-menu
                slot="overlay"
                @click="handleCommand"
              >
                <a-menu-item key="edit">
                  <a-icon type="edit" />
                  编辑
                </a-menu-item>
                <a-menu-item key="refresh">
                  <a-icon type="sync" />
                  刷新
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <group-list :data="sixElemData"></group-list>
        </card-block>
      </a-col>
      <a-col :span="12">
        <card-block
          :bodyH="300"
          class="has-radio-group"
        >
          <div slot="title">销售额类别占比</div>
          <div slot="extra">
            <a-radio-group
              v-model="source"
              type="button"
              style="margin-right:10px"
            >
              <a-radio-button value="1">全部渠道</a-radio-button>
              <a-radio-button value="2">线上</a-radio-button>
              <a-radio-button value="3">门店</a-radio-button>
            </a-radio-group>
            <a-dropdown>
              <span class="el-dropdown-link">
                <a-icon type="dash" />
              </span>
              <a-menu
                slot="overlay"
                @click="handleCommand"
              >
                <a-menu-item key="edit">
                  <a-icon type="edit" />
                  编辑
                </a-menu-item>
                <a-menu-item key="refresh">
                  <a-icon type="sync" />
                  刷新
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <Pie :option="saleCategroyOption" />
        </card-block>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CardBlock from '@/components/CardBlock/Index.vue';
import GroupList from './GroupList';
import { Pie } from '@/components/Charts';
export default {
  name: 'OtherCharts',
  data () {
    return {
      source: '1',
      sixElemData: [
        { percentage: 0.2, name: '吃' },
        { percentage: 0.3, name: '吃' },
        { percentage: 0.4, name: '吃' },
        { percentage: 0.2, name: '吃' },
        { percentage: 0.2, name: '吃' },
        { percentage: 0.2, name: '吃' }
      ],
      saleCategroyOption: {
        legend: {
          data: ['家用电器', '食用酒水', '母婴产品', '其他']
        },
        graphic: {
          type: 'text',
          left: '29%',
          style: { text: '销售额\n\n100000' }
        },
        series: [
          {
            name: '销售额',
            type: 'pie',
            data: [
              { name: '家用电器', value: 20 },
              { name: '食用酒水', value: 30 },
              { name: '母婴产品', value: 40 },
              { name: '其他', value: 10 }
            ]
          }
        ]
      }
    };
  },
  components: {
    CardBlock,
    GroupList,
    Pie
  },
  methods: {
    handleCommand ({ key }) {
      this.$message.info(`你点击了${key === 'edit' ? '编辑' : '刷新'}`);
    }
  }
};
</script>
<style lang="less">
.other-charts-container {
  .extra-wrapper {
    position: relative;
  }
  .el-radio-group {
    width: 260px;
    position: absolute;
    right: -40px;
    bottom: -7px;
  }
}
</style>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
