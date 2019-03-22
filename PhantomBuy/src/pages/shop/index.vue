<template>
  <!--这个是横向滚动条设置-->
  <div class="animated fadeIn">
    <view class="scroll_box">
      <view class="section__title">vertical scroll</view>
      <scroll-view class="scroll-view_x"
                   :scroll-x="true"
                   :style="'{width: auto;overflow:hidden}'">
        <view class="item_list" v-for="(items, i) in brand_list" :key="i">
          <span>{{items.name}}</span>
        </view>
      </scroll-view>
    </view>

  </div>


</template>

<script type="text/ecmascript-6">
  import {brand_list} from "../../common/constants/test_data";
  export default {
    data() {
      return {
        toView: "red",
        scrollTop: 100,
        brand_list: []
      };
    },
    onLoad(){
    },
    onShow(){
    },
    created() {
      this.brand_list = brand_list;
  }
  }
</script>

<style>
  .scroll_box {
    width: 100%;
    height: 307 rpx;
    overflow: hidden;
    padding: 20 rpx;
    background: #fff;
    white-space: nowrap;
  }

  .item_list {
    width: 160 rpx;
    height: auto;
    margin-right: 23 rpx;
    display: inline-block;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>

