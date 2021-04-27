const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
import {timeDate} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortTitle:[
      {id:1,name:"基本"},
      {id:2,name:"款项"},
      {id:3,name:"出入证"},
      {id:4,name:"违规"},
    ],
    activeIndex:1,
    yemian:false,
    decorateInfoList:[],
    decorateFund:[],//款项
    decoratePassCard:[],//出入证
    decorateViolate:[],//违规
  },
  changeTitle(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
     activeIndex:id
    })
   },
   _getDecorateInfo(id){
     let data= {
      decorateId :id
     }
    HttpRequest('/app.php/app_user_api/decorateInfo',data,'get', res =>{
      if(res.status == true){
        res.data.createtime = timeDate(res.data.createtime);
        res.data.start_time = timeDate(res.data.start_time)
        res.data.end_time = timeDate(res.data.end_time)
        res.data.images = JSON.parse(res.data.images)
        this.data.decorateFund = res.data.decorate_fund
        if(this.data.decorateFund.length > 0){
          this.data.decorateFund.forEach(item=>{
            item.createtime = timeDate(item.createtime)
            switch(item.fund_type){
              case 'deposit':item.fund_type = '装修押金';
              break;
              case 'pass_card':item.fund_type = '出入证';
              break;
              case 'garbage_deal':item.fund_type = '垃圾清理费';
              break;
              case 'penalty':item.fund_type = '罚款';
              break;
              case 'others':item.fund_type = '其他';
              break;
            }
          })
        }
        this.data.decoratePassCard = res.data.decorate_pass_card;
        if(this.data.decoratePassCard.length > 0){
          this.data.decoratePassCard.forEach(item=>{
            item.start_time = timeDate(item.start_time);
            item.end_time = timeDate(item.end_time);
          })
        }
        this.data.decorateViolate = res.data.decorate_violate
        // if(this.data.decorateViolate.violate_images.length > 0){
        //   this.data.decorateViolate.violate_images.forEach(item=>{
        //     item = app.globalData.siteUrl + item;
        //   })
        // }
        this.setData({
          decorateInfoList:res.data,
          yemian:true,
          decorateFund:this.data.decorateFund ,//款项
          decoratePassCard: this.data.decoratePassCard,//出入证
          decorateViolate:this.data.decorateViolate ,//违规
        })
      }
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let id = options.id;
    this._getDecorateInfo(id)
    this.setData({
      baseUrl:app.globalData.siteUrl
    })
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