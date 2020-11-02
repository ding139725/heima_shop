
// ！！！！！逻辑编辑开始！！！！！
Page({
  // 页面数据
  data: {
    address: {},// 本地缓存的地址
    cart: [],//购物车数组
    allChecked: false,//全选
    totalPrice: 0,//总价格
    totalNum: 0,//总数量
  },

  onShow: function () {
    // 获取本地缓存的收货地址
    let address = wx.getStorageSync('address');
    // 获取本地的购物车数据
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v=>v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
    })
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
  },

  /*
  
  获取用户收货地址:
  1. 绑定点击事件
  2. 调用小程序的api 获取收货地址  wx.chooseAddress
  
  获取用户对小程序所授予获取地址的权限状态  scope ：
  1. 假设 用户点击获取收获地址的提示框 确定的话 authSetting  scope.address: true,
  scope值为 true 

  
  */
  // 重新设置购物车数据
  setCart(cart) {
    // every数组方法 会遍历 会接收一个回调函数 每一个回调函数的返回值都是true 那么every方法的返回值才为true
    // 空数组直接调用every方法的话也是直接返回true
    // 通过判断数组的长度来看是不是空数组

    wx.setStorageSync('cart', cart);
  },
  // 收货地址的点击事件
  changeAddress() {
    // 调用获取收货地址的小程序api
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync('address', result);

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 商品选中与反选
  changeItem(e) {
    let id = e.currentTarget.dataset.id;
    let cart = this.data.cart;
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);

  },

  // 全选的选中与反选
  changeItemAllChecked() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
    this.setData({
      allChecked
    })
  },


  // 商品数量的编辑 
  changeNumEdit(e) {
    // 获取传递过来的操作符 和商品id
    const { operation, id } = e.currentTarget.dataset;
    let cart = this.data.cart
    let index = cart.findIndex(v => v.goods_id === id);
    if (operation == -1 && cart[index].num == 1) {
      wx.showModal({
        title: '提示',
        content: '您是否要删除此商品',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  handepay(){
    console.log('付钱了付钱了')
  },

  // 微信支付
  //  哪些人 哪些账号 可以实现微信支付
  // 1. 企业账号
  // 2. 企业账号的小程序后台中   必须给开发者白名单
  // 3。  一个appid可以同时绑定多个账号

})