import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.scss';

// 全局引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
import Vuebar from 'vuebar' // 没有用到，测试用的，后期删除
Vue.use(Vuebar) // 没有用到，测试用的，后期删除

// 按需引入
import {
  Container,Header,Main,Scrollbar,
  Row, Col,
  Button,
  Input,
  Select,
  DatePicker,
  Option,
  Pagination,
  Progress,
  Message
} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Scrollbar);
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Progress);

Vue.prototype.$message = Message;




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
