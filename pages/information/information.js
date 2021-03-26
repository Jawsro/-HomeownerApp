// pages/information/information.js
// 获取应用实例
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js";
import {timeDate} from "../../utils/util.js";
let dianzanLock = true ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zanIsShow:false,
    zanNum:0,
    title:'精彩资讯',
    newsConten:{},//文章内容
    newsList:[],//推荐
    newsId:0,//文章id
  },
  //点赞
  dianzan(){
    let _this = this;
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    if(!loginStatue){
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录后再点赞',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.cancel) {
            
          }
        }
      })
    }else{
      // if(!dianzanLock){
      //   return false;
      // }
      //dianzanLock = false
      if( this.zanIsShow ){
        return false;
      }
      this.zanIsShow =true;
      let data ={
        subdistrictId: wx.getStorageSync('subdistrictId'),
        id:_this.data.newsId
      }
      HttpRequest('/app.php/information_api/newsPraise',data,'get',res=>{
        console.log(res)
        if(res.status == true){
          wx.showToast({
            title: '点赞成功',
            duration:2000
          });
          let num = this.data.zanNum;
          this.setData({
            zanIsShow:true,
            zanNum:num+1
          })
        }
      })
    }
   
  },
  //获取文章内容------社区动态
  _getNewsContent(id){
    let _this = this;
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let data = {
      subdistrictId,
      id
    }
    HttpRequest('/app.php/information_api/getNewsContent',data,'get',res=>{
      if(res.status == true){
        _this.data.newsConten = res.data;
        if(!res.data.author_nickname ){
          _this.data.newsConten.author_nickname  = ' '
        }
        _this.data.newsConten.createtime = timeDate(_this.data.newsConten.createtime)
        _this.setData({
          newsConten:_this.data.newsConten,
          zanNum:res.data.praise
        })
      }
    })
  },
  //获取文章内容------轮播图
  _getHomepageSwiperListContent(id){
    let _this = this;
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let data = {
      subdistrictId,
      id
    }
    HttpRequest('/app.php/information_api/getHomepageSwiperListContent',data,'get',res=>{
      if(res.status == true){
        _this.data.newsConten = res.data;
        if(!res.data.author_nickname ){
          _this.data.newsConten.author_nickname  = ' '
        }
        _this.data.newsConten.createtime = timeDate(_this.data.newsConten.createtime)
        _this.setData({
          newsConten:_this.data.newsConten,
          zanNum:res.data.praise
        })
      }
    })
  },
  //获取文章内容------社区公告
  _getAnnouncementContent(id){
    let _this = this;
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let data = {
      subdistrictId,
      id
    }
    HttpRequest('/app.php/information_api/getAnnouncementContent',data,'get',res=>{
      if(res.status == true){
        _this.data.newsConten = res.data;
        if(!res.data.author_nickname ){
          _this.data.newsConten.author_nickname  = ' '
        }
        _this.data.newsConten.createtime = timeDate(_this.data.newsConten.createtime)
        _this.setData({
          newsConten:_this.data.newsConten,
          zanNum:res.data.praise
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let subdistrictId = wx.getStorageSync('subdistrictId');
    this.data.newsId = options.newsId;
    this.setData({
      title:options.title
    })
    
    if(options.title == '社区动态'){
      this._getNewsContent(options.newsId);
    }else if(options.title == '详情'){
      this._getHomepageSwiperListContent(options.newsId);
    }else if(options.title == '社区公告'){
      this._getAnnouncementContent(options.newsId)
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