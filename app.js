//app.js
App({
  onLaunch: function (options) {
    console.log(options)
    if (options.referrerInfo) {
      wx.showModal({
        title: 'onLaunch',
        content: options.referrerInfo.extraData.foo,
      })
    }
  },
  onShow: function (options) {
    console.log(options)
    if (options.referrerInfo) {
      wx.showModal({
        title: 'onShow',
        content: options.referrerInfo.extraData.foo,
      })
    }
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
