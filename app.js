//app.js
App({
  onLaunch: function (opt) {
    this.globalData.user.guest = opt.query.guest || '来宾朋友';
  },
  onShow: function (opt) {
    const app = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效

      },
      fail: function () {
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'http://101.132.181.121:10080/',
                data: {
                  code: res.code
                },
                success: data => {
                  console.log(data);
                },
              })
            } else {
              console.log(`获取用户登录态失败！${res.errMsg}`);
            }
          }
        });
      },
      complete: function () {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: res => {
            const { nickName, avatarUrl } = res.userInfo;
            app.globalData.user = { ...app.globalData.user, nickName, avatarUrl };
          }
        });
      },
    });
  },
  globalData: {
    user: {}
  }
})