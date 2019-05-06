import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
import Vuebar from 'vuebar'
Vue.use(Vuebar)

// 按需引入
import {
  Button,
  Select,
  Option,
  Pagination,
  Progress,
  Container,Header,Main,Scrollbar,
  Message
} from 'element-ui';
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Scrollbar);
Vue.use(Progress);

Vue.prototype.$message = Message;




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
