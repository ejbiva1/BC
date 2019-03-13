<template>
  <div class="my">

    <div class="block">
      <div class="date">2019年3月4日</div>
      <div class="dataBlock">
        <div class="brand">Coach</div>
        <div class="itemBlock">
          <div class="row">
            <div class="itemImage"></div>
            <div class="itemDetail">
              <div class="itemName">Sutton Hobo手提包</div>
              <div class="row">
                <div class="itemColorTitle">颜色：</div>
                <div class="itemColorDetail">Navy</div>
              </div>
              <div class="row">
                <div class="itemPriceTitle">价格：</div>
                <div class="itemPriceDetail">980</div>
              </div>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="totalTitle">支付金额：</div>
          <div class="totalPrice">980</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped>
  .my{
    background-color:#F7F7F7;
    position: fixed;
    height:100%;
    width:100%;
  }
  .block{

  }
  .row{
    display: flex;
    flex-direction: row;
  }
</style>

