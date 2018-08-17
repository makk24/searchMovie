var store = require('./store.js')
var config = require('./config.js')
module.exports = {
  getLocation: function (cb) {
    var location = store.location
    if (location) {
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude;
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          //header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' }, // 设置请求的 header
          success: function (res) {
            console.log(res)
            // success
            store.location = res.data.result
            cb(res.data.result)
          }
        })
      }
    })
  },
  getCity: function (cb) {
    this.getLocation(function (location) {
      cb(location.addressComponent.city.replace('市', ''))
    })
  },
  fetchFilms: function (url, city, start, count, cb) {
    var that = this
    wx.request({
      url: url + '?city=' + city + '&start=' + start + '&count=' + count,
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res)
        // success
        var data = res.data;
        if (data.subjects.length === 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            films: that.data.films.concat(data.subjects),
            start: that.data.start + data.subjects.length
          })
        }
        cb(data)
      }
    })
  }
}