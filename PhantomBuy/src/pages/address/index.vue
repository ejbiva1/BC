<template>
  <div class="animated fadeIn">
    <view class="addresss">
      <wxc-panel :border="has_border" v-for="(item, index) in address_list" :key="i">
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
        :is-show="show_toast"
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
  //地址列表页
  export default {
    name: 'address',
    data() {
      return {
        has_border: true,
        show_toast: false,
        toast: {},
        session_id: '',
        address: {},
        address_list: []
      }
    },
    onShow(){
      this.getSettingKey();
    },
    created() {
    },
    methods: {
      editUserAddress(item){
        this.address = item;
        wx.navigateTo({
          url: '/pages/editaddress/main?isEditAddress= ' + true + '&address_detail=' + JSON.stringify(this.address)
        });
      },
      getSettingKey () {
        let self = this;
        let settingKey
        wx.getStorage({
          key: 'settingKey',
          success: function (data) {
            //console.log(data)
            settingKey = data.data;
            if (settingKey === '1') {
              self.getSessionId();
            } else if (settingKey === '0') {
              // 未授权，跳转授权页面
              wx.navigateTo({
                url: '/pages/login/main'
              })
            } else {
              self.getSettingKey()
            }
          },
          // 没有获得到SettingKey的时候重复调用本函数
          fail: function (err) {
            self.getSettingKey()
          }
        })
      },

      getSessionId() {
        let self = this;
        wx.getStorage({
          key: 'cookieKey',
          success: function (data) {
            //console.log(data);
            const cookieSession = String(data.data);
            let sessionId = cookieSession.split('=')[1].split(';')[0];
            self.getUserAddressList(sessionId);

          },
          fail: function (err) {
            console.log(err)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
        })
      },
      getUserAddressList(sessionId){
        // 获取当前用户 地址列表
        fly.config.headers["Cookie"] = "JSESSIONID=" + sessionId;
        this.session_id = sessionId;
        fly.post("phantombuy/userAddress/list", {entityDTO: {}}).then(res => {
          if (res.data.code === '1') {
            this.address_list = res.data.data.records;

          } else if (res.data.code === '888') {

            console.log("请先登录");
            this.toast = common.showErrorMsg("服务器内部错误");
            this.show_toast = true;
            setTimeout(function () {
              this.show_toast = false;
            }, 1500);

          } else {
            console.log("无结果");
          }
        });
      },
      addNewAddress(){
        wx.navigateTo({
          url: '/pages/editaddress/main?isEditAddress=' + false
        })
      },
      showMsg() {
      }
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

