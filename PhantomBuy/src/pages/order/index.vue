<template>
    <div class="order">
      <div class="titleBlock">
        Michael Kors
      </div>
      <div class="itemBlock">
          <div class="row">
            <div class="itemImage">

            </div>
            <div class="itemDetail">
              <div class="itemTitle">双面毛衣外套</div>
              <div class="row">
                <div class="itemColor">颜色：</div>
                <div class="itemColorDetail">蓝色</div>
              </div>
              <div class="row">
                <div class="itemSize">尺码：</div>
                <div class="itemSizeDetail">S</div>
              </div>
              <div class="row">
                <div class="itemPrice">价格：</div>
                <div class="itemPriceDetail">1200</div>
              </div>
            </div>
            <!--
            <view class="stepper">
              <text class="{{minusStatus}}" bindtap="bindMinus">-</text>
              <input type="number" bindchange="bindManual" value="{{num}}" />
              <text class="normal" bindtap="bindPlus">+</text>
            </view>
            -->

          </div>
        <div class="total">
          <div class="row">
            <div class="totalTitle">合计：</div>
            <div class="totalDetail">1200 元</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped>
  .order{
    background-color:#F7F7F7;
    position: fixed;
    height:100%;
    width:100%;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .titleBlock{
    width: 88%;
    margin-top: 20rpx;
    margin-left: 20rpx;
    background-color: white;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }

  .itemBlock{
    width: 88%;
    margin-top: 20rpx;
    margin-left: 20rpx;
    background-color: lightgray;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }
  .total{

  }
</style>

