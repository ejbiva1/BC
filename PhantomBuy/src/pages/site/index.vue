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
        <ul>
          <li class="site_product" v-for="(item, i) in site_product_category_list" :key="i">
            <span>{{item.productCategoryName}}</span></li>
        </ul>
      </scroll-view>
    </div>

    <!--该种类商品列表-->
    <div class="site_product_total">
      <wxc-panel :border="has_border">
        <view class="site_products">
          <view v-for="(item ,i) in product_detail_list" :key="i" @click="toProductDetail(item.productId)"
                class="product_profile">

            <view class="product_img">
              <img :src="item.productImageUrl" class="face first-face">
            </view>
            <view class="product_detail">
              <ul class="list-group list-group-flush">
                <li class="salesTitle" title="双面毛衣外套"><span>{{item.productNameCn}}</span></li>
                <li class="list-group-item">
                  <span style="text-decoration: line-through">{{item.originalPriceRmb}}元</span>
                  <span style="color:red;padding-left: 10px;">{{item.salePriceRmb}}元</span>
                </li>
                <li class="updateTime" title="更新时间:2019年2月1日">更新时间:<span>{{item.updateDate}}</span>
                </li>
              </ul>
            </view>


          </view>

        </view>
      </wxc-panel>
    </div>
  </div>
</template>

<!--商家-->
<script type="text/ecmascript-6">
  import search from "../../components/search/search";
  import  fly from "../../utils/fly";
  import tabs from "../../components/tabs/tabs";
  export default {
    data() {
      return {
        // brand_list: [],
        toView: "red",
        scrollTop: 100,
        ListSiteProductCategory: [],
        site_product_category_list: [],
        product_detail_list: [],
        detail: '12',
        has_border: true,
        search_border: false
      };
    },
    components: {
      "search": search,
      "tabs": tabs

    },
    created() {
    },
    onLoad(options){
      this.getListSiteProductCategory(options);
      this.getSingleKindProductList(options);
    },
    computed: {},
    methods: {
      getListSiteProductCategory(option) {
        let entityDTO = {entityDTO: option};
        fly.post('phantombuy/site/listSiteProductCategory', entityDTO).then((res) => {
          if (res.data.code === '1') {
            if (res.data.data.records.length > 0)   this.site_product_category_list = res.data.data.records;
          }
        });
      },
      getSingleKindProductList(options) {
        // let entityDTO = {entityDTO: {siteId: "3", productCategoryId: ""}, pageDTO: {pageNo: "1", pageSize: 36}};
        let siteId = options.siteId;
        let entityDTO = {entityDTO: {siteId: siteId, productCategoryId: ""}, pageDTO: {pageNo: "1", pageSize: 36}};
        fly.post("phantombuy/product/list", entityDTO).then((res) => {
          if (res.data.code === '1') {

            //this.product_detail_list = res.data.data.records.slice(0, 9);
            if (res.data.data.records.length > 0) this.product_detail_list = res.data.data.records;
//            this.product_detail_list  = this.product_detail_list.slice(0,8);
          } else {

          }
        });
      },
      toProductDetail(productId) {
        //url: '/pages/test/test?dataObj='+JSON.stringify(this.data.dataObj)
        //url: '/pages/test/test?str='+this.data.testStr,
        wx.navigateTo({
          url: '/pages/productDetail/main?productId=' + productId,

        });

//        wx.navigateTo({
//          url: '/pages/site/main'
//        })
      }
    }
  }
</script>

<style scoped>
  .animated {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
  }

  .swiper-home {
    width: 100%;
    height: 15%;
    padding: 10px 10px 5px 0px;
    display: flex;
    white-space: nowrap;
  }

  .site_product {
    padding-right: 5px;
    padding-left: 5px;
    text-align: center;
    display: inline-block;
    min-width: 45px;
    height: 25px;
    line-height: 25px;
    font: 14px black;
  }

  ul li:last-child {
    margin-right: 25px;
  }

  ul li:first-child {
    padding-left: -5px;
  }

  ::-webkit-scrollbar {
    width: 20px;
    height: 30px;
    color: transparent;
  }

  .site_product_total {
    height: 80%;
    width: 100%;
    justify-content: center;
    align-item: center;
  }

  .site_products {
    display: flex;
    align-item: center;
    /*justify-content: center;  这个属性必须 注释，它定义了项目在主轴的对齐方式*/
    flex-wrap: wrap;
    align-content: center;

    /*flex-direction///
      flex-wrap
      flex-flow: flex-direction 和 flex-wrap 的简写形式
     justify-content: 定义了项目在主轴的对齐方式
     align-items: 定义了项目在交叉轴上的对齐方式 :  align-items: flex-start | flex-end | center | baseline | stretch;
     align-content:定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用
    */
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(top, #222, #333);
    width: 100%;

  }

  .product_profile {
    width: 33%;
    height: 256px;
    flex-direction: row;
    float: left;
    /*display: flex;*/
  }

  .first-face {
    display: flex;
    justify-content: center;
    align-item: center;
  }

  .face {
    margin: 16px;
    padding: 4px;
    width: 84px;
    height: 104px;
    object-fit: contain;
    border-radius: 10%;
  }

  .site_product_detail .product_detail {
    width: 100%;
    height: 80px;
  }

  .product_detail .list-group {
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-bottom: 0;
    padding: 4px 10px 4px 10px;
  }

  .product_detail .list-group-item {
    font: 13px black;
  }

  .product_detail .salesTitle {
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-align: left;
  }

  .product_detail .updateTime {
    font-weight: bold;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

</style>

