// pages/selfcenter/selfcenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail)
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl:e.detail.userInfo.avatarUrl,
    })
  },

  onLoad: function (options) {



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