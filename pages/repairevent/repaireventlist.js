const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
import {timeDate2} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    moreText:'加载中',
    repairEventList:[],
    processingList:[],
    yemian:false,
    sortTitle:[
      {id:1,name:"全部"},
      {id:2,name:"处理中"}
    ],
    activeIndex:1
  },
  changeTitle(e){
   let id = e.currentTarget.dataset.id;
   this.setData({
    activeIndex:id
   })
  },
  goRepairEventDetails(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../repairevent/repaireventdetails?id=${id}`,
    })
  },
  _getRepairEventList(){
    let _this = this;
    if(_this.data.moreText != '加载中'){
      return false;
    }
    _this.data.moreText = '正在加载更多';
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let data = {
      subdistrictId,
      page:this.data.page
    }
    HttpRequest("/app.php/app_user_api/repairEventList",data,'get',res =>{
      if(res.status == true){
        res.data.forEach(item =>{
          item.createtime=timeDate2(item.createtime)
        })
        _this.data.repairEventList = _this.data.repairEventList.concat(res.data)
        _this.data.repairEventList.forEach( item =>{
          if(item.complete_status == 'no'){
            _this.data.processingList.push(item)
          }
        })
        if( res.data.length<0){
          _this.data.moreText ='暂无数据';
          
        }else if(res.data.length<10){
          _this.data.moreText ='没有更多数据了';
          
        }else{
          _this.data.page ++;
          _this.data.moreText ='加载中';
        }
        _this.setData({
          repairEventList:_this.data.repairEventList,
          moreText:_this.data.moreText,
          yemian:true,
          processingList: _this.data.processingList
        })
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getRepairEventList()
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
    this._getRepairEventList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})