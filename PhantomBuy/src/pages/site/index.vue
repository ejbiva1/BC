<template>
  <div class="animated fadeIn">
    <view class="section">
      <view class="flex-wrp" style="flex-direction:row;">
        <view class="flex-item bc_shop" :class="{navigate_active: isSite}" @click="showSiteList">商家</view>
        <view class="flex-item bc_brand" :class="{navigate_active: !isSite}" @click="showBrands">品牌</view>
      </view>
    </view>


    <view>
      <view v-for="(items,i) in brand_list" :key="i">
        <shop-card v-bind:item="items"></shop-card>
      </view>
    </view>

    <!--页面跳转，注意是普通跳转navigateTo还是底部导航跳转 switchTab  -->
    <view>
      <div @click="toShop">嗨</div>

    </view>

  </div>
</template>

<!--商家-->
<script type="text/ecmascript-6">
  import shopcard from "../../components/shopcard/shopcard";
  import {brand_list} from "../../common/constants/test_data";
  import  fly from "../../utils/fly";
  export default {
    data() {
      return {
        brand_list: [],
        isSite: true
      };
    },
    components: {
      'shop-card': shopcard
    },
    created() {
      this.brand_list = brand_list;
      this.getSiteList();
    },
    computed: {},
    methods: {
      getSiteList() {
        let query_dto = {
          entityDTO: {},
          orderDTOs: [{}],
          pageDTO: {pageNo: 0, pageSize: 0}
        };

        fly.post("phantombuy/site/list", query_dto).then((res) => {
          // call api success
         if(res.data.code === '1'){
           console.log(res);
         }else {
            // api error alert
         }

        });
      },
      toShop(){
        wx.navigateTo({
          url: '/pages/shop/main'
        })
      },
      showSiteList() {
        if (!this.isSite) this.isSite = true;
        console.log("Site List Show");
      },
      showBrands() {
        if (this.isSite) this.isSite = false;
        console.log("Brand List Show");
      }
    }
  }
</script>

<style scoped>

  .flex-wrp {
    display: flex;
    align-items: center;
    justify-content: center; /*设置 view 水平居中*/
    width: 100%;
  }

  .bc_shop {
    background-color: #eaeaea;
    width: 140px;
    height: 40px;
    border-radius: 2px;
    text-align: center;
    font-size: 23px;
  }

  .bc_brand {
    background-color: #eaeaea;
    width: 140px;
    height: 40px;
    text-align: center;
    font-size: 23px;
  }

  .navigate_active {
    background: rgba(0, 0, 0, 0.65);
    color: white;
    border-radius: 2px;

  }
</style>

