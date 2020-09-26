// components/loginModal/loginModal.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 是否显示
        isShow: {
            type: Boolean,
            value: false
        },

        isShowPermTip: {
            type: Boolean,
            value: true,
        },

        permTip: {
            type: String,
            value: '为了方便你使用完整功能，需要你授权以下信息。'
        },

        // 弹框标题
        title: {
            type: String,
            value: '微信授权'
        },
        // 弹框内容
        content: {
            type: String,
            value: ''
        },
        // 是否显示取消按钮
        showCancel: {
            type: Boolean,
            value: true
        },
        // 确认按钮文本
        confirmText: {
            type: String,
            value: '授权'
        },
        // 确认按钮的open-type
        open_type: {
            type: String,
            value: ''
        },
        // bindSuccess 在HTML使用该属性可将 使用页面 的函数绑定到确认按钮的事件当中去
        // bindCancel 在HTML使用该属性可将 使用页面 的函数绑定到取消按钮的事件当中去
    },

    /**
     * 组件的初始数据
     */
    data: {
        /**
         * 微信的授权：同意，的回调
         * @param e
         */
        eventSuccessCallback: null,

        /**
         * 微信授权：取消，的回调
         */
        eventCancelCallback: null,

    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 显示弹出框
         */
        show: function () {
            this.setData({
                isShow: true,
            });
        },

        /**
         * 隐藏弹出框
         */
        close: function () {
            this.setData({
                isShow: false,
            });
        },

        /**
         * 同意授权
         * @param e
         * @constructor
         */
        Success: function (e) {
            console.log('获取手机号', e)
            this.close();
            if (this.data.eventSuccessCallback && typeof this.data.eventSuccessCallback === 'function') {
                this.data.eventSuccessCallback(e);
            } else {
                this.triggerEvent('Success', e, {});
            }
        },

        /**
         * 取消授权
         * @param e
         * @constructor
         */
        Cancel: function (e) {
            this.close();
            if (this.data.eventCancelCallback && typeof this.data.eventCancelCallback === 'function') {
                this.data.eventCancelCallback(e);
            } else {
                this.triggerEvent('Cancel', e, {});
            }
        },
    }
});
