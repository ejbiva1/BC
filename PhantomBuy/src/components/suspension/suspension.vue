<template>
  <div class="animated fadeIn">
    <view class="firstView suspension" @click="gotoCarts">
      <view>
        <wxc-icon size="70" type="cart" color="#f50"></wxc-icon>
      </view>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    methods: {
      gotoCarts(){
        // 跳转至购物车页面
        this.$emit('toCart');
      }
    }
  }
</script>

<style>

  .suspension {
    left: 81%;
    top: 75%;
  }

  .firstView {
    position: fixed;
    height: 0.70rem;
    width: 0.70rem;
    padding: 0.27rem;

    /*-background-color: #eee; */
    border-radius: 50%;
    background-color: #F7F7F7;
  }

  .kehuImg {
    height: 0.70rem;
    width: 0.70rem;
  }
</style>

