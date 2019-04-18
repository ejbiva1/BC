<template>
  <div class="animated fadeIn">
    <view class="section">
      <!--上传身份证照片(限制为2张)-->
      <view class="id_card_section">
        <img src="/static/images/id-card/frontend.jpg" v-if="id_front_img === undefined"/>
        <img :src="id_front_img.fileUrl" v-if="id_front_img !== undefined"/>


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

        <view class="upload_img_btn2" v-if="id_backend_img === undefined">
          <wxc-button @click="uploadImgBtn(2)"
                      btnStyle="background-color:#46A5F5;min-width: 100rpx;height: 100rpx; line-height: 100rpx;  padding-left: 4px; padding-right: 4px; padding-bottom: 4px; padding-height: 4px;border-radius: 70%">
            <wxc-icon size="70" type="add"></wxc-icon>
          </wxc-button>
        </view>
      </view>


    </view>

    <view class="section_button" v-if="!isEditAddress">
      <wxc-button size="large" :btnStyle="button_style" type="beauty" value="上传"
                  @click="uploadIdImages"></wxc-button>
    </view>

    <view class="toast">
      <wxc-toast :is-show="toast.show_toast"
                 :text="toast.msg"
                 :icon="toast.icon_type"
                 icon-color="#ff5777"></wxc-toast>
    </view>

    <!--<view class="id_cards_img_section" v-show="id_card_img.length > 0">-->
    <!--&lt;!&ndash;上传图片后，立即加载下来&ndash;&gt;-->
    <!--<view v-for="(item, index) in id_card_img" class="id_cards_img" :key="index">-->
    <!--<a target="_blank" :href="item.fileUrl">-->
    <!--<img :src="item.fileUrl" class="id_card_img"/>-->
    <!--</a>-->
    <!--</view>-->
    <!--</view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly.js';
  import {common} from "../../utils/common";
  import  {Address} from "../../common/model/address";
  export default {
    data(){
      return {
        id_card_img: [],
        style: 'display: flex;justify-content: space-between; width: 100%;border-radius: 46rpx;vertical-align: middle; height: 108rpx; line-height: 108rpx;  box-shadow:2px 2px 4px 1px #000 inset; -webkit-box-shadow: #666 0px 0px 10px; -moz-box-shadow: #666 0px 0px 10px; ',
        button_style: 'color: #fff;vertical-align: middle;text-align: center;border-radius: 20rpx;',
        delete_style: 'vertical-align: middle;text-align: center;border-radius: 20rpx;',
        id_front_img: undefined,
        id_backend_img: undefined,
        toast: {},
        isEditAddress: false,
        address: new Address({}),
      };
    },
    onLoad(options){
      if (options.address_detail !== undefined) {
        this.address = JSON.parse(options.address_detail);
        this.id_card_img = this.address.fileList;
        this.id_front_img = this.id_card_img[0];
        this.id_backend_img = this.id_card_img[1];
      } else {
        this.id_card_img = [];
        this.id_front_img = undefined;
        this.id_backend_img = undefined;
      }

      let flag = options.isEditAddress.trim() === "true" ? true : false;
      if (!flag) {
        this.isEditAddress = false
      } else {
        this.isEditAddress = true
      }
    },
    onShow(){
      this.getSettingKey();
    },
    methods: {
      getSettingKey () {
        let self = this;
        let settingKey
        wx.getStorage({
          key: 'settingKey',
          success: function (data) {
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


//            self.toast = common.showSuccessMsg('上传图片成功');
//            setTimeout(function(){
//              let data = JSON.parse(res.data);
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
      uploadIdImages(){
        let self = this;
        if (this.id_card_img.length != 2) {
          self.toast = common.showErrorMsg('请上传2张图片');
          setTimeout(function () {
            self.toast.show_toast = false;
          }, 1500);
          return
        }

        this.address.fileList = self.id_card_img;
        // 新建地址
        if (!self.isEditAddress) {
          wx.navigateTo({
            url: '/pages/editaddress/main?isEditAddress=' + false + '&id_card_img=' + JSON.stringify(self.id_card_img)
          })
        } else {
          //编辑地址
          wx.navigateTo({
            url: '/pages/editaddress/main?isEditAddress= ' + true + '&address_detail=' + JSON.stringify(this.address)
          })
        }
      },

    }
  }
</script>

<style>

  .animated {
    /*background-color: #F7F7F7;*/
    height: 100%;
  }

  .section {
    width: 100%;
    padding: 0.4rem 0.2rem 0.4rem 0.4rem;
  }

  .id_card_section {
    width: 80%;
    height: 4rem;
    line-height: 3rem;
    border: 2px solid red;
    padding-bottom: 0.4rem;
    margin-buttom: 0.3rem;
    margin: auto;
  }

  /*.section_ID_button {*/
  /*margin-top: 0.8rem;*/
  /*width: 90%;*/
  /*vertical-align: middle;*/
  /*text-align: center;*/
  /*padding-left: 5%;*/
  /*margin-bottom: 0.8rem;*/
  /*}*/

  .id_card_section img {
    height: 3.5rem;
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
    top: 10%;
  }

  .upload_img_btn2 {
    position: absolute;
    left: 48%;
    top: 50%;
  }

</style>

