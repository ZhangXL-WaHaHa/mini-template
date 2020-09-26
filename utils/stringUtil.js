module.exports = {
    /**
     * 获取 URL 参数字符串的参数
     * e.g: topic_id=xxxx&name=aaa
     *
     * 获取 topic_id
     */
    getQueryParamFromStr(str, name) {
        let theRequest = new Object();
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }

        return theRequest[name];
    },

    /**
     * 校验手机号
     * return
     * */
    validatePhone(phone) {
        let phoneError = ''
        if (phone === '') {
            phoneError = '手机号不能为空'
        } else {
            const regex = /^1[3456789]\d{9}$/
            const matchResult = phone.match(regex)
            if (matchResult === null) {
                phoneError = '手机号格式不正确'
            }
        }

        return phoneError
    },
}
