// pages/cg-details/index.js
import Notify from '../../dist/notify/notify';
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
const MD5 = require('../../utils/md5.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lb: '', //监听y轴移动距离
    rb: '', //监听y轴移动距离
    indate: '', //预定的日期
    inmonth: '', //预定的日期
    h_true: true, //选择的场地显示隐藏
    popup: true,
    dateArr: [], //日,周
    idx: 0, //日期高亮
    venueName: '',
    venueAddress: '',
    avePrice: '',
    score: '',
    area: [], //场地ID,价格
    areaOption: [],
    timeId: "",
    areaId: "",
    nowday: "",
    venueId: "",
    dataList: [],
    timeList: "", //当前年月
    totalMoney: 0,
    choosed: [], //已经被预定
    timeListItem: [],
    venueImg: '',
    defaultImg: '/images/reserve/venue.jpg',
    time: [{
        time: "10:00-11:00",
        id: 1
      },
      {
        time: "11:00-12:00",
        id: 2
      },
      {
        time: "12:00-13:00",
        id: 3
      },
      {
        time: "13:00-14:00",
        id: 4
      },
      {
        time: "14:00-15:00",
        id: 5
      },
      {
        time: "15:00-16:00",
        id: 6
      },
      {
        time: "16:00-17:00",
        id: 7
      },
      {
        time: "17:00-18:00",
        id: 8
      },
      {
        time: "18:00-19:00",
        id: 9
      },
      {
        time: "19:00-20:00",
        id: 10
      },
      {
        time: "20:00-21:00",
        id: 11
      },
      {
        time: "21:00-22:00",
        id: 12
      },
      {
        time: "21:00-22:00",
        id: 13
      },
    ]
  },
  //滚动监听
  test2(e) {
    this.setData({
      lb: e.detail.scrollLeft
    });
  },
  //滚动监听
  test(e) {
    this.setData({
      rb: e.detail.scrollLeft
    });
  },
  // 日期点击
  goIndex(e) {
    var that = this;
    console.log(that.data.dataList)
    if (that.data.dataList.length == 0) {
      that.sxcd(e)
    } else {
      Dialog.alert({
        title: '提醒',
        message: '更换日期会清空选择的场地'
      }).then(() => {
        // on confirm
        that.sxcd(e)
      });
    }
  },

  //刷新场地
  sxcd(e) {
    console.log(e)
    var that = this;
    that.setData({
      indate: e.target.dataset.indate,
      inmonth: e.target.dataset.inmonth,
      dataList: [],
      totalMoney: 0
    });
    console.log(e.target.dataset.inmonth);
    let clickindex = e.currentTarget.dataset.index;
    that.setData({
      idx: clickindex
    })
    var dateArr = that.data.dateArr;
    var index = that.data.idx;
    var date_data = dateArr[index]
    // 设置选中的时间

    var nowYear = new Date().getFullYear();
    var nowMonth = date_data[2]; //当前年月
    that.setData({
      'timeList.nowdate': date_data[1],
      nowday: date_data[0],
      'timeList.nowYear': nowYear,
      'timeList.nowMonth': nowMonth
    });

    var timeObj = that.data.timeList;
    var year = timeObj.nowYear;
    var month = timeObj.nowMonth;
    var date = that.data.timeList.nowdate;
    var usetime = year + '-' + month + '-' + date;
    // 切换日期加载当前日的的预订记录  
    app.yc_request('GET', 'client/ScheduleRecordApi/' + that.data.venueId + '/' + usetime, {}, function(datas) {
      var recordArr = datas.data.obj;
      that.setData({
        choosed: recordArr
      });
      that.loadChoose(usetime);
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });
  },

  // 点击座位
  chooseArea(e) {
    var me = this;
    // console.log(me.data.dataList);
    var cgid = e.currentTarget.dataset.cg; //场馆iddateArr
    var timeId = e.target.dataset.hid; //左边时间段id
    var areaId = e.target.dataset.id; //上面的场地id
    var priceId = e.target.dataset.price; //后台给的场地价格
    var time_period = e.target.dataset.time; //上面的场地时间段
    // var time = e.target.dataset.time;
    var ischoose = e.target.dataset.ischoose; //是否不可选
    // 是否不可选
    if (ischoose) {
      return;
    }

    var data = this.data.dataList;
    var obj = {
      timeId: timeId,
      areaId: areaId,
      price: priceId,
      day: me.data.indate,
      inmonth: me.data.inmonth,
      time: time_period
    }
    // 已选+可选
    var isselect = me.data.areaOption[cgid - 1][timeId - 1].isselect;
    var value = 'areaOption[' + (cgid - 1) + '][' + (timeId - 1) + '].isselect';
    var allRecord = me.data.dataList;
    // 根据数组长度判断是否增减
    if (data.length < 4) {
      // 改变选中状态
      if (isselect) {
        me.setData({
          [value]: false
        });
        allRecord.forEach(function(item, index) {
          if (item.timeId == obj.timeId && item.areaId == obj.areaId) {
            allRecord.splice(index, 1)
          }
        })
      } else {
        me.setData({
          [value]: true
        });
        allRecord.push(obj); //选中的场次
      };
      me.setData({
        areaOption: me.data.areaOption,
        dataList: allRecord
      });
      var totalmoney_t = 0; // 总价
      data.forEach(function(item, index) {
        totalmoney_t += item.price;
      })
      me.setData({
        totalMoney: totalmoney_t,
        dataList: allRecord
      })
    } else {
      // 超过4个 弹窗
      console.log(obj)
      console.log("====================")
      // data.length=4
      let item = allRecord.find(function(items) {
        return items.timeId == obj.timeId && items.areaId == obj.areaId;
      })
      console.log(item)
      console.log("====================")
      if (item != undefined) {
        // let aa = allRecord.find(function(items) {
        //   items.timeId != obj.timeId && items.areaId != obj.areaId
        // })
        me.setData({
          [value]: false
        });
        allRecord.forEach(function(item, index) {
          if (item.timeId == obj.timeId && item.areaId == obj.areaId) {
            allRecord.splice(index, 1) //数组根据index删除场地
            me.setData({
              totalMoney: me.data.totalMoney - item.price, //总金额减去点击的对象金额
              dataList: allRecord //赋值刷新选中数组
            });
          }
        })
        // me.setData({
        //   dataList: allRecord
        // });
      } else {
        wx.showToast({
          title: '最多只选择4个',
          image: '../../images/erro.png',
          icon: 'erro',
          duration: 1000
        });
      }
      // allRecord.forEach(function(item, index) {
      //   if (item.timeId == obj.timeId && item.areaId == obj.areaId) {
      //     console.log(111)
      //     allRecord.splice(index, 1);
      //     me.setData({
      //       dataList: allRecord
      //     });
      //   } else {
      //     // 超过4个 弹窗
      //     console.log(222)
      //     wx.showToast({
      //       title: '成功',
      //       icon: 'erro',
      //       duration: 1000
      //     });
      //     // me.nextBtn();
      //     // return;
      //   }
      // });
    }
  },

  // 提交订单
  submit_record: function() {
    var that = this;
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var date = that.data.timeList.nowdate;
    var week = that.data.nowday;
    var useTime = year + '-' + month + '-' + date;
    // 发送请求
    console.log(that.data.totalMoney)
    app.yc_request('POST', 'client/ScheduleRecordApi/' + app.globalData.openId, {
      list: that.data.dataList,
      useTime: useTime,
      week: week,
      venueId: that.data.venueId,
      total_fee: that.data.totalMoney * 100,
    }, function(datas) {
      var stringA = "appId=wx78eab72a6ea9581d&nonceStr=" + datas.data.obj.nonceStr + "&package=prepay_id=" + datas.data.obj.prepayId + "&signType=MD5&timeStamp=" + datas.data.obj.timeStamp + "&key=RvpZU2lvoDO6ZTlRuywc1sS85qdPNlau";
      var paySignMsg = MD5.hexMD5(stringA).toUpperCase();
      // 调用微信支付接口
      wx.requestPayment({
        'timeStamp': datas.data.obj.timeStamp.toString(),
        'nonceStr': datas.data.obj.nonceStr,
        'package': "prepay_id=" + datas.data.obj.prepayId,
        'paySign': paySignMsg,
        'signType': 'MD5',
        'success': function(res) {
          if (res.errMsg == "requestPayment:ok") { // 调用支付成功
            wx.redirectTo({
              url: '/pages/cg-Order/index',
            })
          }
        },
        'fail': function(res) {

        },
        'complete': function(res) {

        }
      });
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });
  },

  //弹窗——显示按钮
  nextBtn() {
    this.show_dialog.showPopup();
  },
  //弹窗——确认事件
  yes() {
    this.show_dialog.hidePopup();
  },
  //弹窗——关闭事件
  no() {
    this.show_dialog.hidePopup();
  },
  // 隐藏弹窗
  hidePopup() {
    this.setData({
      popup: true
    })
  },
  // 显示弹窗
  showPopup() {
    var that = this;
    if (that.data.idx == null) {
      Notify({
        text: '请选择日期',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else if (that.data.dataList.length == 0) {
      Notify({
        text: '请至少选择一个场次',
        duration: 1500,
        backgroundColor: '#f5222d'
      });
    } else {
      this.setData({
        popup: false
      })
    }
  },


  loadChoose: function(usetime) {
    var that = this;

    var storageVenueId = wx.getStorageSync('venueId');
    if (storageVenueId == "") {
      wx.setStorageSync('venueId', options.venueId);
      that.setData({
        venueId: options.venueId //当前场馆ID
      })
    } else {
      that.setData({
        venueId: storageVenueId
      })
    }

    // var nowYear = new Date().getFullYear();
    // var nowMonth = new Date().getMonth() + 1; //当前年月
    // that.setData({
    //   'timeList.nowYear': nowYear,
    //   'timeList.nowMonth': nowMonth,
    // });


    // var timeObj = that.data.timeList;
    // var year = timeObj.nowYear;
    // var month = timeObj.nowMonth;
    // var date = new Date().getDate();
    // var usetime = year + '-' + month + '-' + date;

    // 加载当前日的的预订记录  未渲染
    app.yc_request('GET', 'client/ScheduleRecordApi/' + that.data.venueId + '/' + usetime, {}, function(datas) {
      var recordArr = datas.data.obj;
      that.setData({
        choosed: recordArr //已经被预定的数据
      })
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });

    // 详情页场馆信息
    app.yc_request('GET', 'client/VenueApi/' + that.data.venueId, null, function(datas) {
      var venueMsg = datas.data.obj;
      that.setData({
        venueImg: venueMsg.venueImg,
        venueName: venueMsg.venueName,
        venueAddress: venueMsg.venueAddress,
        avePrice: venueMsg.avePrice,
        score: venueMsg.score,
      })
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });

    // 场地信息
    app.yc_request('GET', 'client/SiteApi/' + that.data.venueId, null, function(datas) {
      var areaList = [];
      areaList = datas.data.obj; //所有场地
      var areaIdList = []; //所有场地ID,价格
      var areaobj = {
        areaId: "",
        areaPrice: ""
      }
      areaList.forEach(function(item, index) {
        var arr2 = []
        areaobj.areaId = item.id;
        areaobj.areaPrice = item.price;
        arr2.push(areaobj.areaId, areaobj.areaPrice)
        areaIdList.push(arr2)
      })
      that.setData({
        area: areaIdList
      })

      //渲染所有场次
      var timeList = that.data.time;
      var areaList = that.data.area;
      var chooseList = that.data.choosed;
      var selectList = that.data.dataList;
      var columnArr = [];
      //循环 根据场地数组长度渲染几列
      for (var i = 0; i < areaList.length; i++) {
        var timeListItem = [];
        // 时间数组长度渲染几行
        for (var j = 0; j < timeList.length; j++) {
          var isChoose = false;
          var isSelect = false;
          for (var ii = 0; ii < chooseList.length; ii++) {
            if (chooseList[ii].siteId == areaList[i][0] && chooseList[ii].timeId == timeList[j].id) {
              isChoose = true;
              break;
            }
          };
          if (selectList != []) {
            for (let i = 0; i < selectList.length; i++) {
              if (selectList[i].areaId == areaList[i][0] && selectList[i].timeId == timeList[j].id) {
                isSelect = true;
                break;
              }
            }
          }
          // 默认未选中
          timeListItem.push({
            siteId: areaList[i][0],
            time: timeList[j].time,
            timeId: timeList[j].id,
            price: areaList[i][1],
            ischoose: isChoose,
            isselect: isSelect
          });
        }
        columnArr.push(timeListItem)
      }
      that.setData({
        areaOption: columnArr,
      })
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });
  },

  //返回时间段
  return_timeList(id) {
    console.log(id)
    var that = this;
    let aa = that.data.time;
    let item = allRecord.find(function(items) {
      console.log(items)
      // return items.timeId == obj.timeId && items.areaId == obj.areaId;
    })
  },












  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    wx.setStorageSync('venueId', options.venueId);
    var storageVenueId = wx.getStorageSync('venueId');
    var that = this;
    that.setData({
      venueId: options.venueId //当前场馆ID
    })
    var nowDay = new Date().getDate();
    var nowYear = new Date().getFullYear();
    var nowMonth = new Date().getMonth() + 1; //当前年月
    that.setData({
      'timeList.nowdate': nowDay,
      'timeList.nowYear': nowYear,
      'timeList.nowMonth': nowMonth,
    });


    var timeObj = that.data.timeList;
    var year = timeObj.nowYear;
    var month = timeObj.nowMonth;
    var date = new Date().getDate();
    var usetime = year + '-' + month + '-' + date;
    this.loadChoose(usetime);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 获取当前时间后一个星期
    for (let i = 0; i < 7; i++) {
      var timeArr = [];
      var myDate = new Date()
      var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i;
      //将当前日期转换为毫秒，加上需要增加的天数的毫秒，i表示天数,当i为0代表当前日期，为1时可以得到明天的日期
      var newMyDate = new Date(milliseconds); //再将毫秒转化为日期
      var week = "周" + "日一二三四五六".split(/(?!\b)/)[newMyDate.getDay()]; //获取当前星期几
      var date = newMyDate.getDate(); //获取当前日
      var month = newMyDate.getMonth() + 1; //获取当前日
      timeArr.push(week);
      timeArr.push(date);
      timeArr.push(month);
      this.data.dateArr.push(timeArr)
      this.setData({
        dateArr: this.data.dateArr,
        indate: myDate.getDate(),
        inmonth: month
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.show_dialog = this.selectComponent("#showModal");
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