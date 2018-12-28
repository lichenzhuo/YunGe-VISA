//index.js
//获取应用实例
// import{HTTP} from '../../http.js'
import {
  config
} from '../../config.js'
// let http=new HTTP()
Page({
  data: {
    hotdata: [],
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
  },
  tabclick: function(e) {

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
  // tapqqq:function(e){   //测试
  //   // console.log(e)
  // },
  //事件处理函数
  gotoproblemlist: function() {
    wx.navigateTo({
      url: '../problemlist/problemlist'
    })
  },
  gotocountrylist: function() {
    // 跳转国家列表页面
    wx.navigateTo({
      url: '../countrylist/countrylist',
    })
  },
  gotodetails: function() {
    wx.navigateTo({
      url: '../details/details',
    })
  },
  //    ----------------------------------------------------------测试跳转
  onPageScroll: function(e) { // 获取滚动条当前位置
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

  onLoad: function() { //请求数据在这里
    // http.request({
    //   url:'Index/GetHomeData',
    //   method:"POST",
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })


    wx.request({
      url: config.api_base_url + 'Index/GetHomeData',
      method: 'post',
      success: (res) => {
        // console.log(http://192.168.1.102:804+hotdata)
        console.log(res.data.Data.Hot[0].HotImage)
        var str = res.data.Data.Hot[0].HotImage
        // '\Uploads\hot\泰国.jpg'.replace(new RegExp('\''g'),' / '))
        // console.log(res.data.Data.Hot[0].HotImage.replace(new RegExp('\''g'),'/')))
        // console.log(str.toString().replace(/\/g, '/'))
        // console.log(str.toString().replace(new RegExp(\,'g'),"/"))


        console.log(JSON.stringify(str).replace("\\","/")) 


        // let newarr = [_this.HotCountry, _this.AsiaCountry, _this.AmericaCountry, _this.EuropeCountry, _this.AfrivcaCountry, _this.OceaniaCountry]
        // for (let i = 0; i < newarr.length; i++) {
        //   // console.log(1)
        //   for (let j = 0; j < newarr[i].length; j++) {
        //     newarr[i][j].HomeImage = _this.imgUel + newarr[i][j].HomeImage
        //     newarr[i][j].HotImage = _this.imgUel + newarr[i][j].HotImage
        //   }
        // }


        // console.log(hotdata)
        this.setData({
          hotdata: res.data.Data.Hot
        })
      }
    })
    // this.setData({
    //   hotdatakey:hotdata
    // })

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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})