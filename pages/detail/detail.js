Page({
  data: {
    film: {},
    options: null
  },
  onReady: function () {
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    wx.setNavigationBarTitle({
      title: options.title
    })
    var id = options.id
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (data) {
        console.log(data)
        that.setData({
          film: data.data,
          options: options
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    var that=this;
    return {
      title: '查影视，热映大片快捷预览',
      path: '/pages/detail/detail?title=' + that.options.title + "&id=" + that.options.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
  }
})
