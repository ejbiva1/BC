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
            <view class="operate" @click="editUserAddress(item)">编辑</view>
          </view>
        </view>
      </wxc-panel>
    </view>

    <view class="add_address">
      <view class="button add_new_address" @click="addNewAddress">新增收货地址</view>
    </view>

    <view>
      <wxc-toast
        :is-show="toast.show_toast"
        :text="toast.msg"
        :icon="toast.icon_type"
        icon-color="#ff5777"
      ></wxc-toast>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  import fly from "../../utils/fly";
  import {appMessages} from "../../common/constants/message";
  import {common} from "../../utils/common";
  import {mapState, mapMutations} from 'vuex';
  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types";

  //地址列表页
  export default {
    name: 'address',
    data() {
      return {
        has_border: true,
        toast: {},
        address: {},
        address_list: [],
        change_receive_address: false
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

      console.log(getCurrentPages());
    },
    created() {
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

  .addresss {
    width: 100%;
    /*margin-bottom: 1.4rem;*/
  }

  .address_home {
    width: 100%;
  }

  .user_phone {
    font-size: 15px;
    font-weight: bold;
    height: 0.4rem;
    line-height: 0.4rem;
    vertical-align: middle;

  }

  .address {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    font-size: 15px;
  }

  .address_detail {
    width: 80%;
    flex-wrap: nowrap;
  }

  .operate {
    width: 20%;
    text-align: center;
    vertical-align: middle;
    color: red;
  }

  .padding {
    padding: 0.2rem 0.1rem 0.1rem 0.25rem;
  }

  .add_address {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    border-top: 2px solid #eee;
  }

  /*添加地址按钮*/
  .add_address .button {
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    /*width: 2.0rem;*/
    width: 100%;
    height: 1rem;
    color: white;
    font-size: 15px;
    border-radius: 0;
    border: 0;
    vertical-align: middle;
  }

  .add_new_address {
    background-color: #EE5757;
  }

  .phone_padding {
    padding-left: 0.25rem;
  }


</style>

