<template>
  <div class="animated fadeIn">
    <!--search是个组件-->
    <view class="section">
      <search></search>
    </view>

<<<<<<< HEAD

    <section class="sort_container">
      <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'food'}">全部商品</span>
            <!--SVG 是可缩放矢量图形 ， polygon 是一种颜色、渐变、填充等格式； -->
            <!--<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">-->
              <!--<polygon points="0,3 10,3 5,8"/>-->
            <!--</svg>-->
          </div>
        </div>

        <transition name="showlist" v-show="category">
          <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
            <section class="category_left">
              <ul>
                <li v-for="(item, index) in category" :key="index" class="category_left_li"
                    :class="{category_active:restaurant_category_id == item.id}"
                    @click="selectCategoryName(item.id, index)">
                  <section>
                    <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1"
                         class="category_arrow">
                      <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none"/>
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li v-for="(item, index) in categoryDetail" v-if="index" :key="index" class="category_right_li"
                    @click="getCategoryIds(item.id, item.name)"
                    :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>

        <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
          <div class="sort_item_container" @click="chooseType('food')">
            <div class="sort_item_border">
              <span :class="{category_title: sortBy == 'food'}">全部商品</span>
              <!--SVG 是可缩放矢量图形 ， polygon 是一种颜色、渐变、填充等格式； -->
              <!--<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">-->
                <!--<polygon points="0,3 10,3 5,8"/>-->
              <!--</svg>-->
            </div>
          </div>

          <transition name="showlist" v-show="category">
            <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
              <section class="category_left">
                <ul>
                  <li v-for="(item, index) in category" :key="index" class="category_left_li"
                      :class="{category_active:restaurant_category_id == item.id}"
                      @click="selectCategoryName(item.id, index)">
                    <section>
                      <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                      <span>{{item.name}}</span>
                    </section>
                    <section>
                      <span class="category_count">{{item.count}}</span>
                      <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1"
                           class="category_arrow">
                        <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none"/>
                      </svg>
                    </section>
                  </li>
                </ul>
              </section>
              <section class="category_right">
                <ul>
                  <li v-for="(item, index) in categoryDetail" v-if="index" :key="index" class="category_right_li"
                      @click="getCategoryIds(item.id, item.name)"
                      :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
                    <span>{{item.name}}</span>
                    <span>{{item.count}}</span>
                  </li>
                </ul>
              </section>
            </section>
          </transition>
        </div>
      </div>
    </section>

=======
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
    <!--商品种类-->
    <div class="swiper-home">
      <scroll-view class="scroll-view_x"
                   :scroll-x="true"
                   :style="'{width: auto;}'">
        <ul>
<<<<<<< HEAD
          <li class="site_product" v-for="(item, i) in site_product_male_category_list" :key="i"
              :class="{choose_category: is_active}"
              @click="getSingleKindProductList(item)">
=======
          <li class="site_product" v-for="(item, i) in site_product_category_list" :key="i">
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
            <span>{{item.productCategoryName}}</span></li>
        </ul>
      </scroll-view>


    </div>

<<<<<<< HEAD
    <div class="swiper-home">
      <scroll-view class="scroll-view_x"
                   :scroll-x="true"
                   :style="'{width: auto;overflow:hidden;height:20px;}'">
        <ul>
          <li class="site_product" v-for="(item, i) in site_product_female_category_list" :key="i"
              :class="{choose_category: is_active}"
              @click="getSingleKindProductList(item)">
            <span>{{item.productCategoryName}}</span></li>
        </ul>
      </scroll-view>
    </div>
    <!--商品列表-->
=======
    <!--该种类商品列表-->
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
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
        site_product_female_category_list: [],
        site_product_male_category_list: [],
        product_detail_list: [],
        detail: '12',
        has_border: true,
<<<<<<< HEAD
        site_detail: {},
        pageDto: new pageDTO(),
        pageDtoSetting: {},
        search: "搜索",
        current_prod_categoryid: 0,
        previous_pro_cate_id: 0,
        is_active: false
=======
        search_border: false
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
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
<<<<<<< HEAD
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
      getListSiteProductCategory() {
        this.show_loading();
        let entityDTO = {entityDTO: {siteId: this.site_detail.siteId}};
=======
    computed: {},
    methods: {
      getListSiteProductCategory(option) {
        let entityDTO = {entityDTO: option};
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
        fly.post('phantombuy/site/listSiteProductCategory', entityDTO).then((res) => {
          if (res.data.code === '1') {
            if (res.data.data.records.length > 0)   this.site_product_category_list = res.data.data.records;
            this.site_product_female_category_list = this.site_product_category_list.filter((item, i) => {
              return item.sex == 0;
            });

            this.site_product_male_category_list = this.site_product_category_list.filter((item, i) => {
              return item.sex == 1;
            });
          }
        });
      },
<<<<<<< HEAD
      // all 只负责: 首次加载 + 点击 服装分类按钮
      getAllProductList() {
        //  product_detail_list  置空
        this.product_detail_list = [];
        this.getProducts();
      },
      getSingleKindProductList(productCategory) {

        this.show_loading();
        this.previous_pro_cate_id = this.current_prod_categoryid;
        this.current_prod_categoryid = productCategory.productCategoryId;
        this.product_detail_list = [];
        this.pageDtoSetting = this.pageDto;
        this.is_active = true;

        this.getProducts();
      },
      loadReachBottomList(){
        //current_prod_categoryid: 0,       看这两个数据变化情况
        // previous_pro_cate_id: 0
        if (this.current_prod_categoryid != this.previous_pro_cate_id) {
          this.pageDtoSetting = this.pageDto;
          this.product_detail_list = [];
          this.getProducts();
        } else {
          this.getProducts();
        }
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

      toProductDetail(productId) {
=======
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
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
        wx.navigateTo({
          url: '/pages/productDetail/main?productId=' + productId,

        });
<<<<<<< HEAD
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
      // 关键字搜索
      SearchProducts(){
        console.log(this.$refs.find.search_key);
      },

    },
=======

//        wx.navigateTo({
//          url: '/pages/site/main'
//        })
      }
    }
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
  }
</script>

<style scoped>
  .animated {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
  }

  .sort_container {
    background-color: #fff;
    border-bottom: 0.025rem solid #f1f1f1;
    position: fixed;
    top: 1.95rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
  }

  .sort_container .sort_item {
    font-size: 0.55rem;
    color: #444;
    text-align: center;
    line-height: 1rem;
  }

  .sort_item_container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 14;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 0.3rem;
  }

  .sort_item_border {
    height: 1rem;
    border-right: 0.025rem solid #e4e4e4;;
  }

  .sort_icon {
    vertical-align: middle;
    transition: all 0.3s;
    fill: #666;
  }

  .choose_type .sort_item_container .category_title {
    color: #3190e8;
  }

  .choose_type .sort_item_container .sort_icon {
    transform: rotate(180deg);
    fill: #3190e8;
  }

  .swiper-home {
    width: 100%;
    height: 15%;
<<<<<<< HEAD
    /*padding: 20px 10px 0px 0px;*/
=======
    padding: 10px 10px 5px 0px;
>>>>>>> bd7a3c24ee4d07d71e79b1415e3e6f445d1194fd
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

  .choose_category {
    background-color: red;
  }

</style>

