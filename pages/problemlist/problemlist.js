// pages/problemlist/problemlist.js
import {
  config
} from '../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listshow: true,
    searchshow: false,
    searchValue: '',
  },
  gotoproblemdetail: function (e) {
     console.log(e.currentTarget.dataset.id)
     console.log(e.currentTarget.dataset.index)

    wx.navigateTo({
      url: '../problemdetail/problemdetail?id=' + e.currentTarget.dataset.id+'&index='+ e.currentTarget.dataset.index
    })
  },
  searchValueInput: function (e) {
    var that = this
    var value = e.detail.value;
    console.log(value)
    wx.request({
      url: config.api_base_url + 'Index/GetFAQsList', //后台搜索接口
      method: 'post',
      data: {
        Grate: 0,
        Problem: value,
      },
      success: function (res) {
        // console.log(res.data.Data)
        //  console.log(res)
        // console.log(res.data.Data.CountryName[0].Country_ZH)
        that.setData({
          listshow: false,
          searchshow: true,
          searchValue:res.data.Data
        })


      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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