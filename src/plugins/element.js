import Vue from 'vue'
import {
  Button,
  Select,
  Form,
  Input,
  FormItem,
  Menu,
  Card,
  Col,
  Row,
  Tooltip,
  Tabs,
  TabPane,
  MenuItem,
  Submenu,
  DropdownItem,
  Dropdown,
  MessageBox,
  Message,
  DropdownMenu,
  Table,
  TableColumn,
  Radio,
  RadioGroup,
  RadioButton,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'
const elemComponets = [
  Button,
  Select,
  Card,
  Col,
  Tabs,
  TabPane,
  Row,
  Tooltip,
  Radio,
  RadioGroup,
  RadioButton,
  Form,
  Input,
  FormItem,
  Menu,
  MenuItem,
  Submenu,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Table,
  TableColumn,
  Radio,
  RadioGroup,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem
];
Vue.prototype.$confirm = MessageBox.confirm // 注册为全局方法
Vue.prototype.$message = Message;
elemComponets.forEach(com => {
  Vue.use(com)
});
