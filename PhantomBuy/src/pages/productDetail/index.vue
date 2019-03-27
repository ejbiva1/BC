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
          <view class="product_color info_padding">
            <view class="product_color_text">
              <text>颜色:</text>
              <text> Navy</text>
            </view>
            <view class="button-wrap" v-for="(item, i) in sizes" :key="i">
              <wxc-button :plain="plain" size="small" :type="type" :value="item" :btnStyle="btn_style"></wxc-button>
            </view>
          </view>
          <view class="product_size info_padding">
            <view>
            <p style=" font-size: 14px; " class="info_padding">尺码:</p>
            </view>
            <view class="button-wrap" v-for="(item, i) in sizes" :key="i">
              <wxc-button :plain="plain" size="small" :type="type" :value="item" :btnStyle="btn_style"></wxc-button>
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
      <view class="button add_buy_cart">加入购物车</view>
      <view class="button buy_once">立即结算</view>
    </view>

  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly';
  import tabs from "../../components/tabs/tabs";
  export default {
    data() {
      return {
        product_detail: {},
        sizes: ['XL', 'XXL', 'XL'],
        plain: true,
        btn_style: 'min-width: 66rpx;padding: 5rpx;border-radius: 6rpx',
        type: "secondary",
        has_border: true


      };
    },
    components: {
      'tab': tabs
    },
    onLoad(options) {
      this.getProductDetail(options);

    },
    methods: {

      getProductDetail(option){
        // let entityDTO = {entityDTO: option};
        let entityDTO = {entityDTO: {productId: "11769"}};
        fly.post("phantombuy/product/get", entityDTO).then((res)=> {
          if (res.data.code === '1') {
            //console.log(res.data.data);
            if (res.data.data !== undefined) this.product_detail = res.data.data;
          }
        });

      }
    },
  }
</script>

<style scoped>
  .animated {
    background-color: #F7F7F7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /*box-sizing: border-box;*/
  }

  .product_detail {
    width: 100%;
    /*height: 100%;*/

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
    margin-top:5%;
    font-size: 14px;
    position: relative;
  }

  .product_price {

  }

  .product_name .product_name_cn {
    font-size: 14px;
    color: black;
  }

  .product_price .original_price_rmb {
    text-decoration: line-through;
    font-size: 14px;
    color: black;
  }

  .product_price .sale_price_rmb {
    padding-left: 0.3rem;
    font-size: 14px;
  }

  .product_size {
    width: 100%;
    height: 1.3rem;
    font-size: 14px;
  }

  .product_color {
    font-size: 14px;
    height: 1.3rem;
    width: 100%;
  }

  .product_color_text{
    height: 30%;
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

  /*立即结算按钮*/
  .carts-footer .button {
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    width: 2.0rem;
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

</style>

