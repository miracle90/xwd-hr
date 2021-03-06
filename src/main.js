import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// 引入 网络请求模块
import http from './common/axios.js'
// import VueDraggableResizable from 'vue-draggable-resizable'
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import {
  ConfigProvider,
  Button,
  Layout,
  Menu,
  breadcrumb,
  Form,
  Spin,
  Col,
  Row,
  Input,
  Upload,
  Table,
  Pagination,
  Divider,
  Icon,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Modal,
  Result,
  Tree,
  message
} from 'ant-design-vue'

Vue.use(ConfigProvider)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(breadcrumb)
Vue.use(Form)
Vue.use(Spin)
Vue.use(Col)
Vue.use(Row)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Divider)
Vue.use(Icon)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Modal)
Vue.use(Result)
Vue.use(Tree)

// 引入拖拽组件
// Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$http = http
Vue.config.productionTip = false

// Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
