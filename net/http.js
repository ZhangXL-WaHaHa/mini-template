import {
  request
} from '../miniprogram_npm/wx-promise-request/index'
import errno from 'api/errno'

let http = {

  /**
   * GET 请求
   * @param url
   * @returns {*}
   */
  get: function(url, params) {
    let header = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return this.request(url, 'GET', params, header);
  },

  /**
   * POST 请求
   * @param url
   * @param data
   */
  post: function(url, data) {
    let header = {
      "Content-Type": "application/json",
    };

    return this.request(url, 'POST', data, header);
  },

  /**
   * POST FORM 表单请求
   * @param url
   * @param data
   */
  postForm: function(url, data) {
    let header = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return this.request(url, 'POST', data, header);
  },

  /**
   * PUT 请求
   * @param url
   * @returns {*}
   */
  put: function(url, data) {
    let header = {
      "Content-Type": "application/json",
    };

    return this.request(url, 'PUT', data, header);
  },

  /**
   * DELETE 请求
   * @param url
   * @param data
   */
  delete: function(url, data) {
    let header = {
      "Content-Type": "application/json",
    };

    return this.request(url, 'DELETE', data, header);
  },

  /**
   * HTTP 请求
   * @param url
   * @param method
   * @param data
   * @param header
   * @returns {*}
   */
  request: function(url, method, data, header) {
    let token = wx.getStorageSync("token") || "";
    header = {
      ...header,
      Authorization: 'Bearer ' + token
    };

    return request({
      url: url,
      method: method,
      data: data,
      header: header,
    }).then(res => {
      console.log('request', url, res)
      if (res.data.code !== 200) { // 接口业务操作不成功
        throw res.data;
      }

      return res.data;
    }).catch(error => {

      if (error.code) {
        if (error.code === errno.NOT_LOGIN) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          getApp().globalData.userInfo = null
        } else {
          wx.showToast({
            'title': error.msg ? error.msg : '',
            'icon': "none",
          })
        }
      }

      // 请求未授权接口
      if (error.status_code === 401) { // not auth
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        getApp().globalData.userInfo = null
      }
      throw error
    });
  }
};

module.exports = http;