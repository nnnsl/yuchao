// pages/one_match/index.js
import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import Dialog from '../../dist/dialog/dialog';
const MD5 = require('../../utils/md5.js');

const app = getApp();
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2019; i < 2029; i++) {
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
    total_fee: '', //时间段的总金额
    period_money: '',
    time_price: '',
    cgName: "请选择场馆",
    popupShow: false,
    popupShow2: false,
    columns: [],
    cgid: '',
    columnsList: [],
    currentColumn: "",
    timeShow: '请选择时间',
    post_timeShow: '',
    time_sxws: [{
        nm: 1,
        name: '上午'
      }, {
        nm: 2,
        name: '下午'
      }, {
        nm: 3,
        name: '晚上'
      }
      // , {
      //   nm: 4,
      //   name: '全天'
      // }
    ],
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    checked: false,
    popup: true,
    items: [{
        name: 'xj',
        value: '现金支付',
        checked: 'true'
      },
      {
        name: 'jb',
        value: '金币支付'
      },
    ],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    daytype: '',
    day: 2,
    time_sxw: {
      nm: 1,
      name: '上午'
    },
    value: [9999, 1, 1]
  },
  bindChange: function(e) {
    const val = e.detail.value
    console.log(this.data.time_sxws[val[3]])
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
    let aa = []; //场地id的时间段价格
    let cgid = this.data.cgid;
    let daytype = this.data.time_sxw.nm;
    this.data.time_price.find(item => {
      if (item.id == cgid) {
        aa.push(item)
      }
    })
    console.log(aa)
    console.log(daytype)
    if (daytype == 1) {
      //上午的价格
      this.setData({
        total_fee: aa[0].mPrice
      })
    } else if (daytype == 2) {
      //下午的价格
      this.setData({
        total_fee: aa[0].aPrice
      })
    } else if (daytype == 3) {
      //晚上的价格
      this.setData({
        total_fee: aa[0].nPrice
      })
    }
    console.log(this.data.total_fee)
    this.setData({
      popupShow2: false,
      timeShow: this.data.year + '年' + this.data.month + '月' + this.data.day + '日' + this.data.time_sxw.name,
      post_timeShow: this.data.year + '-' + this.data.month + '-' + this.data.day, //时间
      daytype: this.data.time_sxw.nm //时间类型：上午/下午/晚上
    });

  },
  popupShow4() {
    this.setData({
      popupShow2: false
    });
  },

  // 点击空白隐藏弹窗
  onPoputClose() {
    this.setData({
      popupShow: false
    });
  },
  onPoputClose2() {
    this.setData({
      popupShow2: false
    });
  },

  // 确认/取消按钮事件
  onConfirm(e) {
    var that = this;
    var cgid = e.detail.value.id;
    var dataList = that.data.columnsList; //接口获取的obj
    var pricelist = []; //创建场馆的时段价格列表
    const {
      picker,
      value,
      index
    } = e.detail;
    var columnsList = that.data.columnsList;
    var currentColumn = columnsList[index];
    // 循环创建场馆的时段价格列表
    dataList.forEach((item, index) => {
      let obj = {};
      obj.id = item.id;
      obj.mPrice = item.mPrice; //添加上午场价格
      obj.aPrice = item.aPrice; //添加下午场价格
      obj.nPrice = item.nPrice; //添加晚上场价格
      pricelist.push(obj); //递增到价格列表
    })
    that.setData({
      time_price: pricelist,
      cgid: cgid,
      popupShow: false,
      cgName: e.detail.value.text,
      currentColumn: currentColumn
    })

  },
  // 取消事件
  onCancel(e) {
    this.setData({
      popupShow: false
    })
  },

  onConfirm2(e) {
    this.setData({
      popupShow2: false,
      timeShow: new Date(parseInt(e.detail)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    })
  },

  // 支付选择
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },

  // 订单支付 显示/隐藏
  showPopup() {
    if (this.data.cgName == '请选择场馆') {
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
        popup: false
      })
    }
  },
  hidePopup() {
    this.setData({
      popup: true
    })
  },

  // 确认支付
  submit_record: function() {
    var that = this;
    var postData = {
      venueId: that.data.cgid,
      days: that.data.daytype,
      matchTime: that.data.post_timeShow,
      total_fee: 0.01
    };

    let aa = JSON.stringify(postData)
    app.yc_request('POST', 'client/GamerecordApi/' + app.globalData.openId, postData, function(datas) {
      var stringA = "appId=wx78eab72a6ea9581d&nonceStr=" + datas.data.obj.nonceStr + "&package=prepay_id=" + datas.data.obj.prepayId + "&signType=MD5&timeStamp=" + datas.data.obj.timeStamp + "&key=RvpZU2lvoDO6ZTlRuywc1sS85qdPNlau";
      var paySignMsg = MD5.hexMD5(stringA).toUpperCase();
      // 调用微信支付接口
      wx.requestPayment({
        "total_fee": datas.data.obj.money,
        'timeStamp': datas.data.obj.timeStamp.toString(),
        'nonceStr': datas.data.obj.nonceStr,
        'package': "prepay_id=" + datas.data.obj.prepayId,
        'paySign': paySignMsg,
        'signType': 'MD5',
        'success': function(res) {
          console.log(res)
          if (res.errMsg == "requestPayment:ok") { // 调用支付成功
            wx.redirectTo({
              url: '/pages/pay-success/index',
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
  //展示参赛协议
  showcsxy() {
    Dialog.alert({
      title: '参赛需知',
      message: `
      1、本协议是报名者与主办方关于版权及法律的权利和义务的约定。所有参加本次大赛的报名者在报名前，请认真阅读本协议，在接受本协议所有条款的条件下，报名者将获得报名资格并填写报名表。凡提交作品参赛并完成报名表者，即被视为接受本协议各条款约束。

2、为了保证大赛的顺利进行，请填写真实有效的个人信息，大赛主办方有权因大赛报名者填写的信息与真实信息不符而取消其参赛资格。报名者同意主办方在本次大赛中无偿使用其姓名权和肖像权，在互联网和媒体上公开披露报名者填写的相关个人信息。

3、参与本次大赛，报名者需要保证其报名作品未公开发表，且未向任何其他相关活动进行提交报名，此前若在任何媒体或网站发表应向主办方书面声明，主办方有权根据参赛规则对参赛作品的进行筛选和剔除。主办方不承担参赛作品在邮寄过程（含网络传输）中的丢失、毁损责任及其它由不可抗拒因素造成的任何参赛资料的遗失、错误或毁损责任。

4、参与本次大赛，报名者应承诺提交的视频作品、剧本作品是其独立创作，并取得相关作品的共同权利人以及相关作品的剧本、摄像、视频素材、音乐、图片和演员等原始著作权人的合法授权，不违反报名者与其经纪公司等其他商业合作伙伴的在先协议。报名者应无条件接受主办方对本次大赛选择的冠名和其他商业赞助形式。

5、参与本次大赛，报名者应承诺提交的视频、剧本作品不得包含色情、诽谤、反动等非法内容，不得植入未经主办方允许的商业广告，报名者保证报名作品不构成对任何第三方的著作权或其他合法权利的侵犯。因报名作品侵权而产生的被第三方提起诉讼或行政查处的一切法律责任由报名者自行承担，主办方及其合作方因此而产生的一切直接和间接损失由报名者承担。

6、参与本次大赛，参赛作品需参加2017“网聚正能量•共筑中国梦”重庆微视频大赛系列作品展播，主办方对报名者的报名资料以及参赛作品拥有完整著作权，使用范围包括但不仅限于：电视、报刊、杂志及互联网，并可为商业或非商业目的保存、使用、发表、发布，而无需征得报名者的同意或支付报酬。报名者同意主办方可将微视频作品使用于各类评选活动，并允许主办方在其作品中植入商业元素等及其他商业用途，由此产生的收益由主办方和报名者协商分配比例。未经主办方书面同意，报名者在参赛期间不能将参赛作品转让或许可给任何第三方。由主办方组织拍摄的照片和影像资料的著作权归主办方所有，主办方有权不征得被拍摄的报名者同意，使用前述照片和影像资料或提供给其他媒体发布。

7、参与本次大赛，获得主办方所颁发奖项的个人、团队在参与大赛活动途中和参赛期间遇到的任何意外事故或第三方侵权行为造成人身损害和财产损失的，由报名者自行承担或向侵权责任方索赔，不得要求主办方和承办方承担相应责任。主办方向获奖者发出获奖通知，若通知发出后10日内无人确认，或获奖者未经主办方允许拒绝参加颁奖典礼，视为自动弃权。

8、参与本次大赛的个人或团队应遵守主办方的活动安排，积极配合相关活动需求。

9、报名参与本次大赛的个人或团队，将自动进入主办方的人才储备库，在同等条件下，与主办方享有优先合作权，具体合作事项和条件由双方另行协商并签署协议。

10、个人及团队报名参与本次大赛的作品，将同时报名参与2017广播电视新媒体微视频大赛，拥有获得2017广播电视新媒体微视频大赛所有奖项的资格，并同时遵守2017广播电视新媒体微视频大赛规则。

11、个人及团队报名参与本次大赛的作品，将视为同意参加由国家广电总局开展的2017“弘扬社会主义核心价值观 共筑中国梦”全国原创网络视听节目评选活动，且必须接受由大赛主办方作为唯一推送单位进行报送，所获奖金及荣誉由主办方和报名者协商分配比例。

12、报名者违反上述本协议任一条款，主办方有权单方终止本协议，取消报名作品的参赛资格，停止其作品的展播，已支付奖金的应返还主办方。

13、本次大赛因不可抗力事件、法律法规的规定及行政机构的要求或其他有权机关的命令、通知等原因导致主办方延期或终止的，不视为主办方违约，主办方有权单方解除本协议，主办方和承办方对报名者均不承担任何责任。

14、主办方保证本次比赛的合法性和公开、公平、公正，对比赛规则和评选规则拥有最终解释权。

15、本协议以及其修改权、更新权及最终解释权均属大赛主办方所有。

16、本协议内容如有变动，主办方将会在官方网页上公示修改内容，公示期为5日。参赛者若不接受修改条款，有权在公示期内通过书面形式向主办方声明退出此次大赛。公示期满后，参赛者未通知主办方放弃参赛的，则默认为接受所变动内容。

17、因签订本协议或参加本次大赛产生的纠纷，均由承办方所在地即中华人民共和国重庆市有管辖权的人民法院处理。
      `
    }).then(() => {
      // on close
    });
  },

  // 支付成功页面
  pay_status() {
    wx.navigateTo({
      url: '/pages/pay-success/index',
    })
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
      venueMsg.forEach(function(item, index) {
        let obj = {};
        obj.text = item.venueName;
        obj.id = item.id;
        venueArr.push(obj);
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