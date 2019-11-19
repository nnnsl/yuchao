// pages/real-name/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source:'',
    source2:'',
    imgfile:'',
    imgfile2:''
  },

  // 上传照片
  uploadimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          source: res.tempFilePaths
        });
        // 转base64
        let imgfiles = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        that.setData({
          imgfile: imgfiles
        })
      }
    })
  },

  uploadimg2: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          source2: res.tempFilePaths
        });
        // 转base64
        let imgfiles2 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[1], "base64");
        that.setData({
          imgfile2: imgfile2
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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