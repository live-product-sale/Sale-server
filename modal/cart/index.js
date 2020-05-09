/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:05:44
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-08 17:04:12
 */
const sequeslize = require('sequelize')
const mysql = require('../../db/mysql')

const cart = mysql.define('cart', {
  cart_id: {
    type: sequeslize.STRING,
    primaryKey: true
  },
  uid: {
    type: sequeslize.STRING
  },
  shop_id: {
    type: sequeslize.STRING
  },
  goods_id: {
    type: sequeslize.STRING
  },
  goods_name: {
    type: sequeslize.STRING
  },
  goods_price: {
    type: sequeslize.STRING
  },
  goods_num: {
    type: sequeslize.STRING
  },
  goods_avatar: {
    type: sequeslize.STRING
  },
  net_weight: {
    type:sequeslize.STRING
  },
  specification:{
    type: sequeslize.STRING
  },
  goods_checked: {
    type: sequeslize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
})

cart.sync({
  force: false
}).then(() => {
  console.log('cart is successful')
})
module.exports = cart

