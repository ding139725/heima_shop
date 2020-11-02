
//Page Object
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  // options(Object)
  // 判断本地有没有数据 有数据且没过期的话 就用本地数据 如果过期就发送请求 
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates');
    if (!cates) {
      this.getCates();
    } else {
      if (Date.now() - cates.time > 1000 * 1000) {
        this.getCates();
      } else {
        this.Cates = cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  // 获取商品分类页面
  // 异步请求方法
  async getCates() {
    let res = await request({ url: '/categories' })
    this.Cates = res;
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent,
    })
  },
  // 左侧菜单点击事件
  /*
    1 获取被点击菜单的索引
    2 给data中的currentIndex赋值
    3 根据index获取右边的数据
  */
  changeActive(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    })
  },
});