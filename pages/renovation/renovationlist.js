const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
import {timeDate} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    moreText:'加载中',
    decorateList:[],
    yemian:false,
  },
  _getdecorateList(){
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
    HttpRequest("/app.php/app_user_api/decorateList",data,'get',res =>{
      if(res.status == true){
        res.data.forEach(item =>{
          item.createtime=timeDate(item.createtime)
        })
        _this.data.decorateList = _this.data.decorateList.concat(res.data)
        if( res.data.length<0){
          _this.data.moreText ='暂无数据';
          
        }else if(res.data.length<10){
          _this.data.moreText ='没有更多数据了';
          
        }else{
          _this.data.page ++;
          _this.data.moreText ='加载中';
        }
        _this.setData({
          decorateList:_this.data.decorateList,
          moreText:_this.data.moreText,
          yemian:true,
        })
      } 
    })
  },
  goDateils(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../renovation/renovationdetails?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this._getdecorateList()
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