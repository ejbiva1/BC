<template>
  <div class="animated fadeIn">
    <view class="addresss">
      <wxc-panel :border="has_border" v-for="(item, index) in user_coupon_list" :key="i">
        <view class="address_home padding">
          <view class="user_phone">
            <text>{{item.receiver}}</text>
            <text class="phone_padding">{{item.receiverPhone}}</text>
          </view>
          <view class="address">
            <view class="address_detail">{{item.addressDetail}}</view>
            <view class="operate" @click.stop="editUserAddress(item)">编辑</view>
          </view>
        </view>
      </wxc-panel>
    </view>


    <view class="coupons">

    </view>

  </div>
</template>

<script type="text/ecmascript-6">
  import fly from "../../utils/fly";
  import {mapState, mapMutations} from 'vuex';
  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types";

  //卡券列表页
  export default {
    name: 'coupon',
    data() {
      return {
        has_border: true,
        user_coupon_list: []
      }
    },
    onShow(){
      this.show_loading();
      if (this.is_authorized()) {
        this.getUserCouponList();
        this.hide_loading();
      }
    },
    onLoad(option){

    },
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    onUnload(){
      // 初始化数据
      this.address_list = [];
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
  .animated {
    background-color: #F7F7F7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-family: "Microsoft Yahei";
  }

</style>

