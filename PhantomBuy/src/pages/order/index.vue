<template>

    <div class="order">
      <div class="titleBlock">
        Michael Kors
      </div>

      <div class="sliderLeft" style="margin-top:40rpx;">
      <slider-left>
      <div class="itemBlock" @click="itemBlockChangeColor" :style="{'background-color':pageBackgroundColor
      }">
          <div class="row">
            <div class="itemImage">
              <image src="./test.jpg" class="titleImage" mode="widthFix"/>
            </div>
            <div class="itemDetail">
              <div class="itemTitle">双面毛衣外套</div>
              <div class="row">
                <div class="itemRow">
                  <div class="itemColor smallFont">颜色：</div>
                  <div class="itemColorDetail smallFont">蓝色</div>
                </div>
                <div class="itemRow">
                  <div class="itemSize smallFont">尺码：</div>
                  <div class="itemSizeDetail smallFont">S</div>
                </div>
                <div class="itemRow">
                <div class="itemPrice smallFont">价格：</div>
                <div class="itemPriceDetail smallFont">1200</div>
              </div>
              </div>
              <div class="counterBlock" @tap.stop="catchtapControl">
                <wxc-counter  class="counter" number="1" max="100" min="1" color="#000"></wxc-counter>
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
      </slider-left>
      </div>

      <div class="priceBlock">
        <div class="row paddingButtom20">
          <div class="priceTitle">价格合计：</div>
          <div class="priceTotalDetail">1200</div>
          <div class="priceUnit">元</div>
        </div>
        <div class="row paddingButtom20">
          <div class="priceTitle">消费税合计：</div>
          <div class="texTotalDetail">120</div>
          <div class="priceUnit">元</div>
        </div>
        <div class="row paddingButtom20">
          <div class="priceTitle">国际快递运费：</div>
          <div class="delDetail">123</div>
          <div class="priceUnit">元</div>
          <div class="weightTitle">（预估</div>
          <div class="weightDetail">14</div>
          <div class="weightUnit">磅）</div>
        </div>

        <div class="row paddingButtom20">
          <div class="priceTitle">平台手续费：</div>
          <div class="middlePriceDetail">0</div>
          <div class="priceUnit">元</div>
        </div>
      </div>
      <div class="checkoutButton">
        <wxc-button  size="normal" type="secondary"  value="去结算"></wxc-button>
      </div>


    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'slide',//左滑删除
      data() {
        return {
          pageBackgroundColor: 'lightgray',
        }
      },
      components: {
      },

      methods: {
        itemBlockChangeColor: function () {
          let bgColor = this.pageBackgroundColor;
          if (bgColor == 'lightgray') {
            bgColor = 'white';
          } else {
            bgColor = 'lightgray';
          }
          this.pageBackgroundColor = bgColor;
        },
        catchtapControl: function () {},
      }
    }


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
    margin-top: 20rpx;
    margin-left: 46rpx;
    margin-right: 46rpx;
    background-color: white;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }
  .itemImage {
    width:20%;
    margin-left: 40rpx;
  }
  .titleImage{
    width:100%;
  }
  .itemBlock{
    width:100%;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }
  .itemTitle{
    font-size: normal;
  }
  .smallFont {
    font-size: small;
  }
  .itemTitle{
    margin-left: 30rpx;
    margin-top: 15rpx;
  }
  .itemRow{
    display: flex;
    flex-direction: row;
    margin-left: 30rpx;
    margin-top:20rpx;
  }
  .counterBlock {
    background-color: #fff;
    margin-left: 30rpx;
    width:175rpx;
  }
  .counter{
    margin:0;
    padding:0;
  }
  .total{
    display: block;
    float: right;
    margin-right:20rpx;
    font-size: small;
    margin-bottom: 10rpx;
  }
  .priceBlock{
    background-color: white;
    font-size: small;
    margin-left: 46rpx;
    margin-right: 46rpx;
    margin-top:40rpx;
    padding-top: 20rpx;
    padding-left:20rpx;
  }
  .paddingButtom20{
    padding-bottom: 20rpx;
  }

  .checkoutButton{
    float: right;
    margin-top: 180rpx;
    margin-right: 46rpx;
  }




</style>

