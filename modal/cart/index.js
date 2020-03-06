/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:05:44
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 14:55:34
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
  good_name: {
    type: sequeslize.STRING
  },
  good_price: {
    type: sequeslize.STRING
  },
  good_num: {
    type: sequeslize.STRING
  },
  good_size: {
    type:sequeslize.STRING
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

