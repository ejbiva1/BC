<template>
  <div class="my">
    <div class="block">
      <div class="title">收件信息</div>
      <div class="blockData">
      <div class="add">上海市 浦东新区 纳贤路799号</div>
      <div class="name">刘凯</div>
      <div class="phoneNum">12345678909</div>
      <div class="row">
        <div class="IDTitle">身份证号</div>
        <div class="IDNum">1201**********3013</div>
      </div>
      </div>
      <div class="title">身份证照片</div>
      <div class="IDrow">
        <div class="leftIDPic">正面图</div>
        <div class="rightIDPic">背面图</div>
      </div>
    </div>

    <div class="block">
      <div class="row">
        <div class="leftTitle">支付金额： </div>
        <div class="rightData">2200元</div>
      </div>
      <div class="title">预计送到时间：</div>
      <div class="receivedTime">2019年4月3日至2019年4月7日之间（根据不同时间段会有偏差，仅作为参考）</div>
    </div>

    <div class="block">
      <div class="title">条款签署</div>
      <div class="word">跨境电商商品不支持退换货</div>
      <div class="agree">
        <checkbox  />同意
      </div>
    </div>

    <button class="payButton">去支付</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style>
  .my{
    background-color:#F7F7F7;
    position: fixed;
    height:100%;
    width:100%;
  }
  .block{
    background-color: white;
    width:88%;
    margin-left:20rpx;
    padding-top:10rpx;
    padding-bottom: 10rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-top: 40rpx;
    font-size:small;
  }
  .title{
    margin-top:10rpx;
    margin-bottom:10rpx;
  }

  .add{
    font-size:small;
  }
  .IDTitle{
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .IDrow{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:50%;
  }
  .blockData{
    margin-left: 20rpx;
  }
  .receivedTime{
    margin-left: 20rpx;
  }
  .agree{
    margin-top:20rpx;
  }
  .payButton{
    margin-top:150rpx;
    width:88%;
    margin-left:40rpx;
    background-color: white;
  }

</style>

