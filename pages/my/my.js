const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yemian:true,
    loginStatue:true,
    authenticationStatus:false,
    headImg:'',
    functionList:[
      {
        id:1,
        name:'我的房屋信息 ',
        url:'../house/houselist'
      },
      {
        id:2,
        name:'我的车位 ',
        url:'../parkingspace/parkingspacelist'
      },
      // {
      //   id:3,
      //   name:'我的汽车 ',
      //   url:'../car/carlist'
      // },
      {
        id:4,
        name:'我的商铺 ',
        url:'../addshops/addshops'
      },
      {
        id:5,
        name:'我的报事报修 ',
        url:'../repairevent/repaireventlist'
      },
      {
        id:5,
        name:'装修信息 ',
        url:'../renovation/renovationlist'
      },
  ],
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
  goOwner(){
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
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
  addMsg(e){
    let id = e.currentTarget.dataset.id;
    this.data.functionList.forEach(item =>{
      if(item.id==id){
        wx.navigateTo({
          url:item.url
        })
      }
    })
  },
  goFunction(e){
    let url = e.currentTarget.dataset.url;
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    // let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
    if(loginStatue){ //  && authenticationStatus == 'yes'
      wx.navigateTo({
        url: url,
      })
    }else { 
        wx.showModal({
          title: '提示',
          content: '请先登录！',
          showCancel: false
        })
      } 
  },
  // attached() { 
  //   let bar = wx.getMenuButtonBoundingClientRect()		// 获取胶囊丸信息
  //   // 胶囊的top有时候获取到是0 ，所以兼容 statusBarHeight（刘海的高度，原生标题栏的top，比胶囊的top高一些）
  //   let top = bar.top || wx.getSystemInfoSync().statusBarHeight+4	
  //   this.setData({
  //       height: bar.height,	// 标题栏高度与胶囊 高度相同，适用于透明标题栏。
  //       top	// 标题栏top。如果标题栏高度比胶囊大，设置为 top - (navigationHeight - bar.height)/2
  //   })
  // },
  _getAppUserInfo(){
    let _this = this;
    HttpRequest("/app.php/app_user_api/getAppUserInfo",{},'get',res =>{
      if(res.status == true){
        _this.setData({
          userInfo : res.data,
          yemian:true
        })
        // wx.setStorageSync('authenticationStatus', res.data.auth_status);

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {wx.setStorageSync('authenticationStatus','yes')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.attached();
    this.isLogin();
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