<template>
  <div class="animated fadeIn">
    <!--<edit-address v-bind:address_detail="addressDetail"></edit-address>-->
    <!--收件人手机号-->
    <!--姓名-->
    <!--身份证-->
    <!--身份证上传-->
    <!--邮编-->
    <!--邮寄地址--
    <!--设为默认地址-->
    <view class="address_list">
      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text class="phone_padding">12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
          </view>
        </view>
      </wxc-panel>

    </view>

    <view>
      <view class="section">
        <!--<wxc-input type="text" title="收件人手机号" placeholder="请输入手机号"></wxc-input>-->
        <!--<wxc-input type="number" title="姓名" placeholder="清关使用"></wxc-input>-->
        <!--<wxc-input type="text" title="身份证" mode="none" placeholder="请输入中国大陆身份证号"></wxc-input>-->
        <!--<wxc-input type="text" title="身份证上传" placeholder="名字"></wxc-input>-->
        <!--<wxc-input type="number" title="邮编" placeholder="邮编"></wxc-input>-->
        <!--<wxc-input type="text" title="邮寄地址" mode="none" placeholder="请输入邮寄地址"></wxc-input>-->

        <input type="text" placeholder="请输入邮寄地址" v-model="address.addressDetail"/>
        <input type="text" placeholder="身份证号码" v-model="address.idNumber" @change="validateUserIdNumber"/>
        <input type="text" placeholder="邮编" v-model="address.postCode"/>
        <input type="text" placeholder="身份证号码" v-model="address.receiver"/>
        <input type="text" placeholder="请输入手机号" v-model="address.receiverPhone" @change="validateUserPhoneNo"/>
        <view class="add_address">
          <view class="button add_new_address" @click="confirmNewAddress">确认</view>
        </view>

        <button @click="uploadImage">上传</button>
      </view>

      <view class="toast">
        <wxc-toast
          :is-show="show_toast"
          :text="msg"
          :icon="icon_type"
          icon-color="#ff5777"
        ></wxc-toast>
      </view>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  import  EditAddress from "../../components/editaddress/editaddress.vue";
  import {Address} from "../../common/model/address";
  import {regex} from "../../utils/Regex";
  import {common} from "../../utils/common";
  //地址列表页
  export default {
    name: 'editaddress',
    data() {
      return {
        has_border: true,
        address: new Address({}),
        user_card_front_image_url: '',
        user_card_end_image_url: '',
        toast: {}
      }
    },
    components: {
      'edit-address': EditAddress
    },
    onLoad(options){
      console.log(options);
    },
    created() {
    },
    methods: {
      editUserAddress(){
        console.log('editUserAddress');
      },
      confirmNewAddress(){
        console.log("Confirm New Address");
        //http://www.phantombuy.com/phantombuy/userAddress/add
        fly.post("phantombuy/userAddress/add", {entityDTO: this.address}).then(res => {
          if (res.data.code === '1') {
            console.log("添加收件地址成功");
          } else {
            console.log("添加收件地址失败");
          }
        });
      },
      uploadImage(){
        wx.chooseImage({
          count: 2,
          izeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res){
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths;
            //一下上传两张图片
            //  console.log(res);
            // 早这里执行上传 文件的代码
            fly.post("phantombuy/userAddress/uploadAttachment").then(res => {
              if (res.data.code === '1') {
                console.log("上传文件成功");
              } else {
                console.log("上传文件失败");
              }
            });
          },
          fail(){

          }
        });
      },
      validateUserIdNumber(){
        //  验证 身份证 照片是否合规  pc端仅仅验证 图片数量
        if (regex.validateUserIDCard(this.address.idNumber)) {

        } else {
          this.toast = toast.showErrorMsg("身份证号码验证错误");

        }

      },
      validateUserPhoneNo(){   // 验证手机号号码
        if (regex.validatePhone(this.address.receiverPhone)) {

        } else {
          this.toast = toast.showErrorMsg("手机号码验证错误");
        }
      },
      validateAddress(){ // 验证地址是否合规

      },
      validatePostCode(){   // 验证邮政编码

      }
    }

  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .address_list {
    width: 100%;
    margin-bottom: 1.4rem;
  }

  .address_home {
    width: 100%;
  }

  .user_phone {
    font-size: 18px;
    font-weight: bold;
    height: 0.4rem;
    line-height: 0.4rem;
    vertical-align: middle;

  }

  .address {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    font-size: 18px;
  }

  .address_detail {
    width: 80%;
    flex-wrap: nowrap;
  }

  .operate {
    width: 20%;
    text-align: center;
    vertical-align: middle;
    color: red;
  }

  .padding {
    padding: 0.2rem 0.1rem 0.1rem 0.25rem;
  }

  .add_address {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    border-top: 2px solid #eee;
  }

  /*添加地址按钮*/
  .add_address .button {
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    /*width: 2.0rem;*/
    width: 100%;
    height: 1rem;
    color: white;
    font-size: 0.3rem;
    border-radius: 0;
    border: 0;
    vertical-align: middle;
  }

  .add_new_address {
    background-color: #EE5757;
  }

  .phone_padding {
    padding-left: 0.25rem;
  }


</style>

