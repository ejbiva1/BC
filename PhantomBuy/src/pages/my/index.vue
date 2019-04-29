<template>
  <div class="my">

    <div class="row">
      <div class="userImg">
        <open-data class="thumb" type="userAvatarUrl"></open-data>
      </div>
      <div class="userName">
        <open-data class="nackname" lang="zh_CN" type="userNickName"></open-data>
      </div>
    </div>
    <div class="myDataBlock">
      <wxc-panel :border="has_border" @click="toMyOrderPage">

        <view class="address_sort padding">
          <view>我的订单</view>
          <view>
            <wxc-icon color="#red" size="25" type="arrow-right"></wxc-icon>
          </view>

        </view>
      </wxc-panel>
      <wxc-panel :border="has_border" @click="toMyAddressPage">
        <view class="address_sort padding">
          <view>收货地址管理</view>
          <view>
            <wxc-icon color="#red" size="25" type="arrow-right"></wxc-icon>
          </view>
        </view>
      </wxc-panel>


    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        has_border: true
      };
    },
    methods: {
      toMyAddressPage(){
        wx.navigateTo({
          url: '/pages/address/main'
        });
      },
      toMyOrderPage(){
        wx.navigateTo({
          url: '/pages/myOrder/main'
        })
      }
    }
  }
</script>

<style>
  .my {
    background-color: #F7F7F7;
    height: 100%;
    width: 100%;
    position: fixed;
    font-size: 0.23rem;
  }

  .userImg {
    margin-top: 0.20rem;
    margin-left: 0.20rem;
    padding: 0rem;
    width: 20%;
  }

  .userName {
    margin-top: 0.60rem;
    margin-left: 0.20rem;
  }

  .myDataBlock {
    width: 100%;
    padding: 0rem 0.20rem 0rem 0rem;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .address_sort {
    display: flex;
    justify-content: space-between;
  }

  .padding {
    padding: 0.2rem 0.1rem 0.1rem 0.25rem;
  }

</style>
