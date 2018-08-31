var e, t, a, r, s, n = function(e, t) {
    function a() {
        this.constructor = e;
    }
    for (var r in t) o.call(t, r) && (e[r] = t[r]);
    return a.prototype = t.prototype, e.prototype = new a(), e.__super__ = t.prototype, 
    e;
}, o = {}.hasOwnProperty;

t = require("../../../underscore"), a = require("../../scripts/account"), e = require("../../scripts/base_view"), 
s = require("../../scripts/requests"), r = require("../../scripts/captcha"), function(o) {
    function c() {
        return c.__super__.constructor.apply(this, arguments);
    }
    n(c, e), c.prototype.data = {
        need_captcha: !1,
        need_phone_verify: !1,
        captcha: null
    }, c.prototype.onFormSubmit = function(e) {
        var n, o, c;
        return o = e.detail.value, n = e.detail.target.dataset.action, c = this, r.verify({
            page: c,
            formValue: o.captcha
        }).then(function(e) {
            var r;
            switch (n) {
              case "requestPhoneCode":
                return r = t(o).pick("phone"), t(r).defaults(e), s.accounts.post({
                    path: "/j/wxa/register/request_phone_code",
                    data: r
                });

              case "register":
                return r = {
                    alias: o.phone,
                    name: o.nickname,
                    password: o.password
                }, t(r).defaults(e), s.accounts.post({
                    path: "/j/wxa/register/prepare",
                    data: r
                }).then(function(e) {
                    return "success" === e.status ? c.data.need_phone_verify ? s.accounts.post({
                        path: "/j/wxa/register/verify_phone_code",
                        data: {
                            phone: o.phone,
                            code: o.code
                        }
                    }).then(function(e) {
                        var t;
                        return "success" === e.status ? (t = e.payload.vtoken, s.accounts.post({
                            path: "/j/wxa/register/complete",
                            data: {
                                name: o.nickname,
                                password: o.password,
                                vtoken: t,
                                phone: o.phone
                            }
                        }).then(function(e) {
                            var t, r;
                            if (r = e.status, t = e.payload, "success" === r) return wx.showToast({
                                title: "注册成功"
                            }), a.setAccountInfo({
                                data: t
                            }).then(function() {
                                return wx.navigateBack();
                            });
                        })) : e;
                    }) : (c.setData({
                        need_phone_verify: !0
                    }), e) : e;
                });
            }
        }).then(function(e) {
            var t, a, r, s;
            switch (s = e.status, a = e.message, r = e.payload, t = e.description, s) {
              case "success":
                switch (n) {
                  case "requestPhoneCode":
                    return wx.showToast({
                        title: "手机验证码已发送"
                    });
                }
                break;

              case "failed":
                switch (a) {
                  case "captcha_required":
                    return c.setData({
                        captcha: r,
                        need_captcha: !0,
                        captcha_value: ""
                    });

                  case "password_too_weak":
                    return wx.showModal({
                        title: t,
                        content: r.feedbacks.join("/"),
                        showCancel: !1
                    });

                  default:
                    return wx.showModal({
                        title: "错误",
                        content: t,
                        showCancel: !1
                    });
                }
            }
        }).catch(function(e) {
            switch (e.type) {
              case "wrong captcha":
                return null;
            }
        });
    }, c.register();
}();