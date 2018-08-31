var t, a, e, c, s = function(t, a) {
    function e() {
        this.constructor = t;
    }
    for (var c in a) o.call(a, c) && (t[c] = a[c]);
    return e.prototype = a.prototype, t.prototype = new e(), t.__super__ = a.prototype, 
    t;
}, o = {}.hasOwnProperty;

t = require("../../scripts/base_view"), c = require("../../scripts/requests"), e = require("../../scripts/captcha"), 
a = require("../../scripts/account"), function(o) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    s(n, t), n.prototype.data = {
        need_captcha: !1,
        captcha: void 0,
        captcha_value: "",
        phone_code_sent: !1
    }, n.prototype.onFormSubmit = function(t) {
        var s, o, n, r, i, p, h;
        if (i = (h = t.detail.value).phone, n = h.code, o = h.captcha, s = t.detail.target.dataset.action, 
        p = {
            phone: i,
            code: n
        }, r = this, this.data.captcha) {
            if (!e.verifyValue(o, this.data.captcha)) return c.accounts.post({
                path: "/j/captcha/refresh",
                loadingKey: "captcha",
                page: this
            }).then(function(t) {
                return r.setData({
                    need_captcha: !0,
                    captcha: t.payload,
                    captcha_value: ""
                });
            }), void wx.showModal({
                title: "验证码错误",
                content: "验证码错误",
                showCancel: !1
            });
            p.captcha_id = this.data.captcha.captcha_id, p.captcha_solution = o, this.setData({
                captcha: void 0,
                need_captcha: !1
            });
        }
        switch (r = this, s) {
          case "requestPhoneCode":
            return c.accounts.post({
                path: "/j/wxa/bind/request_phone_code",
                data: p,
                loadingKey: s,
                page: r
            }).then(function(t) {
                var a, e, c, s;
                switch (s = t.status, e = t.message, c = t.payload, a = t.description, s) {
                  case "success":
                    return r.setData({
                        phone_code_sent: !0
                    });

                  case "failed":
                    switch (e) {
                      case "captcha_required":
                        return r.setData({
                            captcha: c,
                            need_captcha: !0,
                            captcha_value: ""
                        });

                      default:
                        return wx.showModal({
                            title: "绑定错误",
                            content: a,
                            showCancel: !1
                        });
                    }
                }
            });

          case "bind":
            return c.accounts.post({
                path: "/j/wxa/bind/complete",
                data: p,
                loadingKey: s,
                page: r
            }).then(function(t) {
                var e, c;
                switch (c = t.status, t.message, e = t.description, c) {
                  case "success":
                    return wx.showToast({
                        title: "绑定成功",
                        icon: "success"
                    }), a.removeUserInfo().then(function() {
                        return wx.navigateBack();
                    });

                  case "failed":
                    return wx.showModal({
                        title: "绑定错误",
                        content: e,
                        showCancel: !1
                    });
                }
            });
        }
    }, n.register();
}();