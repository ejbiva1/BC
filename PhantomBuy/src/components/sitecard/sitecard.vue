<template>
  <div class="animated fadeIn">
    <view class="site">
      <view class="site_baseinfo">
        <view class="site_img_section">
          <image :src="item.siteLogoUrl" class="site_img"/>
        </view>
        <view class="site_right">
          <header class="site_detail_header">
            <h4 class="site_title ellipsis">{{item.brandNameCh}}</h4>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_right">
              <strong class="delivery_style delivery_left">免运策略:</strong>
              <!--<span class="delivery_style delivery_right">{{item.brandNameCh}}</span>-->
              <span class="delivery_style delivery_right">满100免运</span>
            </section>
          </h5>


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
    padding: 0.4rem 0.2rem;
  }

  .site_baseinfo {
    display: flex;
    padding:  0.4rem 0.2rem;
  }

  .site_img_section {
    padding: 0;
    margin: 0;
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
  }

  .site_img {
    /*1rem = 100 rpx;*/
    width: 1.1rem;
    height: 1.1rem;
    display: block;
    margin-right: .5rem;
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
    font: .40rem/.40rem PingFangSC-Regular;
    font-weight: 500;
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
    margin-top: .52rem;
  }

  .site_right .rating_order_num .rating_order_num_right {
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    transform: scale(.7);
    min-width: 5rem;
    -ms-flex-pack: end;
    justify-content: flex-end;
    margin-right: -.8rem;
  }

  .site_right .rating_order_num .rating_order_num_right .delivery_left {
    color: #fff;
    background-color: #3190e8;
    border: .025rem solid #3190e8;
  }

  .site_right .rating_order_num .rating_order_num_right .delivery_right {
    color: #3190e8;
    border: .025rem solid #3190e8;
  }

  .site_right .fee_distance {
    margin-top: .52rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: .5rem;
    color: #333;
  }

  .site_discount {
    flex: auto;
    witdh: 100%;
    height: 20%;
  }

  .site_discount  .fee {
    display: flex;
    padding-left:  .2rem;
    font-size: .3rem;
    color: black;
  }

</style>

