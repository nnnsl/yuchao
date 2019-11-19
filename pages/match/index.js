// pages/match/index.js
import Dialog from '../../dist/dialog/dialog';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    gamerecordArr: []
  },

  // 跳转到个人赛页面
  show_grs() {
    wx.navigateTo({
      url: '/pages/one-match/index',
    })
  },

  // 判断是否团长
  team_game: function() {
    var that = this;
    app.yc_request('GET', 'client/ClubApi/' + app.globalData.openId, null, function(datas) {
      // debugger;
      if (datas.data.obj) {
        wx.navigateTo({
          url: '/pages/group-match/index',
        })
      } else {
        that.nextBtn();
      }
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    })

  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar();
    // 获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        //注册经纬度
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
      }
    });
    var that = this;
    app.yc_request('GET', 'client/GamerecordApi/' + app.globalData.openId, {}, function(datas) {
      console.log(datas)
      that.setData({
        gamerecordArr: datas.data.obj
      })
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });
    //获取比赛信息

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    app.hidetabbar();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    app.hidetabbar();

    this.show_dialog = this.selectComponent("#showModal");
  },

  //弹窗——显示按钮
  nextBtn() {
    // debugger;
    var me = this;
    var clubId = app.globalData.clubId;
    console.log(clubId)
    if (clubId == 0) {
      Dialog.confirm({
        title: '提示',
        message: '您还没有加入俱乐部，确定加入其它俱乐部吗？'
      }).then(() => {
        // on confirm
        wx.switchTab({
          url: '/pages/club/index',
        })
      }).catch(() => {
        // on cancel
        console.log('取消')
      });
    } else {
      console.log(me)
      me.show_dialog.showPopup();
    }
  },
  //弹窗——确认事件
  yes() {
    this.show_dialog.hidePopup();
  },
  //弹窗——确认事件
  no() {
    this.show_dialog.hidePopup();
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