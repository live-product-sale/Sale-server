
/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-05-24 09:53:40
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-25 20:36:20
 */ 

const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const followShop = mysql.define("follow-shop", {
  uid: {      // 用户ID
    type: sequelize.STRING,
    primaryKey: true
  },
  shop_id: {  // 直播间ID， 用户关注的直播间ID
    type: sequelize.STRING
  }
}, {
  timestamps: false
})

followShop.sync({
  force: false
}).then(() => {
  console.log("followShop is success")
})
module.exports =followShop