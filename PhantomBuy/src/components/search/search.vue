<template>
  <div>
  <div class="heard">
    <div class="heard-location" @click="searchAddress">
      <image src="/static/images/location.png" class="heard-location-icon"/>
      <text class="heard-location-text">{{location}}</text>
    </div>
    <div class="heard-search">
      <image src="/static/images/search.png" class="heard-search-icon"/>
      <span class="text">小龙虾</span>
    </div>
  </div>
    <view class="site_bonus">
      <text style="font-size: 14px;"> 站点优惠:FREE SHIPPING ON U.S. ORDERS OVER $100 </text>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      title: 'search',
      onLoad() {

      },
      methods: {
        searchAddress() {
          wx.chooseLocation()
        }
      }
    }
</script>

<style scoped>
  .heard{
    justify-content: space-around;
    display: flex;
    width: 100%;
    height: 80rpx;
    background: #FFC640;
  }

  .heard   .heard-location{
    position :relative;
    font-size: 25rpx;
    padding:5rpx 15rpx;
    margin: 10rpx;
    width: 250rpx;
    height: 40rpx;
    line-height: 40rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    background: #B38B2D;
    color: white;
    border-radius: 20rpx;
  }

  .heard .heard-location-icon{
    position: absolute;
    top: 12rpx;
    height: 25rpx;
    width: 25rpx;
  }

  .heard  .heard-location-text{
    left :47rpx;
    height: 30rpx;
    width: 190rpx;
    padding-left: 30rpx;
  }

  .heard-search{
    font-size: 25rpx;
    padding: 5rpx 15rpx;
    margin: 10rpx;
    height: 40rpx;
    width: 400rpx;
    background: white;
    border-radius: 20rpx;
    line-height: 40rpx;
  }

  .heard-search .text {
    padding-left: 10rpx;
    color: #ccc;
  }

  .heard-search .heard-search-icon {
    height: 21rpx;
    width: 21rpx;

  }

  .site_bonus{
    width: 100%;
    height: 3%;
  }


</style>

