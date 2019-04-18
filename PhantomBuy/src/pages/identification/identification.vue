<template>
  <div class="animated fadeIn">
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

    <view class="id_cards_img_section" v-show="id_card_img.length > 0">
      <!--上传图片后，立即加载下来-->
      <view v-for="(item, index) in id_card_img" class="id_cards_img" :key="index">
        <a target="_blank" :href="item.fileUrl">
          <img :src="item.fileUrl" class="id_card_img"/>
        </a>
      </view>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        id_card_img: []
      };
    },
    onLoad(options){
      console.log(options);
      if (options !== undefined) {
        if (options.id_card_img !== undefined) {
          this.id_card_img = JSON.parse(options.id_card_img);
        }
      }
    },
    methods: {
      uploadImageBtn(){
        var self = this;
        wx.chooseImage({
          count: 1,
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
            if (self.id_card_img.length >= 2) {
              self.toast = common.showErrorMsg('请上传2张图片');
              setTimeout(function () {
                self.toast.show_toast = false;
              }, 1500);
              return
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

    }
  }
</script>

<style>

</style>

