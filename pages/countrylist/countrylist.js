import {
  config
} from '../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countrylist: [],


  },
  gotodetails: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that=this
    console.log(options.listid)
    var listid = options.listid
    // wx.setNavigationBarTitle({
    //   title: '亚洲Asia'
    // })
    wx.request({
      url: config.api_base_url+'Index/CountryList',
      method: 'post',
      data: {
        Continent: listid
      },
      success: (res) => {
        console.log(res.data.Data)
        let newarr = [res.data.Data]
        for (let i = 0; i < newarr.length; i++) {
          for (let j = 0; j < newarr[i].length; j++) {
            newarr[i][j].HomeImage =config.img_base_url + newarr[i][j].HomeImage.replace(/\\/g, "\/")
          }
        }
        this.setData({
          countrylist: newarr[0]
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