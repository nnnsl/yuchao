// pages/club/index.js
import Dialog from '../../dist/dialog/dialog';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mymeg: '',
    person_num: '',
    url_show: true,
    club_text: '退出',
    club_meg: '',
    tabbar: {},
    joinStateus: '',
    clubId: '',
    avatarUrl_club: '',
    man: '',
    women: ''
  },
  // 退出俱乐部
  quit() {
    var that = this;
    if (that.data.club_text == '退出') {
      Dialog.confirm({
        title: '警告',
        message: '若退出则本俱乐部贡献会清零，确定退出？'
      }).then(() => {
        // on confirm 
        app.yc_request('POST', 'client/ClubApplyApi/exit', {
          clubId: that.data.joinStateus,
          openId: app.globalData.openId
        }, function(datas) {
          wx.showToast({
            title: '退出成功',
          })
          that.onLoad();
        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });
      }).catch(() => {
        // on cancel
      });
    } else {
      Dialog.confirm({
        title: '警告',
        message: '若解散则俱乐部将删除，确定解散？'
      }).then(() => {
        // on confirm 
        app.yc_request('POST', 'client/ClubApplyApi/Disband', {
          clubId: that.data.joinStateus,
          openId: app.globalData.openId
        }, function(datas) {
          wx.showToast({
            title: '解散成功',
          })
          that.onLoad();
        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });
      }).catch(() => {
        // on cancel
      });
    }

  },
  // 判断是否团长
  team_game: function() {
    var that = this;
    app.yc_request('GET', 'client/ClubApi/' + app.globalData.openId, null, function(datas) {
      // debugger;
      if (datas.data.obj) {
        wx.navigateTo({
          url: '/pages/group-match/index',
        })
      } else {
        that.nextBtn();
      }
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    })

  },
  //弹窗——显示按钮
  nextBtn() {
    // debugger;
    var me = this;
    var clubId = app.globalData.clubId;
    console.log(clubId)
    if (clubId == 0) {
      Dialog.confirm({
        title: '提示',
        message: '您还没有加入俱乐部，确定加入其它俱乐部吗？'
      }).then(() => {
        // on confirm
        wx.switchTab({
          url: '/pages/club/index',
        })
      }).catch(() => {
        // on cancel
        console.log('取消')
      });
    } else {
      Dialog.alert({
        title: '提示',
        message: '团体赛只有团长才能申请哦！可以联系你的团长进行申请~'
      }).then(() => {
        // on close
      });
    }
  },


  // 未加入
  // 跳转到创建俱乐部
  create_club() {
    wx.navigateTo({
      url: '/pages/create-club/index',
    })
  },
  // 跳转到加入俱乐部页面
  join_club() {
    wx.navigateTo({
      url: '/pages/join-club/index',
    })
  },


  // 已加入

  // 成员列表
  member_list() {
    wx.navigateTo({
      url: '/pages/member-list/index',
    })
  },
  // 战绩列表
  record_list() {
    wx.navigateTo({
      url: '/pages/record-list/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar();

    var that = this;
    // 判断是否加入俱乐部 显示不同tabbar页面
    app.yc_request('GET', 'client/UserApi/' + app.globalData.openId, {}, function(datas) {

      if (datas.data.obj.clubId == 0) {
        that.setData({
          mymeg: datas.data.obj,
          joinStateus: datas.data.obj.clubId,
        })
      } else {
        var usermsg = datas.data.obj;
        app.globalData.clubId = usermsg.clubId;
        that.setData({
          joinStateus: datas.data.obj.clubId,
        })

        // 已加入就获取俱乐部成员的信息
        app.yc_request('GET', 'client/ClubMsgApi/' + that.data.joinStateus, {}, function(datas) {
          var allMsg = datas.data.obj;
          that.setData({
            person_num: allMsg[1].length
          });
          var map = {},
            dest = [];
          for (var i = 0; i < allMsg[1].length; i++) {
            var ai = allMsg[1][i];
            if (!map[ai.gender]) {
              dest.push({
                gender: ai.gender,
                data: [ai]
              });
              map[ai.gender] = ai;
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.gender == ai.gender) {
                  dj.data.push(ai);
                  break;
                }
              }
            }
          }
          if (dest[1] != undefined) {
            that.setData({
              man: dest[0].data,
              woman: dest[1].data
            })
          } else {
            that.setData({
              man: dest[0].data,
              woman: ''
            })
          }

        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });
        // 已加入就获取俱乐部的信息
        app.yc_request('POST', 'client/ClubApi/' + that.data.joinStateus, {}, function(datas) {
          var allMsg = datas.data.obj;
          that.setData({
            avatarUrl_club: allMsg.clubLogo
          });
          if (app.globalData.openId === allMsg.openId) {
            that.setData({
              club_text: '解散',
              url_show: false
            });
          }
          that.setData({
            club_meg: allMsg
          })
        }, function(erro) {
          wx.showToast({
            title: '网络走神了！',
          })
        });

      }
    }, function(erro) {
      wx.showToast({
        title: '网络走神了！',
      })
    });


  },
  //弹窗——确认事件
  yes() {
    this.show_dialog.hidePopup();
  },
  //弹窗——确认事件
  no() {
    this.show_dialog.hidePopup();
  },
  onPullDownRefresh: function() {
    console.log("!@121");
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
    app.hidetabbar();

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