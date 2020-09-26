// components/shareImageModal/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },

    title: {
      type: String,
      value: '分享图片'
    },

    // 图片 url
    url: {
      type: String,
      url: ''
    },

    btnText: {
      type: String,
      value: '保存到相册',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    tapCloseShowShare() {
      this.setData({
        show: false,
      })
    },

    /**
     * 保存图片到相册
     */
    clickSaveQrCode() {
      let that = this;
      var imgSrc = this.data.url;
      wx.downloadFile({
        url: imgSrc,
        success: function (res) {
          console.log(res);

          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              that.setData({
                show: false,
              });
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function (err) {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    } else {
                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                    }
                  }
                })
              }
            },
            complete(res) {
              console.log(res);
            }
          })
        }
      });
    }
  }
});
