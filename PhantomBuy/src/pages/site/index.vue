<template>
  <div class="animated fadeIn">
    <search-result v-bind:site_promotions="site_promotion_list" v-bind:site_id="site_detail.siteId"
                   @search="SearchProducts" ref="find"></search-result>

    <div class="select" v-if="!is_aggregations">
      <div class="ass_category"> <!--商品种类字体: 16px-->
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
    <div class="swiper-home" v-if="!is_aggregations">   <!--商品种类字体: 14px-->
      <scroll-view v-if="sub_category_index ===0"
                   :scroll-x="true"
                   style="width: auto;">

        <view class="product_kind_list">
          <view class="site_product" v-for="(item, index) in site_no_product_category_list" :key="index"
                @click="getSingleKindProductList(item, index)">
            <a
              :class="{ product_category_activity : current_prod_category_id == (item.productCategoryId)  }">{{item.productCategoryName}}</a>
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
              :class="{ product_category_activity : current_prod_category_id == (item.productCategoryId)  }">{{item.productCategoryName}}</a>
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
              :class="{ product_category_activity : current_prod_category_id == (item.productCategoryId)  }">{{item.productCategoryName}}</a>
          </view>
        </view>
      </scroll-view>
    </div>

    <!--聚类搜索-->
    <div class="swiper-home" v-if="is_aggregations">
      <!--聚类搜索-->
      <!--品牌-->
      <scroll-view v-if="is_aggregations" :scroll-x="true"
                   style="width: auto;">
        <view class="product_kind_list">
          <ul class="aggregations_ul">
            <li class="aggregations brand">品牌</li>
            <li v-for="(item, index) in product_brand_cn_list" :key="index" class="aggregations aggregations_brand_name"
                @click="setProductBrandName(item, index)"
                :class="{ product_aggregations_activity : product_brand_cn_id == (index)  }"
            >
              <span>{{item.name}}</span>
              <!--<span v-if="item.number !== undefined">({{item.number}})</span>-->
            </li>
          </ul>
        </view>
      </scroll-view>


      <!--商品分类-->
      <scroll-view v-if="is_aggregations" :scroll-x="true"
                   style="width: auto;">
        <view class="product_kind_list">
          <ul class="aggregations_ul">
            <li class="aggregations category">分类</li>
            <li v-for="(item, index) in product_category_name_list" :key="index"
                class="aggregations aggregations_category_name"
                @click="setProductCategoryName(item, index)"
                :class="{ product_aggregations_activity : product_category_name_id == (index)}">
              <span>{{item.name}}</span>
              <!--<span v-if="item.number !== undefined">({{item.number}})</span>-->
            </li>
          </ul>
        </view>
      </scroll-view>
    </div>


    <!--商品列表-->
    <!--:style="{ height:  scrollTop }"-->
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

    <view class="loadmore" v-if="is_end">
      <loadmore></loadmore>
    </view>


    <view v-if="is_empty" class="empty">
      <empty></empty>
    </view>
  </div>

</template>

