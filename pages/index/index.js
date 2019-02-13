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
    currentTargetname: '',
    systemInfo: {}, //手机是ios还是安卓
    durationtime: 300, //ios滑动时间300，安卓就变成0
    // itemlist:['微信咨询', '手机号咨询'],//点击咨询出来的选项，安卓增加取消选项
    showModal1: false,
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
    // console.log(scrollid)
    this.setData({
      catalogSelect: e.currentTarget.dataset.select

    })
    // console.log(that.data.tabswitch[scrollid].scrollTop)
    
    if (scrollid == 0) {
      wx.pageScrollTo({
        scrollTop: 280,
        duration: that.data.durationtime
      })
    } else if (scrollid == 1) {
      wx.pageScrollTo({
        scrollTop: 700,
        duration: that.data.durationtime
      })
    } else if (scrollid == 2) {
      wx.pageScrollTo({
        scrollTop: 900,
        duration: that.data.durationtime
      })
    } else if (scrollid == 3) {
      wx.pageScrollTo({
        scrollTop: 1094,
        duration: that.data.durationtime
      })
    } else if (scrollid == 4) {
      wx.pageScrollTo({
        scrollTop: 1288,
        duration: that.data.durationtime
      })
    } else if (scrollid == 5) {
      wx.pageScrollTo({
        scrollTop: 1400,
        duration: that.data.durationtime
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
  getUserInfo: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.name)
    that.setData({
      currentTargetname: e.currentTarget.dataset.name
    })
    // console.log()
    // that.setData({
    //   xianshi: false
    // })
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log("获取缓存token成功")
        console.log(res)
        that.setData({
          Token: res.data
        })
        wx.request({
          url: config.api_base_url + 'User/GetUserInfo',
          method: 'post',
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + that.data.Token
          },
          success: function (res) {
            console.log("获取用户数据成功")
            console.log(res)
            that.setData({
              nickName: res.data.Data.NickName,
              avatarUrl: res.data.Data.headimgurl,
              wxnum: res.data.Data.VXNumber,
              phonenum: res.data.Data.Phone,
            })
            wx.getSystemInfo({
              
            }),
            that.setData({
              showModal1: true
            })
          },
          fail: function (res) {
            that._getUserInfo();
          }
        })
      },
      fail(res) {
        that._getUserInfo();
      }
    })



  },
  _getUserInfo: function (e) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        console.log("获取iv加密数据成功")
        console.log(res.iv)
        console.log(res.encryptedData)
        that.setData({
          theiv: res.iv,
          theencrypt: res.encryptedData
        })
        wx.login({
          success: function (res) {
            console.log("获取code成功")
            console.log(res.code)
            that.setData({
              codema: res.code
            })
            wx.request({
              url: config.api_base_url + 'User/GetSmallUserToken',
              method: 'get',
              data: {
                code: that.data.codema,
                iv: that.data.theiv,
                encryptedData: that.data.theencrypt
              },
              success: function (res) {
                console.log("获取token成功11111")
                console.log(res)
                wx.removeStorage({
                  key: 'token',
                  success(res) {
                    console.log("token缓存清理成功")
                  }
                })
                wx.setStorage({
                  key: 'token',
                  data: res.data.Data,
                  success() {
                    console.log("缓存token成功")
                    wx.getStorage({
                      key: 'token',
                      success(res) {
                        console.log("获取缓存token成功")
                        console.log(res)
                        that.setData({
                          Token: res.data
                        })
                        console.log(that.data.Token + "这是data中的token")
                        // if(that.data.)
                        wx.request({
                          url: config.api_base_url + 'User/GetUserInfo',
                          method: 'post',
                          header: {
                            'content-type': 'application/json',
                            'Authorization': 'BasicAuth ' + that.data.Token
                          },
                          success: function (res) {
                            console.log("获取用户数据成功")
                            console.log(res)
                            that.setData({
                              nickName: res.data.Data.NickName,
                              avatarUrl: res.data.Data.headimgurl,
                              wxnum: res.data.Data.VXNumber,
                              phonenum: res.data.Data.Phone,
                            })
                            that.setData({
                              showModal1:true
                            })
        
                          },

                        })
                        // console.log(that.data)
                      }
                    })
                  }
                })


              }
            })

          },

        })
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '未授权无法使用此功能',
          icon: 'none',
          duration: 3000
        });
      }
    })
  },
  //事件处理函数
  searchcountry: function () {       //搜索国家、地区
    wx.navigateTo({
      url: '../searchcountry/searchcountry'
    })
  },
  thisproblemdetail: function (e) {         //常见问题轮播点击事件
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../problemdetail/problemdetail?id=' + e.currentTarget.dataset.id + '&index=' + e.currentTarget.dataset.index
    })
  },
  gotoproblemlist: function () {         //常见问题列表
    wx.navigateTo({
      url: '../problemlist/problemlist'
    })
  },
  //跳转详情页面
  gotodetails:function(e){
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
      url: "../details/details?id="+e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  } 
  ,
  // 跳转国家列表页面
  gotocountrylist: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: "../countrylist/countrylist?listid="+e.currentTarget.dataset.index,
    })
  },
