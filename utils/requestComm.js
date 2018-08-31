/**
 * 封封微信的的request
 */
function request(data = {}, method = "GET") {
  let i;
  data.page.setData(((i = {})["loading." + data.loadingKey] = true, i))
  return new Promise(function (resolve, reject) {
    let header = {};
    if (!method || method.toLowerCase() == 'get') {
      header = {
      }
    } else {
      header = {
        "X-Api-Key": '054022eaeae0b00e0fc068c0c0a2102a',
        "X-Appid": "wx2f9b06c1de1ccfca"
      }
    }
    data.data=data.data||{};
    data.data.apikey = '054022eaeae0b00e0fc068c0c0a2102a';
    data.data.appid = "wx2f9b06c1de1ccfca";
    wx.request({
      url: data.path,
      data: data.data,
      method: method,
      header: header,
      success: function (res) {
        if (200 <= res.statusCode && res.statusCode < 300) {
          resolve(res.data)
        }else{
          reject(res.data);
        }
      },
      fail: function (res) {
        console.log(res)
        reject(res);
      },
      complete: function () {
        data.page.setData(((i = {})["loading." + data.loadingKey] = false, i))
        wx.stopPullDownRefresh();
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })
  });
};
module.exports={
  request
}