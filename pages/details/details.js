import {
  config
} from '../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requiredata: [], //所需资料
    morendatadetail: [], //页面展示的数据
    // morendata: [],
    dataildata: [], //国家下的所有套餐信息
    needknow: [], //办理须知
    Token: '', //token
    wxnum: '', //绑定的微信号
    phonenum: '', //绑定的手机号
    tabswitch: [{ //tab切换
      "tabname": '基本信息',
      "select": "one"
    }, {
      "tabname": '所需资料',
      "select": "two"
    }, {
      "tabname": '办理流程',
      "select": "three"
    }, {
      "tabname": '签证图例',
      "select": "foue"
    }],
    jobswitch: [{              //职业tab切换
      "tabname": '自由职业者',
      "select": 'one'
    }, {
      "tabname": '退休人员',
      "select": 'two'
    }, {
      "tabname": '在职人员',
      "select": 'three'
    }, {
      "tabname": '在校学生',
      "select": 'four'
    }, {
      "tabname": '学龄前儿童',
      "select": 'five'
    }],
    jobswitchselect: 'three', //职业tab切换默认
    thatindex: 3, //职业tab切换所点击那一项的index
    catalogSelect: 'one', //导航tab切换默认哪一项
    showModal: false, //控制套餐modal显示
    nowid: '',        //点击过套餐选择后的当前页面商品id
    Proid: '', //从搜索页面点击商品获取到的商品id
    thatid: '', //点击国家进来默认展示第一个商品的id
    toView: '', //scroll-view组件，未正常使用
    showtimeModal:false              //控制预计办理时间点击弹框


  },
  pricemodal: function () {   //参考价明细点击弹框
    wx.showModal({
      showCancel: false,
      confirmColor: '#8DA5FF',
      title: '明细',
      content: '此价格仅为参考价格，费用包含：咨询费用+审核费用+填表费用+签证费代缴+专人代递带取+顺丰回寄',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  timelongmodal: function () {     //有效期限、最长停留、入境次数点击弹框
    wx.showModal({
      showCancel: false,
      confirmColor: '#8DA5FF',
      title: '提示',
      content: '具体时间以领事馆为主',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // timemodal: function () { //预计办理时间点击弹框
  //   this.setData({
  //     showtimeModal: true,
  //   })
  //   wx.showModal({
  //     showCancel:false,
  //     confirmColor:'#8DA5FF',
  //     title: '明细',
  //     content: '此价格仅为参考价格，费用包含：咨询费用+审核费用+填表费用+签证费代缴+专人代递带取+顺丰回寄',
  //     success(res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },
  submit: function () { //点击弹出套餐选择弹框
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {             //防止弹框弹出屏幕滑动

  },

  cancle: function () {                   //关闭套餐选择弹框
    this.setData({
      showModal: false,
    })
  },
  clicktab: function (e) {                       //导航tab点击事件
    console.log(e.currentTarget.dataset.select)
    var selectid = e.currentTarget.dataset.select
    var that = this;
    that.setData({ //把选中值放入判断值
      catalogSelect: e.currentTarget.dataset.select,
      toView: e.currentTarget.dataset.select
    })
    if (selectid == 'one') {
      wx.pageScrollTo({
        scrollTop: 335,
        duration: 500
      })
    } else if (selectid == 'two') {
      wx.pageScrollTo({
        scrollTop: 700,
        duration: 500
      })
    } else if (selectid == 'three') {
      wx.pageScrollTo({
        scrollTop: 1000,
        duration: 500
      })
    } else {
      wx.pageScrollTo({
        scrollTop: 1200,
        duration: 500
      })
    }
  },
  jobtab: function (e) {                               //职业tab切换点击事件
    console.log(e.currentTarget.dataset.index)
    var that = this;
    that.setData({ //把选中值放入判断值
      jobswitchselect: e.currentTarget.dataset.select
    })
    var thatselect = e.currentTarget.dataset.select
    if (e.currentTarget.dataset.select == 'one') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.freeOcc,
        thatindex: 1
      })
      console.log(that.data.requiredata, that.data.thatindex)
    } else if (e.currentTarget.dataset.select == 'two') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.retire,
        thatindex: 2
      })
      console.log(that.data.requiredata, that.data.thatindex)
    } else if (e.currentTarget.dataset.select == 'three') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.jobPerson,
        thatindex: 3
      })
      console.log(that.data.requiredata, that.data.thatindex)
    } else if (e.currentTarget.dataset.select == 'four') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.student,
        thatindex: 4
      })
      console.log(that.data.requiredata, that.data.thatindex)
    } else {
      that.setData({
        requiredata: that.data.morendatadetail.datum.children,
        thatindex: 5
      })
      console.log(that.data.requiredata, that.data.thatindex)
    }
  },
  //    点击咨询
  // clickzixun: function () {
  //   var that = this
  //   console.log(that.data.morendatadetail.Name)
  //   wx.showActionSheet({
  //     itemList: ['微信咨询', '手机号咨询'],
  //     success(res) {
  //       console.log(res.tapIndex)
  //       if (res.tapIndex == 0) {
  //         if (that.data.Token) {
  //           if (that.data.wxnum = '') {
  //             wx.navigateTo({
  //               url: '../bindweixin/bindweixin',
  //             })
  //           } else {
  //             wx.request({
  //               url: config.api_base_url + 'Consultation/Save',
  //               method: 'post',
  //               data: {
  //                 //微信咨询传的值
  //                 ContactType: 1,
  //                 Name: that.data.morendatadetail.Name
  //               },
  //               header: {
  //                 'content-type': 'application/json',
  //                 'Authorization': 'BasicAuth ' + that.data.Token
  //               },
  //               success: (res) => {
  //                 console.log(res)
  //                 if (res.data.Code == 0) {
  //                   wx.showToast({
  //                     title: '我们将会在24小时之内联系您',
  //                     icon: 'none',
  //                     duration: 2000
  //                   });
  //                 } else {
  //                   wx.showToast({
  //                     title: '未知错误，发送失败',
  //                     icon: 'none',
  //                     duration: 2000
  //                   });
  //                 }

  //               }
  //             })
  //           }
  //         } else {
  //           wx.navigateTo({
  //             url: '../selfcenter/selfcenter',
  //           })
  //         }
  //       } else {
  //         if (that.data.Token) {
  //           if (that.data.wxnum = '') {
  //             wx.navigateTo({
  //               url: '../bindweixin/bindweixin',
  //             })
  //           } else {
  //             wx.request({
  //               url: config.api_base_url + 'Consultation/Save',
  //               method: 'post',
  //               data: {
  //                 //微信咨询传的值
  //                 ContactType: 2,
  //                 Name: that.data.morendatadetail.Name
  //               },
  //               header: {
  //                 'content-type': 'application/json',
  //                 'Authorization': 'BasicAuth ' + that.data.Token
  //               },
  //               success: (res) => {
  //                 console.log(res)
  //                 if (res.data.Code == 0) {
  //                   wx.showToast({
  //                     title: '我们将会在24小时之内联系您',
  //                     icon: 'none',
  //                     duration: 2000
  //                   });
  //                 } else {
  //                   wx.showToast({
  //                     title: '未知错误，发送失败',
  //                     icon: 'none',
  //                     duration: 2000
  //                   });
  //                 }

  //               }
  //             })
  //           }
  //         } else {
  //           wx.navigateTo({
  //             url: '../selfcenter/selfcenter',
  //           })
  //         }
  //       }

  //     },
  //   })
  //   // wx.showToast({
  //   //   title: '成功',
  //   //   icon: 'success',
  //   //   duration: 2000
  //   // })
  // },
  gotoselect: function (e) {           //套餐选择模态框点击套餐事件
    var that = this
    wx.request({
      url: config.api_base_url + 'Products/ProductDetail',
      method: 'post',
      data: {
        Id: e.currentTarget.id
      },
      success: (res) => {
        console.log(res.data.Data) //这里copy
        if (res.data.Data.VisaPath) {
          res.data.Data.VisaPath = config.img_base_url + res.data.Data.VisaPath.replace(/\\/g, "\/")
        }
        var thisarr = res.data.Data.BaseInfo
        var newthisarr = thisarr.replace(/(\s*$)/g, "").split("。")
        //  var thislength=newthisarr.length
        var lastarr = newthisarr.pop()
        console.log(newthisarr)
        console.log(lastarr)
        if (lastarr == '') {
          // console.log("是空")
          that.setData({
            morendatadetail: res.data.Data,
            requiredata: res.data.Data.datum.jobPerson,
            needknow: newthisarr,
          })
        } else if (lastarr == '') {
          // console.log("空格")
          that.setData({
            morendatadetail: res.data.Data,
            requiredata: res.data.Data.datum.jobPerson,
            needknow: newthisarr
          })
        } else {
          // console.log("都不是")
          that.setData({
            morendatadetail: res.data.Data,
            requiredata: res.data.Data.datum.jobPerson,
            needknow: res.data.Data.BaseInfo.replace(/(\s*$)/g, "").split("。")
          })
        }
        console.log("2132132")
        console.log(that.data.morendatadetail)
        console.log(that.data.requiredata)
        // console.log(that.data.needknow)
        //  console.log(this.data.morendatadetail.BaseInfo)
      }
    })
    this.setData({
      showModal: false,
      nowid: e.currentTarget.id,
    })
    console.log(this.data.nowid, '这是nowid')
  },
  moreDetails: function (e) {          //所需材料详细要求点击事件
    console.log(e, '点击返回')
    if (!this.data.nowid) {
      console.log("nowid不存在")
      if (!this.data.Proid) {
        console.log("Proid不存在")
        console.log(this.data.thatid, '这是thatid')
        wx.navigateTo({
          url: '../morerequire/morerequire?id=' + this.data.thatid + '&index=' + this.data.thatindex
        })
      } else {
        console.log(this.data.Proid, '这是proid')
        wx.navigateTo({
          url: '../morerequire/morerequire?id=' + this.data.Proid + '&index=' + this.data.thatindex
        })
      }
    } else {
      console.log(this.data.nowid, '这是nowid')
      wx.navigateTo({
        url: '../morerequire/morerequire?id=' + this.data.nowid + '&index=' + this.data.thatindex
      })
    }
  },
  getUserInfo: function (e) {          //集成到咨询按钮里面的button开放能力，点击获取用户授权
    var that = this
    console.log(e.currentTarget.dataset.name)
    // that.setData({
    //   xianshi: false
    // })
    _getUserInfo();

    function _getUserInfo() {
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
                              wx.showActionSheet({
                                itemList: ['微信咨询', '手机号咨询'],
                                success(res) {
                                  if (res.tapIndex == 0) { //点击的是微信咨询
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
                                }
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.getStorage({                    //进入页面，获取缓存中的token
      key: 'token',
      success(res) {
        // console.log(res)

        that.setData({
          Token: res.data,
        })
        wx.request({                   //获取缓存成功，从后台获取用户绑定信息
          url: config.api_base_url + 'User/GetUserInfo',
          method: 'post',
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + that.data.Token
          },
          success: function (res) {
            console.log(res)
            that.setData({
              wxnum: res.data.Data.VXNumber,
              phonenum: res.data.Data.Phone,
            })
          }
        })
      },
    })
    console.log(options)
    if (!options.proid) {                      //从搜索页面进入详情页面，判定点击的是国家还是商品
      var that = this
      wx.request({
        url: config.api_base_url + 'Products/list',
        method: 'post',
        data: {
          CategoryId: options.id         //通过搜索页面点击传过来的国家id获取该国家下的数据
        },
        success: (res) => {
          // console.log(res.data.Data[0])

          var thatid = res.data.Data[0].Id          //thatid是从国家进来默认展示第一个商品的id
          // console.log("1231323123321")                
          console.log(thatid, '从国家进来默认展示第一个商品的thatid')
          that.setData({
              dataildata: res.data.Data,
              // morendata: res.data.Data[0],
              taocanlength: res.data.Data.length,
              thatid: res.data.Data[0].Id

            }),
            wx.request({
              url: config.api_base_url + 'Products/ProductDetail',         //获取默认商品id下的详细数据
              method: 'post',
              data: {
                Id: thatid
              },
              success: (res) => {
                console.log(res.data.Data) //这里copy
                if (res.data.Data.VisaPath) {
                  res.data.Data.VisaPath = config.img_base_url + res.data.Data.VisaPath.replace(/\\/g, "\/")  //将图片路径中的\变成/
                }

                var thisarr = res.data.Data.BaseInfo
                var newthisarr = thisarr.replace(/(\s*$)/g, "").split("。")        //以句号为分隔符将字符串分割成数组
                //  var thislength=newthisarr.length
                var lastarr = newthisarr.pop()          //去除数组最后一项并返回
                console.log(newthisarr)                 //去除最后一项之后的数组
                console.log(lastarr)
                if (lastarr == '') {          //判定最后一项是否是空
                  // console.log("是空")
                  that.setData({
                    morendatadetail: res.data.Data,
                    requiredata: res.data.Data.datum.jobPerson,
                    needknow: newthisarr,
                  })


                } else if (lastarr == ' ') {     //判定最后一项是否是空格
                  // console.log("空格")
                  that.setData({
                    morendatadetail: res.data.Data,
                    requiredata: res.data.Data.datum.jobPerson,
                    needknow: newthisarr
                  })
                } else {
                  // console.log("都不是")
                  this.setData({
                    morendatadetail: res.data.Data,
                    requiredata: res.data.Data.datum.jobPerson,
                    needknow: res.data.Data.BaseInfo.replace(/(\s*$)/g, "").split("。")

                  })
                }
                // console.log("2132132")
                console.log(this.data.requiredata)

                // console.log(that.data.needknow)
                //  console.log(this.data.morendatadetail.BaseInfo)


              }
            })

        }
      })
    } else {
      console.log(options.id, '这是id')
      console.log(options.proid, '这是proid')
      var that = this
      wx.request({
        url: config.api_base_url + 'Products/ProductDetail',
        method: 'post',
        data: {
          Id: options.proid                                   //通过搜索界面点击传过来的商品套餐id获取该套餐的数据
        },
        success: (res) => {
          console.log(res.data.Data)
          var thisarr = res.data.Data.BaseInfo
          var newthisarr = thisarr.replace(/(\s*$)/g, "").split("。")
          //  var thislength=newthisarr.length
          var lastarr = newthisarr.pop()
          console.log(newthisarr)
          console.log(lastarr)
          if (lastarr == '') {
            // console.log("是空")
            that.setData({
              morendatadetail: res.data.Data,
              requiredata: res.data.Data.datum.jobPerson,
              needknow: newthisarr,
              Proid: options.proid
            })

          } else if (lastarr == ' ') {
            // console.log("空格")
            that.setData({
              morendatadetail: res.data.Data,
              requiredata: res.data.Data.datum.jobPerson,
              needknow: newthisarr
            })
          } else {
            // console.log("都不是")
            this.setData({
              morendatadetail: res.data.Data,
              requiredata: res.data.Data.datum.jobPerson,
              needknow: res.data.Data.BaseInfo.replace(/(\s*$)/g, "").split("。")

            })
          }
        }
      })
      wx.request({
        url: config.api_base_url + 'Products/list',
        method: 'post',
        data: {
          CategoryId: options.id             //通过搜索界面点击商品套餐传过来的该套餐所属的国家id获取所有套餐信息
        },
        success: (res) => {
          // console.log(res.data.Data.length)
          this.setData({
            dataildata: res.data.Data,
          })
        }
      })
    }


  },
  onPageScroll: function (e) {
    // console.log(e.scrollTop)
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
  onPullDownRefresh: function () {                      //页面下拉刷新
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