//----------------------页面加载，初始请求
  onLoad: function () { 

    wx.request({
        url: config.api_base_url + 'Index/GetHomeData',
        method: 'post',
        success: (res) => {
          let newarr = [res.data.Data.Hot, res.data.Data.Asia, res.data.Data.America, res.data.Data.Europe, res.data.Data.Afrivca, res.data.Data.Oceania, ]
          for (let i = 0; i < newarr.length; i++) {
            for (let j = 0; j < newarr[i].length; j++) {
              //  console.log(newarr[i].length)
              newarr[i][j].HomeImage =config.img_base_url + newarr[i][j].HomeImage.replace(/\\/g, "\/")
              newarr[i][j].HotImage =config.img_base_url + newarr[i][j].HotImage.replace(/\\/g, "\/")
            }
          }
          console.log(newarr,'这是newarr')
          this.setData({
            hotdata: newarr[0],
            asiadata: newarr[1],
            americadata: newarr[2],
            europedata: newarr[3],
            afrivcadata: newarr[4],
            oceaniadata: newarr[5],

          })
          console.log(this.data.hotdata,'这是hotdata')
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
        })
        if (res.platform == "devtools") {

        } else if (res.platform == "ios") {
          IOS
        } else if (res.platform == "android") {
          that.setData({
            durationtime:0,
            // itemlist: ['微信咨询', '手机号咨询','取消'],
          })
        }
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
    this.onLoad()
    wx.showToast({
      title: "loading",
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.stopPullDownRefresh()
      }
    })
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

  },
  btnclick: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    if (e.currentTarget.id == 'btn1') {
      if (that.data.Token) { //判断是否有token
        if (that.data.wxnum == '') { //绑定信息中是否有微信号
          console.log("没有微信")
          wx.navigateTo({
            url: '../bindweixin/bindweixin', //绑定信息没有微信号，去微信绑定
          })
        } else { //绑定信息有微信号，发送请求
          console.log(that.data.wxnum)
          wx.request({
            url: config.api_base_url + 'Consultation/Save',
            method: 'post',
            data: {
              //微信咨询传的值
              ContactType: 1,
              Name: that.data.currentTargetname
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
              } else {}
            },
          })
        }
      } else {
        wx.navigateTo({
          url: '../bindweixin/bindweixin', //没有token，提示绑定微信和微信号码
        })
      }
      that.setData({
        showModal1: false
      })
    } else if (e.currentTarget.id == 'btn2') {
      if (that.data.Token) {
        if (that.data.phonenum == '') {
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
              Name: that.data.currentTargetname
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
              } else {

              }
            }
          })
        }
      } else {
        wx.navigateTo({
          url: '../bindphone/bindphone',
        })
      }
      that.setData({
        showModal1: false
      })
    } else {
      that.setData({
        showModal1: false
      })
    }
  },
  cancle1:function(){
    this.setData({
      showModal1:false
    })
  }
})