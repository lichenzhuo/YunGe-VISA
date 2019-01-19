import {
  config
} from '../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    App: [],
    Ems: [],
    Face: [],
    Inbound: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '这是options')
    console.log(options.id, '这是id')
    console.log(options.index, '这是index')
    var that = this
    wx.request({
      url: config.api_base_url + 'Materials/MoreDetails',
      method: 'post',
      data: {
        ProductId: options.id,
        WorkType: options.index,
      },
      success: (res) => {
        console.log(res.data.Data)
        var data = res.data.Data;
        var thatApp = data.App;
        var thatEms = data.Ems;
        var thatFace = data.Face;
        // console.log(thatApp, thatEms)
        for (let i = 0; i < thatApp.length; i++) {
          thatApp[i].Description = thatApp[i].Description.split('。');
          thatApp[i].Description.pop();
        }
        for (let i = 0; i < thatEms.length; i++) {
          thatEms[i].Description = thatEms[i].Description.split('。');
          thatEms[i].Description.pop();
        }
        for (let i = 0; i < thatFace.length; i++) {
          thatFace[i].Description = thatFace[i].Description.split('。');
          thatFace[i].Description.pop();
        }
        if (data.Inbound) {
          var thatInbound = data.Inbound;
          for (let i = 0; i < thatInbound.length; i++) {
            thatInbound[i].Description = thatInbound[i].Description.split('。');
            thatInbound[i].Description.pop();
          }
        }


        console.log(thatApp)
        console.log(thatEms)
        that.setData({
          App: thatApp,
          Ems: thatEms,
          Face: thatFace,
          Inbound: thatInbound,
        })
        var thistitle
        switch (1) {
          case 1:
            thistitle = "自由职业者";
            break;
          case 2:
            thistitle = "退休人员";
            break;
          case 3:
            thistitle = "在职人员";
            break;
          case 4:
            thistitle = "在校学生";
            break;
          case 5:
            thistitle = "学龄前儿童";
            break;
        }
        wx.setNavigationBarTitle({
          title: thistitle
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