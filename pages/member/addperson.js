// 获取应用实例
const app = getApp();
import {HttpRequest} from "../../utils/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idArray:[
      {text:"家属",identity:"family"},
      {text:"租户",identity:"tenant"},
    ],
    index:0,
    roomId:0,
    btnDisabled:false
  },
  idChange(e){
    let index = e.detail.value;
    this.setData({
      index:index
    })
  },
  addRoomMember(e){
    let userType = this.data.idArray[this.data.index].text;
    if(userType == '家属'){
      userType = 'dweller'
    }else if(userType == '租户'){
      userType = 'tenant'
    }
    let roomId = this.data.roomId
    let {
      name,
      identityCode, 
      phone
    } = e.detail.value;
    let data = {
      roomId,
      name,
      identityCode, 
      phone,
      userType
    }
    this.setData({
      btnDisabled : true
    })
    HttpRequest('/app.php/app_user_api/addRoomMember',data,'post',res => {
      if(res.status == true){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout( () => {
          wx.navigateTo({
            url: `../persondetail/persondetail?roomid=${roomId}`,
          })
        },2000)
      }
      setTimeout(()=>{
        this.setData({
          btnDisabled : false
        })
      },2000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.roomId = options.roomId;
    this.setData({
      cellName: app.globalData.cellName
    })
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