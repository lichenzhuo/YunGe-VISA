import {
  config
} from '../../config.js'
// let http=new HTTP()
const img_base_url = 'http://192.168.1.102:907'
const appsecret = 'c6a2e0b2bfcd78c151d631d271e76980'
const Appid = 'wx2905c9c6d412246c'
Page({
  data: {
    codema: '',
    theiv: '',
    theencrypt: '',
    token:''
  },
  getUserInfo: function () {
    var that = this
    _getUserInfo();

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          // console.log(res.iv)

          // console.log(res.encryptedData)
          that.setData({
            theiv: res.iv,
            theencrypt: res.encryptedData
          })
          wx.login({
            success: function (res) {
              // console.log(res.code)
              that.setData({
                codema: res.code
              })
              console.log(that.data.codema)
              console.log(that.data.theiv)
              console.log(that.data.theencrypt)
              wx.request({
                url: config.api_base_url + 'User/GetSmallUserToken',
                method: 'get',
                data: {
                  code: that.data.codema,
                  iv: that.data.theiv,
                  encryptedData: that.data.theencrypt
                },
                success: function (res) {
                  console.log(res)
                  that.setData({
                    token: res.data.Data
                  })
                  console.log(that.data.token)
                  wx.request({
                    url: config.api_base_url + 'User/GetUserInfo',
                    method: 'post',
                    header: {
                      'content-type': 'application/json',
                      'Authorization': 'BasicAuth ' + that.data.token
                    },
                    success: function (res) {
                      console.log(res)
                      that.setData({})
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
    // wx.login({
    //   success: function (res) {
    //     console.log(res.code)
    //     that.setData({
    //       codema: res.code
    //     })
    //     console.log(that.data.codema)
    //     wx.request({
    //       url: config.api_base_url + 'User/GetSmallUserToken',
    //       method: 'get',
    //       data: {
    //         code: that.data.codema,
    //         iv: '2qcac64+47j/Rmuf2lGSyQ==',
    //         encryptedData: 'VcvqX/n0LDwDsHkBzIiK3reYpskWDXUfkPGGHuv1QuyqSndXywMyZu0a+R3R4NJz7H82wwyK5jMrXhN2LTDJu9il0EjdLlGiwn4+NlGLkCTF5mBq40qRv4cOEflAo2XlBnAgKGAcoZm8UHpl5ruxnsNwr4kpGKKoLFFAV0IfItxLmuAuhQMlWhd2v7PW5YHaVnCaaZpqxc7VjfwTd4TpUszJdNj9yhq2raPQI0XXY59q7Ibh1jVAggA0rd+N1LNDlWQIYl+JfGWImma+kdFHSwG/nLaGz4GCHDonEz8aR2P94tjsoW09kMf57AYvtBH8lj9MagSS5VW2cBb5m0V6vjaqgoKhs2NU15fgJLgi0ROSlsQTkv87dRH/fhLsGGKVogQHaWVeyUfs4VMQPdZUv84HcnB2UthirCcg4hlx5RtbecZJV2jqJLm0WOKHSP5dbg4lQVplyitR/2LG+AYMOA=='
    //       },
    //       success: function (res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })

    // wx.getSetting({
    //   success: function (res) {
    // console.log(res)


    // if (res.authSetting['scope.userInfo']) {

    //   wx.getUserInfo({
    //     success: function(res) {
    //       console.log(res)
    //       that.setData({
    //         nickName: res.userInfo.nickName,
    //         avatarUrl: res.userInfo.avatarUrl,
    //       })
    //     }
    //   })
    // } else {
    //   console.log("没有信息")
    //   that.setData({
    //     xinashi: true

    //   })
    // }
    //   }
    // })


    // var that=this
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res.userInfo)
    //     console.log(res.userInfo.avatarUrl)
    //     console.log(res.userInfo.nickName)
    //     that.setData({
    //       nickName: res.userInfo.nickName,
    //      avatarUrl: res.userInfo.avatarUrl,
    //   })
    //   },
    // })
  },
})