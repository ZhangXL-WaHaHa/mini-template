// components/basePanel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 容器padding-left, 单位rpx
    pdLeft: {
      type: Number,
      value: 0
    },
    // 容器padding-right
    pdRight: {
      type: Number,
      value: 0
    },
    // 容器padding-top
    pdTop: {
      type: Number,
      value: 0
    },
    // 容器padding-bottom
    pdBottom: {
      type: Number,
      value: 0
    },
    // 容器padding-left 和 padding-right
    pdLeftRight: {
      type: Number,
      value: 0
    },
    // 容器padding-top 和 padding-bottom
    pdTopBottom: {
      type: Number,
      value: 0
    },
    //  内边距
    pd: {
      type: Number,
      value: 0
    },
    // 是否显示阴影
    showShadow: {
      type: Boolean,
      value: true
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

  }
})
