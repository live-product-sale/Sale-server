/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-12 20:37:29
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:26:45
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const sort = mysql.define("sort", {
  range_id: {    // 范围ID 对应的是range_id, 0-7
    type:sequelize.STRING
  },
  name: {        // 具体名称 例如 如果属于 品质水果 : 0， 名称可以是苹果，香蕉，西瓜等
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