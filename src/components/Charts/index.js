/**
 * fileName : index.js
 * author:ykx
 * date：2019/11/8 3:46
 * desc：统计表统一导出 注：Line 为关键字 在组件使用请使用别名 形如 LineChart
 */
import Bar from './Bar/Index.vue'
import Pie from './Pie/Index.vue'
import Line from './Line/Index.vue'
import LiquidFill from './LiquidFill/Index.vue'
import MiniArea from './MiniArea/Index.vue'
import MiniBar from './MiniBar/Index.vue'
import MiniProgress from './MiniProgress/Index.vue'
import Radar from './Radar/Index.vue'
import echarts from 'echarts'
import themeData from '@/components/Charts/walden.project.json'
// 导入自定义主题（可导入echart主题配置工具进行修改 https://www.echartsjs.com/theme-builder/）
echarts.registerTheme('walden', themeData.theme); // 注意这里注册寻找里层，外层为主题其余信息
export {
  Bar,
  Line as LineChart,
  LiquidFill,
  Pie,
  MiniArea,
  MiniBar,
  MiniProgress,
  Radar
}
