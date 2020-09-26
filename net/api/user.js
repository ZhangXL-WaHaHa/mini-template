import env from '../../env.js'
import http from '../http.js'

module.exports = {


    /**
     * 用户登录
     * {
     *      code
     *      rawData
     *      iv
     *      encryptedData
     * }
     */
    login(param) {
        return http.post(env.url('/site/login'), param);
    },

    /**
     * 用户信息
     * @returns {*}
     */
    getUserInfo() {
        return http.get(env.url('/users/info/mine'));
    },

    /**
     * 虚拟登录
     * @returns {*}
     */
    inventedLogin(param) {
        return http.post(env.url('/site/fakerLogin'), param);
    },

    /**
     * 历史方案
     * {
     *      page   页码
     *      pageSize   数据量
     * }
     */
    getUserRecords(param) {
        return http.get(env.url('/selections/records/mine') + param);
    },

    /**
     * 用户手机号码
     * {
     *      iv
     *      decryptedData
     * }
     */
    applyPhoneNumber(param) {
        return http.post(env.url('/users/phone-number/apply'), param);
    },
};
