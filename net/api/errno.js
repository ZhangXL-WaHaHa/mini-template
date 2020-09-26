// 错误码
module.exports = {
  OK: 200,
  NOT_LOGIN: 1401,

  // 封装提示 toast 错误
  showToast(error) {
    if (error.code) {
      wx.showToast({
        title: error.msg,
        icon: "none",
        duration: 2000
      })
    } else if (typeof  error === 'string') {
      wx.showToast({
        title: error,
        icon: "none",
        duration: 2000
      })
    } else {
      console.log("error: ", error);
    }
  },
};
