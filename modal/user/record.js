/*
 * @Description: 顾客观看记录
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-23 17:48:32
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-23 18:09:13
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const userRecord = mysql.define("record", {
  uid: {
    type: sequelize.STRING
  },
  live_id: {
    type: sequelize.STRING
  },
  enter_time: {
    type: sequelize.STRING
  },
  out_time: {
    type:sequelize.STRING
  }
}, {
   timestamps: false
})