
var rootDocment = 'https://xxxxxxxxxxxxx/';//请求地址
var header = {
  'content-type': 'application/json'
}
// function getReq(url, callback) {
//   wx.showLoading({
//     title: '加载中',
//   })
//   wx.request({
//     url: rootDocment + url,
//     method: 'get',
//     header: header,
//     success: function (res) {
//       wx.hideLoading();
//       return typeof callback == "function" && callback(res.data)
//     },
//     fail: function () {
//       wx.hideLoading();
//       wx.showModal({
//         title: '网络错误',
//         content: '网络出错，请刷新重试',
//         showCancel: false
//       })
//       return typeof callback == "function" && callback(false)
//     }
//   })
// }
 
// function postReq(url, data, callback) {
//   wx.showLoading({
//     title: '加载中',
//   })
//     wx.request({
//       url: rootDocment + url,
//       header: header,
//       data: data,
//       method: 'post',
//       success: function (res) {
//         wx.hideLoading();
//         return typeof callback == "function" && callback(res.data)
//       },
//       fail: function () {
//         wx.hideLoading();
//         wx.showModal({
//           title: '网络错误',
//           content: '网络出错，请刷新重试',
//           showCancel: false
//         })
//         return typeof callback == "function" && callback(false)
//       }
//     })
// }
 
function HttpRequest(url, data, callback,method = "GET") {
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
 function hot(){
   console.log(1111)
 }
module.exports = {
  // getReq: getReq,
  // postReq: postReq,
  header: header,
  HttpRequest:HttpRequest,
  hot:hot
}