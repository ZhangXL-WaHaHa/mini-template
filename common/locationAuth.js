import {
    api,
    http
} from '../net/api/index'
let app = getApp();

let locationAuth = {

    /**
     * {
     *   ctx:this,
     *   callback: function(){} // 已经获取到用户地理位置授权的回调
     * }
     */
    checkLocation: function (param) {
        console.log('输出传过去的值', param)
        // if (typeof param.callback !== 'function') {
        //     param.callback = function () {
        //     }
        // }
        // this.hasLocation({
        //     // 直接获取位置信息
        //     succ: res => {
        //         param.callback()
        //     },
        //     // 跳转到设置
        //     fail: error => {
        //         this.getLocationAuth({
        //             success: res => {
        //                 param.callback()
        //             },
        //             fail: error => {

        //             }
        //         })
        //     }
        // })
        return new Promise((resolve, reject) => {
            this.hasLocation().then(() => {
                // param.callback()
                resolve()
            }).catch(() => {
                this.getLocationAuth(param).then(() => {
                    // param.callback()
                    resolve()
                }).catch(error => {
                    reject(error)
                    console.log('打开设置失败', error)
                })
            })
        })
    },

    /**
     * 判断是否已经授权地理位置信息
     * @returns {(any | string) | boolean}
     */
    hasLocation: function (options) {
        //第一次小程序会弹出一个授权框，拒绝之后不会再次弹出，直接进入fail回调，需引导用户进入设置页面打开授权
        // 利用回调函数
        // wx.getSetting({
        //     success: (res) => {
        //         if(res.authSetting['scope.userLocation'] || typeof res.authSetting['scope.userLocation'] === 'undefined') {
        //             options.succ()
        //         }else {
        //             options.fail()
        //         }
        //     },
        // })
        // 利用promise
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userLocation']) {
                        console.log('getSetting', res)
                        resolve()
                    } else {
                        // const isFirstRefuse = res.authSetting['scope.userLocation'] !== false // 是否第一次拒绝授权
                        // reject(isFirstRefuse)
                        reject()
                    }
                },
            })
        })
    },

    /**
     * 请求获取用户地理位置权限  
     * 必须要求用户授权或者是手动定位一个城市，不需要判断是否是第一次拒绝授权
     * @param isFirstRefuse {Boolean} 是否第一次拒绝授权
     * @returns {(any | string) | boolean}
     */
    getLocationAuth: function (param) {
        return new Promise((resolve, reject) => {
            // 主动授权
            wx.authorize({
                scope: 'scope.userLocation',
                success: () => {
                    // console.log('授权成功')
                    resolve()
                },
                //用户拒绝
                fail: () => {
                    // 未授权处理
                    this.processUnauthorized(resolve, reject, param)

                    // 已经拒绝过一次授权
                    // if (!isFirstRefuse) {
                    //     console.log('弹出遮罩')

                    //     // 引导用户前往授权设置页 
                    //     wx.showModal({
                    //         title: '授权提示',
                    //         content: '是否允许小程序获取您当前位置',
                    //         confirmText: '去授权',
                    //         cancelText: param.cancelText,
                    //         success: (res) => {
                    //             if (res.confirm) {
                    //                 wx.openSetting({
                    //                     success: (data) => {
                    //                         console.log('打开设置页', data)
                    //                         const {
                    //                             errMsg,
                    //                             authSetting
                    //                         } = data
                    //                         if (errMsg === 'openSetting:ok' && authSetting['scope.userLocation']) {
                    //                             console.log('打开设置页授权成功', errMsg, authSetting)
                    //                             resolve()
                    //                         } else {
                    //                             reject('未授权')
                    //                         }
                    //                     }
                    //                 })
                    //             } else if (res.cancel) {
                    //                 // 判断是取消按钮还是手动定位
                    //                 if (param.cancelText === '手动定位') {
                    //                     wx.navigateTo({
                    //                         url: '/pages/index/chooseCity/index',
                    //                     })
                    //                 } else {
                    //                     reject('未授权')
                    //                 }

                    //             }
                    //         },
                    //     })
                    // }
                    // // 第一次拒绝授权
                    // else {
                    //     reject('拒绝授权')
                    // }
                }
            })
            // wx.showModal({
            //     title: '提示',
            //     content: '是否允许小程序获取您当前位置',
            //     confirmText: '设置',
            //     success: res => {
            //         if(res.confirm) {
            //             wx.openSetting({
            //                 success: (res) => {
            //                     resolve()
            //                 },
            //                 fail: error => {
            //                     reject(error)
            //                 }
            //             })
            //         }else {
            //         }
            //     }
            // })
        })
    },

    // 处理用户未授权的情况
    processUnauthorized(resolve, reject, param) {
        console.log('弹出遮罩')
        // 引导用户前往授权设置页
        //  小程序自带的showModal默认是返回操作触发取消按钮，局限性太高，自己实现showModal框
        wx.showModal({
            title: '授权提示',
            content: '是否允许小程序获取您当前位置',
            confirmText: '去授权',
            cancelText: param.cancelText,
            success: (res) => {
                if (res.confirm) {
                    wx.openSetting({
                        success: (data) => {
                            console.log('打开设置页', data)
                            const {
                                errMsg,
                                authSetting
                            } = data
                            if (errMsg === 'openSetting:ok' && authSetting['scope.userLocation']) {
                                console.log('打开设置页授权成功', errMsg, authSetting)
                                resolve()
                            } else {
                                reject('未授权')
                            }
                        }
                    })
                } else if (res.cancel) {
                    // 判断是取消按钮还是手动定位
                    if (param.cancelText === '手动定位') {
                        wx.navigateTo({
                            url: '/pages/index/choose-city/index',
                        })
                    } else {
                        reject('未授权')
                    }

                }
            },
        })
    }
};

module.exports = locationAuth;