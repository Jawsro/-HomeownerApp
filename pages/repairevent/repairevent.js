const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idArray:[
      {text:"房屋"},
      {text:"小区"},
    ],
    index:0,
    images:[],
    disabled:false
  },
  //切换范围选择
  idChange(e){
    let index = e.detail.value;
    this.setData({
      index:index
    })
  },
  //上传图片
  chosePicture(t){
    let _this=this;
    wx.chooseImage({
      count:5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        for(let i = 0, len =tempFilePaths.length;i<len;i++ ){
          wx.uploadFile({
            url: app.globalData.siteUrl+'/app.php/upload_api/eventImage?token='+wx.getStorageSync('token'),
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success(res) {
              const data = JSON.parse(res.data);
              let url = app.globalData.siteUrl + data.url;
              if(data.status && url){
                _this.data.images.push(url)
                _this.setData({
                  images: _this.data.images
                })
              }
           
            }
          })
        }
        
      }
    })
  },
  //删除图片
  deletePicture(e){
    let _this = this;
    let index = e.currentTarget.dataset.index;
    for(let i = 0, len = _this.data.images.length;i<len;i++){
      if (i == index){
        _this.data.images.splice(i,1)
      }
      _this.setData({
        images: _this.data.images
      })
    }
  },
  //提交信息
  addRepairEvent(e){
    this.setData({
      disabled:true
    })
    let eventScope  = this.data.idArray[this.data.index].text;
    if(eventScope == '房屋'){
      eventScope = 'room'
    }else if(eventScope == '小区'){
      eventScope = 'subdistrict'
    }
    let subdistrictId = wx.getStorageSync('subdistrictId');
    let {
      name,
      address,
      description,
      phone,
      roomNumber,
      title
    } = e.detail.value;
    let images = JSON.stringify(this.data.images);
    let data= {
      name,
      address,
      description,
      phone,
      roomNumber,
      title,
      eventScope,
      images,
      subdistrictId
    }
    HttpRequest("/app.php/app_user_api/addRepairEvent",data,'post',res =>{
      if(res.status == true){
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 3000
        })
        setTimeout( () => {
          wx.redirectTo({
            url: '../repairevent/repaireventlist',
          })
        },2000)
      }else{
        this.setData({
          disabled:false
        })
      }
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