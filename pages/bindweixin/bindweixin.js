import {
  config
} from '../../config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    Token: '',
    wxnum: '请输入微信号',
    phonenum: '',
    xianshi: false,
  },
  searchValueInput: function (e) {
    console.log(e.detail.value)
    var that = this
    var value = e.detail.value;
    // that.setData({
    //   lishi_Show: false,
    //   jieguo_show: true
    // })

    that.setData({
      searchValue: value,
    });
    // if (!value && that.data.productData.length == 0) {
    //   that.setData({
    //     centent_Show: false,
    //   });
    // }

  },
  bindphone: function () {
    var that = this
    // console.log(that.data.Token)
    var weixinnum = that.data.searchValue
    console.log(weixinnum)
    console.log(that.data.Token)
    if (weixinnum) {
      wx.request({
        url: config.api_base_url + 'Consultation/UpdateVx',
        method: 'post',
        data: {
          VXNumber: weixinnum
        },
        header: {
          'content-type': 'application/json',
          'Authorization': 'BasicAuth ' + that.data.Token
        },
        success: (res) => {
          if (res.data.Code == 0) {
            wx.showToast({
              title: '微信绑定成功',
              icon: 'none',
              duration: 2000,
            });
            setTimeout(()=>{
              wx.navigateBack()
            },2000)

          } else {
            wx.showToast({
              title: '未知错误，绑定失败',
              icon: 'none',
              duration: 2000
            });
            that.onLoad()
          }
        }
      })
    }
  },
  getUserInfo: function () {
    var that = this
    that.setData({
      xianshi: false
    })
    _getUserInfo();

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            theiv: res.iv,
            theencrypt: res.encryptedData
          })
          wx.login({
            success: function (res) {
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
                  wx.setStorage({
                    key: 'token',
                    data: res.data.Data,
                    success() {
                      wx.getStorage({
                        key: 'token',
                        success(res) {
                          console.log(res.data)
                          that.setData({
                            Token: res.data
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
                          console.log(that.data)
                        }
                      })
                    }
                  })


                }
              })

            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("11111111111")
    var that = this
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log(res)
        that.setData({
          Token: res.data,
          xianshi: false
        })
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
            console.log(that.data.wxnum)
          },

        })

      },
      fail(res) {
        console.log("Token获取失败")
        that.setData({
          xianshi: true
        })

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
    // wx.getStorage({
    //   key: 'token',
    //   success(res) {
    //     console.log("回到首页获取缓存成功")
    //     that.setData({
    //       Token: res.data
    //     })
    //   },
    // })
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

  }
})