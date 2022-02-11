"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var Token = require('./controllers/token.js'); // var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');


var articleRouter = require('./routes/article');

var loginRouter = require('./routes/login');

var cateRouter = require('./routes/cate');

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public'))); // app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/', articleRouter);
app.use('/', loginRouter);
app.use('/', cateRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
}); //设置允许跨域
// app.use(function(req, res, next) {
//       //指定允许其他域名访问 *所有
//     res.setHeader("Access-Control-Allow-Origin", "*");
//       //允许客户端请求头中带有的
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//       //允许请求的类型
//     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.setHeader("X-Powered-By",' 3.2.1')
//       //让options请求快速返回
//     if(req.method=="OPTIONS") res.send(200);
//     else  next();
// });
// 白名单
// const whiteList = ['/login']
// ,'/article','/article/:id'
// app.use((req,res,next) => {
//   console.log("request:"+req)
//   console.log(req.url)
// 	if(!whiteList.includes(req.url)) {
// 		Token.verifyToken(req.headers.authorization).then(res => {
// 			next()
// 		}).catch(e => {
// 			res.status(401).send('invalid token')
// 		})
// 	} else {
// 		next()
// 	}
// })

module.exports = app;