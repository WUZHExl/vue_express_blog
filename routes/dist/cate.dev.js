"use strict";

// 引入Express对象
var express = require('express'); // 引入路由对象


var router = express.Router(); // 引入我们自定义的controller

var CateController = require('../controllers/cate');

router.get('/cate', CateController.getAllCate);
module.exports = router;