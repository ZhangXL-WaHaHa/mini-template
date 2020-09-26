import {api, http} from '../net/api/index'

let app = getApp();
let userAuth = {

    // 判断用户的登录态
    checkSession: function(param) {
        wx.checkSession({
            success: res => {
                console.log('session->未过期')
                this.checkLogin(param)
            },
            fail: error => {
                // // 重新登录
                // this.checkLogin()
                console.log('session->已过期')
                // 直接跳转到登录界面
                wx.setStorageSync('token', null)
                this.checkLogin(param)
            }
        })
    },


    /**
     * 页面需要添加登录 login-dialog 组件
     * {
     *   ctx:this,
     *   callback: function(){} // 如果已登录的回调
     * }
     */
    checkLogin: function (param) {
        if (typeof param.callback !== 'function') {
            param.callback = function () {
            }
        }
        

        // 如果已经登录，直接执行 callback()
        if (this.isLogin()) {
            param.callback();
            return ;
        }

        let that = this;
        // 登录
        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.log('输出授权信息', res.authSetting['scope.userInfo'])
                // 2.1 已经授权，可以直接调用 getUserInfo 获取头像昵称，不用弹框
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        lang: 'zh_CN',
                        success: resInfo => {
                            console.log('授权获取信息', resInfo)
                            that.login({
                                params: {
                                    rawData: resInfo.rawData,
                                    iv: resInfo.iv, 
                                    encryptedData: resInfo.encryptedData,
                                },
                                succ: r => {
                                    console.log('登录成功')
                                    param.callback(r)
                                },
                                fail: r => {
                                },
                            });

                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    });
                } else {
                    // 2.2 未授权，跳转到登录页面
                    // this.goLogin(param)

                    if(!param.noShowModal) {
                        this.goLogin(param)
                    }else {
                        wx.navigateTo({
                            url: '/pages/login/index',
                        })
                    }

                    // param.ctx.selectComponent("#login-dialog").show();
                    // // 配置通过 getUserInfo 获取到用户信息后的回调
                    // param.ctx.selectComponent("#login-dialog").data.eventSuccessCallback = function (e) {
                    //     // 用户取消授权
                    //     if (!e.detail.userInfo) {
                    //         return
                    //     }

                    //     that.login({
                    //         params: {
                    //             rawData: e.detail.rawData,
                    //             iv: e.detail.iv,
                    //             encryptedData: e.detail.encryptedData,
                    //         },

                    //         // 登录（微信登录和服务端登录）成功，执行回调
                    //         succ: res => {
                    //             console.log('登陆成功，回调')
                    //             param.callback(res)
                    //         },
                    //         fail: res => {
                    //         },
                    //     });
                    // };

                }
            }
        });

    },

    /**
     * 判断是否登录
     * @returns {(any | string) | boolean}
     */
    isLogin: function () {
        return wx.getStorageSync("token") || false;
    },

    /**
     * 清除登录状态
     */
    logout() {
        getApp().globalData.userInfo = null;
        wx.setStorageSync("token", null);
        wx.setStorageSync("userInfo", null);
    },

    /**
     * 登录操作
     * @param options
     */
    login: function (options) {
        console.log('用户登录')
        if (!options.params) {
            wx.showToast({
                title: '参数缺失，登录失败',
                icon: 'none'
            });
            return;
        }

        if (typeof options.succ !== 'function') {
            options.succ = function () {
            }
        }
        if (typeof options.fail !== 'function') {
            options.fail = function () {
            }
        }
        if (typeof options.complete !== 'function') {
            options.complete = function () {
            }
        }

        // 1. wx 获取 code
        wx.showLoading({
            title: '登录中',
            mask: true
        });

        wx.login({
            success: res => {
                console.log('获取到用户信息', res)
                let shareUserId = wx.getStorageSync('share_user_id') || '';
                api.user.login({
                    code: res.code,
                    rawData: options.params.rawData,
                    iv: options.params.iv,
                    encryptedData: options.params.encryptedData,
                }).then(res => {
                    wx.hideLoading();

                    // 设置全局 user 和保存 token
                    this.updateUserInfo(res.data.user)
                    wx.setStorageSync("token", res.data.token);

                    options.succ(res);
                }).catch(error => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '登录失败，请稍后重试',
                        showCancel: false
                    });
                    options.fail(res);
                });

                // 虚拟登录
                // api.user.inventedLogin({
                //     name: 'zxl',
                //     password: '123456'
                // }).then(res => {
                //     wx.hideLoading();

                //     // 设置全局 user 和保存 token
                //     // getApp().globalData.userInfo = JSON.parse(options.params.rawData);
                //     app.globalData.userInfo = res.data.user;
                //     wx.setStorageSync("token", res.data.token);
                //     wx.setStorageSync("userInfo", res.data.user);
                //     // wx.setStorageSync("userInfo", options.params.rawData);
                //     console.log('登陆成功', res)
                //     options.succ(res);
                // }).catch(error => {
                //     wx.hideLoading();
                //     wx.showModal({
                //         title: '提示',
                //         content: '登录失败，请稍后重试',
                //         showCancel: false
                //     });
                //     options.fail(res);
                // });

            },
        });
    },

    // 跳转到登录界面
    goLogin(param) {
        wx.showModal({
            title: '提示',
            content: param.loginText || '您还没有登录呢，请先登录',
            confirmText: '登录',
            confirmColor: '#FF6941',
            success: res => {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/login/index',
                    })
                }
            }
        })
    },

    /**
     * 更新全局变量和缓存中的用户信息
     * */
    updateUserInfo(userInfo) {
        app.globalData.userInfo = userInfo;
        wx.setStorageSync("userInfo", userInfo);
    },

    /**
     * 判断用户的session是否过期以及token是否存在
     * @returns {Boolean}
     * */
    checkIsLogin(param) {
        if (typeof param.callback !== 'function') {
            param.callback = function () {
            }
        }
        wx.checkSession({
            success: res => {
                let flag = !!wx.getStorageSync("token")
                param.callback(flag)
            },
            fail: error => {
                param.callback(false)
            }
        })
    }
};

module.exports = userAuth;
