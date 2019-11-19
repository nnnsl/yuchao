const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubList:[],
  },
  goClubMsg(e){
    var clubid = JSON.parse(e.currentTarget.id);
    wx.navigateTo({
      url: '/pages/club-msg/index?clubId=' + clubid,
    });
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.yc_request('POST', 'client/ClubApi', {
      keyword:''
    }, function (datas) {
      that.setData({
        clubList:datas.data.obj
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