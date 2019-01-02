var app = getApp();
var searchValue = ''
// pages/search/search.js
Page({
  data: {
    centent_Show: true,
    searchValue: '',
    img: '',
    nanshen_card: ''
  },
  onLoad: function (option) {
    console.log(option)
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    console.log(e)
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        centent_Show: false,
      });
    }
    wx.request({
      url: 'http://192.168.1.102:804/api/Index/GetProductsList', //这里填写后台给你的搜索接口
      method: 'post',
      data: {
        Contents: e.detail.value
      },
      // data: {
      //   str: that.data.searchValue,
      //   program_id: program_id,
      //   style: id
      // },
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      success: function (res) {
        console.log(res)
        // if (res.data.length == 0) {
        //   that.setData({
        //     centent_Show: false,
        //   });
        // }
        // that.setData({
        //   nanshen_card: res.data,
        // });
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
  //     url: 'http://192.168.1.102:804/api/Index/GetProductsList', //这里填写后台给你的搜索接口
  //     method: 'post',
  //     data: {
  //       Contents: '巴西'
  //     },
  //     // data: {
  //     //   str: that.data.searchValue,
  //     //   program_id: program_id,
  //     //   style: id
  //     // },
  //     // header: {
  //     //   'content-type': 'application/x-www-form-urlencoded'
  //     // },
  //     success: function (res) {
  //       console.log(res)
  //       // if (res.data.length == 0) {
  //       //   that.setData({
  //       //     centent_Show: false,
  //       //   });
  //       // }
  //       // that.setData({
  //       //   nanshen_card: res.data,
  //       // });
  //     },
  //     fail: function (e) {
  //       wx.showToast({
  //         title: '网络异常！',
  //         duration: 2000
  //       });
  //     },
  //   });
  // }
});