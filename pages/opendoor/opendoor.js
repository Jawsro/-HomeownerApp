// pages/opendoor/opendoor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      doorMsg:[
        {id:1,name:'13栋2单元门'},
        {id:1,name:'13栋2单元门'},
        {id:1,name:'13栋2单元门'},
        {id:1,name:'13栋2单元门'}
      ],
      successIshow:false,
      loadingIshow:false,
      maskIsshow:false,
      w:0
  },
  openDoor(e) {
    let name = e.currentTarget.dataset.name;
    let width = 0.1;
    let w = 0;
    let _this= this;
    let i = setInterval(() =>{
      if(width>=1){
        clearInterval(i);
        this.setData({
          loadingIshow:false,
          successIshow:true
        })
      }else{
        width = parseFloat(width.toFixed(1))+0.1
        w = width*300
        console.log(width,w)
      }
     
      _this.setData({
        width:w
      })
    },1000)
    this.setData({
      doorName: name,
      maskIsshow:true,
      loadingIshow:true
    })
    
  },
  closeTishi(){
    this.setData({
      successIshow:false,
      maskIsshow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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