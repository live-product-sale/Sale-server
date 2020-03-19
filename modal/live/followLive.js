/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-11 21:31:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-11 21:35:16
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const followLive = mysql.define("follow-live", {
  uid: {
    type: sequelize.STRING
  },
  live_id: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
})

followLive.sync({
  force: false
}).then(() => {
  console.log("follow is success")
})
module.exports =followLive