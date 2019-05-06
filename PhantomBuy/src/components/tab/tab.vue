<template>
  <div>
    <div class="product_tabs">
      <div class="product_tabsNav">
        <view :class="{'selected':tab === index,'product_tabs_active':true}"
              @click="changTab(1)" v-for="(item,index) in tab_names" :key="index">
          {{item.name}}
        </view>

      </div>
    </div>
    <div class="tabs_container">
      <div v-if="tab===0"></div>
      <div v-else="tab===1"></div>

    </div>
  </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import {TabsConstants} from "../../common/constants/tabs-constants";
  export default {
    data(){
      return {
        tab: 0,
        tab_names: [],
        tab_list: []

      };
    },
    props: {
      tab_category: {
        type: String
      }
    },
    onShow() {
      this.showTab();
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
          case 'product':
            break;

        }
      }

    }
  }
</script>

<style scoped>
  .product_tabs {
    width: 100%;
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
    top: 50%;
    width: 90%;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    padding-left: 0.3rem;
  }

</style>

