<template>
  <div>
    <div class="product_tabs">
      <div class="product_tabsNav">
        <view :class="{'selected':tab === index,'product_tabs_active':true}"
              @click="changTab(index)" v-for="(item,index) in tab_names" :key="index">
          {{item.name}}
        </view>
      </div>
    </div>
    <div class="tabs_container" v-if="unused_coupon_list.length !==0">
      <div v-if="tab===0">

        <!--<view v-for="(item, index) in unused_coupon_list" :key="index">-->

        <!--</view>-->
      </div>
      <div v-else-if="tab===1">
        <!--<view v-for="(item, index) in used_coupon_list">-->

        <!--</view>-->
      </div>
      <div v-else="tab===2">
        <!--<view v-for="(item, index) in expired_coupon_list">-->

        <!--</view>-->
      </div>
    </div>

    <view class="no_coupon">
      <view class="no_coupon_img">
        <img src="/static/images/ticket_coupon.png">
      </view>
      <view class="no_coupon_text">还没有优惠券~</view>
    </view>


  </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import {TabsConstants} from "../../common/constants/tabs-constants";
  export default {
    data(){
      return {
        tab: 0,
        tab_names: [
          {"name": '未使用'},
          {"name": '已使用'},
          {"name": '已过期'}
        ],
        tab_list: [],
        unused_coupon_list: [],
        expired_coupon_list: [],
        used_coupon_list: []

      };
    },
    props: {
      tab_category: {
        type: String
      }
    },
    onShow() {
      this.showTab();
      //console.log(this.tab_names);
    },
    methods: {
      changTab(index) {
        this.tab = index;
      },
      showTab(){
        switch (this.$props.tab_category.toLowerCase()) {
          case 'coupon':
            this.tab_names = TabsConstants.couponTabConstants;
            break;
        }
      }

    }
  }
</script>

<style scoped>
  .product_tabs {
    width: 100%;
    height: 15%;
  }

  .product_tabs .product_tabsNav {
    padding-left: 0.2rem;
    line-height: 0.8rem;
    display: flex;

  }

  .product_tabs .product_tabs_active {
    flex: 1;
  }

  .product_tabsNav .selected {
    color: #87caee;
    border-bottom: 1px solid #87caee;
  }

  .tabs_container {
    position: relative;
    /*top: 50%;*/
    width: 90%;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    padding-left: 0.3rem;
    height: 75%;
  }

  .no_coupon {
    text-align: center;
    background-color: white;
    height: 100%;
    width: 100%;
    z-index: 1000;
    padding-top: 2.00rem;
  }

  .no_coupon_text {
    text-align: center;
  }

  .no_coupon_img img {
    width: 1.0rem;
    height: 1.0rem;
  }
</style>

