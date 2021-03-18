// pages/addHouse/addHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityArray: ['广西','桂林'],
    cityIndex: 0,
    index:0,
    xiaoquArray:['公园悦府','碧水湾','盛公馆']
  },
  bindPickerChange: function (e) {
    //根据所选状态请求后台
    console.log( e)
    this.setData({
      cityIndex: e.detail.value
    })
  },
  bindcolumnchange(e){
    console.log(e)
  },
  XiaoQuChange(e){
    this.setData({
      index: e.detail.value
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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