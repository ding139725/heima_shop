// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNum:0,
  },

  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect')||[];
    this.setData({
      userInfo,
      collectNum:collect.length,
    })
  },
})