var functions = require('../../utils/functions.js')
var url = 'https://douban.uieee.com/v2/movie/in_theaters'
var pageSize = 20
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  scroll: function (e) {
    //console.log(e)
  },
  onLoad: function (options) {
    if (options.id) {
      wx.showModal({
        title: 'onLoad',
        content: options.id,
      })
    }
    var that = this
    functions.getCity(function (city) {
      functions.fetchFilms.call(that, url, city, 0, pageSize, function (data) {
        that.setData({
          showLoading: false
        })
      })
    })
    wx.login({
      success: function (res) {
        console.log(res);
      }
    });
  },
  scrolltolower: function () {
    var that = this
    functions.getCity(function (city) {
      functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function (data) { })
    })
  },
  viewDetail: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '查影视，热映大片快捷预览及豆瓣影评',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
