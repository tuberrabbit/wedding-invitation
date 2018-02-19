// pages/invitation/invitation.js
const location = {
  latitude: 30.078739166259766,
  longitude: 120.71099853515625
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  navigateToWedding: function () {
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: '婚礼现场',
      address: '后双盆18号'
    })
  },

  submitWishes: function (evt) {
    console.log(evt.detail.value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const guest = '宾客' || options.query.guest;
    this.setData({ guest });
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