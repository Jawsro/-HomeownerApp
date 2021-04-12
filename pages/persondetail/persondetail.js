// 获取应用实例
const app = getApp();
import {HttpRequest} from "../../utils/http.js";
import {timeDate} from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yemianIsShow:false,
    roomMemberList:[],
    roomId:0,
    cellName:''
  },
  addPerson(){
    wx.navigateTo({
      url: `../addperson/addperson?roomId=${this.data.roomId}&&cellname=${this.data.cellName}`,
    })
  },
  _getroomMemberList(roomId){
    let data = {
      roomId
    }
    HttpRequest('/app.php/app_user_api/roomMemberList',data,'get',res =>{
      if(res.status == true){
        console.log(res)
        this.data.roomMemberList = res.data;
        this.data.roomMemberList.forEach(item => {
         if(item.createtime){
          item.createtime=timeDate(item.createtime)
         }else{
          item.createtime = ''
         }
        })
        this.setData({
          roomMemberList:this.data.roomMemberList,
          yemianIsShow:true
        })
      }
    })
  },  
  deleteRoomMeber(e){
    console.log(e)
    let _this = this;
    let index = e.currentTarget.dataset.index;
    let roomMemberId = e.currentTarget.dataset.roommemberid;
    let data = {
      roomMemberId
    }
    wx.showModal({
      title: '提示',
      content: '您确定要删除该成员吗？',
      success (res) {
        if (res.confirm) {
          HttpRequest('/app.php/app_user_api/removeRoomMember',data,'get',res =>{
           if(res.status == true){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              _this.data.roomMemberList.splice(index,1);
              _this.setData({
                roomMemberList: _this.data.roomMemberList
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
    console.log(options)
    let roomId = options.roomid;
    this.data.roomId = roomId;
    this.setData({
      cellName: app.globalData.cellName
    })
    this._getroomMemberList(roomId);
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