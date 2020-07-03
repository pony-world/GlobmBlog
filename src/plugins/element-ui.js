
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-theme.scss'
import {
  Button,
  Input,
  Pagination,
  Menu,
  MenuItem,
  Submenu,
  Form,
  FormItem,
  Upload,
  Dialog,
  Progress,
  Tag,
  Select,
  Option,
  Radio,
  RadioGroup,
  Tabs,
  TabPane,
  MessageBox,
  Table,
  TableColumn,
  PageHeader,
  Breadcrumb,
  BreadcrumbItem,
  CheckboxGroup,
  Checkbox
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Pagination.name, Pagination)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Submenu.name, Submenu)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Upload.name, Upload)
Vue.component(Dialog.name, Dialog)
Vue.component(Progress.name, Progress)
Vue.component(Tag.name, Tag)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(PageHeader.name, PageHeader)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Checkbox.name, Checkbox)

Vue.prototype.$confirm = MessageBox.confirm
