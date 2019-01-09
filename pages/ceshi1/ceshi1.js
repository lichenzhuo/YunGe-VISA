Page({

  data: {
    scrollTop: 0,

    active: 0,
    current: 'tab1',
    current_scroll: 'tab1'
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },

  onLoad: function () { //请求数据在这里


  },
  onShow: function (e) {

  },
})