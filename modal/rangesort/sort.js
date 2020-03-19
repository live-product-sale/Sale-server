/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-12 20:37:29
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-12 21:24:57
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const sort = mysql.define("sort", {
  range_id: {
    type:sequelize.STRING
  },
  name: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
})
sort.sync({
  force: false
}).then(() => {
  console.log('sort is success')
})
module.exports = sort