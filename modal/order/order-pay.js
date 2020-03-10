/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 12:28:22
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 13:32:58
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const payOrder = mysql.define('payOrder', {
  order_id: {
    type: sequelize.STRING
  },
  uid: {
    type: sequelize.STRING
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
  force: true
}).then(() => {
  console.log('payOrder is success')
})
module.exports = payOrder