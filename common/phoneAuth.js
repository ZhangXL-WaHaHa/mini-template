import {api, http} from '../net/api/index'

let phoneAuth = {

    /**
     * {ctx: this, callback: function}
     * 申请获取手机号
     */
    applyPhoneNumber(param, eleId) {
        if (typeof param.callback !== 'function') {
            param.callback = function () {
            }
        }

        if (!eleId) {
            eleId = '#phone-number-dialog';
        }

        param.ctx.selectComponent(eleId).show();
        param.ctx.selectComponent(eleId).data.eventSuccessCallback = function (e) {
            console.log('输出当前的手机号码', e)
            param.callback(e);
        }
    },
};

module.exports = phoneAuth;
