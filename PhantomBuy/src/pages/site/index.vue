<template>
  <div class="animated fadeIn">
    <!--search是个组件-->
    <view class="section">
      <search></search>
    </view>

    <!--商品种类-->
    <div class="swiper-home">
      <scroll-view class="scroll-view_x"
                   :scroll-x="true"
                   :style="'{width: auto;overflow:hidden;height:20px;}'">
        <view class="site_product" v-for="(items, i) in product_list" :key="i">
          <span>{{items.productCategoryName}}</span>
        </view>
      </scroll-view>
    </div>

    <div class="single_product" v-for="(items ,i) in product_detail_list" :key="i">
      <view>
        <img :src="items.productImageUrl" style="height:200px;width:60px;">
      </view>
    </div>

    <!--flex 布局-->
    <view class="container">
      <view class="first-face face">

      </view>
      <view class="second-face face">

      </view>
    </view>


  </div>
</template>

<!--商家-->
<script type="text/ecmascript-6">
  import search from "../../components/search/search";
  import  fly from "../../utils/fly";
  import {product_list} from "../../common/constants/product";
  export default {
    data() {
      return {
        // brand_list: [],
        toView: "red",
        scrollTop: 100,
        product_list: [],
        product_detail_list: []
      };
    },
    components: {
      "search": search

    },
    created() {
      this.product_list = product_list;

    },
    onLoad(){
      //  console.log(this.product_list);
      this.getSingleKindProductList();
    },
    computed: {},
    methods: {
      getSingleKindProductList() {
//        let entityDTO = {entityDTO: {siteId: "3"}};
//        fly.post("phantombuy/site/listSiteProductCategory", entityDTO).then((res) => {
//          if (res.data.code === '1') {
//            console.log(res.data.data.records);
//          } else {
//
//          }
//        });
        let entityDTO = {entityDTO: {siteId: "3", productCategoryId: ""}, pageDTO: {pageNo: "1", pageSize: 36}}
        fly.post("phantombuy/product/list", entityDTO).then((res) => {
          if (res.data.code === '1') {
            //console.log(res.data.data.records);
            this.product_detail_list = res.data.data.records.splice(2, 1,4);
            this.product_detail_list.push(res.data.data.records[0]);
            this.product_detail_list.push(res.data.data.records[0]);
            console.log(this.product_detail_list);
          } else {

          }
        });
      }
    }
  }
</script>

<style scoped>
  .swiper-home {
    width: 100%;
    height: 37px;
    /*overflow: hidden;*/
    padding: 30px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    white-space: nowrap;
  }

  .scroll-view_x {
    /*border-bottom: 1px solid red;*/
  }

  .site_product {
    padding-right: 5px;
    padding-left: 5px;
    border-right: 1px solid black;
    height: 100%;
    display: inline-block;
    width: 70px;
  }

  ::-webkit-scrollbar {
    width: 20px;
    height: 30px;
    color: transparent;
  }

  .single_product {
    width: 100%;
    height: 200px;
    border: 1px solid red;
  }

  /**index.wxss**/
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    flex-wrap: wrap;
    align-content: center;
    font-family: 'Open Sans', sans-serif;

    background: linear-gradient(top, #222, #333);
  }

  .first-face {
    display: flex;
    /* justify-content: center;
    align-items: center; */
  }

  .second-face {
    display: flex;
    /* justify-content: space-between; */
  }



  .face {
    margin: 16px;
    padding: 4px;

    background-color: #e7e7e7;
    width: 104px;
    height: 104px;
    object-fit: contain;

    box-shadow:
      inset 0 5px white,
      inset 0 -5px #bbb,
      inset 5px 0 #d7d7d7,
      inset -5px 0 #d7d7d7;

    border-radius: 10%;
  }

</style>

