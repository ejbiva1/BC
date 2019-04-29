<template>
  <div class="animated fadeIn">
    <search v-bind:site_promotions="site_promotion_list" @search="SearchProducts" ref="find"></search>

    <div class="select">
      <div class="ass_category">
        <view class="ass_wrap">
          <view class="ass_value">
            <ul class="ass_valueList">
              <li class="info_padding" v-for="(item ,index) in sub_category" :key="index"
                  @click="chooseSubCategory(item, index)">
                <a :class="{subCategoryActivity: sub_category_index == index }">
                  <i class="fa fa-square-o" aria-hidden="true"></i>{{item}}</a>
              </li>
            </ul>

          </view>
        </view>
      </div>
    </div>
    <!--商品种类-->
    <div class="swiper-home" v-if="site_product_category_list.length > 0">
      <scroll-view v-if="sub_category_index ===0"
                   :scroll-x="true"
                   style="width: auto;">

        <view class="product_kind_list">
          <view class="site_product" v-for="(item, index) in site_no_product_category_list" :key="index"
                @click="getSingleKindProductList(item, index)">
            <a
              :class="{ product_category_activity : product_category_id == (index)  }">{{item.productCategoryName}}</a>
          </view>
        </view>
      </scroll-view>
      <scroll-view v-if="sub_category_index ===1"
                   :scroll-x="true"
                   style="width: auto; width: 100%; height: 50px;">
        <view class="product_kind_list">
          <view class="site_product" v-for="(item, index) in site_man_category_list" :key="index"
                @click="getSingleKindProductList(item, index)">
            <a
              :class="{ product_category_activity : product_category_id == (index)  }">{{item.productCategoryName}}</a>
          </view>
        </view>
      </scroll-view>
      <scroll-view v-if="sub_category_index ===2"
                   :scroll-x="true"
                   style="width: auto; width: 100%;   height: 50px">
        <view class="product_kind_list">
          <view class="site_product" v-for="(item, index) in site_woman_category_list" :key="index"
                @click="getSingleKindProductList(item, index)">
            <a
              :class="{ product_category_activity : product_category_id == (index)  }">{{item.productCategoryName}}</a>
          </view>
        </view>
      </scroll-view>
    </div>

    <!--商品列表-->
    <scroll-view scroll-y='true' scroll-top="scrollTop">
      <div class="site_product_total">
        <wxc-panel :border="has_border">
          <view class="site_products">
            <view v-for="(item ,i) in product_detail_list" :key="i" @click="toProductDetail(item.productId,$event)"
                  class="product_profile">

              <view class="product_img">
                <img :src="item.productImageUrl" class="face first-face">
              </view>
              <view class="product_detail">
                <ul class="list-group list-group-flush">
                  <li class="salesTitle" v-if="item.productNameCn !== undefined"><span>{{item.productNameCn}}</span>
                  </li>
                  <li class="salesTitle" v-if="item.productNameCn === undefined"><span>{{item.productName}}</span></li>
                  <li class="list-group-item">
                  <span style="text-align:left;padding-left:-20px;"
                        :class="{text_decoration: item.salePriceRmb !== undefined } ">
                    {{item.originalPriceRmb}}
                    <span v-show="item.originalPriceRmb !== undefined">元</span>
                  </span>
                  <span style="color:red;padding-left: 10px;">{{item.salePriceRmb}}
                    <span v-show="item.salePriceRmb !== undefined">元</span></span>
                  </li>
                  <li class="updateTime" v-show="item.updateDate !== undefined">更新时间:<span>{{item.updateDate}}</span>
                  </li>
                </ul>
              </view>


            </view>

          </view>
        </wxc-panel>
      </div>
    </scroll-view>
    <!--<wxc-loadmore-->
    <!--text="正在努力加载中..."-->
    <!--icon="https://s10.mogucdn.com/mlcdn/c45406/171018_8gj08gbl9fj6igb380dec9k1ifhe2_32x32.png"-->
    <!--&gt;</wxc-loadmore>-->

    <view v-if="is_empty">
      <empty></empty>
    </view>
  </div>

</template>

