// pages/addHouse/addHouse.js
//调用封装的函数
import {HttpRequest} from "../../utils/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityArray: ['广西','桂林'],
    cityIndex: 0,
    subdistrictList:[],
    villageNameIndex:0
  },
  bindPickerChange: function (e) {
    //根据所选状态请求后台
    console.log( e)
    this.setData({
      cityIndex: e.detail.value
    })
  },
  bindcolumnchange(e){
    console.log(e)
  },
  XiaoQuChange(e){
    this.setData({
      index: e.detail.value
    })
  },
  //请求小区列表
  _getSubdistrictList(){
    let _this = this;
    let subdistrictId = wx.getStorageSync('subdistrictId');
    HttpRequest('/app.php/subdistrict_api/getSubdistrictList',{},'get',function(res){
      if(res.status == true){
        _this.data.subdistrictList =res.data
        //表示用户是扫描二维码进入小程序，需要在小区列表查找该ID对应的小区名显示在首页
        if(subdistrictId !='undefined'){
          for(let i = 0;i<res.data.length;i++){
            if(res.data[i].id==subdistrictId){
              _this.data.villageNameIndex = i
            }
          }
        }
        /////////
        _this.setData({
          subdistrictList: _this.data.subdistrictList,
          villageNameIndex: _this.data.villageNameIndex
        })
      }
    })
  },
  subdistrictNameChange(e){
    let index = e.detail.value;
    this.setData({
      villageNameIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getSubdistrictList();
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