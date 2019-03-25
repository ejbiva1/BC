<template>
  <div >
    <div class="login">
      <div class="userImg">
        <open-data type="userAvatarUrl"></open-data>
      </div>

      <div class='content'>
        <div>申请获取以下权限</div>
        <text>获得你的公开信息(昵称，头像等)</text>
      </div>
    </div>
    <button class="loginButton" v-i="buttonVisible" open-type="getUserInfo" @click="getUserInfoClick">授权登录</button>

  </div>
</template>

<script>
  import  fly from "../../utils/fly";
  export default {
    //这段登录不需要授权
    mounted () {
      const self = this
      wx.login({
        success (res) {
          if (res.code) {
            self.code = res.code
            self.wxGetUserInfo(res.code)
          }
        }
      })
    },
    methods: {
      wxGetUserInfo (code) {
        const self = this
        fly.post("phantombuy/auth/weChatAppletlogin",{
          entityDTO: {
            weChatAppletLoginCode : self.code
          }
        }).then(res => {
          console.log(`后台交互拿回数据:`,res);
          //跳转应该放在授权的接口里面的，这里好像不太对
          /*
          wx.switchTab({
            url: '../home/main'
          })
          */
        }).catch(err => {
          console.log(`api请求出错:`,err);
        })
      }
    }
  }
</script>

<style>
  .login{
    padding-top:250rpx;
    position: relative;
    width: 750rpx;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .userImg{
    overflow:hidden;
    display: block;
    width: 160rpx;
    height: 160rpx;
    margin: 20rpx;
    margin-top: 50rpx;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }
  .content{
    margin-top:40rpx;
  }
  .loginButton{
    margin-top:40rpx;
    margin-left:80rpx;
    margin-right:80rpx;
    background-color: #d5ffff;
  }
</style>