<!--商家-->
<script type="text/ecmascript-6">
  import search from "../../components/search/search";
  import  fly from "../../utils/fly";
  import tabs from "../../components/tabs/tabs";
  import {pageDTO} from "../../common/model/pageDTO";
  import {default_product_list} from "../../common/model/defaultProduct";
  import empty from "../../components/empty/empty";
  export default {
    data() {
      return {
        ListSiteProductCategory: [],
        site_product_category_list: [],
        site_no_product_category_list: [],
        product_detail_list: [],
        has_border: false,
        site_detail: {},
        pageDto: new pageDTO(),
        pageDtoSetting: {},
        search: "搜索",
        current_prod_categoryid: 0,
        previous_pro_cate_id: 0,
        product_category_id: 0,
        sub_category: ['全部', '男款', '女款'],
        sub_category_index: 0,
        site_man_category_list: [],
        site_woman_category_list: [],
        sex: undefined,
        index_initial: 1000,
        scrollTop: '',
        is_empty: false,
        productCategoryName: undefined,
        site_promotion_list: []

      };
    },
    components: {
      "search": search,
      "tabs": tabs,
      "empty": empty
    },
    onLoad(options){
      if (options !== undefined) {
        this.site_detail = JSON.parse(options.site);
        this.setNavigationBarTitle();
      }
    },
    onShow(){
      //  site product category
      this.pageDtoSetting = this.pageDto;
      // 数据初始化
      this.sub_category_index = 0;
      this.product_category_id = 0;
      this.current_prod_categoryid = 0;

      this.set_site_promotion_list();
      this.getListSiteProductCategory();
      this.getAllProductList();
      console.log(this.scrollTop);
      console.log(getCurrentPages());
    },
    onUnload(){
      this.is_empty = false;
      this.site_detail = {};
      this.site_promotion_list = [];

    },
    async onPullDownRefresh() {
      // to doing..
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    onReachBottom() {
      this.previous_pro_cate_id = this.current_prod_categoryid;
      this.current_prod_categoryid = this.current_prod_categoryid;
      this.toNextPage();
      this.loadReachBottomList();
    },
    computed: {},
    methods: {
      set_site_promotion_list(){
        if (this.site_detail.sitePromotionList.length > 0) {
          this.site_promotion_list = this.site_detail.sitePromotionList;
          let first_site_promotion = this.site_promotion_list[0];
          this.site_promotion_list = this.site_promotion_list.filter((item, index) => {
            return first_site_promotion.promotionCategoryName != item.promotionCategoryName;
          });
          this.site_promotion_list.push(first_site_promotion);


        }
      },
      setNavigationBarTitle(){
        wx.setNavigationBarTitle({
          title: this.site_detail.brandNameCh   // 页面标题
        })
      },
      getListSiteProductCategory() {
        let entityDTO = {entityDTO: {siteId: this.site_detail.siteId}};
        fly.post('phantombuy/site/listSiteProductCategory', entityDTO).then((res) => {
          if (res.data.code === '1') {
            if (res.data.data.records.length > 0) {
              this.site_product_category_list = res.data.data.records;
              switch (this.sub_category_index) {
                case 0:    // 全部商品
//                  this.site_no_product_category_list = [];
                  break;
                case 1:  // 男款
                  this.site_product_category_list.filter((item, index) => {
                    return item.sex == 1;
                  });
                  this.site_man_category_list.splice(0, 0, default_product_list[1]);
                  break;
                case 2:  // 女款
                  this.site_woman_category_list = this.site_product_category_list.filter((item, index) => {
                    return item.sex == 0;
                  });
                  this.site_woman_category_list.splice(0, 0, default_product_list[0]);
                  break;
              }
            }
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
              productCategoryId: "",
              sex: this.sex !== undefined ? this.sex : undefined
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
            // 某类商品数据是否为空
            if (res.data.data.records.length > 0 || this.product_detail_list.length > 0) {
              if (this.is_empty)    this.is_empty = !this.is_empty;
              for (let i = 0; i < res.data.data.records.length; i++) {
                this.product_detail_list.push(res.data.data.records[i]);
              }
            } else {
              if (!this.is_empty)    this.is_empty = !this.is_empty;
            }

            this.hide_loading();

          } else {
          }
        });
      },
      getAllProductList() {
        //  product_detail_list  置空
        this.show_loading();
        this.product_detail_list = [];
        this.pageDtoSetting = this.pageDto;

        this.getProducts();
      },
      getSingleKindProductList(productCategory, index) {
        this.show_loading();
        this.product_category_id = index;
        console.log(this.product_category_id);
        this.previous_pro_cate_id = this.current_prod_categoryid;
        this.current_prod_categoryid = productCategory.productCategoryId;
        this.productCategoryName = productCategory.productCategoryName;
        this.product_detail_list = [];
        this.pageDtoSetting = this.pageDto;
        if (this.$refs.find.search_key !== "") {
          this.searchProductList();
        } else {
          this.getProducts();
        }

      },
      loadReachBottomList(){
        //current_prod_categoryid: 0,
        // previous_pro_cate_id: 0
        if (this.current_prod_categoryid != this.previous_pro_cate_id) {
          this.product_detail_list = [];
        }

        // 搜索 and 下拉刷新 这里逻辑 有问题
        if (this.$refs.find.search_key !== "") {
          this.searchProductList();
          return
        }

        // case 1: All Products
        // case 2: product category list
        this.getProducts();
      },

      SearchProducts(category){
        // 站内搜索
        this.chooseSubCategory(undefined, category);
      },
      chooseSubCategory(item, index){
        this.sub_category_index = index;
        this.product_category_id = this.index_initial;
        this.current_prod_categoryid = 0;
        this.previous_pro_cate_id = 0;
        this.productCategoryName = item !== undefined ? item.productCategoryName : undefined;
        switch (this.sub_category_index) {
          case 0:    // 全部商品
            this.sex = undefined;
            if (this.$refs.find.search_key !== "") {
              this.searchProductList();
            } else {
              this.getAllProductList();
            }

            break;
          case 1:  // 男款
            this.site_man_category_list = this.site_product_category_list.filter((item, index) => {
              return item.sex == 1;
            });
            //array.splice(4,0,5);
            this.site_man_category_list.splice(0, 0, default_product_list[1]);
            this.sex = 1;
            if (this.$refs.find.search_key !== "") {
              this.searchProductList();
            } else {
              this.getAllProductList();
            }
            break;
          case 2:  // 女款
            this.site_woman_category_list = this.site_product_category_list.filter((item, index) => {
              return item.sex == 0;
            });
            this.site_woman_category_list.splice(0, 0, default_product_list[0]);
            this.sex = 0;
            if (this.$refs.find.search_key !== "") {
              this.searchProductList();
            } else {
              this.getAllProductList();
            }
            break;
          case 3:
            this.product_detail_list = [];
            this.searchProductList();
        }
      },
      searchProductList(){
        let entityDTO = {
          entityDTO: {
            siteId: this.site_detail.siteId,
            searchKey: this.$refs.find.search_key !== undefined ? this.$refs.find.search_key : undefined,
            productCategoryName: this.productCategoryName || undefined,
            sex: this.sex
          },
          pageDTO: this.pageDtoSetting
        };
        fly.post("phantombuy/product/search", entityDTO).then(res => {
          if (res.data.code === '1') {
//            this.sub_category_index = this.index_initial;
//            this.product_category_id = this.index_initial;

            if (res.data.data.records.length > 0 || this.product_detail_list.length > 0) {
              if (this.is_empty)    this.is_empty = !this.is_empty;
              for (let i = 0; i < res.data.data.records.length; i++) {
                this.product_detail_list.push(res.data.data.records[i]);
              }

              console.log(this.product_detail_list);
              this.hide_loading();
            } else {
              if (!this.is_empty)    this.is_empty = !this.is_empty;
            }


          } else {
            console.log('服务器内部错误');
          }
        });
      },
      toProductDetail(productId, e) {
        // console.log(e);
        //const clientX = e.clientX;
        this.scrollTop = e.clientY;
        // 记录下当前 (x,y)坐标
        wx.navigateTo({
          url: '/pages/productDetail/main?productId=' + productId,
        });
      },
      toNextPage() {
        this.pageDtoSetting = this.pageDto.nextPage(this.pageDtoSetting);
      },
      show_loading() {
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading() {
        wx.hideLoading();
      },
    },
  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
    overflow: hidden;
  }

  .swiper-home {
    width: 100%;
    height: 100%;
    padding: 10px 10px 3px 0.85rem;
    text-align: justify;
    word-break: break-all;
  }

  .scroll-view-container {
    width: 100%;
    height: 0.80rem;
    /* border-top: 1rpx solid #EF639F;
    border-bottom: 1rpx solid #EF639F; */
    /*background-color: #EEE;*/
  }

  .product_kind_list {
    display: flex;
    /*flex-wrap: nowrap;*/
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    text-align: justify;
    word-break: break-all;
  }

  .site_product {
    min-width: 65px;
    text-align: left;
    font: 14px black;
    vertical-align: middle;
    line-height: 0.70rem;
    height: 0.70rem;
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
    background: #fff;
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
    text-align: left;
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

  .ass_category {
    /*padding-left: 5px;*/
  }

  .select {
    width: 100%;
    padding: 0.5rem 0rem 0.15rem 0.75rem;
  }

  .select .ass_wrap {
    position: relative;
    _zoom: 1;
    /*font-weight: normal;*/
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
  }

  .select .ass_key {
    display: flex;
    width: 50px;
    white-space: nowrap;
    font-weight: bold;
  }

  .select .ass_value {
    /*padding-left: 20px;*/
    overflow: hidden;
    zoom: 1;
  }

  .ass_valueList {
    display: flex;
    justify-content: space-between;
    /*padding-left: 0.2rem;*/
    padding-right: 0.3rem;
  }

  .info_padding {
    /*padding-left: 0.1rem;*/
    padding-right: 0.5rem;
  }

  .subCategoryActivity {
    color: #1890ff;
  }

  .text_decoration {
    text-decoration: line-through;
  }

  .section {
    width: 100%;
    padding-left: 0.25rem;
  }

</style>
