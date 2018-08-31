var e, t, r, n;

e = require("../../underscore"), t = function(e) {
    return function(t) {
        return null == t && (t = {}), new Promise(function(r, n) {
            return t.success = function(t) {
                switch (e) {
                  case "getStorage":
                    return r(t.data);

                  default:
                    return r(t);
                }
            }, t.fail = function(r) {
                var o;
                switch (o = {
                    method_name: e
                }, e) {
                  case "getStorage":
                  case "setStorage":
                  case "removeStorage":
                    o.key = t.key;
                }
                return n(o);
            }, wx[e](t);
        });
    };
}, n = [ "request", "setStorage", "getStorage", "getStorageInfo", "removeStorage", "login", "getUserInfo" ], 
r = e.chain(n).map(function(e) {
    return [ e, t(e) ];
}).object().value(), module.exports = r;