"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _axios = _interopRequireDefault(require("axios"));

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/dist/index.css");

var ElIcons = _interopRequireWildcard(require("@element-plus/icons"));

var _vMdEditor = _interopRequireDefault(require("@kangc/v-md-editor"));

require("@kangc/v-md-editor/lib/style/base-editor.css");

var _github = _interopRequireDefault(require("@kangc/v-md-editor/lib/theme/github.js"));

require("@kangc/v-md-editor/lib/theme/style/github.css");

require("./assets/global.css");

var _highlight = _interopRequireDefault(require("highlight.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 新增代码：引入全部组件及样式
// highlightjs
_vMdEditor["default"].use(_github["default"], {
  Hljs: _highlight["default"]
});

var app = (0, _vue.createApp)(_App["default"]);
app.use(_router["default"]);

for (var name in ElIcons) {
  app.component(name, ElIcons[name]);
}

app.use(_elementPlus["default"]);
app.use(_vMdEditor["default"]);
app.config.globalProperties.$axios = _axios["default"];
app.mount('#app');