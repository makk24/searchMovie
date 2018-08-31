function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const url_prefix = {
  MOBILE: "https://" + "m.douban.com" + "/rexxar/api",
  ACCOUNTS: "https://" + "accounts.douban.com",
  FRODO_V2: "https://" + "frodo.douban.com" + "/api/v2",
  MOVIE_V2: "https://" + "movie.douban.com" + "/api/v2"
};
module.exports = {
  formatTime: formatTime,
  url_prefix
}