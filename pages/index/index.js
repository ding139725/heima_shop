//Page Object
var app = getApp();

import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //楼层数组
    floorList: []
  },
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图方法
  async getSwiperList() {
    // request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    const res = await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: res
    })

  },
  // 获取导航栏方法
  async getCatesList() {
    const res = await request({ url: '/home/catitems' })
    this.setData({
      catesList: res
    })
  },
  async getFloorList() {
    const res = await request({ url: '/home/floordata' })

    this.setData({
      floorList: res
    })
  },
});