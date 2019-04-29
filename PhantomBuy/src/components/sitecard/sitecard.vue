<template>
  <div class="animated fadeIn">
    <view class="site">
      <view class="site_baseinfo">
        <view class="site_img_section">
          <image :src="item.siteLogoUrl" class="site_img"/>
        </view>
        <view class="site_right">
          <header class="site_detail_header">
            <h5 class="site_title ellipsis">{{item.brandNameCh}}</h5>
          </header>
          <!--<view class="rating_order_num">-->
          <!--<div class="rating_order_num_right">-->
          <!--<strong class="delivery_style delivery_left" v-if="site_promotion !== undefined">{{site_promotion.promotionCategoryName}}:-->
          <!--{{site_promotion.sitePromotionName}}</strong>-->
          <!--<strong class="delivery_style delivery_left" v-if="site_promotion === undefined"></strong>-->
          <!--</div>-->
          <!--</view>-->
        </view>
      </view>

      <view class="site_discount">
        <div class="fee" v-if="site_promotion_list.length >0" v-for="(item, i)  in site_promotion_list" :key="i">
          <div class="promotion_name">
            {{item.promotionCategoryName}}
          </div>
          <div class="promotion_detail">
            {{item.sitePromotionName}}
          </div>

        </div>
      </view>
    </view>

    <!--显示相应图片-->

  </div>
</template>
<!--站点基本信息-->
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        site_promotion_list: [],
      };
    },
    props: {
      item: {
        type: Object

      },
    },
    onLoad(){
      this.showPromotionMessage();
    },
    created(){
      //console.log(this.$props.item);
    },
    methods: {
      showPromotionMessage(){
        if (this.$props.item.sitePromotionList.length > 0) {
          this.site_promotion_list = this.$props.item.sitePromotionList;

          let first_site_promotion = this.site_promotion_list[0];
          this.site_promotion_list = this.site_promotion_list.filter((item, index) => {
            return first_site_promotion.promotionCategoryName != item.promotionCategoryName;
          });
          this.site_promotion_list.push(first_site_promotion);

        }

      }

//        console.log(this.site_promotion);
//        console.log(this.site_promotion === undefined);
    }

  }
</script>

<style>
  font {
    font-size: 13px;
  }

  .site {
    border-bottom: .025rem solid #f1f1f1;
    padding: 0.2rem 0.2rem;

    width: 100%;
  }

  .site_baseinfo {
    display: flex;
    padding: 0.2rem 0.4rem 0.1rem 0.1rem;
  }

  .site_img_section {
    padding: 0;
    margin-top: 0.1rem;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    height: 10%;
    width: 40%;

  }

  .site_img {
    /*1rem = 100 rpx;*/
    width: 1.1rem;
    height: 0.5rem;
    display: block;
    margin-right: .5rem;
    padding-left: 0.1rem;
  }

  .site_right {
    flex: auto;
  }

  .site_detail_header {
    display: flex;
    align-items: center;
    height: 0.6rem;
    line-height: 0.6rem;
  }

  .site_title {
    width: 5.5rem;
    color: #333;
    padding-top: .01rem;
    font-weight: 500;
    /*//font-family:"Microsoft Yahei";*/
  }

  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site_right .rating_order_num {
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: .6rem;

  }

  .site_right .rating_order_num .rating_order_num_right {
    display: flex;
    /*-ms-flex-align: center;*/
    /*align-items: center;*/
    transform: scale(.8);
    /*min-width: 5rem;*/
    /*-ms-flex-pack: end;*/
    /*justify-content: flex-end;*/
    /*margin-right: -.8rem;*/
    position: relative;
    left: -15px;;
  }

  .site_discount {
    flex: auto;
    witdh: 100%;
    min-height: 1.0rem;
    /*height: 10%;*/
  }

  .site_discount .fee {
    display: flex;
    padding-left: .2rem;
    font-size: .23rem;
    color: black;
    flex-direction: row;
    justify-content: space-between;
  }

  .site_discount .fee .promotion_name {
    width: 20%;
    height: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }

  .site_discount .fee .promotion_detail {
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }


</style>
