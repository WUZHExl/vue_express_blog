"use strict";

var jwt = require("jsonwebtoken"); // 设定一个密钥，用来加密和解密token


var secret = '113Bmongojsdalkfnxcvmas'; //生成token
//info也就是payload是需要存入token的信息

function createToken(info) {
  var token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10
  });
  return token;
} //验证Token


function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, secret, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken
};