import Vue from 'vue'
import App from './App'
import store from './store/index';
import MpvueRouterPatch from 'mpvue-router-patch'; // 兼容vue-router写法

Vue.config.productionTip = false
App.mpType = 'app'



Vue.prototype.$store = store;

const app = new Vue(App)
app.$mount()

