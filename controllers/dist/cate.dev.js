"use strict";

// 引入admin表的model
var CateModel = require('../model/cateDb'); // class Cate{
//   getAllCate(req, res){
//       res.send('111')
//   }
// }


function getAllCate(req, res) {
  CateModel.findAll({
    'order': [["id"]]
  }).then(function (result) {
    res.send(result);
  });
}

var Cate = {
  getAllCate: getAllCate
}; // 导出对象，供其它模块调用

module.exports = Cate;