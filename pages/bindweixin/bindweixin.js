import {
  config
} from '../../config.js'
// let http=new HTTP()
const img_base_url = 'http://192.168.1.102:907'
var searchValue = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    Token:'',
    wxnum:'',
    phonenum:'',
  },
  searchValueInput: function(e) {
    console.log(e.detail.value)
    var that = this
    var value = e.detail.value;
    // that.setData({
    //   lishi_Show: false,
    //   jieguo_show: true
    // })

    that.setData({
      searchValue: value,
    });
    // if (!value && that.data.productData.length == 0) {
    //   that.setData({
    //     centent_Show: false,
    //   });
    // }

  },
  bindphone: function() {
    var that = this
    // console.log(that.data.Token)
    var weixinnum = that.data.searchValue
    console.log(weixinnum)
    console.log(that.data.Token)
    if (weixinnum) {
      wx.request({
        url: config.api_base_url + 'Consultation/UpdateVx',
        method: 'post',
        data: {
          VXNumber: weixinnum
        },
        header: {
          'content-type': 'application/json',
          'Authorization': 'BasicAuth ' + that.data.Token
        },
        success: (res) => {
          if(res.data.Code==0){
            wx.showToast({
              title: '微信绑定成功',
              icon: 'none',
              duration: 2000,
              // complete:function(){
              //   wx.navigateBack({
              //     success:function(){
              //       // that.onLoad()
              //     }
              //   })
              // }
            });
           
          }else{
            wx.showToast({
              title: '未知错误，绑定失败',
              icon: 'none',
              duration: 2000
            });
            that.onLoad()
          }
          
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    wx.getStorage({
      key: 'token',
      success(res) {
         console.log(res)
        that.setData({
          Token: res.data,
        })
       
      },
      fail(res) {
        console.log(res)
        
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