// index.js
// 获取应用实例
const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subdistrictList:[],//小区列表
    villageNameIndex:0,//首页显示的小区
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
    
  },
  //选择小区进入首页
  changeVillage(e){
    console.log( e.currentTarget)
    let id = e.currentTarget.dataset.id;
    let data= {
      subdistrictId:id
    }
    HttpRequest('/app.php/subdistrict/getSubdistrictInfo',data,'get',res=>{
      console.log(res)
    })
    this.setData({
      villageIsShow:true,
      changeVillageIsShow:false,
      villageNameIndex:e.currentTarget.dataset.index
    })
    
  },
  //请求小区列表
  _getSubdistrictList(id){
    let _this = this;
    HttpRequest('/app.php/subdistrict/getSubdistrictList',{},'get',function(res){
      res.data.forEach(item =>{
        _this.data.subdistrictList.push(item.short_name)
      })
      _this.data.subdistrictList =res.data
      for(let i = 0;i<res.data.length;i++){
        if(res.data[i].id==id){
          _this.data.villageNameIndex = i
        }
      }
      _this.setData({
        subdistrictList: _this.data.subdistrictList,
        villageNameIndex: _this.data.villageNameIndex
      })
    })
    
  },
  //进入首页切换小区
  subdistrictNameChange(e){
  let index = e.detail.value;
    this.setData({
      villageNameIndex: index
    })
    let id = this.data.subdistrictList[index].id
    let data= {
      subdistrictId: id 
    }
    console.log(id)
    HttpRequest('/app.php/subdistrict/getSubdistrictInfo',data,'get',res=>{
      console.log(res)
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //获取二维码里面的参数，向后台发起请求获取当前小区的数据信息
    //判断用户是扫码进入还是搜索进入
    let xiaoquid=decodeURIComponent(options.subdistrictId);
    let villageNameIndex = 0;
    if (xiaoquid =='undefined') { 
      this.setData({
        changeVillageIsShow:true,
        villageIsShow:false,
      })
      //搜索进入小程序需要请求小区列表
    }else{
      this.setData({
        villageIsShow:true,
        changeVillageIsShow:false,
      })
      
    }
    this._getSubdistrictList(xiaoquid);
    let _this = this;
    //获取登录和认证的状态，控制页面功能
    try {
     let loginStatue = wx.getStorageSync('loginStatue');//登录状态
       let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
       //let loginStatue = 1;
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
