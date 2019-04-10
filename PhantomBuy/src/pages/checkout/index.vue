<template>
  <div class="my">
    <view class="receive_info">
      <wxc-panel>
        <view class="left">
          <div class="receive_address">
            <view class="title">收件信息</view>
            <view class="edit_address" @click="editAddress">修改地址</view>
          </div>
          <div class="blockData">
            <div class="add">上海市 浦东新区 纳贤路799号</div>
            <!--<div class="add">{{address.addressDetail}}</div>-->
            <div class="name">刘凯</div>
            <!--<div class="name">{{address.receiver}}</div>-->
            <div class="phoneNum">12345678909</div>
            <!--<div class="phoneNum">{{address.receiverPhone}}</div>-->
            <div class="row">
              <div class="IDTitle">身份证号</div>
              <div class="IDNum">{{idNumber}}</div>
              <!--<div class="IDNum">{{address.idNumber}}</div>-->
            </div>
          </div>
          <div class="title">身份证照片</div>
          <view class="IDrow" v-if="imgs.length !== 0">
            <view v-for="(item, index) in imgs" class="id_cards_img">
              <img :src="item.url" style="height: 2.5rem; width: 2rem;"/>
            </view>
          </view>
        </view>
      </wxc-panel>
    </view>


    <view class="payment_info">
      <wxc-panel>
        <view class="left">
          <div>
            <div class="title">价格信息汇总</div>
          </div>
          <div class="row">
            <div class="leftTitle">商品价格合计：</div>
            <div class="rightData">3076.25元</div>
            <!--<div class="rightData">{{total_fee.price.price}}</div>-->
          </div>
          <div class="row">
            <div class="leftTitle">消费税合计：</div>
            <div class="rightData">276.86元</div>
            <!--<div class="rightData">{{total_fee.exciseTax.exciseTax}}</div>-->
          </div>
          <div class="row">
            <div class="leftTitle">国际快递合计：</div>
            <div class="rightData">127.91元</div>
            <!--<div class="rightData">{{total_fee.internationalShippingFee.internationalShippingFee}}</div>-->
          </div>
          <div class="row">
            <div class="leftTitle">平台佣金合计：</div>
            <div class="rightData">0元</div>
            <!--<div class="rightData">{{total_fee.internationalShippingFee.internationalShippingFee}}</div>-->
          </div>
          <div class="row">
            <div class="leftTitle">人民币合计：</div>
            <div class="rightData">3481.02元</div>
            <!--<div class="rightData">{{total_fee.total.total}}</div>-->
          </div>
          <div class="title">预计送到时间：</div>
          <div class="receivedTime">2019年4月3日至2019年4月7日之间（根据不同时间段会有偏差，仅作为参考）</div>
        </view>
      </wxc-panel>
    </view>

    <view class="contract_info">
      <wxc-panel>
        <view class="left">
          <div class="title">条款签署</div>
          <div class="word">跨境电商商品不支持退换货</div>
          <div class="agree">
            <checkbox-group @change="agreeContract">
              <label>
                <checkbox class="contract_agree" :value="agree.value" :checked="agree.checked"/>
                {{agree.value}} </label>
            </checkbox-group>

          </div>
        </view>
      </wxc-panel>
    </view>

    <view class="payButton">
      <wxc-button size="large" type="dark" value="去支付" @click="pay"></wxc-button>
    </view>


    <view class="toast">
      <wxc-toast :is-show="toast.show_toast"
                 :text="toast.msg"
                 :icon="toast.icon_type"
                 icon-color="#ff5777"></wxc-toast>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  import  EditAddress from "../../components/editaddress/editaddress.vue";
  import {Address} from "../../common/model/address";
  import {regex} from "../../utils/Regex";
  import {common} from "../../utils/common";
  import {service} from "../../common/constants/services";
  import  fly from "../../utils/fly";
  export default {
    data(){
      return {
        user_default_address: {},
        total_fee: {},
        exciseFee: '',
        finalFee: '',
        price: '',
        sitePromotionFee: '',
        total: '',
        sessionId: '',
        agree: {
          value: '同意',
          checked: false
        },
        idNumber: '654001199407203726',
        toast: {},
        imgs: []
      };
    },
    components: {},
    onShow(){
      this.getSettingKey();
      // 隐藏身份证号码
      this.idNumber = this.hideIdNumber();
      // 隐藏手机号
      this.imgs = [
        {url: '/static/images/1.png'},
        {url: '/static/images/2.png'}
      ];
    },
    created(){
      let data = {
        "code": "1",
        "message": "success",
        "data": {
          "addressId": 26,
          "addressDetail": "上海市",
          "postCode": "201305",
          "receiver": "diaries",
          "receiverPhone": "18201716178",
          "idNumber": "654001199407203726",
          "isDefault": 1,
          "fileList": [{
            "originalFileName": "????????.png",
            "fileUrl": "http://47.104.159.98:8080/address/all/5e0475496f7a4c13a0fd30987107ba24.png"
          }, {
            "originalFileName": "???????.jpg",
            "fileUrl": "http://47.104.159.98:8080/address/all/99ee3cbec46849e9addc18ebb97091be.jpg"
          }]
        }
      };

      let caculateFee = {
        "code": "1",
        "message": "success",
        "data": {
          "serviceFee": {
            "usdExchangeRate": 6.7323,
            "serviceFee": 0.00,
            "serviceFeeRate": 0,
            "miniServiceFee": 0
          },
          "site": {
            "5": {
              "siteShippingFee": 53.52,
              "sitePromotionFee": 0.00,
              "price": 255.42,
              "exciseTax": 22.99,
              "cartList": [{
                "quantity": 1,
                "productCategoryId": 40,
                "estimatedWeight": 0.66,
                "price": 29.99,
                "skuId": 210417
              }],
              "sitePromotionMap": {
                "1": {
                  "promotionStrategyOffValue": 2147483647,
                  "sitePromotionFee": 7.95,
                  "price": 29.99,
                  "promotionStrategyOffOffer": 7.95
                }
              },
              "exciseTaxRate": 0.09
            },
            "10": {
              "siteShippingFee": 0.00,
              "sitePromotionFee": 0.00,
              "price": 2820.83,
              "shippingPromotionSnapshot": "Free Shipping with any purchase",
              "exciseTax": 253.87,
              "cartList": [{
                "quantity": 1,
                "productCategoryId": 46,
                "estimatedWeight": 2.00,
                "price": 419.00,
                "skuId": 373073
              }],
              "sitePromotionMap": {
                "1": {
                  "promotionName": "Free Shipping with any purchase",
                  "promotionStrategyOffValue": 0.00,
                  "sitePromotionFee": 0,
                  "price": 419.00,
                  "promotionEffectProductCategory": null,
                  "promotionStrategyOffPercentage": null,
                  "promotionStrategyOffPercentageInit": 0.00,
                  "promotionStrategyOffOffer": null
                }
              },
              "exciseTaxRate": 0.09
            }
          },
          "siteShippingFee": {"siteShippingFee": 53.52},
          "total": {"total": 3481.02},
          "sitePromotionFee": {"sitePromotionFee": 0.00},
          "price": {"price": 3076.25},
          "exciseTax": {"exciseTax": 276.86},
          "internationalShippingFee": {"estimatedWeight": 2.66, "internationalShippingFee": 127.91},
          "productCategoryWeight": {
            "40": {
              "taxIncluded": 0.00,
              "nextFee": 5.00,
              "initFee": 5.00,
              "weight": 0.66,
              "categoryWeight": 0.66
            }, "46": {"taxIncluded": 0.00, "nextFee": 7.00, "initFee": 7.00, "weight": 2.00, "categoryWeight": 2.00}
          },
          "final": {"finalRMB": 3481.02, "final": 3481.02},
          "linkedSiteIdMap": {}
        }
      };
    },
    methods: {
      hideIdNumber(){
        let self = this;
        return (self.idNumber).replace(/(\w)/g, function (a, b, c, d) {
          return ((c > 1 && c < 6) || c > (self.idNumber.length - 5)) ? '*' : a
        });
        ;
      },
      getSettingKey () {
        let self = this;
        let settingKey
        wx.getStorage({
          key: 'settingKey',
          success: function (data) {
            //console.log(data)
            settingKey = data.data;
            if (settingKey === '1') {
              self.getSessionId();
            } else if (settingKey === '0') {
              // 未授权，跳转授权页面
              wx.navigateTo({
                url: '/pages/login/main'
              })
            } else {
              self.getSettingKey()
            }
          },
          // 没有获得到SettingKey的时候重复调用本函数
          fail: function (err) {
            self.getSettingKey()
          }
        })
      },
      getSessionId() {
        let self = this;
        wx.getStorage({
          key: 'cookieKey',
          success: function (data) {
            const cookieSession = String(data.data);
            self.sessionId = cookieSession.split('=')[1].split(';')[0];
            self.getDefaultAddress();
          },
          fail: function (err) {
            console.log(err)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
        })
      },
      getProductFee(){
        // http://www.phantombuy.com/phantombuy/cart/calculateFee
        let entityDTO = {
          entityDTO: {cartIdList: [123]}
        };
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post('phantombuy/cart/calculateFee', entityDTO).then(res => {
          if (res.data.code === '1') {
            this.total_fee = res.data.data;
            // exciseFee
            this.exciseFee = this.total_fee.exciseTax.exciseTax;
            // finalFee
            this.finalFee = this.total_fee.final.finalRMB;
            //price
            this.price = this.total_fee.price.price;
            // sitePromotionFee: {sitePromotionFee: 0}
            this.sitePromotionFee = this.total_fee.sitePromotionFee.sitePromotionFee;
            //total: {total: 3481.02}
            this.total = this.total_fee.total.total;
            this.internationalShippingFee = this.total_fee.internationalShippingFee.internationalShippingFee;
          } else {
          }
        });
      },
      getDefaultAddress(){
        // http://www.phantombuy.com/phantombuy/userAddress/getDefaultAddress
        let entityDTO = {
          entityDTO: {}
        };
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post('phantombuy/userAddress/getDefaultAddress', entityDTO).then(res => {
          if (res.data.code === '1') {
            this.user_default_address = res.data.data;
          } else {
          }
        });
      },
      pay(){
        // 用户并未同意 签订同意协议
        if (!this.agree.checked) {
          let self = this;
          self.toast = common.showErrorMsg('您需要同意条款');
          setTimeout(function () {
            self.toast.show_toast = false;
          }, 1500);
          return
        }
        // 这里pay 需要跳转到 微信支付页
        console.log('去支付');
      },
      agreeContract(e){
        //console.log(e);
        // checkbox 选中
        if (e.mp.detail.value.length !== 0) {
          this.agree.checked = true;
        } else { // checkbox not checked
          this.agree.checked = false;
        }
      },
      editAddress(){
        console.log('修改默认收件地址');
        wx.navigateTo({
          url: '/pages/address/main'
        });
      },
      showMsg(){
        this.toast = common.show
      }

    }
  }
</script>

<style scoped>
  .my {
    background-color: #F7F7F7;
    height: 100%;
    width: 100%;
  }

  .receive_info {
    padding-top: 0.5rem;
    width: 90%;
    vertical-align: middle;
    padding-left: 5%;
    padding-bottom: 0.2rem;
  }

  .payment_info {
    width: 90%;
    vertical-align: middle;
    padding-left: 5%;
    padding-bottom: 0.2rem;
  }

  .contract_info {
    width: 90%;
    vertical-align: middle;
    padding-left: 5%;
    padding-bottom: 0.2rem;
  }

  .receive_address {
    display: flex;
    justify-content: space-between;
  }

  .left {
    padding-top: 0.3rem;
    padding-left: 0.3rem;
    padding-bottom: 0.4rem;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 0.1rem;
  }

  .edit_address {
    font-weight: bold;
    color: red;
    font-size: 16px;
    margin-bottom: 0.1rem;
    padding-right: 0.2rem;
  }

  .row {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    padding-bottom: 0.1rem;
    padding-left: 0.1rem;
  }

  .rightData {
    padding-left: 0.2rem;
  }

  .IDrow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    font-size: 14px;
  }

  .blockData {
    font-size: 14px;
    margin-bottom: 0.1rem;
  }

  .receivedTime {
    font-size: 14px;
    margin-bottom: 0.1rem;
  }

  .agree {
    font-size: 14px;
    margin-bottom: 0.1rem;
  }

  .word {
    font-size: 14px;
    margin-bottom: 0.1rem;
  }

  .payButton {
    margin-top: 1.05rem;
    width: 90%;
    padding-left: 5%;
    margin-bottom: 0.2rem;
  }

  .contract_agree {
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.2rem;
    transform: scale(.7)
  }

  .IDrow img {
    height: 3rem;
    width: 3rem;
  }

  /*checkbox .wx-checkbox-input {*/
  /*width: 0.5rem;*/
  /*height: 0.5rem;*/
  /*}*/

</style>

