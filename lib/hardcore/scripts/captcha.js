var a, e, t;

a = require("../../underscore"), e = require("../../md5"), t = require("requests"), 
module.exports = {
    verify: function(a) {
        var e, r, c;
        return c = a.page, r = a.formValue, (e = c.data.captcha) ? this.verifyValue(r, e) ? (c.setData({
            captcha: void 0,
            need_captcha: !1
        }), Promise.resolve({
            captcha_id: e.captcha_id,
            captcha_solution: r
        })) : t.accounts.post({
            path: "/j/captcha/refresh",
            loadingKey: "captcha",
            page: c
        }).then(function(a) {
            return c.setData({
                need_captcha: !0,
                captcha: a.payload,
                captcha_value: ""
            }), Promise.reject({
                type: "wrong captcha"
            });
        }) : Promise.resolve({});
    },
    verifyValue: function(t, r) {
        var c, i, p, o, n, s, u;
        for (u = e(r.captcha_id + t.toLowerCase()), i = 0, o = (s = a(r.captcha_signature_sample.split(",")).map(function(a) {
            return a.split(":");
        })).length; i < o; i++) if (p = (n = s[i])[0], c = n[1], u[p] !== c) return !1;
        return !0;
    }
};