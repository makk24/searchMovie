var t, e, n, r, o, s, a, u, i, c = function(t, e) {
    function n() {
        this.constructor = t;
    }
    for (var r in e) d.call(e, r) && (t[r] = e[r]);
    return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, 
    t;
}, d = {}.hasOwnProperty;

n = require("../../underscore"), r = require("account"), i = require("subject_utils"), 
u = require("requests"), t = require("base_view"), o = function(t) {
    return !!t;
}, a = function(t) {
    var e, n;
    return n = function() {
        switch (t.type) {
          case "book":
            return [ "author", "press" ];

          case "movie":
          case "tv":
            return [ "genres", "pubdate" ];

          default:
            return [];
        }
    }(), {
        short_info_list: function() {
            var r, o, s;
            for (s = [], r = 0, o = n.length; r < o; r++) e = n[r], t[e] && s.push({
                key: e,
                content: t[e].join(" / ")
            });
            return s;
        }()
    };
}, s = function(t) {
    var e;
    return e = i.parseInterest(t), n(e.subject).defaults(a(t.subject)), e;
}, e = function(e) {
    function a() {
        return a.__super__.constructor.apply(this, arguments);
    }
    return c(a, t), a.prototype.data = {
        user: {
            info: {
                name: "未登录",
                gender: "",
                avatar: i.DEFAULT_AVATAR_URL,
                is_me: !1
            },
            ui: {
                has_banner: !1,
                showFollow: !0,
                showLogout: !1
            },
            interest_columns: [],
            comments: []
        }
    }, a.prototype.onLoad = function(t) {
        return a.__super__.onLoad.call(this, t), this.requestData();
    }, a.prototype.onHide = function() {
        return this.has_hidden = !0;
    }, a.prototype.onShow = function() {
        var t;
        if (a.__super__.onShow.apply(this, arguments), this.opts.is_me_page && this.has_hidden) return t = this, 
        r.getAccountInfo().then(function(e) {
            if (e.douban_user_id !== t.data.user.info.id) return t.requestData();
        }, function() {
            if (t.data.user.info.id) return t.requestData();
        });
    }, a.prototype.requestData = function() {
        var t, e, n, o, a;
        return n = this, o = this.opts, t = o.id, e = o.is_me_page, a = o.type, r.getAccountInfo().then(function(n) {
            return e && (t = n.douban_user_id), {
                id: t,
                accountData: n
            };
        }, function() {
            return {
                id: t,
                accountData: void 0
            };
        }).then(function(e) {
            var r;
            return t = e.id, r = e.accountData, t ? u.frodo_v2.get({
                path: "/user/" + t,
                loadingKey: "profile",
                page: n
            }).then(function(e) {
                var o, c, d, f, p, l;
                for (n.setUserInfoData(e, r), l = [], o = d = 0, f = (p = n.data.user.interest_columns).length; d < f; o = ++d) c = p[o], 
                l.push(function(e, r) {
                    var o, c;
                    return o = r.status, c = r.title, u.get({
                        path: "/v2/user/" + t + "/interests",
                        data: {
                            type: a,
                            status: o
                        },
                        loadingKey: o + "_interests",
                        page: n
                    }).then(function(t) {
                        var r, a;
                        if (t.subjects = function() {
                            var e, n, o, s;
                            for (s = [], e = 0, n = (o = t.interests).length; e < n; e++) r = o[e], s.push(i.unifyFields(r.subject));
                            return s;
                        }(), n.setData(((a = {})["user.interest_columns[" + e + "]"] = {
                            data: t,
                            status: o,
                            title: c,
                            show: "doing" !== o || t.total > 0
                        }, a)), "done" === o) return n.setData({
                            "user.comments": function() {
                                var e, n, o, a;
                                for (a = [], e = 0, n = (o = t.interests).length; e < n; e++) r = o[e], a.push(s(r));
                                return a;
                            }()
                        });
                    });
                }(o, c));
                return l;
            }) : n.setUserInfoData(void 0, r);
        });
    }, a.prototype.setUserInfoData = function(t, e) {
        var r, s;
        return r = (t = n.defaults(t || {}, {
            id: "",
            name: "未登录",
            gender: "",
            followed: !1
        })).profile_banner, t.avatar = t.large_avatar || t.avatar || i.DEFAULT_AVATAR_URL, 
        t.is_me = e ? t.id === e.douban_user_id : "" === t.id, s = {
            profile_style: r ? "background-image: url(" + r.normal + ")" : void 0,
            has_banner: o(r),
            showFollow: !1,
            showLogin: "" === t.id && void 0 === e,
            showLogout: o(e) && t.is_me
        }, this.setData({
            user: {
                info: t,
                ui: s,
                interest_columns: [ {
                    status: "mark",
                    title: "想看",
                    data: {},
                    show: !1
                }, {
                    status: "doing",
                    title: "在看",
                    data: {},
                    show: !1
                }, {
                    status: "done",
                    title: "看过",
                    data: {},
                    show: !1
                } ],
                comments: []
            }
        });
    }, a.prototype.onFollowClicked = function(t) {
        var e, n;
        return e = this.opts.id, n = this, u.frodo_v2.post({
            path: "/user/" + e + "/follow",
            loadingKey: "follow",
            page: n
        }).then(function() {
            return n.setData({
                "userinfo.followed": !0
            });
        });
    }, a.prototype.onCornerBtnClicked = function(t) {
        var e, n;
        switch (e = t.target.dataset.action, n = this, e) {
          case "login":
            return wx.navigateTo({
                url: "/lib/hardcore/pages/user/password-login"
            });

          case "logout":
            return r.removeAccountInfo().then(function() {
                return wx.showToast({
                    title: "退出成功",
                    content: "退出成功"
                }), n.setUserInfoData(), setTimeout(function() {
                    return wx.switchTab({
                        url: "/pages/index/index"
                    });
                }, 1500);
            });
        }
    }, a;
}(), module.exports = {
    UserInfoPageBase: e
};