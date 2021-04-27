const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
import {timeDate2,formatTime} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wuxingArr:[
      {id:1,icon:"icon-wuxing"},
      {id:2,icon:"icon-wuxing"},
      {id:3,icon:"icon-wuxing"},
      {id:4,icon:"icon-wuxing"},
      {id:5,icon:"icon-wuxing"},
    ],
    completedIshow:false,
    repairEventInfo:{},
    repairProcess:[],
    yemian:false,
    repairEventId:0
  },
  //五星评价
  getAppraise(e){
    let index = e.currentTarget.dataset.index;
    let data = {
      repairEventId:this.data.repairEventId,
      score:index
    }
    HttpRequest('/app.php/app_user_api/repairEventEvaluation',data,'get', res =>{
      if(res.status == true){
        this.setData({
          activeLen:index,
          completedIshow:true
        })
      }
    })
    
  },
  //详情信息
  _getRepairEventInfo(id){
    let data = {
      repairEventId : id
    }
    HttpRequest('/app.php/app_user_api/repairEventInfo',data,'get', res =>{
      if(res.status == true){
        let repairProcess = res.data.repair_process;
        res.data.createtime = timeDate2( res.data.createtime)
        repairProcess.forEach(item =>{
          item.occur_time = timeDate2(item.occur_time)
        })
        this.setData({
          repairEventInfo :res.data,
          repairProcess,
          yemian:true
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
    let id = options.id
    this._getRepairEventInfo(id);
    this.setData({
      repairEventId:id
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