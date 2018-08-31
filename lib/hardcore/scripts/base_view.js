var t;

t = function() {
    function t() {
        this.status = "init";
    }
    return t.prototype.setLoading = function(t, a) {
        var i, n, o;
        if (o = this.calcPageLoading(), this.setData(((i = {})["loading." + t] = a, i)), 
        o !== (n = this.calcPageLoading()) && "ready" === this.status) return n ? wx.showNavigationBarLoading() : wx.hideNavigationBarLoading();
    }, t.prototype.getLoading = function(t) {
        var a;
        return null != (a = this.data.loading) ? a[t] : void 0;
    }, t.prototype.calcPageLoading = function() {
        var t, a;
        for (t in a = this.data.loading) if (a[t]) return !0;
        return !1;
    }, t.register = function() {
        return Page(new this());
    }, t.prototype.onLoad = function(t) {
        return this.opts = t, this.status = "loaded";
    }, t.prototype.onShow = function() {
        return {};
    }, t.prototype.onReady = function() {
        if (this.status = "ready", this.calcPageLoading()) return wx.showNavigationBarLoading();
    }, t;
}(), module.exports = t;