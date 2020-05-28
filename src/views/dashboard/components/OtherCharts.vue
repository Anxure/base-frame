<template>
  <div class="other-charts-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <card-block :bodyH="300">
          <div slot="header">
            <span>六要素好评率分析</span>
            <span class="extra-wrapper">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                  <el-dropdown-item command="refresh" icon="el-icon-refresh-right">刷新</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
          <group-list :data="sixElemData"></group-list>
        </card-block>
      </el-col>
      <el-col :span="12">
        <card-block :bodyH="300">
          <div slot="header">
            <span>销售额类别占比</span>
            <span class="extra-wrapper">
              <el-radio-group v-model="source" size="small">
                <el-radio-button label="1">全部渠道</el-radio-button>
                <el-radio-button label="2">线上</el-radio-button>
                <el-radio-button label="3">门店</el-radio-button>
              </el-radio-group>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                  <el-dropdown-item command="refresh" icon="el-icon-refresh-right">刷新</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
          <Pie :option="saleCategroyOption" />
        </card-block>
      </el-col>
    </el-row>
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
    handleCommand (type) {
      this.$message.info(`你点击了${type === 'edit' ? '编辑' : '刷新'}`);
    }
  }
};
</script>
<style lang="scss">
.other-charts-container{
    .extra-wrapper{
        position: relative;
    }
    .el-radio-group{
        width: 260px;
        position: absolute;
        right: -40px;
        bottom: -7px;
    }
}
</style>
<style lang="scss" scoped>
</style>
