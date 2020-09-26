/**
 * 启用的环境
 * @type {{mode: string, dev: {domain: string}, test: {domain: string}, prod: {domain: string}}}
 */
const env = {
  mode: 'prod', // dev || test || prod
  // mode: 'prod', // dev || test || prod

  dev: {
    domain: 'http://192.168.0.108:8010/api/mini',
  },

  test: {
    domain: 'http://localhost:8001',
  },

  prod: {
  },

  /**
   * 封装 URL 获取不同环境的 API
   * @param api
   * @returns {*}
   */
  url: function(api) {
    let domain = '';
    switch (env.mode) {
      case 'test':
        domain = env.test.domain;
        break;
      case 'prod':
        domain = env.prod.domain;
        break;

      case 'dev':
      default:
        domain = env.dev.domain;

    }
    return domain + api;
  }

};

module.exports = env;
