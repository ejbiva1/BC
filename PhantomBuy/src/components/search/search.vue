<template xmlns="http://www.w3.org/1999/xhtml">
  <view class="search_component">
    <view class="site">
      <view class="search-wrap">
        <view class="search_form" style="border-radius:2px; background: #fff;">
          <input class="search_input" placeholder="搜索" style="color: #333; " v-model="search_key"/>
        </view>
      </view>
      <view style="border-radius:2px; " class="search-button-wrap">
        <button class="search__button" :class="{search__button_active: press_search_button_index == 0 }"
                @click="search_products(0)">搜索本站
        </button>
        <button class="search__button" :class="{search__button_active: press_search_button_index == 1 } "
                @click="search_products(1)">搜索全站
        </button>
      </view>
    </view>

    <view class="site_bonus" v-show="site_promotions.length !==0">
      <div class="fee" v-for="(item, i)  in site_promotions" :key="i">
        <!--<div class="promotion_name">-->
        <!--{{item.promotionCategoryName}}-->
        <!--</div>-->
        <div class="promotion_detail">
          {{item.promotionCategoryName}}:
          {{item.sitePromotionName}}
        </div>

      </div>
    </view>

    <view class="toast">
      <wxc-toast :is-show="toast.show_toast"
                 :text="toast.msg"
                 :icon="toast.icon_type"
                 icon-color="#ff5777"></wxc-toast>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
  import {common} from "../../utils/common";
  export default {
    title: 'search',
    data() {
      return {
        show_icon: false,
        bg_color: '#fff',
        btn_color: '#2CB42F',
        site_promotion_list: [],
        search_key: "",
        toast: {},
        active: true,
        press_search_button_index: 0
      };
    },
    props: {
      site_promotions: {
        type: Object
      }
    },
    onLoad() {
      this.search_key = "";
      this.showPromotionDetail();
    },
    methods: {
      showPromotionDetail(){

      },
      search_products(press_button_index) {
        this.press_search_button_index = press_button_index;
        if (this.search_key === "") {
          let self = this;
          self.toast = common.showErrorMsg('请输入关键字!');
          setTimeout(function () {
            self.toast.show_toast = false;
          }, 1500);
          return
        } else {
          this.$emit("search", 3);
        }
      },
      showMsg(){
        this.toast = common.show
      }
    }
  }
</script>

<style>

  .search_component {
    padding-left: 0.25rem;
    width: 100%;
  }

  .site {
    display: flex;
    padding-bottom: 0.2rem;
    padding-top: 0.3rem;
    /*justify-content: flex-start;*/
  }

  .site .site_name {
    width: 30%;
    display: flex;
    font: 13px black;
    line-height: 40px;
    padding: 0.10rem 0.1rem 0.1rem 0rem;
    text-align: left;
  }

  .search-wrap {
    display: flex;
    align-items: center;
  }

  .search_form {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    min-width: 0.31rem;
    height: 0.60rem;
    overflow: hidden;
  }

  .search_input {
    /*flex: 1;*/
    height: 0.60rem;
    padding: 0 0.16rem;
    font-size: 14px;
    background: #fff;
    width: 100%;
  }

  .search-button-wrap {
    display: flex;
    align-items: center;
  }

  .search__button {
    height: 0.60rem;
    line-height: 0.60rem;
    font-size: 14px;
    overflow: hidden;
    border-radius: 0px;
    padding-left: 0.08rem;
    padding-right: 0.08rem;
    /*background: #f5f5f5;*/
    border-color: #d9d9d9;
  }

  .search__button_active {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }

  .search__button::after {
    border: none;
  }

  .site_bonus {
    width: 100%;
    padding: 0.1rem 0.1rem 0.2rem 0rem;
  }

  .site_bonus .fee {
    /*display: flex;*/
    /*flex-direction: row;*/
    font-size: 13px;
    text-align: justify;
  }

  .fee .promotion_name {
    width: 18%;
    /*padding-top: 0.1rem;*/
    padding-bottom: 0.1rem;
  }

  .fee .promotion_detail {
    width: 95%;
    flex-wrap: nowrap;
    padding-bottom: 0.3rem;
    height: 100%;
    display: inline-block;
    text-align: justify;
    /*word-break: break-all;*/
  }

  input {
    width: 4.2rem;
  }
</style>
