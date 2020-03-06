/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:25:58
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 14:45:54
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')

const userinfo = mysql.define('userinfo', {
  uid: {
    type: sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING
  },
  gender: {
    type: sequelize.STRING
  },
  avatar_url: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
})

userinfo.sync({
  force: false
}).then(() => {
  console.log('userinfo is successful')
})

module.exports = userinfo
