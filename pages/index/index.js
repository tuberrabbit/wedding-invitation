//index.js
const app = getApp();
const { user, host } = app.globalData;

const toInvitation = guest => {
  wx.redirectTo({
    url: `../invitation/invitation?guest=${guest}`,
  });
};

Page({
  data: {
    guest: user.guest
  },
  //事件处理函数
  updateGuest: function (evt) {
    this.setData({
      guest: evt.detail.value
    });
  },

  confirm: function (evt) {
    const guest = this.data.guest;
    wx.request({
      url: `${host}/user`,
      method: 'POST',
      data: {
        user: { ...user, guest }
      },
      success: data => {
        if (data.created) {
          toInvitation(guest);
        }
      }
    })
  },

  onLoad: function () {
    const { openId } = user;
    const guest = this.data.guest;
    if (openId) {
      wx.request({
        url: `${host}/user/${openId}`,
        success: data => {
          if (data) {
            app.globalData.user = { ...user, ...data };
            toInvitation(guest);
          }
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
      });
    }
  },
})
