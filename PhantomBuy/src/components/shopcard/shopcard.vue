<template>
  <div class="animated fadeIn">
    <view class="site_baseinfo">
      <view class="site_img_section">
        <image :src="item.src" class="site_img"/>
      </view>
      <view class="site_right">
        <header class="site_detail_header">
          <h4 class="site_title ellipsis">{{item.name}}</h4>
        </header>
      </view>

    </view>


    <!--显示相应图片-->

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {};
    },
    props: {
      item: {
        type: Object

      },
    }
  }
</script>

<style scoped>
  font {
    font-size: 15px;
  }

  .site_baseinfo {
    display: flex;
    border-bottom: .025rem solid #f1f1f1;
    padding: .4rem .2rem;
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

</style>

