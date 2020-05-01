/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:55:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-01 15:00:38
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const orderDetail = require('./order-detail')
const order = mysql.define('order', {
  order_id: {
    type: sequelize.STRING,
    primaryKey: true
  }, 
  order_state: {
    type: sequelize.STRING,
    defaultValue: "1"          // 1: 待付款， 2:待收货， 3: 待评价， 4: 已完成
  },
  shop_id: {
    type: sequelize.STRING
  },
  shop_name: {
    type: sequelize.STRING
  },
  shop_avatar: {
    type:sequelize.STRING
  },
  uid: {
    type: sequelize.STRING
  },
  address_id: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
})

// order.hasMany(orderDetail, { foreignKey: "order_id", targetKey: "order_id"})
// orderDetail.belongsTo(order, {foreignKey: "order_id", targetKey: "order_id"})

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