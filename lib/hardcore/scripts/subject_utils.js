var r, e;

r = require("../../underscore"), e = {
    DEFAULT_AVATAR_URL: "https://img1.doubanio.com/icon/user_normal.jpg",
    unifyFields: function(r) {
        switch (r.type) {
          case "group":
            return {
                id: r.id,
                name: r.name,
                type: r.type,
                avatar: r.avatar,
                intro: r.intro,
                url: "/pages/subject/group?id=" + r.id
            };

          default:
            return {
                id: r.id,
                name: r.title,
                type: r.type,
                avatar: r.pic ? r.pic.normal : r.cover ? r.cover.url : "",
                intro: r.intro,
                year: r.year,
                rating: e.rating(r.rating, r.null_rating_reason),
                genres_str: r.genres ? r.genres.join(" / ") : "",
                countries_str: r.countries ? r.countries.join(" / ") : "",
                release_date: r.release_date,
                url: "/pages/subject/subject?type=" + r.type + "&id=" + r.id
            };
        }
    },
    rating: function(r, t) {
        var n;
        return (n = t ? {
            count: 0,
            value: 0,
            max: 10,
            null_reason: t
        } : r ? {
            count: r.count,
            value: r.value.toFixed(1),
            max: r.max
        } : {
            count: 0,
            value: 0,
            max: 10,
            null_reason: "暂无评分"
        }).stars = e.ratingStars(n), n;
    },
    ratingStars: function(r) {
        var t, n, a, u;
        for (u = r ? 5 * r.value / r.max : 0, a = [], t = n = 0; n <= 4; t = ++n) a.push(e._starType(u - t));
        return a;
    },
    _starType: function(r) {
        switch (!1) {
          case !(r >= .75):
            return "full";

          case !(r >= .25):
            return "half";

          default:
            return "gray";
        }
    },
    parseInterest: function(t, n) {
        var a;
        return (a = r(t).clone()).rating && (a.rating.stars = e.ratingStars(a.rating)), 
        n && (a.user = n), a.subject && (a.subject = e.unifyFields(a.subject)), a;
    },
    parseReview: function(r) {
        return r.rating = e.rating(r.rating), r;
    },
    get_verb_by_type: function(r) {
        switch (r) {
          case "movie":
          case "tv":
            return "看";

          case "book":
            return "读";

          default:
            return "看";
        }
    },
    parseWidgetData: function(r) {
        try {
            return JSON.parse(decodeURIComponent(r));
        } catch (r) {
            return {
                err: r.toString()
            };
        }
    }
}, module.exports = e;