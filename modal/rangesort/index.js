/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:19:17
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-12 21:24:49
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const range = mysql.define('range', {
  range_id: {
    type: sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
});

range.sync({
  force: false
}).then(() => {
  console.log('range is successful')
})
module.exports = range