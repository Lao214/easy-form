import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import { Button, Select, Message, Avatar, Row, Col, Divider, Dialog, Rate, DatePicker,Option } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Message.name, Message);
Vue.component(Avatar.name, Avatar);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Divider.name, Divider);
Vue.component(Dialog.name, Dialog);
Vue.component(Rate.name, Rate);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Option.name, Option);
Vue.config.productionTip = false
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
