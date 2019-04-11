<template>
  <div>
    <div class="noItem" v-bind:style="{display: displayData}">
      尚未选购任意商品,请返回首页选购商品
    </div>
    <div class="order"></div>

    <scroll-view v-for="(item, i) in cart_list" :key="i">
      <view class="titleBlock"  >
        {{item.brandNameCh}}
      </view>
      <div v-for="(cartListItem, j) in item.cartList" :key="j">

        <checkbox-group v-on:change="itemBlockChangeColor(cartListItem, cartListItem.cartId)">
          <checkbox class="sliderLeft" style="margin-top:40rpx;"  >
            <slider-left v-on:delete.stop="handleDelete" :id="cartListItem.cartId">
              <view class="itemBlock" :id="cartListItem.cartId">
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
                      <wxc-counter :id="cartListItem.cartId" v-on:changenumber="onChangeNumber" class="counter" :number="cartListItem.quantity" max="100" min="1" color="#000"></wxc-counter>
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
          </checkbox>
        </checkbox-group>


      </div>




    </scroll-view>

    <view class="priceBlock">
      <view class="row paddingButtom20">
        <view class="priceTitle">价格合计：</view>
        <view class="priceTotalDetail">{{priceData.final.finalRMB}}</view>
        <view class="priceUnit">元</view>
      </view>
      <view class="row paddingButtom20">
        <view class="priceTitle">消费税合计：</view>
        <view class="texTotalDetail">{{priceData.exciseTax.exciseTax}}</view>
        <view class="priceUnit">元</view>
      </view>
      <view class="row paddingButtom20">
        <view class="priceTitle">国际快递运费：</view>
        <view class="delDetail">{{priceData.internationalShippingFee.internationalShippingFee}}</view>
        <view class="priceUnit">元</view>
        <view class="weightTitle">（预估</view>
        <view class="weightDetail">{{priceData.internationalShippingFee.estimatedWeight}}</view>
        <view class="weightUnit">磅）</view>
      </view>

      <view class="row paddingButtom20">
        <view class="priceTitle">平台手续费：</view>
        <view class="middlePriceDetail">{{priceData.sitePromotionFee.sitePromotionFee}}</view>
        <view class="priceUnit">元</view>
      </view>
    </view>

    <view class="checkoutButton">
      <wxc-button  size="normal" :type="btnType"  value="去结算" v-on:submit="checkout"></wxc-button>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly'
  var settingKey = ''
  var sessionId = null
  export default {
    data () {
      return {
        cartIdList: [],
        cart_list: [],
        btnType: 'disabled',
        settingKey: '',
        testData: true,
        displayData: 'none',
        priceData: {sitePromotionFee: {sitePromotionFee: 0}, final: {finalRMB: 0}, exciseTax: {exciseTax: 0}, internationalShippingFee: {estimatedWeight: 0,internationalShippingFee: 0}}
      }
    },
    components: {
    },
    computed: {
    },

    onLoad (options) {
      if (options !== undefined){
        this.getSettingKey()
      }
    },
    onShow (options) {
      //this.getOrderList()
    },
    methods: {

      isActive (cartId) {
        if (this.cartIdList.includes(cartId)) {
          return true
        } else {
          return false
        }
      },
      checkout () {
        if (this.cartIdList.length > 0){
          wx.navigateTo({
            url: '../checkout/main?cartIdList=' + this.cartIdList
          })
        }
      },
      handleDelete (e) {
        wx.showLoading({
          title: 'Loading'
        })
        const self = this
        fly.config.headers['Cookie'] = 'JSESSIONID=' + sessionId
        // e.mp.currentTarget.id在cartIdList里面的话，要先从list里面删掉
        var cartID = parseInt(e.mp.currentTarget.id)
        var position = this.cartIdList.indexOf(cartID)
        if(position !== -1) {
          this.cartIdList.splice(position, 1)
        }
        // 先调用delete
        fly.post('phantombuy/cart/delete', {entityDTO: {cartIdList: [e.mp.currentTarget.id]}}).then((res) => {
          if (res.data.code === `888`) {
            // 跳转授权页
            console.log(`请先登录:`, res)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
          else if (res.data.code === `1`) {
            // 成功
            // 调用calculateFee，分修改了的物品勾选和未勾选状态
            this.calculateFee(this.cartIdList)
            // list
            this.getOrderList()
          }
          else {
            // 失败
            console.log(`update商品数字:`, res)
          }
        }).catch(err => {
          console.log(`update商品数字:`, err)
        })
      },
      onChangeNumber (e) {
        wx.showLoading({
          title: 'Loading'
        })
        const self = this
        fly.config.headers['Cookie'] = 'JSESSIONID=' + sessionId
        console.log(e.mp.detail.number)
        console.log(e.mp.currentTarget.id)
        // 先调用update
        fly.post('phantombuy/cart/update', {entityDTO: {cartId: e.mp.currentTarget.id, quantity: e.mp.detail.number}}).then((res) => {
          if (res.data.code === `888`) {
            // 跳转授权页
            wx.hideLoading()
            console.log(`请先登录:`, res)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
          else if (res.data.code === `1`) {
            // 成功
            // 调用calculateFee，分修改了的物品勾选和未勾选状态
            this.calculateFee(this.cartIdList)
            // list
            this.getOrderList()
            wx.hideLoading()
          }
          else {
            // 失败
            console.log(`update商品数字:`, res)
            wx.hideLoading()
          }
        }).catch(err => {
          console.log(`update商品数字:`, err)
          wx.hideLoading()
        })

      },
      /*
      * 这段getSettingKey需要复用
      * */
      getSettingKey () {
        wx.showLoading({
          title: 'Loading'
        })
        const self = this
        wx.getStorage({
          key: 'settingKey',
          success: function (data) {
            console.log(data)
            settingKey = data.data
            if (settingKey === '1') {
              // 已经授权调用所需接口
              /*
              * 修改此处，调用所需使用的接口函数
              * */
              self.getOrderList()
              wx.hideLoading()
            } else if (settingKey === '0') {
              // 未授权，跳转授权页面
              wx.hideLoading()
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
      getOrderList () {
        const self = this
        // 读取storage如果有sessionID就在header里带上

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
      itemBlockChangeColor: function (res, index) {
        wx.showLoading({
          title: 'Loading'
        })
        //先判断，list里面本来就有的话，就删掉，本来没有就加进去
        var position = this.cartIdList.indexOf(index)
        if(position === -1) {
          this.cartIdList.push(index)
        }else{
          this.cartIdList.splice(position, 1)
        }
        // 为了checkout的btn添加一段
        // 如果cartIdList有东西就btnType = secondary
        if (this.cartIdList.length > 0) {
          this.btnType = 'secondary'
        }else{
          this.btnType = 'disabled'
        }

        var testRes = this.cartIdList.includes(index)
        console.log( testRes);
        console.log(`我就看看点击之后拿了啥:`,res);
        // 调用calculateFee
        this.calculateFee(this.cartIdList)

      },
      calculateFee: function (list) {
        /*
        * {entityDTO: {cartIdList: [83, 88]}}
        * 需要先获取所有勾选的cartId，做成List传回去
        * */
        const self = this
        fly.config.headers["Cookie"] = "JSESSIONID="+sessionId;
        /*
        * 此处修改需要调用的接口
        * */
        // var requestList = list_name + ':' + list
        fly.post("phantombuy/cart/calculateFee",{entityDTO: {cartIdList: list}}).then((res) => {
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
            self.priceData = res.data.data
            wx.hideLoading()
          }
          else {
            // 失败
            console.log(`calculateFee数据:`,res);
          }
        }).catch(err => {
          console.log(`calculateFee请求出错:`,err);
        })
      },
      catchtapControl: function () {}
    }
  }
</script>

<style scoped>
  .sliderLeft{
    margin-left:6rpx;
  }
  .noItem{
    background-color: white;
    height:100%;
    width:100%;
    position:fixed;
    z-index:1000;
    font-color:black;
    padding-top:200rpx;
    text-align: center;
  }
  .order{
    background-color: lightgray;
    height:100%;
    width:100%;
    position:fixed;
    z-index:-1;
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
    background-color: white;
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
    margin-top: 180rpx;
    margin-left: 446rpx;
  }

  .orderItemSelected {
    background-color: lightgray;
  }
  .orderItemUnselected {

  }



</style>

