//app.js
App({
  onLaunch: function (opt) {
    this.globalData.user.guest = opt.guest || '来宾朋友';
    const that = this;
    const { host } = that.globalData;

    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        wx.checkSession({
          fail: function () {
            wx.login({
              success: res => {
                if (res.code) {
                  wx.request({
                    url: `${host}/user/cert`,
                    data: {
                      code: res.code
                    },
                    success: res => {
                      wx.setStorage({
                        key: 'loginInfo',
                        data: res.data.session,
                      })
                    },
                  })
                } else {
                  console.log(`获取用户登录态失败！${res.errMsg}`);
                }
              }
            });
          }
        });
        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            const { nickName, avatarUrl } = res.userInfo;
            that.globalData.user = { ...that.globalData.user, nickName, avatarUrl };
          }
        });
      }
    });
  },
  globalData: {
    user: {},
    host: 'http://localhost:8090'
  }
})