// 获取应用实例
const app = getApp();
import {HttpRequest} from "../../utils/http.js";
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    index:0,
    zhuangxiu:["自装","装修公司"],
    zhuangxiuIndex:0,
    images:[],
    endTime:'',
    startTime:'',
    roomList:[],
    disabled:false,
    roomId:0,
  },
  idChange(e){
    console.log(e)
    let index = parseInt(e.detail.value);
    this.data.roomId = this.data.roomList[index].room_id;
    this.setData({
      index:index,
      roomId:this.data.roomId
    })
    console.log(this.data.roomList)
  },
  changezhuangxiu(e){
    let index = e.detail.value;
    this.setData({
      zhuangxiuIndex:index
    })
  },
  //上传图片
  chosePicture(){
    let _this=this;
    wx.chooseImage({
      count:5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        for(let i = 0, len =tempFilePaths.length;i<len;i++ ){
          wx.uploadFile({
            url: app.globalData.siteUrl+'/app.php/upload_api/decorateImage?token='+wx.getStorageSync('token'),
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
  bindStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  addDecorate(e){console.log(this.data.roomId)
    let decorateType = '';
    let zhuangxiuIndex = this.data.zhuangxiuIndex;
    if(zhuangxiuIndex ==0){
      decorateType ='bysel'
    }else{
      decorateType ='outside'
    }
    this.setData({
      disabled:true
    })
    let roomId =this.data.roomId;
    let {
      name,
      phone,
      description
    } = e.detail.value;
    let images = JSON.stringify(this.data.images);
    let data = {
      name,
      phone,
      description,
      endTime:this.data.endTime,
      startTime:this.data.startTime,
      images,
      roomId,
      decorateType
    }
    HttpRequest('/app.php/app_user_api/addDecorate',data,'post',res =>{
      if(res.status == true){
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 3000
        })
        setTimeout( () => {
          wx.redirectTo({
            url: '../renovation/renovationlist',
          })
        },2000)
      }else{
        this.setData({
          disabled:false
        })
      }

    })
  },
  _getRoomList(){
    HttpRequest('/app.php/app_user_api/appUserRoomList',{},'get',res =>{
     if(res.status = true){
       res.data.forEach(item =>{
          let roomMsg = ''
          roomMsg =`${item.short_name}${item.block_name}栋${item.cell_name}单元${item.room_code}室`
          this.data.roomList.push({roommsg:roomMsg,room_id:item.room_id})
      
        })
        let roomId =  res.data[0].room_id
       this.setData({
        roomList:this.data.roomList,
        yemianIsShow:true,
        roomId
       })
     }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this. _getRoomList()
    let now = new Date();
    let today = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
    this.setData({
      endTime:today,
      startTime:today
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