// pages/reserve/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylat: '',
    mylng: '',
    venueList: [],
    tabbar: {},
    defaultImg: '/images/reserve/venue.jpg'
  },

  cg_details(e) {
    var venueid = e.currentTarget.id;
    var venue_name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/cg-details/index?venueId=' + venueid + '&venuename=' + venue_name,
    })

  },

  //计算两坐标点之间的距离

  getDistance: function(lat1, lng1, lat2, lng2) {
    //纬度1，经度1，纬度2，经度2
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
    // return 
  },

  // 循环算出每个场馆的位置与当前位置的距离
  distance(e) {
    var that = this;
    console.log(e)
    let aa = [];
    let bb = that.data.venueList;
    // that.data.venueList.forEach((item, index) => {
    //   that.getDistance(item.lat, item.lng, that.data.mylat, that.data.mylat)
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let dataList = [];
    let aa = [];
    // 获取场馆信息
    app.yc_request('GET', 'client/VenueApi', null, function(datas) {
      dataList = datas.data.obj;
      // 遍历循环添加位置
      let lat = app.globalData.latitude;
      let lng = app.globalData.longitude;
      dataList.forEach((item, index) => {
        item['distance'] = parseInt(that.getDistance(item.lat, item.lng, lat, lng))
      })
      // 注册返回的数组
      that.setData({
        venueList: dataList
      });
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    })
    // this.getDistance(12, 12, 1, 1);
    // this.distance(dataList);
    app.editTabbar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    app.hidetabbar();
    var that = this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.hidetabbar();
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