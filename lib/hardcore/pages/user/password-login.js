var t, e, a, r, c, n = function(t, e) {
    function a() {
        this.constructor = t;
    }
    for (var r in e) o.call(e, r) && (t[r] = e[r]);
    return a.prototype = e.prototype, t.prototype = new a(), t.__super__ = e.prototype, 
    t;
}, o = {}.hasOwnProperty;

e = require("../../../underscore"), a = require("../../scripts/account"), t = require("../../scripts/base_view"), 
c = require("../../scripts/requests"), r = require("../../scripts/captcha"), function(o) {
    function s() {
        return s.__super__.constructor.apply(this, arguments);
    }
    n(s, t), s.prototype.data = {
        need_captcha: !1,
        captcha: void 0,
        captcha_value: ""
    }, s.prototype.onFormSubmit = function(t) {
        var n, o;
        return n = t.detail.value, o = this, r.verify({
            page: this,
            formValue: n.captcha
        }).then(function(t) {
            var r;
            return r = e(n).pick("name", "password"), e(r).defaults(t), c.accounts.post({
                path: "/j/wxa/login/basic",
                loadingKey: "login",
                page: o,
                data: r
            }).then(function(t) {
                var e, r, c;
                return c = t.status, e = t.message, t.description, r = t.payload, "success" === c ? (wx.showToast({
                    title: "登录成功",
                    icon: "success"
                }), a.setAccountInfo({
                    data: r
                }).then(function() {
                    return wx.navigateBack();
                })) : ("captcha_required" === e && o.setData({
                    captcha: r,
                    need_captcha: !0,
                    captcha_value: ""
                }), wx.showModal({
                    title: "登录失败",
                    content: "用户名或密码错误",
                    showCancel: !1
                }));
            });
        }).catch(function(t) {
            switch (t.type) {
              case "wrong captcha":
                return wx.showModal({
                    title: "验证码错误",
                    content: "验证码错误",
                    showCancel: !1
                });
            }
        });
    }, s.prototype.onBtnClicked = function(t) {
        var e;
        return e = t.currentTarget.dataset.action, wx.redirectTo({
            url: e
        });
    }, s.register();
}();