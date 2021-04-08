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
            url: app.globalData.siteUrl+'/app.php/upload_api/idcard?token='+wx.getStorageSync('token')+'&&img=1',
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
            url: app.globalData.siteUrl+'/app.php/upload_api/idcard?token='+wx.getStorageSync('token')+'&&img=2',
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
      if(lock){
        return;
      }
      lock=true
      let trueName = e.detail.value.trueName,
          telNumber = e.detail.value.telNumber,
          identityCode = e.detail.value. identityCode,
          token = wx.getStorageSync('token');
      let data={
        trueName,
        telNumber,
        identityCode,
        token
      }
      if(trueName !='' && telNumber !=''&& identityCode !='' && this.data.idAfterImg != '' && this.data.idbeforeImg != ''){
        HttpRequest('/app.php/app_user_api/updateAppUserAttachInfo',data,'post',res => {
          if(res.status == true){
            //请求状态成功
            // 按钮禁用
            this.setData({
              disabled: true
            });
            wx.showModal({
              title: '提示',
              content: '信息上传成功',
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  wx.setStorageSync('authenticationStatus', 'yes')
                  setTimeout( () => {
                    wx.switchTab({
                      url: '../my/my',
                    })
                  },1000)
                }
              }
            })
          }else{
            lock=false;
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请确认信息已填写完并且身份证照片已上传',
          showCancel:false,
          success (res) {}
        })
        lock=false;
      }
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