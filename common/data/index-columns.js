var t;

t = [ {
    title: "近期上映",
    name: "movie",
    collection_tag: "movie_showing",
    items: []
}, {
    title: "热门电影",
    name: "movie_hot",
    collection_tag: "movie_hot_gaia",
    items: []
}, {
    title: "电视剧",
    name: "tv",
    collection_tag: "tv_hot",
    items: []
}, {
    title: "综艺",
    name: "variety_show",
    collection_tag: "tv_variety_show",
    items: []
} ], module.exports = {
    columns: t,
    get_column_by_name: function(e) {
        var o, i, m;
        for (i = 0, m = t.length; i < m; i++) if ((o = t[i]).name === e) return o;
    }
};