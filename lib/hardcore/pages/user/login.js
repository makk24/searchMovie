var t, e, n, o, r = function(t, e) {
    function n() {
        this.constructor = t;
    }
    for (var o in e) s.call(e, o) && (t[o] = e[o]);
    return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, 
    t;
}, s = {}.hasOwnProperty;

require("../../../../build/options"), o = require("../../scripts/requests"), t = require("../../scripts/base_view"), 
e = require("../../scripts/account"), n = require("../../scripts/pwx"), function(s) {
    function i() {
        return i.__super__.constructor.apply(this, arguments);
    }
    r(i, t), i.prototype.data = {
        login: !1,
        weixin_user: {}
    }, i.prototype.onLoad = function(t) {
        var r;
        return i.__super__.onLoad.call(this, t), r = this, e.getAccountInfo().then(function(t) {
            var e;
            return r.setData({
                login: !0
            }), e = t.douban_user_id, o.frodo_v2.get({
                path: "/user/" + e,
                loadingKey: "profile",
                page: r,
                success: function(t) {
                    return r.setData({
                        user: t
                    });
                }
            });
        }).catch(function(t) {
            return n.login().then(function() {
                return n.getUserInfo();
            }).then(function(t) {
                return r.setData({
                    weixin_user: t.userInfo
                });
            }).catch(function(t) {
                switch (t.method_name) {
                  case "login":
                    return wx.showModal({
                        title: "失败",
                        content: "获取 OAuth code 失败",
                        showCancel: !1
                    });

                  case "getUserInfo":
                    return r.onLoginClicked();
                }
            });
        });
    }, i.prototype.onLoginClicked = function() {
        return wx.redirectTo({
            url: "/lib/hardcore/pages/user/password-login"
        });
    }, i.prototype.onWeixinLoginClicked = function() {
        var t, r;
        return r = this, t = null, n.login().then(function(e) {
            return t = e.code, n.getUserInfo();
        }).then(function(e) {
            var n, s, i;
            return s = e.encryptedData, i = e.iv, r.setData({
                weixin_user: e.userInfo
            }), n = {
                code: t,
                encryptedData: s,
                iv: i,
                create: 1
            }, o.accounts.post({
                path: "/connect/wxa/login",
                loadingKey: "login",
                page: r,
                data: n
            });
        }).then(function(t) {
            var n, o;
            return o = t.status, n = t.description, "success" === o ? (wx.showToast({
                title: "登录成功",
                icon: "success"
            }), r.setData({
                login: !0
            }), e.setAccountInfo({
                data: t.payload
            }).then(function() {
                return wx.navigateBack();
            })) : wx.showModal({
                title: "登录失败",
                content: n,
                showCancel: !1
            });
        }).catch(function(t) {
            var e;
            switch (t.method_name) {
              case "login":
                return wx.showModal({
                    title: "失败",
                    content: "获取 OAuth code 失败",
                    showCancel: !1
                });

              case "getUserInfo":
                return r.onLoginClicked();

              default:
                return e = "status code error" === res.type ? "status code: " + res.statusCode : res.res.data.description, 
                wx.showModal({
                    title: "登录失败",
                    content: e,
                    showCancel: !0
                });
            }
        });
    }, i.register();
}();