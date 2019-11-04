// pages/Apply_cp/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    username: '',
    password: ''
  },
  // 用户名输入监听
  phoneInput(e) {
    this.setData({
      username: e.detail.value
    });
  },
  // 密码输入监听
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },
  // 登录事件
  login() {
    if (this.data.username == '') {
      Notify('用户名不能为空');
    } else if (this.data.password == '') {
      Notify('密码不能为空');
    } else {
      app.yc_request('POST', 'client/VenueAccount', {
        loginName: this.data.username,
        loginPwd: this.data.password
      }, function(datas) {
        console.log(datas.data.obj)
        if (datas.data.obj != null) {
          wx.setStorageSync('venueId', datas.data.obj.venueId);
          wx.switchTab({
            url: '/pages/cg-details/index',
          })
        }
      }, function(erro) {
        wx.showToast({
          title: '网络走神了！',
        })
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})