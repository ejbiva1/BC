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
            <div class="add">{{user_default_address.addressDetail}}</div>
            <div class="name">{{user_default_address.receiver}}</div>
            <div class="phoneNum">{{user_default_address.receiverPhone}}</div>
            <div class="row">
              <div class="IDTitle">身份证号</div>
              <div class="IDNum">{{user_default_address.idNumber}}</div>
            </div>
          </div>
          <div class="title">身份证照片</div>
          <div class="IDrow" v-show="user_default_address.fileList.length !== 0">
            <view v-for="(item , index) in user_default_address.fileList" :key="index">
              <img :src="item.fileUrl"/>
            </view>
          </div>

        </view>
      </wxc-panel>
    </view>


    <view class="payment_info">
      <wxc-panel>
        <view class="left" v-show="total_fee !== undefined">
          <div>
            <div class="title">价格信息汇总</div>
          </div>
          <div class="price">
            <div class="leftTitle">商品价格合计：</div>
            <div class="rightData">{{price.price}}<span v-show="total_fee!== undefined">元</span></div>
          </div>
          <div class="price">
            <div class="leftTitle">消费税合计：</div>
            <div class="rightData">{{exciseTax.exciseTax}}<span v-show="total_fee!== undefined">元</span></div>
          </div>
          <div class="price">
            <div class="leftTitle">国际快递合计：</div>
            <div class="rightData">{{internationalShippingFee.internationalShippingFee}}<span
              v-show="total_fee!== undefined">元</span></div>
          </div>
          <div class="price">
            <div class="leftTitle">平台佣金合计：</div>
            <div class="rightData">{{sitePromotionFee.sitePromotionFee}}<span
              v-show="total_fee!== undefined">元</span></div>
          </div>
          <div class="price">
            <div class="leftTitle">人民币合计：</div>
            <div class="rightData">{{total.total}}<span v-show="total_fee!== undefined">元</span></div>
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
        user_default_address: new Address({}),
        total_fee: undefined,
        exciseTax: {},
        price: {},
        sitePromotionFee: {},
        internationalShippingFee: {},
        total: {},
        sessionId: '',
        agree: {
          value: '同意',
          checked: false
        },
        idNumber: '654001199407203726',
        toast: {},
        cartIdList: []
      };
    },
    components: {},
    onShow(){
      this.show_loading();
      this.getSettingKey();
    },
    onLoad(options){
      if (options.cartIdList !== undefined) {
        this.cartIdList = JSON.parse(options.cartIdList);
      } else {
        console.log("并没有选中任何商品,不应该跳转到该页面");
      }
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
            self.getProductFee();
            self.hide_loading();
          },
          fail: function (err) {
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
        })
      },
      getProductFee(){
        let entityDTO = {
          entityDTO: {cartIdList: this.cartIdList.length > 0 ? this.cartIdList : []}
        };
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post('phantombuy/cart/calculateFee', entityDTO).then(res => {
          if (res.data.code === '1') {
            this.total_fee = res.data.data;
            // exciseFee、price、sitePromotionFee、total、internationalShippingFee
            this.exciseTax = this.total_fee.exciseTax;
            this.price = this.total_fee.price;
            this.sitePromotionFee = this.total_fee.sitePromotionFee;
            this.total = this.total_fee.total;
            this.internationalShippingFee = this.total_fee.internationalShippingFee;
          } else {
            this.toast = common.showErrMsg("服务器内部错误");
            let self = this;
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
      },
      getDefaultAddress(){
        let entityDTO = {
          entityDTO: {}
        };
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        fly.post('phantombuy/userAddress/getDefaultAddress', entityDTO).then(res => {
          if (res.data.code === '1') {
            this.user_default_address = res.data.data;
          } else {
            this.toast = common.showErrMsg("服务器内部错误");
            let self = this;
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
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
        // 若用户同意条款协议，这里跳转到 微信支付页
      },
      agreeContract(e){
        // checkbox 选中
        if (e.mp.detail.value.length !== 0) {
          this.agree.checked = true;
        } else { // checkbox not checked
          this.agree.checked = false;
        }
      },
      editAddress(){
        wx.navigateTo({
          url: '/pages/address/main'
        });
      },
      show_loading() {
        wx.showLoading({
          title: '加载中',
        })
      },
      hide_loading() {
        wx.hideLoading();
      },
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
    font-size: 17px;
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

  .price {
    display: flex;
    flex-direction: row;
    font-size: 15px;
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
    width: 40%;
    font-size: 14px;
    height: 4rem;
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
