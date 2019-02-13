import {
  config
} from '../../config.js'
Page({
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
    that._getUserInfo();
  },
  _getUserInfo:function() {
    var that=this
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
                          },
                        })
                        // console.log(that.data)
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
          success: function (res) { //此处应该添加判断，token过期的话能否有反馈。没有的话就清除缓存，重新获取并存储token
            console.log(res)
            that.setData({
              nickName: res.data.Data.NickName,
              avatarUrl: res.data.Data.headimgurl,
              wxnum: res.data.Data.VXNumber,
              phonenum: res.data.Data.Phone,
            })
          },
          fail:function(res){
            console.log("token过期")
            that.setData({
              xianshi: true
            })
          }
        })
      },
      fail(res) {
        console.log("取缓存失败")
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