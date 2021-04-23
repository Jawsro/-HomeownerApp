// 获取应用实例
const app = getApp();
import {HttpRequest} from "../../utils/http.js";
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosePictureArray:[],
    disabled:false,
    idArray:[
      {text:"业主"},
      {text:"家属"},
      {text:"租户"},
    ],
    index:0,
    zhuangxiu:["自装","装修公司"],
    zhuangxiuIndex:0,
    images:[],
    endTime:'',
    startTime:'',
    roomList:[],
  },
  idChange(e){
    let index = e.detail.value;
    this.setData({
      index:index
    })
  },
  changezhuangxiu(e){
    let index = e.detail.value;
    this.setData({
      zhuangxiuIndex:index
    })
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
  // chosePicture: function (t){
  //   let _this=this,
  //     curPic = t.target;
  //   wx.chooseImage({
  //     count:9,
  //     sizeType: ['original', 'compressed'],
  //     sourceType:['album', 'camera'],
  //     success(res) {
  //       const tempFilePaths = res.tempFilePaths
  //       _this.data.chosePictureArray=_this.data.chosePictureArray.concat(res.tempFilePaths)
  //       _this.setData({
  //         chosePictureArray: _this.data.chosePictureArray
  //       })
  //       wx.uploadFile({
  //         // url: app.globalData.site_url+'index.php?s=/api/upload/image&wxapp_id=10001',
  //         filePath: tempFilePaths[0],
  //         name: 'file',
  //         formData: {
  //           'user': 'test'
  //         },
  //         success(res) {
  //           const data = JSON.parse(res.data);
  //           let url = data.image_url;
  //           // if(data.status&&url){
  //           //   _this.setData({
  //           //     mendian_url: app.globalData.site_url + url 
            
  //         }
  //       })
  //     }
  //   })
  // },
  // deletePicture(e){
  //   var _this = this;
  //   let index  = e.target.dataset.index ;
  //   wx.showModal({
  //     title: '提示',
  //     content: '是否删除该图片？',
  //     success (res) {
  //       if (res.confirm) {
  //         _this.data.chosePictureArray.splice(index,1)
  //         _this.setData({
  //           chosePictureArray: _this.data.chosePictureArray
  //         })
  //       } 
  //     }
  //   })
  // },
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
  _getRoomList(){
    HttpRequest('/app.php/app_user_api/appUserRoomList',{},'get',res =>{
     if(res.status = true){
       res.data.forEach(item =>{
          let roomMsg = ''
          roomMsg =`${item.short_name}${item.block_name}栋${item.cell_name}单元${item.room_code}室`
          this.data.roomList.push(roomMsg)
        })
        
       this.setData({
        roomList:this.data.roomList,
        yemianIsShow:true
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