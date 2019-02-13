import {
  config
} from '../../config.js'
// let http=new HTTP()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码',
    currentTime: 61,
    disabled: false,
    phone: '',
    yanzhengma: '',
    Token: '',
    xianshi: false,
    wxnum: '',
    phonenum: '请输入手机号',
  },
  //获取框内输入数据
  searchValueInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  //获取框内输入数据
  yanzhengmaInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      yanzhengma: e.detail.value
    })
  },
  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;
    wx.request({
      url: config.api_base_url + 'User/GetCode',
      method: 'post',
      data: {
        phone: that.data.phone
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'BasicAuth ' + that.data.Token
      },
      success: (res) => {
        if (res.data.Code == 0) {
          console.log('验证码发送成功')
        } else {
          console.log('验证码发送失败')
        }
      }
    })

    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#F8F8F8',
    })
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号码格式不正确";
    } else {
      //当手机号正确的时候提示用户短信验证码已经发送
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + 's', //按钮文字变成倒计时对应秒数
        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#F8F8F8'
          })
        }
      }, 1000);
    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        showCancel: false,
      confirmColor: '#8DA5FF',
        title: '提示',
        content: warn
      })
      that.setData({
        disabled: false,
        color: '#F8F8F8'
      })
      return;
    };
  },
  //点击提交
  bindphone: function () {
    var that = this
    if (that.data.Token) {
      console.log(that.data.yanzhengma)
      if (that.data.phone == '') {
        wx.showModal({
          showCancel: false,
          confirmColor: '#8DA5FF',
          title: '提示',
          content: '手机号码不能为空'
        })
      } else {
        wx.request({
          url: config.api_base_url + 'User/BindPhone',
          method: 'post',
          data: {
            phone: that.data.phone,
            code: that.data.yanzhengma
          },
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + that.data.Token
          },
          success: (res) => {
            console.log(res)
            if (res.data.Code == 0) {
              wx.showToast({
                title: '绑定手机号码成功',
                icon: 'none',
                duration: 2000
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
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '请返回个人中心获取微信授权后再绑定',
        icon: 'none',
        duration: 2000
      });
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