import {
  config
} from '../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lishi_Show: true,
    jieguo_show: false,
    searchValue: '',
    img: '',
    nanshen_card: '',
    searchdata: [],
    searchcountry: [],
    baocunname: [],
    Token: '',
    historyrecord: [],
    thatsearchname: '',

  },
  //搜索框点击输入
  searchValueInput: function (e) {
    var that = this
    var value = e.detail.value;
    that.setData({
      lishi_Show: false,
      jieguo_show: true
    })
    // console.log(e)
    that.setData({
      searchValue: value,
    });
    if (!value) {                   //被删除   && that.data.productData.length == 0
      that.setData({
        centent_Show: false,
      });
    }
    wx.request({
      url: config.api_base_url + 'Historical/SaveHistorical', //添加搜索记录
      method: 'post',
      data: {
        Contents: value
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'BasicAuth ' + that.data.Token
      },
      success: function (res) {
        console.log(res)
      },
    });
    wx.request({
      url: config.api_base_url + 'Index/GetProductsList', //搜索结果
      method: 'post',
      data: {
        Name: value
      },
      success: function (res) {
        console.log(res, '这是res')
        if (!res.data.Data.CountryName[0]) {
          wx.showToast({
            title: '搜索失败',
            duration: 2000
          });
        } else {
          //  console.log(res.data.Data.Name)
          // console.log(res.data.Data.CountryName[0].Country_ZH)
          that.setData({
            searchdata: res.data.Data.Name,
            searchcountry: res.data.Data.CountryName,
            baocunname: res.data.Data.CountryName[0].Country_ZH
          })
          console.log(that.data.baocunname, '这是baocunname')
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });

  },
  //点击国家
  searchcountryclick: function (e) {
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.name)

    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  },
  //点击商品
  searchproclick: function (e) {
    console.log(e)
    console.log(this.data.baocunname)
    wx.navigateTo({
      url: "../details/details?id=" + e.currentTarget.dataset.id + "&proid=" + e.currentTarget.dataset.proid + "&name=" + this.data.baocunname,
    })
  },
  //点击搜索历史
  //  注释-----------e.currentTarget.dataset.name后面会多个空格，不知什么原因。两种方法去后面的空格
  //  1、trim()方法去空格
  //  2、replace(/\s*/g,"")去除所有空格
  searchhistoryclick: function (e) {
    var that = this
    // console.log(e.currentTarget.dataset.name)
    console.log(typeof (e.currentTarget.dataset.name))
    that.setData({
      thatsearchname: e.currentTarget.dataset.name.trim()
    })
    wx.request({
      url: config.api_base_url + 'Index/GetProductsList', //搜索结果
      method: 'post',
      data: {
        Name: that.data.thatsearchname
      },
      success: function (res) {
        console.log(res.data.Data,'这是点击的res')
        wx.navigateTo({
          url: '../details/details?id=' + res.data.Data.CountryName[0].Id + "&name=" + res.data.Data.CountryName[0].Country_ZH,
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
  clearhis: function () {
    let that = this
    wx.request({
      url: config.api_base_url + 'Historical/DeleteHistorical', //搜索结果
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Authorization': 'BasicAuth ' + that.data.Token
      },
      success: function (res) {
        console.log(res)
        wx.request({ //获取搜索记录
          url: config.api_base_url + 'Historical/SelectHistorical',
          method: 'post',
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + that.data.Token
          },
          success: (res) => {
            that.setData({
              historyrecord: res.data.Data
            })
            console.log(res)
            console.log("搜索记录")
          }
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '清除搜索历史记录失败',
          duration: 2000
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({ //进入页面获取缓存
      key: 'token',
      success(res) {
        //  console.log(res)
        that.setData({
          Token: res.data,
        })
        console.log(that.data.Token + "这是token")
        wx.request({ //获取搜索记录
          url: config.api_base_url + 'Historical/SelectHistorical',
          method: 'post',
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + that.data.Token
          },
          success: (res) => {
            that.setData({
              historyrecord: res.data.Data
            })
            console.log(res)
            console.log("搜索记录")
          }
        })
      },
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