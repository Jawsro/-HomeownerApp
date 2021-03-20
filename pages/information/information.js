// pages/information/information.js
// 获取应用实例
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zanIsShow:false,
    zanNum:66,
    title:'精彩资讯'
  },
  dianzan(){
    this.zanIsShow =! this.zanIsShow;
    console.log(this.data.zanNum)
    let num = this.data.zanNum;
    if(!this.zanIsShow){
      //取消点赞
      //请求后台取消成功修改数据
      this.setData({
        zanIsShow:false,
        zanNum:num-1
      })
    }else{
      //点赞
      //请求后台点赞成功修改数据
      this.setData({
        zanIsShow:true,
        zanNum:num+1
      })
    }
      
    
  },
  //获取文章内容
  _getNewsContent(id){
    HttpRequest('/app.php/subdistrict_api/getNewsContent',{newsId:id},'get',res=>{
      if(res.status == true){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      title:options.title
    })
    this._getNewsContent(options.newsId)
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