import Dialog from '../../dist/dialog/dialog';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clubId: '',
    clubMsg: ''
  },

  // 跳转到成员列表
  goMenmberList() {
    wx.navigateTo({
      url: '/pages/member-list/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var clubId = options.clubId;
    var that = this;
    that.setData({
      clubId: clubId
    })

    // 根据id获取俱乐部信息
    app.yc_request('POST', 'client/ClubApi/' + that.data.clubId, null, function(datas) {
      var allMsg = datas.data.obj;
      that.setData({
        clubMsg: allMsg
      })
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });
  },

  // 申请加入
  apply_join(e) {
    var that = this;

  // 确认取消弹框
    Dialog.confirm({
      title: '确认加入吗?',
    }).then(() => {
      // 确认
      app.yc_request('POST', 'client/ClubApplyApi', {
        clubId: that.data.clubId,
        openId: app.globalData.openId
      }, function(datas) {
        wx.switchTab({
          url: '/pages/club/index',
          success: function(e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      }, function(erro) {
        wx.showToast({
          title: '网络走神了！',
        })
      });

    }).catch(() => {
      // 取消
      Dialog.close();
    });

    // app.yc_request('POST', 'client/ClubApplyApi', {
    //   clubId: that.data.clubId,
    //   openId: app.globalData.openId
    // }, function(datas) {
    //   var culbID = e.currentTarget.id;
    //   app.globalData.clubId = culbID;
    //   Dialog.confirm({
    //     title: '确认加入吗?',
    //   }).then(() => {
    //     if (datas.data.obj == true) {
    //       wx.switchTab({
    //         url: '/pages/club/index',
    //         success: function(e) {
    //           var page = getCurrentPages().pop();
    //           if (page == undefined || page == null) return;
    //           page.onLoad();
    //         }
    //       })
    //     } else {
    //       return;
    //     }
    //   }).catch(() => {
    //     Dialog.close();
    //   });
    // }, function(erro) {
    //   wx.showToast({
    //     title: '网络走神了！',
    //   })
    // });

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