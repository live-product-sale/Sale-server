/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 11:10:10
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-12 20:48:42
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const order = require('./index')

const orderDetail = mysql.define('orderDetail', {
  shop_id: {
    type: sequelize.STRING
  },
  goods_name: {
    type: sequelize.STRING
  },
  goods_price: {
    type: sequelize.STRING
  },
  goods_num: {
    type: sequelize.STRING
  },
  goods_avatar: {
    type: sequelize.STRING
  },
  net_weight: {
    type: sequelize.STRING
  },
  specification: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
})
order.hasMany(orderDetail)
orderDetail.belongsTo(order)

orderDetail.sync({
  force:  false
}).then(() => {
  console.log('order-detail is success')
})
module.exports = orderDetail
