var t, n;

n = function() {
    function t(t) {
        this.loadData(t);
    }
    return t.prototype.loadData = function(t) {
        return this.data = t;
    }, t.prototype.json = function() {
        return this.data;
    }, t;
}(), t = function() {
    function t(t) {
        var n, o;
        n = this.model, this.modelList = function() {
            var e, r, i;
            if (t) {
                if (n) {
                    for (i = [], e = 0, r = t.length; e < r; e++) o = t[e], i.push(new n(o));
                    return i;
                }
                return t;
            }
            return [];
        }();
    }
    return t.prototype.clear = function() {
        return this.modelList = [];
    }, t.prototype.json = function() {
        var t, n, o, e, r;
        for (r = [], n = 0, o = (e = this.modelList).length; n < o; n++) t = e[n], r.push(t.json());
        return r;
    }, t.prototype.append = function(t) {
        return this.modelList = this.modelList.concat(t.modelList), this;
    }, t.prototype.length = function() {
        return this.modelList.length;
    }, t;
}(), module.exports = {
    BaseModel: n,
    BaseCollection: t
};