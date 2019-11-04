//app.js

const baseURL = 'https://fragmenttime.com:8081/api/';

App({
  //全局变量
  globalData: {
    openId: "",
    latitude: "",
    longitude: "",
    clubId: null
  },
  // 请求封装
  yc_request: function(method, url, data, sufuncton, errofunction) {
    let header = {
      'Content-Type': 'application/json',
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: header,
      success(res) {
        //请求成功
        if (res.data.status == 200) {
          sufuncton(res);
        } else {
          //其他异常
          reject('请求错误,请稍后再试');
        }
      },
      fail(err) {
        //请求失败
        errofunction(err);
      }
    })
  },

  onLaunch: function(options) {
    //隐藏系统tabbar
    this.hidetabbar();
    //获取设备信息
    this.getSystemInfo();
  },

  onShow: function() {
    wx.hideTabBar();

  },

  //封装wx.hideTabBar
  hidetabbar() {
    wx.hideTabBar({
      fail: function() {
        setTimeout(function() { // 延时保底
          wx.hideTabBar()
        }, 500)
      }
    });
  },

  getSystemInfo: function() {
    let t = this;
    wx.getSystemInfo({
      success: function(res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  // 显示tabbar
  editTabbar: function() {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    systemInfo: null, //客户端设备信息
    tabBar: {
      "color": "#D2D2D2",
      "selectedColor": "#FFC000",
      "backgroundColor": "#ffffff",
      "list": [
        // {
        //   "pagePath": "/pages/home/index",
        //   "iconPath": "/images/tabbar/shouye.png",
        //   "selectedIconPath": "/images/tabbar/shouye02.png",
        //   "text": "首页"
        // },

        {
          "pagePath": "/pages/match/index",
          "iconPath": "/images/tabbar/shouye.png",
          "selectedIconPath": "/images/tabbar/shouye02.png",
          "text": "比赛",
          "isSpecial": true
        },
        {
          "pagePath": "/pages/reserve/index",
          "iconPath": "/images/tabbar/yuding.png",
          "selectedIconPath": "/images/tabbar/yuding02.png",
          "text": "预定"
        },
        {
          "pagePath": "/pages/club/index",
          "iconPath": "/images/tabbar/julebu.png",
          "selectedIconPath": "/images/tabbar/julebu02.png",
          "text": "俱乐部"
        },
        {
          "pagePath": "/pages/my/index",
          "iconPath": "/images/tabbar/wode.png",
          "selectedIconPath": "/images/tabbar/wode02.png",
          "text": "我的"
        }
      ]
    }
  },

})