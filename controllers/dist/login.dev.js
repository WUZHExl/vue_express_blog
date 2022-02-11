"use strict";

// 引入admin表的model
var LoginModel = require('../model/loginDb');

var Token = require('./token.js');

function login(req, res) {
  // console.log(req)
  LoginModel.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function (result) {
    // console.log(result.username);
    if (result) {
      var token = Token.createToken({
        user: result.username,
        password: result.password
      });
      result.dataValues.token = token;
      res.send(result);
    } else {
      res.sendStatus(204);
    }
  }); // res.send('2222')
} // 配置对象


var exportObj = {
  login: login
}; // 导出对象，供其它模块调用

module.exports = exportObj;