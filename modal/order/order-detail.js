/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 11:10:10
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-18 20:09:20
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const order = require('./index')

const orderDetail = mysql.define('orderDetail', {
  order_id: {
    type: sequelize.STRING
  },
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

module.exports = orderDetail
