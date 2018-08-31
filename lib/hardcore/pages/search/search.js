const app = getApp();

let a = require("../../scripts/subject_utils");
let c = function(t) {
  var e, r;
  return r = [], (e = a.unifyFields(t)).rating.null_reason ? r.push(e.rating.null_reason) : r.push(e.rating.value + "分"),
    t.author && (r = r.concat(t.author)), t.genres && (r = r.concat(t.genres)), t.pubdate && (r = r.concat(t.pubdate)),
    e.short_description = r.join("/"), e;
};
let r = /^(\w+):\/\/([^\/]+)\/(\w+)\/(\d+)$/;
let n = function (t) {
  var e;
  return e = t.uri.match(r), t.type = e[3], t.id = e[4], t;
};

let isHave = [].indexOf || function(t) {
  for (var e = 0, r = this.length; e < r; e++)
    if (e in this && this[e] === t) return e;
  return -1;
};
let doHistory = function() {
  let t = function() {};
  var e;
  e = "search-history", t.prototype.push = function(obj) {
    let data;
    return data = this.get(),
      function(r) {
        if (isHave.call(r, obj) < 0) return r.unshift(obj), wx.setStorage({
          key: e,
          data: r.slice(0, 10)
        });
      }(data);
  }, t.prototype.get = function() {
    return wx.getStorageSync(e) || [];
  }, t.prototype.clear = function() {
    return wx.removeStorage({
      key: e
    });
  };
  return t;
}();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    history: [],
    hot_words: [],
    loading: {},
    search: "",
    focus: !1,
    exact_match: true
  },
  history: new doHistory(),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      history: this.history.get().slice(0, 5)
    })
    that.requestGetHot();
  },
  onHistoryItemClicked : function (t) {
    var e;
    return e = t.currentTarget.dataset.word, this.setData({
      search: e
    }), this.requestSearch(e);
  },
  requestGetHot: function() {
    let that = this;
    app.requestApi.request({
      path: app.urlType.MOBILE + "/v2/search/hots",
      data: {
        type: 'movie',
        app_version: '5.0.0'
      },
      page: this
    }).then((res) => {
      console.log(res)
      if (res.items && res.items.length > 0) {
        var r;
        that.setData({
         hot_words: function() {
            var t, s, o, i;
           for (i = [], t = 0, s = (o = res.items.slice(0, 5)).length; t < s; t++) r = o[t],
              i.push(n(r));
            return i;
          }()
        })
        console.log(that.data.history)
      }
    })
  },
  onCancelSearchClicked: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  onSearchConfirm: function(t) {
    var e;
    return "" !== (e = t.detail.value) ? (
      this.history.push(e), this.setData({
        history: this.history.get().slice(0, 5)
      })) : null;
  },
  onSearchInput: function(t) {
    var e, r;
    e = t.detail.value, this.searchTimer && (clearTimeout(this.searchTimer), this.searchTimer = null),
      e ? this.searchTimer = setTimeout((r = this, function() {
        return r.requestSearch(e);
      }), 300) : this.setData({
        results: []
      });
  },
  onClearHistoryClicked: function() {
    this.history.clear();
    this.setData({
      history: []
    });
  },
  requestSearch: function(t) {
    var e;
    return e = this, this.data.exact_match && app.requestApi.request({
      path: app.urlType.MOBILE + "/v2/search",
      data: {
        q: t,
        type: 'movie',
        app_version: '5.0.0'
      },
      page:this
    }).then(function(r) {
      var s, n;
      return n = function() {
        var t, e, n, o;
        for (o = [], t = 0, e = (n = r.subjects).length; t < e; t++) s = n[t], o.push(c(s));
        return o;
      }(), e.setSearchResult(t, n);
    });
  },
  setSearchResult: function(t, e) {
    return this.search = t, this.setData({
      results: e
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShare('查影视，热映大片豆瓣评分及热门影评，快捷预览！')
  }
})