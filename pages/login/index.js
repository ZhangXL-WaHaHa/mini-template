// pages/login/index.js
import {http, errno, api} from "../../net/api/index"
import userAuth from "../../common/userAuth"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: true,  //是否同意协议

        /**
         * 微信的授权：同意，的回调
         * @param e
         */
        eventSuccessCallback: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    /**
     * 点击微信授权登录
     * @param e
     * @constructor
     */
    Success: function (e) {

        // 用户取消授权
        if (!e.detail.userInfo) {
            return
        }
        // 用户授权成功，直接登录
        userAuth.login({
            params: {
                rawData: e.detail.rawData,
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData,
            },

            // 登录（微信登录和服务端登录）成功，执行回调
            succ: res => {
                // param.callback(res)
                wx.navigateBack()
            },
            fail: error => {
                // 登录失败
                console.log('登录失败', error)
            },
        });
    },

    // 点击微信登录（没有同意）
    cancelAuth() {
        if (!this.data.checked) {
            errno.showToast('请同意用户使用协议')
            return;
        }
    },

    // 点击是否同意协议
    onCbChange() {
        this.setData({
            checked: !this.data.checked
        })
    },

    // 点击查看用户使用协议
    viewAgreement() {
        wx.navigateTo({
            url: '../me/userAgreement/index?type=2',
        })
    }
})
