const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginStatue:true,
    authenticationStatus:false,
    headImg:''
  },
  isLogin(){
      let _this = this;
    try {
      let loginStatue = wx.getStorageSync('loginStatue');
      //let loginStatue = 1;
      if (!loginStatue) {
        _this.setData({
          loginStatue:true
        })
        console.log(1111)
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
  attached() { 
    let bar = wx.getMenuButtonBoundingClientRect()		// 获取胶囊丸信息
    // 胶囊的top有时候获取到是0 ，所以兼容 statusBarHeight（刘海的高度，原生标题栏的top，比胶囊的top高一些）
    let top = bar.top || wx.getSystemInfoSync().statusBarHeight+4	
    this.setData({
        height: bar.height,	// 标题栏高度与胶囊 高度相同，适用于透明标题栏。
        top	// 标题栏top。如果标题栏高度比胶囊大，设置为 top - (navigationHeight - bar.height)/2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   
    if (app.globalData.userInfo) {
      this.setData({
        headImg:app.globalData.userInfo.avatarUrl
      })
      console.log(app.globalData.userInfo.avatarUrl)
    }else{
      this.setData({
        headImg:this.data.headImg
      })
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