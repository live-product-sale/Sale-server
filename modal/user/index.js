/*
 * @Description: 
 * @Author: zhangmeng
 * @Github: https://github.com/ZNVICTORY
 * @Date: 2020-03-03 20:34:50
 * @LastEditors: zhangmeng
 * @LastEditTime: 2020-03-06 14:44:41
 */
const Sequelize = require('sequelize')
const mysql = require('../../db/mysql/index')

const user = mysql.define('user', {
  uid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  cphone: {
    type: Sequelize.STRING
  },
  cpassword: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: false,
  timestamps: false
});

user.sync({
  force: false
}).then(() => {
  console.log('user is successful')
})

module.exports = user
