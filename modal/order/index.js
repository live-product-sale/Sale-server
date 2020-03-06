/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:55:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 14:54:35
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const order = mysql.define('order', {
  order_id: {
    type: sequelize.STRING,
    prmaryKey: true
  }, 
  order_prcess: {
    type: sequelize.STRING
  },
  good_name: {
    type: sequelize.STRING
  },
  good_num: {
    type: sequelize.STRING
  },
  good_price: {
    type: sequelize.STRING
  },
  good_avatar: {
    type: sequelize.STRING
  },
  shop_id: {
    type: sequelize.STRING
  },
  total_price: {
    type: sequelize.STRING
  },
  uid: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
})

order.sync({
  force: false
}).then(() => {
  console.log('order is successful')
})
module.exports = order