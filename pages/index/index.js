// index.js
// 获取应用实例
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
    subdistrictList:[],//小区列表
    villageNameIndex:0,//首页显示的小区的索引
    newsList:[],//社区动态
    swiperImg:[],//轮播图
    classification:[
      {
        icon:"icon-wuyefeiyongchuzhang",
        text:"物业缴费",
        url:"../paymentlist/paymentlist"
      },
      {
        icon:"icon-yuechi",
        text:"一键开门",
        url:"../opendoor/opendoor"
      },
      {
        icon:"icon-baoxiu",
        text:"报事报修",
        url:"../repairevent/repairevent"
      },
      {
        icon:"icon-wuyebaoxiu",
        text:"装修申报",
        url:"../renovation/renovation"
      },
      
     
    ],
    grid:[
      {
        icon:"icon-gonggao",
        text:"社区公告",
        url:"../announcement/announcement"
      },
      {
        icon:"icon-bangbangmangmdpi",
        text:"帮帮忙"
      },
      {
        icon:"icon-daishoubaoguo",
        text:"代收包裹"
      },
      {
        icon:"icon-ziyuan",
        text:"表扬物业"
      },
      {
        icon:"icon-navicon-yjjy",
        text:"意见建议"
      },
      {
        icon:"icon-shouyetubiao-05",
        text:"房屋租售"
      },
      {
        icon:"icon-wupinquchu-05",
        text:"物品放行"
      },
      {
        icon:"icon-toupiao",
        text:"投票"
      },
    ],
    loginIsshow:false,//控制登录注册按钮未登录
    loginNoshow:false,//控制登录注册按钮已登录
    changeVillageIsShow:false,//控制小区列表选择页面（搜索进入小区）
    villageIsShow:false,//控制首页是个显示（扫码进入）
    // hoeseListIsShow:true
  },
  goGrid(e){
    let index = e.currentTarget.dataset.index;
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    if(loginStatue){ 
     if(index == 0){
      wx.navigateTo({
        url: '../announcement/announcement'
      })
     }else{
      wx.showModal({
        title: '提示',
        content: '功能开发中。。。',
        showCancel: false
      })
     }
    }else {
        wx.showModal({
          title: '提示',
          content: '请先登录',
          showCancel: false
        })
      } 
  },
    

  //选择小区进入首页
  changeVillage(e){
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('subdistrictId', id)
    // 获取轮播图
    this._getHomepageSwiperList(id);
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
    this._getHomepageSwiperList(id);
    //社区动态
    this._getNewsList(id);
    //并缓存小区id
    wx.setStorageSync('subdistrictId', id)
    let city = this.data.subdistrictList[index].city_name || '',
        short_name = this.data.subdistrictList[index].short_name || '';
        app.globalData.cellName = city + short_name
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
          villageNameIndex: _this.data.villageNameIndex,
          yemian:true
        })
        let city = _this.data.subdistrictList[_this.data.villageNameIndex].city_name || '',
          short_name = _this.data.subdistrictList[_this.data.villageNameIndex].short_name || '';
        app.globalData.cellName = city +short_name
      }
    })
  },
  // 获取轮播图
  _getHomepageSwiperList(id){
    let _this = this;
    let data= {
      subdistrictId: id 
    } 
    HttpRequest('/app.php/information_api/getHomepageSwiperList',data,'get',res=>{
      if(res.status == true){
        _this.data.swiperImg = res.data;
        _this.data.swiperImg.forEach(item =>{
          item.head_image = app.globalData.siteUrl + item.head_image
        })
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
    HttpRequest('/app.php/information_api/getNewsList',data,'get',res=>{
      if(res.status == true){
        _this.data.newsList = res.data;
        _this.data.newsList.forEach(item =>{
          item.head_image = app.globalData.siteUrl + item.head_image;
          item.createtime = timeDate (item.createtime)
        })
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
  goIcon(e){
    let loginStatue = wx.getStorageSync('loginStatue');//登录状态
    let authenticationStatus = wx.getStorageSync('authenticationStatus');//认证状态
    if(loginStatue && authenticationStatus !=''){ 
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }else { 
        wx.showModal({
          title: '提示',
          content: '请先登录并且完成身份认证！',
          showCancel: false
        })
      } 
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
    wx.showLoading({
      title: '加载中...',
    })
     //判断用户的登录状态(非第一次进入小程序)
     if(wx.getStorageSync('token') != ''){
      HttpRequest('/app.php/login_api/loginStatus',{token:wx.getStorageSync('token')},'get',res=>{
        if(res.status == true){//已登录
          wx.setStorageSync('loginStatue', true);
        }
      })
    }
    //获取本地缓存的小区id，初次使用该小程序只有扫描二维码进入的才会在本地缓存(app.js中缓存)
    let xiaoquid=wx.getStorageSync('subdistrictId');
    //console.log(xiaoquid)
    //判断用户是扫码进入还是搜索进入
    if (xiaoquid =='') { //搜索进入
      this.setData({
        changeVillageIsShow:true,
        villageIsShow:false,
      })
    }else{//扫码进入
      this._getHomepageSwiperList(xiaoquid);
      this._getNewsList(xiaoquid);
      this.setData({
        villageIsShow:true,
        changeVillageIsShow:false,
        villageNameIndex:wx.getStorageSync('subdistrictId')
      })
    }
    this._getSubdistrictList(xiaoquid);
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
    let _this = this;
    //获取登录状态，控制页面功能
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
            loginNoshow:true,
            villageIsShow:true,
            changeVillageIsShow:false,
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
