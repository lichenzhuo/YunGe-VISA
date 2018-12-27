//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    tabswitch:[{
      "tabname":'热门',
      "select":'0',
      "scrollTop":300,
      "id":0
    },{
      "tabname":'亚洲',
        "select": '1',
         "scrollTop": 820,
        "id": 1
    },{
      "tabname":'美洲',
      "select":'2',
        "scrollTop": 1010,
        "id": 2
    },{
      "tabname":'欧洲',
      "select":'3',
        "scrollTop": 1200,
        "id": 3
    },{
      "tabname":'非洲',
      "select":'4',
        "scrollTop": 1390,
        "id": 4
    },{
      "tabname":'大洋洲',
      "select":'5',
        "scrollTop": 1580,
        "id": 5
    }],
    catalogSelect:'one',
  },
  tabclick:function(e){
   
    var scrollid = e.currentTarget.id
    var that=this
    // console.log(e)
    // console.log(scrollid)
    this.setData({
      catalogSelect:e.currentTarget.dataset.select
      
    })
    // console.log(that.data.tabswitch[scrollid].scrollTop)
    if (scrollid){
      wx.pageScrollTo({
        scrollTop: that.data.tabswitch[scrollid].scrollTop,
        duration: 300
      })
    } 
    // else{
    //   wx.pageScrollTo({
    //     scrollTop: 1400,
    //     duration: 300
    //   })
    // }
  },
  // tapqqq:function(e){   //测试
  //   // console.log(e)
  // },
  //事件处理函数
  gotoproblemlist:function(){
    wx.navigateTo({
      url:'../problemlist/problemlist'
    })
  },
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
  //    ----------------------------------------------------------测试跳转
  onPageScroll:function(e){ // 获取滚动条当前位置
    // console.log(e)
    //  console.log(e.scrollTop)//获取滚动条当前位置的值
},

// goTop: function (e) {  // 一键回到顶部
//  if (wx.pageScrollTo) {//判断这个方法是否可用
//     wx.pageScrollTo({
//       scrollTop: 0
//     })
//   } else {
//     wx.showModal({
//       title: '提示',
//       content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
//     })
//   }
// }, 
  //    ----------------------------------------------------------测试跳转

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
