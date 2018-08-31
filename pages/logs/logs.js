//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/search/hots?type=movie&app_version=5.0.0',
      success:function(res){
        console.log(res)
      }
    })
  }
})
