// pages/details/details.js
import {
  config
} from '../../config.js'
// let http=new HTTP()
const img_base_url = 'http://192.168.1.102:907'
var thatid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requiredata: [],
    morendatadetail: [],
    taocanlength: '',
    morendata: [],
    dataildata: [],
    Token: '',
    wxnum: '',
    phonenum: '',
    tabswitch: [{
      "tabname": '基本信息',
      "select": 'one'
    }, {
      "tabname": '所需资料',
      "select": 'two'
    }, {
      "tabname": '办理流程',
      "select": 'three'
    }, {
      "tabname": '签证图例',
      "select": 'four'
    }],
    jobswitch: [{
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
    jobswitchselect: 'one',
    catalogSelect: 'one',
    showModal: false,
    showtimeModal: false,
    nowid: 0
  },
  timemodal: function () { //办理时间弹窗打开
    this.setData({
      showtimeModal: true,
    })
  },
  timecancle: function () { //办理时间弹窗关闭
    this.setData({
      showtimeModal: false,
    })
  },
  submit: function () { //点击弹出弹框
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () { //防止弹框弹出屏幕滑动

  },

  cancle: function () { //弹框取消按钮
    this.setData({
      showModal: false,
      nowid: 0
    })
  },
  // toggleDialog() {
  //   this.setData({
  //     showDialog: !this.data.showDialog
  //   });

  // },
  clicktab: function (e) {
    // console.log(e)
    var that = this;
    that.setData({ //把选中值放入判断值
      catalogSelect: e.currentTarget.dataset.select
    })
  },
  jobtab: function (e) {
    var that = this;
    that.setData({ //把选中值放入判断值
      jobswitchselect: e.currentTarget.dataset.select
    })
    var thatselect = e.currentTarget.dataset.select
    if (e.currentTarget.dataset.select == 'one') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.freeOcc
      })
    } else if (e.currentTarget.dataset.select == 'two') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.retire
      })
    } else if (e.currentTarget.dataset.select == 'three') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.jobPerson
      })
    } else if (e.currentTarget.dataset.select == 'four') {
      that.setData({
        requiredata: that.data.morendatadetail.datum.student
      })
    } else {
      that.setData({
        requiredata: that.data.morendatadetail.datum.children
      })
    }
  },
  //    点击咨询
  clickzixun: function () {
    var that=this
    wx.showActionSheet({
      itemList: ['微信咨询', '手机号咨询'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          if (that.data.Token) {
            if (that.data.wxnum = '') {
              wx.navigateTo({
                url: '../bindweixin/bindweixin',
              })
            } else {
              wx.request({
                url: config.api_base_url + 'Consultation/Save',
                method: 'post',
                data: {
                  //微信咨询传的值
                },
                success:()=>{
                  wx.showToast({
                    title: '我们将会在24小时之内联系您',
                    icon: 'none',
                    duration: 2000
                  });
                }
              })
            }
          }else{
            wx.navigateTo({
              url: '../selfcenter/selfcenter',
            })
          }
        } else{
          if (that.data.Token) {
            if (that.data.wxnum = '') {
              wx.navigateTo({
                url: '../bindweixin/bindweixin',
              })
            } else {
              wx.request({
                url: config.api_base_url + 'Consultation/Save',
                method: 'post',
                data: {
                  //微信咨询传的值
                },
                success:()=>{
                  wx.showToast({
                    title: '我们将会在24小时之内联系您',
                    icon: 'none',
                    duration: 2000
                  });
                }
              })
            }
          }else{
            wx.navigateTo({
              url: '../selfcenter/selfcenter',
            })
          }
        }
        
      },
    })
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  gotoselect: function (e) {
    wx.request({
      url: config.api_base_url + 'Products/ProductDetail',
      method: 'post',
      data: {
        Id: e.currentTarget.id
      },
      success: (res) => {
        // console.log(res.data.Data)
        this.setData({
          morendatadetail: res.data.Data
        })
        // console.log(this.data.morendatadetail)
      },

    })
    this.setData({
      showModal: false,
      nowid: e.currentTarget.id,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log(res)
        that.setData({
          Token: res.data,
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
              wxnum: res.data.Data.VXNumber,
              phonenum: res.data.Data.Phone,
            })
          }
        })
      },
    })
    console.log(options)
    if (!options.proid) {
      var that = this
      wx.request({
        url: config.api_base_url + 'Products/list',
        method: 'post',
        data: {
          CategoryId: options.id
        },
        success: (res) => {
          // console.log(res.data.Data[0])

          var thatid = res.data.Data[0].Id
          that.setData({
              dataildata: res.data.Data,
              morendata: res.data.Data[0],
              taocanlength: res.data.Data.length,

            }),
            wx.request({
              url: config.api_base_url + 'Products/ProductDetail',
              method: 'post',
              data: {
                Id: thatid
              },
              success: (res) => {
                // console.log(res.data.Data)
                this.setData({
                  morendatadetail: res.data.Data,
                  requiredata: res.data.Data.datum.freeOcc
                })
                // console.log(this.data.morendatadetail)


              }
            })

        }
      })
    } else {
      console.log(options.id)
      console.log(options.proid)
      var that = this
      wx.request({
        url: config.api_base_url + 'Products/ProductDetail',
        method: 'post',
        data: {
          Id: options.proid
        },
        success: (res) => {
          console.log(res)
          this.setData({
            morendatadetail: res.data.Data,
            requiredata: res.data.Data.datum.freeOcc
          })
        }
      })
      wx.request({
        url: config.api_base_url + 'Products/list',
        method: 'post',
        data: {
          CategoryId: options.id
        },
        success: (res) => {
          // console.log(res.data.Data.length)
          this.setData({
            taocanlength: res.data.Data.length,
            dataildata: res.data.Data,
          })
        }
      })
    }


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