// pages/certification/certification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idnum:'425652157455665',
    name:'李菲'
  },
  getName (name) {
    var newStr;
    if (name.length === 2) {
        newStr = '*'+name.substr(1, 1)  ;
    } else if (name.length > 2) {
        var char = '';
        for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
        newStr = name;
    }
    return newStr;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let num = this.data.idnum.replace(/^(.{3})(?:\d+)(.{2})$/,"$1***************$2");
    let name = this.getName(this.data.name)
    console.log(name)
    this.setData({
      idnum:num,
      name:name
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