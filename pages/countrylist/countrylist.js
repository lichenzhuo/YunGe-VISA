// pages/countrylist/countrylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asialist: [],
    img_base_url: 'http://192.168.1.102:907',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that=this
    console.log(options.listid)
    var listid=options.listid
    wx.setNavigationBarTitle({
      title: '亚洲Asia'
    })
    wx.request({
      url: 'http://192.168.1.102:804/api/Index/CountryList',
      method: 'post',
      data: {
        Continent: listid
      },
      success: (res) => {
        console.log(res.data.Data)
        this.setData({
          asialist: res.data.Data
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