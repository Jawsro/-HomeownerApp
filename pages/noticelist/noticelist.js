// pages/noticelist/noticelist.js
// 获取应用实例
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
import {timeDate} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList:[]
  },
  //社区动态
  _getNoticeList(id){
    let _this = this;
    let data = {
      subdistrictId :id,
      page:1
    };
    HttpRequest('/app.php/subdistrict_api/getNoticeList',data,'get',res=>{
      if(res.status == true){
        console.log(res)
        _this.data.noticeList = res.data;
        _this.data.noticeList.forEach(item =>{
          item.createtime=timeDate(item.createtime)
        })
        _this.setData({
          noticeList:_this.data.noticeList
        })
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this = this;
    let subdistrictId = wx.getStorageSync('subdistrictId');
    _this.setData({
      title:options.title
    })
    if(options.title =='社区动态'){
      _this._getNoticeList(subdistrictId)
    }
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