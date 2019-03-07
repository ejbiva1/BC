<template>
  <div class="animated fadeIn">
    <view class="site_product_detail">
      <view class="first-face face">

      </view>
      <view class="second-face face">

      </view>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped>
  /**index.wxss**/
  .site_product_detail {
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    flex-wrap: wrap;
    align-content: center;
    font-family: 'Open Sans', sans-serif;

    background: linear-gradient(top, #222, #333);
  }

  .first-face {
    display: flex;
    /* justify-content: center;
    align-items: center; */
  }

  .second-face {
    display: flex;
    /* justify-content: space-between; */
  }

  .face {
    margin: 16px;
    padding: 4px;

    background-color: #e7e7e7;
    width: 104px;
    height: 104px;
    object-fit: contain;

    box-shadow: inset 0 5px white,
    inset 0 -5px #bbb,
    inset 5px 0 #d7d7d7,
    inset -5px 0 #d7d7d7;

    border-radius: 10%;
  }
</style>

