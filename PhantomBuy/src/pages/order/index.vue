<template>
  <div class="order">
    <scroll-view v-for="(item, i) in cart_list" :key="i">
      <view class="titleBlock"  >
        {{item.brandNameCh}}
      </view>

      <view class="sliderLeft" style="margin-top:40rpx;" v-for="(cartListItem, j) in item.cartList" :key="j">
      <slider-left>
      <view class="itemBlock" @click="itemBlockChangeColor" :style="{'background-color':pageBackgroundColor
      }" id="“1">
          <view class="row">
            <view class="itemImage">
              <image :src="cartListItem.productImageUrl" class="titleImage" mode="widthFix"/>
            </view>
            <view class="itemDetail">
              <view class="itemTitle">{{cartListItem.productName}}</view>
              <view class="row">
                <view class="itemRow">
                  <view class="itemColor smallFont">颜色：</view>
                  <view class="itemColorDetail smallFont">{{cartListItem.color}}</view>
                </view>
                <view class="itemRow">
                  <view class="itemSize smallFont">尺码：</view>
                  <view class="itemSizeDetail smallFont">{{cartListItem.size}}</view>
                </view>
                <view class="itemRow">
                <view class="itemPrice smallFont">价格：</view>
                <view class="itemPriceDetail smallFont">{{cartListItem.productRmbPrice}} 元</view>
              </view>
              </view>
              <view class="counterBlock" @tap.stop="catchtapControl">
                <wxc-counter  v-on:changenumber="onChangeNumber" class="counter" :number="cartListItem.quantity" max="100" min="1" color="#000"></wxc-counter>
              </view>
            </view>
            <!--
            <view class="stepper">
              <text class="{{minusStatus}}" bindtap="bindMinus">-</text>
              <input type="number" bindchange="bindManual" value="{{num}}" />
              <text class="normal" bindtap="bindPlus">+</text>
            </view>
            -->

          </view>
        <view class="total">
          <view class="row">
            <view class="totalTitle">合计：</view>
            <view class="totalDetail">{{cartListItem.productRmbPriceTotal}} 元</view>
          </view>
        </view>
      </view>
      </slider-left>
      </view>





    </scroll-view>

    <view class="priceBlock">
      <view class="row paddingButtom20">
        <view class="priceTitle">价格合计：</view>
        <view class="priceTotalDetail">1200</view>
        <view class="priceUnit">元</view>
      </view>
      <view class="row paddingButtom20">
        <view class="priceTitle">消费税合计：</view>
        <view class="texTotalDetail">120</view>
        <view class="priceUnit">元</view>
      </view>
      <view class="row paddingButtom20">
        <view class="priceTitle">国际快递运费：</view>
        <view class="delDetail">123</view>
        <view class="priceUnit">元</view>
        <view class="weightTitle">（预估</view>
        <view class="weightDetail">14</view>
        <view class="weightUnit">磅）</view>
      </view>

      <view class="row paddingButtom20">
        <view class="priceTitle">平台手续费：</view>
        <view class="middlePriceDetail">0</view>
        <view class="priceUnit">元</view>
      </view>
    </view>

    <view class="checkoutButton">
      <wxc-button  size="normal" type="secondary"  value="去结算"></wxc-button>
    </view>
    </div>
</template>

<script type="text/ecmascript-6">
    import fly from '../../utils/fly'
    import {pageDTO} from "../../common/model/pageDTO"
    var settingKey = ''
    export default {
      data () {
        return {
          pageBackgroundColor: 'white',
          cart_list: [],
          settingKey: ''
        }
      },
      components: {
      },
      onLoad (options) {
        if (options !== undefined){
          this.getSettingKey()
        }
      },
      methods: {
        onChangeNumber (e) {
          console.log(e.mp.detail.number)
          // 先调用update
          // 调用calculateFee，分修改了的物品勾选和未勾选状态
          // list
        },
        /*
        * 这段getSettingKey需要复用
        * */
        getSettingKey () {
          const self = this
          wx.getStorage({
            key: 'settingKey',
            success: function (data) {
              console.log(data)
              settingKey = data.data
              if (settingKey === '1'){
                // 已经授权调用所需接口
                /*
                * 修改此处，调用所需使用的接口函数
                * */
                self.getOrderList()
              } else if (settingKey === '0' ) {
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
        /*
        * 这段getCartList需要复用
        * */
        getOrderList () {
          const self = this
          // 读取storage如果有sessionID就在header里带上
          var sessionId = null
          wx.getStorage({
            key: 'cookieKey',
            success: function (data) {
              console.log(data);
              const cookieSession = String(data.data);
              sessionId = cookieSession.split('=')[1].split(';')[0];
              fly.config.headers["Cookie"] = "JSESSIONID="+sessionId;
              /*
              * 此处修改需要调用的接口
              * */
              fly.post("phantombuy/cart/list",{entityDTO: {}}).then((res) => {
                console.log(`后台拿回购物车数据:`,res);
                if (res.data.code === `888`) {
                  // 跳转授权页
                  console.log(`请先登录:`, res);
                  wx.navigateTo({
                    url: '/pages/login/main'
                  })
                }
                else if (res.data.code === `1`) {
                  // 成功
                  if (res.data.data.length > 0) {
                    self.cart_list = res.data.data
                  }
                }
                else {
                  // 失败
                  console.log(`购物车数据:`,res);
                }
              }).catch(err => {
                console.log(`api请求出错:`,err);
              })
            },
            fail: function (err) {
              console.log(err)
              wx.navigateTo({
                url: '/pages/login/main'
              })
            }
          })
        },
        itemBlockChangeColor: function () {
          let bgColor = this.pageBackgroundColor
          if (bgColor === 'lightgray') {
            // 取消选择
            bgColor = 'white'
            // 此处调用calculateFee
          } else {
            // 选择
            bgColor = 'lightgray'
            // 此处调用calculateFee
          }
          this.pageBackgroundColor = bgColor
        },
        calculateFee: function () {
          /*
          * {entityDTO: {cartIdList: [83, 88]}}
          * 需要先获取所有勾选的cartId，做成List传回去
          * */
        },
        catchtapControl: function () {}
      }
    }
</script>

<style scoped>
  .order{
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
    padding-right:20rpx;
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
    margin-top: 20rpx;
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
    padding-right:20rpx;
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

