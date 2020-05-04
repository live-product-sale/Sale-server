/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 12:28:22
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:22:22
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const payOrder = mysql.define('payOrder', {
  order_id: {      // 订单ID
    type: sequelize.STRING,
    primaryKey: true
  },
  uid: {           // 用户ID
    type: sequelize.STRING,
    primaryKey: true
  }, 
  total_price: {   // 订单总价格
    type: sequelize.STRING
  },
  pay_type: {      // 支付方式  1: 微信支付 2:支付宝支付
    type: sequelize.STRING
  },
  isSuccess: {     // 是否已付款 
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