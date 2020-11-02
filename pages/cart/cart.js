// pages/cart/cart.js
/*

1. 全选按钮的实现
  1 onShow中获取商品数组
  2 商品全被选中时 全选按钮才被选中也就是 checked=true
总价格和总数量：
  1. 选中的商品才需要计算
  2. 获取购物车数组
  3. 遍历
  4. 判断是否选中
  5. 总价格+=商品的价格 * 数量
  6. 总数量+=数量
  7. 把数据渲染到data中就vans 

商品的选中功能

  1. 绑定change时间
  2. 获取到被修改的商品对象 
  3. 商品对象的选中状态取反
  4. 重新填回到data和缓存中
  5. 重新计算总价格和总数量


全选和反选
  1. 全选复选框绑定事件
  2. 获取data中的全选变量allChecked
  3. 直接取反
  4. 遍历购物车数组让商品的选中状态随着allChecked改变而改变
  5. 把购物车数组和allChecked重新设置回data和缓存中

商品数量的编辑
1 ‘+’‘-’按钮绑定同一个点击事件 区分关键是自定义属性

传递被点击的商品id goods_id
获取data中的购物车数据 来获取被修改的商品对象
直接修改商品对象中的数量 num属性 
把购物车数组重新设置回缓存中和data中
*/
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
    this.setCart(cart);
    this.setData({
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
    let allChecked = cart.length ? cart.every(v => v.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      }
    })
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
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
        content: '是否要删除数据',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
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


  handepay() {
    let { totalNum, address } = this.data;
    if (!address) {
      wx.showToast({
        title: '你还没有选择收货地址',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return;
    }
    if (totalNum == 0) {
      wx.showToast({
        title: '你还没有选购商品',
        icon: 'none',
        duration: 1500,
        mask: false,
      });

      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  }


})