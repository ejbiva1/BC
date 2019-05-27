<template>
  <div class="animated fadeIn">
    <!--<view class="section">-->
    <!--<view class="flex-wrp">-->
    <!--<view class="flex-item site_bonus" :class="{navigate_active: isSite}" @click="showDiscountSiteList">折扣</view>-->
    <!--<view class="flex-item site_all" :class="{navigate_active: !isSite}" @click="showAllSites">全部</view>-->
    <!--</view>-->
    <!--</view>-->

    <view class="site_section">
      <view v-for="(items,i) in display_site_list" :key="i" @click="toSite(items)">
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
        display_site_list: [],
        isSite: true,
        brand_list: [],
        is_show: true,
        is_loading: false,
        site_list: []

      };
    },
    components: {
      'site-card': sitecard,
    },
    created() {
    },
    onLoad(){
      this.show_loading();
      this.getSiteList();
      console.log(getCurrentPages());
    },
    computed: {},
    /**
     * 进行页面分享
     */
    onShareAppMessage: function (options) {
      if (options.from === 'button') {
        // 来自页面内转发按钮
        console.log(options.target)
      }
      return {
        //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
//        path: 'pages/index/index',
        success: function (res) {
          //这是我自定义的函数，可替换自己的操作
        },
        //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
        fail: function () {
        }
      }
    },
    methods: {
      getSiteList() {
        this.show_loading();
        let query_dto = {
          entityDTO: {},
          orderDTOs: [{}],
          pageDTO: {pageNo: 0, pageSize: 0}
        };

        fly.post("phantombuy/site/list", query_dto).then((res) => {
          if (res.data.code === '1') {
            if (res.data.data.records.length > 0) this.display_site_list = res.data.data.records;
            this.hide_loading();
          } else {
            this.hide_loading();
          }

        });
      },
      toSite(single_site){
        //// 进入某一站点，购买商品
        //url: '/pages/test/test?dataObj='+JSON.stringify(this.data.dataObj)
        if (single_site !== undefined) {
          wx.navigateTo({
            url: '/pages/site/main?site=' + JSON.stringify(single_site)
          })
        }


      },
      showDiscountSiteList() {
        if (!this.isSite) this.isSite = true;
        this.display_site_list = this.sitePromotionList(this.site_list, true);

      },
      showAllSites() {
        if (this.isSite) this.isSite = false;
        this.display_site_list = this.sitePromotionList(this.site_list, false);
      },
      show_loading() {
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading(){
        wx.hideLoading();
      },
      sitePromotionList(site_list, is_promote){
        // 没有优惠

        let promotion_site_list = [];
        if (!is_promote) {
          promotion_site_list = site_list.filter((item, i) => {
            return item;
          });

        }


        // 有优惠
        if (is_promote) {
          promotion_site_list = site_list.filter((item, i) => {
            return item.sitePromotionList.length > 0;
          });

        }
        return promotion_site_list;
      }
    }
  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
  }

  .section {
    width: 100%;
    /*padding-left: 2%;*/
  }

  .site_section {
    width: 100%;
    /*padding-left: 2%;*/
  }

  .site_bonus {
    background-color: #eaeaea;
    width: 70px;
    height: 30px;
    /*border-radius: 2px;*/
    text-align: center;
    border: 1px solid black;
    line-height: 30px;
    vertical-align: middle;
  }

  .site_all {
    background-color: #eaeaea;
    width: 70px;
    height: 30px;
    text-align: center;
    border: 1px solid black;
    line-height: 30px;
  }

  .navigate_active {
    background: #666666;
    color: white;
    border-radius: 2px;

  }
</style>
