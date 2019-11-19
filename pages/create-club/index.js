// pages/creat-club/index.js
import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import Dialog from '../../dist/dialog/dialog';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    country: "选择省",
    city: "选择市",
    source: '',
    inputName: '',    
    inputAbout: '',
    show: false,
    show2: false,
    columns: [],    //省选项
    columns2: [],   //省对应的市选项  
    imgfile:"",
    selected_province:"",   //选中的省
    selected_cities: ""      //选中的市

  },
  // 省级确认和取消
  onConfirm(e) {
    var that = this;
    let sheng_id = e.detail.value.id;
    that.setData({
      country: e.detail.value.text,
      selected_province: e.detail.value.text,
      city: "选择市",
      show: false
    });
    app.yc_request('GET', 'client/cityApi/' + sheng_id, null, function(datas) {
      var cityList = [];
      let cityArr = datas.data.obj;
      cityArr.forEach(function(item, index) {
        cityList.push({
          text: item.name,
          id: item.id
        });
      })
      that.setData({
        columns2: cityList
      })
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    })
  },
  onCancel(e) {
    this.setData({
      show: false
    })
  },
  // 城市级确认
  onConfirm2(e) {
    let city_id = e.detail.value.id;
    this.setData({
      city: e.detail.value.text,
      selected_cities: e.detail.value.text,
      show2: false
    });
  },
  onCancel2(e) {
    this.setData({
      show2: false
    })
  },
  //省和城市的点击事件
  changeShow() {
    this.setData({
      show: true
    })
  },
  changeShow2() {
    if (this.data.country == '选择省') {
      Toast('请先选择省份');
    } else {
      this.setData({
        show2: true
      })
    }
  },
  // 关闭弹窗
  onClose() {
    this.setData({
      show: false
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },

  // 名称
  clubNameInput(e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  // 简介
  clubAboutInput(e) {
    this.setData({
      inputAbout: e.detail.value
    })
  },

  // logo
  uploadimg: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
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

  //创建俱乐部
  create_club: function() {
      var that=this;
    if (this.data.inputName == '') {
      Notify({
        text: '请填写俱乐部名称',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else if (this.data.inputAbout == '') {
      Notify({
        text: '请填写俱乐部简介',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else if (this.data.source == '') {
      Notify({
        text: '请上传俱乐部logo',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else if (this.data.country == '选择省') {
      Notify({
        text: '请选择省份',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else if (this.data.city == '选择市') {
      Notify({
        text: '请选择城市',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else {
      Dialog.confirm({
        message: '确定创建俱乐部吗？',
        asyncClose: true
      }).then(() => {
        // 发送创建请求
        app.yc_request('POST', 'client/ClubApi/create/' + app.globalData.openId, {
          clubArea: that.data.selected_province,
          clubCity: that.data.selected_cities,
          clubDesc: that.data.inputAbout, 
          clubLogo: that.data.imgfile,
          clubName: that.data.inputName,
        }, function(datas) {
          setTimeout(() => {
            Toast('创建成功！');
            Dialog.close();
          }, 1000);
          wx.navigateTo({
            url: '/pages/join-club/index',
          })
        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });
      }).catch(() => {
        setTimeout(() => {
          Toast('创建失败！');
          Dialog.close();
        }, 1000);
      });

      // app.yc_request('POST', 'client/ClubApi/' + app.globalData.openId, {
      //     clubArea: that.data.selected_province,
      //     clubCity: that.data.selected_cities,
      //     clubDesc: that.data.inputAbout,
      //     clubLogo: that.data.imgfile,
      //     clubName: that.data.inputName,
      //   openId: app.globalData.openId
      //   }, function(datas) {

      //   }, function(erro) { 
         
      //   });


    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 省
    var that = this;
    app.yc_request('GET', 'client/cityApi', null, function(datas) {
      var columnList = [];
      var columnsArr = datas.data.obj;
      columnsArr.forEach(function(item, index) {
        columnList.push({
          text: item.name,
          id: item.id
        });
      })
      // console.log(columnList)
      that.setData({
        columns: columnList
      })

    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
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