<template xmlns="http://www.w3.org/1999/xhtml">
  <view>
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

    <view class="site_bonus" v-if="site !== undefined">
      <div class="fee" v-if="site_promotion_list.length >0" v-for="(item, i)  in site_promotion_list" :key="i">
        <div class="promotion_name">
          {{item.promotionCategoryName}}
        </div>
        <div class="promotion_detail">
          {{item.sitePromotionName}}
        </div>

      </div>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
  export default {
    title: 'search',
    data() {
      return {
        search: "搜索",
        show_icon: false,
        bg_color: '#fff',
        btn_color: '#2CB42F',
        site_promotion_list: [],
        search_key: ''
      };
    },
    props: {
      site: {
        type: Object
      }
    },
    onLoad() {
      this.showPromotionMessage();
    },
    methods: {
      showPromotionMessage(){
        if (this.$props.site.sitePromotionList.length > 0) {
          this.site_promotion_list = this.$props.site.sitePromotionList;
        }
      },
      search_products() {
        this.$emit("search");
      }
    }
  }
</script>

<style>
  .site {
    display: flex;
    width: 100%;
    justify-content: space-between;
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
    width: 75%;
  }

  .search__button {
    width: 1.20rem;
    height: 0.60rem;
    line-height: 0.60rem;
    font-size: 0.28rem;
    overflow: hidden;
    background: #f6f6f6;
    /*padding-left: 0.3rem;*/
    padding-right: 0;
    display: flex;
    vertical-align: top;
  }

  .search__button::after {
    border: none;
  }

  .site_bonus {
    width: 100%;
    height: 3%;
    padding-left: 0.15rem;
  }

  .site_bonus .fee {
    display: flex;
    flex-direction: row;
    font-size: .25rem;
  }

  .fee .promotion_name {
    width: 20%;
    height: 0.5rem;
  }

  .fee .promotion_detail {
    width: 80%;
    height: 0.5rem;
    display: flex;
    flex-wrap: nowrap;
  }
</style>

