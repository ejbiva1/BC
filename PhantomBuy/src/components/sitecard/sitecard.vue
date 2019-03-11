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
          <view class="rating_order_num">
            <div class="rating_order_num_right">
              <strong class="delivery_style delivery_left">免运策略:满100免运</strong>
            </div>
          </view>
        </view>
      </view>

      <view class="site_discount">
        <p class="fee">
          25%off,Coupon Code VES25.Free Shipping with $99 purchase + Free Store Pickup
        </p>

      </view>
    </view>

    <!--显示相应图片-->

  </div>
</template>
<!--站点基本信息-->
<script type="text/ecmascript-6">
  export default {
    data(){
      return {};
    },
    props: {
      item: {
        type: Object

      },
    },
    onLoad(){
    },
    created(){
      //console.log(this.$props.item);
    }
  }
</script>

<style scoped>
  font {
    font-size: 15px;
  }

  .site {
    border-bottom: .025rem solid #f1f1f1;
    padding: 0.2rem 0.2rem;
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
  }

  .site_title {
    width: 5.5rem;
    color: #333;
    padding-top: .01rem;
    font: .40rem/.40rem Microsoft Yahei;
    font-weight: 500;
    /*//font-family:"Microsoft Yahei";*/
  }

  .ellipsis {
    overflow: hidden;
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
    height: 10%;
  }

  .site_discount .fee {
    display: flex;
    padding-left: .2rem;
    font-size: .25rem;
    color: black;
  }

</style>

