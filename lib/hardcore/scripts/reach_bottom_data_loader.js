var t, e, a;
let requestApi=require("../../../utils/requestComm");
let util = require("../../../utils/util")
e = require("../../underscore"), 
t = function() {
    function t(t) {
        this.opts = t;
    }
    return t.prototype.requestData = function(t) {
        var e, a, s, n, r;
        if (a = (r = this.opts).key, !(n = r.page).getLoading(a)) return e = {}, "next" === t ? e.start = n.data[a].items.length : n.setData(((s = {})[a + ".items"] = [], 
        s)), this.sendRequest({
            data: e
        });
        console.log("loading! cancel.");
    }, t.prototype.sendRequest = function(t) {
        var s, n, r, o, i, u, p, c, h;
        return c = this.opts, o = c.key, u = c.page, n = (h = c.request).backend, p = h.path, 
          r = h.data, s = t.data, n || (n = a), i = this, requestApi.request({
          path: util.url_prefix.MOBILE+p,
            data: e.defaults(s, r),
            loadingKey: o,
            page: u
        }).then(function(t) {
            var e, a, s, n;
            return t = i.parseData(t), a = u.data[o].items.concat(t.items), n = t.total, e = a.length < n, 
            u.setData(((s = {})[o + ".items"] = a, s[o + ".total"] = n, s[o + ".hasmore"] = e, 
            s));
        });
    }, t.prototype.parseData = function(t) {
        var e, a, s, n, r, o;
        return s = (n = this.opts.response).key, o = n.transItemFunc, a = t[s], r = t.total, 
        o && (a = function() {
            var t, s, n;
            for (n = [], t = 0, s = a.length; t < s; t++) e = a[t], n.push(o(e));
            return n;
        }()), {
            items: a,
            total: r
        };
    }, t.prototype.onReachBottom = function() {
        var t, e, a, s;
        if (a = (s = this.opts).page, e = s.key, (t = a.data[e]).items.length < t.total) return this.requestData("next");
    }, t;
}(), module.exports = t;