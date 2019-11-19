//index.js
//获取应用实例
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestAreaId: 0,
    requestDate: '',
    /**
     * 选中的位置
     */
    list: [],
    /**
     * status 
     * 1 可预订 
     * 2 已售完 
     * 3 已选择
     * 4 我的预订
     * 5 锁定
     * 
     */
    obj: [
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],

      [{
          "status": 2,
          "price": 60
        },
        {
          "status": 5,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],


      [{
          "status": 4,
          "price": 60
        },
        {
          "status": 4,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 2,
          "price": 60
        },
        {
          "status": 5,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 2,
          "price": 60
        },
        {
          "status": 5,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 2,
          "price": 60
        },
        {
          "status": 5,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 2,
          "price": 60
        },
        {
          "status": 5,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 2,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],
      [{
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
        {
          "status": 1,
          "price": 60
        },
      ],

    ],
    time: [
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00",
      "7:00",
      "8:00",
      "8:00",
      "9:00",
    ],

    area: [
      "1号场",
      "2号场",
      "3号场",
      "4号场",
      "5号场",
      "6号场",
      "7号场",
      "8号场",
      "9号场",
    ],
    /**
     * 场次
     */
    session: [{
        name: 'A场',
        id: 1
      },
      {
        name: 'B场',
        id: 2
      },
      {
        name: 'C场',
        id: 1
      },
      {
        name: 'D场',
        id: 2
      },
      {
        name: 'E场',
        id: 1
      },
      {
        name: 'F场',
        id: 2
      },
      {
        name: 'G场',
        id: 1
      },
      {
        name: 'H场',
        id: 1
      },
    ],
    date: [{
        title: '今天',
        subTitle: '03月14日'
      },
      {
        title: '周五',
        subTitle: '03月15日'
      },
      {
        title: '周六',
        subTitle: '03月16日'
      },
      {
        title: '周日',
        subTitle: '03月17日'
      },
      {
        title: '周一',
        subTitle: '03月18日'
      },
    ],
    submitTitle: '提交订单',
    /**
     * 日期选中
     */
    datePosition: 0,
    /**
     * 场次选中
     */
    sessionPosition: 0,
    /**
     * 上拖动效果越界
     */
    offsetTop: 0,
    /**
     * 做拖动效果越界
     */
    offsetLeft: 0,
    /**
     * 调整左边的滚动条位置
     */
    left: 0,
    /**
     * 调整上的滚动条位置
     */
    top: 0,
    /**
     * 选座区域最小高度
     */
    min: 100,
    /**
     * 选座区域最大高度
     */
    max: 600,

    /**
     * 场地价格
     */
    price: 0,
    /**
     * 当前场地id
     */
    id: 0,
    /**
     * 最大可选场地
     */
    maxFieldLen: 4,
    /**
     * 最小可选场地
     */
    minFieldLen: 1,
    /**
     * 默认时间选择滚动条位置
     */
    dateScrollX: 0,
    scrollItemW: 0,
    screenW: 0,
    isFirstScroll: false
  },
  /**
   * 确认订单
   */
  confirm: function(e) {
    if (this.data.list.length <= this.data.minFieldLen - 1) {
      wx.showToast({
        title: `最少选择${this.data.minFieldLen}场`,
        icon: 'none',
        duration: 2000
      })
      return
    }


    var session = this.data.session[this.data.sessionPosition].name
    var date = this.data.date[this.data.datePosition].subTitle
    var data = {
      allPrice: this.data.price,
      applyDate: this.data.date[this.data.datePosition].value,
      session: session,
      date: date,
      refundHours: this.data.refundHours,
      list: this.data.list,

    }
    wx.navigateTo({
      url: '../placeSubmit/placeSubmit?data=' + JSON.stringify(data),
    })
  },
  /**
   * 选择场次
   */
  chooseSession: function(e) {
    var index = parseInt(e.currentTarget.id)
    if (index != this.data.sessionPosition) {

      this.setData({
        contentX: 0,
        contentY: 0,
        sessionPosition: index,
        requestAreaId: this.data.id,
        submitTitle: '提交订单',
      })

      this.getData(this.data.session[index].id, this.data.date[this.data.datePosition].value, this.data.id)
    }

  },
  /**
   * 选择日期
   */
  chooseDate: function(e) { 
    var index = parseInt(e.currentTarget.id)
    if (index != this.data.datePosition) {
      this.setData({
        datePosition: index
      })
    }  
  },
  /**
   * 点击事件
   */
  bindChange: function(e) {
    var x = e.detail.x
    var y = e.detail.y
    var offsetTop = 0;
    if (y > 0) {
      offsetTop += y
    }
    var offsetLeft = 0;
    if (x > 0) {
      offsetLeft += x;
    }


    this.setData({
      left: x,
      offsetLeft: offsetLeft,
      offsetTop: offsetTop,
      top: y
    })
  },
  /**
   * 场地选择
   */
  choose: function(e) {
    var p = e.currentTarget.id.split(",")

    var i = parseInt(p[0])
    var j = parseInt(p[1])
    var id = i + ',' + j // 1,2 
    var item = this.data.obj[i][j]

    //    1 可预订 
    //    2 已售完
    //   3 已选择
    //     4 我的预订
    //       5 锁定
    //         
    var status = item.status

    /**
     * 可预订
     */
    if (status == 1) {
      //判断数组长度最多选4个座位
      if (this.data.list.length == this.data.maxFieldLen) {
        wx.showToast({
          title: '最多选择' + this.data.maxFieldLen + '场',
          icon: 'none',
          duration: 2000
        })
        return
      }
      /**
       * 判断上下是否是靠近的
       * i,j
       * 可以选择
       * 0,0
       * 1,0
       * 不能选择
       * 0,0
       * 1,2
       */

      var arithmeticList = []
      var isAdd = false
      for (var index in this.data.list) {
        var temp = this.data.list[index].id.split(",");
        var x = parseInt(temp[0])
        var y = parseInt(temp[1])
        if (y == j) {
          //判断在一列
          arithmeticList.push(x)

          isAdd = true
        } else {
          wx.showToast({
            title: '请选择同一个场地',
            icon: 'none',
            duration: 2000
          })

          return
        }
      };
      /**
       * 判断等差数列
       */
      if (null != arithmeticList && isAdd && arithmeticList.length > 0) {

        var tempArithmeticList = arithmeticList
        tempArithmeticList.push(i)

        if (!this.isArithmeticList(tempArithmeticList)) {
          wx.showToast({
            title: '请选择两个连续的场地',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }

      item.status = 3
      /**
       * 生成框里的数据
       */
      this.data.list.push({
        price: this.data.obj[i][j].price,
        time: this.data.time[i] + '-' + this.data.time[i + 1],
        area: this.data.area[j].name,
        // area: this.data.session[this.data.sessionPosition].name + this.data.area[j].name,
        id: id,
        fieldId: this.data.area[j].id

      })
      let tempO = 'obj[' + i + '][' + j + ']'
      // console.log(tempO)
      /**
       * 计算价格
       */
      var title = this.getTitle(this.data.list)
      this.setData({
        submitTitle: title,
        // obj: this.data.obj,
        [tempO]: item,
        list: this.data.list
      })
    } else if (status == 3) {

      //i j

      var arithmeticList = []
      var isAdd = false
      for (var index in this.data.list) {
        var temp = this.data.list[index].id.split(",");
        var x = parseInt(temp[0])
        var y = parseInt(temp[1])
        if (y == j && x != i) {
          //判断在一列
          arithmeticList.push(x)
          isAdd = true
        }
      };
      if (null != arithmeticList && isAdd && arithmeticList.length > 0) {
        if (!this.isArithmeticList(arithmeticList)) {
          wx.showToast({
            title: '请选择两个连续的场地',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }

      /**
       * 已选择 取消选择
       */
      item.status = 1

      for (var m = 0; m < this.data.list.length; m++) {

        if (this.data.list[m].id == id) {
          this.data.list.splice(m, 1)
          break;
        }
      }
      let tempO = 'obj[' + i + '][' + j + ']'
      /**
       * 计算价格
       */
      var title = this.getTitle(this.data.list)
      this.setData({
        submitTitle: title,
        // obj: this.data.obj,
        [tempO]: item,
        list: this.data.list
      })
    } else if (status == 2) {

      wx.showToast({
        title: '已售空',
        icon: 'none',
        duration: 2000
      })
    } else if (status == 5) {

      wx.showToast({
        title: '已锁定',
        icon: 'none',
        duration: 2000
      })
    }

  },
  getTitle: function(list) {

    if (list.length <= 0) {
      this.setData({
        price: 0
      })

      return '提交订单'
    }
    this.data.price = 0
    for (var index in list) {
      this.data.price += list[index].price
    }

    this.setData({
      price: this.data.price
    })

    return '￥' + this.data.price + '提交订单'

  },

  /**
   * 判断是否为等差数列
   */
  isArithmeticList: function(list) {
    var tempArithmeticList = this.sortarr(list)

    for (var i = 0; i < tempArithmeticList.length - 1; i++) {
      var res = tempArithmeticList[i + 1] - tempArithmeticList[i]
      if (res < 0) res = res * -1;

      if (res != 1) {
        // wx.showToast({
        //   title: '请选择两个连续的场地',
        //   icon: 'none',
        //   duration: 2000
        // })
        return false
      }
    }
    return true
  },
  /**
   * 排序
   */
  sortarr: function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    /**
     * 屏幕宽度
     * 16 + 182 scrollW
     */
    let scrollItemW = this.rpx2px(16 + 182)
    let screenW = this.rpx2px(750)

    let blockW = this.rpx2px(96)
    let blockH = this.rpx2px(58)
    // console.log(scrollItemW)

    
    // console.log(options)
    this.setData({ 
      scrollItemW: scrollItemW,
      screenW: screenW,
      blockH: blockH,
      blockW: blockW,
      max: this.rpx2px(that.data.max),
      min: this.rpx2px(that.data.min),
      maxW: this.rpx2px(650),

    }) 
    this.getData(this.data.requestAreaId, this.data.requestDate, this.data.id)
  },
 
  /**
   * 获取数据
   */
  getData: function (areaId, date, id) {


    var that = this
    var time = this.data.time
    var area = this.data.area
    var h = time.length
    var w = area.length

    // console.log('h',h)
    // console.log('w', w)
    var offsetH = h * that.data.blockH
    var offsetW = w * that.data.blockW
    var currentH = offsetH
    let currentW = offsetW

    /**
     * 设置最高高度
     */
    if (offsetH > this.data.max) {
      currentH = this.data.max
    }
    // else{
    //   currentH = offsetH + that.data.blockH  
    // }

    if (currentW > this.data.maxW) {
      currentW = this.data.maxW
    }
    // else{
    //   currentW = offsetW + that.data.blockW
    // }
    // console.log('currentH', currentH)
    // console.log('offsetH', offsetH)
    // console.log('offsetW', offsetW)
    let datePosition = 0
    // console.log('requestDate', that.data.requestDate)
    if (that.data.requestDate) {
      for (let i = 0; i < data.data.dateList.length; i++) {
        if (that.data.requestDate == data.data.dateList[i].value) {
          datePosition = i
          break
        }
      }
    }

    let disableRow = 0 //判断前几行不能选择 

    

    /**
     * 16 + 182
     */
    that.setData({
      contentX: 0,
      contentY: (that.data.blockH + 1) * disableRow * -1,
      offsetTop: 0,
      offsetLeft: 0,
      datePosition: datePosition,
      left: 0,
      top: 0,
      maxFieldLen:6,
      minFieldLen: 1,
      date: that.data.date,
      session: that.data.session, 
      area: that.data.area,
      time: that.data.time,
      obj: that.data.obj,
      offsetH: offsetH,
      offsetW: offsetW,
      currentH: currentH,
      currentW: currentW,
      list: [],
      price: 0,
    })

    if (!that.data.isFirstScroll) {
      let dateScrollX = 0
      if (that.data.screenW < datePosition * that.data.scrollItemW) {
        dateScrollX = datePosition * that.data.scrollItemW - that.data.scrollItemW * 3
      }
      // console.log(dateScrollX)
      that.setData({
        dateScrollX: dateScrollX,
        isFirstScroll: true
      })
    }

  },
  /**
   * rpx 转 px
   */
  rpx2px(rpx) {
    return rpx / 750 * wx.getSystemInfoSync().windowWidth;
  },
  /**
   * px 转 rpx
   */
  px2rpx(px) {
    // px = rpx / 750 * wx.getSystemInfoSync().windowWidth;
    return px * 750 / wx.getSystemInfoSync().windowWidth;
  }

})