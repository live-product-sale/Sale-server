/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 14:19:17
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-04 14:23:19
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const sort = mysql.define('sort', {
  sort_id: {
    type: sequelize.BIGINT,
    primaryKey: true
  },
  sort_name: {
    type: sequelize.STRING
  },
  sort_avatar: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
});

sort.sync({
  force: false
}).then(() => {
  console.log('sort is successful')
})
module.exports = sort