// pages/problemdetail/problemdetail.js
import {
  config
} from '../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemlunbo:[],
    thatindex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options.id)
     console.log(options.index)
    var thatid=options.id
    wx.request({
      url: config.api_base_url + 'Index/GetFAQsModel',
      method: 'post',
      data: {
        Id: thatid
      },
      success: (res) => {
        // console.log(res.data.Data)
        this.setData({
           problemlunbo: res.data.Data,
           thatindex:options.index
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