import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import { Button, Select, Message, MessageBox, Avatar, Row, Col, Divider, Dialog, Rate, DatePicker,Option } from 'element-ui';

import './assets/icons/index'

  // 国际化
  import VueI18n from 'vue-i18n'  //引入下载的vue-i18包
  import enLocale from '../src/locales/en.json'
  import zhLocale from '../src/locales/cn.json'

  Vue.use(VueI18n) // 注册并对翻译的语法进行转化 $t
  const messages = { // 版本对象
    en: enLocale,                  
    zh: zhLocale
  }

  const i18n = new VueI18n({
    // 保存用户习惯，如果没有，就默认中文简体
    locale: localStorage.getItem('i18n-easyform') ? localStorage.getItem('i18n-easyform') : 'zh', // 默认语言
    messages
  })

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Message.name, Message)
Vue.component(Avatar.name, Avatar)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Divider.name, Divider)
Vue.component(Dialog.name, Dialog)
Vue.component(Rate.name, Rate)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Option.name, Option)
Vue.config.productionTip = false
Vue.prototype.$message = Message

Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$alert = MessageBox.alert

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
