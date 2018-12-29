//index.js
//获取应用实例
// import{HTTP} from '../../http.js'
import {
  config
} from '../../config.js'
// let http=new HTTP()
const img_base_url = 'http://192.168.1.102:907'
Page({
  data: {
    img_base_url: 'http://192.168.1.102:907',
    hotdata: [],
    asiadata: [],
    americadata: [],
    europedata: [],
    afrivcadata: [],
    oceaniadata: [],

    tabswitch: [{
      "tabname": '热门',
      "select": '0',
      "scrollTop": 300,
      "id": 0
    }, {
      "tabname": '亚洲',
      "select": '1',
      "scrollTop": 820,
      "id": 1
    }, {
      "tabname": '美洲',
      "select": '2',
      "scrollTop": 1010,
      "id": 2
    }, {
      "tabname": '欧洲',
      "select": '3',
      "scrollTop": 1200,
      "id": 3
    }, {
      "tabname": '非洲',
      "select": '4',
      "scrollTop": 1390,
      "id": 4
    }, {
      "tabname": '大洋洲',
      "select": '5',
      "scrollTop": 1580,
      "id": 5
    }],
    catalogSelect: 'one',
    ret: [],
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  tabclick: function (e) {

    var scrollid = e.currentTarget.id
    var that = this
    // console.log(e)
    // console.log(scrollid)
    this.setData({
      catalogSelect: e.currentTarget.dataset.select

    })
    // console.log(that.data.tabswitch[scrollid].scrollTop)
    if (scrollid) {
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

  //事件处理函数
  gotoproblemlist: function () {
    wx.navigateTo({
      url: '../problemlist/problemlist'
    })
  },
  gotocountrylist: function () {
    // 跳转国家列表页面
    wx.navigateTo({
      url: '../countrylist/countrylist',
    })
  },
  gotodetails: function () {
    wx.navigateTo({
      url: '../details/details',
    })
  },
  //    ----------------------------------------------------------测试跳转
  onPageScroll: function (e) { // 获取滚动条当前位置
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

  onLoad: function () { //请求数据在这里
    wx.request({
      url: config.api_base_url + 'Index/GetHomeData',
      method: 'post',
      success: (res) => {
        console.log(res.data.Data)
        // console.log(res.data.Data.Hot)
        console.log(res.data.Data.Afrivca)
        var thisHot = res.data.Data.Hot
        var thisAfrivca = res.data.Data.Hot.Afrivca
        var thiAmerica = res.data.Data.Hot.America
        var thiAsia = res.data.Data.Hot.Asia
        var thiEurope = res.data.Data.Hot.Europe
        var thiOceania = res.data.Data.Hot.Oceania
        // console.log(res.data.Data.Hot)
        // // console.log(hot)
        // var newarr = [thisHot, thisAfrivca, thiAmerica, thiAsia, thiEurope, thiOceania]
        //  for (var i = 0; i <newarr.length; i++) {
        //   //  console.log(newarr.length)
        //    for (var j = 0; j <newarr[i].length; j++) {
        //      console.log(newarr[i].length)
        //      newarr[i][j].HomeImage = img_base_url + newarr[i][j].HomeImage.replace(/\\/g, "\/")
        //      newarr[i][j].HotImage = img_base_url + newarr[i][j].HotImage.replace(/\\/g, "\/")
        //    }
        //  }
        for (var a = 0; a < thisHot.length; a++) {
          res.data.Data.Hot[a].HotImage = img_base_url + thisHot[a].HotImage.replace(/\\/g, "\/")
        };
        // for (var b = 0; b < thisAfrivca.length; b++) {
        //   res.data.Data.Afrivca[b].HomeImage = img_base_url + thisAfrivca[b].HomeImage.replace(/\\/g, "\/")
        // };
        // for (var b = 0; b < thisAfrivca.length; b++) {
        //   res.data.Data.Afrivca[a].HomeImage = img_base_url + thisAfrivca[a].HomeImage.replace(/\\/g, "\/")
        // };
        // for (var a = 0; a < Afrivca.length; a++) {
        //   res.data.Data.Afrivca[i].HomeImage = img_base_url + Afrivca[i].HomeImage.replace(/\\/g, "\/")
        // }
        this.setData({
          hotdata: res.data.Data.Hot,
          asiadata: res.data.Data.Asia,
          americadata: res.data.Data.America,
          europedata: res.data.Data.Europe,
          afrivcadata: res.data.Data.Afrivca,
          oceaniadata: res.data.Data.Oceania,

        })
      }
    })

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})