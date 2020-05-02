//app.js
const util = require('./utils/util');
App({
  config: require('./utils/config.js'),
  requestApi: require("./utils/requestComm"),
  util: require('./utils/util'),
  urlType: util.url_prefix,
  onLaunch: function(options) {
    console.log(options)
  },
  onShow: function(options) {
    console.log(options)
    wx.login({
      success(res) {
        wx.request({
          url: `https://makunkun.cn/wx/getUser?appid=wx6f8db60e5cc9d60b&code=${res.code}`,
          success(res) {
            if (res.data.openid) {
            }
          }
        })
      }
    })

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
  },
  onShare: function(title, path = 'lib/hardcore/pages/subject/subject-list') {
    return {
      title: title,
      path: path
    }
  }
})