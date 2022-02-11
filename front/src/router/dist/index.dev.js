"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _sideBar = _interopRequireDefault(require("../components/sideBar.vue"));

var _Article = _interopRequireDefault(require("../components/Article.vue"));

var _About = _interopRequireDefault(require("../components/About.vue"));

var _ArticleDetail = _interopRequireDefault(require("../components/ArticleDetail.vue"));

var _Login = _interopRequireDefault(require("../components/admin/Login.vue"));

var _Home = _interopRequireDefault(require("../components/admin/Home"));

var _ArticleManage = _interopRequireDefault(require("../components/admin/ArticleManage"));

var _Welcome = _interopRequireDefault(require("../components/admin/Welcome"));

var _ArticleEdit = _interopRequireDefault(require("../components/admin/ArticleEdit"));

var _CateManage = _interopRequireDefault(require("../components/admin/CateManage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: '/',
  redirect: '/article'
}, {
  path: '/article',
  components: {
    sidebar: _sideBar["default"],
    content: _Article["default"]
  }
}, // {path: '/', component: article},
{
  path: '/about',
  components: {
    sidebar: _sideBar["default"],
    content: _About["default"]
  }
}, {
  path: '/article/:id',
  components: {
    sidebar: _sideBar["default"],
    content: _ArticleDetail["default"]
  }
}, {
  path: '/login',
  component: _Login["default"]
}, {
  path: '/home',
  component: _Home["default"],
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    component: _Welcome["default"]
  }, {
    path: '/articleManage',
    component: _ArticleManage["default"]
  }, {
    path: '/articleEdit/:id?',
    component: _ArticleEdit["default"]
  }, {
    path: '/cateManage',
    component: _CateManage["default"]
  }]
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHashHistory)(),
  routes: routes
}); //全局前置守卫：初始化时执行、每次路由切换前执行

router.beforeEach(function (to, from, next) {
  //to:将要访问的路径
  // from:代表从哪来
  // next()函数，放行；  next('/login')强制跳转
  var id = to.params.id;
  if (to.path === '/login' || to.path === '/' || to.path === "/article/".concat(id) || to.path === '/about' || to.path === '/article') return next(); //获取token

  var tokenStr = sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});
var _default = router;
exports["default"] = _default;