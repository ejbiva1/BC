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
    <div class="dataBody">
      <view class="myDataBlock" @click="toMyOrderPage">
        <view class="address_sort">
          <view>我的订单</view>
          <view>
            <wxc-icon color="#red" size="30" type="arrow-right"></wxc-icon>
          </view>
        </view>
      </view>

      <view class="myDataBlock" @click="toMyAddressPage">
        <view class="address_sort">
          <view>收货地址管理</view>
          <view>
            <wxc-icon color="#red" size="30" type="arrow-right"></wxc-icon>
          </view>
        </view>
      </view>

    </div>
    <!--<div class="signOut">退出账号</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {};
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

<style scoped>
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

  .my {
    background-color: #F7F7F7;
    position: fixed;
    height: 100%;
    width: 100%;
  }

  .dataBody {
  }

  .navLink {
    margin-left: 0.20rem;
    margin-right: 0.20rem;
  }

  .myOrderDataBlock {
    background-color: white;
    margin-top: 0.20rem;
    padding-top: 0.20rem;
    padding-bottom: 0.20rem;
    padding-left: 0.20rem;
    padding-right: 0.20rem;
  }

  .myDataBlock {
    background-color: white;
    margin-top: 0.20rem;
    margin-left: 0.20rem;
    margin-right: 0.20rem;
    padding-top: 0.20rem;
    padding-bottom: 0.20rem;
    padding-left: 0.20rem;
    padding-right: 0.20rem;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .halfRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 60%;
  }

  .twoSideRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .myDataLink {
    color: black;
  }

  .address_sort {
    display: flex;
    justify-content: space-between;
  }

  .discountCla {
    color: gray;
  }

  .adData {
    color: gray;
    font-size: smaller;
  }
</style>
