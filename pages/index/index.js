// index.js
// 获取应用实例
const app = getApp();
//调用封装的函数
import {hots} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    indicatorDots: true,
    indicatorActiveColor: "white",
    swiperImg:["http://property.shangyouyun.cn/image/fenlei1.png","http://property.shangyouyun.cn/image/gonggao.jpg"],
    grid:[
      {
        url:"icon-shuifeiguanli",
        text:"水费"
      },
      {
        url:"icon-dianfeifuwu",
        text:"电费"
      },
      {
        url:"icon-icon_tingchejiaofei-copy",
        text:"停车费"
      },
      {
        url:"icon-baoxiu",
        text:"物业报修"
      },
      {
        url:"icon-fuli",
        text:"业主福利"
      },
      // {
      //   url:"icon-qiandao",
      //   text:"签到积分"
      // },
      {
        url:"icon-fuwu",
        text:"便民服务"
      },
      {
        url:"icon-19",
        text:"更多"
      },
    ],
    classification:[
      {
        icon:"icon-wuyefeiyongchuzhang",
        text:"物业缴费",
        url:"../houselist/houselist"
      },
      {
        icon:"icon-gonggao",
        text:"社区公告",
        url:"../announcement/announcement"
      },
      {
        icon:"icon-baoxiu",
        text:"装修申报",
        url:"../renovation/renovation"
      },
      {
        icon:"icon-xinwen",
        text:"社区新闻",
        url:"../announcement/announcement"
      }
      
    ],
    loginIsshow:false,
    changeVillageIsShow:false,
    villageIsShow:false,
    imgLoad:true,
    villageName:['公园悦府','碧水湾','盛公馆']
  },
  changeVillage(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      villageIsShow:true,
      changeVillageIsShow:false
    })
    
  },
  goLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  openHouseList(){
    this.setData({
      coloseHose:true
    })
  },
  closeHouseList(){
    this.setData({
      coloseHose:false
    })
  },
  clicka(){
    hots()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.villageName){
      this.setData({
        changeVillageIsShow:true,
        villageIsShow:false,
      })
    }else{
      this.setData({
        villageIsShow:true,
        changeVillageIsShow:false
      })
    }
    //获取二维码里面的参数，向后台发起请求获取当前小区的数据信息
    // console.log(options)
    // let xiaoquid=decodeURIComponent(options.id);
    // console.log(xiaoquid)
    let _this = this;
    //获取登录和认证的状态，控制页面功能
    try {
      let loginStatue = wx.getStorageSync('loginStatue');//登录状态
       let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
    //   let loginStatue = 1;
    // let authenticationStatus = 1;
      if (!loginStatue) {
        _this.setData({
          loginIsshow:true
        })
      }else{
        _this.setData({
          loginIsshow:false
        })
      }
      if (!authenticationStatus) {
        _this.setData({
          hoeseListIsShow:true
        })
      }else{
        _this.setData({
          hoeseListIsShow:false
        })
      }
    } catch (e) {}
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
    setTimeout(()=>{
      this.setData({
        imgLoad:false
      })
    },800)
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
