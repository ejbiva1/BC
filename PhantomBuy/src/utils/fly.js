// 配置的  fly  -- ajax 请求封装包
import Vue from 'vue'
var Fly = require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
var fly = new Fly(); //创建fly实例
var prodEnv = require('./prod.env')
//添加拦截器
fly.interceptors.request.use((config, promise)=> {
  //给所有请求添加自定义header
  config.headers["X-Tag"] = "flyio";
  return config;
})
//配置请求基地址
Vue.prototype.$http = fly
// 体验版
fly.config.baseURL="https://www.phantombuy.com:8443/"
// 正式环境
//fly.config.baseURL = "https://www.phantombuy.com/"

export default fly
