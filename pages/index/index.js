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
    problemlunbo: [],
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
    catalogSelect: '0',
    fixedsel: false,
    ret: [],
    Token: '',
    phonenum: '',
    wxnum: '',
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
  gotoselfcenter: function (e) {
    wx.navigateTo({
      url: '../selfcenter/selfcenter'
    })
  },
  tabclick: function (e) {

    var scrollid = e.currentTarget.id
    var that = this
    //  console.log(e)
    console.log(scrollid)
    this.setData({
      catalogSelect: e.currentTarget.dataset.select

    })
    // console.log(that.data.tabswitch[scrollid].scrollTop)
    if (scrollid == 0) {
      wx.pageScrollTo({
        scrollTop: 280,
        duration: 300
      })
    } else if (scrollid == 1) {
      wx.pageScrollTo({
        scrollTop: 700,
        duration: 300
      })
    } else if (scrollid == 2) {
      wx.pageScrollTo({
        scrollTop: 900,
        duration: 300
      })
    } else if (scrollid == 3) {
      wx.pageScrollTo({
        scrollTop: 1094,
        duration: 300
      })
    } else if (scrollid == 4) {
      wx.pageScrollTo({
        scrollTop: 1288,
        duration: 300
      })
    } else if (scrollid == 5) {
      wx.pageScrollTo({
        scrollTop: 1400,
        duration: 300
      })
    }
  },
  onPageScroll: function (e) { // 获取滚动条当前位置
    // console.log(e)
    if (e.scrollTop >= 280 && e.scrollTop < 700) {
      this.setData({
        fixedsel: true,
        catalogSelect: '0'
      })
    } else if (e.scrollTop >= 700 && e.scrollTop < 900) {
      this.setData({
        fixedsel: true,
        catalogSelect: '1'
      })
    } else if (e.scrollTop >= 900 && e.scrollTop < 1094) {
      this.setData({
        fixedsel: true,
        catalogSelect: '2'
      })
    } else if (e.scrollTop >= 1094 && e.scrollTop < 1288) {
      this.setData({
        fixedsel: true,
        catalogSelect: '3'
      })
    } else if (e.scrollTop >= 1288 && e.scrollTop < 1400) {
      this.setData({
        fixedsel: true,
        catalogSelect: '4'
      })
    } else if (e.scrollTop >= 1400 && e.scrollTop < 1500) {
      this.setData({
        fixedsel: true,
        catalogSelect: '5'
      })
    } else {
      this.setData({
        fixedsel: false
      })
    }
    // console.log(e.scrollTop) //获取滚动条当前位置的值
  },
  //事件处理函数
  searchcountry: function () {
    wx.navigateTo({
      url: '../searchcountry/searchcountry'
    })
  },
  thisproblemdetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../problemdetail/problemdetail?id=' + e.currentTarget.dataset.id
    })
  },
  gotoproblemlist: function () {
    wx.navigateTo({
      url: '../problemlist/problemlist'
    })
  }, // 跳转国家列表页面
  gotocountrylistasia: function () {
    wx.navigateTo({
      url: "../countrylist/countrylist?listid=1",
    })
  },
  gotocountrylistamerica: function () {
    wx.navigateTo({
      url: "../countrylist/countrylist?listid=2",
    })
  },
  gotocountrylisteurope: function () {
    wx.navigateTo({
      url: "../countrylist/countrylist?listid=3",
    })
  },
  gotocountrylistafrica: function () {
    wx.navigateTo({
      url: "../countrylist/countrylist?listid=4",
    })
  },
  gotocountrylistoceania: function () {
    wx.navigateTo({
      url: "../countrylist/countrylist?listid=5",
    })
  },
  gotodetails: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  //    ----------------------------------------------------------测试跳转
  zixuncountry: function (e) {
    console.log(this.data.Token)
    var that = this
    console.log(e.currentTarget.dataset.name) //国家名称
    wx.getSetting({
      success(res) {
        console.log(res)
        // console.log(typeof (res.authSetting))
        var data = res.authSetting;
        var arr = Object.keys(data);
        if (arr.length == 0) {
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
          console.log("false") //返回空数组、未授权
          wx.navigateTo({
            url: '../selfcenter/selfcenter',
          })
        } else {
          console.log("true") //返回数组不为空，已经授权
          wx.showActionSheet({ //显示咨询选项
            itemList: ['微信咨询', '手机号咨询'],
            success(res) {

              // console.log(res.tapIndex)
              if (res.tapIndex == 0) { //点击的是微信咨询
                if (that.data.Token) { //判断是否有token
                  if (that.data.wxnum = '') { //绑定信息中是否有微信号
                    wx.navigateTo({
                      url: '../bindweixin/bindweixin', //绑定信息没有微信号，去微信绑定
                    })
                  } else { //绑定信息有微信号，发送请求
                    wx.request({
                      url: config.api_base_url + 'Consultation/Save',
                      method: 'post',
                      data: {
                        //微信咨询传的值
                        ContactType: 1,
                        Name: e.currentTarget.dataset.name
                      },
                      header: {
                        'content-type': 'application/json',
                        'Authorization': 'BasicAuth ' + that.data.Token
                      },
                      success: (res) => {
                        // console.log(res)
                        if (res.data.Code == 0) {
                          wx.showToast({
                            title: '我们将会在24小时之内联系您',
                            icon: 'none',
                            duration: 2000
                          });
                        } else {
                          // wx.request({
                          //   url: config.api_base_url + 'User / GetToken',//openid
                          //   success: (res) =>{
                          //     console.log(res)
                          //   }
                          // })


                        }

                      },

                    })
                  }
                } else {
                  wx.navigateTo({
                    url: '../bindweixin/bindweixin', //没有token，提示绑定微信和微信号码
                  })
                }
              } else {
                if (that.data.Token) {
                  if (that.data.phonenum = '') {
                    wx.navigateTo({
                      url: '../bindphone/bindphone',
                    })
                  } else {
                    wx.request({
                      url: config.api_base_url + 'Consultation/Save',
                      method: 'post',
                      data: {
                        //微信咨询传的值
                        ContactType: 2,
                        Name: e.currentTarget.dataset.name
                      },
                      header: {
                        'content-type': 'application/json',
                        'Authorization': 'BasicAuth ' + that.data.Token
                      },
                      success: (res) => {
                        console.log(res)
                        if (res.data.Code == 0) {
                          wx.showToast({
                            title: '我们将会在24小时之内联系您',
                            icon: 'none',
                            duration: 2000
                          });
                        } else { //有token，有手机号但是获取不到，token过期
                          wx.showToast({
                            title: '未知错误，发送失败',
                            icon: 'none',
                            duration: 2000
                          });
                        }

                      }
                    })
                  }
                } else {
                  wx.navigateTo({
                    url: '../bindphone/bindphone',
                  })
                }
              }

            },
          })
        }
      }
    })

  },
  onLoad: function () { //请求数据在这里

    wx.request({
        url: config.api_base_url + 'Index/GetHomeData',
        method: 'post',
        success: (res) => {
          var thisHot = res.data.Data.Hot
          var thisAfrivca = res.data.Data.Hot.Afrivca
          var thiAmerica = res.data.Data.Hot.America
          var thiAsia = res.data.Data.Hot.Asia
          var thiEurope = res.data.Data.Hot.Europe
          var thiOceania = res.data.Data.Hot.Oceania


          // for (var a = 0; a < thisHot.length; a++) {
          //   res.data.Data.Hot[a].HotImage = img_base_url + thisHot[a].HotImage.replace(/\\/g, "\/")
          // };


          let newarr = [res.data.Data.Hot, res.data.Data.Asia, res.data.Data.America, res.data.Data.Europe, res.data.Data.Afrivca, res.data.Data.Oceania, ]
          for (let i = 0; i < newarr.length; i++) {
            for (let j = 0; j < newarr[i].length; j++) {
              //  console.log(newarr[i].length)
              newarr[i][j].HomeImage = img_base_url + newarr[i][j].HomeImage.replace(/\\/g, "\/")
              newarr[i][j].HotImage = img_base_url + newarr[i][j].HotImage.replace(/\\/g, "\/")
            }
          }
          this.setData({
            hotdata: newarr[0],
            asiadata: newarr[1],
            americadata: newarr[2],
            europedata: newarr[3],
            afrivcadata: newarr[4],
            oceaniadata: newarr[5],

          })
          // console.log(this.data.hotdata)
        }
      }),
      wx.request({
        url: config.api_base_url + 'Index/GetFAQsList',
        method: 'post',
        data: {
          Grate: 1
        },
        success: (res1) => {
          // console.log(res1.data.Data)
          this.setData({
            problemlunbo: res1.data.Data
          })
        }
      })
    var that = this
    console.log("进入取缓存步骤")
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log("取缓存成功")
        console.log(res)
        if (res.data) {
          that.setData({
            Token: res.data,
          })
          console.log(that.data.Token)
          wx.request({
            url: config.api_base_url + 'User/GetUserInfo',
            method: 'post',
            header: {
              'content-type': 'application/json',
              'Authorization': 'BasicAuth ' + that.data.Token
            },
            success: function (res) {

              console.log(res)
              that.setData({
                nickName: res.data.Data.NickName,
                avatarUrl: res.data.Data.headimgurl,
                wxnum: res.data.Data.VXNumber,
                phonenum: res.data.Data.Phone,
              })
            },

          })
        } else {
          console.log("token可能过期")
          wx.removeStorage({
            key: 'token',
            success(res) {
              console.log("清缓存成功")
            }
          })
        }

      },
      fail(res) {
        console.log("取缓存失败")
        wx.clearStorage()

        console.log("所有缓存消失")

      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'token',
      success(res) {
         console.log("回到首页获取缓存成功")
        that.setData({
          Token: res.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})