// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      // value: {
      //   "color": "#D2D2D2",
      //   "selectedColor": "#FFC000",
      //   "backgroundColor": "#ffffff", 
      //   "list": [
      //     {
      //       "pagePath": "/pages/home/index",
      //       "iconPath": "/tabbar/shouye.png",
      //       "selectedIconPath": "/tabbar/shouye02.png",
      //       "text": "首页"
      //     },
      //     {
      //       "pagePath": "/pages/reserve/index",
      //       "iconPath": "/tabbar/yuding.png",
      //       "selectedIconPath": "/tabbar/yuding02.png",
      //       "text": "预定"
      //     },
      //     {
      //       "pagePath": "/pages/match/index",
      //       "iconPath": "/tabbar/bisai.png",
      //       "selectedIconPath": "/tabbar/bisai.png",
      //       "text": "比赛",
      //       "isSpecial": true
      //     },
      //     {
      //       "pagePath": "/pages/club/index",
      //       "iconPath": "/tabbar/julebu.png",
      //       "selectedIconPath": "/tabbar/julebu02.png",
      //       "text": "俱乐部"
      //     },
      //     {
      //       "pagePath": "/pages/my/index",
      //       "iconPath": "/tabbar/wode.png",
      //       "selectedIconPath": "/tabbar/wode02.png",
      //       "text": "我的"
      //     }
      //   ]
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes("iPhone X")
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
