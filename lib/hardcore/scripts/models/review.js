var e, t, r, n, i, o = function(e, t) {
    function r() {
        this.constructor = e;
    }
    for (var n in t) p.call(t, n) && (e[n] = t[n]);
    return r.prototype = t.prototype, e.prototype = new r(), e.__super__ = t.prototype, 
    e;
}, p = {}.hasOwnProperty;

e = (n = require("base")).BaseModel, n.BaseCollection, r = require("../../../underscore"), 
i = require("../subject_utils"), t = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    return o(n, e), n.prototype.json = function() {
        var e, t;
        return e = n.__super__.json.apply(this, arguments), t = {
            content: this.content(),
            rating: i.rating(this.data.rating)
        }, r.defaults(t, e);
    }, n.prototype.content = function() {
        return this.data.content.replace(/<style([\s\S]*?)<\/style>/gi, "").replace(/<script([\s\S]*?)<\/script>/gi, "").replace(/<\/div>/gi, "\n").replace(/<\/li>/gi, "\n").replace(/<li>/gi, "  *  ").replace(/<\/ul>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<br\s*[\/]?>/gi, "\n").replace(/<[^>]+>/gi, "").replace(/&nbsp;/gi, " ");
    }, n;
}(), module.exports = {
    ReviewModel: t
};