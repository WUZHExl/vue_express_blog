"use strict";

// 引入Sequelize模块
var Sequelize = require('sequelize'); // 引入数据库实例


var db = require('../config/db'); // 定义model


var Cate = db.define('Cate', {
  // 分类id
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  // 分类名称
  name: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
}, {
  // 是否支持驼峰
  underscored: true,
  // MySQL数据库表名
  tableName: 'cate'
}); // 导出model

module.exports = Cate;