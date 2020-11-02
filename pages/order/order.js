/*
1. 页面被打开的时候触发onShow
 获取type值
 带着type发请求
 渲染数据
2. 点击不同的标题重新发送请求 

*/

import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '代付款',
        isActive: false
      },
      {
        id: 2,
        value: '待收货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      },
    ],
  },
  // 根据index修改选中的tabs
  changeTabsByIndex(index) {
    let { tabs } = this.data;
    console.log(index);
    // 数组的forEach方法 v代表数组当前项的值 i代表数组当前项的索引
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.getOrders(index+1);
    this.setData({
      tabs
    })
  },
  tabsItemChange(e) {
    // 获取点击的索引值
    let index = e.detail.index;
    this.changeTabsByIndex(index);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const { type } = currentPage.options
    // 根据type发请求
    this.getOrders(type);
    // 根据type设置选中的tabs
    this.changeTabsByIndex(type-1)
  },
  // 获取订单数据
  async getOrders(type) {
    const res = await request({ url: '/my/orders/all', data: { type } })
    console.log(res);
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
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