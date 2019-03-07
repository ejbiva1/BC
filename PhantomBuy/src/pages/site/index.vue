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
          <li class="site_product" v-for="(item, i) in product_list" :key="i">
            <span>{{item.productCategoryName}}</span></li>
        </ul>
      </scroll-view>
    </div>

    <!--该种类商品列表-->
    <div class="site_product_total">
      <view class="site_products">
        <view v-for="(item ,i) in product_detail_list" :key="i">
          <view  class="product_profile" >
          <view class="product_img">
            <img :src="item.productImageUrl" class="face first-face">
          </view>
          <view class="product_detail">
            <ul class="list-group list-group-flush">
              <li class="salesTitle" title="双面毛衣外套"><span>{{item.productNameCn}}</span></li>
              <li class="list-group-item"
                  style=" background:linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);font-size:14px;">
                {{item.originalPriceRmb}}元
              </li>
              <li class="updateTime" >更新时间:2019年2月1日
              </li>
            </ul>
          </view>
          <p></p>
        </view>
          </view>

      </view>
    </div>
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
    },
    onLoad(){
      this.product_list = [
        {
          "productCategoryId": 1,
          "productCategoryName": "衬衫",
          "sex": 1
        },
        {
          "productCategoryId": 2,
          "productCategoryName": "休闲裤",
          "sex": 1
        },
        {
          "productCategoryId": 3,
          "productCategoryName": "牛仔裤",
          "sex": 1
        },
        {
          "productCategoryId": 4,
          "productCategoryName": "毛衣",
          "sex": 1
        },
        {
          "productCategoryId": 5,
          "productCategoryName": "休闲鞋",
          "sex": 1
        },
        {
          "productCategoryId": 6,
          "productCategoryName": "夹克",
          "sex": 1
        },
        {
          "productCategoryId": 7,
          "productCategoryName": "风衣",
          "sex": 1
        },
        {
          "productCategoryId": 8,
          "productCategoryName": "棉衣",
          "sex": 1
        }, {
          "productCategoryId": 9,
          "productCategoryName": "大衣",
          "sex": 1
        }, {
          "productCategoryId": 10,
          "productCategoryName": "配饰",
          "sex": 1
        }
      ];
      this.getSingleKindProductList();
    },
    computed: {},
    methods: {
      getSingleKindProductList() {
        let entityDTO = {entityDTO: {siteId: "3", productCategoryId: ""}, pageDTO: {pageNo: "1", pageSize: 36}}
        fly.post("phantombuy/product/list", entityDTO).then((res) => {
          if (res.data.code === '1') {

            //this.product_detail_list = res.data.data.records.slice(0, 9);
            if (res.data.data.records.length > 0) this.product_detail_list = res.data.data.records;
            //console.log(this.product_detail_list);
          } else {

          }
        });
      }
    }
  }
</script>

<style scoped>
  .animated{
    background-color: #F7F7F7;
  }
  .swiper-home {
    width: 100%;
    height: 10%;
    padding: 20px 10px 10px 5px;
    display: flex;
    white-space: nowrap;
  }

  .site_product {
    padding-right: 5px;
    padding-left: 5px;
    text-align: center;
    border-right: 1px solid black;
    height: 100%;
    display: inline-block;
    width: 60px;
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
    border: 2px solid red;
  }

  .site_products {
    display: flex;
    align-item: center;
    justify-content: center;
    vertical-align: center;
    flex-wrap: wrap;
    align-content: center;
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(top, #222, #333);
    width:100%;
  }

  .product_profile{
    /*width: 33%;*/
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
    width: 33.3%;
    height: 80px;
  }

  .product_detail .list-group {
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
  }

  .product_detail .salesTitle {
    font-weight: bold;
    font-size: 14px;
    color: black;
    text-align: left;
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    padding-bottom: 17px;
  }

  .product_detail .updateTime {
    font-weight: bold;
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }


</style>

