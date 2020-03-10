/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:55:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-10 11:06:18
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const order = mysql.define('order', {
  order_id: {
    type: sequelize.STRING,
    prmaryKey: true
  }, 
  order_prcess: {
    type: sequelize.STRING,
    defaultValue: "0"
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