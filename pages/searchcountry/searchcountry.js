var app = getApp();
var searchValue = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lishi_Show: true,
    jieguo_show:false,
    searchValue: '',
    img: '',
    nanshen_card: '',
    searchdata: []
  },
  searchValueInput: function (e) {
    var that=this
    var value = e.detail.value;
    that.setData({
      lishi_Show:false,
      jieguo_show:true
    })
    console.log(e)
    that.setData({
      searchValue: value,
    });
    if (!value && that.data.productData.length == 0) {
      that.setData({
        centent_Show: false,
      });
    }
    wx.request({
      url: 'http://192.168.1.102:804/api/Index/GetProductsList', //后台搜索接口
      method: 'post',
      data: {
        Name: value
      },
      success: function (res) {
        console.log(res.data.Data.Name)

        
        that.setData({
          searchdata : res.data.Data.Name
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
  // suo: function (e) {
  //   var id = e.currentTarget.dataset.id
  //   console.log(e)
  //   var program_id = app.program_id;
  //   console.log(app.program_id);
  //   var that = this;
  //   wx.request({
  //     url: 'http://192.168.1.102:804/api/Index/GetProductsList', //后台搜索接口
  //     method: 'post',
  //     data: {
  //       Contents: '巴西'
  //     },
  //     success: function (res) {
  //       console.log(res)
  //     },
  //     fail: function (e) {
  //       wx.showToast({
  //         title: '网络异常！',
  //         duration: 2000
  //       });
  //     },
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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