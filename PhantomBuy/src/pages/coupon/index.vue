<template>
  <div class="coupon">
    <view class="coupons_section">
      <view v-for="(item , index) in user_coupon_list" :key="index" class="coupons"
            @click="chooseSingleCoupon(item, index,$event)">
        <wxc-cc class="detail">
          <view class="choose_coupon" v-if="is_choose_coupon">
            <radio-group class="radio-group">
              <radio :checked="item.checked" color="#FCEAAB"></radio>
            </radio-group>
          </view>
          <view class="couponBalance">
            <span class="coupon_balance_text">余额</span>
            <wxc-price class="coupon_balance_num" icon="sub">
              {{item.couponBalance}}
            </wxc-price>
          </view>
          <view class="coupon_effect">
            {{item.effectStart}} 至 {{item.effectEnd}} 有效
          </view>
        </wxc-cc>

      </view>
    </view>

    <view class="no_coupon" v-if="is_coupon_empty">
      <view class="no_coupon_img">
        <img src="/static/images/ticket_coupon.png">
      </view>
      <view class="no_coupon_text">还没有优惠券~</view>
    </view>

  </div>
</template>

<script type="text/ecmascript-6">
  import fly from "../../utils/fly";
  import {mapState, mapMutations} from 'vuex';
  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types";
  import formatTime from "../../utils/util";

  //卡券列表页
  export default {
    name: 'coupon',
    data() {
      return {
        has_border: true,
        user_coupon_list: [],
        is_coupon_empty: false,
        is_choose_coupon: true

      }
    },
    onLoad(){
      this.show_loading();
      if (this.is_authorized()) {
        this.getUserCouponList();
        //this.$refs.coupon.showTab();
        this.hide_loading();
      }
    },
    onShow(){
    },
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    onUnload(){
      // 初始化数据
      this.user_coupon_list = [];
      this.is_choose_coupon = false;
    },
    methods: {
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
      getUserCouponList(){
        let self = this;
        // 获取当前用户 地址列表
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post("phantombuy/userCoupon/list", {entityDTO: {}}).then(res => {
          if (res.data.code === '1') {
            //self.user_coupon_list = res.data.data.records;
            res.data.data.records.forEach((item, index) => {
              self.user_coupon_list.push({
                couponBalance: item.couponBalance,
                effectEnd: formatTime(new Date(item.effectEnd)),
                effectStart: formatTime(new Date(item.effectStart)),
                userCouponId: item.userCouponId,
                userCouponName: item.userCouponName,
                checked: false
              });
            });

            if (self.is_coupon_empty)   self.is_coupon_empty = false;

          } else if (res.data.code === '0') {
            if (res.data.data.records.length == 0) {
              if (!self.is_coupon_empty)   self.is_coupon_empty = true;

            }
          } else if (res.data.code === '888') {
            self.toast = common.showErrorMsg("请先登录");
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
      },
      chooseSingleCoupon(item, index){
        let self = this;
        let chosen_index = index;
        if (!self.is_choose_coupon) return
        self.user_coupon_list[index].checked = !self.user_coupon_list[index].checked;
        // 保证每次只选中一个 为true
        self.user_coupon_list.forEach((item, index) => {
          if (chosen_index !== index) {
            item.checked = false;
          }
        });

        // return checkout page
        this.toCheckoutPage(item);

      },
      toCheckoutPage(coupon){
        let pages = getCurrentPages()// 当前页面    （pages就是获取的当前页面的JS里面所有pages的信息）
        let prevPage = pages[pages.length - 2];// 上一页面（prevPage 就是获取的上一个页面的JS里面所有pages的信息）
        prevPage.setData({
          chosen_coupon_state: 1,
          chosen_coupon_id: coupon.userCouponId
        })
        wx.navigateBack({
          delta: 1
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

<style>
  .coupon {
    background-color: #F7F7F7;
    height: 100%;
    font-family: "Microsoft Yahei";
    width: 100%;
    position: relative;
  }

  .coupons_section {
    width: 100%;
  }

  .no_coupon {
    text-align: center;
    background-color: white;
    height: 100%;
    width: 100%;
    z-index: 1000;
    padding-top: 2.00rem;
  }

  .no_coupon_text {
    text-align: center;
  }

  .no_coupon_img ._img {
    width: 1.00rem;
    height: 1.00rem;
  }

  .coupons {
    padding-top: 0.40rem;
  }

  .detail {
    display: block;
    width: 90%;
    cursor: pointer;
    border-color: #e1e1e1;
    border-radius: 0.20rem;
    background: linear-gradient(to right, #454746, #2F3130);
    position: relative;
    left: 5%;
  }

  .radio-group {
    position: relative;
    display: flex;
    justify-content: flex-end;
    color: #FCEAAB;
    padding-top: 0.2rem;
    padding-right: 0.2rem;
  }

  .couponBalance {
    text-align: center;
    height: 1.60rem;
    width: 100%;
    padding-top: 0.60rem;
    padding-bottom: 0.2rem;
  }

  .coupon_balance_text {
    color: #CFC793;
    padding-right: 0.10rem;
  }

  .coupon_balance_num {
    color: #FCEAAB;
    font-size: 0.68rem;
    font-weight: bold;
  }

  .coupon_effect {
    color: #FCEAAB;
    font-size: 0.24rem;
    padding-bottom: 0.15rem;
    height: 0.56rem;
    line-height: 0.56rem;
    vertical-align: middle;
    position: relative;
    padding-left: 0.20rem;
  }


</style>

