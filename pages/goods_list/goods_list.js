// pages/goods_list/goods_list.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
/*
  下拉刷新：用户上滑页面 滚动条触底开始加载下一页数据
  1. 找到滚动条触底事件
  2. 判断还有没有下一页数据
  3. 没有下一页了 弹出提示框
  4. 如果有下一页就直接加载
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: [],
  },
  // 发送请求的参数
  QueryParams: {
    cid: '',
    query: '',
    pagenum: 1,
    pagesize: 10,
  },

  totalPages: 1,

  tabsItemChange(e) {
    // 获取点击的索引值
    let index = e.detail.index;
    // 修改及赋值
    let tabs = this.data.tabs;
    // 数组的forEach方法 v代表数组当前项的值 i代表数组当前项的索引
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams })
    // 获取总条数
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods],

    })
    // 关闭下拉刷新
    wx.stopPullDownRefresh();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    /*
    实现下拉刷新功能：
   1. 重置数组
   2. 将页面改为1 
   3. 重新获取数据 
   4. 关闭下拉刷新的等待效果
    */
    this.setData({
      goodsList: [],
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面触底');
    // 判断有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 已经没有下一页数据了
      console.log('wul')
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})