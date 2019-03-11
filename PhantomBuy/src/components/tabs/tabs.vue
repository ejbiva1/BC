<template>
  <div class="animated fadeIn">
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
        <div
          :class="{'selected':tab === 3,'product_tabs_active':true}"
          @click="changTab(3)"
        >综合
        </div>
      </div>
      <div class="container">
        <div v-if="tab===1">{{product.description}}</div>
        <div v-else-if="tab===2"><img :src="product.sizeChartUrl"></div>
        <div v-else>3</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        tab: 1
      };
    },
    props: {
      product: {
        type: Object
      }
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
    padding: 0 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
  }

  .product_tabs .product_tabs_active {
    flex: 1;
    /*text-align: center;*/
  }

  .test .selected {
    color: #87caee;
    border-bottom: 1px solid #87caee;
  }

  .container {
  }
</style>

