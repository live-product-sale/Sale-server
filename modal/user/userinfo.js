/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-04 13:25:58
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-16 22:34:40
 */
const sequelize = require('sequelize')
const mysql = require('../../db/mysql')
const user = require('./index')

const userInfo = mysql.define('userInfo', {
  name: {
    type: sequelize.STRING
  },
  gender: {
    type: sequelize.STRING
  },
  avatar: {
    type: sequelize.STRING
  },
  uid: {
    type: sequelize.STRING,
    primaryKey: true
  }
}, {
  timestamps: false
})
userInfo.belongsTo(user, { foreignKey: "uid"})
user.hasOne(userInfo, { foreignKey: "uid"})
userInfo.sync({
  force: false
}).then(() => {
  console.log('userinfo is successful')
})

module.exports = userInfo
