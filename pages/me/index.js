import {
    http,
    errno,
    api
} from "../../net/api/index"
import userAuth from "../../common/userAuth"

const app = getApp();

// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

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
        // 实现自定义tabbar选中态
        // if (typeof this.getTabBar === 'function' &&
        //     this.getTabBar()) {
        //     this.getTabBar().setData({
        //         selected: 3
        //     })
        // }

        // let that = this
        // this.checkSession({
        // 	callback: () => {
        // 		if (!!this.data.userInfo && !!app.globalData.userInfo) {
        // 			that.loadUser();
        // 		} else {
        // 			that.loadUserInfo();
        // 		}
        // 	}
        // })
        // this.loadUser()
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
        // 判断用户是否登录
        // this.loadUser();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {


    },

    /**
     * 判断用户是否登录
     */
    loadUser() {
        let that = this;
        userAuth.checkSession({
            ctx: this,
            callback: function () {
                if (getApp().globalData.userInfo &&
                    !that.data.userInfo) {
                    that.loadUserInfo();
                }
            }
        });
    },

    /**
     * 加载用户信息
     */
    loadUserInfo() {
        // console.log('加载用户信息')
        api.user.getUserInfo().then(res => {
            console.log('输出个人信息', res.data)
            this.setData({
                userInfo: res.data
            });
        }).catch(error => {
            // 判断状态码
            if(error.code === 1401) {
                // 重新登录
                wx.showModal({
                    title: '提示',
                    content: '登录失效，请重新登录',
                    confirmText: '登录',
                    success: res => {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '/pages/login/index',
                            })
                        }
                    }
                })
                return ;
            }
            errno.showToast(error)
            // console.log('输出状态码', error)
            
        })
    },

    // 获取用户的历史方案
    getUserHistory() {
        //
    },

    //    点击跳转留言反馈
    viewFeedBack() {
        wx.navigateTo({
            url: 'feedBack/feedBack'
        })
    },

    //    点击了关于
    viewAbout() {
        wx.navigateTo({
            url: 'about/about'
        })
    },

    //   点击了上传案例
    viewCase() {
        wx.navigateTo({
            url: 'uploadCase/index'
        })

    },

    // 点击历史方案
    viewHistoryProject() {
        wx.navigateTo({
            url: 'caseList/index'
        })
    },

    // 点击查看图表
    // viewPicture() {
    //     wx.navigateTo({
    //         url: '../common/multiCharts/index',
    //     })
    // }
    // 点击获取用户手机号码
    // getPhoneNumber(e) {
    //     console.log('输出手机号码信息', e)
    //     api.user.applyPhoneNumber({
    //         iv: e.detail.iv,
    //         decryptedData: e.detail.encryptedData
    //     }).then(res => {
    //         that.setData({
    //             form: {
    //                 ...that.data.form,
    //                 phoneNumber: res.data.phone_number
    //             },
    //             ['userInfo.phone']: res.data.phone_number
    //         })
    //     }).catch(error => {
    //         errno.showToast(error)
    //     });
    // }
}) 
