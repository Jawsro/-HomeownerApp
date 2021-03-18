// pages/paymentList/paymentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    villageNav:[
      {villageName:'公园悦府',villageText:'物业费缴费记录',id:1},
      {villageName:'盛公馆',villageText:'物业费缴费记录',id:2},
      {villageName:'碧水湾',villageText:'物业费缴费记录',id:3},
      {villageName:'公园悦府',villageText:'物业费缴费记录',id:4}
    ],
    current: 1,
    scrollLeft: 0,
    windowWidth: 0,
    openPayDetail:0,
    zhangdan:[
      {
        id:1,
        yuefen:'2020年12月账单',
        wuye:'物业管理费',
        wuyefei:'188.00',
      },
      {
        id:2,
        yuefen:'2020年11月账单',
        wuye:'物业管理费',
        wuyefei:'188.00',
      }
    ]
  },
  currentNav(e){
    let id = e.currentTarget.dataset.id;
    let scrollLeft =  e.currentTarget.offsetLeft - ( this.data.windowWidth * 0.9 ) / 2;
    this.setData({
      current: id,
      scrollLeft: scrollLeft
    })
  },
  openPayDetails(e){ 
    let id = e.currentTarget.dataset.id;
    this.data.zhangdan.forEach(item=>{
      if(item.id==id){
        if(item.isShow==true){
          item.isShow=false
        }else{
          item.isShow=true
        }
      }else{
        item.isShow=false
      }
    })
    this.setData({
      zhangdan:this.data.zhangdan
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.zhangdan.forEach(item=>{
      item.isShow=false
    })
    this.setData({
      current:options.village
    })
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowWidth: result.windowWidth
        })
      },
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