/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 11:10:10
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-27 22:05:36
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const order = require('./index')

const orderDetail = mysql.define('order_detail', {
  id: {
    type: sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {       // 订单ID
    type: sequelize.INTEGER(50)
  },
  shop_id: {        // 店铺ID
    type: sequelize.INTEGER(11)
  },
  goods_id: {       // 商品ID
    type: sequelize.INTEGER(11)
  },
  goods_name: {     // 商品名称
    type: sequelize.STRING
  },
  goods_price: {    // 商品价格
    type: sequelize.STRING
  },
  goods_num: {      // 商品数量
    type: sequelize.STRING
  },
  goods_avatar: {    // 商品头像
    type: sequelize.STRING
  },
  net_weight: {      //商品净含量
    type: sequelize.STRING
  },
  specification: {   // 商品规格
    type: sequelize.STRING
  }
}, {
  timestamps: false,
  tableName: 'order_details'
})

module.exports = orderDetail
