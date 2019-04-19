<template>
  <div class="order">
    <div class="noItem" :style="{display: displayData}" @touchmove.stop="move">
      尚未选购任意商品,请返回首页选购商品
    </div>
    <!--<div class="order"></div>-->

    <scroll-view v-for="(item, i) in cart_list" :key="i">
      <view>
        <wxc-panel>
          <view class="site">
            <view class="site_choose cart_block">
              <span style="padding-left: 35px;" class="radio-group">{{item.brandNameCh}}</span>
              <!--<radio-group class="radio-group " @change="radioChange">-->
              <!--<radio :checked="false"><span style="padding-left: 15px;">{{item.brandNameCh}}</span></radio>-->
              <!--&lt;!&ndash;<radio value="{{item.name}}" checked="{{item.checked}}"/>&ndash;&gt;-->
              <!--&lt;!&ndash;{{item.value}}&ndash;&gt;-->
              <!--</radio-group>-->
            </view>
          </view>

          <view>
            <view v-for="(cartListItem, j) in item.cartList" :key="j" class="cart_block cart-item">
              <checkbox-group @change="itemBlockChangeColor(cartListItem, cartListItem.cartId)" >
                <checkbox class="sliderLeft">
                  <slider-left @delete="handleDelete" :id="cartListItem.cartId">
                    <view class="itemBlock" :id="cartListItem.cartId">
                      <view class="row">
                        <view class="itemImage">
                          <image :src="cartListItem.productImageUrl" class="titleImage" mode="widthFix"/>
                        </view>
                        <view class="itemDetail">
                          <view class="itemTitle" style="text-overflow:ellipsis;overflow:hidden">{{cartListItem.productName}}</view>
                          <view class="itemRow row product_font">
                            <view class="itemColor">颜色：</view>
                            <view class="itemColorDetail"
                                  style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden">
                              {{cartListItem.color}}
                            </view>
                          </view>
                          <view class="itemRow row product_font">
                            <view class="itemSize">尺码：</view>
                            <view class="itemSizeDetail">{{cartListItem.size}}</view>
                          </view>
                          <view class="priceRow row product_font">
                            <!--<wxc-price><span style="font-size: 13px;">{{cartListItem.productRmbPrice}} </span>
                            </wxc-price>-->
                            <view class="counterBlock" @tap.stop="catchtapControl">
                              <wxc-counter :id="cartListItem.cartId" v-on:changenumber="onChangeNumber"
                                           class="counter"
                                           :number="cartListItem.quantity" max="100" min="1"
                                           color="#000"></wxc-counter>
                            </view>
                          </view>
                        </view>
                      </view>
                      <view class="total">
                        <view class="row">
                          <view class="totalTitle" style="font-weight: bolder">合计：</view>
                          <view class="totalDetail" style="font-size: 15px;padding-top:3rpx;">￥ {{cartListItem.productRmbPriceTotal}}</view>
                          <!--<wxc-price><span style="font-size: 13px;">{{cartListItem.productRmbPriceTotal}} </span>
                          </wxc-price>-->
                        </view>
                      </view>
                    </view>
                  </slider-left>
                </checkbox>
              </checkbox-group>
            </view>
          </view>

        </wxc-panel>
      </view>

    </scroll-view>

    <view class="priceBlock">
      <wxc-panel>
        <view class="price_panel">
          <view class="price_row">
            <view class="priceTitle">价格合计：</view>
            <view class="priceTotalDetail">{{priceData.final.finalRMB}}</view>
            <view class="priceUnit">元</view>
          </view>
          <view class="price_row">
            <view class="priceTitle">消费税合计：</view>
            <view class="texTotalDetail">{{priceData.exciseTax.exciseTax}}</view>
            <view class="priceUnit">元</view>
          </view>
          <view class="price_row">
            <view class="priceTitle">国际快递运费：</view>
            <view class="delDetail">{{priceData.internationalShippingFee.internationalShippingFee}}</view>
            <view class="priceUnit">元</view>
            <view class="weightTitle">（预估</view>
            <view class="weightDetail">{{priceData.internationalShippingFee.estimatedWeight}}</view>
            <view class="weightUnit">磅）</view>
          </view>
          <view class="price_row">
            <view class="priceTitle">平台手续费：</view>
            <view class="middlePriceDetail">{{priceData.sitePromotionFee.sitePromotionFee}}</view>
            <view class="priceUnit">元</view>
          </view>
        </view>
      </wxc-panel>
    </view>


    <view class="cart-footer">
      <view class="button add_buy_cart">
        <wxc-button size="normal" :type="btnType" value="去结算" v-on:submit="checkout"></wxc-button>
      </view>
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
        deleteflag: 0,
        cart_list: [],
        btnType: 'disabled',
        settingKey: '',
        testData: true,
        displayData: 'block',
        priceData: {
          sitePromotionFee: {sitePromotionFee: 0},
          final: {finalRMB: 0},
          exciseTax: {exciseTax: 0},
          internationalShippingFee: {estimatedWeight: 0, internationalShippingFee: 0}
        }
      }
    },
    components: {},
    computed: {},
    onLoad (options) {
      /*
       if (options !== undefined){
       this.getSettingKey()
       }
       */
    },
    onShow (options) {
      this.getSettingKey
      ();
    },
    methods: {
      move () {
      },
      isActive (cartId) {
        if (this.cartIdList.includes(cartId)) {
          return true
        } else {
          return false
        }
      },
      checkout () {
        if (this.cartIdList.length > 0) {
          wx.navigateTo({
            url: '../checkout/main?cartIdList=' + JSON.stringify(this.cartIdList)
          })
        }
      },
      handleDelete (e) {
        wx.showLoading({
          title: 'Loading'
        })
        const self = this
        self.deleteflag = 1
        fly.config.headers['Cookie'] = 'JSESSIONID=' + sessionId
        // e.mp.currentTarget.id在cartIdList里面的话，要先从list里面删掉
        var cartID = parseInt(e.mp.currentTarget.id)
        var position = this.cartIdList.indexOf(cartID)
        if (position !== -1) {
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
        fly.post('phantombuy/cart/update', {
          entityDTO: {
            cartId: e.mp.currentTarget.id,
            quantity: e.mp.detail.number
          }
        }).then((res) => {
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
            fly.config.headers["Cookie"] = "JSESSIONID=" + sessionId;
            /*
             * 此处修改需要调用的接口
             * */
            fly.post("phantombuy/cart/list", {entityDTO: {}}).then((res) => {
              console.log(`后台拿回购物车数据:`, res);
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
                  self.displayData = 'none'
                  // self.cart_list = self.cart_list[0];
                }
              }
              else {
                // 失败
                self.displayData = 'block'
                console.log(`cartList为空:`, res);
              }
            }).catch(err => {
              console.log(`api请求出错:`, err);
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
        const self = this
        if (self.deleteflag === 0){
          wx.showLoading({
            title: 'Loading'
          })
          //先判断，list里面本来就有的话，就删掉，本来没有就加进去
          var position = this.cartIdList.indexOf(index)
          if (position === -1) {
            this.cartIdList.push(index)
          } else {
            this.cartIdList.splice(position, 1)
          }
          // 为了checkout的btn添加一段
          // 如果cartIdList有东西就btnType = secondary
          if (this.cartIdList.length > 0) {
            this.btnType = 'secondary'
          } else {
            this.btnType = 'disabled'
          }
          var testRes = this.cartIdList.includes(index)
          console.log(testRes);
          console.log(`我就看看点击之后拿了啥:`, res);
          // 调用calculateFee
          this.calculateFee(this.cartIdList)
        }
        self.deleteflag = 0
      },
      calculateFee: function (list) {
        /*
         * {entityDTO: {cartIdList: [83, 88]}}
         * 需要先获取所有勾选的cartId，做成List传回去
         * */
        const self = this
        fly.config.headers["Cookie"] = "JSESSIONID=" + sessionId;
        /*
         * 此处修改需要调用的接口
         * */
        // var requestList = list_name + ':' + list
        fly.post("phantombuy/cart/calculateFee", {entityDTO: {cartIdList: list}}).then((res) => {
          console.log(`后台拿回购物车数据:`, res);
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
            console.log(`calculateFee数据:`, res);
          }
        }).catch(err => {
          console.log(`calculateFee请求出错:`, err);
        })
      },
      catchtapControl: function () {
      },
      radioChange(){
      }
    }
  }
</script>

<style scoped>

  .order {
    /*background-color: #F7F7F7;*/
    /*height: 100%;*/
    /*width: 100%;*/
    background-color: #F7F7F7;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: -1;
  }

  .sliderLeft {
    margin-left: 0.06rem;
  }

  .noItem {
    background-color: white;
    height:100%;
    width:100%;
    z-index:1000;
    font-color:black;
    padding-top: 200rpx;
    text-align: center;
    position:absolute;
  }

  .cart-item {
    with: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .cart_block {
    display: flex;
    justify-content: flex-start;
    padding: 0.3rem 0rem 0.1rem 0.2rem;
  }


  .row {
    display: flex;
    flex-direction: row;
  }

  .price_row {
    display: flex;
    flex-direction: row;
    padding-bottom: 0.20rem;
  }

  .site_choose {
    display: flex;
    justify-content: flex-start;
  }

  .radio-group {
    height: 0.4rem;
  }

  .itemImage {
    padding-left: 0.10rem;
    padding-top: 0.2rem;
  }

  .titleImage {
    width: 1.75rem;
    height: 3.4rem;
  }

  .itemBlock {
    width: 100%;
    padding-top: 0.10rem;
    padding-bottom: 0.10rem;
    background-color: white;
  }

  .itemTitle {
    font: 16px solid black;
    font-weight: bold;
  }

  .itemTitle {
    margin-left: 0.30rem;
    margin-top: 0.15rem;
  }

  .itemRow {
    padding-top: 0.10rem;
    line-height: 16px;
    height: 16px;
    padding-left: 0.3rem;
  }

  .priceRow {
    padding-top: 0.20rem;
    line-height: 20px;
    height: 20px;
    padding-left: 0.3rem;
  }

  .counterBlock {
    margin-top: -3px;
  }

  .counter {
    margin: 0;
    padding: 0;
  }

  .total {
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    margin-bottom: 0.10rem;
    padding-top: 0.30rem;
    padding-right: 0.15rem;
  }

  .priceBlock {
    width: 100%;
    font-size: 16px;
    z-index: 998;
  }

  .paddingButtom20 {
    padding-bottom: 0.20rem;
  }

  .checkoutButton {
    margin-top: 1.80rem;
    margin-left: 4.46rem;
  }

  .orderItemSelected {
    background-color: lightgray;
  }

  .orderItemUnselected {
  }

  .product_font {
    font-size: 14px;
  }

  .price_panel {
    padding-top: 0.2rem;
    padding-left: 0.2rem;
    padding-top: 0.3rem;
  }

  .cart-footer {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    border-top: 0px solid #eee;
    margin-bottom: 20rpx;
    z-index: 999;
  }

  .cart-footer .button {
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    width: 3.0rem;
    height: 1rem;
    color: white;
    font-size: 0.3rem;
    border-radius: 0;
    border: 0;
    vertical-align: middle;
  }
</style>
