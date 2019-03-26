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
        <navigator url="../myOrder/main" class="navLink">
        <div class="myOrderDataBlock">
          <div class="twoSideRow">
            <div class="myDataTitle">
              我的订单
            </div>
            <div class="myDataLink">查看全部订单></div>
          </div>
        </div>
        </navigator>

        <div class="myDataBlock" @click="checkAllMyAddress">
          <div class="twoSideRow">
            <div class="myDataTitle">
              我的收货地址
            </div>
            <div class="myDataLink">查看全部地址></div>
          </div>
          <div class="adData">上海市浦东新区纳贤路799号 刘先生 12345678909</div>
        </div>

        <div class="myDataBlock">
          <div class="myDataTitle">
            我的卡卷
          </div>
          <div class="halfRow">
            <div class="discountCla">免运卡></div>
            <div class="discountCla">优惠券></div>
          </div>
        </div>

        <div class="myDataBlock">
          <div class="twoSideRow">
          <div class="myDataTitle">
            我的积分
          </div>
          <div class="myDataLink">查看积分详情></div>
          </div>
        </div>

      </div>
      <!--<div class="signOut">退出账号</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {};
    },
    methods:{
      checkAllMyAddress() {
        wx.navigateTo({
          url: '/pages/address/main',
        });
      }
    }
  }
</script>

<style>
  .userImg{
    margin-top: 0.20rem;
    margin-left:0.20rem;
    padding: 0rem;
    width:20%;
  }
  .userName{
    margin-top: 0.60rem;
    margin-left:0.20rem;
  }
  .my{
    background-color:#F7F7F7;
    position: fixed;
    height:100%;
    width:100%;
  }
  .dataBody{

  }
  .navLink{
    margin-left: 0.20rem;
    margin-right: 0.20rem;
  }
  .myOrderDataBlock{
    background-color: white;
    margin-top: 0.20rem;
    padding-top:0.20rem;
    padding-bottom: 0.20rem;
    padding-left: 0.20rem;
    padding-right: 0.20rem;
  }
  .myDataBlock{

    background-color: white;
    margin-top: 0.20rem;
    margin-left: 0.20rem;
    margin-right: 0.20rem;
    padding-top:0.20rem;
    padding-bottom: 0.20rem;
    padding-left: 0.20rem;
    padding-right: 0.20rem;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .halfRow{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:60%;
  }
  .twoSideRow{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .myDataLink{
    color:gray;
  }
  .discountCla{
    color:gray;
  }
  .adData{
    color: gray;
    font-size: smaller;
  }
</style>

