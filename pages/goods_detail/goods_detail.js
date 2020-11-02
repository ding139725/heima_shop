// pages/goods_detail/goods_detail.js
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false,
  },
  goodsObj: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    console.log(goods_id)
    this.getGoodsDetail(goods_id);
    console.log('事件触发')
  },
  async getGoodsDetail(goods_id) {
    let goodsObj = await request({ url: '/goods/detail', data: { goods_id } });
    // 两者皆可
    // let res = await request({url:`/goods/detail?goods_id=${goods_id}`}
    let collect = wx.getStorageSync('collect') || [];
    this.goodsObj = goodsObj;
    let isCollect = collect.some(v => v.goods_id === this.goodsObj.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce,
        pics: goodsObj.pics,
      },
      isCollect
    })
  },
  // 点击轮播图放大预览
  changeBigImage(e) {
    let urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    let current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls,
    });
  },

  cartAdd() {
    // 获取数据
    let cart = wx.getStorageSync('cart') || [];
    // 通过判断商品名字是否一样
    let index = cart.findIndex(v => v.goods_name === this.data.goodsObj.goods_name)
    if (index == -1) {
      // 不存在数据 直接添加
      this.goodsObj.num = 1;
      this.goodsObj.checked = true;
      cart.push(this.goodsObj)
    } else {
      // 已经存在购物车数据 执行num++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    // 弹窗提示
    wx.showToast({
      title: '填入成功',
      mask: true,
    });
  },
  // 收藏按钮的点击事件
  changeCollect() {
    let isCollect = false;
    // 1. 获取本地缓存的收藏商品数据
    let collect = wx.getStorageSync('collect') || [];
    // 2. 判断商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.goodsObj.goods_id);
    // 3. 当index !=-1表示 已经收藏过
    if (index !== -1) {
      // 已经收藏过
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
    } else {
      collect.push(this.goodsObj);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
    }
    // 4. 把数组放到缓存中
    wx.setStorageSync('collect', collect)
    // 5.把data对象中的数据修改
    this.setData({
      isCollect
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {

  // },

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