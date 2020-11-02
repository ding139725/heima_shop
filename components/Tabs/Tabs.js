// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件传递的参数tabs
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    changeTabs(e){
      let index = e.currentTarget.dataset.index
      // 自定义事件传递给父组件
      this.triggerEvent('tabsItemChange',{index});
    }
  }
})
