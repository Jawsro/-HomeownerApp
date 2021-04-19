// 获取应用实例
const app = getApp();
import {HttpRequest} from "../../utils/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yemianIsShow:false,
    roomList:[]
  },
  goPersonDetails(e){
    let roomId  = e.currentTarget.dataset.roomid;
    let cellname = e.currentTarget.dataset.cellname;
    app.globalData.cellName = cellname
    wx.navigateTo({
      url: `../member/persondetail?roomid=${roomId}`,
    })
  },
  goAddHouse(){
    wx.navigateTo({
      url: '../house/addhouse',
    })
  },
  _getRoomList(){
    HttpRequest('/app.php/app_user_api/appUserRoomList',{},'get',res =>{
     if(res.status = true){
       this.data.roomList = res.data;
       this.setData({
        roomList:this.data.roomList,
        yemianIsShow:true
       })
     }
    })
  },
  deleteHouse(e){
    let _this = this;
    let roomMemberId = e.currentTarget.dataset.roommemberid;
    let index  = e.target.dataset.index ;
    let data = {
      roomMemberId
    }
    wx.showModal({
      title: '提示',
      content: '您确定要和该房屋解除绑定吗？',
      success (res) {
        if (res.confirm) {
          HttpRequest('/app.php/app_user_api/appUserRemoveRoom',data,'get',res =>{
           if(res.status == true){
              wx.showToast({
                title: '解除绑定成功',
                icon: 'success',
                duration: 3000
              })
              _this.data.roomList.splice(index,1);
              _this.setData({
                roomList: _this.data.roomList
              })
           }
          })
        } 
      }
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
    this._getRoomList();
    let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
    this.setData({
      authenticationStatus
    })
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