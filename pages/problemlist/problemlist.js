// pages/problemlist/problemlist.js
import {
  config
} from '../../config.js'
// let http=new HTTP()
const img_base_url = 'http://192.168.1.102:907'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  gotoproblemdetail: function(e) {
    // console.log(e.currentTarget.dataset.id)
    
    wx.navigateTo({
      url: '../problemdetail/problemdetail?id='+e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: config.api_base_url + 'Index/GetFAQsList',
      method: 'post',
      data: {
        Grate: 0
      },
      success: (res) => {
        console.log(res.data.Data)
        this.setData({
          problemlunbo: res.data.Data
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})