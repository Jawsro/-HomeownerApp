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
    villageNameIndex:0,
    idArray:[
      {text:"业主",identity:"owner"},
      {text:"家属",identity:"family"},
      {text:"租户",identity:"tenant"},
    ],
    index:0,
    btnDisabled:false
  },
  idChange(e){
    let index = e.detail.value;
    this.setData({
      index:index
    })
  },
  //请求小区列表
  _getSubdistrictList(){
    let _this = this;
    let subdistrictId = wx.getStorageSync('subdistrictId');
    HttpRequest('/app.php/subdistrict_api/getSubdistrictList',{},'get',function(res){
      if(res.status == true){
        _this.data.subdistrictList =res.data
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
  addHouse(e){
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let userType = this.data.idArray[this.data.index].text;
    let {building,
        unit,
        roomCode,
        name,
        identityCode,
        phone,
      } = e.detail.value;
    if(userType == '业主'){
      userType = 'head'
    }else if(userType == '家属'){
      userType = 'dweller'
    }else if(userType == '租户'){
      userType = 'tenant'
    }
    let data = {
        subdistrictId,
        building,
        unit,
        roomCode,
        userType,
        name,
        identityCode,
        phone,
    }
    this.setData({
      btnDisabled : true
    })
    HttpRequest('/app.php/app_user_api/appUserAddRoom',data,'post',res => {
      if(res.status == true){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout( () => {
          wx.navigateTo({
            url: '../houselist/houselist',
          })
        },2000)
      }
      setTimeout(()=>{
        this.setData({
          btnDisabled : false
        })
      },2000)
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