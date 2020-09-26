// components/theSwiper.js
let images = []
let timer = null
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgUrls: Array,

        borderRadius: {
          type: String,
          value: 0
        },

        heightRatio: {
            type: Number,
            value: 0
        },

        targets: Array // 轮播图跳转的路径
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 0,
        indicatorDots: true,
        autoplay: true,
        interval: 4000,
        duration: 100,
        swiperHeight: "300rpx"
    },

    observers: {
        imgUrls(val) {
            if (val && val.length > 0) {
                const isChange = this.checkImages(val)
                // imgUrls内容发生变化
                if (isChange) {
                    // 重置currrentIndex
                    this.setData({
                        currentIndex: 0
                    })
                    console.log('重置currrentIndex', this.data.currentIndex)
                }
            }
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 计算高度
         * @param e
         */
        calHeight(e) {
            let winWidth = wx.getSystemInfoSync().windowWidth;
            console.log(this.data.heightRatio, this.data.heightRatio * winWidth);
            if (this.data.heightRatio > 0) {
                this.setData({
                    swiperHeight: this.data.heightRatio * winWidth + 'px'
                });
                return;
            } else {
                let swiperHeight = winWidth + "px";
                this.setData({
                    swiperHeight: swiperHeight
                });
            }
        },

        /**
         *
         * @param e
         */
        swiperChange(e) {
            // 避免闪动
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.setData({
                    currentIndex: e.detail.current
                });
                // console.log('swiper change', this.data.currentIndex)
            }, 500)
        },

        /**
         * 触发点击事件
         * @param e
         */
        tapSwiperItem(e) {
            const index = e.currentTarget.dataset.index
            // wx.navigateTo({
            //     url: this.data.targets[index]
            // })
            this.triggerEvent('tapSwiperItem', e, {});
        },
        /**
         * 判断imgUrls内容是否发生变化
         * @param imgs 更新后的imgUrls
         * return Boolean imgUrls内容是否发生变化
         * */
        checkImages(imgs) {
            if (imgs.length !== images.length) {
                images = imgs
                return true
            }
            let isChange = false
            for (let i = 0; i < imgs.length; i++) {
                if (imgs[i] !== images[i]) {
                    images = imgs
                    isChange = true
                    break
                }
            }
            return isChange
        }
    }
});
