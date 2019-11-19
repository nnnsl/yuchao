// pages/authorize/authorize.js
var app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权过
          wx.getUserInfo({
            success: function(res) {
              wx.login({
                success: res => {
                  // 传给后台再经过解析获取用户的 openId
                  app.yc_request('GET', 'client/UserBind/' + res.code, null, function(datas) {
                    var jsonObj = JSON.parse(datas.data.obj);
                    app.globalData.openId = jsonObj.openid;

                    // 如果用户已经授权过跳到首页
                    wx.switchTab({
                      url: '/pages/match/index',
                    });
                    app.yc_request('GET', 'client/UserApi/' + app.globalData.openId, {}, function (datas) {
                      app.globalData.clubId = datas.data.obj.clubId;
                    }, function (erro) {
                      wx.showToast({
                        title: '网络走神了！',
                      })
                    })
                  }, function(erro) {
                    wx.showToast({
                      title: '网络走神了！',
                    })
                  })
                }
              });
            }
          });
        } else {
          // 用户没有授权   改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  // 授权
  bindGetUserInfo: function(e) {

  // 允许
    if (e.detail.userInfo) {
      var that = this;
      wx.login({
        success: res => {
          var userInfo = e.detail.userInfo;
          var openId = "";
          app.yc_request('GET', 'client/UserBind/' + res.code, null, function(datas) {
            var jsonObj = JSON.parse(datas.data.obj);
            app.globalData.openId = jsonObj.openid;

            app.yc_request('POST', 'client/UserApi/' + app.globalData.openId, {
              nickName: userInfo.nickName,
              language: userInfo.language,
              gender: userInfo.gender,
              avatarUrl: userInfo.avatarUrl,
              country: userInfo.country,
              city: userInfo.city,
              province: userInfo.province,
            }, function(datas) {
              // 判断是否绑定过手机
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
                wx.switchTab({
                  url: '/pages/match/index',
                });
              }
            }, function(erro) {
              wx.showToast({
                title: '网络走神了！',
              })
            })
            
          }, function(erro) {
            wx.showToast({
              title: '网络走神了！',
            })
          })
        }
      });
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });

    } else {
      //拒绝
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
      return
    };
  
      

  },


})