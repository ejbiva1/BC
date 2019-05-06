<template>
  <div class="animated fadeIn">
    <view class="addresss">
      <wxc-panel :border="has_border" v-for="(item, index) in address_list" :key="i"
                 @click="changeReceiveAddress(item,index)">
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
      <wxc-tab
        bind:tabchange="onClick"
        :default-index="4"
        :active-text-color="text_color"
        :active-line-color="text_color"
        :component-id="c1"
        :animate="animate"
      >
        <wxc-tab-panel
          v-for="(tab, index) in tabs"
          :for-item="tab"
          :key="tab.content"
          :tab-index="index"
          component-id="c1"
          :label="tab.title"
        >
          {{tab.content}}
        </wxc-tab-panel>

      </wxc-tab>
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
        tabs: [
          {title: '选项一', content: '内容一'},
          {title: '选项二', content: '内容二'},
          {title: '选项三', content: '内容三'}
        ],
        change_receive_address: false,
        text_color: '#108ee9',
        animate: true
      }
    },
    onShow(){
      this.show_loading();
      if (this.is_authorized()) {
        this.getUserAddressList();
        this.hide_loading();
      }
    },
    onLoad(option){
      if (option.change_receive_address !== undefined) {
        this.change_receive_address = true;
      } else {
        this.change_receive_address = false;
      }
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
      changeReceiveAddress(item, index){
        if (!this.change_receive_address) {
          return;
        }
        /*
         wx.navigateTo({
         url: '/pages/checkout/main?receive_address_id=' + item.addressId
         });
         */
        let pages = getCurrentPages()// 当前页面    （pages就是获取的当前页面的JS里面所有pages的信息）
        let prevPage = pages[pages.length - 2];// 上一页面（prevPage 就是获取的上一个页面的JS里面所有pages的信息）
        prevPage.setData({
          state: 1,
          receive_address_id: item.addressId
        })
        wx.navigateBack({
          delta: 1
        })
      },
      editUserAddress(item){
        this.address = item;
        wx.navigateTo({
          url: '/pages/editaddress/main?isEditAddress= ' + true + '&address_detail=' + JSON.stringify(this.address)
        });
      },
      getUserAddressList(){
        let self = this;
        // 获取当前用户 地址列表
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post("phantombuy/userAddress/list", {entityDTO: {}}).then(res => {
          if (res.data.code === '1') {
            self.address_list = res.data.data.records;
          } else if (res.data.code === '0') {
            if (res.data.data.records.length == 0) {
              self.address_list = [];
            }
          } else if (res.data.code === '888') {
            self.toast = common.showErrorMsg("请先登录");
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
      },
      addNewAddress(){
        wx.navigateTo({
          url: '/pages/editaddress/main?isEditAddress=' + false
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
  .animated {
    background-color: #F7F7F7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

</style>

