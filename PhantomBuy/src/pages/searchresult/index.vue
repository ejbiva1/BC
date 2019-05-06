<template>
  <div class="search">
    <view class="search_">
      <search v-bind:site_promotions="promotion_list" @search="SearchProducts" ref="search">
      </search>

      <!--显示本站地址-->


    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  import search from "../../components/search/search";
  import fly from "../../utils/fly";
  export default {
    data(){
      return {
        promotion_list: [],
        siteId: undefined,
        site_detail: undefined
      };
    },
    components: {
      'search': search
    },
    onLoad(options){
      if (options.site_id !== undefined) {
        this.siteId = options.site_id;  //site_id
        console.log(this.siteId);
        this.getSiteDetail();
      }
    },
    methods: {
      // 站内搜索
      SearchProducts(){

      },
      getSiteDetail(){
        let entityDTO = {
          entityDTO: {siteId: this.siteId}
        };

        fly.post("phantombuy/site/get", entityDTO).then(res => {
          if (res.data.code === '1') {
            this.site_detail = res.data.data;
          } else {
            console.log("服务器内部错误");
          }

          // http://www.phantombuy.com/phantombuy/product/search   search 走的程序
        });


      }


    }
  }
</script>

<style>
  .search {
    background-color: #F7F7F7;
    font-family: "Microsoft Yahei";
    overflow: hidden;
  }
</style>

