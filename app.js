//app.js
App({
    onLaunch: function () {
        // 获取系统信息
        wx.getSystemInfo({
            success: (res) => {
                // console.log('获取系统信息', res)
                this.globalData.safeAreaHeight = res.screenHeight - res.safeArea.bottom
            },
            fail: error => {
                console.log('获取系统信息失败', error)
            }
          })
        // 获取 localStorage 里面的userInfo
        let localUserInfo = wx.getStorageSync("userInfo");
        if (localUserInfo) {
            // this.globalData.userInfo = JSON.parse(localUserInfo);
            this.globalData.userInfo = localUserInfo;
        }

        // 覆写分享 title
        // this.overWriteShare();
        // 获取系统信息
        this.getSysInfo()

        // if (!wx.cloud) {
        //     console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        //   } else {
        //     wx.cloud.init({
        //       // env 参数说明：
        //       //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //       //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //       //   如不填则使用默认环境（第一个创建的环境）
        //       env: 'aimeitai-au0m9',
        //       traceUser: true,
        //     })
        //   }
    },
    /**
     * 全局数据
     */
    globalData: {
        // safeAreaHeight: 0,  //安全区高度,适配ios
        userInfo: null,

        // 标志，主要用与页面间传递参数
        flags: {
            index: {
                share: false, // 触发分享弹框
                login: false, // 触发登录弹框
                sign: false // 触发自动签到
            }
        },

        // 违章查询状态
        peccancyStatus: false,

        // 从所有油券列表点击使用，触发返回页面到加油页
        // 加油页在 onShow 判断是否有回传的加油动作，如果有，执行加油的交互
        invokeUseVoucher: null,
        location: null, // 地理位置信息
        userLocation: {
            cityId: null
        }, //用户所在的地理位置
        systemInfo: null,
        albumInfo: null,  //产品画册配置信息
    },

    /**
     * 覆写全局分享title
     * 如果不需要，设置：isOverWriteShare: false
     */
    overWriteShare: function () {
        //监听路由切换
        //间接实现全局设置分享内容
        wx.onAppRoute(function (res) {
            //获取加载的页面
            let pages = getCurrentPages(),
                //获取当前页面的对象
                view = pages[pages.length - 1],
                data;
            if (view) {
                data = view.data;
                if (!data.hasOwnProperty('isOverWriteShare') || data.isOverWriteShare) {
                    view.onShareAppMessage = function () {
                        //分享配置
                        return {
                            title: '我在酷卡养车-开车赚钱，加油省钱，车友一起来！',
                            path: view.route
                        };
                    }
                }
            }
        })
    },

    getSysInfo() {
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.systemInfo = res
                console.log(res)
            }
        })
    }
});
