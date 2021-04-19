// pages/renovation/renovation.js
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosePictureArray:[],
    disabled:false
  },
  
  setDatas(e){
    if(lock){
      return;
    }
    lock=true
    // 按钮禁用
    this.setData({
      disabled: true
    });
    
  },
  chosePicture: function (t){
    let _this=this,
      curPic = t.target;
    wx.chooseImage({
      count:9,
      sizeType: ['original', 'compressed'],
      sourceType:['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        _this.data.chosePictureArray=_this.data.chosePictureArray.concat(res.tempFilePaths)
        _this.setData({
          chosePictureArray: _this.data.chosePictureArray
        })
        wx.uploadFile({
          // url: app.globalData.site_url+'index.php?s=/api/upload/image&wxapp_id=10001',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = JSON.parse(res.data);
            let url = data.image_url;
            // if(data.status&&url){
            //   _this.setData({
            //     mendian_url: app.globalData.site_url + url 
            
          }
        })
      }
    })
  },
  deletePicture(e){
    var _this = this;
    let index  = e.target.dataset.index ;
    wx.showModal({
      title: '提示',
      content: '是否删除该图片？',
      success (res) {
        if (res.confirm) {
          _this.data.chosePictureArray.splice(index,1)
          _this.setData({
            chosePictureArray: _this.data.chosePictureArray
          })
        } 
      }
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let today = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
    this.setData({
      date:today
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