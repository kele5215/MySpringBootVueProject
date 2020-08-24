import Vue from 'vue'
import {
  Card,
  Form,
  Button,
  Input,
  FormItem,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Scrollbar,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem
} from 'element-ui'

Message.install = () => {
  Vue.prototype.$message = Message
}

Vue.use(Card)
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Message)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
