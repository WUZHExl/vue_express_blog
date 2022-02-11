"use strict";

// 引入Express对象
var express = require('express'); // 引入路由对象


var router = express.Router(); // 引入我们自定义的controller

var LoginController = require('../controllers/login');

var Token = require('../controllers/token.js'); // 定义文章列表路由，GET请求


router.post('/login', LoginController.login);
router.get('/test', function (req, res) {
  Token.verifyToken(req.headers.authorization).then(function (res) {
    next();
    res.send('11111');
  })["catch"](function (e) {
    res.status(401).send('invalid token');
  });
}); // 导出路由，供app.js文件调用

module.exports = router;