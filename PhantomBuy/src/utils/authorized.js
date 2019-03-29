/**
 * Created by rdai2 on 2019/3/29.
 */
class Authorize {
  getSettingKey() {
    const self = this
    wx.getStorage({
      key: 'settingKey',
      success: function (data) {
        console.log(data)
        let settingKey = data.data;
        if (settingKey === '1' || settingKey === '0') {
          return settingKey;
        } else {
          self.getSettingKey()
        }
      },
      // 没有获得到SettingKey的时候重复调用本函数
      fail: function (err) {
        self.getSettingKey()
      }
    })
  };

  getSessionId() {
    wx.getStorage({
      key: 'cookieKey',
      success: function (data) {
        console.log(data);
        const cookieSession = String(data.data);
        let  sessionId = cookieSession.split('=')[1].split(';')[0];

        return sessionId;
      },
      fail: function (err) {
        console.log(err)
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }
    })
  };

}
;

export const authorize = new Authorize();
