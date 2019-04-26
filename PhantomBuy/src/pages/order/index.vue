<template>
  <div class="order">
    <div class="noItem" :style="{display: displayData}" @touchmove.stop="move">
      尚未选购任意商品,请返回首页选购商品
    </div>

    <!--购物车列表-->
    <view class="main_content">
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
                <checkbox-group @change="itemBlockChangeColor(cartListItem, cartListItem.cartId, $event)">
                  <checkbox class="sliderLeft" :value="cartListItem.cartId"
                            :checked="cartListItem.checked">
                    <slider-left @delete="handleDelete" :id="cartListItem.cartId">
                      <view class="itemBlock" :id="cartListItem.cartId">
                        <view class="row">
                          <view class="itemImage">
                            <image :src="cartListItem.productImageUrl" class="titleImage" mode="widthFix"/>
                          </view>
                          <view class="itemDetail">
                            <view class="itemTitle" style="text-overflow:ellipsis;overflow:hidden">
                              {{cartListItem.productName}}
                            </view>
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
                            <view class="totalDetail" style="font-size: 15px;padding-top:1.5px;">￥
                              {{cartListItem.productRmbPriceTotal}}
                            </view>
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
    </view>

    <!--价格合计部分-->
    <view class="cart-footer">
      <wxc-panel>
        <view class="priceBlock">
          <view class="price_panel">
            <view class="price_row">
              <view class="priceTitle">国际快递费：</view>
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

            <view class="price_row">
              <view class="priceTitle">消费税合计：</view>
              <view class="texTotalDetail">{{priceData.exciseTax.exciseTax}}</view>
              <view class="priceUnit">元</view>
            </view>

            <view class="price_row">
              <view class="priceTitle">站点运费合计：</view>
              <view class="texTotalDetail">{{priceData.siteShippingFee.siteShippingFee}}</view>
              <view class="priceUnit">元</view>
            </view>

            <view class="price_row">
              <view class="priceTitle">价格合计：</view>
              <view class="priceTotalDetail">{{priceData.final.finalRMB}}</view>
              <view class="priceUnit">元</view>
            </view>

          </view>

          <view class="button add_buy_cart">
            <wxc-button size="normal" :type="btnType" value="去结算" v-on:submit="checkout"></wxc-button>
          </view>

        </view>
      </wxc-panel>

    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly';
  import {mapState, mapMutations} from 'vuex'
  //  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types"
  export default {
    data () {
      return {
        cartIdList: [],
        cart_list: [],
        btnType: 'disabled',
        displayData: 'block',
        priceData: {
          sitePromotionFee: {sitePromotionFee: 0},
          final: {finalRMB: 0},
          exciseTax: {exciseTax: 0},
          internationalShippingFee: {estimatedWeight: 0, internationalShippingFee: 0},
          siteShippingFee: {siteShippingFee: 0}
        }
      }
    },
    components: {},
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    onLoad (options) {

    },
    onShow() {
      this.getOrderList();
    },
    methods: {
      is_authorized(){
        if (this.settingKey === '1') { // 已授权
          return true;
        } else if (this.settingKey === '0') {      // 未授权 , 不停地跳转至 登录页
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }

        return false;
      },
      getOrderList () {
        if (this.is_authorized()) {
          wx.showLoading({
            title: 'Loading'
          })
          fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
          fly.post("phantombuy/cart/list", {entityDTO: {}}).then((res) => {
            if (res.data.code === `1`) {                // 成功
              this.cart_list = [];
              if (res.data.data.length > 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                  this.addCartItem(res.data.data[i]);
                }
                this.displayData = 'none'
              }
              wx.hideLoading()
            } else {
              // 无结果
              this.cart_list = []
              this.displayData = 'block'
              wx.hideLoading()
            }
          }).catch(err => {
            console.log(`api请求出错:`, err);
          })
        }
      },
      itemBlockChangeColor: function (cartItem, index, e) {
        const self = this
        wx.showLoading({
          title: 'Loading'
        })

        // 当前 cartItem checkbox checked 属性设置
        if (e.mp.detail.value.length !== 0) {
          cartItem.checked = true;
        } else { // checkbox not checked
          cartItem.checked = false;
        }

        var position = this.cartIdList.indexOf(index)   //  cartIdList是否包含该商品
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

        this.calculateFee(this.cartIdList)     // 调用calculateFee
      },
      handleDelete (e) {
        wx.showLoading({
          title: 'Loading'
        })
        const self = this
        fly.config.headers['Cookie'] = 'JSESSIONID=' + this.sessionId
        // e.mp.currentTarget.id在cartIdList里面的话，要先从list里面删掉
        var cartID = parseInt(e.mp.currentTarget.id)
        var position = this.cartIdList.indexOf(cartID)
        if (position !== -1) {
          this.cartIdList.splice(position, 1)
        }
        // 先调用delete
        fly.post('phantombuy/cart/delete', {entityDTO: {cartIdList: [e.mp.currentTarget.id]}}).then((res) => {
          if (res.data.code === `1`) {
            // 调用calculateFee，分修改了的物品勾选和未勾选状态
            this.calculateFee(this.cartIdList)
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
        fly.config.headers['Cookie'] = 'JSESSIONID=' + this.sessionId
        console.log(e.mp.detail.number)
        // 先调用update
        fly.post('phantombuy/cart/update', {
          entityDTO: {
            cartId: e.mp.currentTarget.id,
            quantity: e.mp.detail.number
          }
        }).then((res) => {
          if (res.data.code === `1`) {
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
      calculateFee: function (list) {
        /*
         * {entityDTO: {cartIdList: [83, 88]}}
         * 需要先获取所有勾选的cartId，做成List传回去
         * */
        const self = this
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        /*
         * 此处修改需要调用的接口
         * */
        fly.post("phantombuy/cart/calculateFee", {entityDTO: {cartIdList: list}}).then((res) => {
          if (res.data.code === `1`) {
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
      addCartItem(cartItem){   // 数据转换, 给购物车中每件商品 添加 checked 属性
        let cartItemList = [];
        for (let i = 0; i < cartItem.cartList.length; i++) {
          cartItemList.push({
            cartId: cartItem.cartList[i].cartId,
            color: cartItem.cartList[i].color,
            isValid: cartItem.cartList[i].isValid,
            productId: cartItem.cartList[i].productId,
            productImageUrl: cartItem.cartList[i].productImageUrl,
            productName: cartItem.cartList[i].productName,
            productPrice: cartItem.cartList[i].productPrice,
            productRmbPrice: cartItem.cartList[i].productRmbPrice,
            productRmbPriceTotal: cartItem.cartList[i].productRmbPriceTotal,
            quantity: cartItem.cartList[i].quantity,
            siteId: cartItem.cartList[i].siteId,
            size: cartItem.cartList[i].size,
            skuId: cartItem.cartList[i].skuId,
            checked: this.cartIdList.includes(cartItem.cartList[i].cartId) == true ? true : false   // 当前是否选中该商品
          });
        }

        let item = {
          siteId: cartItem.siteId,
          brandNameCh: cartItem.brandNameCh,
          brandNameEn: cartItem.brandNameEn,
          siteFreight: cartItem.siteFreight,
          cartList: cartItemList
        };
        this.cart_list.push(item);
      },
      checkout () {
        if (this.cartIdList.length > 0) {
          wx.navigateTo({
            url: '../checkout/main?cartIdList=' + JSON.stringify(this.cartIdList)
          })
        }
      },

    }
  }
</script>

<style>
  .order {
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
    height: 100%;
    width: 100%;
    z-index: 1000;
    font-color: black;
    padding-top: 2rem;
    text-align: center;
    position: absolute;
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

  .product_font {
    font-size: 14px;
  }

  .price_panel {
    padding-top: 0.2rem;
    padding-left: 0.1rem;
    width: 70%;
  }

  .main_content {
    width: 100%;
    /*padding-bottom: 3.6rem;*/
    margin-bottom: 3.6rem;
  }

  .cart-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 0 solid #eee;
    z-index: 1;
  }

  .cart-footer .button {
    line-height: 0.8rem;
    height: 1rem;
    font-size: 0.3rem;
    width: 30%;
    bottom: 0;
    position: absolute;
    right: 0;
  }

  .cart-footer .priceBlock {
    font-size: 16px;
    z-index: 1;
    display: flex;
    width: 100%;
  }
</style>
