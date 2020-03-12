/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:25:58
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-11 20:30:40
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const user = require('./index')

const userinfo = mysql.define('userinfo', {
  uid: {
    type: sequelize.STRING
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
userinfo.belongsTo(user)
userinfo.sync({
  force: true
}).then(() => {
  console.log('userinfo is successful')
})

module.exports = userinfo
