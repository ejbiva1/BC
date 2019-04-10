<template>
  <div>
    <div class="product_tabs">
      <div class="product_tabsNav">
        <div
          :class="{'selected':tab === 1,'product_tabs_active':true}"
          @click="changTab(1)"
        >商品简介
        </div>
        <div
          :class="{'selected':tab === 2,'product_tabs_active':true}"
          @click="changTab(2)"
        >规格与包装
        </div>

      </div>
    </div>
    <div class="tabs_container">
      <div v-if="tab===1">{{product.description}}</div>
      <div v-else="tab===2"><img :src="product.sizeChartUrl"></div>

    </div>
  </div>


  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        tab: 1,

      };
    },
    props: {
      product: {
        type: Object
      }
    },
    onLoad() {
    },
    methods: {
      changTab(index) {
        this.tab = index;
      },

    }
  }
</script>

<style scoped>
  .product_tabs {
    width: 100%;
  }

  .product_tabs .product_tabsNav {
    padding-left:0.2rem;
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

  .tabs_container{
    position: relative;
    top: 50%;
    width:90%;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    padding-left: 0.3rem;
  }

</style>

