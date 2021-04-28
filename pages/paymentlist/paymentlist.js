// 获取应用实例
const app = getApp();
import {HttpRequest} from "../../utils/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList:[],
    current: 1,
    scrollLeft: 0,
    windowWidth: 0,
    openPayDetail:0,
    zhangdan:[
      {
        id:1,
        yuefen:'2020年12月账单',
        wuye:'物业管理费',
        wuyefei:'188.00',
      },
      {
        id:2,
        yuefen:'2020年11月账单',
        wuye:'物业管理费',
        wuyefei:'188.00',
      }
    ]
  },
  currentNav(e){
    let id = e.currentTarget.dataset.id;
    let scrollLeft =  e.currentTarget.offsetLeft - ( this.data.windowWidth * 0.8 ) / 2;
    this.setData({
      current: id,
      scrollLeft: scrollLeft
    })
  },
  openPayDetails(e){ 
    let id = e.currentTarget.dataset.id;
    this.data.zhangdan.forEach(item=>{
      if(item.id==id){
        if(item.isShow==true){
          item.isShow=false
        }else{
          item.isShow=true
        }
      }else{
        item.isShow=false
      }
    })
    this.setData({
      zhangdan:this.data.zhangdan
    })
  },
  _getRoomList(){
    HttpRequest('/app.php/app_user_api/appUserRoomList',{},'get',res =>{
     if(res.status = true){
       this.data.roomList = res.data;
       let room_id = res.data[0].room_id;
       this.setData({
        current:room_id,
        roomList:this.data.roomList,
        yemianIsShow:true
       })
     }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.zhangdan.forEach(item=>{
      item.isShow=false
    })
    this.setData({
      current:options.village
    })
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowWidth: result.windowWidth
        })
      },
    })
    this._getRoomList()
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