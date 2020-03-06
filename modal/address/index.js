/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 10:26:30
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-04 14:11:08
 */
const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const address = mysql.define('address', {
  uid: {
    type: Sequelize.BIGINT
  },
  address: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})
address.sync({
  force: false
}).then(() => {
  console.log('address is successful')
})

module.exports = address