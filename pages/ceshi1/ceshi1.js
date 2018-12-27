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
    moren:'ccccc'
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
