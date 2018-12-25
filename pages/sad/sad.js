// pages/list-1/list-1.js
var list = require('../../utils/list.js')
Page({
  data: {
    // 左侧点击类样式
    curNav: 'A',
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    var listChild1 = list.List[0];
    var that = this;
    // 获取可视区高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          list: listChild1,
          winHeight: res.windowHeight,
        })
      }
    })
  },
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function (e) {
    var id = e.target.id;
    console.log(typeof id)
    this.setData({
      // 动态把获取到的 id 传给 scrollTopId
      scrollTopId: id,
      // 左侧点击类样式
      curNav: id
    })
  }
})

