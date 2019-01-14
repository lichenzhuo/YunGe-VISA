Page({

  data: {
    list: [{
      name: "蓝色",
      id: '1'
    }, {
      name: "红色",
      id: '2'
    }, {
      name: "黄色",
      id: '3'
    }, {
      name: "绿色",
      id: '4'
    }, {
      name: "黑色",
      id: '5'
    }, {
      name: "粉色",
      id: '6'
    }],
    scrollTop: 0,
    active: 0,
    current: 'tab1',
    current_scroll: 'tab1',
    toview:''
  },
  click: function(e) {
    console.log(e.currentTarget.dataset.id) 
    console.log(e.currentTarget.dataset.index)
    // var id = e.currentTarget.dataset.id
    // var index = e.currentTarget.dataset.index
    this.setData({
      toview:id
    })
  },

  onLoad: function() { 


  },
  onShow: function(e) {

  },
})
// const app = getApp()

// Page({
//   data: {
//     scrollTop: 0,
//     last_scrollTop: 0,
//     toView: 0,
//     navActive: 0,
//     lastActive: 0,
//     s_height: '',
//     height_arr: [],
//     category: [
//       { categoryName: '零食' },
//       { categoryName: '饮料' },
//       { categoryName: '日常' },
//       { categoryName: '电器' }
//     ],
//     detail: [
//       [{ goodsName: '可比克薯片', goodsPrice: '3.8' }, ],
//       [{ goodsName: '可口可乐', goodsPrice: '2.5' }, ],
//       [{ goodsName: '牙刷', goodsPrice: '2.5' },],
//       [{ goodsName: '小米6', goodsPrice: '2499.0' },],
//     ]
//   },
//   tap: function (e) {
//     var id = e.currentTarget.dataset.id;
//     var index = e.currentTarget.dataset.index;
//     this.setData({
//       toView: id,
//       navActive: index
//     });
//   },
//   scroll: function (e) {
//     var self = this;

//     self.scrollmove(self, e, e.detail.scrollTop);
    

//   },
//   scrollmove: function (self, e, scrollTop) {
//     // last_scrollTop=scrollTop;
//     var scrollArr = self.data.height_arr;
//     if (scrollTop > scrollArr[scrollArr.length - 1] - self.data.s_height) {
//       return;
//     } else {
//       for (var i = 0; i < scrollArr.length; i++) {
//         if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
//           if (0 != self.data.lastActive) {
//             self.setData({
//               navActive: 0,
//               lastActive: 0
//             });
//           }
//         } else if (scrollTop >= scrollArr[i - 1] && scrollTop <= scrollArr[i]) {
//           if (i != self.data.lastActive) {
//             self.setData({
//               navActive: i,
//               lastActive: i
//             });
//           }
//         }
//       }
//     }
//   },
//   onLoad: function () {
//     var s_height = wx.getSystemInfoSync().windowHeight;
//     this.setData({ s_height: s_height });
//     this.getHeightArr(this);
//   },
//   getHeightArr: function (self) {
//     var height = 0, height_arr = [], details = self.data.detail, s_height = self.data.s_height;
//     for (var i = 0; i < details.length; i++) {
//       var last_height = 30 + details[i].length * 90;
//       if (i == details.length - 1) {
//         last_height = last_height > s_height ? last_height : s_height + 50;
//       }
//       height += last_height;

//       height_arr.push(height);
//     }
//     self.setData({
//       height_arr: height_arr
//     });
//   }
// })