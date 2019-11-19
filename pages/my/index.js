// pages/club/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    userMsg:""
  },

  // 场馆订单
  cg_Order(){
    wx.navigateTo({
      url: '/pages/cg-Order/index',
    })
  },
  // 比赛订单
  bs_Order() {
    wx.navigateTo({
      url: '/pages/bs-Order/index',
    })
  },

  // 实名认证
  real_name(){
    wx.navigateTo({
      url: '/pages/total-rankings/index',
    })
  },

  //申请裁判
  Apply_cp(){
    wx.navigateTo({
      url: '/pages/Apply-cp/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();

    // 个人基本信息
    var that = this;
    // 个人胜率
    app.yc_request('GET', 'client/UserApi/' + app.globalData.openId, {}, function (datas) {
      that.setData({
        userMsg: datas.data.obj
      })
    }, function (erro) {
      wx.showToast({
        title: '网络走神了！',
      })
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
    app.hidetabbar();

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