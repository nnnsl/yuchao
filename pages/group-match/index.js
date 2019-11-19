// pages/group-match/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'man_1',
        value: '男单',
        // checked: "true"
      },
      {
        name: 'woman_1',
        value: '女单'
      },
      {
        name: 'man_2',
        value: '男双'
      },
      {
        name: 'mix',
        value: '混双'
      }
    ],
    items2: [{
        name: 'xj',
        value: '现金支付',
        checked: 'true'
      },
      {
        name: 'jb',
        value: '金币支付'
      }
    ],
    popup: true,
    popup2: true,
    cgName: '请选择场馆',
    popupShow: false,
    timeShow: '请选择时间',
    popupShow2: false,
    columns: [],
    columnsList: [],
    currentColumn: '',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    checked: false,
    clickRadio: "",
    teseProject: ["十三", "十三", "十三", "十三", "十三", "十三", ],
    years: years,
    year: date.getFullYear(),
    months: months,
    time_sxws: ['上午', '下午', '晚上'],
    time_sxw: '上午',
    month: 2,
    days: days,
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      time_sxw: this.data.time_sxws[val[3]]
    })
  },
  // 弹出框
  popupShow() {
    this.setData({
      popupShow: true
    })
  },
  popupShow2() {
    this.setData({
      popupShow2: true
    });
  },
  popupShow3() {
    this.setData({
      popupShow2: false,
      timeShow: this.data.year + '年' + this.data.month + '月' + this.data.day + '日' + this.data.time_sxw
    });
  },
  popupShow4() {
    this.setData({
      popupShow2: false
    });
  },

  // 项目
  // 选项弹出
  showPopup() {
    this.setData({
      popup: false
    })
  },
  // 隐藏
  hidePopup() {
    this.setData({
      popup: true
    })
  },
  // 选中
  radioChange: function(e) {
    this.setData({
      clickRadio: e.detail.value
    })
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  // 场馆 弹出
  popupShow() {
    this.setData({
      popupShow: true
    })
  },
  // 点击空白隐藏弹窗
  onPoputClose() {
    this.setData({
      popupShow: false
    });
  },
  // 确认/取消按钮事件
  onConfirm(e) {
    var that = this;
    const {
      picker,
      value,
      index
    } = e.detail;
    var columnsList = that.data.columnsList;
    var currentColumn = columnsList[index];
    that.setData({
      popupShow: false,
      cgName: e.detail.value,
      currentColumn: currentColumn
    })
  },

  // 时间
  popupShow2() {
    this.setData({
      popupShow2: true
    });
  },
  // 点击空白隐藏弹窗
  onPoputClose2() {
    this.setData({
      popupShow2: false
    });
  },
  // 确认
  onConfirm2(e) {
    this.setData({
      popupShow2: false,
      timeShow: new Date(parseInt(e.detail)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    })
  },


  // 同意复选
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },

  // 订单空白关闭
  hidePopup2() {
    this.setData({
      popup2: true
    })
  },


  // 确认支付
  showPopup2() {
    if (this.data.clickRadio == "") {
      Notify({
        text: '请选择项目',
        duration: 1500,
        backgroundColor: '#f5222d'
      })
    } else if (this.data.cgName == '请选择场馆') {
      Notify({
        text: '请选择场馆',
        duration: 1500,
        backgroundColor: '#f5222d'
      })
    } else if (this.data.timeShow == '请选择时间') {
      Notify({
        text: '请选择时间',
        duration: 1500,
        backgroundColor: '#f5222d'
      })
    } else if (this.data.checked == false) {
      Notify({
        text: '请您同意参赛协议',
        duration: 1500,
        backgroundColor: '#f5222d'
      })
    } else {
      this.setData({
        popup2: false
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取场馆信息
    app.yc_request('GET', 'client/VenueApi', null, function(datas) {
      var venueMsg = datas.data.obj;
      var venueArr = [];
      datas.data.obj.forEach(function(item, index) {
        var venueLisr = item.venueName;
        venueArr.push(venueLisr);
      })
      that.setData({
        columns: venueArr,
        columnsList: venueMsg
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