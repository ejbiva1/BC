/**
 * Created by rdai2 on 2019/2/26.
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    usingComponents: {
      'wxc-price': "/static/minui/@minui/wxc-price",
      'wxc-counter': '/static/minui/@minui/wxc-counter',
      'wxc-button': '/static/minui/@minui/wxc-button'
    }
  },
  data: {},
  methods: {
    onChangeNumber (e) {
      console.log(e.detail);
    }
  }
}
