/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-11 21:31:38
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-05-04 21:23:03
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const followLive = mysql.define("follow-live", {
  uid: {      // 用户ID
    type: sequelize.STRING,
    primaryKey: true
  },
  live_id: {  // 直播间ID， 用户关注的直播间ID
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