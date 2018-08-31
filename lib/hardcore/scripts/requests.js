var e, t, o, a, r, n, p, s, u, d, i, h, c;

for (a = require("../../underscore"), h = require("../../../build/options"), c = require("pwx"), 
e = [ "OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT" ], t = {
    MOBILE: "https://" + "m.douban.com" + "/rexxar/api",
    ACCOUNTS: "https://" + "accounts.douban.com",
    FRODO_V2: "https://" + "frodo.douban.com" + "/api/v2",
    MOVIE_V2: "https://" + "movie.douban.com" + "/api/v2"
}, o = function() {
    function e(e) {
        null == e && (e = {}), this.opts = e;
    }
    return e.prototype.addHook = function(e) {
        return this.opts.hooks.push(e);
    }, e.prototype.request = function(e) {
        var t, o, a, r;
        if (r = function(e, t) {
            return e._do_request(t);
        }, this.opts.hooks) for (t = 0, o = (a = this.opts.hooks).length; t < o; t++) r = (0, 
        a[t])(r);
        return r(this, e);
    }, e.prototype._do_request = function(e) {
        var t, o, r, n, p;
        return r = a(this.opts).pick([ "url", "method", "dataType", "url_prefix", "path", "sendDataType" ]), 
        (e = a.defaults(e, r)).url = e.url || e.url_prefix + (e.path || "/"), n = e.header || {}, 
        (o = this.opts.header) && (n = a.defaults(n, o)), p = e.sendDataType, e.method, 
        "formdata" === p && (n["Content-Type"] = "application/x-www-form-urlencoded"), e.header = n, 
        (t = this.opts.data) && (e.data ? e.data = a.defaults(e.data, t) : e.data = t), 
        e = a(e).omit([ "url_prefix", "path", "loadingKey", "page", "sendDataType", "success", "fail" ]), 
        c.request(a(e).clone()).then(function(e) {
            var t, o;
            return o = e.statusCode, t = e.data, 200 <= o && o < 300 ? t : Promise.reject({
                type: "status code error",
                statusCode: o,
                response: e
            });
        });
    }, e;
}(), p = function(e) {
    var t;
    return t = e.toLowerCase(), o.prototype[t] = function(t) {
        return t.method = e, this.request(t);
    };
}, d = 0, i = e.length; d < i; d++) p(e[d]);

r = {
    app_version: h.app_version
}, n = a.chain(r).clone().extend(r, {
    apikey: h.apikey,
    appid: h.appid
}).value(), s = {
    "X-Api-Key": h.apikey,
    "X-Appid": h.appid
}, u = [ function(e) {
    return function(t, o) {
        var a, r, n, p;
        return r = o.loadingKey, p = o.page, r && p ? (a = function() {
            return p.setLoading(r, !1);
        }, p.setLoading(r, !0), (n = e(t, o)).then(a, a), n) : e(t, o);
    };
} ], module.exports = new o({
    url_prefix: t.MOBILE,
    data: r,
    hooks: a(u).clone()
}), module.exports.accounts = new o({
    url_prefix: t.ACCOUNTS,
    sendDataType: "formdata",
    header: s,
    data: n,
    hooks: a(u).clone()
}), module.exports.frodo_v2 = new o({
    url_prefix: t.FRODO_V2,
    sendDataType: "formdata",
    header: s,
    data: n,
    hooks: a(u).clone()
}), module.exports.movie = new o({
    url_prefix: t.MOVIE_V2,
    sendDataType: "formdata",
    header: s,
    data: n,
    hooks: a(u).clone()
});