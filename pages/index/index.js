//index.js
const app = getApp();

Page({
  data: {
    guest: app.globalData.user.guest
  },
  //事件处理函数
  updateGuest: function (evt) {
    this.setData({
      guest: evt.detail.value
    });
  },

  confirm: function (evt) {
    console.log('fdsa',this.data.guest);
  },

  onLoad: function () {

  },
})
