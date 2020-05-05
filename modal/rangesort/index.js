/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:19:17
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:15:04
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const range = mysql.define('range', {
  range_id: {    // 范围id 0-7
    type: sequelize.STRING,
    primaryKey: true
  },
  name: {        // 范围名称，已固定值， ['品质水果', '新鲜蔬菜', '粮油米面', '水产品', '农副加工', '肉禽蛋品', '苗木花草'， '其他']
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