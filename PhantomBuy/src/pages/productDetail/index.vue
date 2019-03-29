<template>
  <div class="animated fadeIn">
    <view class="product_detail">
      <wxc-panel :border="has_border">
        <view class="product_img">
          <img :src="product_detail.productImageUrl">
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="product_basic_info">
          <h6 class="site_name info_padding">{{product_detail.brandNameCh}}</h6>
          <view class="product_name info_padding">
            <text class="product_name_cn">{{product_detail.productNameCn}}</text>
          </view>
          <view class="product_price info_padding">
            <text class="original_price_rmb">{{product_detail.originalPriceRmb}}元</text>
            <text class="sale_price_rmb" style="color:red; font-size: 14px;">{{product_detail.salePriceRmb}}元</text>
          </view>
          <view class="product_color info_padding" v-if="productColorSizeResponse.colorSeqLength > 0">
            <view class="product_color_text">
              <text>选择颜色</text>
              <text style="font-weight: bold; padding-left: 0.2rem;"><span
                v-if="product_detail.defaultColorName !== ''">(</span>{{product_detail.defaultColorName}}<span
                v-if="product_detail.defaultColorName !== ''">)</span></text>
            </view>
            <view>
              <ul class="col">
                <li v-for="(item, index) in productColorResponseList" :key="index">
                  <img :src="item.imageUrl"
                       @click="chooseProductColor(item, index)"
                       :class="{productColorActivity: productColorIndex == index}"/>
                </li>
              </ul>
            </view>
          </view>
          <!--商品规格属性选择 规格属性样式解决了-->
          <view class="product_size info_padding"
                v-if="defaultProductSizeList.length !=0">
            <view>
              <p style=" font-size: 14px; " class="info_padding">选择尺码</p>
            </view>
            <view>
              <ul class="col">
                <li v-for="(item, index) in defaultProductSizeList" :key="index">
                  <a data-prime="2" @click="chooseProductSize(item, index)"
                     :class="{ productSizeActivity: productSizeIndex == index }">{{item.sizeName}}</a>
                </li>
              </ul>
            </view>
          </view>


          <view class="product_counter info_padding">
            <view>
              <p style=" font-size: 14px; " class="info_padding">数量</p>
            </view>
            <view>
              <wxc-counter class="counter" number="0" max="100" :min="1" color="#000"
                           v-on:changenumber="onChangeNumber"></wxc-counter>
            </view>
          </view>
        </view>
      </wxc-panel>

      <!--商品描述， 详情 tab 页切换-->
      <wxc-panel :border="has_border">
        <view class="product_tabs">
          <tab v-bind:product="product_detail"></tab>
        </view>
      </wxc-panel>
    </view>

    <view class="carts-footer">
      <view class="button add_buy_cart" @click="addBuyCart">加入购物车</view>
      <!--<view class="button buy_once">立即结算</view>-->
    </view>


    <wxc-toast
      :is-show="show_toast"
      :text="msg"
      :icon="icon_type"
      icon-color="#ff5777"
    ></wxc-toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly';
  import tabs from "../../components/tabs/tabs";
  import {appMessages} from "../../common/constants/message";
  import {authorize} from "../../utils/authorized";

  export default {
    // 商品详情页面目前缺少: 1. size inactive 区分  2. 选择image后，  重新加载 size列表  3. 想要弄清楚  加载默认的 img 是什么   4. 页面调整好看些
    data() {
      return {
        product_detail: {},
        sizes: [],
        plain: true,
        btn_style: 'min-width: 66rpx;padding: 5rpx;border-radius: 6rpx',
        type: "secondary",
        has_border: true,
        productColorResponseList: [],
        productSizeList: [],
        productImageList: [],
        productColorSizeResponse: {},
        quantity: 0,
        skuId: 0,
        show_toast: false,
        error_msg: '',
        success_mag: '',
        msg: '',
        icon_type: '',
        productSizeIndex: '', // 商品尺码索引,
        productColorIndex: 0, // 商品颜色索引
        defaultProductSizeList: []

      };
    },
    components: {
      'tab': tabs
    },
    onLoad(options) {
      this.show_loading();
      this.getProductDetail(options);
    },
    methods: {

      a(){
      },
      getProductDetail(option){
        let entityDTO = {entityDTO: option};
        fly.post("phantombuy/product/get", entityDTO).then((res)=> {
          if (res.data.code === '1') {
            //console.log(res.data.data);
            if (res.data.data !== undefined) this.product_detail = res.data.data;
            if (this.product_detail.productColorSizeResponse !== undefined) {
              this.productColorSizeResponse = this.product_detail.productColorSizeResponse;
              // 商品 颜色
              this.productColorResponseList = this.product_detail.productColorSizeResponse.productColorResponseList;
              // 商品 size
              this.productSizeList = this.product_detail.productColorSizeResponse.productSizeList;
              // 默认显示商品image 对应的 skuId列表
              if (this.productColorResponseList.length >= 0) {
                this.defaultProductSizeList = this.product_detail.productColorSizeResponse.productColorResponseList[0].skuSizeList;

              }

            }
          } else {

          }

          this.hide_loading();
        });

      },
      // 选择商品颜色
      chooseProductColor(productColor, index){
        this.productColorIndex = index;
        //this.defaultProductSizeList =
        console.log("选择商品颜色");
      },
      //选择商品尺码
      chooseProductSize(item, index){
        this.productSizeIndex = index;
        this.skuId = item.skuId;
        console.log("选择商品尺码");
      },

      onChangeNumber(e){
        // 获取选择商品数量
        //console.log(e.mp.detail.number);
        console.log("选择商品数量");
        this.quantity = e.mp.detail.number;
      },
      addBuyCart(){
        // 已授权
        if (this.skuId == 0 || this.quantity == 0) {
          this.showErrMsg();
        } else {
          // 看当前用户是否已授权
          this.getSettingKey();
        }
      },
      showErrMsg(){
        if (this.skuId == 0) {
          this.msg = appMessages.CHOOSE_SIZE_ERROR;
          this.icon_type = "warning";
          this.showToast();
          return;
        } else if (this.quantity == 0) {
          this.msg = appMessages.CHOOSE_QUANTITY_ERROR;
          this.icon_type = "warning";
          this.showToast();
          return;
        }
      },
      showToast(){
        this.show_toast = true;
        setTimeout(()=> {
          if (this.show_toast)   this.show_toast = !this.show_toast;
        }, 2000);
      },
      show_loading() {
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading() {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500);

      },
      getSettingKey () {
        let self = this;
        let settingKey
        wx.getStorage({
          key: 'settingKey',
          success: function (data) {
            //console.log(data)
            settingKey = data.data;
            if (settingKey === '1') {
              self.getSessionId();
            } else if (settingKey === '0') {
              // 未授权，跳转授权页面
              wx.navigateTo({
                url: '/pages/login/main'
              })
            } else {
              this.getSettingKey()
            }
          },
          // 没有获得到SettingKey的时候重复调用本函数
          fail: function (err) {
            this.getSettingKey()
          }
        })
      },
      // 获取当前用户sessionId
      getSessionId() {
        let self = this;
        wx.getStorage({
          key: 'cookieKey',
          success: function (data) {
            //console.log(data);
            const cookieSession = String(data.data);
            let sessionId = cookieSession.split('=')[1].split(';')[0];
            self.addBuyCartSuccessfully(sessionId);

          },
          fail: function (err) {
            console.log(err)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
        })
      },
      addBuyCartSuccessfully(sessionId){
        fly.config.headers["Cookie"] = "JSESSIONID=" + sessionId;
        //console.log(sessionId);

        let entityDTO = {
          "entityDTO": {
            "quantity": this.quantity,
            "skuId": this.skuId
          }
        };
        fly.post("phantombuy/cart/add", entityDTO).then(res => {
          if (res.data.code === '1') {
            this.showAddCartMsg(appMessages.ADD_CART_SUCCESS);
          } else {
            this.showAddCartMsg(appMessages.ADD_CART_FAILED);
          }
        });
      },
      showAddCartMsg(msg) {
        this.msg = msg;
        this.icon_type = "yes";
        this.showToast();
      }
    },
  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .product_detail {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .product_img {
    width: 100%;
    height: 30%;
    zoom: 1;
    display: row;
    box-sizing: border-box;

  }

  .product_img img {
    width: 60%;
    margin-top: 5%;
    vertical-align: middle;
    margin-left: 20%;
    margin-bottom: 5%;
  }

  .product_basic_info {
    width: 100%;
    left: 5%;
    margin-bottom: 5%;
    position: relative;
  }

  .site_name {
    margin-top: 5%;
    font-size: 16px;
    position: relative;
  }

  .product_price {

  }

  .product_name .product_name_cn {
    font-size: 16px;
    color: black;
  }

  .product_price .original_price_rmb {
    text-decoration: line-through;
    font-size: 16px;
    color: black;
  }

  .product_price .sale_price_rmb {
    padding-left: 0.3rem;
    font-size: 16px;
  }

  .product_size {
    width: 100%;
    height: 1.3rem;
    font-size: 14px;
  }

  .product_color {
    font-size: 14px;
    /*height: 1.3rem;*/
    width: 100%;
  }

  .product_color_text {
    height: 30%;
    font-size: 14px;
  }

  .product_tabs {
    width: 90%;
    position: relative;
    left: 5%;
  }

  .button-wrap {
    margin: 0.05rem 0.15rem 0.05rem 0rem;
    float: left;
    height: 50%;
  }

  .info_padding {
    padding-bottom: 0.2rem;
  }

  .carts-footer {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    border-top: 2px solid #eee;
  }

  /*加入购物车按钮*/
  .carts-footer .button {
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

  .add_buy_cart {
    background-color: #f60;
  }

  .buy_once {
    background-color: #EE5757;
  }

  .col {
    flex-basis: 45%;
    flex-shrink: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  [data-prime] {
    display: inline-block;
    vertical-align: baseline;
    margin: 0 10px 10px 0;
    padding: 5px 10px;
    border: 1px solid #ddd;
    color: #333;
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
  }

  [data-prime]:hover {
    border-color: #09a;
    color: #09a;
  }

  [data-prime].disabled {
    background: #eee;
    color: #999;
    border-color: #ccc;
    cursor: default;
  }

  [data-prime].active {
    background: #09a;
    color: #fff;
    border-color: #09a;
  }

  .counter {
    margin: 0;
    padding: 0;
  }

  .col img {
    width: 1.2rem;
    height: 1.2rem;
  }

  .productSizeActivity {
    border-color: #1890ff;
  }

  .productColorActivity {
    border: 1.5px solid #e3393c;
  }

</style>

