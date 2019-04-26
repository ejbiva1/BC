<template>
  <div class="animated fadeIn">
    <view class="product_detail" v-if="is_show">
      <wxc-panel :border="has_border">
        <!--美妆类商品 图片显示-->
        <view v-if="product_detail.productImageList !== undefined ">
          <swiper :circular="true" :indicator-dots="true" class="swiper" @change="switchImage($event)"
                  indicator-color="rgba(228,228,228,1)" indicator-active-color="#FECA49" :current="currentIndex">
            <view v-for="(item, index) in product_detail.productImageList" :key="index">
              <swiper-item class="product_img">
                <a class="thumb_img_a" :value="item.imageUrl">
                  <img :src="item.imageUrl"></a>
              </swiper-item>
            </view>
          </swiper>
          <view>

          </view>
        </view>

        <!--非美妆类商品 图片显示-->
        <view v-else>
          <swiper :circular="true" :indicator-dots="true" class="swiper" @change="switchImage($event)"
                  indicator-color="rgba(228,228,228,1)" indicator-active-color="#FECA49" :current="currentIndex">
            <view v-for="(item, index) in productColorImageList" :key="index">
              <swiper-item class="product_img">
                <a class="thumb_img_a" :value="item.imageUrl">
                  <img :src="item.imageUrl"></a>
              </swiper-item>
            </view>
          </swiper>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border" v-if="is_show">
        <view class="product_basic_info">
          <view class="product_cn_name info_padding">
            <h6 class="site_name">{{product_basic_info.brandNameCh}}</h6>
            <view class="product_name">
              <h6 class="product_name_cn" v-if="product_basic_info.productNameCn !== undefined">
                {{product_basic_info.productNameCn}}</h6>
              <h6 class="product_name_cn" v-if="product_basic_info.productNameCn === undefined">
                {{product_basic_info.productName}}</h6>
            </view>
            <view class="product_price ">
              <span class="original_price_rmb"
                    :class="{text_decoration: product_basic_info.salePriceRmb !== undefined }">
                {{product_basic_info.originalPriceRmb}}元
              </span>
              <span class="sale_price_rmb" style="color:red; font-size: 14px;"
                    v-if="product_basic_info.salePriceRmb !== undefined">
                {{product_basic_info.salePriceRmb}}元
              </span>
            </view>
          </view>
          <view class="product_color info_padding" v-if="productColorSizeResponse.colorSeqLength !== undefined">
            <view class="product_color_text">
              <text style="font-weight: bold;">选择颜色</text>
              <text style="font-weight: bold; padding-left: 0.2rem;"><span
                v-if="product_detail.defaultColorName !== ''">(</span>{{product_detail.defaultColorName}}<span
                v-if="product_detail.defaultColorName !== ''">)</span></text>
            </view>
            <view>
              <ul class="col">
                <div v-for="(item, index) in productColorResponseList" :key="index" class="product_color_img"
                     :class="{productColorActivity: productColorIndex == index}"
                     :style="{backgroundColor: item.rgb !== undefined ? item.rgb : undefined   }">
                  <img :src="item.imageUrl !== undefined ? item.imageUrl : undefined"
                       @click="chooseProductColor(item, index,$event)"/>
                </div>
              </ul>
            </view>
          </view>
          <!--商品规格属性选择 规格属性样式解决了-->
          <view class="product_size info_padding"
                v-if="defaultProductSizeList.length !=0">
            <view class="product_size_tip">
              <p style=" font-size: 14px; font-weight: bold">选择尺码</p>
            </view>
            <view view="product_sizes">
              <ul class="col">
                <li v-for="(item, index) in defaultProductSizeList" :key="index">
                  <a data-prime="2" @click="chooseProductSize(item, index)"
                     :class="{ productSizeActivity: productSizeIndex == index , a: item.isValid == 0}">{{item.sizeName}}</a>
                </li>
              </ul>
            </view>
          </view>

          <view class="product_counter info_padding">
            <view class="counter">
              <p style=" font-size: 14px; ">数量</p>
            </view>
            <view class="counter">
              <wxc-counter number="1" max="100" :min="1" color="#000"
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
      :is-show="toast.show_toast"
      :text="toast.msg"
      :icon="toast.icon_type"
      icon-color="#ff5777"
    ></wxc-toast>

    <!--跳转至购物车界面-->
    <view v-show="suspension_show">
      <suspension v-on:toCart="gotoCart"></suspension>
    </view>


  </div>
</template>


