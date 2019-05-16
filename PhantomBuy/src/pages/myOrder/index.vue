<template>
  <view class="my">

    <view class="headerTab" style="z-index:1001;">
      <view class="animated fadeIn">
        <view class="product_tabs">
          <view class="product_tabsNav">
            <view
              :class="{'selected':tab === 1,'product_tabs_active':true}"
              @click="changTab(1)" style="text-align:center">全部
            </view>
            <view
              :class="{'selected':tab === 4,'product_tabs_active':true}"
              @click="changTab(4)" style="text-align:center">待付款
            </view>
            <view
              :class="{'selected':tab === 2,'product_tabs_active':true}"
              @click="changTab(2)" style="text-align:center"
            >已付款
            </view>
            <view
              :class="{'selected':tab === 3,'product_tabs_active':true}"
              @click="changTab(3)" style="text-align:center"
            >已发货
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="noList" :style="{display: displayData}" @touchmove.stop="move">
      尚未存在订单

    </view>
    <view class="block" v-for="(item, i) in order_list" :key="i" v-if="item.orderSiteList.length  !== 0">

      <wxc-panel>
        <view class="order_detail">
          <view class="order_name cart_block">
            <h4 class="brand">{{item.orderName}}</h4>
          </view>
          <!--<view class="date">{{item.createDate}}</view>-->
          <view>
            <view class="dataBlock" v-for="(orderItem, j) in item.orderSiteList" :key="j">
              <view class="itemBlock" v-for="(orderDetailItem, k) in orderItem.orderDetailList" :key="k">
                <view class="itemBlock">
                  <view class="row">
                    <view class="itemImage">
                      <image :src="orderDetailItem.productImageUrl" class="titleImage" mode="widthFix"/>
                    </view>
                    <view class="itemDetail">
                      <view class="itemName paddingButton10">{{orderDetailItem.productName}}</view>
                      <view class="row paddingButton10 grayFont">
                        <view class="itemColorTitle">颜色：</view>
                        <view class="itemColorDetail">{{orderDetailItem.color}}</view>
                      </view>
                      <view class="row paddingButton10 grayFont">
                        <view class="itemPriceTitle">价格：</view>
                        <view class="itemPriceDetail">{{orderDetailItem.productRmbPriceTotal}}</view>
                      </view>
                    </view>
                  </view>
                </view>

              </view>
            </view>
            <view class="payPrice row">
              <view class="payButton">
            <span v-show="item.status === 0">
              <wxc-button size="small" type="info" value="去支付" @click="payOrder(item.orderId)"></wxc-button>
            </span>
              </view>
              <view class="totalTitle">支付金额：{{item.chnFee}} 元</view>
            </view>
          </view>
        </view>
      </wxc-panel>
    </view>


  </view>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly'
  import {common} from "../../utils/common";
  import {mapState, mapMutations} from 'vuex';
  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types";
  import {formatTime} from "../../utils/util";
  var settingKey = ''
  export default {
    props: {
      product: {
        type: Object
      }
    },
    onShow () {
    },
    onLoad(){
      if (this.is_authorized()) {
        this.showList(this.tab)
      }
    },
    data () {
      return {
        tab: 1,
        order_list: [],
        displayData: 'none',
        displayBtn: 'none',
      }
      /*
       tabs: [
       {title: '全部', content: '内容一', tabID: 1},
       {title: '已付款', content: '内容二', tabID: 2},
       {title: '已发货', content: '内容三', tabID: 3}
       ]}
       */
    },
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    methods: {
      move () {
      },
      is_authorized(){
        if (this.settingKey === '1') { // 已授权
          return true;
        } else if (this.settingKey === '0') {      // 未授权 , 不停地跳转至 登录页
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }
        return false;
      },
      payOrder (orderId) {
        const self = this
        // 调用后台统一支付下单的接口 POST /orderMain/wechatUnifiedorder
        let entityDTO = {
          'entityDTO': {
            'orderId': orderId
          }
        }
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post('phantombuy/orderMain/wechatUnifiedorder', entityDTO).then(res => {
          if (res.data.return_code === "SUCCESS") {
            // this.user_default_address = res.data.data;
            console.log(`看看后台返回了什么给我:`, res.data)
            this.appid = res.data.appid
            this.sign = res.data.sign
            this.prepay_id = 'prepay_id=' + res.data.prepay_id
            this.nonce_str = res.data.nonce_str
            this.timeStamp = res.data.timeStamp
            // this.timeStamp = Date.parse(new Date())
            // this.timeStamp = String(this.timeStamp / 1000)
            console.log(`timeStamp:`, this.timeStamp)
            console.log(`nonceStr:`, this.nonce_str)
            console.log(`package:`, this.prepay_id)
            console.log(`paySign:`, this.sign)
            wx.requestPayment(
              {
                'appId': '',
                'timeStamp': this.timeStamp,
                'nonceStr': this.nonce_str,
                'package': this.prepay_id,
                'signType': 'MD5',
                'paySign': this.sign,
                'success': (res) => {
                  console.log(`支付成功:`, res)
                  wx.redirectTo({
                    url: '/pages/myOrder/main'
                  })
                },
                'fail': function (res) {
                  console.log(`支付失败:`, res)
                },
                'complete': function (res) {
                  // console.log(`支付完成:`, res)
                  // 这段需要注释掉的，沙盒测试的时候代替跳转而已
                  wx.redirectTo({
                    url: '/pages/myOrder/main'
                  })
                }
              })
          } else {
            this.toast = common.showErrMsg("服务器内部错误")
            let self = this
            setTimeout(function () {
              self.toast.show_toast = false
            }, 1500)
          }
        })
      },
      onClick: function (e) {
        console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`)
      },
      changTab (index) {
        this.tab = index
        console.log('ComponentId:' + index)
        this.showList(this.tab)
        // 修改参数，重新刷新接口，显示不同的列表
      },
      showList (state) {
        this.show_loading();
        fly.config.headers['Cookie'] = 'JSESSIONID=' + this.sessionId;
        console.log(this.sessionId);
        let json = {entityDTO: {}};
        if (state === 2) {
          // 已付款 代号3
          json = {entityDTO: {status: 3}};
          this.displayBtn = 'none'
        } else if (state === 3) {
          // 已发货 代号51
          json = {entityDTO: {status: 51}};
          this.displayBtn = 'none'
        } else if (state === 4) {
          // 已发货 代号51
          json = {entityDTO: {status: 0}};
          this.displayBtn = 'block'
        } else {
          this.displayBtn = 'none'
        }
        fly.post('phantombuy/orderMain/list', json).then((res) => {
          if (res.data.code === `888`) {
            wx.hideLoading()
            // 跳转授权页
            console.log(`请先登录:`, res)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          } else if (res.data.code === `1`) {
            if (res.data.data.records.length > 0) {
              this.order_list = res.data.data.records.reverse().map((item) => Object.assign(item, {
                createDate: formatTime.dateFormat(new Date(item.createDate.replace(/-/g, '/')))
              }));
              this.displayData = 'none'
            }

            this.hide_loading();
          } else {
            // Todo: 列表为空 应该要展示一个空的蒙版
            this.order_list = []
            this.displayData = 'block'
            console.log(`我的订单数据:`, res)
            this.hide_loading();
          }
        }).catch(err => {
          console.log(`api请求出错:`, err)
          wx.hideLoading()
        })

      },
      show_loading() {
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading() {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500);
      },
    }
  }
</script>

<style scoped>
  .payButton {
    position: absolute;
  }

  .totalTitle {
    left: 4.20rem;
    position: absolute;
  }

  .noList {
    height: 100%;
    width: 100%;
    z-index: 1000;
    font-color: black;
    padding-top: 2.00rem;
    text-align: center;
    background-color: white;
  }

  .my {
    background-color: #F7F7F7;
    height: 100%;
    width: 100%;
    z-index: -1;
    font-family: "Microsoft Yahei";
  }

  .block {
    padding-bottom: 0.3rem;
    padding-top: 0.1rem;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .date {
    font-size: 14px;
    margin-top: 0.20rem;
    margin-bottom: 0.20rem;
    margin-left: 0.36rem;
  }

  .dataBlock {
    background-color: white;
    padding-top: 0.20rem;
    padding-left: 0.36rem;
    padding-right: 0.36rem;
    padding-bottom: 0.25rem;
  }

  .brand {
    font-size: 15px;
    margin-bottom: 0.18rem;
  }

  .itemImage {
    width: 17%;
  }

  .titleImage {
    width: 100%;
  }

  .itemDetail {
    margin-left: 0.18rem;
    font-size: 14px;
  }

  .paddingButton10 {
    padding-bottom: 0.10rem;
  }

  .grayFont {
    color: gray;
  }

  .payPrice {
    padding-top: 0.10rem;
    margin-bottom: 0.50rem;
    font-size: 14px;
  }

  .product_tabs {
    width: 100%;
  }

  .product_tabs .product_tabsNav {
    padding-left: 0.2rem;
    /*height: 0.8rem;*/
    /*width:38%;*/
    line-height: 0.8rem;
    display: flex;
  }

  .product_tabs .product_tabs_active {
    flex: 1;
  }

  .product_tabsNav .selected {
    color: #87caee;
    border-bottom: 1px solid #87caee;
  }

  .tabs_container {
    position: relative;
  }

  .order_detail {
    padding-left: 0.2rem;
    padding-bottom: 0.2rem;
  }

  .order_name {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    height: 0.4rem;
  }

  .cart_block {
    display: flex;
    justify-content: flex-start;
    padding: 0.3rem 0rem 0.1rem 0.2rem;
  }
</style>
