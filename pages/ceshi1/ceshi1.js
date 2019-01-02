const api_base_url= 'http://192.168.1.102:804/api/'
Page({

  data: {
    "list":[{
      title:'aaaaa',
      id:0
    },{
      title:'bbbbb',
      id:1
    }],
    showModal: false,
    moren:'ccccc',
    problemlunbo:[]
  },
  onLoad: function () { //请求数据在这里
      wx.request({
        url: api_base_url + 'Index/GetFAQsList',
        method: 'post',
        data: {Grate:1},
        success: (res1) => {
          console.log(res1.data.Data)
          this.setData({
            problemlunbo:res1.data.Data          
          })
          // console.log(problemlunbo)
        }
      })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },


  go: function (e) {
    // this.data.list[e.currentTarget.id].title;
      // var nowtitle = this.data.list[e.currentTarget.id].title;
    // //  var this=that;
    console.log(e)
    this.setData({
      showModal: false,
      // moren:nowtitle
    })
  }

})
