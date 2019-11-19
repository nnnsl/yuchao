// pages/club/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mymeg: '',
    club_meg: '',
    tabbar: {},
    joinStateus: '',
    clubId: '',
    clubMsg: ''
  },


  // 未加入
  // 跳转到创建俱乐部
  create_club() {
    wx.navigateTo({
      url: '/pages/create-club/index',
    })
  },
  // 跳转到加入俱乐部页面
  join_club() {
    wx.navigateTo({
      url: '/pages/join-club/index',
    })
  },


  // 已加入

  // 成员列表
  member_list() {
    wx.navigateTo({
      url: '/pages/member-list/index',
    })
  },
  // 战绩列表
  record_list() {
    wx.navigateTo({
      url: '/pages/record-list/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar();

    var that = this;
    // 判断是否加入俱乐部 显示不同tabbar页面
    app.yc_request('GET', 'client/UserApi/' + app.globalData.openId, {}, function(datas) {

      if (datas.data.obj.clubId == 0) {
        that.setData({
          mymeg: datas.data.obj,
          joinStateus: datas.data.obj.clubId,
        })
      } else {
        var usermsg = datas.data.obj;
        app.globalData.clubId = usermsg.clubId;
        that.setData({
          joinStateus: datas.data.obj.clubId,
        })

        // 已加入就获取俱乐部的信息
        app.yc_request('GET', 'client/ClubMsgApi/' + that.data.joinStateus, {}, function(datas) {
          var allMsg = datas.data.obj;
          that.setData({
            clubMsg: allMsg
          })
        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });
        // 已加入就获取俱乐部的信息
        app.yc_request('POST', 'client/ClubApi/' + that.data.joinStateus, {}, function(datas) {
          var allMsg = datas.data.obj;
          that.setData({
            club_meg: allMsg
          })
        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });

      }
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