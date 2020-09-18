const bodyParser = require('body-parser');
const user = require('./user');

const MOCK_ROOT = '/mock/';
const mocks = [
  ...user
];

module.exports = function (app) {
  // 处理前端post json格式传入
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  mocks.forEach(item => {
    for (const [path, target] of Object.entries(item)) {
      const [method = 'get', url = '/'] = path.split('|');
      app[method](MOCK_ROOT + url, target);
    }
  })
}

