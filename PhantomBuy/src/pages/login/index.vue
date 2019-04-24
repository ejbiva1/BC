<template>
  <div>
    <div class="login">
      <div class="userImg">
        <open-data type="userAvatarUrl"></open-data>
      </div>

      <div class='content'>
        <div>申请获取以下权限</div>
        <text>获得你的公开信息(昵称，头像等)</text>
      </div>
    </div>
    <button class="loginButton" open-type="getUserInfo" @getuserinfo="onAuth">授权登录</button>

  </div>
</template>

<script type="text/ecmascript-6">
  import  fly from "../../utils/fly";
  import {mapState, mapMutations} from 'vuex'
  import {SET_SESSION_ID, SET_SETTING_KEY} from "../../store/mutation-types"

  export default {
    mounted () {
    },
    computed: {
      ...mapState([
        'settingKey',
        'sessionId'
      ])
    },
    methods: {
      ...mapMutations([
        SET_SETTING_KEY,
        SET_SESSION_ID
      ]),
      onAuth (e) {
        if (e.mp.detail.userInfo) {//点击了“允许”按钮，
          //登录，获取sessionID，再返回上一页
          const self = this
          wx.login({
            success (res) {
              if (res.code) {
                self.code = res.code
                //储存getUserInfo接口的信息，需要后端配合
                //self.wxGetUserInfo(res.code)
                fly.post("phantombuy/auth/weChatAppletlogin", {
                  entityDTO: {
                    weChatAppletLoginCode: self.code
                  }
                }).then(res => {
                  console.log(`后台交互拿回数据:`, res);
                  //把cookie存到storage里面
                  if (res.headers['set-cookie']) {
                    wx.setStorageSync('cookieKey', res.headers['set-cookie'])
                    wx.setStorageSync('settingKey', '1')
                    self.SET_SETTING_KEY('1');
                    self.SET_SESSION_ID(res.headers['set-cookie'].split('=')[1].split(';')[0]);

                    wx.navigateBack({
                      delta: 1
                    })
                  } else {
                    wx.setStorageSync('settingKey', '0')
                    self.SET_SETTING_KEY('0');
                  }
                }).catch(err => {
                  console.log(`api请求出错:`, err)
                  wx.setStorageSync('settingKey', '0')
                  self.SET_SETTING_KEY('0');
                })
              }
            }
          })
        }
      },
      wxGetUserInfo (code) {
        const self = this
        fly.post("phantombuy/auth/weChatAppletlogin", {
          entityDTO: {
            weChatAppletLoginCode: self.code
          }
        }).then(res => {
          console.log(`后台交互拿回数据:`, res);
          //跳转应该放在授权的接口里面的，这里好像不太对
          /*
           wx.switchTab({
           url: '../home/main'
           })
           */
        }).catch(err => {
          console.log(`api请求出错:`, err);
        })
      }
    }
  }
</script>

<style>
  .login {
    padding-top: 250 rpx;
    position: relative;
    width: 750 rpx;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userImg {
    overflow: hidden;
    display: block;
    width: 160 rpx;
    height: 160 rpx;
    margin: 20 rpx;
    margin-top: 50 rpx;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }

  .content {
    margin-top: 40 rpx;
  }

  .loginButton {
    margin-top: 40 rpx;
    margin-left: 80 rpx;
    margin-right: 80 rpx;
    background-color: #d5ffff;
  }
</style>
