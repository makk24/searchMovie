var t, e, a;

e = require("../lib/underscore"), a = require("requests"), t = function() {
    function t(t) {
        this.opts = t;
    }
    return t.prototype.requestData = function(t) {
        var e, a, s, r, n;
        if (a = (n = this.opts).key, !(r = n.page).getLoading(a)) return e = {}, "next" === t ? e.start = r.data[a].items.length : r.setData(((s = {})[a + ".items"] = [], 
        s)), this.sendRequest({
            data: e
        });
        console.log("loading! cancel.");
    }, t.prototype.sendRequest = function(t) {
        var s, r, n, o, i, u, p, h;
        return p = this.opts, n = p.key, i = p.page, u = (h = p.request).path, r = h.data, 
        s = t.data, o = this, a.get({
            path: u,
            data: e.defaults(s, r),
            loadingKey: n,
            page: i
        }).then(function(t) {
            var e, a, s, r;
            return t = o.parseData(t), a = i.data[n].items.concat(t.items), r = t.total, e = a.length < r, 
            i.setData(((s = {})[n + ".items"] = a, s[n + ".total"] = r, s[n + ".hasmore"] = e, 
            s));
        });
    }, t.prototype.parseData = function(t) {
        var e, a, s, r, n, o;
        return s = (r = this.opts.response).key, o = r.transItemFunc, a = t[s], n = t.total, 
        o && (a = function() {
            var t, s, r;
            for (r = [], t = 0, s = a.length; t < s; t++) e = a[t], r.push(o(e));
            return r;
        }()), {
            items: a,
            total: n
        };
    }, t.prototype.onReachBottom = function() {
        var t, e, a, s;
        if (a = (s = this.opts).page, e = s.key, (t = a.data[e]).items.length < t.total) return this.requestData("next");
    }, t;
}(), module.exports = t;