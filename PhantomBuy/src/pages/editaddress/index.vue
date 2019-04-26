<template>
  <div class="animated">

    <view class="address_section">

      <view class="section">
        <wxc-panel :border="has_border">
          <!--收件人姓名、电话号码-->
          <wxc-input type="text" title="手机号" placeholder="请输入手机号" color="#ccc"
                     :value="address.receiverPhone" v-on:blur="validateUserPhoneNo"
          ></wxc-input>
        </wxc-panel>

      </view>

      <view class="section">
        <wxc-panel :border="has_border">
          <!--收件人姓名、电话号码-->
          <wxc-input type="text" title="姓名" placeholder="清关使用" color="#ccc"
                     :value="address.receiver" v-on:blur="validateUserName"></wxc-input>
        </wxc-panel>
      </view>


      <view class="section">
        <wxc-panel :border="has_border">
          <!--身份证号-->
          <wxc-input type="text" title="身份证" placeholder="请输入中国大陆身份证号"
                     color="#ccc" :value="address.idNumber" v-on:blur="validateUserIdNumber"></wxc-input>
        </wxc-panel>
      </view>

      <view class="section">
        <wxc-panel :border="has_border">
          <!--邮编-->
          <wxc-input type="text" title="邮编" placeholder="邮编" color="#ccc"
                     :value="address.postCode" v-on:blur="validatePostCode"></wxc-input>
        </wxc-panel>
      </view>

      <view class="section">
        <wxc-panel :border="has_border">
          <!--邮寄地址-->
          <wxc-input type="text" title="邮寄地址" placeholder="请输入邮寄地址" color="#ccc"
                     :value="address.addressDetail" v-on:blur="validateAddress"></wxc-input>
        </wxc-panel>
      </view>

      <view class="section">
        <wxc-panel :border="has_border">
          <view class="is_default">
            <view class="default_text"> 设为默认地址</view>
            <checkbox-group @change="setDefault">
              <checkbox class="default_checkbox" :value="default_address.value" :checked="default_address.checked"/>
            </checkbox-group>
          </view>
        </wxc-panel>
      </view>


      <view class="section" v-if="id_front_img === undefined">
        <!--上传身份证照片(限制为2张)-->
        <view class="section_ID_button">
          <wxc-button plain="true" type="disabled"
                      :btnStyle="style">
      <span style=" padding-left: 1.2rem;">
      <wxc-icon color="#007bff" size="50" type="camera"></wxc-icon>
      <span style="font-size: 18px; padding-left: 1.5rem;">上传证件</span>
      </span>
            <!--<span style="padding-right: 0.4rem;">-->
            <!--<wxc-icon color="#red" size="40" type="arrow-right"></wxc-icon>-->
            <!--</span>-->
          </wxc-button>
        </view>
      </view>


      <view class="id_section">
        <!--上传身份证照片(限制为2张)-->
        <view class="id_card_section">
          <img src="/static/images/id-card/frontend.jpg" v-if="id_front_img === undefined"/>
          <img :src="id_front_img.fileUrl" v-if="id_front_img !== undefined"/>

          <!--<view class="id_card_img_txt">上传人像页照片</view>-->


          <view class="upload_img_btn1" v-if="id_front_img === undefined">
            <wxc-button @click="uploadImgBtn(1)"
                        btnStyle="background-color:#46A5F5;min-width: 100rpx;height: 100rpx; line-height: 100rpx; padding-left: 4px; padding-right: 4px; padding-bottom: 4px; padding-height: 4px;border-radius: 70%">
              <wxc-icon size="70" type="add"></wxc-icon>
            </wxc-button>
          </view>
        </view>

        <view class="id_card_section">
          <img src="/static/images/id-card/backend.jpg" v-if="id_backend_img === undefined"/>

          <img :src="id_backend_img.fileUrl" v-if="id_backend_img !== undefined"/>

          <!--<view class="id_card_img_txt">上传国徽页照片</view>-->

          <view class="upload_img_btn2" v-if="id_backend_img === undefined">
            <wxc-button @click="uploadImgBtn(2)"
                        btnStyle="background-color:#46A5F5;min-width: 100rpx;height: 100rpx; line-height: 100rpx;  padding-left: 4px; padding-right: 4px; padding-bottom: 4px; padding-height: 4px;border-radius: 70%">
              <wxc-icon size="70" type="add"></wxc-icon>
            </wxc-button>
          </view>
        </view>


      </view>

      <view class="section_button">
        <wxc-button size="large" :btnStyle="button_style" type="beauty" value="完成"
                    @click="confirmAddress"></wxc-button>
      </view>

      <view class="section_button" v-if="isEditAddress == true">
        <wxc-button size="large" :btnStyle="delete_style" type="dark" plain="true" value="删除"
                    @click="deleteAddress"></wxc-button>
      </view>

      <view class="toast">
        <wxc-toast :is-show="toast.show_toast"
                   :text="toast.msg"
                   :icon="toast.icon_type"
                   icon-color="#ff5777"></wxc-toast>
      </view>
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
  import {mapState, mapMutations} from 'vuex';
  //  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types";

  //这个页面还剩 删除地址、 更新地址、 添加地址  访问api
  export default {
    name: 'editaddress',
    data() {
      return {
        has_border: true,
        address: new Address({}),
        toast: {},
        isEditAddress: false,
        style: 'display: flex;justify-content: space-between; width: 100%;border-radius: 46rpx;vertical-align: middle; height: 108rpx; line-height: 108rpx;  box-shadow:2px 2px 4px 1px #000 inset; -webkit-box-shadow: #666 0px 0px 10px; -moz-box-shadow: #666 0px 0px 10px; ',
        button_style: 'color: #fff;vertical-align: middle;text-align: center;border-radius: 20rpx;',
        delete_style: 'vertical-align: middle;text-align: center;border-radius: 20rpx;',
        id_card_img: [],
        default_address: {
          value: '同意',
          checked: false
        },
        id_front_img: undefined,
        id_backend_img: undefined,
        pageTitle: ''
      }
    },
    components: {
      'edit-address': EditAddress
    },
    onLoad(options){
      console.log(options);
      if (options.address_detail !== undefined) {
        this.address = JSON.parse(options.address_detail);
        this.id_card_img = this.address.fileList;
        this.default_address.checked = this.address.isDefault == 1 ? true : false;
        this.id_front_img = this.id_card_img[0];
        this.id_backend_img = this.id_card_img[1];

      } else {
        this.address = new Address({});
        this.id_card_img = [];
        this.default_address.checked = false;
        this.id_front_img = undefined;
        this.id_backend_img = undefined;
      }

      let flag = options.isEditAddress.trim() === "true" ? true : false;
      if (!flag) {
        this.isEditAddress = false
      } else {
        this.isEditAddress = true
      }

      this.setNavigationBarTitle();
    },
    onShow(){

    },
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    methods: {
      // 是否授权
      is_authorized(){
        if (this.settingKey === '1') { // 已授权
          return true;
        } else {      // 未授权 , 不停地跳转至 登录页
          wx.navigateTo({
            url: '/pages/login/main',
          })
          return false;
        }
      },
      confirmAddress(){
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        this.address.fileList = this.id_card_img;
        this.address.isDefault = this.default_address.checked === true ? 1 : 0;
        if (this.address.addressId !== undefined) {   // 更新 地址
          this.editAddress();
        } else {   // 添加地址

          this.addAddress();
        }
      },
      addAddress(){
        if (this.address.fileList.length !== 2) {
          this.toast = common.showErrorMsg('请上传2张图片');
          this.hideToast();
          return false;
        }
        fly.post("phantombuy/userAddress/add", {entityDTO: this.address}).then(res => {
          if (res.data.code === '1') {
            this.toast = common.showSuccessMsg('添加地址成功');
            this.hideToast();
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          } else {
            this.toast = common.showErrorMsg('添加地址失败');
            this.hideToast();
          }
        });
      },
      editAddress(){
        let self = this;
        fly.post("phantombuy/userAddress/update", {entityDTO: this.address}).then(res => {
          if (res.data.code === '1') {
            this.toast = common.showSuccessMsg('更新地址成功!');
            this.hideToast();
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          } else {
            this.toast = common.showErrorMsg('更新地址失败');
            this.hideToast();
          }
        });
      },
      uploadImgBtn(index){
        var self = this;
        wx.chooseImage({
          count: 1,
          izeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res){
            let tempFilePaths = res.tempFilePaths;    // tempFilePaths可以作为img标签的src属性显示图片
            for (let i = 0; i < tempFilePaths.length; i++) {
              let imageUrl = tempFilePaths[i];
              self.uploadImage(imageUrl, i + 1, index);
            }
          },
          error(res){
            console.log(res);
          }
        })
      },
      uploadImage: function (imageUrl, imageNo, index) {
        // 上传后的身份证照片不需要保存到本地
        let self = this;
        wx.uploadFile({
          url: fly.config.baseURL + 'phantombuy/userAddress/uploadAttachmentByWechatApplet',
          filePath: imageUrl,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            "Cookie": "JSESSIONID=" + self.sessionId
          },
          // 上传图片时可以携带的数据
          formData: {
            'fileId': 0
          },
          success: function (res) {
            let data = JSON.parse(res.data);
            switch (index) {
              case 1:
                self.id_front_img = data.data[0];
                break;
              case 2:
                self.id_backend_img = data.data[0];
                break;
            }

            self.id_card_img.push(data.data[0]);
          },
          fail(res){

          }
        });
      },
      deleteAddress(){
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        let entityDTO = {
          entityDTO: {addressId: this.address.addressId !== undefined ? this.address.addressId : undefined}
        };
        fly.post("phantombuy/userAddress/delete", entityDTO).then(res => {
          if (res.data.code === '1') {
            this.toast = common.showErrorMsg("删除地址成功!");
            this.hideToast();
            wx.navigateBack({
              delta: 1
            })
          } else {
            this.toast = common.showErrorMsg("删除地址错误");
            this.hideToast();
          }
        });
      },
      validateUserIdNumber(e){
        //  验证 身份证号码是否合规
        this.address.idNumber = e.mp.detail.value;
        if (regex.validateUserIDCard(this.address.idNumber)) {
        } else {
//          this.toast = common.showErrorMsg("身份证号码验证错误");
          this.toast = common.showErrorMsg("请填写正确的身份证号码");
          this.hideToast();
        }
      },
      validateUserPhoneNo(e){   // 验证手机号号码
        this.address.receiverPhone = e.mp.detail.value;
        if (regex.validatePhone(this.address.receiverPhone)) {
        } else {
          this.toast = common.showErrorMsg("长度应为11位");
          this.hideToast();
        }
      },
      validateAddress(e){ // 验证地址是否合规
        this.address.addressDetail = e.mp.detail.value;
        if (this.address.addressDetail.length !== 0) {
        } else {
          this.toast = common.showErrorMsg("姓名不能为空");
          this.hideToast();
        }
      },
      validatePostCode(e){   // 验证邮政编码
        this.address.postCode = e.mp.detail.value;
        if (regex.validatePostCode(this.address.postCode)) {

        } else {
          this.toast = common.showErrorMsg("邮政编码不能为空");
          this.hideToast();
        }
      },
      validateUserName(e){
        this.address.receiver = e.mp.detail.value;
        if (this.address.receiver.length !== 0) {
        } else {
          this.toast = common.showErrorMsg("姓名不能为空");
          this.hideToast();
        }
      },
      hideToast(){
        let self = this;
        setTimeout(function () {
          self.toast.show_toast = false;
        }, 1000);
      },
      // 设置为 默认地址
      setDefault(e){
        if (e.mp.detail.value.length !== 0) { // checkbox checked
          this.default_address.checked = true;
        } else { // checkbox not checked
          this.default_address.checked = false;
        }
      },
      setNavigationBarTitle(){
        if (this.isEditAddress) {
          this.pageTitle = '编辑地址';
        } else {
          this.pageTitle = '添加地址';
        }
        wx.setNavigationBarTitle({
          title: this.pageTitle   // 页面标题
        })
      },

    }

  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    height: 100%;
  }

  .address_section {
    width: 100%;
  }

  .section {
    /*background: #fff;*/
    width: 100%;
    font: 16px bold black;
    margin-bottom: 0.2rem;
  }

  .section_button {
    margin-top: 0.2rem;
    width: 80%;
    vertical-align: middle;
    text-align: center;
    padding-left: 5%;
    margin-bottom: 0.4rem;
  }

  .section_ID_button {
    margin-top: 0.8rem;
    width: 90%;
    vertical-align: middle;
    text-align: center;
    padding-left: 5%;
    margin-bottom: 0.2rem;
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

  .id_cards_img_section {
    width: 70%;
    height: 3rem;
    border: 2px solid cornflowerblue;
    display: flex;
    justify-content: center;
    margin: auto;
    vertical-align: middle;
  }

  .id_cards_img a {
    vertical-align: middle;
  }

  .id_card_img {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    overflow: hidden;
    vertical-align: middle;
  }

  .default_checkbox {
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.2rem;
    transform: scale(.7);
    padding: 0.24rem 0.30rem;
  }

  .is_default {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .default_text {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    line-height: 1.4;
    padding: 0.24rem 0.30rem;
    box-sizing: border-box;
    font-size: 0.28rem;
    color: #333;
  }

  .id_section {
    width: 100%;
    padding: 0.4rem 0.2rem 0.4rem 0.0rem;
  }

  .id_card_section {
    width: 80%;
    height: 4rem;
    line-height: 4rem;
    border: 3px solid #46A5F5;
    padding-bottom: 0.4rem;
    margin-bottom: 0.3rem;
    position: relative;
    left: 10%;
  }

  .id_card_section img {
    height: 3.0rem;
    width: 70%;
    vertical-align: middle;
    margin-top: 7%;
    vertical-align: middle;
    margin-left: 15%;
    margin-bottom: 5%;
  }

  .upload_img_btn1 {
    position: absolute;
    left: 48%;
    top: 0%;
    z-index: 2;
  }

  .upload_img_btn2 {
    position: absolute;
    left: 48%;
    top: 0%;
    z-index: 2;
  }

  .id_card_img_txt {
    font-size: 16px;
    color: #46A5F5;
  }

</style>

