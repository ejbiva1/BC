<template xmlns="http://www.w3.org/1999/xhtml">
  <view>
    <view class="site">
      <view class="site_name">
        <span>{{site_name}}</span>
      </view>
      <view class="search-wrap">
        <wxc-search class="search"
                    v-bind:show-icon="show_icon"
                    v-bind:bg-color="bg_color"
                    v-bind:button="search"
                    v-bind:btn-color="btn_color"
                    bind:input="onInput"
                    bind:submit="submitForm"
                    bind:confirm="onConfirm"
        ></wxc-search>
      </view>
    </view>

    <view class="site_bonus">
      <text style="font-size: 13px;"> 站点优惠:FREE SHIPPING ON U.S. ORDERS OVER $100</text>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
  export default {
    title: 'search',
    data() {
      return {
        site_name: 'Tommy Hilfiger',
        search: "搜索",
        show_icon: false,
        bg_color: '#fff',
        btn_color: '#2CB42F'
      };
    },
    onLoad() {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .site {
    display: flex;
    width: 100%;
  }

  .site .site_name {
    width: 31%;
    display: flex;
    font: 13px black;
    line-height: 40px;
    padding: 0.10rem 0.1rem 0.1rem 0.15rem;
  }

  .search-wrap {
    display: flex;
    align-items: center;
    width: 70%;
    height: 0.9rem;
    color: #fff;
    background: #f6f6f6;
  }

  .search {
    flex: 1;
    margin-left: 0.14rem;
  }

  .site_bonus {
    width: 100%;
    height: 3%;
    padding-left:0.15rem;
  }
</style>

