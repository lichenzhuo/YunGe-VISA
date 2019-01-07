import {
  config
} from '../../config.js'
// let http=new HTTP()
const img_base_url = 'http://192.168.1.102:907'
const appsecret = 'c6a2e0b2bfcd78c151d631d271e76980'
const Appid = 'wx2905c9c6d412246c'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    wxnum: '',
    phonenum: '',
    xianshi: false,
    Token: '',
    codema: '',
    theiv: '',
    theencrypt: '',

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
  bindweixin: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../bindweixin/bindweixin',
    })
  },
  bindphone: function () {
    wx.navigateTo({
      url: '../bindphone/bindphone',
    })
  },

  onLoad: function (options) {
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
          }
        })
      },
      fail(res) {
        console.log(res)
        that.setData({
          xianshi:true
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
    this.onLoad()
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