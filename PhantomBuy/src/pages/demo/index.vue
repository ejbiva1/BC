<template>
  <div class="my">
    <!--多规格属性选择-->
    <div class="container">
      <ul class="col" id="wrap1">
        <li class="attr-row">
          <label>Size: </label>
          <a href="javascript:;" data-prime="2">26</a>
          <a href="javascript:;" data-prime="3" class="active">28</a>
        </li>
        <!--<li class="attr-row">-->
          <!--<label>Color: </label>-->
          <!--<a href="javascript:;" data-prime="7" class="active">PINK</a>-->
          <!--<a href="javascript:;" data-prime="11">PURPLE</a>-->
          <!--<a href="javascript:;" data-prime="5">WHITE</a>-->
        <!--</li>-->
        <!--<li class="attr-row">-->
          <!--<label>Country: </label>-->
          <!--<a href="javascript:;" data-prime="13">中国</a>-->
          <!--<a href="javascript:;" data-prime="17" class="active">美国</a>-->
        <!--</li>-->
      </ul>
      <div class="col"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GoodsAttr} from "../../common/model/goodsAttr";
  export default {
    name: 'demo',
    data() {
      return {
        goodsAttr2 :{}
      };
    },
    onLoad() {
//      this.goodsAttr1 = new GoodsAttr({
//        jqWrap: $('#wrap1'),
//        goodsList: props.goods_list,
//        success(product) {
//          $('#img').find('img').attr('src', product.goods_img);
//          $('#title').html(product.goods_title);
//          $('#price').html(product.price * 7.87738);
//        }
//      });
    },
    methods: {}
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
  }

  .col {
    flex-basis: 45%;
    flex-shrink: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .attr-row {
    padding-left: 90px;
    margin: 20px 0;
    font-size: 0;
  }

  .attr-row label {
    margin-left: -90px;
    width: 90px;
    display: inline-block;
    vertical-align: baseline;
    font-size: 16px;
    color: #999;
  }

  [data-prime] {
    display: inline-block;
    vertical-align: baseline;
    margin: 0 10px 10px 0;
    padding: 5px 30px;
    border: 1px solid #ddd;
    color: #333;
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
  }

  [data-prime]:hover {
    border-color: #09a;
    color: #09a;
  }

  [data-prime].disabled {
    background: #eee;
    color: #999;
    border-color: #ccc;
    cursor: default;
  }

  [data-prime].active {
    background: #09a;
    color: #fff;
    border-color: #09a;
  }
</style>

