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
    yemian:false,
    noticeList:[],
    moreText:'加载中',
    page:1,
  },
  //社区动态
  _getNoticeList(){
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let _this = this;
    if(_this.data.moreText != '加载中'){
      return false;
    }
    _this.data.moreText = '正在加载更多';
    let data = {
      subdistrictId :subdistrictId,
      page:_this.data.page
    };
    HttpRequest('/app.php/information_api/getNewsList',data,'get',res=>{
      if(res.status == true){
        res.data.forEach(item =>{
          item.head_image = app.globalData.siteUrl + item.head_image;
          item.createtime=timeDate(item.createtime)
        })
        _this.data.noticeList = _this.data.noticeList.concat(res.data)
        if( res.data.length<0){
          _this.data.moreText ='暂无数据';
          
        }else if(res.data.length<10){
          _this.data.moreText ='没有更多数据了';
          
        }else{
          _this.data.page ++;
          _this.data.moreText ='加载中';
        }
        _this.setData({
          noticeList:_this.data.noticeList,
          moreText:_this.data.moreText,
          yemian:true
        })
      } 
    })
  },
  goInformation(e){
    let id = e.currentTarget.dataset.id;
    let content = e.currentTarget.dataset.content;
    if (content == true){
      wx.navigateTo({
        url: '/pages/information/information?newsId='+id+'&title=社区动态',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      title:options.title
    })
    if(options.title =='社区动态'){
      _this._getNoticeList()
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
    this._getNoticeList();//上拉加载列表数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})