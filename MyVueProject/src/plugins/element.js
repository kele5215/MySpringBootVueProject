import Vue from 'vue'
import {
  Card,
  Form,
  Button,
  Input,
  FormItem,
  Message
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
