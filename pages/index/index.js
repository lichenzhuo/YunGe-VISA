//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    tabswitch:[{
      "tabname":'热门',
      "select":'one'
    },{
      "tabname":'亚洲',
      "select":'two'
    },{
      "tabname":'美洲',
      "select":'three'
    },{
      "tabname":'欧洲',
      "select":'four'
    },{
      "tabname":'非洲',
      "select":'five'
    },{
      "tabname":'大洋洲',
      "select":'six'
    }],
    catalogSelect:'one',
  },
  tabclick:function(e){
    // console.log(e)
    this.setData({
      catalogSelect:e.currentTarget.dataset.select
    })
  },
  //事件处理函数
  gotocountrylist:function () {
    // 跳转国家列表页面
    wx.navigateTo({
      url: '../countrylist/countrylist',
    })
  },
  gotodetails:function(){
    wx.navigateTo({
      url: '../details/details',
    })
  },
  onLoad: function () {   //请求数据在这里
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
