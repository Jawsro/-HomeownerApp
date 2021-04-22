// 获取应用实例
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yemian:false,
    doorMsg:[],
    successIshow:false,
    loadingIshow:false,
    maskIsshow:false,
  },
  _getLockList(){
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let data = {
      subdistrictId
    }
    HttpRequest('/app.php/app_user_api/gateLockList',data,'get',res=>{
      if(res.status == true) {
        this.data.doorMsg = res.data;
        this.setData({
          doorMsg: this.data.doorMsg,
          yemian:true
        })
      }
    })
  },
  openDoor(e) {
    let name = e.currentTarget.dataset.name,
        id = e.currentTarget.dataset.id;
    this.setData({
      doorName: name,
      maskIsshow:true,
      loadingIshow:true
    })
    let data = {
      gateLockId :id
    }
    
    HttpRequest('/app.php/app_user_api/openGateLock',data,'get',res=>{
      if(res.status == true) {
        //请求成功后
         this.setData({
          loadingIshow:false,
          successIshow:true
        })
      }
    })
    
  },
  closeTishi(){
    this.setData({
      successIshow:false,
      maskIsshow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this._getLockList()
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