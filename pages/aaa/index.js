// pages/aaa/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueid: '',
    venueName: '',
    venueAddress: '',
    avePrice: '',
    score: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var storageVenueId = wx.getStorageSync('venueId');
    console.log(storageVenueId)
    that.setData({
      venueid: storageVenueId
    });
    // 详情页场馆信息
    app.yc_request('GET', 'client/VenueApi/' + that.data.venueid, null, function(datas) {
      var venueMsg = datas.data.obj;
      // console.log(venueMsg)
      that.setData({
        venueName: venueMsg.venueName,
        venueAddress: venueMsg.venueAddress,
        avePrice: venueMsg.avePrice,
        score: venueMsg.score,
      })
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