<script type="text/ecmascript-6">
  import fly from '../../utils/fly';
  import tabs from "../../components/tabs/tabs";
  import {appMessages} from "../../common/constants/message";
  import {authorize} from "../../utils/authorized";
  import suspension from "../../components/suspension/suspension";
  import {common} from "../../utils/common";
  import {mapState, mapMutations} from 'vuex'
  //  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types"

  export default {
    // 商品详情页面目前缺少:
    data() {
      return {
        product_detail: {},
        has_border: true,
        productColorResponseList: [],
        productColorSizeResponse: {},
        quantity: 1,
        skuId: 0,
        productSizeIndex: 1000, // 商品尺码索引,
        productColorIndex: 0, // 商品颜色索引
        defaultProductSizeList: [],
        product_id: '',
        productColorImageList: [],
        currentIndex: 0,
        is_show: false,
        suspension_show: true,
        product_basic_info: {
          brandNameCh: '',
          productNameCn: '',
          originalPriceRmb: '',
          salePriceRmb: '',
          productName: ''
        },
        oldProductSizeIndex: 1000,
        toast: {},
        authorized_index: 0  // 该标签标志 用户进入该商品详情页进行首次授权
      };
    },
    components: {
      'tab': tabs,
      'suspension': suspension
    },
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    onLoad(options) {
      if (options !== undefined) {
        this.show_loading();
        this.product_id = options.productId;
        // 数据初始化
        this.getProductDetail();
      }
    },
    onShow(){
      if (this.authorized_index === 1) {
        this.addBuyCartSuccessfully();
        console.log("this.authorized_index:" + this.authorized_index);
      }
    },
    onUnload(){
      // 初始化数据
      this.productColorResponseList = [];
      this.defaultProductSizeList = [];
      this.productColorImageList = [];
      this.productColorSizeResponse = {};
      this.skuId = 0;
      this.quantity = 1;
      this.currentIndex = 0;
      this.productColorIndex = 0;
      this.productSizeIndex = 1000;
      this.is_show = false;
      this.product_detail = {};
      this.product_basic_info = {
        brandNameCh: '',
        productNameCn: '',
        originalPriceRmb: '',
        salePriceRmb: '',
        productName: '',
      };
      this.authorized_index = 0;
    },
    methods: {
      is_authorized(){
        if (this.settingKey === '1') { // 已授权
          return true;
        } else if (this.settingKey === '0') {      // 未授权 , 不停地跳转至 登录页
          this.authorized_index = 1;  // 标志着授权成功
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }
        return false;
      },
      getProductDetail(){
        let entityDTO = {entityDTO: {productId: this.product_id}};
        // productId : "20463"
        //let entityDTO = {entityDTO: {productId: "20463"}};
        fly.post("phantombuy/product/get", entityDTO).then((res)=> {
          if (res.data.code === '1') {
            this.product_detail = res.data.data;
            // 商品名、 价格 数据
            this.product_basic_info = {
              brandNameCh: this.product_detail.brandNameCh,
              productNameCn: this.product_detail.productNameCn,
              originalPriceRmb: this.product_detail.originalPriceRmb,
              salePriceRmb: this.product_detail.salePriceRmb,
              productName: this.product_detail.productName
            }

            if (this.product_detail.defaultColorName !== undefined) this.product_detail.defaultColorName = this.product_detail.defaultColorName.toUpperCase();
            // 非美妆类产品
            if (this.product_detail.productColorSizeResponse !== undefined) {
              this.productColorSizeResponse = this.product_detail.productColorSizeResponse;
              // 商品 颜色
              this.productColorResponseList = this.product_detail.productColorSizeResponse.productColorResponseList;
              // 默认显示商品image 对应的 skuId列表
              if (this.productColorResponseList.length >= 0) {
                // 衣服 等商品, 包含: size、 color 等数据
                this.defaultProductSizeList = this.product_detail.productColorSizeResponse.productColorResponseList[0].skuSizeList;
                // for rgb(div background color)
                this.productColorImageList = this.product_detail.productColorSizeResponse.productColorResponseList[0].productImageList;
              }

            } else {
              // 美妆 不包含: size、 color 等数据， 只显示商品图片，默认赋值 skuId
              this.skuId = this.product_detail.skuId;
            }
            if (!this.is_show) this.is_show = true;
          } else {
          }
          this.hide_loading();
        });
      },
      // 选择商品颜色  非美妆类产品
      chooseProductColor(productColor, index, e){
        this.productColorIndex = index;
        if (this.productColorResponseList.length > 0) {
          this.defaultProductSizeList = this.productColorResponseList[index].skuSizeList;
          this.productColorImageList = this.productColorResponseList[index].productImageList;
          this.currentIndex = 0;
        }
      },
      // swiper 图片切换
      switchImage(res){
        let oIndex = res.mp.detail.current;
        this.currentIndex = oIndex;
      },
      //选择商品尺码 选中 or 取消选中  非美妆类产品
      chooseProductSize(item, index){
        // 2个 指针 指向
        this.oldProductSizeIndex = this.productSizeIndex;
        this.productSizeIndex = index;
        // 选择相同尺码
        if (this.oldProductSizeIndex == this.productSizeIndex) {
          this.productSizeIndex = 1000;
          this.skuId = 0;
          return;
        }
        this.skuId = item.skuId;
      },
      onChangeNumber(e){
        // 获取选择商品数量
        this.quantity = e.mp.detail.number;
      },
      addBuyCart(){
        // 报错
        if (!this.showErrMsg()) {
          return;
        }

        if (this.is_authorized())
          this.addBuyCartSuccessfully();
      },
      showErrMsg(){
        let self = this;
        if (self.skuId == 0 && self.defaultProductSizeList.length !== 0) {
          self.toast = common.showErrorMsg(appMessages.CHOOSE_SIZE_ERROR);
          setTimeout(function () {
            self.toast.show_toast = false;
          }, 1500);
          return false;
        } else if (self.defaultProductSizeList.length !== 0 && self.quantity == 0) {
          // 保证 包 and 衣服 同时报错
          self.toast = common.showErrorMsg(appMessages.CHOOSE_QUANTITY_ERROR);
          setTimeout(function () {
            self.toast.show_toast = false;
          }, 1500);
          return false;
        }

        return true;
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
      addBuyCartSuccessfully(){
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        let entityDTO = {
          "entityDTO": {
            "quantity": this.quantity,
            "skuId": this.skuId
          }
        };
        let self = this;
        fly.post("phantombuy/cart/add", entityDTO).then(res => {
          if (res.data.code === '1') {
            self.toast = common.showSuccessMsg(appMessages.ADD_CART_SUCCESS);
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);

          } else {
            self.toast = common.showErrorMsg(appMessages.ADD_CART_FAILED);
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
      },
      gotoCart(){
        wx.switchTab({
          url: '/pages/order/main'
        });
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

  .swiper {
    height: 6.8rem;
    width: 100%;
    display: block;
  }

  .product_img {
    width: 100%;
    height: 30%;
    zoom: 1;
    display: row;
    box-sizing: border-box;

  }

  .product_img img {
    width: 65%;
    margin-top: 7%;
    vertical-align: middle;
    margin-left: 17%;
    margin-bottom: 5%;
  }

  .product_basic_info {
    width: 100%;
    left: 5%;
    margin-bottom: 5%;
    position: relative;
  }

  .product_cn_name {

  }

  .site_name {
    margin-top: 5%;
    font-size: 16px;
    position: relative;
  }

  .product_price {

  }

  .product_name .product_name_cn {
    font: 16px bold black;
  }

  .product_price .original_price_rmb {
    font-size: 16px;
    color: black;
  }

  .text_decoration {
    text-decoration: line-through;
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

  .product_size_tip {
    padding-bottom: 0.2rem;
  }

  .product_sizes {
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }

  .product_color {
    font-size: 14px;
    /*height: 1.3rem;*/
    width: 100%;
    /*padding-bottom: 0.5rem;*/
    /*padding-top: 0.3rem;*/
  }

  .product_color_text {
    height: 30%;
    font-size: 14px;
    padding-bottom: 0.3rem;
  }

  .product_color_img {
    height: 1rem;
    width: 1rem;
    display: block;
    overflow: hidden;
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
    padding-bottom: 0.4rem;
    padding-top: 0.3rem;
    border-bottom: 1px dotted #d1d1d1;
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
    padding-top: 0.3rem;
  }

  .col img {
    width: 1.0rem;
    height: 1.0rem;
  }

  .productSizeActivity {
    border: 1.5px solid #1890ff;
    box-shadow: none !important;
  }

  .productColorActivity {
    border: 1.5px solid #e3393c;
  }

  .a {
    border-color: #d9d9d9;
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.25);
  }

  .detailsSmallImage {
    overflow: hidden;
    height: 100px;
    width: 80%;
    padding-left: 10%;
    display: flex;
    padding-bottom: 7%;
  }

  .detailsSmallImageitem {
    padding: 6px;
  }

  .detailsSmallImageitemBanner {
    overflow: hidden;
    width: 100%;
    display: flex;

  }

  .scrollControl {
    display: flex;
  }

  .fa-2x {
    font-size: 2em;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .iconColor {
    color: gray;
    padding-top: 20px;
  }

  *, *::before, *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }


</style>
