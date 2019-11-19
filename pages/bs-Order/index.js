// pages/bs-Order/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    courseData: []

  },
  // 跳到订单列表

  bs_Order_details() {
    wx.navigateTo({
      url: '/pages/bs-Order-details/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.yc_request('GET', 'client/ScheduleRecordApi/list/' + app.globalData.openId + '/' + 1, {}, function(datas) {
      console.log(datas.data);
      that.setData({
        dataList: datas.data.obj
      });
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });
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