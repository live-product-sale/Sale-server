/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 12:28:22
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-01 14:50:09
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const payOrder = mysql.define('payOrder', {
  order_id: {
    type: sequelize.STRING,
    primaryKey: true
  },
  uid: {
    type: sequelize.STRING,
    primaryKey: true
  },
  total_price: {
    type: sequelize.STRING
  },
  pay_type: {
    type: sequelize.STRING
  },
  isSuccess: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
})
payOrder.sync({
  force: false
}).then(() => {
  console.log('payOrder is success')
})
module.exports = payOrder