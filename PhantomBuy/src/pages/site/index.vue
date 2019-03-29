<template>
  <div class="animated fadeIn">
    <!--search是个组件-->

    <input v-model="a"/>
    <view class="section">
      <search v-bind:site="site_detail" @search="SearchProducts" ref="find"></search>
    </view>


    <!--商品种类-->
    <div class="swiper-home">
      <scroll-view class="scroll-view_x"
                   :scroll-x="true"
                   :style="'{width: auto;overflow:hidden;height:20px;}'">
        <ul>
          <li class="site_product" v-for="(item, index) in site_product_category_list" :key="index"
              @click="getSingleKindProductList(item, index)">
            <a
              :class="{ product_category_activity : product_category_id == (index+1)  }">{{item.productCategoryName}}</a>
          </li>
        </ul>
      </scroll-view>
    </div>

    <!--商品列表-->
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
                  <span style="text-decoration: line-through;text-align: left;padding-left:-5px;">{{item.originalPriceRmb}}元</span>
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
  import {pageDTO} from "../../common/model/pageDTO";
  export default {
    data() {
      return {
        ListSiteProductCategory: [],
        site_product_category_list: [],
        product_detail_list: [],
        has_border: true,
        site_detail: {},
        pageDto: new pageDTO(),
        pageDtoSetting: {},
        search: "搜索",
        current_prod_categoryid: 0,
        previous_pro_cate_id: 0,
        product_category_id: ''
      };
    },
    components: {
      "search": search,
      "tabs": tabs
    },
    created() {
    },
    onLoad(options){
      // load site_detail
      if (options !== undefined)
        this.site_detail = JSON.parse(options.site);
      //  site product category
      this.pageDtoSetting = this.pageDto;
      this.getListSiteProductCategory();
      // site product list
      this.getAllProductList();
      console.log(this.product_category_id);
    },
    async onPullDownRefresh() {
      // to doing..
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    onReachBottom() {
      this.previous_pro_cate_id = this.current_prod_categoryid;
      // this.current_prod_categoryid =  this.current_prod_categoryid;
      this.toNextPage();
      this.loadReachBottomList();
    },

    computed: {},
    methods: {
      getListSiteProductCategory() {
        this.show_loading();
        let entityDTO = {entityDTO: {siteId: this.site_detail.siteId}};
        fly.post('phantombuy/site/listSiteProductCategory', entityDTO).then((res) => {
          if (res.data.code === '1') {
            if (res.data.data.records.length > 0)   this.site_product_category_list = res.data.data.records;
          }
        });
      },
      getProducts(){
        let siteId = this.site_detail.siteId;
        let entityDTO;
        if (this.current_prod_categoryid == 0) {
          entityDTO = {
            entityDTO: {
              siteId: siteId,
              productCategoryId: ""
            },
            pageDTO: this.pageDtoSetting
          };
        } else {
          entityDTO = {
            entityDTO: {siteId: this.site_detail.siteId, productCategoryId: this.current_prod_categoryid},
            orderDTO: {propertyName: "sale_price_usd,original_price_usd"},
            pageDTO: this.pageDtoSetting
          };
        }
        fly.post("phantombuy/product/list", entityDTO).then((res) => {
          if (res.data.code === '1') {
            //if (res.data.data.records.length > 0)
            for (let i = 0; i < res.data.data.records.length; i++) {
              this.product_detail_list.push(res.data.data.records[i]);
            }
            this.hide_loading();
          } else {
          }
        });
      },
      getAllProductList() {
        //  product_detail_list  置空
        this.product_detail_list = [];
        this.pageDtoSetting = this.pageDto;
        this.getProducts();
      },
      getSingleKindProductList(productCategory, index) {
        this.show_loading();
        this.product_category_id = index+1;
        console.log(this.product_category_id);
        this.previous_pro_cate_id = this.current_prod_categoryid;
        this.current_prod_categoryid = productCategory.productCategoryId;
        this.product_detail_list = [];
        this.pageDtoSetting = this.pageDto;
        this.getProducts();
      },
      loadReachBottomList(){
        //current_prod_categoryid: 0,
        // previous_pro_cate_id: 0
        if (this.current_prod_categoryid != this.previous_pro_cate_id) {
          this.product_detail_list = [];
        }
        this.getProducts();
      },
      toProductDetail(productId) {
        wx.navigateTo({
          url: '/pages/productDetail/main?productId=' + productId,
        });
      },
      show_loading() {
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading() {
        wx.hideLoading();
      },
      toNextPage() {
        this.pageDtoSetting = this.pageDto.nextPage(this.pageDtoSetting);
      },
      SearchProducts(){
        console.log(this.$refs.find.search_key);
      },

    },
  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
  }

  .swiper-home {
    width: 100%;
    height: 15%;
    padding: 20px 10px 0px 0px;
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
    display: flex;
    justify-content: space-between;
  }

  .site_products {
    display: flex;
    align-item: center;
    /*justify-content: center;  这个属性必须 注释，它定义了项目在主轴的对齐方式*/
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;

    /*flex-direction///
      flex-wrap
      flex-flow: flex-direction 和 flex-wrap 的简写形式
     justify-content: 定义了项目在主轴的对齐方式
     align-items: 定义了项目在交叉轴上的对齐方式 :  align-items: flex-start | flex-end | center | baseline | stretch;
     align-content:定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用
    */
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(top, #222, #333);
    /*width: 100%;*/

  }

  .product_profile {
    width: 50%;
    text-align: center;
    vertical-align: middle;

  }

  .face {
    object-fit: contain;
    vertical-align: middle;
    width: 3rem;
    height: 3rem;
    margin-top: 10%;
    margin-bottom: 6%;
    align-items: center;
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
    margin-left: 5%;
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

  .product_category_activity {
    color: #1890ff;
  }
</style>

