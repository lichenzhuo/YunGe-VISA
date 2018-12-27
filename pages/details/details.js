// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    taocanlist: [{
      taocanname: '巴西团队旅游签证1',
      price: '188',
      id: 0
    }, {
      taocanname: '巴西团队旅游签证2',
      price: '288',
      id: '1'
    }, {
      taocanname: '巴西团队旅游签证3',
      price: '388',
      id: '2'
    }],
    catalogSelect: 'one',
    showModal: false,
    showtimeModal: false,
    nowid: 0
  },
  timemodal:function(){            //办理时间弹窗打开
    this.setData({
      showtimeModal: true,
    })
  },
  timecancle:function(){                 //办理时间弹窗关闭
    this.setData({
      showtimeModal: false,
    })
  },
  submit: function () {      //点击弹出弹框
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {   //防止弹框弹出屏幕滑动

  },
  go: function (e) {
    console.log(e.currentTarget.id)

    // this.data.taocanlist[e.currentTarget.id].taocanname;
    // var nowtaocanname = this.data.taocanlist[e.currentTarget.id].taocanlist;
    this.setData({
      showModal: false,
      nowid: e.currentTarget.id
    })
  },
  cancle: function () {          //弹框取消按钮
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
  //    点击咨询
  clickzixun: function () {
    wx.showActionSheet({
      itemList: ['微信咨询', '手机号咨询'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(document)
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