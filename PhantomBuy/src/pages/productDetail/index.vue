<template>
  <div class="animated fadeIn">
    <view class="product_detail">
      <view class="product_img">
        <img :src="product_detail.productImageUrl">
      </view>
      <view class="product_basic_info">
        <h5>{{product_detail.brandNameCh}}</h5>
        <view>
          <text>{{product_detail.productNameCn}}</text>
        </view>
        <view>{{product_detail.originalPriceRmb}}; {{product_detail.salePriceRmb}}</text>
        </view>
        <view>
          <p>
            <text>颜色: Navy</text>
          </p>
          <view>
            <p>尺码:</p>
            <view></view>
          </view>
        </view>
      </view>
      <view class="product_descr">

      </view>
      <view class="detail_smallImage"></view>

      <!--商品描述， 详情 tab 页切换-->
      <tab v-bind:product="product_detail"></tab>
    </view>

    <div
      style="border: 1px solid red;height: 3rem; width: 100%;position: absolute;bottom: 0;  background-color: #3d3d3f;"></div>

  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly';
  import tabs from '../../components/tabs/tabs'
  export default {
    data() {
      return {
        product_detail: {},

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
        let entityDTO = {entityDTO: option};
//        let entityDTO = {entityDTO: {productId: "11769"}};
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
  }

  .product_detail {
    width: 100%;
    height: 100%;
  }

  .product_img {
    width: 100%;
    height: 30%;
    border: 2px solid red;
    zoom: 1;
    display: block;
    box-sizing: border-box;;

  }

  .product_img img {
    width: 80%;
    height: 5rem;
    margin-top: 5%;
    vertical-align: middle;
    margin-left: 10%;
    margin-bottom: 5%;
  }


</style>