<!--商家-->
<script type="text/ecmascript-6">
  import searchresult from "../../components/searchresult/searchresult";
  import  fly from "../../utils/fly";
  import {pageDTO} from "../../common/model/pageDTO";
  import {default_product_list} from "../../common/model/defaultProduct";
  import empty from "../../components/empty/empty";
  import loadmore from "../../components/loadmore/loadmore";
  import {TabsConstants} from "../../common/constants/tabs-constants";
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
        current_prod_category_id: 0,
        previous_pro_cate_id: 0,
        //product_category_id: 0,
        sub_category: ['全部', '男款', '女款'],
        sub_category_index: 0,
        site_man_category_list: [],
        site_woman_category_list: [],
        sex: undefined,
        index_initial: 1000,
        scrollTop: '',
        is_empty: false,
        productCategoryName: undefined,
        site_promotion_list: [],
        is_end: false,
        is_aggregations: false,
        productBrandName: undefined,
        product_brand_cn_list: [],
        product_category_name_list: [],
        product_brand_cn_id: 1000,
        product_category_name_id: 1000,
      };
    },
    components: {
      "search-result": searchresult,
      "empty": empty,
      "loadmore": loadmore
    },
    onLoad(options){
      if (options !== undefined) {
        this.site_detail = JSON.parse(options.site);
        this.setNavigationBarTitle();

        // 设置 优惠信息
        this.set_site_promotion_list();
        // 商品 分类列表
        this.getListSiteProductCategory();
        // 商品列表
        this.getAllProductList();
      }
    },
    onShow(){

    },
    onUnload(){
      // 数据初始化
      this.site_detail = {};
      this.site_promotion_list = [];
      this.reset_empty_end_data();
      this.reset_page_dto();
      this.reset_product_category_id();
      this.reset_subcategory_id();
      this.reset_aggregation_fn();
      this.is_aggregations = false;
      //productCategoryName  productBrandName
      this.reset_aggregation_value();

    },
    async onPullDownRefresh() {
      // to doing..
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    onReachBottom() {
      if (this.is_end) {   // 当前分类数据已加载完毕
        return
      }
      this.previous_pro_cate_id = this.current_prod_category_id;
      this.current_prod_category_id = this.current_prod_category_id;

      this.toNextPage();
      this.loadReachBottomList();
    },
    computed: {},
    /**
     * 进行页面分享
     */
    onShareAppMessage: function (options) {
      if (options.from === 'button') {
        // 来自页面内转发按钮
        console.log(options.target)
      }
      return {
        //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
//        path: 'pages/index/index',
        success: function (res) {
          //这是我自定义的函数，可替换自己的操作
        },
        //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
        fail: function () {
        }
      }
    },
    methods: {
      // 显示优惠信息
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
      // 页面标题设置
      setNavigationBarTitle(){
        wx.setNavigationBarTitle({
          title: this.site_detail.brandNameCh   // 页面标题
        })
      },
      // 商品分类列表 男款& 女款 分别显示
      getListSiteProductCategory(){
        let entityDTO = {entityDTO: {siteId: this.site_detail.siteId}};
        fly.post('phantombuy/site/listSiteProductCategory', entityDTO).then((res) => {
          if (res.data.code === '1') {
            if (res.data.data.records.length > 0) {
              this.site_product_category_list = res.data.data.records;
              switch (this.sub_category_index) {
                case 0:    // 全部商品
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
        this.show_loading();
        let entityDTO;
        if (this.current_prod_category_id == 0) {
          entityDTO = {
            entityDTO: {
              siteId: this.site_detail.siteId,
              productCategoryId: "",
              sex: this.sex !== undefined ? this.sex : undefined
            },
            pageDTO: this.pageDtoSetting
          };
        } else {
          entityDTO = {
            entityDTO: {siteId: this.site_detail.siteId, productCategoryId: this.current_prod_category_id},
            orderDTO: {propertyName: "sale_price_usd,original_price_usd"},
            pageDTO: this.pageDtoSetting
          };
        }
        fly.post("phantombuy/product/list", entityDTO).then((res) => {
          if (res.data.code === '1') {
            // 某类商品数据是否为空
            if (res.data.data.records.length > 0) {
              if (this.is_empty)    this.is_empty = !this.is_empty;
              if (this.is_end)       this.is_end = !this.is_end;
              for (let i = 0; i < res.data.data.records.length; i++) {
                this.product_detail_list.push(res.data.data.records[i]);
              }
            } else if (res.data.data.records.length == 0 && this.product_detail_list.length !== 0) {
              // 某类商品数据是否已加载到底部 & 当前商品列表不为空
              this.is_end = true;
              this.hide_loading();
              return
            }
            else {
              this.is_end = false;
              this.is_empty = true;
            }

            this.hide_loading();
          } else {
          }
        });
      },
      getAllProductList(){
        //  product_detail_list  置空
        this.product_detail_list = [];
        this.reset_page_dto();
        this.getProducts();
      },
      getSingleKindProductList(productCategory, index){
        this.previous_pro_cate_id = this.current_prod_category_id;
        this.current_prod_category_id = productCategory.productCategoryId;
        this.productCategoryName = productCategory.productCategoryName;
        this.product_detail_list = [];
        this.reset_page_dto();
        if (this.$refs.find.search_key !== "") {
          this.searchProductList();
        } else {
          this.getProducts();
        }

      },
      SearchProducts(category){
        // 站内搜索
        this.chooseSubCategory(undefined, category);
      },
      chooseSubCategory(item, index){
        this.sub_category_index = index;
        //this.product_category_id = this.index_initial;
        this.current_prod_category_id = 0;
        this.previous_pro_cate_id = 0;
        // this.reset_product_category_id();
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
            this.reset_aggregation_fn();
            this.reset_aggregation_value();
            this.searchProductList();
        }
      },
      searchProductList(){
        let entityDTO = {
          entityDTO: {   // 4个搜索关键字: siteId, searchKey, productCategoryName, productBrandName
            siteId: this.site_detail.siteId,
            searchKey: this.$refs.find.search_key !== undefined ? this.$refs.find.search_key : undefined,
            productCategoryName: this.productCategoryName || undefined,
            productBrandName: this.productBrandName || undefined
          },
          pageDTO: this.pageDtoSetting
        };
        fly.post("phantombuy/product/search", entityDTO).then(res => {
            if (res.data.code === '1') {

              this.is_aggregations = true;
              if (res.data.data.records.length > 0) {
                if (this.is_empty)    this.is_empty = !this.is_empty;
                if (this.is_end) this.is_end = !this.is_end;

                // 这里需要有一个聚类的设置
                // 聚类默认值
                if (res.data.aggregations !== undefined) {
                  let self = this;
                  if (self.product_brand_cn_list.length === 0) {
                    let product_brand_cn = res.data.aggregations.product_brand_cn;
                    Object.keys(product_brand_cn).forEach(function (key) {
                      if (key !== "") {
                        self.product_brand_cn_list.push({
                          name: key,
                          number: product_brand_cn[key]
                        })

                      }
                    });
                  }

                  if (self.product_category_name_list.length === 0) {
                    let product_category_name = res.data.aggregations.product_category_name;
                    Object.keys(product_category_name).forEach(function (key) {
                      if (key !== "") {
                        self.product_category_name_list.push({
                          name: key,
                          number: product_category_name[key]
                        })
                      }
                    });
                  }
                }

                for (let i = 0; i < res.data.data.records.length; i++) {
                  this.product_detail_list.push(res.data.data.records[i]);
                }
              } else if (res.data.data.records.length == 0 && this.product_detail_list.length !== 0) {
                this.is_end = true;
                this.hide_loading();
                return
              }
              else {
                this.is_end = false;
                this.is_empty = true;
              }

              this.hide_loading();
            } else {
              console.log('服务器内部错误');
            }
          }
        );
      },
      setProductCategoryName(item, index){
        this.productCategoryName = item.name;
        this.productBrandName = undefined;
        this.product_category_name_id = index;
        this.product_brand_cn_id = this.index_initial;
        this.product_detail_list = [];
        this.reset_page_dto();
        this.searchProductList();
      },
      setProductBrandName(item, index){
        this.productBrandName = item.name;
        this.productCategoryName = undefined;
        this.product_brand_cn_id = index;
        this.product_category_name_id = this.index_initial;
        this.product_detail_list = [];
        this.reset_page_dto();
        this.searchProductList();

      },
      loadReachBottomList(){
        //current_prod_categoryid: 0,
        // previous_pro_cate_id: 0
        if (this.current_prod_category_id != this.previous_pro_cate_id) {
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
      toProductDetail(productId, e){
        // 记录下当前 (x,y)坐标
        wx.navigateTo({
          url: '/pages/productDetail/main?productId=' + productId,
        });
      },
      toNextPage(){
        this.pageDtoSetting = this.pageDto.nextPage(this.pageDtoSetting);
      },
      show_loading(){
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading(){
        wx.hideLoading();
      },
      reset_product_category_id(){
        this.current_prod_category_id = 0;
        this.previous_pro_cate_id = 0;
      },
      reset_empty_end_data()
      {
        this.is_empty = false;
        this.is_end = false;
      },
      reset_page_dto(){
        this.pageDtoSetting = this.pageDto;
      },
      reset_subcategory_id(){
        this.sub_category_index = 0;
        this.sex = undefined;
      },
      reset_aggregation_fn(){
        this.product_brand_cn_list = [];
        this.product_category_name_list = [];
        //this.is_aggregations = false;
      },
      reset_aggregation_value(){
        this.product_brand_cn_id = this.index_initial;
        this.product_category_name_id = this.index_initial;
        this.productCategoryName = undefined;
        this.productBrandName = undefined;
        this.reset_page_dto();
      },
    },
  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
    /*overflow: hidden;*/
  }

  .swiper-home {
    width: 100%;
    height: 100%;
    padding: 10px 10px 3px 0.85rem;
    text-align: justify;
    word-break: break-all;
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
    font: 14px black;
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

  .select {
    width: 100%;
    padding: 0.5rem 0rem 0.15rem 0.75rem;
  }

  .select .ass_wrap {
    position: relative;
    _zoom: 1;
    /*font-weight: normal;*/
    font-size: 15px;
    display: flex;
    justify-content: flex-start;
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

  .text_decoration {
    text-decoration: line-through;
  }

  .section {
    width: 100%;
    padding-left: 0.25rem;
  }

  .loadmore {
    height: 100%;
    background-color: white;
    width: 100%;
  }

  .empty {
    text-align: center;
    background-color: white;
    height: 100%;
    width: 100%;
    z-index: 1000;
    padding-top: 2.00rem;
  }

  .aggregations_ul {
    display: flex;
    justify-content: space-between;
  }

  .aggregations {
    display: inline;
    min-width: 55px;
    text-align: left;
    font: 14px black;
    vertical-align: middle;
    line-height: 0.70rem;
    height: 0.70rem;
  }

  .aggregations_category_name {
    padding-right: 0.1rem;
  }

  .aggregations_brand_name {
    padding-right: 0.3rem;
  }

  .aggregations_product li:first-child {
    padding-right: 0rem;
  }

  .aggregations_product li:last-child {
    padding-right: 0.4rem;
  }

  .brand, .category {
    min-width: 1.3rem;
  }

  .subCategoryActivity, .product_aggregations_activity, .product_category_activity {
    color: #1890ff;
  }
</style>
