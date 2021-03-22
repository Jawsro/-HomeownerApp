// app.js
//调用封装的函数
import {HttpRequest} from "./utils/http.js"
App({
  /**
   * 全局变量
   */
  globalData: {},
  /**
   * 生命周期函数--监听小程序初始化
   */
  onLaunch(options) {
    this.setApiRoot();//版本更新
    //判断用户的登录状态(非第一次进入小程序)
    if(wx.getStorageSync('loginStatue') == false && typeof wx.getStorageSync('loginStatue') != 'string'){
      HttpRequest('/app.php/login_api/loginStatus?token=token',{token:wx.getStorageSync('token')},'get',res=>{
        console.log(res)
        if(res.status == true){//未登录
          wx.setStorageSync('loginStatue', true);
        }else{
          wx.showModal({
            title: '提示',
            content: '登录已过期！',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../login/login',
                })
              } else if (res.cancel) {
                
              }
            }
          })
        }
      })
    }
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 版本更新
   */
  setApiRoot() {
    // 用户版本更新
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
  },
})
