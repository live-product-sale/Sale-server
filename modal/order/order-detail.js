/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-10 11:10:10
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:19:44
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const order = require('./index')

const orderDetail = mysql.define('orderDetail', {
  order_id: {       // 订单ID
    type: sequelize.STRING
  },
  shop_id: {        // 店铺ID
    type: sequelize.STRING
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
  timestamps: false
})

module.exports = orderDetail
