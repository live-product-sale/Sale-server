/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 12:28:22
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-27 22:00:25
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const order = require('./index')

const payOrder = mysql.define('order_pay', {
  id: {
    type: sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {      // 订单ID
    type: sequelize.INTEGER(50)
  },
  uid: {           // 用户ID
    type: sequelize.STRING
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
  timestamps: false,
  tableName: 'order_pay'
})
payOrder.sync({
  force: false
}).then(() => {
  console.log('payOrder is success')
})
payOrder.belongsTo(order, { foreignKey: "order_id", targetKey: "order_id"})
order.hasOne(payOrder, { foreignKey: "order_id", targetKey: "order_id"})
module.exports = payOrder