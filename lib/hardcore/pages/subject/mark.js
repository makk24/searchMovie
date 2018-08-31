var t, e, r, n, a = function(t, e) {
    function r() {
        this.constructor = t;
    }
    for (var n in e) o.call(e, n) && (t[n] = e[n]);
    return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, 
    t;
}, o = {}.hasOwnProperty;

e = require("../../../underscore"), n = require("../../scripts/subject_utils"), 
t = require("../../scripts/base_view"), r = require("../../scripts/requests"), function(o) {
    function i() {
        return i.__super__.constructor.apply(this, arguments);
    }
    a(i, t), i.prototype.data = {
        action: "mark",
        action_name: "想读",
        id: "",
        type: "movie",
        need_rating: !0,
        rating: 0,
        stars: [ "gray", "gray", "gray", "gray", "gray" ],
        comment: ""
    }, i.prototype.onLoad = function(t) {
        var a, o, s, c, u, p, g;
        return i.__super__.onLoad.call(this, t), s = e(t).pick("id", "type", "action"), 
        g = n.get_verb_by_type(this.opts.type), s.action_name = function() {
            switch (t.action) {
              case "mark":
                return "想" + g;

              case "doing":
                return "在" + g;

              case "done":
                return "看" + g;
            }
        }(), s.need_rating = "doing" === (c = t.action) || "done" === c, this.setData(s), 
        p = (u = this.opts).type, a = u.id, o = this, r.frodo_v2.get({
            path: "/" + p + "/" + a + "/interest",
            loadingKey: "interest",
            page: this
        }).then(function(t) {
            var e, r;
            if (e = t.comment, r = t.rating, o.setData({
                comment: e
            }), o.data.need_rating) return o.updateRating(r ? r.value : 0);
        });
    }, i.prototype.updateRating = function(t) {
        var r;
        return r = e.chain(5).range().map(function(e) {
            return {
                rating: e + 1,
                color: e + 1 > t ? "gray" : "full"
            };
        }).value(), this.setData({
            rating: t,
            stars: r
        });
    }, i.prototype.onStarClicked = function(t) {
        var e;
        return e = t.currentTarget.dataset.rating, this.updateRating(e);
    }, i.prototype.onCommentFormSubmit = function(t) {
        var e, n, a, o, i, s;
        return n = t.detail.value.comment, o = this.data.rating, a = (i = this.opts).id, 
        s = i.type, e = i.action, r.frodo_v2.post({
            path: "/" + s + "/" + a + "/" + e,
            data: {
                rating: o,
                comment: n,
                sync_douban: 1
            },
            loadingKey: "mark",
            page: this
        }).then(function() {
            return wx.showToast({
                title: "标记成功",
                icon: "success"
            }), wx.navigateBack();
        });
    }, i.prototype.onSubmitClicked = function(t) {
        return console.log("submit clicked", t.currentTarget.dataset);
    }, i.register();
}();