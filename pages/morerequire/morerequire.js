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
    console.log(options,'这是options')
    console.log(options.id,'这是id')
    console.log(options.index,'这是index')
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
        let data = res.data.Data;
        that.App = data.App;
        that.Ems = data.Ems;
        that.Face = data.Face;
        that.Inbound = data.Inbound;
        console.log(that.App, that.Ems)
        for (let i = 0; i < that.App.length; i++) {
          that.App[i].Description = that.App[i].Description.split('。');
          that.App[i].Description.pop();
        }
        for (let i = 0; i < that.Ems.length; i++) {
          that.Ems[i].Description = that.Ems[i].Description.split('。');
          that.Ems[i].Description.pop();
        }
        for (let i = 0; i < that.Face.length; i++) {
          that.Face[i].Description = that.Face[i].Description.split('。');
          that.Face[i].Description.pop();
        }
        for (let i = 0; i < that.Inbound.length; i++) {
          that.Inbound[i].Description = that.Inbound[i].Description.split('。');
          that.Inbound[i].Description.pop();
        }
        console.log(that.App)
        console.log(that.Ems)
        that.setData({
          App: that.App,
          Ems: that.Ems,
          Face: that.Face,
          Inbound: that.Inbound,
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