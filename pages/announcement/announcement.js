// pages/announcement/announcement.js
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js";
import {timeDate} from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yemian:false,
    marqueePace: 1,
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 20,
    size:14,
    interval: 20,// 时间间隔
    announcementList:[],
    moreText:'加载中',
    page:1
  },
  /**
   * 
   * 事件
   */
  // scrolltxt: function () {
  //   var that = this;
  //   var length = that.data.length;//滚动文字的宽度
  //   var windowWidth = that.data.windowWidth;//屏幕宽度
  //   if (length > windowWidth){
  //     var interval = setInterval(function () {
  //       var maxscrollwidth = parseInt(length);//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
  //       var crentleft = that.data.marqueeDistance;
  //       if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
  //         that.setData({
  //           marqueeDistance: crentleft + that.data.marqueePace
  //         })
  //       }
  //       else {
  //         //console.log("替换");
  //         that.setData({
  //           marqueeDistance: 0 // 直接重新滚动
  //         });
  //         clearInterval(interval);
  //         that.scrolltxt();
  //       }
  //     }, that.data.interval);
  //   }
  //   else{
  //     that.setData({ marquee_margin:"1000"});//只显示一条不滚动右边间距加大，防止重复显示
  //   }
  // },
  _getAnnouncementList(){
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
    HttpRequest('/app.php/information_api/getAnnouncementList',data,'get',res=>{
      if(res.status == true){
        res.data.forEach(item =>{
          item.head_image = app.globalData.siteUrl + item.head_image;
          item.createtime=timeDate(item.createtime)
        })
        _this.data.announcementList = _this.data.announcementList.concat(res.data)
        if( res.data.length<0){
          _this.data.moreText ='暂无数据';
          
        }else if(res.data.length<10){
          _this.data.moreText ='没有更多数据了';
          
        }else{
          _this.data.page ++;
          _this.data.moreText ='加载中';
        }
        _this.setData({
          announcementList:_this.data.announcementList,
          moreText:_this.data.moreText,
          yemian:true,
        })
      } 
    })
  },
  goInformation(e){
    let id = e.currentTarget.dataset.id;
    let content = e.currentTarget.dataset.content;
    if (content == true){
      wx.navigateTo({
        url: '/pages/information/information?newsId='+id+'&title=社区公告',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this._getAnnouncementList()
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
     // 页面显示
    //  var that = this;
    //  var length = that.data.text.length * that.data.size;//文字长度
    //  var windowWidth = wx.getSystemInfoSync().windowWidth ;// 屏幕宽度
    //  that.setData({
    //    length: length,
    //    windowWidth: windowWidth
    //  });
    //  that.scrolltxt();// 第一个字消失后立即从右边出现
     //数据请求
    
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
      //上拉数据加载
      this._getAnnouncementList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})