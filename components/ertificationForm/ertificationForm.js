const app = getApp();
//调用封装的函数
import {HttpRequest} from "../../utils/http.js";
let lock = false;
Component({
  /**
   * 页面的初始数据
   */
  data: {
    idbeforeImg:'',
    idAfterImg:''
  },
  properties: {
    // identity: String // 简化的定义方式
  },
  /**
   * 事件
   */
  methods:{
    chose_pic_before(t){
      let _this=this;
      wx.chooseImage({
        count:1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths,)
          wx.uploadFile({
            url: app.globalData.siteUrl+'/app.php/upload_api/idcard?token='+wx.getStorageSync('token')+'&&img=true',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success(res) {
              console.log(res)
              const data = JSON.parse(res.data);
              let url = data.url;
              if(data.status && url){
                _this.setData({
                  idbeforeImg: app.globalData.siteUrl + url 
                })
              }
           
            }
          })
        }
      })
    },
    chose_pic_after(){
      let _this=this;
      wx.chooseImage({
        count:1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths,)
          wx.uploadFile({
            url: app.globalData.siteUrl+'/app.php/upload_api/idcard?token='+wx.getStorageSync('token')+'&&img=false',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success(res) {
              const data = JSON.parse(res.data);
              let url = data.url;
              if(data.status && url){
                _this.setData({
                  idAfterImg: app.globalData.siteUrl + url 
                })
              }
            }
          })
      }
    })
    },
    setDataForm(e){
      console.log(e)
      if(lock){
        return;
      }
      lock=true
     
      let trueName = e.detail.value.trueName,
          telNumber = e.detail.value.telNumber,
          identityCode = e.detail.value. identityCode;
      
        
        if(trueName =='' && telNumber==''&& identityCode==''){
          wx.showModal({
            title: '提示',
            content: '请确认必填信息已填写完',
            showCancel:false,
            success (res) {}
          })
          return false
        }
        console.log('owner')
     
       // 按钮禁用
       this.setData({
        disabled: true
      });
    },
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