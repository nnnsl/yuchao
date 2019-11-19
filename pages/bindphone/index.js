// pages/bindphone/index.js

var app = getApp();
Page({
  data: {
    phone: '', //手机号
    code: '', //验证码
    iscode: null, //存放接口获取到的code
    codename: '发送'
  },

  //获取input的值
  getPhoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // getCode: function() {
  //   var a = this.data.phone;
  //   var _this = this;
  //   var myreg = /^1[3456789]\d{9}$/;
  //   if (this.data.phone == "") {
  //     wx.showToast({
  //       title: '手机号不能为空',
  //       icon: 'none',
  //       duration: 1000
  //     })
  //     return false;
  //   } else if (!myreg.test(this.data.phone)) {
  //     wx.showToast({
  //       title: '请输入正确的手机号',
  //       icon: 'none',
  //       duration: 1000
  //     })
  //     return false;
  //   } else {
  // wx.request({
  //   data: {},
  //   url: "",
  //   success(res) {
  //     console.log(res.data.data)
  //     _this.setData({
  //       iscode: res.data.data
  //     })
  //     var num = 61;
  //     var timer = setInterval(function() {
  //       num--;
  //       if (num <= 0) {
  //         clearInterval(timer);
  //         _this.setData({
  //           codename: '重新发送',
  //           disabled: false
  //         })

  //       } else {
  //         _this.setData({
  //           codename: num + "s"
  //         })
  //       }
  //     }, 1000)
  //   }
  // })


  //   }
  // },

  //发送验证码
  getVerificationCode() {
    var _this = this;
    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {

      app.yc_request('POST', 'client/UserBind', {
        openId: app.globalData.openId,
        phone: _this.data.phone,
      }, function(datas) {}, function(erro) {
        wx.showToast({
          title: '网络走神了！',
        })
      })
    }
  },

  //绑定手机号
  save: function() {
    var _this = this;
    var inputCode = _this.data.code

    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if ( //获取接口生成的验证码
      app.yc_request('POST', 'client/UserBind/' + inputCode, {
        openId: app.globalData.openId,
        phone: _this.data.phone,
      }, function(datas) {}, function(erro) {
        wx.showToast({
          title: '网络走神了！',
        })
      })
    ) {
      wx.showToast({
        title: '绑定成功',
        icon: 'none',
        duration: 1000
      })
      wx.switchTab({
        url: '/pages/home/index',
      });
      return false;
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  // 点击取消按钮进入首页
  bindCancel: function() {
    wx.switchTab({
      url: '/pages/home/index',
    })
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