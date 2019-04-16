<template xmlns="http://www.w3.org/1999/xhtml">
  <view class="search_component">
    <view class="site">
      <view class="site_name" v-if="site !== undefined">
        <span>{{site.brandNameCh}}</span>
      </view>
      <view class="search-wrap" v-if="site !== undefined">
        <view class="search">
          <view class="search">
            <view class="search_form search_content_left" style="border-radius:2px; background: #fff;">
              <input class="search_input" placeholder="搜索" style="color: #333;" v-model="search_key"/>
              <button class="search__button" style="color: #2CB42F" @click="search_products">搜索本站</button>
            </view>

          </view>
        </view>

      </view>
    </view>

    <view class="site_bonus"  v-show="site.sitePromotionList.length >0">
      <div class="fee" v-for="(item, i)  in site.sitePromotionList" :key="i">
        <div class="promotion_name">
          {{item.promotionCategoryName}}
        </div>
        <div class="promotion_detail">
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
        search_key: '',
        toast: {}
      };
    },
    props: {
      site: {
        type: Object
      }
    },
    onLoad() {
      this.search_key = "";
    },
    onShow(){
    },
    methods: {
      search_products() {
        if (this.search_key == "" || this.search_key === undefined) {
          let self = this;
          self.toast = common.showErrorMsg('请输入关键字!');
          setTimeout(function () {
            self.toast.show_toast = false;
          }, 1500);
          return
        } else {
          this.$emit("search");
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
    padding-left: 0.15rem;
    width: 100%;
  }

  .site {
    display: flex;
    justify-content: flex-start;
  }

  .site .site_name {
    width: 30%;
    display: flex;
    font: 13px black;
    line-height: 40px;
    padding: 0.10rem 0.1rem 0.1rem 0rem;
    /*left: 0%;*/
    /*position: relative;*/
    text-align: left;
  }

  .search-wrap {
    display: flex;
    align-items: center;
    width: 70%;
    height: 0.9rem;
    background: #f6f6f6;
  }

  .search {
    flex: 1;
    margin-left: 0.14rem;
    align-items: center;
    min-width: 5.1rem;
    height: 0.6rem;
    overflow: hidden;
  }

  .search_content_left {
    justify-content: flex-start;
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
    flex: 1;
    min-width: 2.76rem;
    height: 0.60rem;
    padding: 0 0.16rem;
    font-size: 0.28rem;
    color: #333;
    overflow: hidden;
    vertical-align: top;
    background: #fff;
    width: 65%;
  }

  .search__button {
    width: 1.75rem;
    height: 0.60rem;
    line-height: 0.60rem;
    font-size: 0.28rem;
    overflow: hidden;
    background: #f6f6f6;
    padding-right: 0;
    display: flex;
    vertical-align: top;
  }

  .search__button::after {
    border: none;
  }

  .site_bonus {
    width: 100%;
    padding: 0.1rem 0.1rem 0.2rem 0rem;
    /*height: 3%;*/
  }

  .site_bonus .fee {
    display: flex;
    flex-direction: row;
    font-size: 13px;
  }

  .fee .promotion_name {
    width: 20%;
  }

  .fee .promotion_detail {
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
  }
</style>
