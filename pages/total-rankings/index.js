// pages/total-rankings/index.js
var app = getApp();
let openId = app.globalData.openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfRanking:"",
    allRanking:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 个人排名
    app.yc_request('GET', 'client/RankingApi/' + app.globalData.openId, {}, function (datas) {
     that.setData({
       selfRanking: datas.data.obj,
     })
      console.log(datas.data.obj)
    }, function (erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });

    // 全部排名个人胜率
    app.yc_request('GET', 'client/RankingApi', {}, function (datas) {
      console.log(datas)
      that.setData({
        allRanking: datas.data.obj,
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