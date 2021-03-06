// pages/invitation/invitation.js
const location = {
  latitude: 30.078739166259766,
  longitude: 120.71099853515625
};

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wishes: ''
  },

  navigateToWedding: function () {
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: '喝酒吃肉',
      address: '后双盆18号'
    })
  },

  updateWishes: function (evt) {
    this.setData({
      wishes: evt.detail.value
    });
  },

  submitWishes: function () {
    const content = this.data.wishes;
    if (!content) {
      return;
    }
    const that = this;
    const { host, user } = app.globalData;
    wx.request({
      url: `${host}/wishes`,
      method: 'POST',
      data: {
        name: user.name,
        wishes: { content }
      },
      success: res => {
        if (res.data.created) {
          that.setData({
            wishes: ''
          });
          wx.showToast({
            title: '感谢你的祝福！',
          });
        } else {
          wx.showToast({
            title: '幸福来得太突然，请稍后重试。',
          });
        }
      }
    })
  },

  joinWedding: function (evt) {
    this.setData({
      isAccept: evt.target.dataset.value
    });
    const { host, user } = app.globalData;
    wx.request({
      url: `${host}/user`,
      method: 'PATCH',
      data: {
        name: user.name,
        isAccept: evt.target.dataset.value
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { user } = app.globalData;
    const { isAccept, name } = user;
    this.setData({ name, isAccept });
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