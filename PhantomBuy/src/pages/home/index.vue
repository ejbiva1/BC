<template>
  <div class="animated fadeIn">
    <view class="section">
      <view class="flex-wrp" style="flex-direction:row;">
        <view class="flex-item bc_green">商家</view>
        <view class="flex-item bc_red">品牌</view>
      </view>
    </view>


  </div>
</template>


<script type="text/ecmascript-6">
  import shopcard from "../../components/shopcard/shopcard";
//  import {brand_list} from "../../common/constants/test_data";
  import fly from "../../utils/fly";
  export default {
    data() {
      return {
        brand_list: [],
//        entityDTO: {},
//        orderDTOs: [{}],
//        pageDTO: {pageNo: 0, pageSize: 0}
      }
    },
    onLoad() {
      //this.getList();
    },
    created(){
      //sell#!method=get
      let query_dto = {
        entityDTO: {},
        orderDTOs: [{}],
        pageDTO: {pageNo: 0, pageSize: 0}
      };

//     fly.post("phantombuy/site/get",query_dto ).then((res) => {
//       console.log(res);
//     });
    },
    components: {
      "shop-card":shopcard
    }
  }
</script>

<style scoped>
  .flex-wrp {
    display: flex;
  }

  .bc_green {
    background: green;
    width: 40px;
    height: 40px;
  }

  .bc_red {
    background: red;
    width: 40px;
    height: 40px;
  }
</style>

