const express = require('express')
const path = require('path')


var cateRouter = require('./routes/cate')
var articleRouter= require('./routes/article')
var loginRouter= require('./routes/login')


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, ''));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', articleRouter);
app.use('/',loginRouter)
app.use('/',cateRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//閻犱礁澧介悿鍡涘礂娴ｇ瓔鍟呴悹鎭掑妼閻擄拷
// app.use(function(req, res, next) {
//       //闁圭ǹ娲ら悾楣冨礂娴ｇ瓔鍟呴柛蹇旀构缁剟宕洪悢閿嬪€抽悹浣告健濡拷 *闁圭鍋撻柡鍫嫹
//     res.setHeader("Access-Control-Allow-Origin", "*");
//       //闁稿繋娴囬蹇曗偓骞垮灪閸╂稓绮╅婵愬殲婵懓鍊搁妵鏃€绋夐鐐垫暔闁哄牆顦卞▓锟�
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//       //闁稿繋娴囬蹇曟嫚闁垮婀撮柣銊ュ鐞氼偊宕归敓锟�
//     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.setHeader("X-Powered-By",' 3.2.1')
//       //閻犱緤绠皃tions閻犲洭鏀遍惇鎷岀疀椤愶腹鍋撻悢鑽ょ闁搞儻鎷�
//     if(req.method=="OPTIONS") res.send(200);
//     else  next();
// });


// 闁谎嗘閹洟宕￠敓锟�
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