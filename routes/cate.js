// 引入Express对象
var express = require ('express');
// 引入路由对象
var router = express.Router ();
// 引入我们自定义的controller
const CateController = require('../controllers/cate');


router.get('/cate',CateController.getAllCate)

router.post('/cate',CateController.addCate)

router.delete('/cate',CateController.removeCate)

router.put('/cate',CateController.updateCate)


module.exports = router