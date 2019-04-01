<script type="text/ecmascript-6">
  import fly from "../src/utils/fly"
  export default {
    created () {
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.clearStorageSync()
      wx.setStorageSync('logs', logs)
      console.log('app created and cache logs by setStorageSync')
      /*
       wx.getSetting查询是否授权过
       A授权过：login，获取sessionId存入storage
       B没有授权：不操作
       */
      wx.getSetting({
        success: (res)=> {
//已经授权过
          if (res.authSetting['scope.userInfo'] === true) {
            const self = this
            wx.login({
              success (res) {
                if (res.code) {
                  self.code = res.code;
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
                    } else {
                      wx.setStorageSync('settingKey', '0')
                    }
                  }).catch(err => {
                    console.log(`api请求出错:`, err)
                    wx.setStorageSync('settingKey', '0')
                  })
                }
              }
            })
          }
//还没授权过
          else {
            console.log(`暂时未授权`);
            wx.setStorageSync('settingKey', '0')
          }
        }
      })

    },
    methods: {}
  }
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200 rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
