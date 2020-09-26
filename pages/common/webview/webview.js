// pages/common/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
  },

  /**
   * url 参数必须用: encodeURIComponent encode 之后传过来
   * 不然会丢失 url 的参数
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.url) {
      this.setData({
        url: decodeURIComponent(options.url),
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
