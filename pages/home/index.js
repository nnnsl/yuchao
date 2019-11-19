import Dialog from '../../dist/dialog/dialog';
var app = getApp();
Page({
  data: {
    tabbar: {},
    userMsg:''
  },

  // 跳转全部排名
  goTotalRanks(){
    wx.navigateTo({
      url: '/pages/total-rankings/index',
    })
  },

  onLoad: function() {
    app.editTabbar();

    var that = this;
    // 个人胜率
    app.yc_request('GET', 'client/UserApi/' + app.globalData.openId, {}, function (datas) {
      var usermsg = datas.data.obj;
      app.globalData.clubId = usermsg.clubId;
      that.setData({
        userMsg: datas.data.obj,
      });
      if (datas.data.obj.tel == 'null') {
        Dialog.alert({
          title: '您尚未绑定手机',
          message: '请先绑定手机!'
        }).then(() => {
          wx.navigateTo({
            url: '/pages/bindphone/index',
          });
        });
      } else {
        return;
      }
    }, function (erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    })
    
  },

  onShow: function() {
    app.hidetabbar();

  
  
  },

 onReady:function(){
  
   }

})