import Vue from 'vue'
import App from './index'
// import main from "../home/main.json";

const app = new Vue(App)
app.$mount();
export default {
  config: {
    "usingComponents": {
      "wxc-label":"../../../static/minui/@minui/wxc-label/dist/index",
      //路径相对于当前json到下载好的wxc-toast位置


    }
  }
}
