/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 10:26:30
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 21:58:16
 */
const Sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const address = mysql.define('address', {
  uid: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  mobile: {
    type: Sequelize.STRING
  },
  addressName: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  area: {
    type: Sequelize.STRING
  },
  isDefault: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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