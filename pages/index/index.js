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
    villageNameIndex:0,//首页显示的小区的索引
    newsList:[],//社区动态
    swiperImg:[],//轮播图
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
    loginIsshow:false,//控制登录注册按钮
    loginNoshow:false,//控制登录注册按钮
    changeVillageIsShow:false,//控制小区列表选择页面（搜索进入小区）
    villageIsShow:false,//控制首页是个显示（扫码进入）
    hoeseListIsShow:true
  },
  //选择小区进入首页
  changeVillage(e){
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('subdistrictId', id)
    // 获取轮播图
    this._getHeadlinesList(id);
    //社区动态
    this._getNewsList(id);
    this.setData({
      villageIsShow:true,
      changeVillageIsShow:false,
      villageNameIndex:e.currentTarget.dataset.index
    })
    
  },
  //进入首页切换小区
  subdistrictNameChange(e){
    let index = e.detail.value;
    this.setData({
      villageNameIndex: index
    })
    let id = this.data.subdistrictList[index].id
    // 获取轮播图
    this._getHeadlinesList(id);
    //社区动态
    this._getNewsList(id);
    //并缓存小区id
    wx.setStorageSync('subdistrictId', id)
  },
  //请求小区列表
  _getSubdistrictList(id){
    let _this = this;
    HttpRequest('/app.php/subdistrict_api/getSubdistrictList',{},'get',function(res){
      if(res.status == true){
        _this.data.subdistrictList =res.data
        //表示用户是扫描二维码进入小程序，需要在小区列表查找该ID对应的小区名显示在首页
        if(id !='undefined'){
          for(let i = 0;i<res.data.length;i++){
            if(res.data[i].id==id){
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
  // 获取轮播图
  _getHeadlinesList(id){
    let _this = this;
    let data= {
      subdistrictId: id 
    } 
    HttpRequest('/app.php/subdistrict_api/getHeadlinesList',data,'get',res=>{
      if(res.status == true){
        _this.data.swiperImg = res.data;
        _this.setData({
          swiperImg:_this.data.swiperImg
        })
      }
      
    })
  },
  //社区动态
  _getNewsList(id){
    let _this = this;
    let data = {
      subdistrictId :id,
      page:1
    };
    HttpRequest('/app.php/subdistrict_api/getNewsList',data,'get',res=>{
      if(res.status == true){
        _this.data.newsList = res.data;
        _this.setData({
          newsList:_this.data.newsList
        })
      } 
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
  goIcon(e){
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
    if(!loginStatue && !authenticationStatus){
      wx.showModal({
        title: '提示',
        content: '请先登录并且完成身份认证！',
        showCancel: false
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取二维码里面的参数，向后台发起请求获取当前小区的数据信息
    //判断用户是扫码进入还是搜索进入
    let xiaoquid=decodeURIComponent(options.subdistrictId);
    if (xiaoquid =='undefined') { //搜索进入
      this.setData({
        changeVillageIsShow:true,
        villageIsShow:false,
      })
      //搜索进入小程序需要请求小区列表
      this._getSubdistrictList(wx.getStorageSync('subdistrictId'));
    }else{//扫码进入
      this.setData({
        villageIsShow:true,
        changeVillageIsShow:false,
      })
      this._getHeadlinesList(xiaoquid);
      this._getNewsList(xiaoquid);
      wx.setStorageSync('subdistrictId', xiaoquid)
      this._getSubdistrictList(xiaoquid);
    }
    //根据缓存中的 subdistrictId 判断用户是否是初次进入小程序
    let subdistrictId = wx.getStorageSync('subdistrictId');
    //第二次进入小区
    if(subdistrictId){
      this.setData({
        villageIsShow:true,
        changeVillageIsShow:false
      })
      this._getHeadlinesList(subdistrictId);
      this._getNewsList(subdistrictId);
    }
    
    let _this = this;
    //获取登录和认证的状态，控制页面功能
    try {
        let loginStatue = wx.getStorageSync('loginStatue');//登录状态
        let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
        if (!loginStatue) {
          _this.setData({
            loginIsshow:true,
            loginNoshow:false
          })
        }else{
          _this.setData({
            loginIsshow:false,
            loginNoshow:true,
            villageIsShow:true,
            changeVillageIsShow:false,
            villageNameIndex:wx.getStorageSync('subdistrictId')
          })
          //登录状态并且已认证
          if (!authenticationStatus) {
            _this.setData({
              hoeseListIsShow:true
            })
          }else{
            _this.setData({
              hoeseListIsShow:false,
              villageNameIndex:wx.getStorageSync('subdistrictId')
            })
          }
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
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    console.log(loginStatue)
    let _this = this;
    //获取登录和认证的状态，控制页面功能
    try {
        let loginStatue = wx.getStorageSync('loginStatue');//登录状态
        if (!loginStatue) {
          _this.setData({
            loginIsshow:true,
            loginNoshow:false
          })
        }else{
          _this.setData({
            loginIsshow:false,
            loginNoshow:true
          })
        }
        
      } catch (e) {}
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
