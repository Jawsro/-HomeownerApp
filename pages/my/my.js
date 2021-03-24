const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginStatue:true,
    authenticationStatus:false,
    headImg:'',
    functionLisr:[
      {
        name:'我的车位 ',
        url:''
      },{
        name:'我的汽车 ',
        url:''
      },{
        name:'我的商铺 ',
        url:''
      },
  ]
  },
  isLogin(){
      let _this = this;
    try {
      let loginStatue = wx.getStorageSync('loginStatue');
      if (!loginStatue) {
        _this.setData({
          loginStatue:true
        })
      }else{
        _this.setData({
          loginStatue:false
        })
      }
    } catch (e) {}
    
  },
  goLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  goClick(){
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
    if(loginStatue && authenticationStatus !=''){ 
      wx.navigateTo({
        url: '../houselist/houselist'
      })
    }else { console.log(1111)
        wx.showModal({
          title: '提示',
          content: '请先登录并且完成身份认证！',
          showCancel: false
        })
      } 
  },
  goOwner(){
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    console.log(loginStatue)
    if(loginStatue){ 
      wx.navigateTo({
        url: '../owner/owner'
      })
    }else {
        wx.showModal({
          title: '提示',
          content: '请先登录',
          showCancel: false
        })
      } 
  },
  goFunction(){
    wx.showModal({
      title: '提示',
      content: '功能开发中...',
      showCancel: false
    })
  },
  attached() { 
    let bar = wx.getMenuButtonBoundingClientRect()		// 获取胶囊丸信息
    // 胶囊的top有时候获取到是0 ，所以兼容 statusBarHeight（刘海的高度，原生标题栏的top，比胶囊的top高一些）
    let top = bar.top || wx.getSystemInfoSync().statusBarHeight+4	
    this.setData({
        height: bar.height,	// 标题栏高度与胶囊 高度相同，适用于透明标题栏。
        top	// 标题栏top。如果标题栏高度比胶囊大，设置为 top - (navigationHeight - bar.height)/2
    })
  },
  _getAppUserInfo(){
    HttpRequest("/app.php/app_user_api/getAppUserInfo",{},'get',res =>{
      if(res.status == true){
        this.setData({
          userInfo : res.data
        })
      }
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {console.log(options)
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
    this.attached()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isLogin();
   let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
   console.log(wx.getStorageSync('token'))
    this.setData({
      authenticationStatus :  authenticationStatus,
    })
    if(wx.getStorageSync('token') != ''){
      this._getAppUserInfo();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})