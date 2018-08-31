var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    function e(t) {
        if (t) y[0] = y[16] = y[1] = y[2] = y[3] = y[4] = y[5] = y[6] = y[7] = y[8] = y[9] = y[10] = y[11] = y[12] = y[13] = y[14] = y[15] = 0, 
        this.blocks = y, this.buffer8 = s; else if (o) {
            var e = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(e), this.blocks = new Uint32Array(e);
        } else this.blocks = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = 0, this.finalized = this.hashed = !1, 
        this.first = !0;
    }
    var r = "object" == ("undefined" == typeof window ? "undefined" : t(window)) ? window : {}, i = !r.JS_MD5_NO_NODE_JS && "object" == ("undefined" == typeof process ? "undefined" : t(process)) && process.versions && process.versions.node;
    i && (r = global);
    var s, h = !r.JS_MD5_NO_COMMON_JS && "object" == ("undefined" == typeof module ? "undefined" : t(module)) && module.exports, n = "function" == typeof define && define.amd, o = !r.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, f = "0123456789abcdef".split(""), a = [ 128, 32768, 8388608, -2147483648 ], u = [ 0, 8, 16, 24 ], d = [ "hex", "array", "digest", "buffer", "arrayBuffer" ], y = [];
    if (o) {
        var p = new ArrayBuffer(68);
        s = new Uint8Array(p), y = new Uint32Array(p);
    }
    var c = function(t) {
        return function(r) {
            return new e(!0).update(r)[t]();
        };
    }, l = function(t) {
        var e = require("crypto"), r = require("buffer").Buffer;
        return function(i) {
            if ("string" == typeof i) return e.createHash("md5").update(i, "utf8").digest("hex");
            if (i.constructor === ArrayBuffer) i = new Uint8Array(i); else if (void 0 === i.length) return t(i);
            return e.createHash("md5").update(new r(i)).digest("hex");
        };
    };
    e.prototype.update = function(t) {
        if (!this.finalized) {
            var e = "string" != typeof t;
            e && t.constructor == r.ArrayBuffer && (t = new Uint8Array(t));
            for (var i, s, h = 0, n = t.length || 0, f = this.blocks, a = this.buffer8; h < n; ) {
                if (this.hashed && (this.hashed = !1, f[0] = f[16], f[16] = f[1] = f[2] = f[3] = f[4] = f[5] = f[6] = f[7] = f[8] = f[9] = f[10] = f[11] = f[12] = f[13] = f[14] = f[15] = 0), 
                e) if (o) for (s = this.start; h < n && s < 64; ++h) a[s++] = t[h]; else for (s = this.start; h < n && s < 64; ++h) f[s >> 2] |= t[h] << u[3 & s++]; else if (o) for (s = this.start; h < n && s < 64; ++h) (i = t.charCodeAt(h)) < 128 ? a[s++] = i : i < 2048 ? (a[s++] = 192 | i >> 6, 
                a[s++] = 128 | 63 & i) : i < 55296 || i >= 57344 ? (a[s++] = 224 | i >> 12, a[s++] = 128 | i >> 6 & 63, 
                a[s++] = 128 | 63 & i) : (i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(++h)), 
                a[s++] = 240 | i >> 18, a[s++] = 128 | i >> 12 & 63, a[s++] = 128 | i >> 6 & 63, 
                a[s++] = 128 | 63 & i); else for (s = this.start; h < n && s < 64; ++h) (i = t.charCodeAt(h)) < 128 ? f[s >> 2] |= i << u[3 & s++] : i < 2048 ? (f[s >> 2] |= (192 | i >> 6) << u[3 & s++], 
                f[s >> 2] |= (128 | 63 & i) << u[3 & s++]) : i < 55296 || i >= 57344 ? (f[s >> 2] |= (224 | i >> 12) << u[3 & s++], 
                f[s >> 2] |= (128 | i >> 6 & 63) << u[3 & s++], f[s >> 2] |= (128 | 63 & i) << u[3 & s++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(++h)), 
                f[s >> 2] |= (240 | i >> 18) << u[3 & s++], f[s >> 2] |= (128 | i >> 12 & 63) << u[3 & s++], 
                f[s >> 2] |= (128 | i >> 6 & 63) << u[3 & s++], f[s >> 2] |= (128 | 63 & i) << u[3 & s++]);
                this.lastByteIndex = s, this.bytes += s - this.start, s >= 64 ? (this.start = s - 64, 
                this.hash(), this.hashed = !0) : this.start = s;
            }
            return this;
        }
    }, e.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks, e = this.lastByteIndex;
            t[e >> 2] |= a[3 & e], e >= 56 && (this.hashed || this.hash(), t[0] = t[16], t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), 
            t[14] = this.bytes << 3, this.hash();
        }
    }, e.prototype.hash = function() {
        var t, e, r, i, s, h, n = this.blocks;
        this.first ? e = ((e = ((t = ((t = n[0] - 680876937) << 7 | t >>> 25) - 271733879 << 0) ^ (r = ((r = (-271733879 ^ (i = ((i = (-1732584194 ^ 2004318071 & t) + n[1] - 117830708) << 12 | i >>> 20) + t << 0) & (-271733879 ^ t)) + n[2] - 1126478375) << 17 | r >>> 15) + i << 0) & (i ^ t)) + n[3] - 1316259209) << 22 | e >>> 10) + r << 0 : (t = this.h0, 
        e = this.h1, r = this.h2, e = ((e += ((t = ((t += ((i = this.h3) ^ e & (r ^ i)) + n[0] - 680876936) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (i = ((i += (r ^ t & (e ^ r)) + n[1] - 389564586) << 12 | i >>> 20) + t << 0) & (t ^ e)) + n[2] + 606105819) << 17 | r >>> 15) + i << 0) & (i ^ t)) + n[3] - 1044525330) << 22 | e >>> 10) + r << 0), 
        e = ((e += ((t = ((t += (i ^ e & (r ^ i)) + n[4] - 176418897) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (i = ((i += (r ^ t & (e ^ r)) + n[5] + 1200080426) << 12 | i >>> 20) + t << 0) & (t ^ e)) + n[6] - 1473231341) << 17 | r >>> 15) + i << 0) & (i ^ t)) + n[7] - 45705983) << 22 | e >>> 10) + r << 0, 
        e = ((e += ((t = ((t += (i ^ e & (r ^ i)) + n[8] + 1770035416) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (i = ((i += (r ^ t & (e ^ r)) + n[9] - 1958414417) << 12 | i >>> 20) + t << 0) & (t ^ e)) + n[10] - 42063) << 17 | r >>> 15) + i << 0) & (i ^ t)) + n[11] - 1990404162) << 22 | e >>> 10) + r << 0, 
        e = ((e += ((t = ((t += (i ^ e & (r ^ i)) + n[12] + 1804603682) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (i = ((i += (r ^ t & (e ^ r)) + n[13] - 40341101) << 12 | i >>> 20) + t << 0) & (t ^ e)) + n[14] - 1502002290) << 17 | r >>> 15) + i << 0) & (i ^ t)) + n[15] + 1236535329) << 22 | e >>> 10) + r << 0, 
        e = ((e += ((i = ((i += (e ^ r & ((t = ((t += (r ^ i & (e ^ r)) + n[1] - 165796510) << 5 | t >>> 27) + e << 0) ^ e)) + n[6] - 1069501632) << 9 | i >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (i ^ t)) + n[11] + 643717713) << 14 | r >>> 18) + i << 0) ^ i)) + n[0] - 373897302) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((i = ((i += (e ^ r & ((t = ((t += (r ^ i & (e ^ r)) + n[5] - 701558691) << 5 | t >>> 27) + e << 0) ^ e)) + n[10] + 38016083) << 9 | i >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (i ^ t)) + n[15] - 660478335) << 14 | r >>> 18) + i << 0) ^ i)) + n[4] - 405537848) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((i = ((i += (e ^ r & ((t = ((t += (r ^ i & (e ^ r)) + n[9] + 568446438) << 5 | t >>> 27) + e << 0) ^ e)) + n[14] - 1019803690) << 9 | i >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (i ^ t)) + n[3] - 187363961) << 14 | r >>> 18) + i << 0) ^ i)) + n[8] + 1163531501) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((i = ((i += (e ^ r & ((t = ((t += (r ^ i & (e ^ r)) + n[13] - 1444681467) << 5 | t >>> 27) + e << 0) ^ e)) + n[2] - 51403784) << 9 | i >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (i ^ t)) + n[7] + 1735328473) << 14 | r >>> 18) + i << 0) ^ i)) + n[12] - 1926607734) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((h = (i = ((i += ((s = e ^ r) ^ (t = ((t += (s ^ i) + n[5] - 378558) << 4 | t >>> 28) + e << 0)) + n[8] - 2022574463) << 11 | i >>> 21) + t << 0) ^ t) ^ (r = ((r += (h ^ e) + n[11] + 1839030562) << 16 | r >>> 16) + i << 0)) + n[14] - 35309556) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((h = (i = ((i += ((s = e ^ r) ^ (t = ((t += (s ^ i) + n[1] - 1530992060) << 4 | t >>> 28) + e << 0)) + n[4] + 1272893353) << 11 | i >>> 21) + t << 0) ^ t) ^ (r = ((r += (h ^ e) + n[7] - 155497632) << 16 | r >>> 16) + i << 0)) + n[10] - 1094730640) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((h = (i = ((i += ((s = e ^ r) ^ (t = ((t += (s ^ i) + n[13] + 681279174) << 4 | t >>> 28) + e << 0)) + n[0] - 358537222) << 11 | i >>> 21) + t << 0) ^ t) ^ (r = ((r += (h ^ e) + n[3] - 722521979) << 16 | r >>> 16) + i << 0)) + n[6] + 76029189) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((h = (i = ((i += ((s = e ^ r) ^ (t = ((t += (s ^ i) + n[9] - 640364487) << 4 | t >>> 28) + e << 0)) + n[12] - 421815835) << 11 | i >>> 21) + t << 0) ^ t) ^ (r = ((r += (h ^ e) + n[15] + 530742520) << 16 | r >>> 16) + i << 0)) + n[2] - 995338651) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((i = ((i += (e ^ ((t = ((t += (r ^ (e | ~i)) + n[0] - 198630844) << 6 | t >>> 26) + e << 0) | ~r)) + n[7] + 1126891415) << 10 | i >>> 22) + t << 0) ^ ((r = ((r += (t ^ (i | ~e)) + n[14] - 1416354905) << 15 | r >>> 17) + i << 0) | ~t)) + n[5] - 57434055) << 21 | e >>> 11) + r << 0, 
        e = ((e += ((i = ((i += (e ^ ((t = ((t += (r ^ (e | ~i)) + n[12] + 1700485571) << 6 | t >>> 26) + e << 0) | ~r)) + n[3] - 1894986606) << 10 | i >>> 22) + t << 0) ^ ((r = ((r += (t ^ (i | ~e)) + n[10] - 1051523) << 15 | r >>> 17) + i << 0) | ~t)) + n[1] - 2054922799) << 21 | e >>> 11) + r << 0, 
        e = ((e += ((i = ((i += (e ^ ((t = ((t += (r ^ (e | ~i)) + n[8] + 1873313359) << 6 | t >>> 26) + e << 0) | ~r)) + n[15] - 30611744) << 10 | i >>> 22) + t << 0) ^ ((r = ((r += (t ^ (i | ~e)) + n[6] - 1560198380) << 15 | r >>> 17) + i << 0) | ~t)) + n[13] + 1309151649) << 21 | e >>> 11) + r << 0, 
        e = ((e += ((i = ((i += (e ^ ((t = ((t += (r ^ (e | ~i)) + n[4] - 145523070) << 6 | t >>> 26) + e << 0) | ~r)) + n[11] - 1120210379) << 10 | i >>> 22) + t << 0) ^ ((r = ((r += (t ^ (i | ~e)) + n[2] + 718787259) << 15 | r >>> 17) + i << 0) | ~t)) + n[9] - 343485551) << 21 | e >>> 11) + r << 0, 
        this.first ? (this.h0 = t + 1732584193 << 0, this.h1 = e - 271733879 << 0, this.h2 = r - 1732584194 << 0, 
        this.h3 = i + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + t << 0, this.h1 = this.h1 + e << 0, 
        this.h2 = this.h2 + r << 0, this.h3 = this.h3 + i << 0);
    }, e.prototype.hex = function() {
        this.finalize();
        var t = this.h0, e = this.h1, r = this.h2, i = this.h3;
        return f[t >> 4 & 15] + f[15 & t] + f[t >> 12 & 15] + f[t >> 8 & 15] + f[t >> 20 & 15] + f[t >> 16 & 15] + f[t >> 28 & 15] + f[t >> 24 & 15] + f[e >> 4 & 15] + f[15 & e] + f[e >> 12 & 15] + f[e >> 8 & 15] + f[e >> 20 & 15] + f[e >> 16 & 15] + f[e >> 28 & 15] + f[e >> 24 & 15] + f[r >> 4 & 15] + f[15 & r] + f[r >> 12 & 15] + f[r >> 8 & 15] + f[r >> 20 & 15] + f[r >> 16 & 15] + f[r >> 28 & 15] + f[r >> 24 & 15] + f[i >> 4 & 15] + f[15 & i] + f[i >> 12 & 15] + f[i >> 8 & 15] + f[i >> 20 & 15] + f[i >> 16 & 15] + f[i >> 28 & 15] + f[i >> 24 & 15];
    }, e.prototype.toString = e.prototype.hex, e.prototype.digest = function() {
        this.finalize();
        var t = this.h0, e = this.h1, r = this.h2, i = this.h3;
        return [ 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 255 & i, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255 ];
    }, e.prototype.array = e.prototype.digest, e.prototype.arrayBuffer = function() {
        this.finalize();
        var t = new ArrayBuffer(16), e = new Uint32Array(t);
        return e[0] = this.h0, e[1] = this.h1, e[2] = this.h2, e[3] = this.h3, t;
    }, e.prototype.buffer = e.prototype.arrayBuffer;
    var b = function() {
        var t = c("hex");
        i && (t = l(t)), t.create = function() {
            return new e();
        }, t.update = function(e) {
            return t.create().update(e);
        };
        for (var r = 0; r < d.length; ++r) {
            var s = d[r];
            t[s] = c(s);
        }
        return t;
    }();
    h ? module.exports = b : (r.md5 = b, n && define(function() {
        return b;
    }));
}();