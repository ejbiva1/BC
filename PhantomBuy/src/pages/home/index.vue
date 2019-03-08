<template>
  <div class="animated fadeIn">
    <view class="section">
      <view class="flex-wrp" >
        <view class="flex-item bc_shop" :class="{navigate_active: isSite}" @click="showSiteList">折扣</view>
        <view class="flex-item bc_brand" :class="{navigate_active: !isSite}" @click="showBrands">全部</view>
      </view>
    </view>


    <view>
      <view v-for="(items,i) in site_list" :key="i" @click="toSite">
        <site-card v-bind:item="items"></site-card>
      </view>
    </view>

    <!--页面跳转，注意是普通跳转navigateTo还是底部导航跳转 switchTab  -->

  </div>
</template>

<!--小程序主页， 主站点-->
<script type="text/ecmascript-6">
  import sitecard from "../../components/sitecard/sitecard";
  import {brand_list} from "../../common/constants/test_data";
  import  fly from "../../utils/fly";
  export default {
    data() {
      return {
        site_list: [],
        isSite: true,
        brand_list: []
      };
    },
    components: {
      'site-card': sitecard
    },
    created() {
      //this.brand_list = brand_list;
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
          if (res.data.code === '1') {

            if (res.data.data.records.length > 0) this.site_list = res.data.data.records;
          } else {
            // api error alert
          }

        });
      },
      toSite(){   // 进入某一站点，购买商品
        wx.navigateTo({
          url: '/pages/site/main'
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
  .animated{
    background-color: #F7F7F7;
    font-family:"Microsoft Yahei";
  }
  .flex-wrp {
    display: flex;
    align-items: center;
    /*justify-content: center; !*设置 view 水平居中*!*/
    width: 100%;
    padding-left: 20rpx;
  }

  .bc_shop {
    background-color: #eaeaea;
    width: 100px;
    height: 30px;
    border-radius: 2px;
    text-align: center;
    font-size: 20px;
    border: 1px solid black;
  }

  .bc_brand {
    background-color: #eaeaea;
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    border: 1px solid black;
  }

  .navigate_active {
    background: #666666;
    color: white;
    border-radius: 2px;

  }
</style>

