/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:55:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-27 21:56:18
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const orderDetail = require('./order.detail')
const order = mysql.define('order', {
  id: {
    type: sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {                 // 订单ID
    type: sequelize.INTEGER(50)
  }, 
  order_state: {               // 订单状态
    type: sequelize.STRING,
    defaultValue: "1"          // 1: 待付款， 2:待收货， 3: 待评价， 4: 已完成
  },
  shop_id: {                   // 店铺ID
    type: sequelize.INTEGER(11)
  }, 
  shop_name: {                 // 店铺名称
    type: sequelize.STRING
  },
  shop_avatar: {               // 店铺头像
    type:sequelize.STRING
  },
  uid: {                       // 用户ID
    type: sequelize.STRING
  },
  address_id: {                // 地址ID
    type: sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'orders'
})

orderDetail.sync({
  force: false
}).then(() => {
  console.log('detail is successful')
})
order.sync({
  force: false
}).then(() => {
  console.log('order is successful')
})
module.exports = order