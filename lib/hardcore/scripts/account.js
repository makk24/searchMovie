var e, t, n, r, o, u, c, a, i;

require("../../../build/options"), t = require("../../underscore"), c = require("requests"), 
u = require("pwx"), n = {
    KEY: "account"
}, r = {
    KEY: "user_info_v2"
}, i = function(e, t) {
    var n;
    return (n = e.header || {}).Authorization = "Bearer " + t, e.header = n;
}, a = function(e, t) {
    var n;
    return (n = e.data || {}).access_token = t, e.data = n;
}, o = function(n) {
    return function(r) {
        var o;
        return o = function(u, c) {
            var a;
            return a = t(c).clone(), e.getAccountInfo().then(function(t) {
                var i;
                return i = t.access_token, n(c, i), r(u, c).catch(function(t) {
                    var n, r, c;
                    return c = t.type, r = t.statusCode, n = t.response.data.code, r = parseInt(r), 
                    "status code error" !== c || 400 !== r || 103 !== n && 106 !== n ? Promise.reject(t) : e.removeAccountInfo().then(function() {
                        return o(u, a);
                    });
                });
            }, function() {
                return r(u, c);
            });
        };
    };
}, e = {
    setAccountInfo: function(e) {
        return u.setStorage({
            key: n.KEY,
            data: e.data
        });
    },
    getAccountInfo: function(e) {
        return u.getStorage({
            key: n.KEY
        }).then(function(e) {
            return e && e.access_token ? e : Promise.reject({
                type: "no_token",
                data: e
            });
        }, function(e) {
            return Promise.reject({
                type: "no_token",
                res: e
            });
        });
    },
    removeAccountInfo: function(e) {
        return u.removeStorage({
            key: r.KEY
        }).then(function() {
            return u.removeStorage({
                key: n.KEY
            });
        });
    },
    getUserInfo: function() {
        var t;
        return t = r.KEY, u.getStorage({
            key: t
        }).catch(function() {
            return e.getAccountInfo().then(function(e) {
                var t;
                return t = e.douban_user_id, c.frodo_v2.get({
                    path: "/user/" + t
                });
            }).then(function(e) {
                return u.setStorage({
                    key: t,
                    data: e
                }).then(function() {
                    return e;
                });
            });
        });
    },
    removeUserInfo: function() {
        return u.removeStorage({
            key: r.KEY
        });
    },
    setup: function() {
        return c.frodo_v2.addHook(o(i)), c.accounts.addHook(o(a));
    }
}, module.exports = e;