<template>
  <div class="my">
    <div class="headerTab" style="font-size: small;">
    <wxc-tab
      default-index="0"
      active-text-color="#108ee9"
      active-line-color="#108ee9"
      component-id="c1"
      animate="true"
    >
      <wxc-tab-panel :tab-index="index" component-id="c1" label="全部">1111</wxc-tab-panel>

      <wxc-tab-panel :tab-index="index" component-id="c1" label="已付款">2222</wxc-tab-panel>

      <wxc-tab-panel :tab-index="index" component-id="c1" label="已发货">3333</wxc-tab-panel>

    </wxc-tab>
    </div>


    <div class="block">
      <div class="date">2019年3月4日</div>
      <div class="dataBlock">
        <div class="brand">Coach</div>
        <div class="itemBlock">
          <div class="row">
            <div class="itemImage"><image src="/static/images/test2.jpg" class="titleImage" mode="widthFix"/></div>
            <div class="itemDetail">
              <div class="itemName paddingButton10">Sutton Hobo手提包</div>
              <div class="row paddingButton10 grayFont">
                <div class="itemColorTitle">颜色：</div>
                <div class="itemColorDetail">Navy</div>
              </div>
              <div class="row paddingButton10 grayFont">
                <div class="itemPriceTitle">价格：</div>
                <div class="itemPriceDetail">980</div>
              </div>
            </div>
          </div>

        </div>
        <div class="payPrice row">
          <div class="totalTitle">支付金额：</div>
          <div class="totalPrice">980</div>
          <div class="totalUnit">元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    methods: {
      onClick: function (e) {
      }
    }
  }
</script>

<style scoped>
  .my{
    background-color:#F7F7F7;
    position: fixed;
    height:100%;
    width:100%;
  }
  .block{

  }
  .row{
    display: flex;
    flex-direction: row;
  }

  .date{
    font-size:small;
    margin-top:20rpx;
    margin-bottom: 20rpx;
    margin-left: 46rpx;
  }
  .dataBlock{
    margin-left:46rpx;
    margin-right: 46rpx;
    background-color: white;
    padding-top:20rpx;
    padding-left:20rpx;
    padding-right:20rpx;
    padding-bottom: 50rpx;
  }
  .brand{
    font-size: small;
    margin-bottom: 18rpx;
  }

  .itemImage {
    width:17%;
  }
  .titleImage{
    width:100%;
  }
  .itemDetail{
    margin-left:18rpx;
    font-size: small;
  }
  .paddingButton10{
    padding-bottom: 10rpx;
  }
  .grayFont{
    color:gray;
  }
  .payPrice{
    float: right;
    font-size: small;
  }
</style>

