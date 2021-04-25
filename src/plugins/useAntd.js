/*
 * @Author: ykx
 * @Date: 2021-01-15 17:03:38
 * @LastEditTime: 2021-04-25 10:18:28
 * @LastEditors: your name
 * @Description: 按需加载ant-design-vue组件
 * @FilePath: \zdww-base-frame\src\plugins\useAntd.js
 */
import Vue from 'vue'
import {
  Breadcrumb,
  Dropdown,
  Menu,
  Button,
  Layout,
  Icon,
  Form,
  Input,
  Tabs,
  Card,
  Tooltip,
  AutoComplete,
  Row,
  Col,
  Radio,
  Slider,
  Divider,
  InputNumber,
  Checkbox,
  FormModel,
  Drawer,
  Modal,
  message,
  notification,
  ConfigProvider,
  Switch,
  Spin,
  Alert,
  DatePicker,
  TimePicker,
  Upload,
  Popover,
  Select
} from 'ant-design-vue'
const {
  Header: LayoutHeader,
  Content: LayoutContent,
  Sider: LayoutSider
} = Layout
const { Group: RadioGroup, Button: RadioButton } = Radio
const { Item: FormItem } = Form
const { Item: FormModelItem } = FormModel
const { TabPane } = Tabs
const antdComponents = [
  Breadcrumb,
  Dropdown,
  Menu,
  Button,
  Icon,
  Layout,
  Form,
  Input,
  FormItem,
  FormModel,
  FormModelItem,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Tabs,
  TabPane,
  Card,
  Tooltip,
  AutoComplete,
  Row,
  Col,
  Radio,
  RadioGroup,
  RadioButton,
  Slider,
  Divider,
  Modal,
  InputNumber,
  Checkbox,
  Tooltip,
  Drawer,
  ConfigProvider,
  Switch,
  Spin,
  Alert,
  DatePicker,
  TimePicker,
  Upload,
  Popover,
  Select
]
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
// 不要使用vue.component注册
antdComponents.forEach(com => {
  Vue.use(com)
})
