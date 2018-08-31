const app = getApp();
let i = require("../../scripts/subject_utils");
let e = require("../../scripts/base_view");
let t = require("../../scripts/reach_bottom_data_loader");
let r = require("../../../../common/data/index-columns");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject_list: {
      items: [],
      total: 1,
      hasmore: !0
    },
    type: "",
    status: 'init'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var s, n, a, c, p, l;
    this.status = "loaded";
    e={
      mode :'column',
      column:'movie_hot',
      type:'movie'
    }
    this.opts
=e    
    switch (e.mode, l = e.type, this.setData({
      type: l
    }), e.mode) {
      case "search":
        a = "/v2/search", n = {
          q: e.search,
          type: e.type
        }, c = "subjects", p = i.unifyFields;
        break;

      case "column":
        a = "/v2/subject_collection/" + r.get_column_by_name(e.column).collection_tag + "/items",
          n = {}, c = "subject_collection_items", p = i.unifyFields;
        break;

      case "user_interests":
        a = "/v2/user/" + e.user_id + "/interests", n = {
          type: e.type,
          status: e.status
        }, c = "interests", p = function(e) {
          return i.unifyFields(e.subject);
        };
        break;

      // case "discovery":
      //   a = "/" + e.type + "/suggestion", n = {}, c = "items", p = i.unifyFields, s = o.frodo_v2;
      //   break;
      default:
        return;
    }
    return this.loader = new t({
      key: "subject_list",
      page: this,
      request: {
        backend: s,
        path: a,
        data: n
      },
      response: {
        key: c,
        transItemFunc: p
      }
    }), this.loader.requestData();
  },
  onReady: function() {
    var e, t, o, i;
    if ( t = this.opts, e = t.column, t.type, o = t.status,
      i = function() {
        switch (this.opts.mode) {
          case "search":
            return "搜索结果";

          case "column":
            return r.get_column_by_name(e).title;

          case "user_interests":
            return "全部" + s[o];

          case "discovery":
            return "猜你喜欢";
        }
      }.call(this)) return wx.setNavigationBarTitle({
        title: '查影视-' + i
    });
    if (this.status = "ready", this.calcPageLoading()) return wx.showNavigationBarLoading();
  },
  onReachBottom: function() {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShare('查影视，热映大片豆瓣评分及热门影评，快捷预览！')
  }
})