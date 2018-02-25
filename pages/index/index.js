//index.js
const app = getApp();

const toInvitation = guest => {
  wx.redirectTo({
    url: `../invitation/invitation?guest=${guest}`,
  });
};

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
    const guest = this.data.guest;
    const { user, host } = app.globalData;
    const loginInfo = wx.getStorageSync('loginInfo');
    wx.request({
      url: `${host}/user`,
      method: 'POST',
      header: {
        authentication: loginInfo
      },
      data: {
        user: { ...user, guest }
      },
      success: res => {
        if (res.data.created) {
          toInvitation(guest);
        }
      }
    })
  },

  onLoad: function () {
    const guest = this.data.guest;
    const loginInfo = wx.getStorageSync('loginInfo');
    const { user, host } = app.globalData;
    wx.request({
      url: `${host}/user`,
      header: {
        authentication: loginInfo
      },
      success: res => {
        if (res.data.user) {
          app.globalData.user = { ...user, ...res.data.user };
          toInvitation(guest);
        }
      }
    });
  },
})
