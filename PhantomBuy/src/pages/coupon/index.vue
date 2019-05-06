<template>
  <div class="coupon">
    <view class="coupons">
      <tabs v-bind:tab_category="coupon" v-bind:tab_list="user_coupon_list" ref="coupon"></tabs>
    </view>

  </div>
</template>

<script type="text/ecmascript-6">
  import fly from "../../utils/fly";
  import {mapState, mapMutations} from 'vuex';
  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types";
  import tab from "../../components/coupon/coupon";


  //卡券列表页
  export default {
    name: 'coupon',
    data() {
      return {
        has_border: true,
        user_coupon_list: [],
      }
    },
    components: {
      "tabs": tab
    },
    onShow(){
      this.show_loading();
      if (this.is_authorized()) {
        this.getUserCouponList();
        this.$refs.coupon.showTab();
        this.hide_loading();
      }
    },
    onLoad(option){

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
            self.user_coupon_list = res.data.data.records;
            console.log(self.user_coupon_list);
          } else if (res.data.code === '0') {
            if (res.data.data.records.length == 0) {
              self.user_coupon_list = [];
            }
          } else if (res.data.code === '888') {
            self.toast = common.showErrorMsg("请先登录");
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
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

  .coupons {
    width: 100%;
  }

</style>

