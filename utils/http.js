
const rootDocment = 'http://gsh.5gzvip.idcfengye.com';//请求地址
var header = {
  'content-type': 'application/json'
}
function HttpRequest(url, data,method = "GET", callback) {
  data = Object.assign({
    token: wx.getStorageSync('token')
  }, data);
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: rootDocment + url,
    header: header,
    data: data,
    method: method,
    success: function (res) {
      wx.hideLoading();
      //对res的状态进行判断
      if(res.data.status ==false){
        wx.showModal({
          title: '提示',
          content: res.data.msg ,
          showCancel: false
        })
      }else if(res.data.status == -1){
        wx.showModal({
          title: '提示',
          content: '登录已过期！请先登录',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
        // wx.navigateTo({
        //   url: "/pages/login/login"
        // });
      }
      return typeof callback == "function" && callback(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof callback == "function" && callback(false)
    }
  })
}
module.exports = {
  header: header,
  HttpRequest:HttpRequest
}