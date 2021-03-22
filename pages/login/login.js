// index.js
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  

  // 事件处理函数
  
  onLoad() {},
  getUserInfo(e) {
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    console.log(e)
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        if(res.code){
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          HttpRequest('/app.php/login_api/wechatLogin',{code:res.code},'get',result=>{
            console.log(result)
            if(result.status == true){
              wx.showToast({
                title: result.msg,
                duration:2000
              })
              //发送用户信息到后台
              //成功后将后台返回来的token,用户id保存在本地
              wx.setStorageSync('token', result.token);
              wx.setStorageSync('loginStatue', true);
              setTimeout( () => {
                wx.switchTab({
                  url: '../index/index',
                })
              },2000)
            }
            
            
          })
        }
         
      }
    })
    //获取用户信息
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else 
    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  }
})
