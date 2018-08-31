const app = getApp();
let t = require("../../scripts/reach_bottom_data_loader");
let r = require("../../scripts/models/review").ReviewModel;
let s = require("../../scripts/subject_utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    review: {},
    comment_list: {
      items: [],
      total: 0,
      hasmore: !0
    },
    status: 'init'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var i, n;
    this.status = "loaded";
    this.pops=e;
    return i = e.id, n = this, app.requestApi.request({
      path: app.urlType.MOBILE+"/v2/review/" + i,
      loadingKey: "review",
      page: this
    }).then(function (e) {
      return n.model = new r(e), n.setData({
        review: n.model.json()
      });
    }), this.loader = new t({
      key: "comment_list",
      page: this,
      request: {
        path: "/v2/review/" + i + "/comments"
      },
      response: {
        key: "comments",
        transItemFunc: s.parseComment
      }
    }), this.loader.requestData();
  },
  onReachBottom: function () {
    if (this.loader) return this.loader.onReachBottom();
  },

  setLoading: function (t, a) {
    var i, n, o;
    if (o = this.calcPageLoading(), this.setData(((i = {})["loading." + t] = a, i)),
      o !== (n = this.calcPageLoading()) && "ready" === this.status) return n ? wx.showNavigationBarLoading() : wx.hideNavigationBarLoading();
  },
  getLoading: function (t) {
    var a;
    return null != (a = this.data.loading) ? a[t] : void 0;
  },
  calcPageLoading: function () {
    var t, a;
    for (t in a = this.data.loading)
      if (a[t]) return !0;
    return false;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.status = "ready", this.calcPageLoading()) return wx.showNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShare('查影视，热映大片豆瓣评分及热门影评，快捷预览！', `lib/hardcore/pages/review/detail?id=${this.pops.id}`)
  }
})