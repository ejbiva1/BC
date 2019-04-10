<template>
  <div class="animated">
    <!--收件人手机号-->
    <!--姓名-->
    <!--身份证-->
    <!--身份证上传-->
    <!--邮编-->
    <!--邮寄地址--
    <!--设为默认地址-->

    <view class="address_section">

      <view class="section">
        <wxc-panel :border="has_border">
          <!--收件人姓名、电话号码-->
          <wxc-input type="text" title="收件人手机号" placeholder="请输入手机号" color="#ccc"
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
        <!--上传身份证照片(限制为2张)-->
        <view class="section_ID_button">
          <wxc-button plain="true" type="dark"
                      :btnStyle="style"
                      @click="uploadImgBtn">
            <wxc-icon color="#007bff" size="50" type="camera"></wxc-icon>
            <span style="font-size: 16px;">上传证件</span>
            <wxc-icon color="#red" size="50" type="arrow-right"></wxc-icon>
          </wxc-button>
        </view>
      </view>

      <view class="id_cards_img_section" v-if="address.fileList.length !== 0">
        <!--上传图片后，立即加载下来-->
        <view v-for="(item, index) in address.fileList" class="id_cards_img" :key="index">
          <img :src="item.fileUrl" style="height: 2.5rem; width: 2rem;"/>
        </view>
      </view>

      <!--#007bff-->
      <view class="section_button">
        <wxc-button size="large" :btnStyle="button_style" type="beauty" value="完成"
                    @click="confirmNewAddress"></wxc-button>
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

  //这个页面还剩 删除地址、 更新地址、 添加地址  访问api
  export default {
    name: 'editaddress',
    data() {
      return {
        has_border: true,
        address: new Address({}),
        user_card_image_url: [],
        toast: {},
        show_toast: false,
        sessionId: '',
        addressId: '',
        isEditAddress: false,
        style: 'width: 100%;border-radius: 46rpx;vertical-align: middle;  box-shadow:0 0 1px #000 inset;',
        button_style: 'color: #fff;vertical-align: middle;text-align: center;border-radius: 20rpx;',
        delete_style: 'vertical-align: middle;text-align: center;border-radius: 20rpx;',
        imgs: [],
        imageNum: 2,
        toast: {}
      }
    },
    components: {
      'edit-address': EditAddress
    },
    onLoad(options){
      console.log(options);
      if (options.address_detail !== undefined) {
        this.address = JSON.parse(options.address_detail);
      } else {
        this.address = new Address({});
      }
      let flag = options.isEditAddress.trim() === "true" ? true : false;
      if (!flag) {
        this.isEditAddress = false
//        this.imgs = [
//          {url: '/static/images/1.png'},
//          {
//            url: '/static/images/2.png'
//          }
//        ];
      } else {
        this.isEditAddress = true
      }
    },
    onShow(){
      this.getSettingKey();

    },
    created() {
    },
    methods: {
      // 是否授权
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
              console.log(settingKey);
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
      // 获取 SessionId
      getSessionId() {
        let self = this;
        wx.getStorage({
          key: 'cookieKey',
          success: function (data) {
            //console.log(data);
            const cookieSession = String(data.data);
            self.sessionId = cookieSession.split('=')[1].split(';')[0];
            console.log(self.sessionId);
          },
          fail: function (err) {
            console.log(err)
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }
        })
      },
      editUserAddress(){
        console.log('editUserAddress');
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        let entityDTO = {
          entityDTO: {addressId: this.addressId !== undefined ? this.addressId : 1}
        };
        fly.post("phantombuy/userAddress/update", entityDTO).then(res => {
          if (res.data.code === '1') {

          } else {
            this.toast = common.showErrMsg("更新地址错误");
          }
        });
      },
      confirmNewAddress(){
        let self = this;
        console.log("Confirm New Address");
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        // 多传递一个 fileList 字段


        //http://www.phantombuy.com/phantombuy/userAddress/add
        fly.post("phantombuy/userAddress/add", {entityDTO: self.address}).then(res => {
          if (res.data.code === '1') {
            self.toast = common.showSuccessMsg('添加地址成功');
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);

            // 地址添加成功后，返回上一层
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          } else {
            self.toast = common.showErrorMsg('添加地址失败');
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
      },
      // 上传身份证照片
      uploadImgBtn(){
        //上传图片的流程是：本地将图片上传到——》微信临时服务器，能够返回临时图片文件地址——》再将临时图片文件地址传输给服务端——》服务端从微信服务器上下载临时图片文件保存在服务端上
        var self = this;
        wx.chooseImage({
          count: 2,
          izeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res){
            let tempFilePaths = res.tempFilePaths;    // tempFilePaths可以作为img标签的src属性显示图片
            for (let i = 0; i < tempFilePaths.length; i++) {
              let imageUrl = tempFilePaths[i];
              self.uploadImage(imageUrl, i + 1);
            }
          },
          error(res){
            console.log(res);
          }
        })
      },
      // 这里基本好了，有待确认
      uploadImage: function (imageUrl, imageNo) {
        // 上传后的身份证照片不需要保存到本地
        let self = this;
        wx.uploadFile({
          url: service.BaseUrl + 'phantombuy/userAddress/uploadAttachmentByWechatApplet',
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
            self.address.fileList.push(data.data[0]);
//            self.toast = common.showSuccessMsg('上传图片成功');
//            setTimeout(function(){
//              let data = JSON.parse(res.data);
//              self.id_card_imgs.push(data.data[0]);
//            }, 1000);

            // 判断最后一张图片上传
//            if (imageNo == this.imageNum) {
//              //wx.hideLoading();
//              if (that.data.imageUploadFlag) { // 全部提交成功
//                app.showOk('提交成功');
//                wx.reLaunch({
//                  url: '../map/map',
//                })
//              } else { // 其中有失败
//                // app.showErr('出错', that.data.imageErr);
//              }
//            }
          },
          fail(res){

          }
        });
      },
      validateUserIdNumber(e){
        //  验证 身份证 照片是否合规  pc端仅仅验证 图片数量
        this.address.idNumber = e.mp.detail.value;
        if (regex.validateUserIDCard(this.address.idNumber)) {
        } else {
          // this.toast = toast.showErrorMsg("身份证号码验证错误");
        }

      },
      validateUserPhoneNo(e){   // 验证手机号号码
        this.address.receiverPhone = e.mp.detail.value;
        if (regex.validatePhone(this.address.receiverPhone)) {
        } else {
          this.toast = toast.showErrorMsg("手机号码验证错误");
        }
      },
      validateAddress(e){ // 验证地址是否合规
        this.address.addressDetail = e.mp.detail.value;
      },
      validatePostCode(e){   // 验证邮政编码
        this.address.postCode = e.mp.detail.value;
      },
      validateUserName(e){
        this.address.receiver = e.mp.detail.value;
      },
      deleteAddress(){
        fly.config.headers["Cookie"] = "JSESSIONID=" + this.sessionId;
        let entityDTO = {
          entityDTO: {addressId: this.address.addressId !== undefined ? this.address.addressId : 1}
        };
        fly.post("phantombuy/userAddress/delete", entityDTO).then(res => {
          if (res.data.code === '1') {
            this.toast = common.showSuccessMsg("删除地址成功!");
            let self = this;
            setTimeout(function () {
              self.toast.show_toast = false;
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          } else {
            this.toast = common.showErrMsg("删除地址错误");
            let self = this;
            setTimeout(function () {
              self.toast.show_toast = false;
            }, 1500);
          }
        });
      },
      showMsg() {

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
  }

  .section_ID_button {
    margin-top: 0.2rem;
    width: 80%;
    vertical-align: middle;
    text-align: center;
    padding-left: 10%;
    margin-bottom: 0.8rem;
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

  .id_cards_img_section {
    width: 100%;
    height: 3rem;
    border: 2px solid red;
    display: flex;
    justify-content: space-between;
  }

  .id_cards_img {

  }


</style>

