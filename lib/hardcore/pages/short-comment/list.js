const app = getApp();
let r = require("../../scripts/subject_utils");
let t = require("../../scripts/base_view");
let e = require("../../scripts/reach_bottom_data_loader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: {},
    sort: "latest",
    comment_list: {
      items: [],
      total: 1,
      hasmore: true
    },
    status: 'init'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    this.opts = t;
    this.status = "loaded";
    return this.loader = new e({
      key: "comment_list",
      page: this,
      request: {
        path: "/v2/" + t.type + "/" + t.id + "/interests",
        data: {
          order_by: this.data.sort
        }
      },
      response: {
        key: "interests",
        transItemFunc: r.parseInterest
      }
    }),  this.loader.requestData();
  },
  onSortOptionClicked: function(t) {
    var e;
    return e = t.currentTarget.dataset, this.setData({
      sort: e.sort
    }), this.loader.opts.request.data.order_by = e.sort, this.loader.requestData();
  },
  onReachBottom: function() {
    if (this.loader) return this.loader.onReachBottom();
  },
  setLoading: function(t, a) {
    var i, n, o;
    if (o = this.calcPageLoading(), this.setData(((i = {})["loading." + t] = a, i)),
      o !== (n = this.calcPageLoading()) && "ready" === this.status) return n ? wx.showNavigationBarLoading() : wx.hideNavigationBarLoading();
  },
  getLoading: function(t) {
    var a;
    return null != (a = this.data.loading) ? a[t] : void 0;
  },
  calcPageLoading: function() {
    var t, a;
    for (t in a = this.data.loading)
      if (a[t]) return !0;
    return false;
  },
  onReady: function() {
    if (this.status = "ready", this.calcPageLoading()) return wx.showNavigationBarLoading();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShare('查影视，热映大片豆瓣评分及热门影评，快捷预览！')
  }
})